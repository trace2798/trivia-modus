"use client";
import { FC, useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { useLazyQuery } from "@apollo/client";
import { GENERATE_TRIVIA } from "@/lib/queries";

interface InfoBlockProps {
  data: {
    movieById: {
      title: string;
      release_date: string;
      overview: string;
      vote_average: number;
      backdrop_path: string;
      poster_path: string;
    };
  };
  movieDataAsString: string;
}

const InfoBlock: FC<InfoBlockProps> = ({ data, movieDataAsString }) => {
  const movie = data.movieById;
  const formattedDate = format(new Date(movie.release_date), "MMMM d, yyyy");

  // Generate star rating
  const maxStars = 10;
  const stars = Math.round((movie.vote_average / 10) * maxStars);
  const [triviaQuestions, setTriviaQuestions] = useState<string | null>(null);

  const [generateTrivia, { loading, error }] = useLazyQuery(GENERATE_TRIVIA, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      console.log("Trivia DATA", data);
      if (movieDataAsString) {
        console.log("MOVIE INFO", movieDataAsString);
        setTriviaQuestions(data.generateTrivia); // Set all movies
      } else {
        console.error("No movie information found:", data);
      }
    },
  });

  const handleTriviaClick = async () => {
    generateTrivia({ variables: { prompt: movieDataAsString } });
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center text-white flex flex-col justify-between"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 p-8 md:p-12 lg:p-16 space-y-5">
        <div className="mb-4">
          <h1 className="text-4xl md:text-6xl font-bold">{movie.title}</h1>
          <p className="text-lg mt-2">{formattedDate}</p>
          <div className="flex items-center space-x-5">
            <div>
              {Array.from({ length: maxStars }).map((_, i) => (
                <span
                  key={i}
                  className={`text-2xl ${
                    i < stars ? "text-yellow-400" : "text-gray-400"
                  }`}
                >
                  ★
                </span>
              ))}{" "}
            </div>
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
        <p className="text-sm md:text-lg max-w-3xl leading-relaxed">
          {movie.overview}
        </p>
        <div>
          {/* <Button onClick={() => handleTriviaClick()}>Start Trivia</Button> */}
          <Button onClick={handleTriviaClick} disabled={loading}>
            {loading ? "Generating Trivia..." : "Start Trivia"}
          </Button>
          {error && <p className="text-red-500">Error: {error.message}</p>}
        </div>
      </div>
      {triviaQuestions && (
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Trivia Questions</h2>
          <div className="space-y-4">
            {triviaQuestions.split("\n").map((question: string, index: number) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg">
                <p className="text-lg font-semibold">{question}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoBlock;