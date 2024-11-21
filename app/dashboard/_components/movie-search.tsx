"use client";

import { Button } from "@/components/ui/button";
import { GET_MOVIE } from "@/lib/queries";
import { useLazyQuery } from "@apollo/client";
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
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {movieInfo.map((movie: any, index) => (
              <div
                key={index}
                className="mb-4 border-b pb-4 flex flex-col justify-center items-center space-y-5"
              >
                <Link href={`/dashboard/movie/${movie.id}`} className="w-full">
                  <div className="w-full max-w-[250px] h-[300px] ">
                    <img
                      src={getPosterUrl(movie.poster_path)} // Render the poster
                      alt={`${movie.title} Poster`}
                      className=" rounded overflow-hidden w-[250px] h-[300px] object-cover"
                    />
                  </div>
                  <div className="flex flex-col h-full text-center">
                    <p>{movie.title} {movie.release_date} {movie.id}</p>
                  </div>
                  <div>
                    <Button variant={"secondary"}>Read More</Button>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
