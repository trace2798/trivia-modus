import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getClient } from "@/lib/apollo-client";
import { GET_TOP_MOVIE, GET_USER_PROFILE } from "@/lib/queries";
import { currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { FC } from "react";
import TopMovie from "./_components/top-movies";

interface PageProps {}
export const dynamic = "force-dynamic";

const Page: FC<PageProps> = async ({}) => {
  const user = await currentUser();
  console.log("USER", user);
  // const user = await stackServerApp.getUser();
  // console.log("USER", user);
  const { data } = await getClient().query({
    query: GET_USER_PROFILE,
    variables: {
      userId: user?.id,
      email: user?.emailAddresses[0].emailAddress,
      name: user?.externalAccounts[0].firstName,
    },
  });
  console.log("DATA", data);
  const { data: topMovie } = await getClient().query({
    query: GET_TOP_MOVIE,
  });
  console.log("TOP MOVIE", topMovie.topMovies);
  return (
    <>
      <div className="flex flex-col text-4xl p-12 space-y-6">
        <h1>Welcome</h1>
        <Separator />
      </div>
      <div className="px-12">
        {/* <Link href={`/dashboard/movie`}>
          <Card className="hover:cursor-pointer">
            <CardHeader>
              <CardTitle>Movie</CardTitle>
            </CardHeader>
          </Card>
        </Link>

        <Card>
          <CardHeader>
            <CardTitle>Modus</CardTitle>
          </CardHeader>
        </Card>
        <Link href={`/dashboard/top-movie`}>
          <Card>
            <CardHeader>
              <CardTitle>Top movie trivia</CardTitle>
            </CardHeader>
          </Card>
        </Link> */}
        <TopMovie movieInfo={topMovie?.topMovies} />
      </div>
    </>
  );
};

export default Page;
