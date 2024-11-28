"use client";
import { FC } from "react";
import TriviaQuiz from "../../movie/[slug]/trivia/_components/trivia-card";
import TriviaQuizTop from "./trivia-quiz-top";
type TriviaQuestion = {
  question: string;
  answer: string;
  options: string[];
};
interface QuestionFEProps {
  data: { generateTriviaFromData: TriviaQuestion[] };
}

const QuestionFE: FC<QuestionFEProps> = ({ data }) => {
  const triviaData = data.generateTriviaFromData.map((q: any) => ({
    question: q.question,
    answer: q.answer,
    options: q.options,
  }));
  return (
    <>
      <div>
        <TriviaQuizTop questions={data.generateTriviaFromData} />
      </div>
    </>
  );
};

export default QuestionFE;
