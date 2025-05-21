import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "../schema";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components/ui/card";
import { Input } from "./components/ui/input";
import { Button } from "./components/ui/button";
import { createProductData } from "./lib/database";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const AddProduct = () => {
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      productName: "",
      productPrice: "",
      productDescription: "",
    },
  });

  //ADDPRODUCT
  const handleAddProduct = async (data) => {
    try {
      const result = await createProductData(data);
      if (result) {
        toast(<h1>{result.message}</h1>);
        form.reset();
        setTimeout(() => {
          navigate("/productpage");
        }, 2000);
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary p-4">
      <Card className="w-full max-w-md border border-gray-300 bg-white">
        <CardHeader>
          <CardTitle className="text-2xl text-black text-center">
            ENTER YOUR PRODUCT
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleAddProduct)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black capitalize">
                      product name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your product name "
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
                name="productPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black capitalize">
                      product price
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your product price"
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
                name="productDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-black capitalize">
                      product description
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your product description"
                        {...field}
                        type="text"
                        className="w-full border border-gray-300 bg-white text-black placeholder-gray-500 focus:border-accent focus:ring-accent"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className={`w-full bg-primary text-white capitalize`}
              >
                add product
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>made with ❤️ by azeez</CardFooter>
      </Card>
    </div>
  );
};

export default AddProduct;
