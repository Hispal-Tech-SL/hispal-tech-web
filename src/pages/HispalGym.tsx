import { useEffect, useRef, useState, type CSSProperties, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight, BellRing, Check, CheckCircle2, ChevronLeft, ChevronRight, CreditCard, CalendarDays, DoorOpen, Dumbbell, Gauge, Globe,
  Headset, Landmark, Lightbulb, Lock, MapPin, Nfc, Palette, Play, QrCode, Ruler, ScanFace, ScanLine, ShieldCheck, ShoppingBag, Tv, Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GymHeader, GymFooter } from "@/components/hispalgym/GymChrome";
import { PhoneShot, TabletShot } from "@/components/hispalgym/Devices";
import { useGymCopy, appShot, GYM_MEDIA } from "@/components/hispalgym/copy";
import { sendEmailAlternative } from "@/services/emailService";
import { HISPALGYM_DEMO_URL } from "@/constants/hispalgym";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import "@/components/hispalgym/theme.css";

function useReveal(dep: unknown) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.is-visible)");
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: 0.1 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [dep]);
}

function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    const meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    const prevDesc = meta?.getAttribute("content") ?? null;
    meta?.setAttribute("content", description);
    // Hispal GYM favicon while this page is open (the rest of the site keeps the Hispal Network one).
    const icons = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="apple-touch-icon"]'));
    const original = icons.map((l) => [l, l.getAttribute("href")] as const);
    icons.forEach((l) => l.setAttribute("href", l.rel === "apple-touch-icon" ? "/hispalgym/favicon-180.png" : "/hispalgym/favicon-32.png"));
    return () => {
      document.title = prevTitle;
      if (meta && prevDesc !== null) meta.setAttribute("content", prevDesc);
      original.forEach(([l, href]) => href && l.setAttribute("href", href));
    };
  }, [title, description]);
}

const Container = ({ className, children }: { className?: string; children: ReactNode }) => (
  <div className={cn("mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>
);

function SectionHead({ eyebrow, title, sub, center = false, className }: { eyebrow: string; title: string; sub?: string; center?: boolean; className?: string }) {
  return (
    <div className={cn("reveal max-w-3xl", center && "mx-auto text-center", className)}>
      <p className="hg-eyebrow">{eyebrow}</p>
      <h2 className="mt-4 text-[2.6rem] sm:text-6xl lg:text-[4.2rem]">{title}</h2>
      {sub && <p className={cn("mt-5 text-lg leading-relaxed text-hg-muted", center && "mx-auto max-w-2xl")}>{sub}</p>}
    </div>
  );
}

const HispalGym = () => {
  const c = useGymCopy();
  const { language } = useLanguage();
  useReveal(language);
  useDocumentMeta(c.meta.title, c.meta.description);
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="hg min-h-screen overflow-x-clip">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-hg-accent focus:px-4 focus:py-2 focus:text-hg-ink">{c.nav.skip}</a>
      <GymHeader />
      <main id="main">
        <Hero />
        <Included />
        <Difference />
        <Brand />
        <Process />
        <Access />
        <Control />
        <Features />
        <Packs />
        <CaseStudy />
        <Trust />
        <Faq />
        <Contact />
      </main>
      <GymFooter />
    </div>
  );
};

export default HispalGym;

/* ------------------------------------------------------------------ Hero */

function Hero() {
  const c = useGymCopy();
  return (
    <section id="inicio" className="hg-grain relative isolate overflow-hidden bg-hg-deep">
      {/* Background footage (licensed stock), darkened; still poster when motion is reduced. */}
      <video
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-55 motion-reduce:hidden"
        src={`${GYM_MEDIA}/hero.mp4`}
        poster={`${GYM_MEDIA}/hero-poster.webp`}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      />
      <img src={`${GYM_MEDIA}/hero-poster.webp`} alt="" aria-hidden className="absolute inset-0 -z-20 hidden h-full w-full object-cover opacity-50 motion-reduce:block" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(var(--hg-deep)/0.55)_0%,rgb(var(--hg-deep)/0.78)_45%,rgb(var(--hg-bg))_100%)] lg:bg-[linear-gradient(90deg,rgb(var(--hg-deep)/0.96)_0%,rgb(var(--hg-deep)/0.82)_42%,rgb(var(--hg-deep)/0.45)_100%)]" aria-hidden />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-b from-transparent to-hg-bg" aria-hidden />
      <div className="absolute -right-40 top-1/3 -z-10 size-[38rem] rounded-full bg-hg-accent/20 blur-[140px]" aria-hidden />

      <Container className="grid min-h-[100svh] items-center gap-10 pb-10 pt-24 lg:grid-cols-[1.02fr_1fr] lg:gap-6 lg:pb-16 lg:pt-28">
        <div className="relative z-10">
          <p className="hg-eyebrow">{c.hero.eyebrow}</p>
          <h1 className="mt-5 text-[3.4rem] leading-[0.88] sm:text-[5.2rem] lg:text-[5.4rem] xl:text-[6.6rem]">
            <span className="block">{c.hero.title1}</span>
            <span className="block text-hg-accent">{c.hero.title2}</span>
          </h1>
          <p className="mt-6 max-w-xl text-[1.08rem] leading-relaxed text-hg-fg/80 sm:text-lg">{c.hero.lead}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#contacto" className="hg-btn hg-btn--primary">{c.hero.ctaPrimary} <ArrowRight className="size-5" aria-hidden /></a>
            <a href={HISPALGYM_DEMO_URL} className="hg-btn hg-btn--ghost"><Play className="size-4" aria-hidden /> {c.hero.ctaDemo}</a>
          </div>
          <ul className="mt-8 grid gap-2.5 sm:grid-cols-3 sm:gap-4">
            {c.hero.proof.map((p) => (
              <li key={p} className="flex items-start gap-2.5 text-sm font-semibold leading-snug text-hg-fg/85">
                <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-hg-accent text-hg-ink"><Check className="size-3.5" strokeWidth={3} aria-hidden /></span>
                {p}
              </li>
            ))}
          </ul>
        </div>

        <HeroDevices />
      </Container>
    </section>
  );
}

