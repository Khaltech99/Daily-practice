import React from "react";
import { Button } from "./ui/button";
import ProfileCard from "./ui/ProfileCard";
import AlertUs from "./AlertUs";
import BadgeUs from "./BadgeUs";
import AlertDialogues from "./AlertDialogues";

const ShadPractice = () => {
  return (
    <div>
      <Button
        className=" m-4 p-3 w-fit h-fit cursor-pointer"
        variant="destructive"
        size="sm"
      >
        click here
      </Button>
      <ProfileCard />
      <AlertUs />
      <BadgeUs />
      <AlertDialogues />
    </div>
  );
};

export default ShadPractice;
