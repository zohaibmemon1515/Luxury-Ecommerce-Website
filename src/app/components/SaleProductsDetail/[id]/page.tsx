"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../../cartContext";

interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  price: number;
  category: string;
  discountPercentage: number;
}

const SaleProductDetail = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://dummyjson.com/products/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
        setTotalPrice(data.price);
      } catch (error) {
        console.log("Error Fetching Product:", error);
      }
    };
    fetchProduct();
  }, [params.id]);

  const handleQuantityChange = (type: "increment" | "decrement") => {
    if (type === "increment") {
      setQuantity((prev) => prev + 1);
      setTotalPrice((prev) => prev + (product?.price || 0));
    } else if (type === "decrement" && quantity > 1) {
      setQuantity((prev) => prev - 1);
      setTotalPrice((prev) => prev - (product?.price || 0));
    }
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
        <p className="text-lg font-medium">Loading product details...</p>
      </div>
    );
  }

  return (
    <section className="py-8 bg-gradient-to-b from-gray-900 via-black to-gray-800 text-white min-h-screen">
      <div className="container mx-auto max-w-5xl px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <Image
              src={product.thumbnail}
              alt={product.title}
              width={500}
              height={500}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 sm:w-64 sm:h-auto md:w-80"
            />
          </div>

          <div>
            <h1 className="text-4xl sm:text-2xl font-semibold text-yellow-400 leading-tight">
              {product.title}
            </h1>
            <p className="mt-4 text-sm sm:text-xs md:text-sm leading-relaxed text-gray-300">
              {product.description}
            </p>

            <p className="mt-4 text-sm sm:text-xs md:text-sm leading-relaxed text-gray-300">
              <strong>Category: </strong>
              {product.category}
            </p>
            <p className="mt-4 text-sm sm:text-xs md:text-sm leading-relaxed text-gray-300">
              <strong>Discount: </strong>
              {product.discountPercentage}% off
            </p>

            <p className="mt-6 text-2xl sm:text-xl font-semibold text-yellow-500">
              ${totalPrice.toFixed(2)}
            </p>

            <div className="flex items-center gap-4 mt-6">
              <button
                onClick={() => handleQuantityChange("decrement")}
                className="w-8 h-8 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full flex items-center justify-center text-lg sm:text-sm md:text-lg font-bold shadow-md transition-transform transform hover:scale-105"
              >
                -
              </button>
              <span className="text-lg sm:text-sm md:text-lg font-medium">
                {quantity}
              </span>
              <button
                onClick={() => handleQuantityChange("increment")}
                className="w-8 h-8 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-yellow-500 hover:bg-yellow-600 text-black rounded-full flex items-center justify-center text-lg sm:text-sm md:text-lg font-bold shadow-md transition-transform transform hover:scale-105"
              >
                +
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/"
                className="py-2 px-4 sm:py-1 sm:px-3 md:py-2 md:px-4 bg-yellow-500 hover:bg-yellow-600 text-black text-sm sm:text-xs md:text-sm font-medium rounded-full shadow-md transition-transform transform hover:scale-105"
              >
                Back to Home
              </Link>
              <button
                onClick={() =>
                  addToCart({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    quantity: quantity,
                    thumbnail: product.thumbnail,
                    discountPercentage: product.discountPercentage,
                  })
                }
                className="py-2 px-4 sm:py-1 sm:px-3 md:py-2 md:px-4 bg-yellow-700 hover:bg-yellow-800 text-white text-sm sm:text-xs md:text-sm font-medium rounded-full shadow-md transition-transform transform hover:scale-105"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SaleProductDetail;
