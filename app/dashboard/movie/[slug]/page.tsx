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
  return (
    <>
      <InfoBlock data={data} movieDataAsString={movieDataAsString} />
    </>
  );
};

export default page;
