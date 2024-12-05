"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "../cartContext";

interface Products {
  id: number;
  title: string;
  thumbnail: string;
  price: number;
  discountPercentage: number;
}

const Products = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Products[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const productsPerPage = 12;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products`);
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setTotalProducts(data.products.length);
        const paginatedProducts = data.products.slice(
          (currentPage - 1) * productsPerPage,
          currentPage * productsPerPage
        );
        setProducts(paginatedProducts);
      } catch (error) {
        console.log("Error Fetching Products:", error);
      }
    };
    fetchProducts();
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < Math.ceil(totalProducts / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto max-w-5xl lg:px-7 md:px-10 px-14">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-white mb-4">
            Premium Product Selection
          </h2>
          <p className="text-lg text-gray-400">
            Discover our handpicked range of exclusive products, curated just
            for you.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-8">
          {products.map((product) => {
            const discountedPrice = (
              product.price -
              (product.price * product.discountPercentage) / 100
            ).toFixed(2);

            return (
              <div
                key={product.id}
                className="relative bg-gray-800 rounded-xl shadow-lg overflow-hidden group"
              >
                <Link href={`/components/SaleProductsDetail/${product.id}`}>
                  <div className="p-6 flex flex-col h-full">
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
                      </span>
                      <span className="line-through text-gray-500 ml-2">
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
                        price: parseFloat(discountedPrice),
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

        <div className="flex justify-center items-center mt-8">
          <button
            onClick={handlePrevPage}
            disabled={currentPage === 1}
            className="bg-yellow-500 text-black py-2 px-6 rounded-full text-sm font-medium shadow-lg mr-4 disabled:opacity-50"
          >
            Previous Page
          </button>
          <span className="text-xl font-medium text-white">{`Page ${currentPage}`}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="bg-yellow-500 text-black py-2 px-6 rounded-full text-sm font-medium shadow-lg hover:bg-yellow-600 ml-4 disabled:opacity-50"
          >
            Next Page
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;
