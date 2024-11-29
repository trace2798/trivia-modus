"use client";
import { useUser } from "@clerk/nextjs";
import { FC } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface UserButtonProps {}

const UserButton: FC<UserButtonProps> = ({}) => {
  const user = useUser();
  console.log("USER button", user.user);
  return (
    <>
      <div>
        {/* <Avatar */}
        {user.user?.imageUrl && (
          <Avatar>
            <AvatarImage src={user.user.imageUrl} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        )}
      </div>
    </>
  );
};

export default UserButton;
