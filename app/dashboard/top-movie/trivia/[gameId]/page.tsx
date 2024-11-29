import { FC } from "react";

interface PageProps {
    parms: {
        gameId: string
    }
}

const Page: FC<PageProps> = ({}) => {
  return (
    <>
      <div>Page</div>
    </>
  );
};

export default Page;
