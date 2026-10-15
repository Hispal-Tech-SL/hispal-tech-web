import { Button } from "@/components/ui/button";
import { ArrowRight, Headset, Layers, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Phone, QrScreen } from "@/components/hispalgym/Mockups";
import { GymMark } from "@/components/hispalgym/Logo";
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

  const benefits = [
    { icon: Layers, label: t("hero.benefits.custom") },
    { icon: Zap, label: t("hero.benefits.fast") },
    { icon: Headset, label: t("hero.benefits.support") },
  ];

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] min-h-[calc(var(--hero-vh,1vh)*100)] min-h-[100dvh] items-end overflow-hidden pb-8 pt-[calc(5rem+env(safe-area-inset-top))] sm:items-center sm:pb-12 sm:pt-[calc(8rem+env(safe-area-inset-top))]"
    >
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('/hero-bg.jpg')` }}
      >
        <div className="absolute inset-0 hero-gradient opacity-80" />
        {/* Extra darkening at the bottom so text stays readable on mobile */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent sm:hidden" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-5 text-white sm:px-4 sm:text-center lg:px-8">
        <div className="mx-auto flex max-w-4xl flex-col items-start gap-5 sm:items-center sm:gap-10 lg:max-w-5xl">
          {/* Main Headline */}
          <h1 className="flex flex-col text-[2.6rem] font-black leading-[1.05] tracking-tight sm:gap-2 sm:text-5xl sm:leading-tight md:text-6xl lg:text-7xl">
            <span>{t("hero.title")}</span>
            <span className="text-hispaltech-light-blue sm:text-hispaltech-blue">{t("hero.subtitle")}</span>
          </h1>

          {/* Subheading */}
          <p className="max-w-3xl text-sm font-medium leading-snug text-white/85 sm:text-lg sm:leading-relaxed md:text-xl lg:text-2xl">
            {t("hero.description").replace(/^\p{Extended_Pictographic}\s*/u, "")}
          </p>

          {/* Benefits */}
          <ul className="grid w-full grid-cols-3 gap-2 sm:flex sm:w-auto sm:flex-wrap sm:justify-center sm:gap-6">
            {benefits.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/15 bg-white/5 px-2 py-3 text-center text-[11px] font-semibold leading-tight backdrop-blur-sm sm:flex-row sm:gap-2 sm:rounded-full sm:border-hispaltech-blue/50 sm:px-4 sm:py-2 sm:text-base"
              >
                <Icon className="h-5 w-5 shrink-0 text-hispaltech-light-blue" aria-hidden />
                {label}
              </li>
            ))}
          </ul>

          {/* CTA */}
          <Button
            onClick={() => scrollToSection("contacto")}
            className="group h-auto w-full rounded-2xl bg-hispaltech-blue px-8 py-4 text-base font-bold text-white shadow-blue transition-all duration-300 hover:bg-hispaltech-blue/90 sm:mt-2 sm:w-auto sm:rounded-full sm:border sm:border-white/20 sm:bg-white/5 sm:px-12 sm:py-5 sm:text-lg sm:font-semibold sm:shadow-[0_4px_30px_rgba(0,0,0,0.1)] sm:backdrop-blur-md sm:hover:border-white/50 sm:hover:bg-white/10"
          >
            {t("hero.cta.primary")}
            <ArrowRight className="ml-3 h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>

          {/* Product teaser card (below xl): phone peeking out of the card */}
          <Link
            to="/hispalgym"
            aria-label={`${t("hero.teaser.title")} ${t("hero.teaser.subtitle")}`}
            className="gym-orange group relative flex h-28 w-full max-w-md items-center overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/20 to-white/5 text-left backdrop-blur-md transition-colors hover:from-white/25 xl:hidden"
          >
            <div className="absolute -left-10 -top-10 size-36 rounded-full bg-primary/30 blur-2xl" aria-hidden />
            <div className="relative z-10 flex-1 py-4 pl-5 pr-28">
              <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                {t("hero.teaser.badge")}
              </span>
              <p className="text-lg font-extrabold leading-tight">{t("hero.teaser.title")}</p>
              <p className="mt-0.5 flex items-center gap-1 text-xs text-white/70">
                {t("hero.teaser.subtitle")}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden />
              </p>
            </div>
            <div className="pointer-events-none absolute right-4 top-5 origin-top-right rotate-6 scale-[0.42] transition-transform duration-500 will-change-transform group-hover:-translate-y-1 group-hover:rotate-3">
              <Phone label="App de Hispal GYM"><QrScreen /></Phone>
            </div>
          </Link>
        </div>
      </div>

      {/* Product teaser (xl+): phone peeking from the right edge, vertically centered */}
      <Link
        to="/hispalgym"
        aria-label={`${t("hero.teaser.title")} ${t("hero.teaser.subtitle")}`}
        className="gym-orange group absolute right-0 top-1/2 z-20 hidden -translate-y-[45%] xl:block"
      >
        <div className="relative h-[360px] w-[250px]">
          <div className="pointer-events-none absolute -right-16 top-0 origin-top-right -rotate-6 scale-[0.7] transition-transform duration-500 will-change-transform group-hover:-translate-x-4 group-hover:-rotate-2">
            <Phone label="App de Hispal GYM"><QrScreen /></Phone>
          </div>
          <div className="absolute -left-10 bottom-6 flex items-center gap-3 rounded-2xl border border-white/20 bg-black/40 px-4 py-3 text-left text-white shadow-xl backdrop-blur-md transition-colors group-hover:bg-black/55">
            <GymMark className="size-10" />
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-primary">
                {t("hero.teaser.badge")}
              </span>
              <span className="block text-sm font-extrabold leading-tight">{t("hero.teaser.title")}</span>
              <span className="block text-xs text-white/70">{t("hero.teaser.subtitle")}</span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden />
          </div>
        </div>
      </Link>
    </section>
  );
};

export default Hero;
