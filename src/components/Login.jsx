import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../../schema";
import { authStore } from "../../uistore";
import { account } from "../../appwriteCreate";
import { toast } from "sonner";
import { WifiOff } from "lucide-react";

function Login() {
  //ZUSTAND STATE
  const emailFn = authStore((state) => state.emailFn);
  const userFn = authStore((state) => state.userFn);
  const sessionIdFn = authStore((state) => state.sessionIdFn);
  //NAVIGATION
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const loginCredentials = await account.createEmailPasswordSession(
        data.email,
        data.password
      );
      emailFn(data.email);
      userFn(loginCredentials.providerUid);
      sessionIdFn(loginCredentials.$id);

      form.reset();
      navigate("/homepage");
    } catch (error) {
      console.error(error);
      const mainErr = "no internet connection";
      toast(
        <div className="flex gap-3">
          <WifiOff />
          <h1>{mainErr}</h1>
        </div>
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md border border-gray-300 bg-white">
        <CardHeader>
          <CardTitle className="text-2xl text-black">Login</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className="w-full border border-gray-300 bg-white text-black placeholder-gray-500 focus:border-accent focus:ring-accent"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
                        {...field}
                        type="password"
                        className="w-full border border-gray-300 bg-white text-black placeholder-gray-500 focus:border-accent focus:ring-accent"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="text-right">
                <Link
                  to="/reset-password"
                  className="text-sm text-black hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <Button type="submit" className="w-full bg-primary text-white">
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-black">
            Don't have an account?{" "}
            <Link to="/" className="text-black hover:underline">
              Sign Up
            </Link>
          </p>
          {/* <Button variant="destructive">logout</Button> */}
        </CardFooter>
      </Card>
    </div>
  );
}
export default Login;
