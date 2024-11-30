'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import {
  updateGameStatus,
  updateUserAnswerWithQuestionId,
} from '@/app/actions';

type TriviaQuestion = {
  id: string;
  question_text: string;
  options: string[];
  correct_answer: string;
  difficulty: string;
  category: string;
};

const TriviaQuiz = ({
  questions,
  gameId,
}: {
  questions: TriviaQuestion[];
  gameId: string;
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  // Filter out invalid questions
  const validQuestions = questions.filter(
    (q) => q.question_text && q.options.length > 0 && q.correct_answer,
  );

  const currentQuestion = validQuestions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === validQuestions.length - 1;

  const handleAnswerSelect = async (answer: string) => {
    if (hasAnswered) return; // Prevent changing answer after selection

    setSelectedAnswer(answer);
    setHasAnswered(true);
    console.log(
      'SELECTED ANSWER BY USER',
      answer,
      currentQuestion.correct_answer,
    );
    if (answer === currentQuestion.correct_answer) {
      setScore(score + 1);
    }
    await updateUserAnswerWithQuestionId({
      questionId: currentQuestion.id,
      answer,
      isCorrect: answer === currentQuestion.correct_answer,
    });
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResult(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer('');
      setHasAnswered(false);
    }
  };

  const handleRestart = async () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer('');
    setScore(0);
    setShowResult(false);
    setHasAnswered(false);
  };

  const handleFinish = async () => {
    setShowResult(true);
    await updateGameStatus({ gameId });
  };
  const getOptionStyle = (option: string) => {
    if (!hasAnswered) return 'text-primary';

    if (option === currentQuestion.correct_answer) {
      return 'text-green-600 font-semibold';
    }
    if (
      option === selectedAnswer &&
      option !== currentQuestion.correct_answer
    ) {
      return 'text-red-600 font-semibold';
    }
    return 'text-primary';
  };

  if (validQuestions.length === 0) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardContent className="p-6">
          <p className="text-center">No valid questions available.</p>
        </CardContent>
      </Card>
    );
  }

  if (showResult) {
    return (
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-center">Quiz Complete!</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <p className="text-center text-xl mb-4">
            Your score: {score} out of {validQuestions.length}
          </p>
          <div className="flex flex-col items-center md:flex-row md:justify-between">
            <Button onClick={handleRestart}>Restart Quiz</Button>
            <a href="/dashboard" className="mt-4 md:mt-0">
              <Button onClick={handleRestart}>Back To Dashboard</Button>
            </a>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>
            Question {currentQuestionIndex + 1} of {validQuestions.length}. DB
            NUMBER is {currentQuestion.id}
          </span>
          <span className="text-sm">Score: {score}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            {currentQuestion.question_text}
          </h2>
          <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center space-x-2 mb-4">
                <RadioGroupItem
                  value={option}
                  id={`option-${index}`}
                  disabled={hasAnswered}
                />
                <Label
                  htmlFor={`option-${index}`}
                  className={`cursor-pointer ${getOptionStyle(option)}`}
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm">
            Difficulty:{' '}
            <span className="capitalize">{currentQuestion.difficulty}</span>
          </div>
          {isLastQuestion ? (
            <Button onClick={handleFinish} disabled={!hasAnswered}>
              Finish
            </Button>
          ) : (
            <Button onClick={handleNext} disabled={!hasAnswered}>
              Next
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TriviaQuiz;
