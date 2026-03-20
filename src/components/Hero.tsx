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
      className="relative min-h-screen min-h-[100svh] min-h-[calc(var(--hero-vh,1vh)*100)] min-h-[100dvh] flex items-center overflow-hidden pt-[calc(8rem+env(safe-area-inset-top))] pb-12"
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
        <div className="max-w-4xl lg:max-w-5xl mx-auto flex flex-col justify-center items-center gap-8 sm:gap-12">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-tight flex flex-col gap-2">
            <span>{t("hero.title")}</span>
            <span className="text-hispaltech-blue">{t("hero.subtitle")}</span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed px-2 font-medium">
            {t("hero.description")}
          </p>

          {/* Benefits */}
          <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-4 sm:gap-8 text-sm md:text-base lg:text-lg">
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-hispaltech-blue" />
              <span>{t("hero.benefits.custom")}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-hispaltech-blue" />
              <span>{t("hero.benefits.fast")}</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
              <CheckCircle className="h-5 w-5 flex-shrink-0 text-hispaltech-blue" />
              <span>{t("hero.benefits.support")}</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="w-full flex justify-center mt-2 sm:mt-4">
            <Button
              variant="hero"
              size="xl"
              onClick={() => scrollToSection("contacto")}
              className="group w-full max-w-sm sm:max-w-md sm:w-auto text-lg sm:text-xl px-8 py-6 sm:py-8 h-auto font-bold rounded-2xl shadow-xl shadow-hispaltech-blue/20"
            >
              {t("hero.cta.primary")}
              <ArrowRight className="h-6 w-6 ml-2 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
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
