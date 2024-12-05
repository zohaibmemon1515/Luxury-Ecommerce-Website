import Link from "next/link";
import React from "react";
import { FaCheckCircle } from "react-icons/fa";

const SuccessOrder = () => {
  return (
    <div className="bg-black flex items-center justify-center min-h-screen">
      <div className="bg-gradient-to-br from-gray-800 via-black to-gray-900 p-8 rounded-lg shadow-2xl w-full max-w-lg text-center border-2 border-blue-600">
        <div className="text-blue-500 text-5xl mb-6">
          <FaCheckCircle className="mx-auto mb-4 " size={64} />
        </div>

        <h2 className="text-2xl font-bold text-white mb-4">
          Order Placed Successfully!
        </h2>
        <p className="text-gray-400 mb-6">
          Thank you for shopping with us! Your order is being processed, and we&apos;ll keep you updated.
        </p>

        <Link
          href="/"
          className="bg-blue-600 text-white py-3 px-8 rounded-lg shadow-lg hover:bg-blue-700 hover:scale-105 transform transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessOrder;

