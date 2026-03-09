import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { PRICING_COMPARISON_DATA } from "@/constants";
import { ArrowRight } from "lucide-react";

const PriceComparison = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="precios" className="py-20 bg-muted/30 pt-10">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">


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
                  <tr className="bg-hispaltech-blue text-white">
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
                        provider.isHispaltech ? "bg-hispaltech-blue/10" : ""
                      }`}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-primary">
                            {provider.name}
                          </span>

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



        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-hispaltech-navy/10 to-hispaltech-blue/10 rounded-2xl p-8 md:p-12 -mb-10">
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
          </div>
        </div>
      </div>
    </section>
  );
};

export default PriceComparison;
