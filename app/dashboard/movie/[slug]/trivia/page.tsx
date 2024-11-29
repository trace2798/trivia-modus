import { redirect } from 'next/navigation';

interface PageProps {
  params: {
    slug: string;
  };
}

const Page = ({}) => {
  redirect('/dashboard/movie');
};

export default Page;
