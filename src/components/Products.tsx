import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2, Clock, CreditCard, DoorOpen, QrCode } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { PRODUCTS_DATA } from "@/constants";
import { Phone, QrScreen, RoutineScreen, ActivitiesScreen, Desktop } from "@/components/hispalgym/Mockups";

const badges = [
  { icon: Clock, key: "open" },
  { icon: CreditCard, key: "payments" },
  { icon: DoorOpen, key: "access" },
] as const;

const screens = [
  { key: "qr", node: <QrScreen tone="primary" /> },
  { key: "routine", node: <RoutineScreen tone="primary" /> },
  { key: "activities", node: <ActivitiesScreen tone="primary" /> },
] as const;

const Products = () => {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);
  const product = PRODUCTS_DATA[0];
  const rawPoints = t("products.items.hispalGym.points") as unknown;
  const points = Array.isArray(rawPoints) ? (rawPoints as string[]) : [];

  useEffect(() => {
    const els = ref.current?.querySelectorAll(".reveal");
    if (!els) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.15 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="productos"
      ref={ref}
      className="relative overflow-hidden bg-background py-16 md:py-24"
    >
      <div className="absolute inset-0 bg-brand-glow" aria-hidden />
      <div className="container relative mx-auto px-4 lg:px-8">
        <SectionHeader
          title={t("products.eyebrow")}
          description={t("products.subtitle")}
        />

        <div className="reveal overflow-hidden rounded-3xl border bg-card shadow-hispaltech">
          <div className="grid items-center gap-6 p-4 sm:gap-10 sm:p-6 md:p-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:p-14">
            {/* Mobile: swipeable app screens */}
            <div className="gym-orange relative -mx-4 overflow-hidden rounded-2xl bg-gradient-to-br from-hispaltech-navy to-hispaltech-dark-navy py-6 sm:hidden">
              <div className="absolute inset-0 bg-brand-glow" aria-hidden />
              <div className="relative flex snap-x snap-mandatory gap-4 overflow-x-auto px-[calc(50%-104px)] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {screens.map(({ key, node }) => (
                  <div key={key} className="shrink-0 snap-center">
                    <p className="mb-3 text-center text-xs font-bold uppercase tracking-wider text-white/80">
                      {t(`products.items.hispalGym.screens.${key}`)}
                    </p>
                    <div className="h-[416px] w-[208px]">
                      <div className="origin-top-left scale-[0.8]">
                        <Phone label={t(`products.items.hispalGym.screens.${key}`)}>{node}</Phone>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <p className="relative mt-3 text-center text-[11px] text-white/60">
                {t("products.swipe")}
              </p>
            </div>

            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-hispaltech-blue/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-hispaltech-blue">
                <span className="size-1.5 rounded-full bg-hispaltech-blue" aria-hidden />
                {t("products.badge")}
              </span>
              <h3 className="mt-4 text-3xl font-extrabold text-primary md:text-4xl">
                Hispal <span className="gym-orange text-primary">GYM</span>
              </h3>
              <p className="mt-2 text-lg font-semibold">
                {t("products.items.hispalGym.title")}
              </p>
              <p className="mt-3 text-muted-foreground">
                {t("products.items.hispalGym.description")}
              </p>

              <ul className="mt-6 hidden space-y-3 sm:block">
                {points.map((p) => (
                  <li key={p} className="flex gap-3 text-sm">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-hispaltech-blue" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>

              <ul className="mt-5 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-3">
                {badges.map(({ icon: Icon, key }) => (
                  <li key={key} className="flex flex-col items-center gap-1.5 rounded-xl bg-hispaltech-blue/5 px-1 py-3 text-center text-[11px] font-semibold leading-tight sm:flex-row sm:gap-2.5 sm:bg-transparent sm:p-0 sm:text-left sm:text-sm">
                    <span className="grid size-9 place-items-center rounded-lg bg-hispaltech-blue/10 text-hispaltech-blue">
                      <Icon className="size-4" aria-hidden />
                    </span>
                    {t(`products.items.hispalGym.tags.${key}`)}
                  </li>
                ))}
              </ul>

              <div className="mt-6 sm:mt-10">
                <Button
                  asChild
                  variant="cta"
                  className="h-14 w-full gap-3 px-10 text-base font-bold shadow-blue sm:w-auto"
                >
                  <Link to={product.path}>
                    {t("products.viewProduct")}
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>

            <Link
              to={product.path}
              aria-label={t("products.viewProduct")}
              className="gym-orange group relative mx-auto hidden w-full max-w-md overflow-hidden rounded-[2rem] sm:block focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-hispaltech-navy to-hispaltech-dark-navy" aria-hidden />
              <div className="absolute inset-0 rounded-[2rem] bg-brand-glow" aria-hidden />
              <div className="relative flex items-center justify-center px-4 py-10">
                <div className="-mr-24 mt-24 hidden w-[300px] origin-right scale-90 transition-transform duration-500 group-hover:-translate-x-2 sm:block">
                  <Desktop variant="owner" label="Panel del propietario" />
                </div>
                <div className="relative z-10 rotate-2 transition-transform duration-500 group-hover:-translate-y-2 group-hover:rotate-0">
                  <Phone label="App del socio con carnet QR y membresía activa">
                    <QrScreen />
                  </Phone>
                </div>
                <span className="absolute left-4 top-6 z-20 flex animate-float items-center gap-2 rounded-xl bg-card px-3 py-2 text-xs font-bold text-card-foreground shadow-soft">
                  <QrCode className="size-4 text-hispaltech-blue" aria-hidden />
                  {t("products.items.hispalGym.chip")}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
