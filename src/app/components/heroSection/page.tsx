"use client";
import Typewriter from "typewriter-effect";
import React from "react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[600px] pt-10"
      style={{ backgroundImage: "url('/assets/img/Hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="container max-w-5xl mx-auto relative flex flex-col items-center justify-start h-full text-white text-center px-6 lg:pt-20 md:pt-20 pt-20">
        <h1 className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-4 drop-shadow-lg">
          Welcome to Our Store
        </h1>

        <h2 className="text-xl md:text-3xl lg:text-4xl font-bold text-yellow-500 drop-shadow-md">
          <Typewriter
            options={{
              strings: ["Unveil the Essence of Luxury Products"],
              autoStart: true,
              loop: true,
            }}
          />
        </h2>

        <p className="mt-4 text-sm md:text-lg lg:text-xl font-light drop-shadow-md">
          Where every detail exudes refinement
        </p>

        <button className="mt-12 px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-sm md:text-lg font-semibold rounded-full text-black shadow-lg hover:scale-110 hover:shadow-xl transition-transform duration-300">
          <Link href = "/components/Products">
          Explore Products
          </Link>
        </button>
      </div>
    </div>
  );
};

export default HeroSection;
