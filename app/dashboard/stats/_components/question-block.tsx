import { Separator } from '@/components/ui/separator';
import { FC } from 'react';
import { Question } from '../page';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface QuestionBlockProps {
  allQuestions: Question[];
}

const QuestionBlock: FC<QuestionBlockProps> = ({ allQuestions }) => {
  return (
    <>
      <div className="flex flex-col space-y-3 pt-5">
        <div className="flex flex-col space-y-1">
          <h2 className="font-bold text-3xl">Question&apos;s History</h2>
          <h3 className="text-primary/80">
            Questions in the games your played
          </h3>
        </div>
        <Separator />
        <div>
          {allQuestions.map((question: Question, index: number) => (
            <Card key={index} className="mb-4">
              <CardHeader>
                <Badge className="w-fit">{question.difficulty}</Badge>
                <CardTitle className="text-primary/80 text-lg">
                  {question.question_text}
                </CardTitle>
                <CardDescription className="text-primary/80 flex flex-col">
                  <span className="text-base">
                    Correct Answer: {question.correct_answer}
                  </span>
                  <span className="text-base">
                    Your Answer: {question.player_answer}
                  </span>
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
};

export default QuestionBlock;
