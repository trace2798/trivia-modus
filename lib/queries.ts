import { gql } from "@apollo/client";

export const GREET = gql`
  query ($name: String) {
    sayHello(name: $name)
  }
`;
export const GET_QUOTE = gql`
  query {
    randomQuote {
      quote
      author
    }
  }
`;

export const GET_MOVIE = gql`
  query ($name: String!) {
    movieInfo(name: $name) {
      id
      title
      release_date
      overview
      vote_average
      backdrop_path
      poster_path
    }
  }
`;

export const GET_MOVIE_BY_ID = gql`
  query ($id: Float!) {
    movieById(id: $id) {
      title
      release_date
      overview
      vote_average
      backdrop_path
      poster_path
    }
  }
`;

export const GET_WIKI_INFO = gql`
  query ($name: String!) {
    wikipediaInfo(name: $name)
  }
`;

export const GENERATE_TRIVIA = gql`
  query ($prompt: String!) {
    generateTrivia(prompt: $prompt)
  }
`;

export const GET_USER_PROFILE = gql`
  query ($userId: String!, $email: String!, $name: String!) {
    userProfile(userId: $userId, email: $email, name: $name)
  }
`;
