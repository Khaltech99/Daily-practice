import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
// import { updateVerification } from "../../appwriteCreate";
// import { authStore } from "../../uistore";

const Fail = () => {
  //ZUSTAND STATE
  //   const setIsVerified = authStore((state) => state.setIsVerified);
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  // Auto-redirect after countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);
  return (
    <div>
      <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
        <Card className="w-full max-w-md border border-gray-300 bg-white">
          <CardHeader>
            <CardTitle className="text-2xl text-black">
              Login Complete
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="mb-4 rounded-full bg-green-100 p-3 text-green-600 mx-auto inline-flex h-16 w-16 items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-medium">
                successfully logged in
              </h3>
              <p className="mb-4 text-gray-600">
                Thank you for login in through your email address.
              </p>
              <p className="text-sm text-gray-500">
                Redirecting to homepage in {countdown} seconds...
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              onClick={() => navigate("/")}
              className="bg-primary text-white"
            >
              Login Now
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Fail;
