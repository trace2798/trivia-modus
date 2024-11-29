import { getClient } from "@/lib/apollo-client";
import { UPSERT_MOVIE } from "@/lib/queries";
import { TopMovies } from "@/lib/top-movies";
import { FC } from "react";
import ButtonUpsert from "./_component/button-upsert";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const movieData = TopMovies;
//   console.log("MOVIE DATA", movieData);
  //   const { data, errors } = await getClient().mutate({
  //     mutation: UPSERT_MOVIE,
  //     variables: { ...movieData },
  //   });
  //   return { data, errors };
  return (
    <>
      <div>
        page
        {/* <ButtonUpsert movies={movieData} /> */}
      </div>
    </>
  );
};

export default page;
