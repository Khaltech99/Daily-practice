import { deleteProduct, showProducts } from "./lib/database";
import { Card, CardContent, CardTitle, CardFooter } from "./components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Button } from "./components/ui/button";
import { toast } from "sonner";

const ProductPage = () => {
  // const [productId, setProductId] = useState("");
  // Fetch products from database
  const getAllProducts = async () => {
    try {
      const data = await showProducts();
      if (!data) {
        return [];
      }
      console.log(data.result.documents);
      return data?.result.documents || [];
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      const result = await deleteProduct(productId);
      if (result) {
        toast(<h1>{result.message}</h1>);
        refetch();
      }
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  // Use React Query to fetch products

  const {
    data: products,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  // Handle loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 text-primary animate-spin" />
        <p className="ml-2 text-lg">Loading products...</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="text-center p-6 bg-red-50 rounded-lg">
        <h2 className="text-xl font-semibold text-red-600">
          Error loading products
        </h2>
        <p className="text-red-500">Please try again later</p>
      </div>
    );
  }

  // Handle empty products
  if (!products || products.length === 0) {
    return (
      <div className="text-center p-6">
        <h2 className="text-xl font-semibold">No products found</h2>
        <p className="text-gray-500">Check back later for new products</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product, index) => (
          <Card
            key={product.$id || index}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            {product.imageUrl && (
              <div className="aspect-video overflow-hidden bg-gray-100">
                <img
                  src={product.imageUrl || "/api/placeholder/400/300"}
                  alt={product.productName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <CardTitle className="p-4 text-lg">{product.productName}</CardTitle>
            <CardContent>
              <p className="text-gray-600 line-clamp-3">
                {product.productDescription}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between items-center">
              <span className="font-bold text-lg">
                {typeof product.productPrice === "number"
                  ? `$${product.productPrice.toFixed(2)}`
                  : product.productPrice}
              </span>
              <Button className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90">
                View Details
              </Button>
              <Button
                className=""
                variant="destructive"
                onClick={() => handleDeleteProduct(product.$id)}
              >
                Delete{" "}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ProductPage;
