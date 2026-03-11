import { X, Check, Zap } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PriceComparison = () => {
  const { t } = useLanguage();

  const competitorFeatures = (t("prices.comparison.competitor.items") as unknown as string[]).map(text => ({
    text,
    negative: true
  }));

  const hispaltechFeatures = (t("prices.comparison.hispaltech.items") as unknown as string[]).map(text => ({
    text,
    negative: false
  }));

  return (
    <section id="precios" className="py-24 bg-white relative">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-hispaltech-navy mb-6 tracking-tight">
            {t("prices.comparison.title")}{" "}
            <span className="text-hispaltech-blue">{t("prices.comparison.subtitle")}</span>
          </h2>
          <p className="text-base md:text-xl text-slate-500 max-w-2xl mx-auto font-medium">
            {t("prices.comparison.description")}
          </p>
        </div>

        {/* Comparison Plates Container */}
        <div className="relative flex flex-col lg:flex-row items-stretch justify-center gap-6 lg:gap-0 max-w-6xl mx-auto">
          
          {/* Floating VS Badge in a Circle */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-40 hidden lg:flex items-center justify-center">
            <div className="w-16 h-16 xl:w-20 xl:h-20 rounded-full bg-hispaltech-navy border-4 border-white flex items-center justify-center shadow-2xl relative overflow-hidden">
               <span className="text-white font-black text-xl xl:text-2xl italic tracking-tighter relative z-10">VS</span>
            </div>
          </div>

          {/* Competitor Plate */}
          <div className="flex-1 bg-slate-50 border border-slate-200 p-6 md:p-8 lg:p-10 lg:pr-14 flex flex-col rounded-[2.5rem] lg:rounded-r-none relative overflow-hidden transition-all duration-300">
            {/* Title Section with Min-Height for alignment */}
            <div className="mb-4 lg:min-h-[140px] xl:min-h-[160px] relative z-10">
              <span className="inline-block bg-slate-200 text-slate-600 text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6">
                {t("prices.comparison.competitor.badge")}
              </span>
              <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-800 mb-2 leading-tight">
                {t("prices.comparison.competitor.title")}
              </h3>
              <p className="text-slate-500 text-sm md:text-base leading-relaxed">
                {t("prices.comparison.competitor.subtitle")}
              </p>
            </div>
            
            {/* Price section with Min-Height for alignment */}
            <div className="mb-10 lg:min-h-[100px] flex flex-col justify-end relative z-10">
              <span className="text-slate-400 text-xs font-semibold mb-1 uppercase tracking-wide">
                {t("prices.comparison.competitor.priceSubtext")}
              </span>
              <span className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-400/60 line-through leading-none">
                {t("prices.comparison.competitor.startingAt")}
              </span>
            </div>

            <ul className="space-y-4 flex-1 relative z-10">
              {competitorFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                    <X className="h-3 w-3 text-red-500" />
                  </span>
                  <span className="text-sm md:text-base text-slate-600 leading-tight">{feature.text}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile VS Badge */}
          <div className="lg:hidden flex items-center justify-center -my-6 py-4 relative z-30">
             <div className="w-14 h-14 rounded-full bg-hispaltech-navy border-4 border-white flex items-center justify-center shadow-lg">
                <span className="text-white font-black text-lg italic">VS</span>
             </div>
          </div>

          {/* Hispal Tech Plate (Highlight) */}
          <div className="flex-1 bg-hispaltech-navy shadow-2xl p-6 md:p-8 lg:p-10 lg:pl-14 flex flex-col rounded-[2.5rem] lg:rounded-l-none relative overflow-hidden z-10">
            {/* Premium background effects */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-hispaltech-blue/20 rounded-full blur-[80px] pointer-events-none" />
            
            {/* Title Section with Min-Height for alignment */}
            <div className="mb-4 lg:min-h-[140px] xl:min-h-[160px] relative z-10">
              <span className="inline-flex items-center gap-2 bg-hispaltech-blue text-white text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-6 shadow-lg shadow-hispaltech-blue/20">
                <Zap className="h-3 w-3 fill-current" />
                {t("prices.comparison.hispaltech.badge")}
              </span>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-blue-400 mb-2 leading-tight">
                {t("prices.comparison.hispaltech.title")}
              </h3>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">
                {t("prices.comparison.hispaltech.subtitle")}
              </p>
            </div>

            {/* Price section with Min-Height for alignment */}
            <div className="mb-10 lg:min-h-[100px] flex flex-col justify-end relative z-10">
              <span className="text-blue-300/80 font-bold text-xs mb-1 uppercase tracking-wide">
                {t("prices.comparison.hispaltech.priceSubtext")}
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none">
                  {t("prices.comparison.hispaltech.startingAt")}
                </span>
              </div>
            </div>

            <ul className="space-y-4 flex-1 relative z-10">
              {hispaltechFeatures.map((feature, i) => (
                <li key={i} className="flex items-start gap-4">
                  <span className="mt-1 flex-shrink-0 w-5 h-5 bg-hispaltech-blue/20 rounded-full flex items-center justify-center">
                    <Check className="h-3 w-3 text-hispaltech-blue stroke-[3px]" />
                  </span>
                  <span className="text-sm md:text-base text-white/90 font-medium leading-tight">{feature.text}</span>
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <div className="mt-10 relative z-10">
              <a
                href="#contacto"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("contacto")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="block w-full text-center bg-hispaltech-blue hover:bg-hispaltech-light-blue text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-hispaltech-blue/40 active:scale-[0.98] text-base md:text-lg"
              >
                {t("prices.comparison.hispaltech.cta")}
              </a>
              <p className="text-center text-xs text-slate-500 mt-5 font-medium">
                {t("prices.comparison.hispaltech.ctaSubtext")}
              </p>
            </div>
          </div>
        </div>

        {/* Trust Footer */}
        <div className="mt-20 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 px-6 md:px-8 py-3 bg-slate-50 border border-slate-200 rounded-2xl">
                <div className="w-2 h-2 rounded-full bg-hispaltech-blue animate-pulse" />
                <p className="text-slate-600 text-xs md:text-sm lg:text-base font-medium">
                    {t("prices.comparison.footer")}
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default PriceComparison;
