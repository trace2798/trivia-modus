"use client";
import { FC } from "react";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "./ui/button";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const user = useUser();
  console.log("USER Navbar", user.user);
  return (
    <>
      <nav className="h-16 flex items-center border-b-2">
        <div className="flex flex-row justify-between items-center w-full max-w-7xl mx-auto">
          <div className="text-3xl">Trivia</div>
          <div>
            {user.isSignedIn ? (
              <Link href={`/dashboard`}>
                <Button>Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link href={`/sign-in`}>
                  <Button>Sign In</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
