import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { phoneSchema } from "../../schema";
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
import { sendPhoneNumber } from "../../appwriteCreate";
import { toast } from "sonner";
const PhoneLogin = () => {
  const navigate = useNavigate();
  //SCHEMA
  const form = useForm({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phone: "+234",
    },
  });

  //ONSUBMIT
  const onSubmitPhoneNumber = async (data) => {
    try {
      const result = await sendPhoneNumber(data.phone);
      if (result.success) {
        console.log(result.data);

        form.reset();
        toast(<h1>{result.message}</h1>);
        navigate(`/verify-otp?userId=${result.data.userId}`);
      }
    } catch (error) {
      console.log(error.message);
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
              <form
                onSubmit={form.handleSubmit(onSubmitPhoneNumber)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="phone"
                  type="tel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-black">phone number</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="tel"
                          placeholder="Enter 10-digit number"
                          className="caret-blink focus:ring-2 focus:ring-blue-500"
                          onChange={(e) => {
                            let value = e.target.value;
                            // Remove non-digit characters except +
                            value = value.replace(/[^0-9+]/g, "");
                            // If empty or partial prefix, reset to +234
                            if (!value || value.length <= 4) {
                              value = "+234";
                            } else {
                              // Remove leading zeros
                              value = value.replace(/^0+/, "");
                              // Remove zero after +234
                              value = value.replace(/^\+2340+/, "+234");
                              // Ensure +234 prefix
                              if (!value.startsWith("+234")) {
                                value = `+234${value.replace(/^\+234/, "")}`;
                              }
                              // Limit to 13 characters
                              if (value.length > 14) {
                                value = value.slice(0, 14);
                              }
                            }
                            form.setValue("phone", value, {
                              shouldValidate: true,
                            });
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full bg-primary text-white capitalize"
                >
                  submit phone number
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

export default PhoneLogin;
