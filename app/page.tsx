import Navbar from "@/components/navbar";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <Navbar />
      <main className="grid grid-cols-1 sm:grid-cols-2 gap-12 p-12 w-full max-w-7xl mx-auto">
        <section className="flex flex-col items-center justify-center text-center bg-purple-500 text-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Find Movies You Will Love</h1>
          <p className="text-lg mb-6">
            Discover new and exciting movies tailored to your taste.
          </p>
          <Link href={`/recommend`}>
            <button className="bg-pink-500 text-white py-2 px-4 rounded-md hover:bg-pink-600 transition">
              Explore Movies
            </button>
          </Link>
        </section>

        <section className="flex flex-col items-center justify-center text-center bg-orange-500 text-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-4">Play Movie Trivia</h1>
          <p className="text-lg mb-6">
            Test your movie knowledge and challenge your friends!
          </p>
          <Link href={`/dashboard`}>
            <button className="bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition">
              Start Trivia
            </button>
          </Link>
        </section>
      </main>
    </>
  );
}
