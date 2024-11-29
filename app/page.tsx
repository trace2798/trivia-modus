import Navbar from "@/components/navbar";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const user = await auth();
  console.log("USER INFO", user);
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-[90vh] space-y-6 p-12 w-full max-w-7xl mx-auto justify-evenly">
        <div className="flex flex-col space-y-3">
          <h1 className="text-5xl">Rec & Triv</h1>
          <div className="flex flex-col space-y-1">
            <h2 className="text-primary/80 text-lg">
              This application is my submission for{" "}
              <a
                href="https://hashnode.com/hackathons/hypermode"
                target="_blank"
                className="font-medium hover:underline text-primary"
              >
                ModusHack 2024 hosted on Hashnode
              </a>
            </h2>
            <p className="text-primary/80 text-lg">
              Tech Stack: Next.js for front-end and
              <a
                href="https://docs.hypermode.com/modus/overview"
                target="_blank"
                className="font-medium hover:underline text-primary"
              >
                {" "}
                Modus{" "}
              </a>
              hosted on{" "}
              <a
                href="https://hypermode.com/home"
                target="_blank"
                className="font-medium hover:underline text-primary"
              >
                {" "}
                Hypermode{" "}
              </a>
              for Backend.
            </p>
            <p className="text-primary/80 text-lg">
              Hashnode Article: 
              <a
                href="https://docs.hypermode.com/modus/overview"
                target="_blank"
                className="font-medium hover:underline text-primary"
              >
                {" "}
                Modus{" "}
              </a>
              hosted on{" "}
              <a
                href="https://hypermode.com/home"
                target="_blank"
                className="font-medium hover:underline text-primary"
              >
                {" "}
                Hypermode{" "}
              </a>
              for Backend.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
          <section className="flex flex-col items-center justify-center text-center bg-purple-500 text-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4">
              Discover Movies You Will Love
            </h1>
            <p className="text-lg mb-6 flex flex-col">
              <span>Discover movie based on your input</span>
              <span>Made using Modus Collection</span>
            </p>
            <Link href={`/recommend`}>
              <button className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition">
                Explore Movies
              </button>
            </Link>
          </section>

          <section className="flex flex-col items-center justify-center text-center bg-orange-500 text-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-4">Play Movie Trivia</h1>
            <p className="text-lg mb-6 flex flex-col">
              <span>Test your movie knowledge</span>
            </p>
            {user.userId ? (
              <Link href={`/dashboard`} className="">
                <button className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition">
                  Start Trivia
                </button>
              </Link>
            ) : (
              <Link href={`/sign-in`} className="">
                <button className="bg-orange-700 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition">
                  Login to to Play
                </button>
              </Link>
            )}
          </section>
        </div>
        <div className="flex items-center space-x-3">
          <h1 className="text-2xl">Github Repo Links</h1>
          <a
            href="https://github.com/trace2798/trivia-modus"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500"
          >
            <p className="flex items-center space-x-3">
              {" "}
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Front-end</span>
            </p>
          </a>
          <a
            href="https://github.com/trace2798/steady-sequence"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-500"
          >
            <p className="flex items-center space-x-3">
              {" "}
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Backend</span>
            </p>
          </a>
        </div>
        <div className="flex items-center space-x-3 text-primary/90">
          MIT License
        </div>
      </main>
    </>
  );
}
