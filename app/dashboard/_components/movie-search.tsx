"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { GET_MOVIE } from "@/lib/queries";
import { useLazyQuery } from "@apollo/client";
import { format } from "date-fns";
import Link from "next/link";

import { FC, useState } from "react";

interface MovieSearchProps {}

const MovieSearch: FC<MovieSearchProps> = ({}) => {
  const [movieName, setMovieName] = useState("");
  const [movieInfo, setMovieInfo] = useState([]);

  const [getMovie, { loading, error }] = useLazyQuery(GET_MOVIE, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      if (data && data.movieInfo) {
        console.log("MOVIE INFO", data.movieInfo);
        setMovieInfo(data.movieInfo); // Set all movies
      } else {
        console.error("No movie information found:", data);
      }
    },
  });

  const handleSearch = async () => {
    if (!movieName.trim()) {
      alert("Please enter a movie name!");
      return;
    }
    getMovie({ variables: { name: movieName } });
  };

  const getPosterUrl = (posterPath: string) => {
    return posterPath
      ? `https://image.tmdb.org/t/p/w200${posterPath}`
      : "https://via.placeholder.com/200x300?text=No+Image";
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter movie name"
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)} // Update the input state
        className="border p-2 rounded w-full mb-4"
      />
      <Button onClick={handleSearch} disabled={loading}>
        {loading ? "Loading..." : "Search Movie"}
      </Button>

      {error && <p className="text-red-500">Error: {error.message}</p>}

      {movieInfo.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
            {movieInfo.map((movie: any, index) => (
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
                    <p className="text-sm text-primary/80">
                      {/* {format(new Date(movie.release_date), "MMMM d, yyyy")} */}
                    </p>
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

export default MovieSearch;

// Get key from the foll0wing api
// https://api.wikimedia.org/core/v1/wikipedia/en/search/page?q=Avatar+2009

// https://api.wikimedia.org/core/v1/wikipedia/en/search/page?q=Avatar+2009+film

// use key to get full page
// https://api.wikimedia.org/core/v1/wikipedia/en/page/${encodeURIComponent(key)}