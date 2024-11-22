// interface Award {
//   award: string;
//   category: string;
//   nominee: string;
//   result: string;
// }

// interface MovieInfo {
//   title: string;
//   director: string;
//   starring: string[];
//   releaseDate: string;
//   budget: string;
//   boxOffice: string;
//   plot: string;
//   awards: Award[];
//   cast: { actor: string; role: string }[];
// }

// export function ExtractMovieInfo(rawText: string): MovieInfo {
//   const cleanText = (text: string): string =>
//     text
//       // Replace {{won}}, {{nom}}, {{draw|...}} with corresponding text
//       .replace(/\{\{won\}\}/gi, "Won")
//       .replace(/\{\{nom\}\}/gi, "Nominated")
//       .replace(/\{\{draw\|.*?\}\}/gi, "Tie")
//       // Remove other templates
//       .replace(/\{\{.*?\}\}/g, "")
//       // Replace links with display text
//       .replace(/\[\[([^\|\]]+)\|([^\]]+)\]\]/g, "$2")
//       // Replace links without display text
//       .replace(/\[\[([^\]]+)\]\]/g, "$1")
//       // Remove HTML tags
//       .replace(/<.*?>/g, "")
//       // Replace multiple spaces or newlines with a single space
//       .replace(/\s+/g, " ")
//       .trim();
//   // Extract title
//   const titleMatch = rawText.match(/name\s*=\s*(.*?)\n/);
//   const title = titleMatch ? cleanText(titleMatch[1]) : "Unknown Title";

//   // Extract director
//   const directorMatch = rawText.match(/director\s*=\s*(.*?)\n/);
//   const director = directorMatch
//     ? cleanText(directorMatch[1])
//     : "Unknown Director";

//   // Extract starring
//   const starringMatch = rawText.match(/starring\s*=\s*(.*?)\n/);
//   const starring = starringMatch
//     ? starringMatch[1].split(",").map((actor) => cleanText(actor))
//     : ["Unknown Cast"];

//   // Extract release date
//   const releaseDateMatch = rawText.match(
//     /released\s*=\s*\{\{Film date\|(.*?)\}\}/
//   );
//   const releaseDate = releaseDateMatch
//     ? cleanText(releaseDateMatch[1])
//     : "Unknown Release Date";

//   // Extract budget
//   const budgetMatch = rawText.match(/budget\s*=\s*(.*?)\n/);
//   const budget = budgetMatch ? cleanText(budgetMatch[1]) : "Unknown Budget";

//   // Extract box office
//   const boxOfficeMatch = rawText.match(/gross\s*=\s*(.*?)\n/);
//   const boxOffice = boxOfficeMatch
//     ? cleanText(boxOfficeMatch[1])
//     : "Unknown Box Office";

//   // Extract plot
//   const plotStart = rawText.indexOf("=== Plot ===");
//   const plotEnd = rawText.indexOf("==", plotStart + 7); // Find next section
//   const plot =
//     plotStart !== -1
//       ? cleanText(
//           rawText.slice(plotStart + 7, plotEnd !== -1 ? plotEnd : undefined)
//         )
//       : "No Plot Available";

//   // Extract awards
//   function findPipeOutsideBraces(text: string): number {
//     let depthCurly = 0;
//     let depthSquare = 0;
//     for (let i = 0; i < text.length; i++) {
//       const c = text[i];
//       if (c === '{') {
//         depthCurly++;
//       } else if (c === '}') {
//         if (depthCurly > 0) depthCurly--;
//       } else if (c === '[') {
//         depthSquare++;
//       } else if (c === ']') {
//         if (depthSquare > 0) depthSquare--;
//       } else if (c === '|' && depthCurly === 0 && depthSquare === 0) {
//         return i;
//       }
//     }
//     return -1;
//   }
  
//   // Extract awards
//   const awards: Award[] = [];
//   const accoladesSectionStart = rawText.indexOf("===Accolades===");
//   if (accoladesSectionStart !== -1) {
//     const tableStart = rawText.indexOf("{|", accoladesSectionStart);
//     const tableEnd = rawText.indexOf("|}", tableStart);
  
//     if (tableStart !== -1 && tableEnd !== -1) {
//       const tableText = rawText.slice(tableStart, tableEnd + 2);
//       const rows = tableText.split("|-");
  
//       // Initialize variables to handle rowspan for each column
//       let currentValues: { [key: number]: { value: string; rowspan: number } } = {};
  
//       for (const row of rows) {
//         if (!row.trim()) continue; // Skip empty rows
  
//         const lines = row.trim().split("\n");
//         const cells = [];
//         for (const line of lines) {
//           if (line.startsWith("|") || line.startsWith("!")) {
//             let cellContent = line.slice(1).trim();
  
