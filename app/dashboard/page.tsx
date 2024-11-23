// "use client";
import { getClient } from "@/lib/apollo-client";
import { GET_TOP_MOVIE, GET_USER_PROFILE } from "@/lib/queries";
import { stackServerApp } from "@/stack";
import { FC } from "react";
import MovieSearch from "./_components/movie-search";
import TopMovie from "./_components/top-movies";

interface PageProps {}

const Page: FC<PageProps> = async ({}) => {
  const user = await stackServerApp.getUser();
  console.log("USER", user);
  const { data } = await getClient().query({
    query: GET_USER_PROFILE,
    variables: {
      userId: user?.id,
      email: user?.primaryEmail,
      name: user?.displayName,
    },
  });
  console.log("DATA", data);

  const { data: topMovie } = await getClient().query({
    query: GET_TOP_MOVIE,
  });
  // console.log("TOP MOVIE", topMovie);
  // console.log("TOP MOVIE ARRAY", topMovie?.topMovies);
  return (
    <>
      <div className="p-12">
        <MovieSearch />
        <TopMovie movieInfo={topMovie?.topMovies} />
      </div>
    </>
  );
};

export default Page;
