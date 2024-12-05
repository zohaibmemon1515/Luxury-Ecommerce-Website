"use client";

import Image from "next/image";
import { FaShoppingCart } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { useCart } from "../cartContext";
import CartCard from "../cartCard";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems, totalPrice } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen); 
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="relative bg-gradient-to-r bg-gray-800 w-full h-auto shadow-lg z-50">
      <div className="container max-w-7xl mx-auto flex items-center justify-between px-5 md:px-10 lg:px-20 h-20">
        <div className="flex items-center">
          <Image
            src="/assets/img/Logo.png"
            width={200}
            height={200}
            alt="Logo"
            className="object-contain w-[100px] h-[100px] md:w-[200px] md:h-[200px] lg:w-[250px] lg:h-[250px]"
          />
        </div>

        <div
          className="lg:hidden text-white text-2xl sm:text-3xl cursor-pointer absolute right-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </div>

        <ul className="hidden lg:flex text-white gap-8 lg:gap-10 font-semibold">
          <li className="cursor-pointer hover:text-yellow-500 transition duration-300 ease-in-out">
            <Link href="/">Home</Link>
          </li>
          <li className="cursor-pointer hover:text-yellow-500 transition duration-300 ease-in-out">
            <Link href="/components/Products">Products</Link>
          </li>
          <li className="cursor-pointer hover:text-yellow-500 transition duration-300 ease-in-out">
            <Link href="/components/SaleProducts">Sale</Link>
          </li>
          <li className="cursor-pointer hover:text-yellow-500 transition duration-300 ease-in-out">
            <Link href="/components/Contact">Contact</Link>
          </li>
        </ul>

        <div
          onClick={toggleCart}
          className="mr-10 relative flex text-white items-center gap-2 sm:gap-3 border-[2px] border-gray-500 py-1 px-4 sm:py-1.5 sm:px-6 rounded-lg cursor-pointer hover:border-white transition duration-300 ease-in-out shadow-md"
        >
          <FaShoppingCart className="text-xl sm:text-2xl text-yellow-500" />
          {totalItems > 0 && (
            <div className="absolute top-0 left-3 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center -mr-2">
              {totalItems}
            </div>
          )}
          <span className="font-medium text-xs sm:text-sm md:text-base">
            $ {totalPrice.toFixed(2)}
          </span>
        </div>

        {isCartOpen && <CartCard closeCart={closeCart} />}
      </div>

      {menuOpen && (
        <ul className="absolute top-full left-0 w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white flex flex-col items-center gap-4 py-4 shadow-lg lg:hidden z-50">
          <li
            className="cursor-pointer hover:text-orange-600 transition duration-300 ease-in-out"
            onClick={() => setMenuOpen(false)}
          >
            <Link href="/">Home</Link>
          </li>
          <li
            className="cursor-pointer hover:text-orange-600 transition duration-300 ease-in-out"
            onClick={() => setMenuOpen(false)}
          >
            <Link href="/components/Products">Products</Link>
          </li>
          <li
            className="cursor-pointer hover:text-orange-600 transition duration-300 ease-in-out"
            onClick={() => setMenuOpen(false)}
          >
            <Link href="/components/SaleProducts">Sale</Link>
          </li>
          <li
            className="cursor-pointer hover:text-orange-600 transition duration-300 ease-in-out"
            onClick={() => setMenuOpen(false)}
          >
            <Link href="/components/Contact">Contact</Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
