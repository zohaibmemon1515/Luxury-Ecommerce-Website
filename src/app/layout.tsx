import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar/page";
import Footer from "./components/Footer/page";
import { CartProvider, useCart } from "./components/cartContext";
import CartCard from "./components/cartCard/page";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Luxe Cort",
  description: "Luxury E-commerce Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <Navbar />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
