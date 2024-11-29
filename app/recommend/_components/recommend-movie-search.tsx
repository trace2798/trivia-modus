"use client";

import { recommendMovie } from "@/app/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { FC, useState } from "react";
import { toast } from "sonner";

interface RecommendMovieSearchProps {}

const RecommendMovieSearch: FC<RecommendMovieSearchProps> = ({}) => {
  const [movieName, setMovieName] = useState("");
  const [movieInfo, setMovieInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!movieName.trim()) {
      alert("Please enter a movie name!");
      return;
    }

    console.log("MOVIE NAME", movieName);
    setLoading(true);

    try {
      const response = await recommendMovie({ query: movieName });
      const data = await response.data;

      // Navigate to the search results
      if (data && data.searchMovie && data.searchMovie.searchObjs) {
        const movies = data.searchMovie.searchObjs.map((obj: any) => ({
          id: obj.movie.id,
          title: obj.movie.title,
          overview: obj.movie.overview,
          release_date: obj.movie.release_date,
          score: obj.score,
        }));

        console.log("MOVIE INFO", movies);

        // Set movieInfo to the list of movies
        setMovieInfo(movies);
        toast.success("Movies found successfully!");
      } else {
        toast.error("No movies found!");
        setError("No movie information found.");
        console.error("No movie information found:", data);
      }
    } catch (error) {
      console.error("Error during movie search:", error);
      toast.error("An error occurred while searching for movies.");
      setError("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col space-y-5">
        <Input
          type="text"
          placeholder="What Type of Movie Are You Looking For?"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        <Button
          onClick={handleSearch}
          disabled={loading || !movieName.trim()}
          className="max-w-[200px]"
        >
          {loading ? "Loading..." : "Recommend Movie"}
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
          <div className="grid grid-cols-1 gap-10">
            {movieInfo.map((movie: any, index) => (
              <Card
                key={index}
                className="w-full flex flex-col justify-between border-none rounded-none"
              >
                <Link
                  href={`/dashboard/movie/${parseInt(movie.id)}`}
                  className="w-full"
                >
                  <CardHeader>{movie.title}</CardHeader>
                  <CardContent className="px-0 ">{movie.overview}</CardContent>
                  <CardFooter className="flex flex-col p-0 pb-3"></CardFooter>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendMovieSearch;
