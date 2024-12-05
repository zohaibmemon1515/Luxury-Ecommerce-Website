"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

const SaleBanner = () => {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date("2024-12-31T00:00:00").getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance <= 0) {
        clearInterval(interval);
        setTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTime({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-gradient-to-r from-black via-gray-900 to-blue-900 py-20 px-6 text-white text-center">
      <div className="container mx-auto">
        <h2 className="text-5xl font-bold mb-6 text-blue-300">
          Final Countdown: <span className="text-yellow-400">30% Off</span> Ends Soon!
        </h2>
        <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-300">
          Your chance to grab the best deals is slipping away! Shop now and save big before time runs out.
        </p>
        <div className="flex justify-center space-x-8 mb-8">
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-yellow-300">{time.days}</span>
            <span className="text-sm uppercase text-gray-400">Days</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-yellow-300">{time.hours}</span>
            <span className="text-sm uppercase text-gray-400">Hours</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-yellow-300">{time.minutes}</span>
            <span className="text-sm uppercase text-gray-400">Minutes</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-4xl font-bold text-yellow-300">{time.seconds}</span>
            <span className="text-sm uppercase text-gray-400">Seconds</span>
          </div>
        </div>
        <Link
          href="/components/SaleProducts"
          className="inline-flex items-center py-4 px-8 bg-yellow-400 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-500 transition"
        >
          <FaShoppingCart className="mr-2 text-lg" />
          Shop Now
        </Link>
      </div>
    </section>
  );
};

export default SaleBanner;
