import { getClient } from "@/lib/apollo-client";
import { GET_MOVIE_BY_ID } from "@/lib/queries";
import { FC } from "react";
import InfoBlock from "./_components/info-block";

interface pageProps {
  params: {
    slug: string;
  };
}

const page: FC<pageProps> = async ({ params }) => {
  const { data } = await getClient().query({
    query: GET_MOVIE_BY_ID,
    variables: { id: parseInt(params.slug) },
  });
  console.log(data);
  return (
    <>
      {/* <div className="p-12">
        page: {params.slug} {JSON.stringify(data, null, 2)}
      </div> */}
      <InfoBlock data={data} />
    </>
  );
};

export default page;
