import { TrendingDown, Shield, Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useReveal } from "@/hooks/use-reveal";

const ValueProps = () => {
  const { t } = useLanguage();
  const sectionRef = useReveal<HTMLElement>();

  const features = [
    {
      id: "best-price",
      icon: TrendingDown,
      title: t("valueProps.bestPrice.title"),
      description: t("valueProps.bestPrice.description"),
    },
    {
      id: "support",
      icon: Shield,
      title: t("valueProps.support.title"),
      description: t("valueProps.support.description"),
    },
    {
      id: "premium-quality",
      icon: Award,
      title: t("valueProps.premiumQuality.title"),
      description: t("valueProps.premiumQuality.description"),
    },
  ];

  return (
    <section ref={sectionRef} className="bg-background py-10 md:py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {features.map(({ id, icon: Icon, title, description }) => (
            <div
              key={id}
              className="reveal flex flex-row items-center gap-4 rounded-2xl border border-hispaltech-blue/10 bg-white p-4 text-left shadow-md transition-all duration-300 hover:shadow-hispaltech md:flex-col md:p-6 md:text-center"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-hispaltech-navy shadow-sm md:h-14 md:w-14">
                <Icon className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-hispaltech-navy md:text-lg">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueProps;
