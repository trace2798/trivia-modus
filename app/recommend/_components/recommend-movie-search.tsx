'use client';
import { recommendMovie } from '@/app/actions';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Skeleton } from '@/components/ui/skeleton';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useDebounce } from 'use-debounce';

interface RecommendMovieSearchProps {}

const RecommendMovieSearch: FC<RecommendMovieSearchProps> = ({}) => {
  const [movieName, setMovieName] = useState('');
  const [debouncedMovieName] = useDebounce(movieName, 500);
  const [movieInfo, setMovieInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const user = useUser();
  console.log('USER', user.isSignedIn);

  useEffect(() => {
    if (debouncedMovieName.trim()) {
      handleSearch();
    }
  }, [debouncedMovieName]);

  const handleSearch = async () => {
    if (!movieName.trim()) {
      alert('Please enter a movie name!');
      return;
    }
    console.log('MOVIE NAME', movieName);
    setLoading(true);

    try {
      const response = await recommendMovie({ query: movieName });
      const data = await response.data;
      if (data && data.searchMovie && data.searchMovie.searchObjs) {
        const movies = data.searchMovie.searchObjs.map((obj: any) => ({
          id: obj.movie.id,
          title: obj.movie.title,
          overview: obj.movie.overview,
          release_date: obj.movie.release_date,
          score: obj.score,
        }));
        console.log('MOVIE INFO', movies);
        setMovieInfo(movies);
        toast.success('Movies found successfully!');
      } else {
        toast.error('No movies found!');
        setError('No movie information found.');
        console.error('No movie information found:', data);
      }
    } catch (error) {
      console.error('Error during movie search:', error);
      toast.error('An error occurred while searching for movies.');
      setError('An error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex flex-col space-y-5">
        <Input
          type="text"
          placeholder="What Type of Movie Are You Looking For?"
          value={movieName}
          onChange={(e) => setMovieName(e.target.value)}
        />
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div>
        {loading && (
          <div className="flex flex-col space-y-3 mt-5">
            {' '}
            <Skeleton className="w-full h-32 animate-pulse" />{' '}
            <Skeleton className="w-full h-32 mt-5 animate-pulse" />
            <Skeleton className="w-full h-32 mt-5 animate-pulse" />
            <Skeleton className="w-full h-32 mt-5 animate-pulse" />
            <Skeleton className="w-full h-32 mt-5 animate-pulse" />
            <Skeleton className="w-full h-32 mt-5 animate-pulse" />
          </div>
        )}
      </div>
      {movieInfo.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-1 gap-10">
            {movieInfo.map((movie: any, index) => (
              <Card
                key={index}
                className="w-full flex flex-col justify-between rounded-none"
              >
                <Link
                  href={`/dashboard/movie/${parseInt(movie.id)}`}
                  className="w-full"
                >
                  <CardHeader>
                    <CardTitle>{movie.title}</CardTitle>
                    <CardDescription>{movie.overview}</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    {user.isSignedIn ? (
                      <Button
                        variant="outline"
                        className="w-full max-w-[150px]"
                        asChild
                      >
                        <Link href={`/dashboard/movie/${parseInt(movie.id)}`}>
                          Read More
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        variant="secondary"
                        className="w-full max-w-[150px]"
                        asChild
                      >
                        <Link href="/sign-in">Login to Read More</Link>
                      </Button>
                    )}
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

export default RecommendMovieSearch;
