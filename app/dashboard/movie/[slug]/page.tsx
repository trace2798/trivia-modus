import { getClient } from '@/lib/apollo-client';
import { ExtractMovieInfo } from '@/lib/extract-movie-info';
import { GET_MOVIE_BY_ID, GET_WIKI_INFO } from '@/lib/queries';
import { format } from 'date-fns';
import { FC } from 'react';
import InfoBlock from './_components/info-block';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { currentUser } from '@clerk/nextjs/server';

interface pageProps {
  params: {
    slug: string;
  };
}
export const maxDuration = 60;
export const dynamic = 'force-dynamic';

const page: FC<pageProps> = async ({ params }) => {
  try {
    const { data } = await getClient().query({
      query: GET_MOVIE_BY_ID,
      variables: { id: parseInt(params.slug) },
    });

    let moviePlot: string = 'Plot not available'; // Default fallback
    try {
      // Fetch Wikipedia data
      const { data: data2 } = await getClient().query({
        query: GET_WIKI_INFO,
        variables: {
          name: `${data.movieById.title} ${format(
            new Date(data.movieById.release_date),
            'yyyy',
          )} film`,
        },
      });

      // Ensure ExtractMovieInfo returns a string or extract the plot field
      const extractedInfo = ExtractMovieInfo(data2.wikipediaInfo);
      moviePlot =
        typeof extractedInfo === 'string'
          ? extractedInfo
          : extractedInfo.plot || 'Plot not available';
    } catch (wikiError) {
      console.error('Failed to fetch Wikipedia info:', wikiError);
    }

    // Combine data
    const movieData = {
      ...data.movieById,
      moviePlot,
    };

    const movieDataAsString = JSON.stringify(movieData);
    const user = await currentUser();
    return (
      <>
        <InfoBlock
          data={data}
          movieDataAsString={movieDataAsString}
          movieId={params.slug}
          clerkUserId={user?.id as string}
        />
      </>
    );
  } catch (error) {
    console.error('Failed to fetch movie data:', error);
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Failed to load the movie page. Please try again later.</p>
        <Link
          href="/dashboard"
          className={cn(buttonVariants({ variant: 'default' }))}
        >
          Go Back to Dashboard
        </Link>
      </div>
    );
  }
};

export default page;
