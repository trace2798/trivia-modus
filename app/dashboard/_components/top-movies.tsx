'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Link from 'next/link';

import { FC } from 'react';

interface MovieSearchProps {
  movieInfo: any;
}

const TopMovie: FC<MovieSearchProps> = ({ movieInfo }) => {
  const getPosterUrl = (posterPath: string) => {
    return posterPath
      ? `https://image.tmdb.org/t/p/w200${posterPath}`
      : 'https://via.placeholder.com/200x300?text=No+Image';
  };
  return (
    <div>
      {movieInfo.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10">
            {movieInfo.map((movie: any, index: number) => (
              <Card
                key={index}
                className="w-full flex flex-col justify-between border-none"
              >
                <Link href={`/dashboard/movie/${movie.id}`} className="w-full">
                  <CardContent className="px-0 ">
                    <div className="w-full max-w-sm h-[300px]">
                      <img
                        src={getPosterUrl(movie.poster_path)}
                        alt={`${movie.title} Poster`}
                        className=" rounded overflow-hidden w-full h-[300px] object-cover"
                      />
                    </div>
                  </CardContent>

                  <CardFooter className="flex flex-col text-center p-0 pb-3 space-y-1">
                    <p className="text-lg">{movie.title}</p>
                    <p className="text-sm text-primary/80">
                      {movie.vote_average.toFixed(1)}
                    </p>
                  </CardFooter>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TopMovie;
