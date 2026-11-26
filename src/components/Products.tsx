import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Check, Clock, CreditCard, Palette } from "lucide-react";
import SectionHeader from "@/components/SectionHeader";
import { useLanguage } from "@/contexts/LanguageContext";
import { PRODUCTS_DATA } from "@/constants";
import { GymMark } from "@/components/hispalgym/Logo";
import { PhoneShot, TabletShot } from "@/components/hispalgym/Devices";
import { appShot, GYM_MEDIA } from "@/components/hispalgym/copy";
import "@/components/hispalgym/theme.css";

const badges = [
  { icon: Clock, key: "open" },
  { icon: CreditCard, key: "payments" },
  { icon: Palette, key: "access" },
] as const;

/** Real screenshots of the Hispal GYM app (from the public demo, fictitious data). */
const screens = [
  { key: "qr", shot: "socio-acceso" },
  { key: "membership", shot: "socio-mi-cuenta-tab-membresia" },
  { key: "routine", shot: "socio-mi-cuenta-tab-rutinas" },
  { key: "classes", shot: "socio-clases" },
  { key: "shop", shot: "socio-tienda" },
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
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="productos" ref={ref} className="relative overflow-hidden bg-background py-16 md:py-24">
      <div className="absolute inset-0 bg-brand-glow" aria-hidden />
      <div className="container relative mx-auto px-4 lg:px-8">
        <SectionHeader title={t("products.eyebrow")} description={t("products.subtitle")} />

        {/* The product card carries Hispal GYM's own look (dark, Barlow, orange), like the product itself. */}
        <div className="hg hg-grain reveal relative isolate overflow-hidden rounded-3xl border border-hg-line shadow-hispaltech">
          <img src={`${GYM_MEDIA}/sala.webp`} alt="" aria-hidden loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(110deg,rgb(var(--hg-deep))_0%,rgb(var(--hg-deep)/0.92)_45%,rgb(var(--hg-deep)/0.7)_100%)]" aria-hidden />
          <div className="absolute -right-32 top-10 -z-10 size-[30rem] rounded-full bg-hg-accent/20 blur-[120px]" aria-hidden />

          <div className="grid grid-cols-1 items-center gap-8 p-5 sm:p-8 md:p-10 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:p-14">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-2 rounded-full border border-hg-accent/40 bg-hg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-hg-accent">
                <span className="size-1.5 rounded-full bg-hg-accent" aria-hidden />
                {t("products.badge")}
              </span>
              <h3 className="hg-display mt-5 flex items-center gap-3 text-5xl md:text-6xl">
                <GymMark className="size-12 md:size-14" />
                <span>Hispal <span className="text-hg-accent">GYM</span></span>
              </h3>
              <p className="mt-4 text-lg font-semibold leading-snug text-hg-fg">{t("products.items.hispalGym.title")}</p>
              <p className="mt-3 leading-relaxed text-hg-muted">{t("products.items.hispalGym.description")}</p>

              <ul className="mt-6 hidden space-y-3 sm:block">
                {points.map((p) => (
                  <li key={p} className="flex gap-3 text-[0.95rem] font-medium text-hg-fg/90">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-hg-accent text-hg-ink"><Check className="size-3.5" strokeWidth={3} aria-hidden /></span>
                    {p}
                  </li>
                ))}
              </ul>

              <ul className="mt-6 grid grid-cols-3 gap-2 sm:mt-8 sm:gap-3">
                {badges.map(({ icon: Icon, key }) => (
                  <li key={key} className="flex flex-col items-center gap-2 rounded-xl border border-hg-line bg-hg-surface/70 px-1 py-3 text-center text-xs font-bold leading-tight text-hg-fg sm:flex-row sm:px-3 sm:text-left sm:text-sm">
                    <Icon className="size-5 shrink-0 text-hg-accent" aria-hidden />
                    {t(`products.items.hispalGym.tags.${key}`)}
                  </li>
                ))}
              </ul>

              <Link to={product.path} className="hg-btn hg-btn--primary mt-8 w-full sm:w-auto">
                {t("products.viewProduct")}
                <ArrowRight className="size-5" aria-hidden />
              </Link>
            </div>

            {/* Phones: swipeable real screens. */}
            <div className="-mx-5 min-w-0 sm:hidden">
              <div className="hg-strip flex snap-x snap-mandatory gap-4 overflow-x-auto px-[calc(50%-95px)] pb-2">
                {screens.map(({ key, shot }) => (
                  <figure key={key} className="w-[190px] shrink-0 snap-center">
                    <PhoneShot src={appShot(shot)} alt={t(`products.items.hispalGym.screens.${key}`)} className="w-full" />
                    <figcaption className="mt-3 text-center text-xs font-bold uppercase tracking-[0.12em] text-hg-fg/80">{t(`products.items.hispalGym.screens.${key}`)}</figcaption>
                  </figure>
                ))}
              </div>
              <p className="mt-2 text-center text-[11px] text-hg-muted">{t("products.swipe")}</p>
            </div>

            {/* Tablet and up: owner panel and member app. */}
            <Link to={product.path} aria-label={t("products.viewProduct")} className="group relative mx-auto hidden h-[520px] w-full max-w-[520px] sm:block lg:h-[560px]">
              <TabletShot
                src={appShot("tableta-admin-pagos")}
                alt={t("products.items.hispalGym.screens.panel")}
                className="absolute right-0 top-0 w-[340px] rotate-[3deg] transition-transform duration-500 group-hover:rotate-[2deg] lg:w-[360px]"
              />
              <PhoneShot
                src={appShot("socio-mi-cuenta-tab-inicio")}
                alt={t("products.items.hispalGym.screens.membership")}
                className="absolute bottom-0 left-0 w-[220px] -rotate-[4deg] transition-transform duration-500 group-hover:-translate-y-2 lg:w-[235px]"
              />
              <span className="hg-float absolute left-[34%] top-2 flex items-center gap-2 rounded-xl border border-white/10 bg-hg-deep/85 px-3 py-2 text-xs font-bold text-hg-fg shadow-lg backdrop-blur-md">
                <Clock className="size-4 text-hg-accent" aria-hidden />
                {t("products.items.hispalGym.chip")}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
