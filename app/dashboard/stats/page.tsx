import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getClient } from '@/lib/apollo-client';
import { GET_GAMES_BY_USER } from '@/lib/queries';
import { currentUser } from '@clerk/nextjs/server';
import { format } from 'date-fns';
import { FC } from 'react';
import LoadingBlock from './_components/loading-block';
import QuestionBlock from './_components/question-block';
interface PageProps {}
export const dynamic = 'force-dynamic';
export type Game = {
  id: string;
  movie_title: string;
  status: string;
  score: number;
  created_at: string;
  questions: Question[];
};

export type Question = {
  id: string;
  question_text: string;
  correct_answer: string;
  player_answer: string;
  difficulty: string;
};
const Page: FC<PageProps> = async ({}) => {
  const user = await currentUser();
  if (!user) {
    return (
      <>
        <div className="p-12 flex flex-col justify-center w-full max-w-7xl mx-auto">
          <h1 className="font-bold text-5xl text-center">
            You must be logged in to view this page
          </h1>
          <div className="flex flex-col items-center justify-center">
            <a href={`/sign-in`}>
              <button className="bg-green-700 text-white py-2 px-4 rounded-md hover:bg-pink-900 transition">
                Login to to Play
              </button>
            </a>
          </div>
        </div>
      </>
    );
  }
  const { data, loading, error } = await getClient().query({
    query: GET_GAMES_BY_USER,
    variables: {
      userId: user.id,
    },
  });
  if (loading) {
    return (
      <>
        <div className="p-12 flex flex-col justify-center w-full max-w-7xl mx-auto space-y-5">
          <LoadingBlock />
        </div>
      </>
    );
  }
  if (error) {
    return (
      <>
        <div className="p-12 flex flex-col justify-center w-full max-w-7xl mx-auto space-y-5">
          <h1 className="font-bold text-5xl text-center">
            Oopsy Daisy! Something went wrong fetching Data.
          </h1>
          <h2>Try again later</h2>
          <div className="flex flex-col items-center justify-center">
            <a href={`/dashboard`}>
              <button className="bg-green-700 text-white py-2 px-4 rounded-md hover:bg-pink-900 transition">
                Back to Dashboard
              </button>
            </a>
          </div>
        </div>
      </>
    );
  }
  if (data.gamesByUserId.length === 0) {
    return (
      <>
        <div className="p-12 flex flex-col justify-center w-full max-w-7xl mx-auto space-y-5">
          <h1 className="font-bold text-5xl text-center">
            You have no games yet
          </h1>
          <div className="flex flex-col items-center justify-center">
            <a href={`/dashboard`}>
              <button className="bg-green-700 text-white py-2 px-4 rounded-md hover:bg-pink-900 transition">
                Play a Game
              </button>
            </a>
          </div>
        </div>
      </>
    );
  }
  //console.log('GAMES', data.gamesByUserId);
  const totalGames = data.gamesByUserId.length;
  const games = data.gamesByUserId;
  const totalScore = games.reduce(
    (sum: number, game: Game) => sum + game.score,
    0,
  );
  const gamesCompleted = games.filter(
    (game: Game) => game.status === 'done',
  ).length;
  const allQuestions = games.flatMap((game: Game) => game.questions);
  return (
    <>
      <div className="p-12 flex flex-col justify-center w-full max-w-7xl mx-auto space-y-5">
        <div className="flex flex-col space-y-3">
          <h1 className="font-bold text-5xl text-center">Your Stats</h1>
          <Separator />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary/80">
                Total Games Played
              </CardTitle>
              <CardDescription className="text-5xl text-primary">
                {totalGames}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-primary/80">Total Score</CardTitle>
              <CardDescription className="text-5xl text-primary">
                {totalScore}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-primary/80">Games Completed</CardTitle>
              <CardDescription className="text-5xl text-primary">
                {gamesCompleted}
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-primary/80">
                Games Incomplete
              </CardTitle>
              <CardDescription className="text-5xl text-primary">
                {Math.max(0, totalGames - gamesCompleted)}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-primary/80">Last Played</CardTitle>
              <CardDescription className="text-5xl text-primary flex flex-col">
                <span>
                  {format(
                    new Date(
                      data.gamesByUserId[totalGames - 1].created_at.replace(
                        /\.\d+Z$/,
                        'Z',
                      ),
                    ),
                    'dd MMMM yyyy',
                  )}
                </span>
                <span className="text-3xl text-primary/80">
                  {format(
                    new Date(
                      data.gamesByUserId[totalGames - 1].created_at.replace(
                        /\.\d+Z$/,
                        'Z',
                      ),
                    ),
                    'h:mm a',
                  )}
                </span>
              </CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-primary/80">Movies</CardTitle>
              <CardDescription className="text-lg flex flex-wrap gap-2">
                {Object.entries(
                  data.gamesByUserId.reduce(
                    (acc: Record<string, number>, game: Game) => {
                      acc[game.movie_title] = (acc[game.movie_title] || 0) + 1; // Count occurrences
                      return acc;
                    },
                    {},
                  ),
                ).map(([title, count], index) => (
                  <span key={index} className="text-primary">
                    {title} {(count as number) > 1 && `(x${count})`}
                  </span>
                ))}
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
        <QuestionBlock allQuestions={allQuestions} />
      </div>
    </>
  );
};

export default Page;
