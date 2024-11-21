"use client";
import { FC } from "react";
import SignOutButton from "./sign-out";
import { UserButton, useUser } from "@stackframe/stack";
import { Button } from "./ui/button";
import Link from "next/link";

interface NavbarProps {}

const Navbar: FC<NavbarProps> = ({}) => {
  const user = useUser();
  return (
    <>
      <nav className="h-16 flex items-center border-b-2">
        <div className="flex flex-row justify-between items-center w-full max-w-7xl mx-auto">
        <div className="text-3xl">Trivia</div>
        <div>
          {user ? (
            <UserButton/>
          ) : (
            <>
              <Link href={`/handler/sign-in`}>
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
