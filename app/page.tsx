import Navbar from "@/components/navbar";
import { redirect } from "next/navigation";

export default async function Home() {
  // const user = await stackServerApp.getUser();
  // if (!user) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
          Welcome to online Trivia
        </main>
      </>
    );
  }
  // redirect("/dashboard");
// }
