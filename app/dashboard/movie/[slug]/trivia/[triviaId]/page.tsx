import { getClient } from '@/lib/apollo-client';
import { GET_MOVIE_BY_ID, GET_QUESTIONS_BY_GAME_ID } from '@/lib/queries';
import { FC } from 'react';
import TriviaQuiz from '../_components/trivia-card';

interface PageProps {
  params: {
    slug: string;
    triviaId: string;
  };
}

export const dynamic = 'force-dynamic';

const Page: FC<PageProps> = async ({ params }) => {
  //console.log('PARAMS', params);
  const { data } = await getClient().query({
    query: GET_QUESTIONS_BY_GAME_ID,
    variables: {
      gameId: params.triviaId,
    },
  });
  const { data: movie } = await getClient().query({
    query: GET_MOVIE_BY_ID,
    variables: { id: parseInt(params.slug) },
  });
  return (
    <>
      <div className="flex items-center justify-center w-full min-h-screen relative">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.movieById.backdrop_path})`,
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"></div>
        </div>
        <div className="relative z-10 flex items-center justify-center">
          <TriviaQuiz
            questions={data.findQuestionById}
            gameId={params.triviaId}
          />
        </div>
      </div>
    </>
  );
};

export default Page;