function HeroChip({ icon: Icon, title, sub, className }: { icon: typeof Check; title: string; sub: string; className?: string }) {
  return (
    <div className={cn("hg-float absolute z-20 flex items-center gap-3 rounded-2xl border border-white/10 bg-hg-deep/80 py-2.5 pl-2.5 pr-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md", className)}>
      <span className="grid size-10 place-items-center rounded-xl bg-hg-accent text-hg-ink"><Icon className="size-5" aria-hidden /></span>
      <span className="leading-tight">
        <span className="block text-sm font-bold text-hg-fg">{title}</span>
        <span className="block text-xs text-hg-muted">{sub}</span>
      </span>
    </div>
  );
}

function HeroDevices() {
  const c = useGymCopy();
  return (
    <div className="relative mx-auto h-[440px] w-full max-w-[560px] sm:h-[560px] lg:h-[640px] lg:max-w-none">
      <TabletShot
        src={appShot("tableta-admin-pagos")}
        alt={c.hero.tabletAlt}
        eager
        className="absolute right-0 top-2 w-[300px] rotate-[3deg] sm:w-[400px] lg:right-2 lg:top-6 lg:w-[420px] xl:w-[460px]"
      />
      <PhoneShot
        src={appShot("socio-mi-cuenta-tab-inicio")}
        alt={c.hero.phoneAlt}
        eager
        className="absolute bottom-0 left-[2%] w-[190px] -rotate-[4deg] sm:left-[6%] sm:w-[250px] lg:bottom-4 lg:left-0 lg:w-[268px] xl:left-6"
      />
      <HeroChip icon={DoorOpen} title={c.hero.chipOpen} sub={c.hero.chipOpenSub} className="right-[4%] top-0 hidden sm:flex lg:-top-2 lg:right-auto lg:left-[30%]" />
      <HeroChip icon={Palette} title={c.hero.chipBrand} sub={c.hero.chipBrandSub} className="hg-float-delay bottom-[38%] right-0 hidden sm:flex lg:-right-2" />
      <HeroChip icon={MapPin} title={c.hero.chipVisit} sub={c.hero.chipVisitSub} className="bottom-2 right-[6%] hidden md:flex lg:bottom-10 lg:right-[10%]" />
    </div>
  );
}

/* -------------------------------------------------------------- Included */

