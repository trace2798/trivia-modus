// "use client";
import { FC } from "react";
import MovieSearch from "./_components/movie-search";
import { stackServerApp } from "@/stack";
import { getClient } from "@/lib/apollo-client";
import { GET_USER_PROFILE } from "@/lib/queries";

interface PageProps {}

const Page: FC<PageProps> = async ({}) => {
  const user = await stackServerApp.getUser();
  console.log("USER", user);
  const { data } = await getClient().query({
    query: GET_USER_PROFILE,
    variables: {
      userId: user?.id,
      email: user?.primaryEmail,
      name: user?.displayName,
    },
  });
  console.log("DATA", data);
  return (
    <>
      <div className="p-12">
        <MovieSearch />
      </div>
    </>
  );
};

export default Page;
