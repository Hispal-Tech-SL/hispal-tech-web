import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { useBooking } from "@/contexts/BookingContext";
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
  const { setSelectedProject } = useBooking();

  // Map icon names to actual components
  const iconMap = {
    Globe,
    Smartphone,
    Database,
    Settings,
  };

  const services = SERVICES_DATA.map((service) => ({
    ...service,
    title: t(`services.items.${service.id}.title`),
    description: t(`services.items.${service.id}.description`),
    features:
      (t(`services.items.${service.id}.features`) as unknown as string[]) ||
      service.features,
    price: t(`services.items.${service.id}.price`),
    originalPrice: t(`services.items.${service.id}.originalPrice`),
    icon: iconMap[service.icon as keyof typeof iconMap],
  }));

  const scrollToSection = (id: string, serviceId?: string) => {
    if (serviceId) {
      const projectMapping: Record<string, string> = {
        "static-web": "static-web",
        web: "web",
        mobile: "app",
        systems: "system",
        integration: "integration",
        custom: "other",
      };
      setSelectedProject(projectMapping[serviceId] || "");
    }
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="servicios" className="pt-20 pb-8 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6 flex flex-col gap-1">
            <span>{t("services.title")}</span>
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
                className="group bg-white border border-hispaltech-blue/10 shadow-lg hover:shadow-hispaltech transition-all duration-300 hover:scale-105"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-2 mb-4 flex-wrap">
                    <div className="w-12 h-12 flex-shrink-0 bg-hispaltech-blue/10 rounded-lg flex items-center justify-center group-hover:bg-hispaltech-blue group-hover:text-white transition-colors">
                      <IconComponent className="h-6 w-6 text-hispaltech-blue group-hover:text-white" />
                    </div>
                    <div className="text-right min-w-0 overflow-hidden">
                      <div className="flex flex-wrap items-baseline justify-end gap-2">
                        {service.originalPrice && service.id !== "custom" && (
                          <span className="text-sm text-muted-foreground line-through">
                            {service.originalPrice}
                          </span>
                        )}
                        <div className="flex items-baseline gap-1">
                          {service.id !== "custom" && (
                            <span className="text-sm font-bold text-hispaltech-blue">
                              {t("common.from")}
                            </span>
                          )}
                          <span className="text-2xl font-bold text-hispaltech-blue">
                            {service.price}
                          </span>
                        </div>
                      </div>
                    </div>
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
                        <Shield className="h-4 w-4 text-hispaltech-blue flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    variant="outline"
                    className="w-full group border-hispaltech-blue text-hispaltech-blue hover:bg-hispaltech-blue hover:text-white"
                    onClick={() => scrollToSection("contacto", service.id)}
                  >
                    {t("nav.requestQuote")}
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
