import { Skeleton } from '@/components/ui/skeleton';
import { getClient } from '@/lib/apollo-client';
import { GENERATE_TRIVIA_TOP_MOVIE } from '@/lib/queries';
import { TopMovies } from '@/lib/top-movies';
import { FC } from 'react';
import QuestionFE from './_components/question-fe';
// import { stackServerApp } from "@/stack";

interface PageProps {}
export const dynamic = 'force-dynamic';

const Page: FC<PageProps> = async ({}) => {
  // const user = await stackServerApp.getUser();
  const topMoviesData = TopMovies;
  const randomIndex = Math.floor(Math.random() * topMoviesData.length);
  console.log('TOP MOVIES Local', JSON.stringify(topMoviesData[randomIndex]));
  const releaseYear = topMoviesData[randomIndex].release_date;
  console.log('RELEASE YEAR', releaseYear);
  const { data, loading, error } = await getClient().query({
    query: GENERATE_TRIVIA_TOP_MOVIE,
    variables: {
      title: topMoviesData[randomIndex].title,
      overview: topMoviesData[randomIndex].overview,
      releaseDate: topMoviesData[randomIndex].release_date,
    },
  });
  console.log('TRIVIA DATA from backend', data);

  return (
    <>
      <div className="p-12 flex justify-center items-center min-h-screen">
        {loading && !error && (
          <>
            <div className="flex flex-col space-y-3 w-full items-center">
              <Skeleton className="w-full max-w-[300px] h-8" />
              <Skeleton className="w-full max-w-sm h-12" />
              <Skeleton className="w-full max-w-[300px] h-8" />
            </div>
          </>
        )}
        {data && (
          <div className="flex flex-col space-y-3 w-full items-center">
            <QuestionFE
              data={data}
              movieId="from top"
              movieTitle={topMoviesData[randomIndex].release_date}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Page;
