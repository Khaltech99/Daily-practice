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
import { updateVerification } from "../../appwriteCreate";
import { authStore } from "../../uistore";

const Verified = () => {
  //ZUSTAND STATE
  const setIsVerified = authStore((state) => state.setIsVerified);
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  const handleUpdateEmailVerification = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("userId");
    const secret = urlParams.get("secret");
    try {
      const result = await updateVerification(userId, secret);
      setIsVerified(result.success);
    } catch (error) {
      console.error("Error updating email verification:", error);
    }
  };

  // Auto-redirect after countdown
  useEffect(() => {
    handleUpdateEmailVerification();
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate("/login");
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
              Email Verified
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
                Your email has been verified
              </h3>
              <p className="mb-4 text-gray-600">
                Thank you for verifying your email address. You can now log in
                to your account.
              </p>
              <p className="text-sm text-gray-500">
                Redirecting to login in {countdown} seconds...
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button
              onClick={() => navigate("/login")}
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

export default Verified;
