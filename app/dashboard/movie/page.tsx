import { getClient } from "@/lib/apollo-client";
import { GET_TOP_MOVIE } from "@/lib/queries";
import { FC } from "react";
import MovieSearch from "../_components/movie-search";
import TopMovie from "../_components/top-movies";
interface PageProps {}
export const dynamic = "force-dynamic";

const Page: FC<PageProps> = async ({}) => {

  // const { data: topMovie } = await getClient().query({
  //   query: GET_TOP_MOVIE,
  // });
  // console.log("TOP MOVIE", topMovie.topMovies);
  return (
    <>
      <div className="p-12">
        <MovieSearch />
        {/* <TopMovie movieInfo={topMovie?.topMovies} /> */}
      </div>
    </>
  );
};

export default Page;
