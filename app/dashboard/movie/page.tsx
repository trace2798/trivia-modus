import { FC } from 'react';
import MovieSearch from '../_components/movie-search';
import { Separator } from '@/components/ui/separator';
import { SearchIcon } from 'lucide-react';
interface PageProps {}
export const dynamic = 'force-dynamic';

const Page: FC<PageProps> = async ({}) => {
  return (
    <>
      <div className="px-12 pb-12 pt-6 flex flex-col">
        <div className="flex flex-col space-y-1">
          <h1 className="text-3xl flex items-center gap-2">
            Search Movie <SearchIcon className="text-primary/70" />
          </h1>
          <h2 className="text-primary/80">
            Search for the movie you want to play trivia with
          </h2>
          <h3 className="text-primary/80">
            <span className="text-primary font-medium">Request </span>
            make using{' '}
            <span className="text-primary font-medium">modus connections</span>
          </h3>
        </div>
        <Separator className="my-4" />
        <MovieSearch />
      </div>
    </>
  );
};

export default Page;
