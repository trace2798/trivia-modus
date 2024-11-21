import { stackServerApp } from "@/stack";
import { FC } from "react";

interface PageProps {}

const Page: FC<PageProps> = async ({}) => {
  const user = await stackServerApp.getUser();
  return (
    <>
      <div>
        <div>
          {user
            ? `Hello, ${user.displayName ?? "anon"}`
            : "You are not logged in"}
        </div>
      </div>
    </>
  );
};

export default Page;
