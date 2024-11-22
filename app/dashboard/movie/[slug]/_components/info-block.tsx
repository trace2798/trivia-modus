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
  const [loadingTrivia, setLoadingTrivia] = useState(false);

  // const handleTriviaClick = async () => {
  //   setLoadingTrivia(true);
  //   try {
  //     const trivia = generateTrivia(movieDataAsString);
  //     setTriviaQuestions(trivia);
  //     console.log("Generated Trivia:", trivia);
  //   } catch (error) {
  //     console.error("Error generating trivia:", error);
  //   } finally {
  //     setLoadingTrivia(false);
  //   }
  // };
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
    // if (!movieName.trim()) {
    //   alert("Please enter a movie name!");
    //   return;
    // }
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
            <span>{movie.vote_average}</span>
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
          {/* {triviaData && (
            <div className="mt-4 bg-white p-4 rounded text-black">
              <h3 className="text-lg font-bold">Trivia Questions:</h3>
              <ul>
                {triviaData.generateTrivia.questions.map(
                  (q: any, idx: number) => (
                    <li key={idx} className="mb-3">
                      <p className="font-semibold">{q.question}</p>
                      <ul className="list-disc ml-5">
                        {q.options.map((option: string, index: number) => (
                          <li key={index}>{option}</li>
                        ))}
                      </ul>
                    </li>
                  )
                )}
              </ul>
            </div>
          )} */}
        </div>
      </div>
      {/* <div className="relative z-10 p-8 md:p-12 lg:p-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold">Rating:</span>
          <span className="text-2xl font-bold">{movie.vote_average}</span>
        </div>
        <div>
          <img
            className="w-24 md:w-36 lg:w-48 rounded-md shadow-lg"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          />
        </div>
      </div> */}
    </div>
  );
};

export default InfoBlock;
