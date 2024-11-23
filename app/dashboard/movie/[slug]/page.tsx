// import { getClient } from "@/lib/apollo-client";
// import { ExtractMovieInfo } from "@/lib/extract-movie-info";
// import { GET_MOVIE_BY_ID, GET_WIKI_INFO } from "@/lib/queries";
// import { format } from "date-fns";
// import { FC } from "react";
// import InfoBlock from "./_components/info-block";

// interface pageProps {
//   params: {
//     slug: string;
//   };
// }

// const page: FC<pageProps> = async ({ params }) => {
//   const { data } = await getClient().query({
//     query: GET_MOVIE_BY_ID,
//     variables: { id: parseInt(params.slug) },
//   });
//   // console.log(data);
//   const { data: data2, loading, error } = await getClient().query({
//     query: GET_WIKI_INFO,
//     variables: {
//       name: `${data.movieById.title}  ${format(
//         new Date(data.movieById.release_date),
//         "yyyy"
//       )} film`,
//     },
//   });
//   // console.log("WIKI DATA 2", data2);
//   const moviePlot = ExtractMovieInfo(data2.wikipediaInfo);
//   console.log(moviePlot);
//   const movieData = {
//     ...data.movieById,
//     moviePlot,
//   };

//   const movieDataAsString = JSON.stringify(movieData);
//   // const movieDataAsString = JSON.stringify(movieData);
//   // console.log("MOVIE DATA", movieData);
//   // console.log("MOVIE DATA AS STRING", movieDataAsString);
//   return (
//     <>
//       <InfoBlock data={data} movieDataAsString={movieDataAsString} />
//     </>
//   );
// };

// export default page;
import { getClient } from "@/lib/apollo-client";
import { ExtractMovieInfo } from "@/lib/extract-movie-info";
import { GET_MOVIE_BY_ID, GET_WIKI_INFO } from "@/lib/queries";
import { format } from "date-fns";
import { FC } from "react";
import InfoBlock from "./_components/info-block";

interface pageProps {
  params: {
    slug: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  try {
    const { data } = await getClient().query({
      query: GET_MOVIE_BY_ID,
      variables: { id: parseInt(params.slug) },
    });

    let moviePlot: string = "Plot not available"; // Default fallback
    try {
      // Fetch Wikipedia data
      const { data: data2 } = await getClient().query({
        query: GET_WIKI_INFO,
        variables: {
          name: `${data.movieById.title} ${format(
            new Date(data.movieById.release_date),
            "yyyy"
          )} film`,
        },
      });

      // Ensure ExtractMovieInfo returns a string or extract the plot field
      const extractedInfo = ExtractMovieInfo(data2.wikipediaInfo);
      moviePlot =
        typeof extractedInfo === "string"
          ? extractedInfo
          : extractedInfo.plot || "Plot not available";
    } catch (wikiError) {
      console.error("Failed to fetch Wikipedia info:", wikiError);
    }

    // Combine data
    const movieData = {
      ...data.movieById,
      moviePlot,
    };

    const movieDataAsString = JSON.stringify(movieData);

    return (
      <>
        <InfoBlock data={data} movieDataAsString={movieDataAsString} />
      </>
    );
  } catch (error) {
    console.error("Failed to fetch movie data:", error);
    return (
      <div>
        <p>Failed to load the movie page. Please try again later.</p>
      </div>
    );
  }
};

export default page;
