import { getClient } from '@/lib/apollo-client';
import { GET_QUESTIONS_BY_GAME_ID } from '@/lib/queries';
import { FC } from 'react';
import TriviaQuiz from '../_components/trivia-card';

interface PageProps {
  params: {
    triviaId: string;
  };
}

export const dynamic = 'force-dynamic';

const Page: FC<PageProps> = async ({ params }) => {
  const { data } = await getClient().query({
    query: GET_QUESTIONS_BY_GAME_ID,
    variables: {
      gameId: params.triviaId,
    },
  });
  return (
    <>
      <div className="flex items-center justify-center w-full min-h-screen">
        <TriviaQuiz questions={data.findQuestionById} />
      </div>
    </>
  );
};

export default Page;
