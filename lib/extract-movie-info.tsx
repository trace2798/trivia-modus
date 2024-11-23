interface Award {
  award: string;
  category: string;
  nominee: string;
  result: string;
}

interface MovieInfo {
  // title: string;
  director: string;
  // budget: string;
  // boxOffice: string;
  plot: string;
  // awards: Award[];
  // cast: { actor: string; role: string }[];
}

export function ExtractMovieInfo(rawText: string): MovieInfo {
  const cleanText = (text: string): string =>
    text
      // Replace {{won}}, {{nom}}, {{draw|...}} with corresponding text
      .replace(/\{\{won\}\}/gi, "Won")
      .replace(/\{\{nom\}\}/gi, "Nominated")
      .replace(/\{\{draw\|.*?\}\}/gi, "Tie")
      // Handle film date template variations
      .replace(/\{\{Film date\|(.*?)\}\}/gi, "$1")
      .replace(/\{\{start date\|(.*?)\}\}/gi, "$1")
      // Handle currency templates
      .replace(/\{\{US?\$\|(.*?)\}\}/gi, "$$$1")
      // Remove reference tags
      .replace(/<ref[^>]*?>.*?<\/ref>/gs, "")
      .replace(/<ref[^>]*?\/>/g, "")
      // Remove other templates
      .replace(/\{\{.*?\}\}/g, "")
      // Replace links with display text
      .replace(/\[\[([^\|\]]+)\|([^\]]+)\]\]/g, "$2")
      // Replace links without display text
      .replace(/\[\[([^\]]+)\]\]/g, "$1")
      // Remove HTML tags
      .replace(/<.*?>/g, "")
      // Replace multiple spaces or newlines with a single space
      .replace(/\s+/g, " ")
      .trim();

  // Helper function to find section content
  const findSectionContent = (
    sectionPatterns: string[],
    rawText: string
  ): string => {
    for (const pattern of sectionPatterns) {
      const sectionStart = rawText.indexOf(pattern);
      if (sectionStart !== -1) {
        const contentStart = sectionStart + pattern.length;
        // Find the next section heading
        const nextSection = rawText.slice(contentStart).match(/==+[^=]+==+/);
        const sectionEnd = nextSection
          ? contentStart + nextSection.index!
          : rawText.length;
        return rawText.slice(contentStart, sectionEnd);
      }
    }
    return "";
  };

  // Helper function to extract infobox field
  const extractInfoboxField = (fieldName: string, text: string): string => {
    const patterns = [
      `${fieldName}\\s*=\\s*([^\\n]+)`,
      `\\|\\s*${fieldName}\\s*=\\s*([^\\n]+)`,
    ];

    for (const pattern of patterns) {
      const match = text.match(new RegExp(pattern, "i"));
      if (match) {
        return cleanText(match[1]);
      }
    }
    return `Unknown ${fieldName}`;
  };

  // Extract title (check both name and title fields)
  const title =
    extractInfoboxField("name", rawText) !== `Unknown name`
      ? extractInfoboxField("name", rawText)
      : extractInfoboxField("title", rawText);

  // Extract other basic info
  const director = extractInfoboxField("director", rawText);

  const budget = extractInfoboxField("budget", rawText);
  const boxOffice =
    extractInfoboxField("box_office", rawText) !== `Unknown box_office`
      ? extractInfoboxField("box_office", rawText)
      : extractInfoboxField("gross", rawText);

  // Extract plot with multiple possible section headings
  const plotSectionPatterns = [
    "== Plot ==",
    "==Plot==\n",
    "===Plot===",
    "== Plot==",
    "==Plot ==",
    "=== Plot ===",
    "== Synopsis ==",
    "===Synopsis===",
    "== Story ==",
    "===Story===",
  ];
  const plot =
    cleanText(findSectionContent(plotSectionPatterns, rawText)) ||
    "No Plot Available";

  // Extract cast with multiple possible section headings
  const castSectionPatterns = [
    "== Cast ==",
    "==Cast==\n",
    "===Cast===",
    "== Cast==",
    "==Cast ==",
    "=== Cast ===",
    "== Characters ==",
    "===Characters===",
  ];
  const castText = findSectionContent(castSectionPatterns, rawText);
  const cast: { actor: string; role: string }[] = [];

  // Process cast entries
  const castLines = castText
    .split("\n")
    .filter(
      (line) => line.trim().startsWith("*") || line.trim().startsWith("|")
    );

  for (const line of castLines) {
    const cleanLine = cleanText(line.replace(/^\*|\|/, ""));

    // Handle different cast listing formats
    const patterns = [
      /^(.*?)\s+as\s+(.*)$/i, // "Actor as Role"
      /^(.*?)\s+\.+\s+(.*)$/, // "Actor ... Role"
      /^(.*?)\s+–\s+(.*)$/, // "Actor – Role"
      /^(.*?)\s+plays\s+(.*)$/i, // "Actor plays Role"
      /^(.*?)\s+portrays\s+(.*)$/i, // "Actor portrays Role"
    ];

    let matched = false;
    for (const pattern of patterns) {
      const match = cleanLine.match(pattern);
      if (match) {
        cast.push({
          actor: cleanText(match[1]),
          role: cleanText(match[2]),
        });
        matched = true;
        break;
      }
    }

    if (!matched && cleanLine.length > 0) {
      cast.push({
        actor: cleanLine,
        role: "Unknown Role",
      });
    }
  }

  // Extract awards with multiple possible section headings
  const awardsSectionPatterns = [
    "== Awards ==",
    "===Awards===",
    "== Awards==",
    "==Awards ==",
    "=== Awards ===",
    "== Accolades ==",
    "===Accolades===",
    "== Reception ==",
    "===Reception===",
  ];

  const awards: Award[] = [];
  let accoladesText = findSectionContent(awardsSectionPatterns, rawText);

  // Process awards table
  if (accoladesText) {
    const tableStart = accoladesText.indexOf("{|");
    const tableEnd = accoladesText.indexOf("|}");

    if (tableStart !== -1 && tableEnd !== -1) {
      const tableText = accoladesText.slice(tableStart, tableEnd + 2);
      const rows = tableText.split("|-").filter((row) => row.trim());

      // Initialize variables to handle rowspan
      let currentValues: { [key: number]: { value: string; rowspan: number } } =
        {};

      for (const row of rows) {
        if (!row.trim() || row.includes("! style") || row.includes("!scope"))
          continue;

        const cells = row
          .split("\n")
          .filter((line) => line.startsWith("|") || line.startsWith("!"))
          .map((cell) => {
            let content = cell.slice(1).trim();
            const rowspanMatch = content.match(/rowspan="?(\d+)"?/i);
            const rowspan = rowspanMatch ? parseInt(rowspanMatch[1], 10) : 1;

            // Remove HTML and other formatting
            content = cleanText(content);

            // Handle cell with attributes
            const pipeIndex = content.lastIndexOf("|");
            if (pipeIndex !== -1) {
              content = content.slice(pipeIndex + 1).trim();
            }

            return { content, rowspan };
          });

        // Build award entry using cells and rowspan values
        if (cells.length >= 4) {
          const awardEntry: Award = {
            award: "",
            category: "",
            nominee: "",
            result: "",
          };

          let cellIndex = 0;
          ["award", "category", "nominee", "result"].forEach((field, i) => {
            if (currentValues[i] && currentValues[i].rowspan > 0) {
              awardEntry[field as keyof Award] = currentValues[i].value;
              currentValues[i].rowspan--;
            } else if (cells[cellIndex]) {
              awardEntry[field as keyof Award] = cells[cellIndex].content;
              if (cells[cellIndex].rowspan > 1) {
                currentValues[i] = {
                  value: cells[cellIndex].content,
                  rowspan: cells[cellIndex].rowspan - 1,
                };
              }
              cellIndex++;
            }
          });

          // Only add non-empty awards
          if (Object.values(awardEntry).some((value) => value.length > 0)) {
            awards.push(awardEntry);
          }
        }
      }
    }
  }

  return {
    // title,
    director,
    // budget,
    // boxOffice,
    plot,
    // awards,
    // cast,
  };
}
