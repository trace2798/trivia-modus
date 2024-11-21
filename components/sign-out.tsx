"use client";
import { useUser } from "@stackframe/stack";

export default function SignOutButton() {
  const user = useUser();
  return user ? <button onClick={() => user.signOut()}>Sign Out</button> : "Not signed in";
}
