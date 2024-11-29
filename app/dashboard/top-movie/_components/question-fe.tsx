"use client";
import { FC, useEffect } from "react";
import TriviaQuizTop from "./trivia-quiz-top";
import { toast } from "sonner";
import { useMutation } from "@apollo/client";
import { CREATE_GAME, CREATE_GAME_TOP } from "@/lib/queries";
import { useRouter } from "next/navigation";

type TriviaQuestion = {
  question: string;
  answer: string;
  options: string[];
};

interface QuestionFEProps {
  data: { generateTriviaFromData: TriviaQuestion[] };
  movieId: string;
  movieTitle: string;
}

const QuestionFE: FC<QuestionFEProps> = ({ data, movieId, movieTitle }) => {
  const router = useRouter();
  const triviaData = data.generateTriviaFromData.map((q: any) => ({
    question: q.question,
    answer: q.answer,
    options: q.options,
  }));

  // GraphQL Mutation for creating game and inserting questions
  const [
    createGameAndInsertQuestionsTop,
    { data: mutationData, loading: mutationLoading, error: mutationError },
  ] = useMutation(CREATE_GAME_TOP, {
    onCompleted: (data) => {
      console.log("Mutation completed:", data);
      toast.success(
        `Game created successfully! Game ID: ${data.createGameAndInsertQuestionsTop}`
      );
      router.push(
        `/dashboard/top-movie/trivia/${data.createGameAndInsertQuestionsTop}`
      );
    },
    onError: (error) => {
      console.error("Error creating game:", error);
      toast.error("Error saving game and trivia questions.");
    },
  });

  // Function to send questions to the backend
  const sendQuestionsToBackend = async (questions: TriviaQuestion[]) => {
    try {
      // Clean up questions to remove any extraneous fields
    

      // Prepare payload
      const payload = {
        movieId, // Pass dynamic movie ID
        movieTitle, // Pass dynamic movie title
        questions: questions,
      };

      // Call the mutation
      await createGameAndInsertQuestionsTop({ variables: payload });
    } catch (error) {
      console.error("Error saving game and questions:", error);
      toast.error("Error saving game and trivia questions.");
    }
  };

  // Automatically send questions to the backend when triviaData is available
  useEffect(() => {
    if (triviaData.length > 0) {
      sendQuestionsToBackend(triviaData);
    }
  }, [triviaData]);

  // Render the trivia component
  return (
    <div>
      <TriviaQuizTop questions={data.generateTriviaFromData} />
    </div>
  );
};

export default QuestionFE;
