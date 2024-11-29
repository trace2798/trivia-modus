"use client";

import { getMovieBySearch } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

import { FC, useState } from "react";
import { toast } from "sonner";

interface MovieSearchProps {}

const MovieSearch: FC<MovieSearchProps> = ({}) => {
  const [movieName, setMovieName] = useState("");
  const [movieInfo, setMovieInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  // const [getMovie, { loading, error }] = useLazyQuery(GET_MOVIE, {
  //   fetchPolicy: "no-cache",
  //   onError: (err) => toast.error("Something went wrong. Try Again"),
  //   onCompleted: (data) => {
  //     if (data && data.movieInfo) {
  //       console.log("MOVIE INFO", data.movieInfo);
  //       setMovieInfo(data.movieInfo); // Set all movies
  //     } else {
  //       console.error("No movie information found:", data);
  //     }
  //   },
  // });

  const handleSearch = async () => {
    if (!movieName.trim()) {
      alert("Please enter a movie name!");
      return;
    }
    console.log("MOVIE NAME", movieName);
    setLoading(true);
    const response = await getMovieBySearch({ name: movieName });
    const data = await response.data;
    if (data && data.movieInfo) {
      console.log("MOVIE INFO", data.movieInfo);
      setMovieInfo(data.movieInfo); // Set all movies
      toast.success("Movie found successfully!");
      setLoading(false);
    } else {
      toast.error("No movie found!");
      setError("No movie information found.");
      console.error("No movie information found:", data);
    }
    // getMovie({ variables: { name: movieName } });
  };

  const getPosterUrl = (posterPath: string) => {
    return posterPath
      ? `https://image.tmdb.org/t/p/w200${posterPath}`
      : "https://via.placeholder.com/200x300?text=No+Image";
  };
  return (
    <div>
      <div className="flex flex-col space-y-5">
        <Input
          type="text"
          placeholder="Enter movie name"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <Button
          onClick={handleSearch}
          disabled={loading || !movieName.trim()}
          className="max-w-[200px]"
        >
          {loading ? "Loading..." : "Search Movie"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div>
        {loading && (
          <div>
            {" "}
            <Skeleton className="size-60 mt-5" />{" "}
          </div>
        )}
      </div>
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

export default MovieSearch;

// Get key from the foll0wing api
// https://api.wikimedia.org/core/v1/wikipedia/en/search/page?q=Avatar+2009

// https://api.wikimedia.org/core/v1/wikipedia/en/search/page?q=Avatar+2009+film

// use key to get full page
// https://api.wikimedia.org/core/v1/wikipedia/en/page/${encodeURIComponent(key)}
