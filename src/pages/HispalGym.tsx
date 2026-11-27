import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight, Check, CheckCircle2, ChevronDown, Clock, CreditCard, FileCheck2, Gauge, Globe, MapPin, Play,
  Quote, Satellite, ShieldCheck, Smartphone, TrendingUp, Users,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GymHeader, GymFooter } from "@/components/hispalgym/GymChrome";
import { PhoneShot, TabletShot } from "@/components/hispalgym/Devices";
import { useGymCopy, appShot, GYM_MEDIA } from "@/components/hispalgym/copy";
import { useSmoothAnchors } from "@/components/hispalgym/scroll";
import { sendEmailAlternative } from "@/services/emailService";
import { HISPALGYM_DEMO_URL } from "@/constants/hispalgym";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import "@/components/hispalgym/theme.css";

function useReveal(dep: unknown) {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal:not(.is-visible)");
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: 0.08 });
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
      <h2 className="mt-4 text-[2.5rem] sm:text-[3.4rem] lg:text-[4rem]">{title}</h2>
      {sub && <p className={cn("mt-5 text-[1.07rem] leading-relaxed text-hg-muted sm:text-lg", center && "mx-auto max-w-2xl")}>{sub}</p>}
    </div>
  );
}

/** A visible photo with the soft bottom shade of the app's photos. */
function Photo({ name, alt = "", className, position = "center" }: { name: string; alt?: string; className?: string; position?: string }) {
  return (
    <div className={cn("relative overflow-hidden rounded-3xl border border-white/10 bg-hg-surface", className)}>
      <img src={`${GYM_MEDIA}/${name}.webp`} alt={alt} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: position }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" aria-hidden />
    </div>
  );
}

function CheckList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((p) => (
        <li key={p} className="flex gap-3 text-[1rem] leading-snug text-hg-fg/90">
          <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-hg-accent text-hg-ink"><Check className="size-3.5" strokeWidth={3} aria-hidden /></span>
          {p}
        </li>
      ))}
    </ul>
  );
}

const HispalGym = () => {
  const c = useGymCopy();
  const { language } = useLanguage();
  const [root, setRoot] = useState<HTMLDivElement | null>(null);
  useReveal(language);
  useDocumentMeta(c.meta.title, c.meta.description);
  useSmoothAnchors(root);
  useEffect(() => { if (!window.location.hash) window.scrollTo(0, 0); }, []);

  return (
    <div ref={setRoot} className="hg min-h-screen overflow-x-clip">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-hg-accent focus:px-4 focus:py-2 focus:text-hg-ink">{c.nav.skip}</a>
      <GymHeader />
      <main id="main">
        <Hero />
        <Compete />
        <HowItWorks />
        <WhyUs />
        <Brand />
        <Process />
        <Packs />
        <CaseStudy />
        <Faq />
        <Verifactu />
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
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_85%_30%,rgb(var(--hg-accent)/0.16),transparent_70%),radial-gradient(50%_50%_at_0%_100%,rgb(var(--hg-accent)/0.07),transparent_70%)]" aria-hidden />
      <Container className="grid grid-cols-1 items-center gap-12 pb-14 pt-28 sm:pt-32 lg:min-h-[92svh] lg:grid-cols-[1fr_1.02fr] lg:gap-14 lg:pb-20">
        <div className="relative z-10 min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full border border-hg-fg/15 bg-hg-fg/[0.04] px-3.5 py-1.5 text-[0.75rem] font-bold uppercase tracking-[0.14em] text-hg-fg/85 sm:text-[0.8rem]">
            <span className="size-1.5 rounded-full bg-hg-accent" aria-hidden />
            {c.hero.eyebrow}
          </p>
          <h1 className="mt-6 text-[3.1rem] leading-[0.92] sm:text-[4.4rem] lg:text-[4.2rem] xl:text-[4.7rem]">
            <span className="block">{c.hero.title1}</span>
            <span className="block text-hg-accent">{c.hero.title2}</span>
          </h1>
          <p className="mt-6 max-w-[34rem] text-[1.1rem] leading-relaxed text-hg-fg/75 sm:text-[1.2rem]">{c.hero.lead}</p>
          <p className="mt-3 max-w-[34rem] text-[1.15rem] font-bold leading-snug text-hg-fg sm:text-[1.3rem]">{c.hero.motto}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contacto" className="hg-btn hg-btn--primary">{c.hero.ctaPrimary} <ArrowRight className="size-5" aria-hidden /></a>
            <a href={HISPALGYM_DEMO_URL} className="hg-btn hg-btn--ghost"><Play className="size-4" aria-hidden /> {c.hero.ctaDemo}</a>
          </div>
        </div>

        <div className="relative min-w-0 pb-10 sm:pb-14 lg:pb-0">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-white/10 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.9)]">
            <video
              className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
              src={`${GYM_MEDIA}/hero.mp4`}
              poster={`${GYM_MEDIA}/hero-poster.webp`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
            />
            <img src={`${GYM_MEDIA}/hero-poster.webp`} alt="" aria-hidden className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:block" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" aria-hidden />
          </div>
          <PhoneShot
            src={appShot("socio-acceso")}
            alt={c.hero.phoneAlt}
            eager
            className="absolute -bottom-2 right-3 w-[132px] sm:right-8 sm:w-[190px] lg:-bottom-12 lg:-left-10 lg:right-auto lg:w-[215px]"
          />
        </div>
      </Container>
    </section>
  );
}

