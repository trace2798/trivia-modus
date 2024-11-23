"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { GET_MOVIE, GET_TOP_MOVIE } from "@/lib/queries";
import { useLazyQuery } from "@apollo/client";
import { format } from "date-fns";
import Link from "next/link";

import { FC, useState } from "react";
import { toast } from "sonner";

interface MovieSearchProps {
  movieInfo: any;
}

const TopMovie: FC<MovieSearchProps> = ({ movieInfo }) => {
  //   const [movieInfo, setMovieInfo] = useState([]);

  //   const [topMovie, { loading, error }] = useLazyQuery(GET_TOP_MOVIE, {
  //     fetchPolicy: "no-cache",
  //     onError: (err) => toast.error("Something went wrong. Try Again"),
  //     onCompleted: (data) => {
  //       if (data && data.movieInfo) {
  //         console.log("MOVIE INFO", data.movieInfo);
  //         setMovieInfo(data.movieInfo); // Set all movies
  //       } else {
  //         console.error("No movie information found:", data);
  //       }
  //     },
  //   });

  const getPosterUrl = (posterPath: string) => {
    return posterPath
      ? `https://image.tmdb.org/t/p/w200${posterPath}`
      : "https://via.placeholder.com/200x300?text=No+Image";
  };
  return (
    <div>
      {movieInfo.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
            {movieInfo.map((movie: any, index: number) => (
              <Card
                key={index}
                className="w-full flex flex-col justify-between border-none"
              >
                <Link href={`/dashboard/movie/${movie.id}`} className="w-full">
                  <CardContent className="px-0 ">
                    <div className="w-full max-w-sm h-[300px]">
                      <img
                        src={getPosterUrl(movie.poster_path)}
                        alt={`${movie.title} Poster`}
                        className=" rounded overflow-hidden w-full h-[300px] object-cover"
                      />
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col text-center p-0 pb-3">
                    <p className="text-lg">{movie.title}</p>
                    <p className="text-sm text-primary/80"></p>
                  </CardFooter>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopMovie;
