import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { PRICING_COMPARISON_DATA, PRICING_FEATURES } from "@/constants";
import {
  ArrowRight,
  DollarSign,
  TrendingDown,
  Shield,
  Award,
} from "lucide-react";

const PriceComparison = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="precios" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-hispaltech-green/10 text-hispaltech-green rounded-full px-4 py-2 mb-6">
            <DollarSign className="h-4 w-4" />
            <span className="text-sm font-semibold">
              {t("nav.prices").toUpperCase()}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-hispaltech-navy mb-6">
            Mejor precio garantizado
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comparamos nuestros precios con cualquier competidor y te
            garantizamos la mejor oferta del mercado sin comprometer la calidad.
          </p>
        </div>

        {/* Pricing Comparison Table */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-primary mb-8 text-center">
            Comparativa de precios del mercado
          </h3>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-green-600 text-white">
                    <th className="px-6 py-4 text-left font-semibold">
                      Proveedor
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Precio promedio
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Calidad
                    </th>
                    <th className="px-6 py-4 text-left font-semibold">
                      Soporte
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {PRICING_COMPARISON_DATA.map((provider, index) => (
                    <tr
                      key={provider.id}
                      className={`border-b border-gray-200 ${
                        provider.isHispaltech ? "bg-green-50" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-primary">
                            {provider.name}
                          </span>
                          {provider.badge && (
                            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                              {provider.badge}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`font-bold text-lg ${provider.priceColor}`}
                        >
                          {provider.price}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {provider.quality}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {provider.support}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {PRICING_FEATURES.map((feature) => {
            const getIcon = () => {
              switch (feature.icon) {
                case "chart":
                  return <TrendingDown className="h-8 w-8 text-white" />;
                case "shield":
                  return <Shield className="h-8 w-8 text-white" />;
                case "award":
                  return <Award className="h-8 w-8 text-white" />;
                default:
                  return null;
              }
            };

            return (
              <Card key={feature.id} className="bg-white border-0 shadow-md">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-gradient-to-br from-hispaltech-navy to-hispaltech-navy/80 rounded-lg p-3 shadow-sm">
                      {getIcon()}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-hispaltech-navy mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            ¿Necesitas un presupuesto personalizado?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Cada proyecto es único. Contáctanos para una cotización adaptada a
            tus necesidades específicas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="cta"
              size="lg"
              onClick={() => scrollToSection("contacto")}
              className="group"
            >
              Solicitar Presupuesto
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("servicios")}
            >
              Ver Servicios
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceComparison;
