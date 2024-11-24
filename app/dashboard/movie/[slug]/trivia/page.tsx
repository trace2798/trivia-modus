import { getClient } from "@/lib/apollo-client";
import { GET_QUESTIONS_BY_GAME_ID } from "@/lib/queries";
import { FC } from "react";
import TriviaQuiz from "./_components/trivia-card";

interface PageProps {
  params: {
    slug: string;
  };
}

type TriviaQuestion = {
  question_text: string;
  options: string[];
  correct_answer: string;
  difficulty: string;
  category: string;
};

const Page: FC<PageProps> = async ({}) => {
  const { data } = await getClient().query({
    query: GET_QUESTIONS_BY_GAME_ID,
    variables: {
      gameId: "1",
    },
  });

  console.log("DATA", data.findQuestionById);
  return (
    <>
      <div>
        <TriviaQuiz questions={data.findQuestionById} />
      </div>
    </>
  );
};

export default Page;
