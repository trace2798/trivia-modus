import { FC } from 'react';
import RecommendMovieSearch from './_components/recommend-movie-search';
import { Separator } from '@/components/ui/separator';
import Navbar from '@/components/navbar';

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center w-full max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6 w-full max-w-7xl mx-auto p-12">
          <div className="flex flex-col space-y-1">
            <h1 className="text-3xl">Recommend Movie</h1>
            <h2 className="text-primary/80">
              Movie Recommendation using Modus Collection
            </h2>
            <h3 className="text-primary/80">
              <span className='text-primary font-medium'>Describe{" "}</span>
              the type of <span className='text-primary font-medium'>movie{" "}</span>
              you want to <span className='text-primary font-medium'>{" "}watch</span>
            </h3>
          </div>
          <Separator />
          <RecommendMovieSearch />
        </div>
      </div>
    </>
  );
};

export default Page;
