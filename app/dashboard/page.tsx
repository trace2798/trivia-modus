import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getClient } from "@/lib/apollo-client";
import { GET_USER_PROFILE } from "@/lib/queries";
import { TopMovies } from "@/lib/top-movies";
import { stackServerApp } from "@/stack";
import Link from "next/link";
import { FC } from "react";

interface PageProps {}
export const dynamic = "force-dynamic";

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
      <div className="flex flex-col text-4xl p-12 space-y-6">
        <h1>Welcome</h1>
        <Separator />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-12 w-full gap-10">
        <Link href={`/dashboard/movie`}>
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
        </Link>
      </div>
    </>
  );
};

export default Page;
