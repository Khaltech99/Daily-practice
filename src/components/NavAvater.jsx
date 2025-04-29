import { AvatarImage } from "@radix-ui/react-avatar";
import React from "react";
import { AvatarFallback } from "./ui/avatar";

const NavAvater = () => {
  return (
    <div>
      <Avatar>
        <AvatarImage />
        <AvatarFallback>az</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default NavAvater;
