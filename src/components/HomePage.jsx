import { useNavigate } from "react-router";
import { account, verifyUserAccount } from "../../appwriteCreate";
import { authStore } from "../../uistore";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Label } from "./ui/label";
// import { useEffect } from "react";
import { toast } from "sonner";
import { Badge } from "./ui/badge";

function HomePage() {
  const email = authStore((state) => state.email);
  const user = authStore((state) => state.user);
  const sessionId = authStore((state) => state.sessionId);
  const resetFn = authStore((state) => state.resetFn);
  const isVerified = authStore((state) => state.isVerified);

  const navigate = useNavigate();

  //review
  // useEffect(() => {
  //   if (!sessionId) {
  //     navigate("/login");
  //   }
  // }, [sessionId, navigate]);

  //HANDLE LOGOUT
  const handleLogout = async () => {
    try {
      if (sessionId) {
        await account.deleteSession(sessionId);
        resetFn();
        navigate("/login");
      } else {
        console.error("credential error");
        resetFn();
        navigate("/login");
      }
    } catch (error) {
      throw new Error((error.message = "logout failed"));
    }
  };

  //HANDLE VERIFY ACCOUNT
  const handleVerifyAccount = async () => {
    try {
      const result = await verifyUserAccount();
      console.log(result);

      if (result.success) {
        toast(<h1>{result.message}</h1>);
      } else {
        toast(<h1>{result.message}</h1>);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md border border-gray-300 bg-white">
        <CardHeader>
          <CardTitle className="text-2xl text-black">
            Welcome, @ {user?.slice(0, 10) + "..."}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label className="text-black">User</Label>
              <p className="text-gray-600">{user}</p>
            </div>
            <div>
              <Label className="text-black">email</Label>
              <p className="text-gray-600">{email}</p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-between w-full ">
            <Button onClick={handleLogout} className=" bg-primary text-white">
              Logout
            </Button>
            <div>
              {!isVerified && (
                <Button
                  onClick={handleVerifyAccount}
                  className=" bg-primary text-white"
                >
                  verify your account
                </Button>
              )}
              {isVerified ? (
                <Badge className="bg-green-500 text-white">Verified</Badge>
              ) : (
                <Badge className="bg-red-500 text-white">Not Verified</Badge>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

export default HomePage;
