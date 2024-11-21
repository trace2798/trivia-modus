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
      title
      release_date
      overview
      vote_average
      backdrop_path
      poster_path
    }
  }
`;
