import React from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./button";
const ProfileCard = () => {
  return (
    <div>
      <Card className="w-[500px] mx-10">
        <CardHeader>
          <CardTitle className="capitalize">this is azeez</CardTitle>
          <CardDescription>browse on azeez and the likes</CardDescription>
        </CardHeader>
        <CardContent>this is my cotent</CardContent>
        <CardFooter className="flex justify-end ">
          <Button className="self-center">click here </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileCard;