//             // Extract and remove cell attributes
//             let attributes = "";
//             const pipeIndex = findPipeOutsideBraces(cellContent);
//             if (pipeIndex !== -1) {
//               attributes = cellContent.slice(0, pipeIndex).trim();
//               cellContent = cellContent.slice(pipeIndex + 1).trim();
//             }
  
//             // Handle rowspan
//             let rowspan = 1;
//             const rowspanMatch = attributes.match(/rowspan="(\d+)"/);
//             if (rowspanMatch) {
//               rowspan = parseInt(rowspanMatch[1], 10);
//             }
  
//             cells.push({ content: cellContent, rowspan });
//           }
//         }
  
//         // Variables to keep track of cell positions and values
//         const columns = ['award', 'category', 'nominee', 'result', 'ref'];
//         const cellValues: string[] = [];
//         let cellIndex = 0;
  
//         for (let colIndex = 0; colIndex < columns.length; colIndex++) {
//           // Check if we have a stored value due to rowspan
//           if (currentValues[colIndex] && currentValues[colIndex].rowspan > 0) {
//             cellValues.push(currentValues[colIndex].value);
//             currentValues[colIndex].rowspan--;
//           } else if (cells[cellIndex]) {
//             const cell = cells[cellIndex];
//             cellValues.push(cell.content);
  
//             // If the cell has a rowspan, store its value and rowspan count
//             if (cell.rowspan > 1) {
//               currentValues[colIndex] = {
//                 value: cell.content,
//                 rowspan: cell.rowspan - 1,
//               };
//             } else {
//               delete currentValues[colIndex]; // Clear any previous rowspan
//             }
  
//             cellIndex++;
//           } else {
//             // No cell or rowspan value for this column
//             cellValues.push('');
//           }
//         }
  
//         // Skip header row
//         if (
//           cellValues[0].trim().toLowerCase() === "award" &&
//           cellValues[1].trim().toLowerCase() === "category"
//         ) {
//           continue;
//         }
  
//         // Clean and add the award entry
//         if (cellValues.length >= 4) {
//           awards.push({
//             award: cleanText(cellValues[0]),
//             category: cleanText(cellValues[1]),
//             nominee: cleanText(cellValues[2]),
//             result: cleanText(cellValues[3]),
//           });
//         }
//       }
//     }
//   }

//   //   const awards: Award[] = [];
//   //   const accoladesSectionStart = rawText.indexOf("===Accolades===");
//   //   if (accoladesSectionStart !== -1) {
//   //     const tableStart = rawText.indexOf("{|", accoladesSectionStart);
//   //     const tableEnd = rawText.indexOf("|}", tableStart);

//   //     if (tableStart !== -1 && tableEnd !== -1) {
//   //       const tableText = rawText.slice(tableStart + 2, tableEnd);
//   //       const rows = tableText.split("|-").slice(1); // Split rows and ignore the header
//   //       for (const row of rows) {
//   //         const columns = row.split("\n|").map((col) => cleanText(col));
//   //         if (columns.length >= 4) {
//   //           awards.push({
//   //             award: columns[0],
//   //             category: columns[1],
//   //             nominee: columns[2],
//   //             result: columns[3],
//   //           });
//   //         }
//   //       }
//   //     }
//   //   }

//   // Extract cast
//   const cast: { actor: string; role: string }[] = [];
//   const castSectionStart = rawText.indexOf("==Cast==");
//   if (castSectionStart !== -1) {
//     const castSectionEnd = rawText.indexOf("==", castSectionStart + 7);
//     const castText = rawText.slice(
//       castSectionStart + 7,
//       castSectionEnd !== -1 ? castSectionEnd : undefined
//     );
//     const castEntries = castText
//       .split("\n")
//       .filter((line) => line.startsWith("*"));
//     for (const entry of castEntries) {
//       const parts = cleanText(entry).split(" as ");
//       if (parts.length === 2) {
//         cast.push({ actor: parts[0].trim(), role: parts[1].trim() });
//       } else {
//         cast.push({ actor: parts[0].trim(), role: "Unknown Role" });
//       }
//     }
//   }

//   return {
//     title,
//     director,
//     starring,
//     releaseDate,
//     budget,
//     boxOffice,
//     plot,
//     awards,
//     cast,
//   };
// }
interface Award {
  award: string;
  category: string;
  nominee: string;
  result: string;
}

