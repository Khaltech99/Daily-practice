import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { resetSchema } from "../../schema";
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
import { Link } from "react-router";
import { sendPasswordRecovery } from "../../appwriteCreate";
import { toast } from "sonner";
const PasswordReset = () => {
  const [loading, setLoading] = useState(false);
  //SCHEMA
  const form = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  //ONSUBMIT
  const onReset = async (data) => {
    setLoading(true);
    try {
      const result = await sendPasswordRecovery(data.email);
      if (result.success) {
        form.reset();
        toast(<h1>{result.message}</h1>);
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
              Reset Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onReset)} className="space-y-4">
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
                <Button
                  type="submit"
                  className="w-full bg-primary text-white capitalize"
                  disabled={loading}
                >
                  reset
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

export default PasswordReset;
