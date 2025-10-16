import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useLanguage } from "@/contexts/LanguageContext";
import { CONTACT_INFO } from "@/constants";
import {
  Code,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Github,
  Send,
} from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: t("nav.home"), href: "#inicio" },
    { name: t("nav.services"), href: "#servicios" },
    { name: t("nav.portfolio"), href: "#portafolio" },
    // { name: t("nav.team"), href: "#equipo" },
    { name: t("nav.prices"), href: "#precios" },
    { name: t("nav.contact"), href: "#contacto" },
  ];

  const services = [
    { name: t("footer.services.web"), href: "#servicios" },
    { name: t("footer.services.mobile"), href: "#servicios" },
    { name: t("footer.services.systems"), href: "#servicios" },
    { name: t("footer.services.integrations"), href: "#servicios" },
    { name: t("footer.services.consulting"), href: "#contacto" },
    { name: t("footer.services.support"), href: "#contacto" },
  ];

  const legal = [
    { name: t("footer.legal.privacy"), href: "/legal/privacidad" },
    { name: t("footer.legal.terms"), href: "/legal/terminos" },
    { name: t("footer.legal.cookies"), href: "/legal/cookies" },
    { name: t("footer.legal.gdpr"), href: "/legal/gdpr" },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id.replace("#", ""));
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="bg-hispaltech-navy text-white">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-white/10">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t("footer.newsletter.title")}
            </h3>
            <p className="text-white/80 mb-6 max-w-2xl mx-auto">
              {t("footer.newsletter.description")}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t("footer.newsletter.placeholder")}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button variant="hero" className="px-6">
                <Send className="h-4 w-4 mr-2" />
                {t("footer.newsletter.subscribe")}
              </Button>
            </div>

            <p className="text-xs text-white/60 mt-3">
              {t("footer.newsletter.subscribers")}
            </p>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <img src="/logoHispalTech.jpg" alt="Hispal Tech Logo" className="h-8 w-8 object-contain" />
              <span className="text-2xl font-bold">Hispal Tech</span>
            </div>

            <p className="text-white/80 text-sm leading-relaxed">
              {t("footer.company.description")}
            </p>

            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-white/80">
                <MapPin className="h-4 w-4 text-hispaltech-green" />
                <span>{CONTACT_INFO.location}</span>
              </div>
              {/* Phone contact commented out as requested */}
              {/* <div className="flex items-center gap-2 text-white/80">
                  <Phone className="h-4 w-4 text-hispaltech-green" />
                  <span>{CONTACT_INFO.phone}</span>
                </div> */}
              <div className="flex items-center gap-2 text-white/80">
                <Mail className="h-4 w-4 text-hispaltech-green" />
                <span>{CONTACT_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t("footer.links.quick")}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-white/80 hover:text-hispaltech-green transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t("footer.links.services")}
            </h4>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(service.href)}
                    className="text-white/80 hover:text-hispaltech-green transition-colors text-sm"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="text-lg font-semibold mb-4">
              {t("footer.links.legal")}
            </h4>
            <ul className="space-y-2 mb-6">
              {legal.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.href}
                    className="text-white/80 hover:text-hispaltech-green transition-colors text-sm"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social Media */}
            <div>
              <h5 className="font-medium mb-3">{t("footer.links.follow")}</h5>
              <div className="flex gap-3">
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-hispaltech-green hover:border-hispaltech-green"
                >
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-hispaltech-green hover:border-hispaltech-green"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-white/20 text-white hover:bg-hispaltech-green hover:border-hispaltech-green"
                >
                  <Github className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Bottom Footer */}
        <div className="py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-white/80">
            © {currentYear} Hispal Tech. {t("footer.bottom.copyright")}
          </div>

          <div className="flex items-center gap-4 text-sm text-white/80">
            <span>{t("footer.bottom.madeWith")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
