"use client";
import React from "react";
import Image from "next/image";
import { useCart } from "../cartContext";
import { IoClose } from "react-icons/io5";
import Link from "next/link";

const CartDetail = () => {
  const { cartItems, addToCart, removeFromCart, totalPrice } = useCart();

  const increaseQuantity = (item: (typeof cartItems)[0]) => {
    addToCart({ ...item, quantity: item.quantity + 1 });
  };

  const decreaseQuantity = (item: (typeof cartItems)[0]) => {
    if (item.quantity > 1) {
      addToCart({ ...item, quantity: item.quantity - 1 });
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue-900 via-gray-800 to-black py-12">
      <div className="container mx-auto max-w-6xl p-8 bg-gray-900 rounded-xl shadow-lg">
        <h1 className="text-4xl font-extrabold text-yellow-400 text-center mb-8">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-400 text-xl text-center">
            Your cart is empty. Browse our products and add your favorites!
          </p>
        ) : (
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-gray-800 rounded-lg shadow-md p-6 hover:scale-105 transition-transform duration-300"
              >
                <div className="flex items-center space-x-6">
                  <Image
                    src={item.thumbnail}
                    alt={item.title}
                    width={112}
                    height={112}
                    className="object-cover rounded-lg"
                  />
                  <div className="text-white">
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <p className="text-gray-400">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-yellow-500 text-black px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all transform hover:bg-yellow-600"
                  >
                    <IoClose />
                  </button>
                  <button
                    onClick={() => decreaseQuantity(item)}
                    className="bg-blue-700 text-white text-lg p-2 rounded-lg transition hover:bg-blue-600"
                  >
                    -
                  </button>
                  <span className="text-2xl text-white">{item.quantity}</span>
                  <button
                    onClick={() => increaseQuantity(item)}
                    className="bg-blue-700 text-white text-lg p-2 rounded-lg transition hover:bg-blue-600"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
          <div className="flex justify-between items-center mt-10">
            <p className="text-2xl font-bold text-yellow-400">
              Total: ${totalPrice.toFixed(2)}
            </p>
            <button className="bg-yellow-500 text-black px-8 py-4 rounded-lg text-lg font-semibold shadow-lg transition-all transform hover:bg-yellow-600">
                <Link href ="/components/checkOut">
              Checkout
              </Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDetail;
