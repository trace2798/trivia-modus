"use client";
import { Button } from "@/components/ui/button";
import { CREATE_GAME, GENERATE_TRIVIA } from "@/lib/queries";
import { useLazyQuery, useMutation } from "@apollo/client";
import { format } from "date-fns";
import { FC, useState } from "react";
import { toast } from "sonner";

interface InfoBlockProps {
  data: {
    movieById: {
      id: number;
      title: string;
      release_date: string;
      overview: string;
      vote_average: number;
      backdrop_path: string;
      poster_path: string;
      tagline: string;
    };
  };
  movieDataAsString: string | null;
  movieId: string;
}

type TriviaQuestion = {
  question: string;
  options: string[];
  answer: string;
  difficulty: string;
  category: string;
};

const InfoBlock: FC<InfoBlockProps> = ({
  data,
  movieDataAsString,
  movieId,
}) => {
  const movie = data.movieById;
  const formattedDate = format(new Date(movie.release_date), "MMMM d, yyyy");
  const maxStars = 10;
  const stars = Math.round((movie.vote_average / 10) * maxStars);
  const [triviaQuestions, setTriviaQuestions] = useState<TriviaQuestion[]>([]);
  console.log("TRIVIA QUESTIONS", triviaQuestions);
  const [generateTrivia, { loading, error, data: triviaData }] = useLazyQuery(
    GENERATE_TRIVIA,
    {
      fetchPolicy: "no-cache",
      onCompleted: (data) => {
        console.log("Trivia DATA from LLM", data.generateTrivia);

        if (data.generateTrivia) {
          try {
            setTriviaQuestions(data.generateTrivia);
            sendQuestionsToBackend(data.generateTrivia);
          } catch (e) {
            console.error("Failed to parse JSON:", e);
            toast.error("Failed to parse trivia questions.");
          }
        } else {
          console.error("No movie information found:", data);
          toast.error("Failed to generate trivia questions.");
        }
      },
    }
  );
  const [
    createGameAndInsertQuestions,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_GAME, {
    onCompleted: (data) => {
      console.log("Mutation completed:", data);
      console.log(
        "Game created with ID:",
        data.createGameAndInsertQuestions
      );
      toast.success(
        `Game created successfully! Game ID: ${data.createGameAndInsertQuestions}`
      );
      // Proceed with navigation or other actions
    },
    onError: (error) => {
      console.error("Error creating game:", error);
      toast.error("Error saving game and trivia questions.");
    },
  });
  const sendQuestionsToBackend = async (questions: any) => {
    try {
      // // Prepare the data to send
      // const payload = {
      //   movieId: parseInt(movieId), // Ensure this ID is available
      //   movieTitle: data.movieById.title,
      //   questions: questions,
      // };
      // await createGameAndInsertQuestions({ variables: payload });
      const cleanedQuestions = questions.map(({ __typename, ...q }) => q);

      // Prepare the data to send
      const payload = {
        movieId: movieId as string, // Ensure this ID is available and an integer
        movieTitle: data.movieById.title as string,
        questions: cleanedQuestions,
      };
  
      await createGameAndInsertQuestions({ variables: payload });
  
    } catch (error) {
      console.error("Error saving game and questions:", error);
      toast.error("Error saving game and trivia questions.");
    }
  };
  const handleTriviaClick = async () => {
    generateTrivia({
      variables: {
        prompt: `Here is the content of the movie: ${movieDataAsString}`,
      },
    });
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
        <p>{movie.tagline}</p>
        <div>
          {movieDataAsString &&
            (() => {
              const parsedMovieData = JSON.parse(movieDataAsString); // Parse the JSON string
              return parsedMovieData.moviePlot &&
                parsedMovieData.moviePlot !== "Plot not available" ? (
                <Button
                  onClick={handleTriviaClick}
                  disabled={loading || mutationLoading}
                >
                  {loading || mutationLoading
                    ? "Generating Trivia..."
                    : "Start Trivia"}
                </Button>
              ) : null;
            })()}
          {error && <p className="text-red-500">Error: {error.message}</p>}
        </div>
      </div>
      {triviaQuestions && (
        <div className="bg-black p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Trivia Questions</h2>
          <div className="space-y-4">
            {triviaQuestions.map((question: TriviaQuestion, index: number) => (
              <div key={index} className="p-4 rounded-lg">
                <p className="text-lg font-semibold">{question.question}</p>
                <ul>
                  {question.options.map((option, idx) => (
                    <li key={idx}>{option}</li>
                  ))}
                </ul>
                <p className="text-sm">Answer: {question.answer}</p>
                <p className="text-sm">Difficulty: {question.difficulty}</p>
                <p className="text-sm">Category: {question.category}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InfoBlock;

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  difficulty?: string;
  category: string;
}

const parseAIResponse = (aiResponseString: string): QuizQuestion[] => {
  try {
    // Clean up the string first
    let cleanedString = aiResponseString
      .replace(/\\n/g, "") // Remove \n
      .replace(/\\/g, "") // Remove backslashes
      .replace(/'/g, '"'); // Replace single quotes with double quotes

    // Now, attempt to parse the cleaned string
    const parsed = JSON.parse(cleanedString);
    return parsed.questions;
  } catch (error) {
    console.error("Failed to parse AI response:", error);
    return [];
  }
};
