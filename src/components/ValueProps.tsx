import { TrendingDown, Shield, Award } from "lucide-react";

const features = [
  {
    id: "best-price",
    icon: TrendingDown,
    title: "Mejor precio garantizado",
    description:
      "Si encuentras una propuesta similar más barata, igualamos el precio + 10% de descuento adicional.",
  },
  {
    id: "support",
    icon: Shield,
    title: "Soporte dedicado 24/7",
    description:
      "Comunicación constante y soporte técnico para resolver cualquier duda o incidencia al instante.",
  },
  {
    id: "premium-quality",
    icon: Award,
    title: "Calidad premium",
    description:
      "Código limpio, documentado y escalable. Cumplimos estándares de calidad enterprise.",
  },
];

const ValueProps = () => {
  return (
    <section className="py-12 bg-muted/50">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map(({ id, icon: Icon, title, description }) => (
            <div
              key={id}
              className="bg-white border border-hispaltech-blue/10 shadow-lg rounded-xl p-6 text-center flex flex-col items-center gap-4 hover:shadow-hispaltech hover:scale-105 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-hispaltech-navy rounded-xl flex items-center justify-center shadow-sm">
                <Icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-hispaltech-navy">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
