"use client";

import { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "../cartContext";
import Image from "next/image";

const CheckoutPage: FC = () => {
  const { cartItems, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [userInfo, setUserInfo] = useState({
    name: "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
  });

  const router = useRouter();

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const handlePaymentMethodChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    router.push("/components/SuccessOrder");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-screen-xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-500">Checkout</h1>
          <p className="text-gray-400 mt-2">Complete your purchase below.</p>
        </div>

        <div className="lg:flex lg:space-x-12">
          <div className="lg:w-2/3 bg-dark-blue rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-yellow-500 mb-4">
              Order Summary
            </h2>
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b border-gray-600 pb-4"
                >
                  <div className="flex items-center space-x-4">
                    <Image
                      src={item.thumbnail}
                      alt={item.title}
                      width={60}
                      height={60}
                      className="object-cover rounded-lg"
                    />
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="text-gray-400">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-yellow-500">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center mt-6">
              <p className="text-xl font-bold text-white">Total:</p>
              <p className="text-xl font-bold text-yellow-500">
                ${totalPrice.toFixed(2)}
              </p>
            </div>
          </div>

          <div className="lg:w-1/3 bg-dark-blue rounded-lg shadow-lg p-6 mt-8 lg:mt-0">
            <h2 className="text-2xl font-semibold text-yellow-500 mb-4">
              Shipping Information
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-gray-400">
                    Full Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="w-full mt-2 p-3 bg-black border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-400"
                    placeholder="John Doe"
                    value={userInfo.name}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-gray-400">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    className="w-full mt-2 p-3 bg-black border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-400"
                    placeholder="1234 Main St, Apt 5"
                    value={userInfo.address}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="city" className="block text-gray-400">
                    City
                  </label>
                  <input
                    id="city"
                    name="city"
                    type="text"
                    className="w-full mt-2 p-3 bg-black border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-400"
                    placeholder="New York"
                    value={userInfo.city}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="postal-code" className="block text-gray-400">
                    Postal Code
                  </label>
                  <input
                    id="postal-code"
                    name="postalCode"
                    type="text"
                    className="w-full mt-2 p-3 bg-black border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-400"
                    placeholder="10001"
                    value={userInfo.postalCode}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-gray-400">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    className="w-full mt-2 p-3 bg-black border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-cyan-400"
                    placeholder="(123) 456-7890"
                    value={userInfo.phone}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="mt-6">
                  <h3 className="text-lg font-semibold text-yellow-500">
                    Payment Method
                  </h3>
                  <div className="space-y-2 mt-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="cash"
                        name="paymentMethod"
                        value="cash"
                        checked={paymentMethod === "cash"}
                        onChange={handlePaymentMethodChange}
                        className="h-4 w-4 text-yellow-500 focus:ring-yellow-500"
                      />
                      <label htmlFor="cash" className="ml-2 text-gray-400">
                        Cash on Delivery
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={handlePaymentMethodChange}
                        className="h-4 w-4 text-yellow-500 focus:ring-yellow-500"
                      />
                      <label htmlFor="card" className="ml-2 text-gray-400">
                        Pay by Card
                      </label>
                    </div>
                  </div>
                </div>

                {paymentMethod === "card" && (
                  <div className="mt-6 space-y-4">
                    <div>
                      <label
                        htmlFor="cardNumber"
                        className="block text-gray-400"
                      >
                        Card Number
                      </label>
                      <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        className="w-full mt-2 p-3 bg-black border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-500"
                        placeholder="1234 5678 1234 5678"
                        value={userInfo.cardNumber}
                        onChange={handleFormChange}
                        required
                      />
                    </div>

                    <div className="flex space-x-4">
                      <div className="w-1/2">
                        <label
                          htmlFor="cardExpiry"
                          className="block text-gray-400"
                        >
                          Expiry Date
                        </label>
                        <input
                          id="cardExpiry"
                          name="cardExpiry"
                          type="text"
                          className="w-full mt-2 p-3 bg-black border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-500"
                          placeholder="MM/YY"
                          value={userInfo.cardExpiry}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                      <div className="w-1/2">
                        <label
                          htmlFor="cardCVV"
                          className="block text-gray-400"
                        >
                          CVV
                        </label>
                        <input
                          id="cardCVV"
                          name="cardCVV"
                          type="text"
                          className="w-full mt-2 p-3 bg-black border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-yellow-500"
                          placeholder="123"
                          value={userInfo.cardCVV}
                          onChange={handleFormChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}
              
                <button
                  type="submit"
                  className="w-full mt-6 p-3 bg-yellow-500 text-black font-bold rounded-lg hover:bg-yellow-600 transition"
                >
                  Place Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
