import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLocation, useNavigate } from "react-router-dom";

const navLinks = [
  { id: "inicio", label: "nav.home" },
  { id: "servicios", label: "nav.services" },
  { id: "productos", label: "nav.products" },
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
          <div className="flex items-center space-x-2 xl:space-x-3 flex-shrink-0">
            <img
              src="/logoHispalTech.png"
              alt="Hispal Network Logo"
              className={`h-9 w-9 sm:h-10 sm:w-10 xl:h-12 xl:w-12 object-contain transition-all duration-300 ${
                !isScrolled ? "brightness-0 invert" : ""
              }`}
            />
            <span className={`text-xl sm:text-2xl 2xl:text-3xl font-bold transition-colors duration-300 whitespace-nowrap ${
              isScrolled ? "text-primary" : "text-white"
            }`}>
              Hispal Network
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-6 2xl:space-x-10">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`transition-colors duration-300 text-xs 2xl:text-sm font-semibold uppercase tracking-[0.15em] ${
                  isScrolled 
                    ? "text-foreground/70 hover:text-primary" 
                    : "text-white/80 hover:text-white"
                }`}
              >
                {t(link.label)}
              </button>
            ))}
          </div>

          {/* Language */}
          <div className="hidden xl:flex items-center">
            <LanguageSwitcher isScrolled={isScrolled} />
          </div>

          {/* Mobile Menu Button and Language Switcher */}
          <div className="xl:hidden flex items-center gap-2">
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
          <div className="xl:hidden absolute top-full left-0 right-0 bg-background border-b border-border shadow-lg">
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
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
