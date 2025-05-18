import React from "react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router";
import { loginWithEmail } from "../../appwriteCreate";

const Random = () => {
  const navigate = useNavigate();

  const onSubmit = async () => {
    await loginWithEmail();
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen w-md m-auto">
      <h1>THIS IS THE HOMEPAGE WITHOUT NO SIGN IN</h1>

      <div className="flex gap-3">
        <Button onClick={() => navigate("/sign-up")}>Sign up page</Button>
        <Button onClick={() => navigate("/login")}>Login page</Button>
      </div>
      <Button
        className="mt-4 text-black bg-green-400 capitalize"
        onClick={onSubmit}
      >
        login with your google account
      </Button>
    </div>
  );
};

export default Random;