interface MovieInfo {
  title: string;
  director: string;
  starring: string[];
  releaseDate: string;
  budget: string;
  boxOffice: string;
  plot: string;
  awards: Award[];
  cast: { actor: string; role: string }[];
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
  const findSectionContent = (sectionPatterns: string[], rawText: string): string => {
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
      const match = text.match(new RegExp(pattern, 'i'));
      if (match) {
        return cleanText(match[1]);
      }
    }
    return `Unknown ${fieldName}`;
  };

  // Extract title (check both name and title fields)
  const title = extractInfoboxField('name', rawText) !== `Unknown name` 
    ? extractInfoboxField('name', rawText)
    : extractInfoboxField('title', rawText);

  // Extract other basic info
  const director = extractInfoboxField('director', rawText);
  const starring = extractInfoboxField('starring', rawText)
    .split(/,|\band\b/)
    .map(actor => cleanText(actor))
    .filter(actor => actor.length > 0);

  const releaseDate = extractInfoboxField('released', rawText);
  const budget = extractInfoboxField('budget', rawText);
  const boxOffice = extractInfoboxField('box_office', rawText) !== `Unknown box_office`
    ? extractInfoboxField('box_office', rawText)
    : extractInfoboxField('gross', rawText);

  // Extract plot with multiple possible section headings
  const plotSectionPatterns = [
    "== Plot ==",
    "===Plot===",
    "== Plot==",
    "==Plot ==",
    "=== Plot ===",
    "== Synopsis ==",
    "===Synopsis===",
    "== Story ==",
    "===Story==="
  ];
  const plot = cleanText(findSectionContent(plotSectionPatterns, rawText)) || "No Plot Available";

  // Extract cast with multiple possible section headings
  const castSectionPatterns = [
    "== Cast ==",
    "===Cast===",
    "== Cast==",
    "==Cast ==",
    "=== Cast ===",
    "== Characters ==",
    "===Characters==="
  ];
  const castText = findSectionContent(castSectionPatterns, rawText);
  const cast: { actor: string; role: string }[] = [];
  
  // Process cast entries
  const castLines = castText.split('\n').filter(line => 
    line.trim().startsWith('*') || line.trim().startsWith('|')
  );

  for (const line of castLines) {
    const cleanLine = cleanText(line.replace(/^\*|\|/, ''));
    
    // Handle different cast listing formats
    const patterns = [
      /^(.*?)\s+as\s+(.*)$/i,           // "Actor as Role"
      /^(.*?)\s+\.+\s+(.*)$/,           // "Actor ... Role"
      /^(.*?)\s+–\s+(.*)$/,             // "Actor – Role"
      /^(.*?)\s+plays\s+(.*)$/i,        // "Actor plays Role"
      /^(.*?)\s+portrays\s+(.*)$/i,     // "Actor portrays Role"
    ];

    let matched = false;
    for (const pattern of patterns) {
      const match = cleanLine.match(pattern);
      if (match) {
        cast.push({
          actor: cleanText(match[1]),
          role: cleanText(match[2])
        });
        matched = true;
        break;
      }
    }

    if (!matched && cleanLine.length > 0) {
      cast.push({
        actor: cleanLine,
        role: "Unknown Role"
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
    "===Reception==="
  ];

  const awards: Award[] = [];
  let accoladesText = findSectionContent(awardsSectionPatterns, rawText);
  
  // Process awards table
  if (accoladesText) {
    const tableStart = accoladesText.indexOf("{|");
    const tableEnd = accoladesText.indexOf("|}");
    
    if (tableStart !== -1 && tableEnd !== -1) {
      const tableText = accoladesText.slice(tableStart, tableEnd + 2);
      const rows = tableText.split("|-").filter(row => row.trim());

      // Initialize variables to handle rowspan
      let currentValues: { [key: number]: { value: string; rowspan: number } } = {};

      for (const row of rows) {
        if (!row.trim() || row.includes("! style") || row.includes("!scope")) continue;

        const cells = row
          .split("\n")
          .filter(line => line.startsWith("|") || line.startsWith("!"))
          .map(cell => {
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
            result: ""
          };

          let cellIndex = 0;
          ['award', 'category', 'nominee', 'result'].forEach((field, i) => {
            if (currentValues[i] && currentValues[i].rowspan > 0) {
              awardEntry[field as keyof Award] = currentValues[i].value;
              currentValues[i].rowspan--;
            } else if (cells[cellIndex]) {
              awardEntry[field as keyof Award] = cells[cellIndex].content;
              if (cells[cellIndex].rowspan > 1) {
                currentValues[i] = {
                  value: cells[cellIndex].content,
                  rowspan: cells[cellIndex].rowspan - 1
                };
              }
              cellIndex++;
            }
          });

          // Only add non-empty awards
          if (Object.values(awardEntry).some(value => value.length > 0)) {
            awards.push(awardEntry);
          }
        }
      }
    }
  }

  return {
    title,
    director,
    starring,
    releaseDate,
    budget,
    boxOffice,
    plot,
    awards,
    cast
  };
}