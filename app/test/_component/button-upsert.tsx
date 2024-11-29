// "use client";
// import { upsertMovie } from "@/app/actions";
// import { Button } from "@/components/ui/button";
// import { FC } from "react";

// interface ButtonUpsertProps {
//   movies: any;
// }

// const ButtonUpsert: FC<ButtonUpsertProps> = ({ movies }) => {
//   console.log("BUTTON", movies);
//   const handleUpsertClick = async () => {
//     try {
//       {
//         movies.map(async (movie: any) => {
//           const payload = {
//             movie,
//           };
//           const upsertMovies = await upsertMovie({
//             payload,
//           });
//         });
//       }
//       const payload = {
//         movies: movies,
//       };
//       const upsertMovies = await upsertMovie({
//         payload,
//       });
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };
//   return (
//     <>
//       <div>
//         <Button onClick={handleUpsertClick}>Upsert</Button>
//       </div>
//     </>
//   );
// };

// export default ButtonUpsert;
'use client';
import { upsertMovie } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { FC } from 'react';
import { toast } from 'sonner';

interface Movie {
  id: number | string;
  title: string;
  release_date: string;
  overview: string;
}

interface ButtonUpsertProps {
  movies: Movie[];
}

const ButtonUpsert: FC<ButtonUpsertProps> = ({ movies }) => {
  console.log('BUTTON', movies);

  const handleUpsertClick = async () => {
    try {
      // Use Promise.all to handle multiple asynchronous operations
      const upsertPromises = movies.map((movie) => upsertMovie(movie));

      const results = await Promise.allSettled(upsertPromises);

      results.forEach((result, index) => {
        const movie = movies[index];
        if (result.status === 'fulfilled') {
          console.log(`Successfully upserted movie ID: ${movie.id}`);
          toast.success(
            `Successfully upserted movie ID: ${movie.id}, ${movie.title}`,
          );
        } else {
          console.error(
            `Failed to upsert movie ID: ${movie.id}`,
            result.reason,
          );
        }
      });
    } catch (error) {
      console.error('Unexpected error during upserting movies:', error);
    }
  };

  return (
    <div>
      <Button onClick={handleUpsertClick}>Upsert</Button>
    </div>
  );
};

export default ButtonUpsert;
