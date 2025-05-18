import { useForm } from "react-hook-form";
import { Link } from "react-router";
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
import { formSchema } from "../../schema";

//APPWRITE CONFIG INSTALLATIONS
import { account } from "../../appwriteCreate";
import { ID } from "appwrite";
import { useMutation } from "@tanstack/react-query";

function SignUp() {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const { isPending, mutate, error } = useMutation({
    mutationFn: async (data) => {
      try {
        const userCredentials = await account.create(
          ID.unique(),
          data.email,
          data.password,
          data.username
        );
        return userCredentials;
      } catch (error) {
        if (error.code === 400 || error.code === 401) {
          throw new Error("Invalid credentials");
        }
        throw error; // Re-throw the error to be caught in the onError callback
      }
    },
  });

  const onSubmit = (data) => {
    mutate(data);

    form.reset();
  };

  if (error) return <h1>{error.message}</h1>;
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md border border-gray-300 bg-white">
        <CardHeader>
          <CardTitle className="text-2xl text-black">Sign Up</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Username</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your username"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black">Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
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
                        placeholder="Enter your password"
                        {...field}
                        type="password"
                        className="w-full border border-gray-300 bg-white text-black placeholder-gray-500 focus:border-accent focus:ring-accent"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className={`w-full bg-primary text-white`}
                disabled={isPending}
              >
                Sign Up
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <p className="text-center text-sm text-black">
            Already have an account?
            <Link to="/login" className="text-black hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default SignUp;
