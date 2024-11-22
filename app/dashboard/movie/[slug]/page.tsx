import { getClient } from "@/lib/apollo-client";
import { ExtractMovieInfo } from "@/lib/extract-movie-info";
import { GENERATE_TRIVIA, GET_MOVIE_BY_ID, GET_WIKI_INFO } from "@/lib/queries";
import { FC } from "react";
import InfoBlock from "./_components/info-block";
import GenerateTriviaButton from "./_components/generate-trivia-button";
import { format } from "date-fns";

interface pageProps {
  params: {
    slug: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const { data } = await getClient().query({
    query: GET_MOVIE_BY_ID,
    variables: { id: parseInt(params.slug) },
  });
  // console.log(data);
  const { data: data2 } = await getClient().query({
    query: GET_WIKI_INFO,
    variables: {
      name: `${data.movieById.title}  ${format(
        new Date(data.movieById.release_date),
        "yyyy"
      )} film`,
    },
  });
  console.log("WIKI DATA 2", data2);
  const movieData = ExtractMovieInfo(data2.wikipediaInfo);
  console.log(movieData);
  const movieDataAsString = JSON.stringify(movieData);
  // const { data: data3 } = await getClient().query({
  //   query: GENERATE_TRIVIA,
  //   variables: { prompt: movieDataAsString },
  // });
  // console.log("Trivia DATA 3", data3);
  return (
    <>
      <InfoBlock data={data} movieDataAsString={movieDataAsString} />
      {/* <GenerateTriviaButton promptData={movieData} /> */}
    </>
  );
};

export default page;
