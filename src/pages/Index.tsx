import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import Services from "@/components/Services";
import Products from "@/components/Products";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Projects from "@/components/Projects";
// import Portfolio from '@/components/Portfolio';
// import Team from '@/components/Team';
import PriceComparison from "@/components/PriceComparison";
// import Testimonials from '@/components/Testimonials';
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  const { hash } = useLocation();

  // Scroll to a section when arriving from another route (e.g. /#productos)
  useEffect(() => {
    if (!hash) return;
    const id = hash.slice(1);
    const timer = setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
    return () => clearTimeout(timer);
  }, [hash]);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <ValueProps />
        <Services />
        <Products />
        <PriceComparison />
        <Projects />
        {/* <Portfolio /> */}
        {/* <Testimonials /> */}
        {/* <Team /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
