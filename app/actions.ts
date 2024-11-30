'use server';

import { getClient } from '@/lib/apollo-client';
import {
  CREATE_GAME,
  GENERATE_TRIVIA,
  GET_MOVIE,
  RECOMMEND_MOVIE,
  UPDATE_GAME_STATUS,
  UPDATE_USER_ANSWER_WITH_QUESTION_ID,
  UPSERT_MOVIE,
} from '@/lib/queries';

type FetchQueryProps = {
  query: string;
  variables?: any;
};

const fetchQuery = async ({ query, variables }: FetchQueryProps) => {
  try {
    const res = await fetch(
      process.env.NEXT_PUBLIC_HYPERMODE_API_ENDPOINT as string,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.HYPERMODE_API_TOKEN}`,
        },
        body: JSON.stringify({
          query,
          variables,
        }),
        cache: 'no-store',
      },
    );

    if (res.status < 200 || res.status >= 300) {
      throw new Error(res.statusText);
    }

    const { data, error, errors } = await res.json();
    return { data, error: error || errors };
  } catch (err) {
    console.error('error in fetchQuery:', err);
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
  console.log('MOVIE INFO SEARCH ACTION', data);
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

type CreateGameAndInsertQuestionsPayload = {
  movieId: string;
  movieTitle: string;
  questions: any;
  clerkUserId: string;
};

export const createGameAndInsertQuestions = async ({
  payload: payload,
}: {
  payload: CreateGameAndInsertQuestionsPayload;
}) => {
  console.log('createGameAndInsertQuestions ACTION', payload);
  const { data, errors } = await getClient().mutate({
    mutation: CREATE_GAME,
    variables: { ...payload },
  });
  return { data, errors };
};

export const recommendMovie = async ({ query: query }: { query: string }) => {
  const { data, errors } = await getClient().query({
    query: RECOMMEND_MOVIE,
    variables: { query },
  });
  return { data, errors };
};

export const upsertMovie = async (movie: any) => {
  const { data, errors } = await getClient().mutate({
    mutation: UPSERT_MOVIE,
    variables: {
      movieId: movie.id.toString(),
      movieTitle: movie.title,
      movieReleaseDate: movie.release_date,
      movieOverview: movie.overview,
    },
  });
  return { data, errors };
};

export const updateGameStatus = async ({
  gameId: gameId,
}: {
  gameId: string;
}) => {
  console.log('updateGameStatus ACTION', gameId);
  const gameIdInt = parseInt(gameId, 10);
  const { data, errors } = await getClient().mutate({
    mutation: UPDATE_GAME_STATUS,
    variables: { gameId: gameIdInt },
  });
  return { data, errors };
};

export const updateUserAnswerWithQuestionId = async ({
  questionId: questionId,
  answer: answer,
  isCorrect: isCorrect,
}: {
  questionId: string;
  answer: string;
  isCorrect: boolean;
}) => {
  const questionIdInt = parseInt(questionId, 10);
  const { data, errors } = await getClient().mutate({
    mutation: UPDATE_USER_ANSWER_WITH_QUESTION_ID,
    variables: { questionId: questionIdInt, answer, isCorrect },
  });
  return { data, errors };
};
