"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../cartContext";

interface Product {
  id: number;
  title: string;
  image: string;
  price: number;
}

const Product = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.log("Error Fetching Products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto max-w-5xl lg:px-7 md:px-10 px-14">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-yellow-500 mb-4">
            Exclusive Products
          </h2>
          <p className="text-lg text-white">
            Browse our curated selection of premium items.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {products.slice(0, 8).map((product) => (
            <div
              key={product.id}
              className="relative bg-gray-800 rounded-xl shadow-lg overflow-hidden group"
            >
              <Link href={`/components/productDetail/${product.id}`}>
                <div className="p-6 h-full flex flex-col">
                  <div className="h-48 w-full bg-gray-700 rounded-lg overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <h3 className="mt-6 text-xl font-serif text-white line-clamp-2">
                    {product.title}
                  </h3>
                  <p className="text-lg font-medium text-yellow-500 mt-2">
                    ${product.price.toFixed(2)}
                  </p>
                </div>
              </Link>
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <button
                  onClick={() =>
                    addToCart({
                      id: product.id,
                      title: product.title,
                      price: product.price,
                      quantity: 1,
                      thumbnail: product.image,
                      discountPercentage: 0,
                    })
                  }
                  className="bg-yellow-500 text-black py-2 px-4 rounded-full text-sm font-medium shadow-lg hover:bg-yellow-600"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center mt-8">
          <Link href="/components/Products">
            <button className="bg-yellow-500 text-black py-2 px-6 rounded-full text-sm font-medium shadow-lg hover:bg-yellow-600">
              See More
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Product;
