"use server";

type FetchQueryProps = {
  query: string;
  variables?: any;
};

const fetchQuery = async ({ query, variables }: FetchQueryProps) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_HYPERMODE_API_ENDPOINT as string,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.HYPERMODE_API_TOKEN}`,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
        cache: "no-store",
      }
    );

    if (res.status < 200 || res.status >= 300) {
      throw new Error(res.statusText);
    }

    const { data, error, errors } = await res.json();
    return { data, error: error || errors };
  } catch (err) {
    console.error("error in fetchQuery:", err);
    return { data: null, error: err };
  }
};

export async function getTopMovies() {
  const graphqlQuery = `
  query {
    topMovies {
      id
      title
      release_date
      overview
      vote_average
      backdrop_path
      poster_path
      tagline
    }
  }
`;
  const { error, data } = await fetchQuery({
    query: graphqlQuery,
    variables: {},
  });
  if (error) {
    return { error: Array.isArray(error) ? error[0] : error };
  } else {
    return { data };
  }
}
