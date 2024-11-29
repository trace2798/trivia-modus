import { FC } from 'react';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: {
    gameId: string;
  };
}

const Page: FC<PageProps> = ({ params }) => {
  return (
    <>
      <div>Page</div>
    </>
  );
};

export default Page;
