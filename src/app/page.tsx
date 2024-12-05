import CartDetail from "./components/cartDetail/page";
import ContactPage from "./components/Contact/page";
import HeroSection from "./components/heroSection/page";
import Product from "./components/Product/page";
import SaleBanner from "./components/saleBanner/page";
import SaleProduct from "./components/SaleProduct/page";
import SuccessOrder from "./components/SuccessOrder/page";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Product />
      <SaleBanner />
      <SaleProduct />
      <ContactPage />
    
      
    
    </div>
  );
}
