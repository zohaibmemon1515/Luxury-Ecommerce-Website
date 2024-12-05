"use client";
import React, { createContext, useContext, useState } from "react";

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  thumbnail: string;
  discountPercentage: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  totalPrice: number;
  isCartVisible: boolean;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);

  const addToCart = (updatedItem: CartItem) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === updatedItem.id
      );
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity = updatedItem.quantity;
        return updatedItems;
      } else {
        return [...prevItems, updatedItem];
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((cartItem) => cartItem.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const toggleCart = () => {
    setIsCartVisible((prev) => !prev);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        totalPrice,
        isCartVisible,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
