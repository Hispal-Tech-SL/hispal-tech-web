import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Code } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img
              src="/logoHispalTech.png"
              alt="Hispal Tech Logo"
              className="h-8 w-8 object-contain"
            />
            <span className="text-xl xl:text-2xl font-bold text-primary">Hispal Tech</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-8">
            <button
              onClick={() => scrollToSection("inicio")}
              className="text-[#041726] hover:text-primary transition-colors lg:text-sm xl:text-base font-medium"
            >
              {t("nav.home")}
            </button>
            <button
              onClick={() => scrollToSection("servicios")}
              className="text-[#041726] hover:text-primary transition-colors lg:text-sm xl:text-base font-medium"
            >
              {t("nav.services")}
            </button>
            <button
              onClick={() => scrollToSection("precios")}
              className="text-[#041726] hover:text-primary transition-colors lg:text-sm xl:text-base font-medium"
            >
              {t("nav.prices")}
            </button>
            <button
              onClick={() => scrollToSection("proyectos")}
              className="text-[#041726] hover:text-primary transition-colors lg:text-sm xl:text-base font-medium"
            >
              {t("nav.projects")}
            </button>
            <button
              onClick={() => scrollToSection("contacto")}
              className="text-[#041726] hover:text-primary transition-colors lg:text-sm xl:text-base font-medium"
            >
              {t("nav.contact")}
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button variant="cta" onClick={() => scrollToSection("contacto")} className="lg:text-sm xl:text-base lg:px-3 xl:px-4">
              {t("nav.requestQuote")}
            </Button>
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button and Language Switcher */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button className="p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-background border-b border-border shadow-lg">
            <div className="container mx-auto px-4 py-4 space-y-4">
              <button
                onClick={() => scrollToSection("inicio")}
                className="block w-full text-left py-2 text-[#041726] hover:text-primary"
              >
                {t("nav.home")}
              </button>
              <button
                onClick={() => scrollToSection("servicios")}
                className="block w-full text-left py-2 text-[#041726] hover:text-primary"
              >
                {t("nav.services")}
              </button>
              <button
                onClick={() => scrollToSection("precios")}
                className="block w-full text-left py-2 text-[#041726] hover:text-primary"
              >
                {t("nav.prices")}
              </button>
              <button
                onClick={() => scrollToSection("proyectos")}
                className="block w-full text-left py-2 text-[#041726] hover:text-primary"
              >
                {t("nav.projects")}
              </button>
              <button
                onClick={() => scrollToSection("contacto")}
                className="block w-full text-left py-2 text-[#041726] hover:text-primary"
              >
                {t("nav.contact")}
              </button>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                <Button
                  variant="cta"
                  onClick={() => scrollToSection("contacto")}
                  className="w-full"
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
