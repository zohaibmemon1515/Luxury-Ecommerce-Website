import React, { FC } from "react";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "./cartContext";


interface CartCardProps {
  closeCart: () => void; 
}

const CartCard: FC<CartCardProps> = ({ closeCart }) => {
  const { cartItems, addToCart, totalPrice } = useCart();

  const increaseQuantity = (item: typeof cartItems[0]) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    addToCart(updatedItem);
  };

  const decreaseQuantity = (item: typeof cartItems[0]) => {
    if (item.quantity > 1) {
      const updatedItem = { ...item, quantity: item.quantity - 1 };
      addToCart(updatedItem);
    }
  };

  return (
    <div
      className="absolute top-16 right-0 w-full max-w-sm bg-gray-900 p-6 rounded-lg shadow-lg z-50"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-yellow-400">Cart</h2>
        <button onClick={closeCart} aria-label="Close cart" className="text-white">
          <IoClose className="text-2xl" />
        </button>
      </div>

      {cartItems.length === 0 ? (
        <p className="text-gray-400 text-center">
          Your cart is empty. Browse our products and add your favorites!
        </p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between bg-gray-800 rounded-lg p-4 shadow-md"
            >
              <div className="flex items-center space-x-4">
                <Image
                  src={item.thumbnail}
                  alt={item.title}
                  width={60}
                  height={80}
                  className="object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-xs font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-gray-400">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => decreaseQuantity(item)}
                  aria-label="Decrease quantity"
                  className="bg-blue-700 text-white px-2 py-1 rounded-lg hover:bg-blue-600"
                >
                  -
                </button>
                <span className="text-white">{item.quantity}</span>
                <button
                  onClick={() => increaseQuantity(item)}
                  aria-label="Increase quantity"
                  className="bg-blue-700 text-white px-2 py-1 rounded-lg hover:bg-blue-600"
                >
                  +
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <>
          <div className="flex justify-between items-center mt-6">
            <p className="text-xl font-bold text-yellow-400">
              Total: ${totalPrice.toFixed(2)}
            </p>
            <Link href="/components/checkOut">
              <button onClick={closeCart} className="bg-yellow-500 text-black px-4 py-2 rounded-lg hover:bg-yellow-600">
                Checkout
              </button>
            </Link>
          </div>
          <div className="flex justify-center mt-4">
            <Link href="/components/cartDetail">
              <button onClick={closeCart} className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600">
                View Cart
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartCard;
