import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "./ui/input-otp";
import { useForm } from "react-hook-form";
import { otpSchema } from "../../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "./ui/button";
import { getUser, loginWithToken } from "../../appwriteCreate";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const VerifyOtp = () => {
  const form = useForm({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      pin: "",
    },
  });

  //NAVIGATION
  const navigate = useNavigate();

  //GET THE USERID
  const searchParams = new URLSearchParams(window.location.search);
  const userId = searchParams.get("userId");

  const onSubmit = async (data) => {
    try {
      const user = await getUser();
      if (user.user) {
        toast(
          <h1>{user?.user.name || user?.user.phone} already logged in </h1>
        );
        navigate("/");
      }
      await loginWithToken(userId, data.pin);
      navigate("/");
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6"
        >
          <FormField
            control={form.control}
            name="pin"
            type=""
            render={({ field }) => (
              <FormItem>
                <FormLabel className="capitalize text-center">
                  enter you One-Time Password
                </FormLabel>
                <FormControl>
                  <InputOTP
                    maxLength={6}
                    accept="number"
                    {...field}
                    className="caret-blink"
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSeparator />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormDescription>
                  Please enter the one-time password sent to your phone.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default VerifyOtp;
