// "use client";
import { Button } from "@/components/ui/button";
import { getClient } from "@/lib/apollo-client";
import { FC } from "react";
import QuoteButton from "./_components/quote-button";
import MovieSearch from "./_components/movie-search";

interface PageProps {}

const Page: FC<PageProps> = ({}) => {
  return (
    <>
      <div className="p-12">
        {/* Dashboard Page */}
        {/* <QuoteButton /> */}
        <MovieSearch/>
        {/* <Button onClick={() => handleClick()}>Get Random Quote</Button> */}
      </div>
    </>
  );
};

export default Page;
