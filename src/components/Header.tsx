import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { id: "inicio", label: "nav.home" },
  { id: "servicios", label: "nav.services" },
  { id: "precios", label: "nav.prices" },
  { id: "proyectos", label: "nav.projects" },
  { id: "contacto", label: "nav.contact" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    // Check initial scroll position
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const element = document.getElementById(id);
      element?.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-md border-b border-border py-2 shadow-sm" 
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-4 border-b border-white/5"
      }`}
    >
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-2 lg:space-x-3 flex-shrink-0">
            <img
              src="/logoHispalTech.png"
              alt="Hispal Tech Logo"
              className={`h-10 w-10 lg:h-12 lg:w-12 object-contain transition-all duration-300 ${
                !isScrolled ? "brightness-0 invert" : ""
              }`}
            />
            <span className={`text-2xl lg:text-3xl font-bold transition-colors duration-300 whitespace-nowrap ${
              isScrolled ? "text-primary" : "text-white"
            }`}>
              Hispal Tech
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`transition-colors duration-300 text-xs xl:text-sm font-semibold uppercase tracking-[0.15em] ${
                  isScrolled 
                    ? "text-foreground/70 hover:text-primary" 
                    : "text-white/80 hover:text-white"
                }`}
              >
                {t(link.label)}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              variant={isScrolled ? "cta" : "outline"} 
              onClick={() => scrollToSection("contacto")} 
              className={`lg:text-xs xl:text-sm uppercase tracking-wider font-semibold lg:px-4 xl:px-6 transition-all duration-300 ${
                !isScrolled 
                  ? "border-white text-white hover:bg-white hover:text-hispaltech-navy bg-transparent" 
                  : ""
              }`}
            >
              {t("nav.requestQuote")}
            </Button>
            <LanguageSwitcher isScrolled={isScrolled} />
          </div>

          {/* Mobile Menu Button and Language Switcher */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher isScrolled={isScrolled} />
            <button 
              className={`p-2 transition-colors duration-300 ${
                isScrolled ? "text-foreground" : "text-white"
              }`} 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg">
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left py-3 text-sm font-semibold uppercase tracking-wider text-foreground/80 hover:text-primary border-b border-border/50 last:border-0"
                >
                  {t(link.label)}
                </button>
              ))}
              <div className="pt-4">
                <Button
                  variant="cta"
                  onClick={() => scrollToSection("contacto")}
                  className="w-full text-sm uppercase tracking-wider font-semibold"
                >
                  {t("nav.requestQuote")}
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
