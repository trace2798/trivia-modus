import { FC } from 'react';
import MovieSearch from '../_components/movie-search';
interface PageProps {}
export const dynamic = 'force-dynamic';

const Page: FC<PageProps> = async ({}) => {
  return (
    <>
      <div className="p-12">
        <MovieSearch />
      </div>
    </>
  );
};

export default Page;
