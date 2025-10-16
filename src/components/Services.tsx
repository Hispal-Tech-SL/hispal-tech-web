import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { SERVICES_DATA } from "@/constants";
import {
  Globe,
  Smartphone,
  Database,
  Settings,
  Zap,
  Shield,
  ArrowRight,
} from "lucide-react";

const Services = () => {
  const { t } = useLanguage();

  // Map icon names to actual components
  const iconMap = {
    Globe,
    Smartphone,
    Database,
    Settings,
  };

  const services = SERVICES_DATA.map((service) => ({
    ...service,
    icon: iconMap[service.icon as keyof typeof iconMap],
  }));

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="servicios" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-hispaltech-green/10 text-hispaltech-green rounded-full px-4 py-2 mb-6">
            <Zap className="h-4 w-4" />
            <span className="text-sm font-semibold">
              {t("nav.services").toUpperCase()}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            {t("services.title")}
            <br />
            <span className="text-gradient">{t("services.subtitle")}</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("services.description")}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card
                key={index}
                className="group hover:shadow-hispaltech transition-all duration-300 border-0 shadow-md hover:scale-105"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-hispaltech-green/10 rounded-lg flex items-center justify-center group-hover:bg-hispaltech-green group-hover:text-white transition-colors">
                      <IconComponent className="h-6 w-6 text-hispaltech-green group-hover:text-white" />
                    </div>
                    <span className="text-2xl font-bold text-hispaltech-green">
                      {service.price}
                    </span>
                  </div>
                  <CardTitle className="text-xl text-primary">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-center gap-3"
                      >
                        <Shield className="h-4 w-4 text-hispaltech-green flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="outline"
                    className="w-full group border-hispaltech-green text-hispaltech-green hover:bg-hispaltech-green hover:text-white"
                    onClick={() => scrollToSection("contacto")}
                  >
                    {t("nav.requestQuote")}
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-hispaltech-navy/10 to-hispaltech-green/10 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            {t("services.cta.title")}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {t("services.cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="cta"
              size="lg"
              onClick={() => scrollToSection("contacto")}
              className="group"
            >
              {t("services.cta.primary")}
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("portafolio")}
            >
              {t("services.cta.secondary")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
