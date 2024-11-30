import { Separator } from '@/components/ui/separator';
import { getClient } from '@/lib/apollo-client';
import { GET_TOP_MOVIE, GET_USER_PROFILE } from '@/lib/queries';
import { currentUser } from '@clerk/nextjs/server';
import TopMovie from './_components/top-movies';

export const dynamic = 'force-dynamic';

const Page = async ({}) => {
  const user = await currentUser();
  console.log('USER', user);
  const { data: topMovie } = await getClient().query({
    query: GET_TOP_MOVIE,
  });
  console.log('TOP MOVIE', topMovie.topMovies);
  return (
    <>
      <div className="flex flex-col text-4xl p-12 space-y-6">
        <div className="flex flex-col">
          <h1>Welcome</h1>
          <h2 className="text-primary/80 text-lg">
            The movies below are the 20 top rated movies from the tmdb api
          </h2>
          <h3 className="text-primary/80 text-lg">
            Select a movie from below or search for your favorite movie to play
          </h3>
        </div>
        <Separator />
      </div>
      <div className="px-12">
        <TopMovie movieInfo={topMovie?.topMovies} />
      </div>
    </>
  );
};

export default Page;