function Included() {
  const c = useGymCopy();
  const icons = [Ruler, Globe, Palette, Headset];
  return (
    <section id="incluido" className="relative py-20 md:py-28">
      <Container>
        <SectionHead eyebrow={c.included.eyebrow} title={c.included.title} sub={c.included.sub} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {c.included.items.map((it, i) => {
            const Icon = icons[i];
            return (
              <article key={it.title} className="hg-card reveal group relative flex flex-col overflow-hidden p-6 lg:p-7" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="absolute -right-10 -top-10 size-32 rounded-full bg-hg-accent/10 blur-2xl transition-opacity group-hover:opacity-100" aria-hidden />
                <Icon className="size-6 text-hg-accent" aria-hidden />
                <p className="hg-display mt-6 text-[2.9rem] text-hg-fg">
                  {it.value}
                  {i === 1 && <sup className="ml-0.5 align-super text-xl text-hg-accent">*</sup>}
                </p>
                <h3 className="mt-3 text-lg font-bold">{it.title}</h3>
                <p className="mt-2 text-[0.95rem] leading-relaxed text-hg-muted">{it.text}</p>
              </article>
            );
          })}
        </div>
        <p className="reveal mt-6 text-sm text-hg-muted">* {c.included.note}</p>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------ Difference */

function Difference() {
  const c = useGymCopy();
  return (
    <section id="diferencia" className="hg-grain relative isolate overflow-hidden border-y border-hg-line bg-hg-deep py-20 md:py-28">
      <img src={`${GYM_MEDIA}/estiramientos.webp`} alt="" aria-hidden loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-[0.16]" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-hg-deep via-hg-deep/80 to-hg-deep" aria-hidden />
      <Container>
        <SectionHead eyebrow={c.difference.eyebrow} title={c.difference.title} sub={c.difference.sub} />

        {/* Mobile: one card per topic. */}
        <ul className="mt-12 space-y-4 md:hidden">
          {c.difference.rows.map(([topic, generic, us]) => (
            <li key={topic} className="hg-card reveal overflow-hidden">
              <p className="px-5 pt-5 text-xs font-bold uppercase tracking-[0.14em] text-hg-muted">{topic}</p>
              <div className="mx-3 mt-3 rounded-xl border border-hg-accent/40 bg-hg-accent/10 p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-hg-accent">{c.difference.colUs}</p>
                <p className="mt-1.5 flex gap-2 font-semibold leading-snug"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-hg-accent" aria-hidden />{us}</p>
              </div>
              <div className="px-5 pb-5 pt-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-hg-muted">{c.difference.colGeneric}</p>
                <p className="mt-1.5 text-sm leading-snug text-hg-muted">{generic}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Tablet and desktop: a comparison table. */}
        <div className="hg-card reveal mt-14 hidden overflow-hidden md:block">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-hg-line">
                <th scope="col" className="w-[19%] p-5 text-xs font-bold uppercase tracking-[0.14em] text-hg-muted"><span className="sr-only">{c.difference.colTopic}</span></th>
                <th scope="col" className="w-[37%] p-5 text-xs font-bold uppercase tracking-[0.14em] text-hg-muted">{c.difference.colGeneric}</th>
                <th scope="col" className="w-[44%] bg-hg-accent/10 p-5">
                  <span className="hg-display text-2xl text-hg-accent">{c.difference.colUs}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {c.difference.rows.map(([topic, generic, us]) => (
                <tr key={topic} className="border-b border-hg-line last:border-0">
                  <th scope="row" className="p-5 align-top text-sm font-bold uppercase tracking-[0.08em] text-hg-fg">{topic}</th>
                  <td className="p-5 align-top text-[0.95rem] leading-relaxed text-hg-muted">{generic}</td>
                  <td className="bg-hg-accent/[0.06] p-5 align-top">
                    <span className="flex gap-3 font-semibold leading-relaxed"><CheckCircle2 className="mt-1 size-5 shrink-0 text-hg-accent" aria-hidden />{us}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="reveal mt-5 text-sm text-hg-muted">{c.difference.note}</p>
      </Container>
    </section>
  );
}

/* ----------------------------------------------------------------- Brand */

const BRANDS = [
  { key: "nortebox", name: "Norte Box", accent: "230 57 70" },
  { key: "distritofit", name: "Distrito Fit", accent: "43 182 115" },
  { key: "atlasclub", name: "Atlas Club", accent: "217 164 65" },
  { key: "socio", name: "Hispal GYM", accent: "240 104 0" },
] as const;

function Brand() {
  const c = useGymCopy();
  const [brand, setBrand] = useState<(typeof BRANDS)[number]>(BRANDS[0]);
  const home = brand.key === "socio" ? "socio-mi-cuenta-tab-inicio" : `${brand.key}-mi-cuenta-tab-inicio`;
  const access = `${brand.key}-acceso`;
  return (
    <section id="tu-marca" className="relative overflow-hidden py-20 md:py-28" style={{ "--hg-accent": brand.accent } as CSSProperties}>
      <div className="absolute left-1/2 top-1/3 -z-0 size-[40rem] -translate-x-1/2 rounded-full bg-hg-accent/10 blur-[150px] transition-colors duration-700" aria-hidden />
      <Container className="relative grid items-center gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div>
          <SectionHead eyebrow={c.brand.eyebrow} title={c.brand.title} sub={c.brand.sub} />
          <ul className="reveal mt-8 space-y-3.5">
            {c.brand.points.map((p) => (
              <li key={p} className="flex gap-3 text-[1.02rem] font-medium leading-snug">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-hg-accent/15 text-hg-accent transition-colors duration-500"><Check className="size-4" strokeWidth={3} aria-hidden /></span>
                {p}
              </li>
            ))}
          </ul>
          <div className="hg-card reveal mt-10 p-6">
            <p className="flex items-center gap-2.5 text-lg font-bold"><Globe className="size-5 text-hg-accent" aria-hidden /> {c.brand.webTitle}</p>
            <p className="mt-2 leading-relaxed text-hg-muted">{c.brand.webText}</p>
          </div>
        </div>

        <div className="reveal">
          <p className="text-center text-sm font-semibold text-hg-muted">{c.brand.pick}</p>
          <div role="tablist" aria-label={c.brand.pick} className="mx-auto mt-3 flex max-w-xl flex-wrap justify-center gap-2">
            {BRANDS.map((b) => (
              <button
                key={b.key}
                type="button"
                role="tab"
                aria-selected={brand.key === b.key}
                onClick={() => setBrand(b)}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-bold transition-colors",
                  brand.key === b.key ? "border-hg-fg bg-hg-fg text-hg-ink" : "border-hg-fg/15 text-hg-fg/75 hover:border-hg-fg/40",
                )}
              >
                <span className="size-2.5 rounded-full" style={{ background: `rgb(${b.accent})` }} aria-hidden />
                {b.name}
              </button>
            ))}
          </div>
          <div className="relative mx-auto mt-10 flex max-w-[560px] items-start justify-center gap-4 sm:gap-6">
            <figure className="w-[46%] max-w-[250px]">
              <PhoneShot key={home} src={appShot(home)} alt={`${c.brand.phoneHome} · ${brand.name}`} className="w-full animate-in fade-in duration-500" />
              <figcaption className="mt-3 text-center text-xs font-semibold text-hg-muted">{c.brand.phoneHome}</figcaption>
            </figure>
            <figure className="mt-12 w-[46%] max-w-[250px]">
              <PhoneShot key={access} src={appShot(access)} alt={`${c.brand.phoneAccess} · ${brand.name}`} className="w-full animate-in fade-in duration-500" />
              <figcaption className="mt-3 text-center text-xs font-semibold text-hg-muted">{c.brand.phoneAccess}</figcaption>
            </figure>
          </div>
          <p className="mt-5 text-center text-xs text-hg-muted">{c.brand.examplesNote}</p>
        </div>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------- Process */

function Process() {
  const c = useGymCopy();
  return (
    <section id="como-trabajamos" className="border-y border-hg-line bg-hg-deep py-20 md:py-28">
      <Container>
        <SectionHead eyebrow={c.process.eyebrow} title={c.process.title} sub={c.process.sub} />
        <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-hg-line bg-hg-line sm:grid-cols-2 lg:grid-cols-3">
          {c.process.steps.map((s, i) => (
            <li key={s.title} className="reveal relative bg-hg-deep p-7 lg:p-8" style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
              <span className="hg-display text-[3.4rem] text-transparent [-webkit-text-stroke:1.5px_rgb(var(--hg-accent))]">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 text-xl font-bold">{s.title}</h3>
              <p className="mt-2 leading-relaxed text-hg-muted">{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- Access */

function Access() {
  const c = useGymCopy();
  const icons = [QrCode, ScanFace, Nfc, DoorOpen, ScanLine, BellRing];
  return (
    <section id="acceso" className="hg-grain relative isolate overflow-hidden py-20 md:py-28">
      <img src={`${GYM_MEDIA}/sala.webp`} alt="" aria-hidden loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(var(--hg-bg))_0%,rgb(var(--hg-bg)/0.82)_30%,rgb(var(--hg-bg)/0.9)_70%,rgb(var(--hg-bg))_100%)]" aria-hidden />
      <Container className="grid items-center gap-14 lg:grid-cols-[1.35fr_1fr]">
        <div>
          <SectionHead eyebrow={c.access.eyebrow} title={c.access.title} sub={c.access.sub} />
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:gap-4">
            {c.access.options.map((o, i) => {
              const Icon = icons[i];
              return (
                <div key={o.title} className="hg-card reveal flex gap-4 p-5" style={{ transitionDelay: `${(i % 2) * 70}ms` }}>
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-hg-accent/[0.12] text-hg-accent"><Icon className="size-5" aria-hidden /></span>
                  <div>
                    <h3 className="font-bold">{o.title}</h3>
                    <p className="mt-1 text-[0.93rem] leading-relaxed text-hg-muted">{o.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="reveal mt-6 flex gap-3 rounded-xl border border-dashed border-hg-fg/20 p-4 text-[0.95rem] leading-relaxed text-hg-fg/80">
            <Lightbulb className="mt-0.5 size-5 shrink-0 text-hg-accent" aria-hidden /> {c.access.note}
          </p>
        </div>
        <div className="reveal relative mx-auto flex w-full max-w-md justify-center gap-4">
          <PhoneShot src={appShot("socio-acceso")} alt={c.brand.phoneAccess} className="w-[48%]" />
          <PhoneShot src={appShot("panel-movil-admin-sensor")} alt={c.control.tabs[2].title} className="mt-16 w-[48%]" />
        </div>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------- Control */

const CONTROL_SHOTS = ["tableta-admin-accesos", "tableta-admin-presencia", "tableta-admin-sensor", "tableta-admin-pagos", "tableta-admin-employees"];
const CONTROL_ICONS = [DoorOpen, Users, ScanLine, Gauge, ShieldCheck];

function Control() {
  const c = useGymCopy();
  const [tab, setTab] = useState(0);
  return (
    <section id="control" className="border-y border-hg-line bg-hg-deep py-20 md:py-28">
      <Container>
        <SectionHead eyebrow={c.control.eyebrow} title={c.control.title} sub={c.control.sub} />
        <div className="mt-12 grid items-start gap-10 lg:mt-16 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div role="tablist" aria-label={c.control.title} className="hg-strip -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:gap-3 lg:overflow-visible lg:px-0">
            {c.control.tabs.map((t, i) => {
              const Icon = CONTROL_ICONS[i];
              const active = tab === i;
              return (
                <button
                  key={t.label}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(i)}
                  className={cn(
                    "shrink-0 rounded-2xl border text-left transition-colors lg:w-full lg:p-5",
                    "px-4 py-2.5",
                    active ? "border-hg-accent/60 bg-hg-accent/10" : "border-hg-line bg-hg-surface/60 hover:border-hg-fg/25",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <Icon className={cn("size-5 shrink-0", active ? "text-hg-accent" : "text-hg-muted")} aria-hidden />
                    <span className="text-sm font-bold lg:hidden">{t.label}</span>
                    <span className="hidden text-lg font-bold lg:inline">{t.title}</span>
                  </span>
                  <span className={cn("mt-2 hidden leading-relaxed text-hg-muted lg:block", !active && "lg:hidden")}>{t.text}</span>
                </button>
              );
            })}
          </div>
          <div className="relative">
            <div className="lg:hidden">
              <h3 className="text-xl font-bold">{c.control.tabs[tab].title}</h3>
              <p className="mt-2 leading-relaxed text-hg-muted">{c.control.tabs[tab].text}</p>
            </div>
            <div className="relative mx-auto mt-8 w-full max-w-[460px] lg:mt-0">
              <div className="absolute inset-10 -z-0 rounded-full bg-hg-accent/15 blur-[90px]" aria-hidden />
              <TabletShot key={tab} src={appShot(CONTROL_SHOTS[tab])} alt={c.control.tabs[tab].title} ratio="820 / 1000" className="relative w-full animate-in fade-in duration-500" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* -------------------------------------------------------------- Features */

const FEATURE_SHOTS = ["socio-mi-cuenta-tab-inicio", "socio-mi-cuenta-tab-membresia", "socio-tienda", "socio-clases", "socio-actividades", "socio-mi-cuenta-tab-rutinas", "socio-ocupacion", "socio-pagos"];
const FEATURE_ICONS = [CreditCard, ShoppingBag, CalendarDays, Dumbbell, Gauge, Users, Lightbulb, Tv];

function Features() {
  const c = useGymCopy();
  const strip = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => strip.current?.scrollBy({ left: dir * Math.min(strip.current.clientWidth * 0.8, 560), behavior: "smooth" });
  return (
    <section id="funciones" className="overflow-hidden py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHead eyebrow={c.features.eyebrow} title={c.features.title} sub={c.features.sub} />
          <div className="hidden shrink-0 gap-2 md:flex">
            <button type="button" onClick={() => scroll(-1)} aria-label="‹" className="grid size-12 place-items-center rounded-full border border-hg-fg/20 transition-colors hover:border-hg-fg/50"><ChevronLeft className="size-5" /></button>
            <button type="button" onClick={() => scroll(1)} aria-label="›" className="grid size-12 place-items-center rounded-full border border-hg-fg/20 transition-colors hover:border-hg-fg/50"><ChevronRight className="size-5" /></button>
          </div>
        </div>
      </Container>
      <div
        ref={strip}
        className="hg-strip mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
      >
        {FEATURE_SHOTS.map((s, i) => (
          <figure key={s} className="w-[210px] shrink-0 snap-start sm:w-[240px] lg:w-[250px]">
            <PhoneShot src={appShot(s)} alt={c.features.screens[i]} className="w-full" />
            <figcaption className="mt-4 text-center text-sm font-bold uppercase tracking-[0.12em] text-hg-fg/80">{c.features.screens[i]}</figcaption>
          </figure>
        ))}
      </div>
      <Container>
        <div className="mt-16 grid grid-cols-2 gap-x-5 gap-y-8 sm:gap-x-8 lg:grid-cols-4">
          {c.features.list.map((f, i) => {
            const Icon = FEATURE_ICONS[i];
            return (
              <div key={f.title} className="reveal">
                <Icon className="size-6 text-hg-accent" aria-hidden />
                <h3 className="mt-3 text-base font-bold sm:text-lg">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-hg-muted sm:text-base">{f.text}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ----------------------------------------------------------------- Packs */

function Packs() {
  const c = useGymCopy();
  return (
    <section id="packs" className="border-y border-hg-line bg-hg-deep py-20 md:py-28">
      <Container>
        <SectionHead eyebrow={c.packs.eyebrow} title={c.packs.title} sub={c.packs.sub} center />
        <div className="reveal mx-auto mt-10 max-w-5xl rounded-2xl border border-hg-line bg-hg-surface/60 p-5 text-sm sm:p-6">
          <p className="text-center font-bold uppercase tracking-[0.14em] text-hg-accent">{c.packs.allInclude}</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {c.packs.allIncludeItems.map((it) => (
              <li key={it} className="flex items-start gap-2 font-semibold leading-snug text-hg-fg/85"><Check className="mt-0.5 size-4 shrink-0 text-hg-accent" strokeWidth={3} aria-hidden />{it}</li>
            ))}
          </ul>
        </div>
        <div className="mt-10 grid gap-5 lg:grid-cols-3 lg:items-stretch">
          {c.packs.items.map((p, i) => {
            const rec = i === 1;
            return (
              <article
                key={p.name}
                className={cn(
                  "reveal relative flex flex-col rounded-2xl border p-7 lg:p-8",
                  rec ? "border-hg-accent bg-gradient-to-b from-hg-accent/[0.14] to-hg-surface shadow-[0_30px_70px_-35px_rgb(var(--hg-accent)/0.7)]" : "hg-card",
                )}
              >
                {rec && <span className="absolute -top-3.5 left-7 rounded-full bg-hg-accent px-3.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-hg-ink">{c.packs.recommended}</span>}
                <h3 className="hg-display text-[2.6rem]">{p.name}</h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-hg-muted">{p.tag}</p>
                <ul className="mt-7 flex-1 space-y-3">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[0.97rem] leading-snug"><CheckCircle2 className="mt-0.5 size-[1.1rem] shrink-0 text-hg-accent" aria-hidden />{pt}</li>
                  ))}
                </ul>
                <a href="#contacto" className={cn("hg-btn mt-8 w-full", rec ? "hg-btn--primary" : "hg-btn--ghost")}>{c.packs.cta}</a>
              </article>
            );
          })}
        </div>
        <p className="reveal mx-auto mt-8 max-w-2xl text-center leading-relaxed text-hg-fg/80">{c.packs.note}</p>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------ Case study */

function CaseStudy() {
  const c = useGymCopy();
  return (
    <section id="caso-real" className="py-20 md:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <SectionHead eyebrow={c.caseStudy.eyebrow} title={c.caseStudy.title} />
          <p className="reveal mt-6 text-lg leading-relaxed text-hg-muted">{c.caseStudy.text}</p>
          <ul className="reveal mt-8 space-y-3">
            {c.caseStudy.points.map((p) => (
              <li key={p} className="flex gap-3 font-medium"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-hg-accent" aria-hidden />{p}</li>
            ))}
          </ul>
        </div>
        <div className="reveal relative isolate overflow-hidden rounded-3xl border border-hg-line">
          <img src={`${GYM_MEDIA}/neon.webp`} alt="" aria-hidden loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-45" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-hg-deep via-hg-deep/85 to-hg-deep/40" aria-hidden />
          <div className="flex min-h-[420px] flex-col justify-end p-7 sm:p-10">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-hg-accent px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-hg-ink">
              <span className="size-2 animate-pulse rounded-full bg-hg-ink" aria-hidden /> {c.caseStudy.badge}
            </span>
            <p className="hg-display mt-5 text-4xl sm:text-5xl">{c.caseStudy.place}</p>
            <p className="mt-3 flex items-center gap-2 text-hg-fg/80"><MapPin className="size-4 text-hg-accent" aria-hidden /> {c.caseStudy.address}</p>
            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-lg font-bold">{c.caseStudy.visitTitle}</p>
              <p className="mt-2 leading-relaxed text-hg-fg/75">{c.caseStudy.visitText}</p>
              <a href="#contacto" className="hg-btn hg-btn--primary mt-6">{c.caseStudy.cta} <ArrowRight className="size-5" aria-hidden /></a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ----------------------------------------------------------------- Trust */

function Trust() {
  const c = useGymCopy();
  const icons = [Landmark, Lock, ShieldCheck, Headset];
  return (
    <section className="border-y border-hg-line bg-hg-deep py-16 md:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_2fr] lg:items-center">
          <div className="reveal">
            <p className="hg-eyebrow">{c.trust.eyebrow}</p>
            <h2 className="mt-4 text-4xl sm:text-5xl">{c.trust.title}</h2>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            {c.trust.items.map((it, i) => {
              const Icon = icons[i];
              return (
                <div key={it.title} className="reveal flex gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border border-hg-line bg-hg-surface text-hg-accent"><Icon className="size-5" aria-hidden /></span>
                  <div>
                    <h3 className="font-bold">{it.title}</h3>
                    <p className="mt-1 text-[0.95rem] leading-relaxed text-hg-muted">{it.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------- FAQ */

function Faq() {
  const c = useGymCopy();
  return (
    <section id="preguntas" className="py-20 md:py-28">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHead eyebrow={c.faq.eyebrow} title={c.faq.title} className="lg:sticky lg:top-28 lg:self-start" />
        <Accordion type="single" collapsible className="reveal">
          {c.faq.items.map(([q, a], i) => (
            <AccordionItem key={q} value={`q${i}`} className="border-hg-line">
              <AccordionTrigger className="py-5 text-left text-[1.05rem] font-bold hover:text-hg-accent hover:no-underline">{q}</AccordionTrigger>
              <AccordionContent className="pb-5 text-[0.98rem] leading-relaxed text-hg-muted">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------- Contact */

type Errors = Partial<Record<"nombre" | "gimnasio" | "email" | "telefono", string>>;

function Contact() {
  const c = useGymCopy();
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const err: Errors = {};
    if (v("nombre").length < 2) err.nombre = c.contact.errName;
    if (v("gimnasio").length < 2) err.gimnasio = c.contact.errGym;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) err.email = c.contact.errEmail;
    if (!/^[+\d\s]{9,15}$/.test(v("telefono"))) err.telefono = c.contact.errPhone;
    setErrors(err);
    if (Object.keys(err).length > 0) return;
    setSending(true);
    setFailed(false);
    const ok = await sendEmailAlternative({
      name: v("nombre"),
      email: v("email"),
      phone: v("telefono"),
      company: v("gimnasio"),
      project: "Hispal GYM (visita)",
      budget: "",
      timeline: "",
      description: v("mensaje") || c.contact.defaultMessage,
      newsletter: false,
    });
    setSending(false);
    if (ok) setSent(true);
    else setFailed(true);
  };

  const field = (id: keyof Errors, label: string, type = "text", auto?: string) => (
    <div>
      <Label htmlFor={id} className="text-sm font-semibold text-hg-fg/85">{label}</Label>
      <Input
        id={id}
        name={id}
        type={type}
        autoComplete={auto}
        aria-invalid={!!errors[id]}
        aria-describedby={errors[id] ? `${id}-err` : undefined}
        className="mt-1.5 h-12 rounded-xl border-hg-line bg-hg-bg text-base text-hg-fg placeholder:text-hg-muted focus-visible:ring-hg-accent"
      />
      {errors[id] && <p id={`${id}-err`} className="mt-1.5 text-xs text-destructive">{errors[id]}</p>}
    </div>
  );

  return (
    <section id="contacto" className="hg-grain relative isolate overflow-hidden border-t border-hg-line py-20 md:py-28">
      <img src={`${GYM_MEDIA}/poleas.webp`} alt="" aria-hidden loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover opacity-25" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(var(--hg-deep))_0%,rgb(var(--hg-deep)/0.9)_50%,rgb(var(--hg-deep)/0.75)_100%)]" aria-hidden />
      <Container className="grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="reveal">
          <p className="hg-eyebrow">{c.contact.eyebrow}</p>
          <h2 className="mt-4 text-[2.8rem] sm:text-6xl lg:text-7xl">{c.contact.title}</h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-hg-fg/80">{c.contact.sub}</p>
          <ul className="mt-8 space-y-3.5">
            {c.contact.points.map((p) => (
              <li key={p} className="flex items-center gap-3 font-semibold">
                <span className="grid size-6 place-items-center rounded-full bg-hg-accent text-hg-ink"><Check className="size-4" strokeWidth={3} aria-hidden /></span>
                {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="hg-card reveal p-6 sm:p-8">
          {sent ? (
            <div role="status" className="py-12 text-center">
              <CheckCircle2 className="mx-auto size-14 text-hg-accent" aria-hidden />
              <h3 className="mt-5 text-2xl font-bold">{c.contact.sentTitle}</h3>
              <p className="mt-2 text-hg-muted">{c.contact.sentText}</p>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">{field("nombre", c.contact.name, "text", "name")}{field("gimnasio", c.contact.gym, "text", "organization")}</div>
              <div className="grid gap-4 sm:grid-cols-2">{field("email", c.contact.email, "email", "email")}{field("telefono", c.contact.phone, "tel", "tel")}</div>
              <div>
                <Label htmlFor="mensaje" className="text-sm font-semibold text-hg-fg/85">{c.contact.message}</Label>
                <Textarea id="mensaje" name="mensaje" rows={4} className="mt-1.5 rounded-xl border-hg-line bg-hg-bg text-base text-hg-fg focus-visible:ring-hg-accent" />
              </div>
              {failed && <p role="alert" className="text-sm text-destructive">{c.contact.failed}</p>}
              <button type="submit" disabled={sending} className="hg-btn hg-btn--primary w-full disabled:opacity-60">
                {sending ? c.contact.sending : c.contact.send}
              </button>
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}
