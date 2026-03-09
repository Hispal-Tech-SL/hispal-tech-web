import { useLanguage } from "@/contexts/LanguageContext";
import { PRICING_COMPARISON_DATA } from "@/constants";

const PriceComparison = () => {
  const { t } = useLanguage();

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




      </div>
    </section>
  );
};

export default PriceComparison;