/* --------------------------------------------------------------- Compete */

function Compete() {
  const c = useGymCopy();
  const icons = [Clock, TrendingUp, Users];
  return (
    <section aria-labelledby="compite" className="border-b border-hg-line bg-hg-deep pb-16 md:pb-20">
      <Container>
        <div className="hg-card reveal p-6 sm:p-8 lg:p-10">
          <h2 id="compite" className="text-[2.2rem] sm:text-[2.8rem]">{c.compete.title}</h2>
          <ol className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            {c.compete.steps.map((s, i) => {
              const Icon = icons[i];
              return (
                <li key={s.title} className="flex gap-4 md:flex-col md:gap-3">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-hg-accent text-hg-ink"><Icon className="size-6" aria-hidden /></span>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-[0.16em] text-hg-accent">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="mt-1 text-xl font-bold">{s.title}</h3>
                    <p className="mt-1.5 leading-relaxed text-hg-muted">{s.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
      <a href="#como-funciona" className="mx-auto mt-10 hidden w-fit flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-hg-fg/55 transition-colors hover:text-hg-fg lg:flex">
        {c.hero.scroll}
        <ChevronDown className="size-5 animate-bounce motion-reduce:animate-none" aria-hidden />
      </a>
    </section>
  );
}

/* ---------------------------------------------------------- How it works */

const HOW_ICONS = [Smartphone, CreditCard, Gauge, ShieldCheck];

function HowItWorks() {
  const c = useGymCopy();
  const h = c.how;
  const visuals: ReactNode[] = [
    <PhoneShot key="0" src={appShot("socio-acceso")} alt={h.rows[0].alt} className="w-[62%] max-w-[250px]" />,
    <PhoneShot key="1" src={appShot("socio-mi-cuenta-tab-membresia")} alt={h.rows[1].alt} className="w-[62%] max-w-[250px]" />,
    <TabletShot key="2" src={appShot("tableta-admin-pagos")} alt={h.rows[2].alt} ratio="820 / 1000" className="w-[90%] max-w-[420px]" />,
    <PhoneShot key="3" src={appShot("panel-movil-admin-sensor")} alt={h.rows[3].alt} className="w-[62%] max-w-[250px]" />,
  ];
  return (
    <section id="como-funciona" className="py-20 md:py-28">
      <Container>
        <SectionHead eyebrow={h.eyebrow} title={h.title} sub={h.sub} />
        <div className="mt-14 space-y-16 md:space-y-24">
          {h.rows.map((r, i) => {
            const Icon = HOW_ICONS[i];
            const reverse = i % 2 === 1;
            return (
              <div key={r.title} className="reveal grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <div className={cn("min-w-0", reverse && "lg:order-2")}>
                  <span className="grid size-12 place-items-center rounded-xl bg-hg-accent/[0.12] text-hg-accent"><Icon className="size-6" aria-hidden /></span>
                  <h3 className="hg-display mt-5 text-[2.2rem] sm:text-[2.8rem]">{r.title}</h3>
                  <p className="mt-4 max-w-xl text-[1.07rem] leading-relaxed text-hg-muted">{r.text}</p>
                  {i === 0 && (
                    <ul className="mt-6 flex flex-wrap gap-2">
                      {h.chips.map((chip) => (
                        <li key={chip} className="rounded-full border border-hg-fg/15 px-3.5 py-1.5 text-sm font-semibold text-hg-fg/85">{chip}</li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className={cn("relative flex min-w-0 justify-center rounded-3xl border border-hg-line bg-hg-surface/50 px-4 py-10 sm:py-12", reverse && "lg:order-1")}>
                  <div className="absolute inset-12 -z-0 rounded-full bg-hg-accent/10 blur-[80px]" aria-hidden />
                  <div className="relative flex w-full justify-center">{visuals[i]}</div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="reveal mt-16 rounded-2xl border border-dashed border-hg-fg/20 p-5 text-center text-[1.05rem] font-semibold text-hg-fg/85">{h.more}</p>
      </Container>
    </section>
  );
}

/* ---------------------------------------------------------------- Why us */

function WhyUs() {
  const c = useGymCopy();
  const w = c.why;
  return (
    <section id="por-que-nosotros" className="border-y border-hg-line bg-hg-deep py-20 md:py-28">
      <Container>
        <SectionHead eyebrow={w.eyebrow} title={w.title} sub={w.sub} />

        {/* Mobile: one card per topic. */}
        <ul className="mt-12 grid grid-cols-1 gap-4 md:hidden">
          {w.rows.map(([topic, generic, us]) => (
            <li key={topic} className="hg-card reveal overflow-hidden">
              <p className="px-5 pt-5 text-xs font-bold uppercase tracking-[0.14em] text-hg-fg/70">{topic}</p>
              <div className="mx-3 mt-3 rounded-xl border border-hg-accent/40 bg-hg-accent/10 p-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-hg-accent">{w.colUs}</p>
                <p className="mt-1.5 flex gap-2 font-semibold leading-snug"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-hg-accent" aria-hidden />{us}</p>
              </div>
              <div className="px-5 pb-5 pt-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-hg-muted">{w.colGeneric}</p>
                <p className="mt-1.5 text-sm leading-snug text-hg-muted">{generic}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Tablet and desktop: a comparison table. */}
        <div className="hg-card reveal mt-14 hidden overflow-hidden md:block">
          <table className="w-full table-fixed text-left">
            <thead>
              <tr className="border-b border-hg-line">
                <th scope="col" className="w-[22%] p-5"><span className="sr-only">{w.colTopic}</span></th>
                <th scope="col" className="w-[35%] p-5 text-xs font-bold uppercase tracking-[0.14em] text-hg-muted">{w.colGeneric}</th>
                <th scope="col" className="w-[43%] bg-hg-accent/10 p-5"><span className="hg-display text-2xl text-hg-accent">{w.colUs}</span></th>
              </tr>
            </thead>
            <tbody>
              {w.rows.map(([topic, generic, us]) => (
                <tr key={topic} className="border-b border-hg-line last:border-0">
                  <th scope="row" className="p-5 align-top text-sm font-bold uppercase tracking-[0.08em] text-hg-fg">{topic}</th>
                  <td className="p-5 align-top text-[0.97rem] leading-relaxed text-hg-muted">{generic}</td>
                  <td className="bg-hg-accent/[0.06] p-5 align-top">
                    <span className="flex gap-3 font-semibold leading-relaxed"><CheckCircle2 className="mt-1 size-5 shrink-0 text-hg-accent" aria-hidden />{us}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="reveal mt-6 rounded-2xl border border-hg-line bg-hg-surface/60 p-5 sm:p-6">
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-hg-accent">{w.includedTitle}</p>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {w.included.map((it) => (
              <li key={it} className="flex items-start gap-2 font-semibold leading-snug text-hg-fg/90"><Check className="mt-0.5 size-4 shrink-0 text-hg-accent" strokeWidth={3} aria-hidden />{it}</li>
            ))}
          </ul>
        </div>

        <figure className="reveal mx-auto mt-14 max-w-3xl text-center">
          <Quote className="mx-auto size-8 text-hg-accent" aria-hidden />
          <blockquote className="hg-display mt-4 text-[2.3rem] sm:text-[3.2rem]">{w.quote}</blockquote>
        </figure>
      </Container>
    </section>
  );
}

/* ----------------------------------------------------------------- Brand */

/** Made-up gyms used to show the app under another brand (screenshots from a local build of the demo). */
const EXAMPLE_GYMS = [
  { key: "nortebox", name: "Norte Box", colorName: { es: "Rojo", en: "Red" }, hex: "#e63946" },
  { key: "distritofit", name: "Distrito Fit", colorName: { es: "Verde", en: "Green" }, hex: "#2bb673" },
  { key: "atlasclub", name: "Atlas Club", colorName: { es: "Dorado", en: "Gold" }, hex: "#d9a441" },
] as const;

function Brand() {
  const c = useGymCopy();
  const { language } = useLanguage();
  const [gym, setGym] = useState<(typeof EXAMPLE_GYMS)[number]>(EXAMPLE_GYMS[0]);
  return (
    <section id="tu-marca" className="py-20 md:py-28">
      <Container>
        <SectionHead eyebrow={c.brand.eyebrow} title={c.brand.title} sub={c.brand.sub} />

        <div className="hg-card reveal mt-12 grid grid-cols-1 items-center gap-10 overflow-hidden p-5 sm:p-8 lg:mt-16 lg:grid-cols-[1fr_1.1fr] lg:gap-12 lg:p-12">
          <div className="min-w-0">
            <h3 className="text-2xl font-bold sm:text-[1.7rem]">{c.brand.examplesTitle}</h3>
            <p className="mt-3 leading-relaxed text-hg-muted">{c.brand.examplesText}</p>
            <div role="radiogroup" aria-label={c.brand.examplesTitle} className="mt-7 grid grid-cols-1 gap-3">
              {EXAMPLE_GYMS.map((g) => {
                const active = g.key === gym.key;
                return (
                  <button
                    key={g.key}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setGym(g)}
                    className={cn(
                      "flex items-center gap-4 rounded-2xl border p-3.5 text-left transition-colors",
                      active ? "border-hg-fg/70 bg-hg-fg/[0.06]" : "border-hg-line hover:border-hg-fg/30",
                    )}
                  >
                    <img src={`${GYM_MEDIA}/marcas/${g.key}.png`} alt="" className="size-12 shrink-0 rounded-xl bg-hg-bg object-contain p-1" />
                    <span className="min-w-0 flex-1">
                      <span className="block font-bold">{g.name}</span>
                      <span className="block text-sm text-hg-muted">{c.brand.examplesBrand}</span>
                    </span>
                    <span className="flex items-center gap-2 text-sm text-hg-muted">
                      <span className="size-4 rounded-full ring-2 ring-white/10" style={{ background: g.hex }} aria-hidden />
                      <span className="hidden sm:inline">{g.colorName[language]}</span>
                    </span>
                    <span className={cn("grid size-5 shrink-0 place-items-center rounded-full border", active ? "border-hg-fg bg-hg-fg text-hg-ink" : "border-hg-fg/30")} aria-hidden>
                      {active && <Check className="size-3.5" strokeWidth={3} />}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="flex min-w-0 items-start justify-center gap-4 sm:gap-6">
            <figure className="w-[46%] max-w-[240px]">
              <PhoneShot key={`h-${gym.key}`} src={appShot(`${gym.key}-mi-cuenta-tab-inicio`)} alt={`${c.brand.phoneHome}, ${gym.name}`} className="w-full animate-in fade-in duration-500" />
              <figcaption className="mt-3 text-center text-xs font-semibold text-hg-muted">{c.brand.phoneHome}</figcaption>
            </figure>
            <figure className="mt-10 w-[46%] max-w-[240px]">
              <PhoneShot key={`a-${gym.key}`} src={appShot(`${gym.key}-acceso`)} alt={`${c.brand.phoneAccess}, ${gym.name}`} className="w-full animate-in fade-in duration-500" />
              <figcaption className="mt-3 text-center text-xs font-semibold text-hg-muted">{c.brand.phoneAccess}</figcaption>
            </figure>
          </div>
        </div>

        <div className="reveal mt-6 grid grid-cols-1 overflow-hidden rounded-3xl border border-hg-line lg:grid-cols-2">
          <Photo name="prensa" className="aspect-[16/10] rounded-none border-0 lg:aspect-auto" position="50% 40%" />
          <div className="bg-hg-surface p-6 sm:p-10">
            <Globe className="size-7 text-hg-accent" aria-hidden />
            <h3 className="mt-4 text-2xl font-bold sm:text-[1.7rem]">{c.brand.webTitle}</h3>
            <p className="mt-3 text-[1.05rem] leading-relaxed text-hg-muted">{c.brand.webText}</p>
          </div>
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
        <SectionHead eyebrow={c.process.eyebrow} title={c.process.title} />
        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="reveal hidden lg:block">
            <Photo name="sala" alt={c.process.photoAlt} className="aspect-[4/5]" position="38% 50%" />
          </div>
          <ol className="min-w-0 self-center">
            {c.process.steps.map((s, i) => (
              <li key={s.title} className="reveal grid grid-cols-[auto_1fr] gap-x-5 border-b border-hg-line py-7 first:pt-0 last:border-0 sm:gap-x-8">
                <span className="hg-display w-14 text-[2.6rem] text-transparent [-webkit-text-stroke:1.5px_rgb(var(--hg-accent))] sm:w-20 sm:text-[3.4rem]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 pt-1 sm:pt-2">
                  <h3 className="text-xl font-bold sm:text-[1.35rem]">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-hg-muted">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}

/* ----------------------------------------------------------------- Packs */

function Packs() {
  const c = useGymCopy();
  return (
    <section id="packs" className="py-20 md:py-28">
      <Container>
        <SectionHead eyebrow={c.packs.eyebrow} title={c.packs.title} sub={c.packs.sub} center />
        <div className="reveal mx-auto mt-10 max-w-5xl rounded-2xl border border-hg-line bg-hg-surface/60 p-5 sm:p-6">
          <p className="text-center text-sm font-bold uppercase tracking-[0.14em] text-hg-accent">{c.packs.allInclude}</p>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {c.packs.allIncludeItems.map((it) => (
              <li key={it} className="flex items-start gap-2 text-sm font-semibold leading-snug text-hg-fg/85"><Check className="mt-0.5 size-4 shrink-0 text-hg-accent" strokeWidth={3} aria-hidden />{it}</li>
            ))}
          </ul>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:items-stretch">
          {c.packs.items.map((p, i) => {
            const popular = i === 1;
            const recommended = i === 2;
            return (
              <article
                key={p.name}
                className={cn(
                  "reveal relative flex flex-col rounded-2xl border p-7 lg:p-8",
                  recommended ? "border-hg-accent bg-gradient-to-b from-hg-accent/[0.14] to-hg-surface shadow-[0_30px_70px_-35px_rgb(var(--hg-accent)/0.7)]" : "hg-card",
                )}
              >
                {recommended && <span className="absolute -top-3.5 left-7 rounded-full bg-hg-accent px-3.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-hg-ink">{c.packs.recommended}</span>}
                {popular && <span className="absolute -top-3.5 left-7 rounded-full border border-hg-fg/25 bg-hg-surface2 px-3.5 py-1 text-xs font-bold uppercase tracking-[0.12em] text-hg-fg">{c.packs.popular}</span>}
                <h3 className="hg-display text-[2.6rem]">{p.name}</h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.12em] text-hg-muted">{p.tag}</p>
                <p className={cn("mt-4 leading-relaxed", recommended ? "font-semibold text-hg-fg" : "text-hg-muted")}>{p.text}</p>
                <ul className="mt-6 flex-1 space-y-3 border-t border-hg-line pt-6">
                  {p.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[0.97rem] leading-snug"><CheckCircle2 className="mt-0.5 size-[1.1rem] shrink-0 text-hg-accent" aria-hidden />{pt}</li>
                  ))}
                </ul>
                <a href="#contacto" className={cn("hg-btn mt-8 w-full", recommended ? "hg-btn--primary" : "hg-btn--ghost")}>{c.packs.cta}</a>
              </article>
            );
          })}
        </div>
        <p className="reveal mt-6 flex items-start gap-3 rounded-2xl border border-dashed border-hg-fg/20 p-5 leading-relaxed text-hg-fg/85">
          <Satellite className="mt-0.5 size-5 shrink-0 text-hg-accent" aria-hidden /> {c.packs.starlink}
        </p>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------ Case study */

function CaseStudy() {
  const c = useGymCopy();
  return (
    <section id="caso-real" className="border-y border-hg-line bg-hg-deep py-20 md:py-28">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <SectionHead eyebrow={c.caseStudy.eyebrow} title={c.caseStudy.title} />
          <p className="reveal mt-6 text-[1.07rem] leading-relaxed text-hg-muted sm:text-lg">{c.caseStudy.text}</p>
          <p className="reveal mt-5 flex items-start gap-3 font-semibold leading-relaxed text-hg-fg/90">
            <Clock className="mt-0.5 size-5 shrink-0 text-hg-accent" aria-hidden /> {c.caseStudy.hours}
          </p>
        </div>
        <div className="reveal relative isolate min-w-0 overflow-hidden rounded-3xl border border-white/10">
          <img src={`${GYM_MEDIA}/cinta.webp`} alt="" aria-hidden loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" style={{ objectPosition: "30% 40%" }} />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-hg-deep via-hg-deep/80 to-hg-deep/10" aria-hidden />
          <div className="flex min-h-[420px] flex-col justify-end p-7 sm:p-10">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-hg-accent px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-hg-ink">
              <span className="size-2 animate-pulse rounded-full bg-hg-ink motion-reduce:animate-none" aria-hidden /> {c.caseStudy.badge}
            </span>
            <p className="hg-display mt-5 text-4xl sm:text-5xl">{c.caseStudy.place}</p>
            <p className="mt-3 flex items-center gap-2 text-hg-fg/85"><MapPin className="size-4 shrink-0 text-hg-accent" aria-hidden /> {c.caseStudy.address}</p>
            <div className="mt-8 border-t border-white/15 pt-6">
              <p className="text-lg font-bold">{c.caseStudy.visitTitle}</p>
              <p className="mt-2 leading-relaxed text-hg-fg/80">{c.caseStudy.visitText}</p>
              <a href="#contacto" className="hg-btn hg-btn--primary mt-6">{c.caseStudy.cta} <ArrowRight className="size-5" aria-hidden /></a>
            </div>
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
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHead eyebrow={c.faq.eyebrow} title={c.faq.title} className="lg:sticky lg:top-28 lg:self-start" />
        <Accordion type="single" collapsible className="reveal min-w-0">
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

/* ------------------------------------------------------------- Verifactu */

function Verifactu() {
  const c = useGymCopy();
  return (
    <section className="pb-20 md:pb-24">
      <Container>
        <div className="reveal flex flex-col gap-4 rounded-2xl border border-dashed border-hg-fg/20 p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-7">
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-hg-fg/[0.06] text-hg-fg/80"><FileCheck2 className="size-6" aria-hidden /></span>
          <div className="min-w-0">
            <p className="flex flex-wrap items-center gap-3">
              <span className="text-lg font-bold">{c.verifactu.title}</span>
              <span className="rounded-full border border-hg-accent/50 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-hg-accent">{c.verifactu.badge}</span>
            </p>
            <p className="mt-1.5 leading-relaxed text-hg-muted">{c.verifactu.text}</p>
          </div>
        </div>
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
    <div className="min-w-0">
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
    <section id="contacto" className="relative isolate overflow-hidden border-t border-hg-line py-20 md:py-28">
      <img src={`${GYM_MEDIA}/poleas.webp`} alt="" aria-hidden loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" style={{ objectPosition: "70% 30%" }} />
      <div className="absolute inset-0 -z-10 bg-hg-deep/90 lg:bg-transparent lg:bg-[linear-gradient(90deg,rgb(var(--hg-deep))_0%,rgb(var(--hg-deep)/0.92)_45%,rgb(var(--hg-deep)/0.6)_100%)]" aria-hidden />
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="reveal min-w-0">
          <p className="hg-eyebrow">{c.contact.eyebrow}</p>
          <h2 className="mt-4 text-[2.7rem] sm:text-6xl lg:text-7xl">{c.contact.title}</h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-hg-fg/80">{c.contact.sub}</p>
          <CheckList items={c.contact.points} className="mt-8" />
        </div>
        <div className="hg-card reveal min-w-0 p-6 sm:p-8">
          {sent ? (
            <div role="status" className="py-12 text-center">
              <CheckCircle2 className="mx-auto size-14 text-hg-accent" aria-hidden />
              <h3 className="mt-5 text-2xl font-bold">{c.contact.sentTitle}</h3>
              <p className="mt-2 text-hg-muted">{c.contact.sentText}</p>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{field("nombre", c.contact.name, "text", "name")}{field("gimnasio", c.contact.gym, "text", "organization")}</div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">{field("email", c.contact.email, "email", "email")}{field("telefono", c.contact.phone, "tel", "tel")}</div>
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
