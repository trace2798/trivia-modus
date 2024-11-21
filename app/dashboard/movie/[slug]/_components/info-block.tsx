"use client";
import { FC } from "react";
import { format } from "date-fns";

interface InfoBlockProps {
  data: {
    movieById: {
      title: string;
      release_date: string;
      overview: string;
      vote_average: number;
      backdrop_path: string;
      poster_path: string;
    };
  };
}

const InfoBlock: FC<InfoBlockProps> = ({ data }) => {
  const movie = data.movieById;
  const formattedDate = format(new Date(movie.release_date), "MMMM d, yyyy");

  // Generate star rating
  const maxStars = 10;
  const stars = Math.round((movie.vote_average / 10) * maxStars);
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center text-white flex flex-col justify-between"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 p-8 md:p-12 lg:p-16">
        <div className="mb-4">
          <h1 className="text-4xl md:text-6xl font-bold">{movie.title}</h1>
          <p className="text-lg mt-2">{formattedDate}</p>
          <div className="flex items-center space-x-5">
            <div>
              {Array.from({ length: maxStars }).map((_, i) => (
                <span
                  key={i}
                  className={`text-2xl ${
                    i < stars ? "text-yellow-400" : "text-gray-400"
                  }`}
                >
                  ★
                </span>
              ))}{" "}
            </div>
            <span>{movie.vote_average}</span>
          </div>
        </div>
        <p className="text-sm md:text-lg max-w-3xl leading-relaxed">
          {movie.overview}
        </p>
      </div>
      {/* <div className="relative z-10 p-8 md:p-12 lg:p-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-semibold">Rating:</span>
          <span className="text-2xl font-bold">{movie.vote_average}</span>
        </div>
        <div>
          <img
            className="w-24 md:w-36 lg:w-48 rounded-md shadow-lg"
            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
            alt={`${movie.title} Poster`}
          />
        </div>
      </div> */}
    </div>
  );
};

export default InfoBlock;
