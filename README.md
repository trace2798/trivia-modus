# Rec & Triv

Rec & Triv is a web application that offers personalized movie recommendations and engaging trivia games based on selected movies. Discover new films and test your knowledge all in one place! This is my official submission to the [Modus Hackathon 2024](https://hashnode.com/hackathons/hypermode), hosted in [Hashnode](https://hashnode.com).

Detail Article [Rec & Triv](https://shreyas-chaliha.hashnode.dev/rec-triv)

## Features

Movie Recommendations: Get tailored movie suggestions using Modus Collections.
Trivia Games: Play trivia games generated from selected movies.
Interactive Experience: Combine the fun of discovering movies with the challenge of trivia.
AI-Powered Questions: Trivia questions are generated using the Meta Llama 3.1 8B AI model.

## Technologies Used

Frontend: Next.js 14 for a seamless user interface.
Backend: Modus hosted on Hypermode for a robust backend infrastructure.
Data Sources:
TMDB API for movie data.
Wikipedia for additional movie information.
AI Model: Meta Llama 3.1 8B hosted on Hypermode for generating trivia questions.

## Installation

Clone the Repository

```code
git clone https://github.com/trace2798/trivia-modus.git
```

Navigate to the Project Directory

```code
cd rec-and-triv
```

## Install Dependencies

```code
npm install
```

Set Up Environment Variables

Create a .env file in the root directory and add the following:

```code
MODUS_API_BASE=your hosted server link
MODUS_API_KEY=your_modus_api_key
```

Run the Application

```code
    npm run dev
```

## Access the Application

Open your browser and navigate to http://localhost:3000.

Usage

Get Recommendations: Navigate to the recommendations section to receive personalized movie suggestions.
Play Trivia: Select a movie and start the trivia game to test your knowledge.
Feedback: Use the feedback form to share your thoughts and help improve the application.

License

This project is licensed under the MIT License.
