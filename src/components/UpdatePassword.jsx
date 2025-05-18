import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { updatePasswordSchema } from "../../schema";
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
import { Link, useNavigate } from "react-router";
import { updateUserPassword } from "../../appwriteCreate";
import { toast } from "sonner";

const UpdatePassword = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  //SUBMIT FUNCTION
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const userId = urlParams.get("userId");
      const secret = urlParams.get("secret");
      const result = await updateUserPassword(
        userId,
        secret,
        data.confirmPassword
      );
      if (result.success) {
        toast(<h1>{result.message}</h1>);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
        <Card className="w-full max-w-md border border-gray-300 bg-white">
          <CardHeader>
            <CardTitle className="text-2xl text-black">
              Update Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your new password"
                          {...field}
                          type="password"
                          className="w-full border border-gray-300 bg-white text-black placeholder-gray-500 focus:border-accent focus:ring-accent"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">
                        confirm password
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your new password"
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
                  className="w-full bg-primary text-white"
                  disabled={loading}
                >
                  Update Password
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-black">
              Back to
              <Link to="/login" className="text-accent hover:underline">
                Login
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UpdatePassword;
