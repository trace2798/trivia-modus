// "use client";

// import { Button } from "@/components/ui/button";
// import { GET_MOVIE } from "@/lib/queries";
// import { useLazyQuery } from "@apollo/client";
// import { FC, useState } from "react";

// interface MovieSearchProps {}

// const MovieSearch: FC<MovieSearchProps> = ({}) => {
//   const [movieName, setMovieName] = useState(""); // State for the input box
//   const [movieInfo, setMovieInfo] = useState({
//     title: "",
//     release_date: "",
//     overview: "",
//   });

//   const [getMovie, { loading, error }] = useLazyQuery(GET_MOVIE, {
//     fetchPolicy: "no-cache",
//     onCompleted: (data) => {
//       if (data && data.movieInfo && data.movieInfo.length > 0) {
//         console.log("MOVIE INFO", data.movieInfo);
//         setMovieInfo({
//           title: data.movieInfo[0].title,
//           release_date: data.movieInfo[0].release_date,
//           overview: data.movieInfo[0].overview,
//         });
//       } else {
//         console.error("No movie information found:", data);
//       }
//     },
//     // onCompleted: (data) => {
//     //   if (data && data.getMovieInfo) {
//     //     console.log("GET MOVIE INFO", data.getMovieInfo[0]);
//     //     const { title, release_date, overview } = data.getMovieInfo[0];
//     //     setMovieInfo({ title, release_date, overview });
//     //   } else {
//     //     console.error("getMovieInfo is undefined:", data);
//     //   }
//     // },
//   });

//   const handleSearch = async () => {
//     if (!movieName.trim()) {
//       alert("Please enter a movie name!");
//       return;
//     }
//     getMovie({ variables: { name: movieName } }); // Pass the movie name as a variable
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Enter movie name"
//         value={movieName}
//         onChange={(e) => setMovieName(e.target.value)} // Update the input state
//         className="border p-2 rounded w-full mb-4"
//       />
//       <Button onClick={handleSearch} disabled={loading}>
//         {loading ? "Loading..." : "Search Movie"}
//       </Button>

//       {error && <p className="text-red-500">Error: {error.message}</p>}

//       {movieInfo.title && (
//         <div className="mt-4">
//           <h2 className="text-lg font-bold">Movie Info:</h2>
//           <p>
//             <strong>Title:</strong> {movieInfo.title}
//           </p>
//           <p>
//             <strong>Release Date:</strong> {movieInfo.release_date}
//           </p>
//           <p>
//             <strong>Overview:</strong> {movieInfo.overview}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MovieSearch;
"use client";

import { Button } from "@/components/ui/button";
import { GET_MOVIE } from "@/lib/queries";
import { useLazyQuery } from "@apollo/client";
import { FC, useState } from "react";

interface MovieSearchProps {}

const MovieSearch: FC<MovieSearchProps> = ({}) => {
  const [movieName, setMovieName] = useState(""); // State for the input box
  const [movieInfo, setMovieInfo] = useState([]); // Array to store all movies

  const [getMovie, { loading, error }] = useLazyQuery(GET_MOVIE, {
    fetchPolicy: "no-cache",
    onCompleted: (data) => {
      if (data && data.movieInfo) {
        console.log("MOVIE INFO", data.movieInfo);
        setMovieInfo(data.movieInfo); // Set all movies
      } else {
        console.error("No movie information found:", data);
      }
    },
  });

  const handleSearch = async () => {
    if (!movieName.trim()) {
      alert("Please enter a movie name!");
      return;
    }
    getMovie({ variables: { name: movieName } }); // Pass the movie name as a variable
  };

  const getPosterUrl = (posterPath: string) => {
    return posterPath
      ? `https://image.tmdb.org/t/p/w200${posterPath}` // Use TMDB image base URL
      : "https://via.placeholder.com/200x300?text=No+Image"; // Placeholder for missing images
  };
  return (
    <div>
      <input
        type="text"
        placeholder="Enter movie name"
        value={movieName}
        onChange={(e) => setMovieName(e.target.value)} // Update the input state
        className="border p-2 rounded w-full mb-4"
      />
      <Button onClick={handleSearch} disabled={loading}>
        {loading ? "Loading..." : "Search Movie"}
      </Button>

      {error && <p className="text-red-500">Error: {error.message}</p>}

      {movieInfo.length > 0 && (
        <div className="mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {movieInfo.map((movie: any, index) => (
              <div
                key={index}
                className="mb-4 border-b pb-4 flex flex-col space-y-5"
              >
                <div className="w-full max-w-[250px] h-[300px]">
                  <img
                    src={getPosterUrl(movie.poster_path)} // Render the poster
                    alt={`${movie.title} Poster`}
                    className=" rounded overflow-hidden w-[250px] h-[300px] object-cover"
                  />
                </div>
                <div className="flex flex-col h-full">
                  <p>
                    <strong>Title:</strong> {movie.title}
                  </p>
                  <p>
                    <strong>Rating:</strong> {movie.vote_average}
                  </p>
                  {/* <p>
                    <strong>Release Date:</strong> {movie.release_date}
                  </p>
                  <p>
                    <strong>Overview:</strong> {movie.overview}
                  </p>
                  
                  <p>
                    <strong>Backdrop:</strong> {movie.backdrop_path}
                  </p>
                  <p>
                    <strong>Poster:</strong> {movie.poster_path}
                  </p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieSearch;
