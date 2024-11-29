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
      tagline
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
      tagline
    }
  }
`;

export const GET_WIKI_INFO = gql`
  query ($name: String!) {
    wikipediaInfo(name: $name)
  }
`;

// export const GENERATE_TRIVIA = gql`
//   query ($prompt: String!) {
//     generateTrivia(prompt: $prompt)
//   }
// `;
export const GENERATE_TRIVIA = gql`
  query ($prompt: String!) {
    generateTrivia(prompt: $prompt) {
      question
      options
      answer
      difficulty
      category
    }
  }
`;

export const CREATE_GAME = gql`
  mutation CreateGameAndInsertQuestions(
    $movieId: String!
    $movieTitle: String!
    $questions: [TriviaQuestionInput!]!
  ) {
    createGameAndInsertQuestions(
      movieId: $movieId
      movieTitle: $movieTitle
      questions: $questions
    )
  }
`;

export const GET_USER_PROFILE = gql`
  query ($userId: String!, $email: String!, $name: String!) {
    userProfile(userId: $userId, email: $email, name: $name)
  }
`;

export const GET_TOP_MOVIE = gql`
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

export const GET_QUESTIONS_BY_GAME_ID = gql`
  query ($gameId: String!) {
    findQuestionById(gameId: $gameId) {
      id
      question_text
      options
      correct_answer
      difficulty
      category
    }
  }
`;

export const GENERATE_TRIVIA_TOP_MOVIE = gql`
  query ($title: String!, $overview: String!, $releaseDate: String!) {
    generateTriviaFromData(
      title: $title
      overview: $overview
      releaseDate: $releaseDate
    ) {
      question
      options
      answer
    }
  }
`;

export const CREATE_GAME_TOP = gql`
  mutation createGameAndInsertQuestionsTop(
    $movieId: String!
    $movieTitle: String!
    $questions: [TriviaQuestionStaticInput!]!
  ) {
    createGameAndInsertQuestionsTop(
      movieId: $movieId
      movieTitle: $movieTitle
      questions: $questions
    )
  }
`;