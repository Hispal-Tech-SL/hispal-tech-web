import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";
// Hero background image is now in public folder

const Hero = () => {
  const { t } = useLanguage();

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    let rafId = 0;

    const updateViewportHeight = () => {
      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        const visualViewportHeight = window.visualViewport?.height;
        const viewportHeight = visualViewportHeight ?? window.innerHeight;
        document.documentElement.style.setProperty(
          "--hero-vh",
          `${viewportHeight * 0.01}px`,
        );
        rafId = 0;
      });
    };

    updateViewportHeight();

    window.addEventListener("resize", updateViewportHeight);
    window.addEventListener("orientationchange", updateViewportHeight);
    window.addEventListener("scroll", updateViewportHeight, { passive: true });
    window.visualViewport?.addEventListener("resize", updateViewportHeight);
    window.visualViewport?.addEventListener("scroll", updateViewportHeight);

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("resize", updateViewportHeight);
      window.removeEventListener("orientationchange", updateViewportHeight);
      window.removeEventListener("scroll", updateViewportHeight);
      window.visualViewport?.removeEventListener(
        "resize",
        updateViewportHeight,
      );
      window.visualViewport?.removeEventListener(
        "scroll",
        updateViewportHeight,
      );
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="inicio"
      className="relative min-h-screen min-h-[100svh] min-h-[calc(var(--hero-vh,1vh)*100)] min-h-[100dvh] flex items-center overflow-hidden pt-[calc(4.5rem+env(safe-area-inset-top))] sm:pt-[calc(8rem+env(safe-area-inset-top))] pb-6 sm:pb-12"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/hero-bg.jpg')` }}
      >
        <div className="absolute inset-0 hero-gradient opacity-80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center text-white">
        <div className="max-w-4xl lg:max-w-5xl mx-auto flex flex-col justify-center items-center gap-5 sm:gap-12">
          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight flex flex-col gap-1 sm:gap-2">
            <span>{t("hero.title")}</span>
            <span className="text-hispaltech-blue">{t("hero.subtitle")}</span>
          </h1>

          {/* Subheading */}
          <p className="text-sm sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed px-1 sm:px-2 font-medium">
            {t("hero.description")}
          </p>

          {/* Benefits */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-8 text-sm md:text-base lg:text-lg">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-hispaltech-blue/50">
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-hispaltech-blue" />
              <span>{t("hero.benefits.custom")}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-hispaltech-blue/50">
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-hispaltech-blue" />
              <span>{t("hero.benefits.fast")}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-hispaltech-blue/50">
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-hispaltech-blue" />
              <span>{t("hero.benefits.support")}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="w-full flex justify-center mt-8 sm:mt-12">
            <Button
              onClick={() => scrollToSection("contacto")}
              className="group bg-white/5 backdrop-blur-md border border-white/20 hover:border-white/50 text-white hover:bg-white/10 transition-all duration-300 font-semibold text-base sm:text-lg px-8 py-4 sm:px-12 sm:py-5 rounded-full h-auto shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            >
              <span className="flex items-center">
                {t("hero.cta.primary")}
                <ArrowRight className="h-5 w-5 ml-3 flex-shrink-0 opacity-80 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </span>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Removed */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div> */}
    </section>
  );
};

export default Hero;
