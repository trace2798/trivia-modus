// "use client";
import { FC } from "react";
import MovieSearch from "./_components/movie-search";
import { stackServerApp } from "@/stack";
import { getClient } from "@/lib/apollo-client";
import { GET_TOP_MOVIE, GET_USER_PROFILE } from "@/lib/queries";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
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
  console.log("TOP MOVIE", topMovie);
  console.log("TOP MOVIE ARRAY", topMovie?.topMovies);
  return (
    <>
      <div className="p-12">
        <MovieSearch />
        <TopMovie movieInfo={topMovie?.topMovies} />
        {/* {topMovie.length > 0 && (
          <div className="mt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
              {topMovie.topMovies.map((movie: any, index: any) => (
                <Card
                  key={index}
                  className="w-full flex flex-col justify-between border-none"
                >
                  <Link
                    href={`/dashboard/movie/${movie.id}`}
                    className="w-full"
                  >
                    <CardContent className="px-0 ">
                      <div className="w-full max-w-sm h-[300px]">
                        <img
                          src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                          alt={`${movie.title} Poster`}
                          className=" rounded overflow-hidden w-full h-[300px] object-cover"
                        />
                      </div>
                    </CardContent>

                    <CardFooter className="flex flex-col text-center p-0 pb-3">
                      <p className="text-lg">{movie.title}</p>
                      <p className="text-sm text-primary/80">
                      
                      </p>
                    </CardFooter>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )} */}
      </div>
    </>
  );
};

export default Page;
