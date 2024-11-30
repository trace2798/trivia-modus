'use client';
import { createGameAndInsertQuestions, generateTrivia } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { FC, useState } from 'react';
import { toast } from 'sonner';

interface InfoBlockProps {
  data: {
    movieById: {
      id: number;
      title: string;
      release_date: string;
      overview: string;
      vote_average: number;
      backdrop_path: string;
      poster_path: string;
      tagline: string;
    };
  };
  movieDataAsString: string | null;
  movieId: string;
  clerkUserId: string;
}

const InfoBlock: FC<InfoBlockProps> = ({
  data,
  movieDataAsString,
  movieId,
  clerkUserId,
}) => {
  const movie = data.movieById;
  const router = useRouter();
  const formattedDate = format(new Date(movie.release_date), 'MMMM d, yyyy');
  const maxStars = 10;
  const stars = Math.round((movie.vote_average / 10) * maxStars);
  const [loading, setLoading] = useState(false);
  const [buttonText, setButtonText] = useState('Start Trivia');

  const sendQuestionsToBackend = async (questions: any) => {
    try {
      const cleanedQuestions = questions.generateTrivia.map(
        ({ __typename, ...q }: { __typename?: string }) => q,
      );
      //console.log('CLEANED QUESTIONS', cleanedQuestions);
      const payload = {
        movieId: movieId as string, // Ensure this ID is available and an integer
        movieTitle: data.movieById.title as string,
        questions: cleanedQuestions,
        clerkUserId: clerkUserId as string,
      };
      //console.log('PAYLOAD to backend', payload);
      const gameCreateResponse = await createGameAndInsertQuestions({
        payload,
      });
      //console.log('GAME CREATE RESPONSE', gameCreateResponse.data);
      if (gameCreateResponse.data) {
        toast.success(
          `Game created successfully! Game ID: ${gameCreateResponse.data.createGameAndInsertQuestions}`,
        );
        router.push(
          `/dashboard/movie/${movieId}/trivia/${gameCreateResponse.data.createGameAndInsertQuestions}`,
        );
      } else {
        console.error('No game ID received:', gameCreateResponse);
        toast.error('Failed to create game.');
      }
    } catch (error) {
      console.error('Error saving game and questions:', error);
      toast.error('Error saving game and trivia questions.');
    }
  };
  const handleTriviaClick = async () => {
    //console.log('TRIVIA CLICKED');
    setLoading(true);
    setButtonText('AI Generating Questions');
    const generateTriviaResponse = await generateTrivia({
      prompt: `Here is the content of the movie: ${movieDataAsString}`,
    });
    //console.log('TRIVIA RESPONSE', generateTriviaResponse.data);
    toast.success('Trivia questions generated successfully!');
    toast.success('Questions Generated');
    setButtonText('Creating Game. Hold Tight!');
    //console.log('SENDING QUESTIONS TO BACKEND', generateTriviaResponse.data);
    const createGame = await sendQuestionsToBackend(
      generateTriviaResponse.data,
    );
    //console.log('CREATE GAME RESPONSE', createGame);
    // setLoading(false);
  };

  return (
    <div
      className="relative w-full h-screen bg-cover bg-center text-white flex flex-col justify-between"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 p-8 md:p-12 lg:p-16 space-y-5">
        <div className="mb-4">
          <h1 className="text-4xl md:text-6xl font-bold">{movie.title}</h1>
          <p className="text-lg mt-2">{formattedDate}</p>
          <div className="flex items-center space-x-5">
            <div>
              {Array.from({ length: maxStars }).map((_, i) => (
                <span
                  key={i}
                  className={`text-2xl ${
                    i < stars ? 'text-yellow-400' : 'text-gray-400'
                  }`}
                >
                  ★
                </span>
              ))}{' '}
            </div>
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
          <p>{movie.tagline}</p>
        </div>
        <p className="text-sm md:text-lg max-w-3xl leading-relaxed">
          <span>
            <strong>Overview:</strong>{' '}
          </span>{' '}
          {movie.overview}
        </p>

        <div>
          <Button onClick={handleTriviaClick} disabled={loading}>
            {loading && <Loader className="size-5 animate-spin" />} {buttonText}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InfoBlock;

interface QuizQuestion {
  question: string;
  options: string[];
  answer: string;
  difficulty?: string;
  category: string;
}

const parseAIResponse = (aiResponseString: string): QuizQuestion[] => {
  try {
    // Clean up the string first
    let cleanedString = aiResponseString
      .replace(/\\n/g, '') // Remove \n
      .replace(/\\/g, '') // Remove backslashes
      .replace(/'/g, '"'); // Replace single quotes with double quotes

    // Now, attempt to parse the cleaned string
    const parsed = JSON.parse(cleanedString);
    return parsed.questions;
  } catch (error) {
    console.error('Failed to parse AI response:', error);
    return [];
  }
};
