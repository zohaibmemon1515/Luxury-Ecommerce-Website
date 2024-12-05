"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../cartContext";
interface Product {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  discountPercentage: number;
}

const SaleProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error Fetching Products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto max-w-5xl lg:px-7 md:px-10 px-14">
      
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-yellow-500 mb-4">
            Exclusive Sale Products
          </h2>
          <p className="text-lg text-white">
            Grab your favorites at amazing discounts. Limited time only!
          </p>
        </div>

       
        {products.length === 0 ? (
          <p className="text-center text-gray-400">
            No products available at the moment.
          </p>
        ) : (
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
            {products.slice(0, 8).map((product) => {
              const discountedPrice = parseFloat(
                (
                  product.price -
                  (product.price * product.discountPercentage) / 100
                ).toFixed(2)
              );

              return (
                <div
                  key={product.id}
                  className="relative overflow-hidden group"
                >
                  <Link href={`/components/SaleProductsDetail/${product.id}`}>
                    <div className="bg-gray-800 shadow-2xl rounded-xl p-6 hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
                      <div className="h-48 w-full bg-gray-700 rounded-lg overflow-hidden">
                        <Image
                          src={product.thumbnail}
                          alt={product.title}
                          width={200}
                          height={250}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </div>
                      <h3 className="mt-6 text-xl font-serif text-white line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-lg font-medium text-gray-300 mt-2">
                        <span className="text-yellow-500">
                          ${discountedPrice}
                        </span>{" "}
                        <span className="line-through text-gray-500">
                          ${product.price}
                        </span>
                      </p>
                    </div>
                  </Link>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() =>
                        addToCart({
                          id: product.id,
                          title: product.title,
                          price: discountedPrice,
                          quantity: 1,
                          thumbnail: product.thumbnail,
                          discountPercentage: product.discountPercentage,
                        })
                      }
                      className="bg-yellow-500 text-black py-2 px-4 rounded-full text-sm font-medium shadow-lg hover:bg-yellow-600"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div className="flex justify-center items-center mt-8">
          <Link href="/components/SaleProducts">
            <button className="bg-yellow-500 text-black py-2 px-6 rounded-full text-sm font-medium shadow-lg hover:bg-yellow-600">
              See More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SaleProduct;
