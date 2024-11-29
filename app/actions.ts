"use server";

import { getClient } from "@/lib/apollo-client";
import { GENERATE_TRIVIA, GET_MOVIE, GET_QUOTE } from "@/lib/queries";

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

export const getMovieBySearch = async ({
  name: movieName,
}: {
  name: string;
}) => {
  const { data, error } = await getClient().query({
    query: GET_MOVIE,
    variables: { name: movieName },
  });
  console.log("MOVIE INFO SEARCH ACTION", data);
  return { data, error };
};

export const generateTrivia = async ({
  prompt: prompt,
}: {
  prompt: string;
}) => {
  const { data, error } = await getClient().query({
    query: GENERATE_TRIVIA,
    variables: { prompt },
  });
  return { data, error };
};
