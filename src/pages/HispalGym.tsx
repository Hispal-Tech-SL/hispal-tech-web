import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  ArrowRight, BellRing, Camera, Check, CheckCircle2, ChevronDown, ChevronLeft, ChevronRight, CreditCard, CalendarDays, DoorOpen, Dumbbell,
  Eye, FileCheck2, Gauge, Globe, HeartHandshake, Landmark, Lightbulb, Lock, LogOut, MapPin, Nfc, PackageCheck, Play, QrCode, Ruler,
  Satellite, ScanFace, ScanLine, ShieldCheck, ShoppingBag, Siren, Tv, UserPlus, Users, Wallet, Wrench, Phone as PhoneIcon,
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

/** A visible photo (licensed stock footage still) with the soft bottom shade of the app's photos. */
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
        <PromiseBand />
        <Process />
        <Included />
        <Difference />
        <Features />
        <Brand />
        <Packs />
        <CaseStudy />
        <Trust />
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
      <Container className="grid grid-cols-1 items-center gap-12 pb-14 pt-28 sm:pt-32 lg:min-h-[100svh] lg:grid-cols-[1fr_1.02fr] lg:gap-14 lg:pb-24">
        <div className="relative z-10 min-w-0">
          <p className="inline-flex items-center gap-2 rounded-full border border-hg-fg/15 bg-hg-fg/[0.04] px-3.5 py-1.5 text-[0.7rem] font-bold uppercase tracking-[0.1em] text-hg-fg/85 sm:text-[0.8rem] sm:tracking-[0.14em]">
            <span className="size-1.5 rounded-full bg-hg-accent" aria-hidden />
            {c.hero.eyebrow}
          </p>
          <h1 className="mt-6 text-[3.3rem] leading-[0.9] sm:text-[4.8rem] lg:text-[5.1rem] xl:text-[6rem]">
            <span className="block">{c.hero.title1}</span>
            <span className="block text-hg-accent">{c.hero.title2}</span>
          </h1>
          <p className="mt-6 max-w-[34rem] text-[1.08rem] leading-relaxed text-hg-fg/75 sm:text-[1.2rem]">{c.hero.lead}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#contacto" className="hg-btn hg-btn--primary">{c.hero.ctaPrimary} <ArrowRight className="size-5" aria-hidden /></a>
            <a href={HISPALGYM_DEMO_URL} className="hg-btn hg-btn--ghost"><Play className="size-4" aria-hidden /> {c.hero.ctaDemo}</a>
          </div>
          <ul className="mt-9 flex flex-col gap-3 border-t border-hg-fg/10 pt-7 sm:flex-row sm:flex-wrap sm:gap-x-7">
            {c.hero.proof.map((p) => (
              <li key={p} className="flex items-center gap-2.5 text-sm font-semibold text-hg-fg/85">
                <CheckCircle2 className="size-[1.1rem] shrink-0 text-hg-accent" aria-hidden />
                {p}
              </li>
            ))}
          </ul>
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
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/5 to-black/20" aria-hidden />
            <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-white/15 bg-black/45 py-2 pl-2 pr-4 backdrop-blur-md sm:bottom-5 sm:left-5 lg:bottom-auto lg:left-auto lg:right-5 lg:top-5">
              <span className="grid size-9 place-items-center rounded-xl bg-hg-accent text-hg-ink"><DoorOpen className="size-5" aria-hidden /></span>
              <span className="leading-tight">
                <span className="block text-sm font-bold text-white">{c.hero.panelTag}</span>
                <span className="block text-xs text-white/70">{c.hero.panelTagSub}</span>
              </span>
            </div>
          </div>
          <PhoneShot
            src={appShot("socio-acceso")}
            alt={c.hero.phoneAlt}
            eager
            className="absolute -bottom-2 right-3 w-[132px] sm:right-8 sm:w-[190px] lg:-bottom-12 lg:-left-10 lg:right-auto lg:w-[215px]"
          />
        </div>
      </Container>
      <a href="#cercania" className="group absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-hg-fg/55 transition-colors hover:text-hg-fg lg:flex">
        {c.hero.scroll}
        <ChevronDown className="size-5 animate-bounce motion-reduce:animate-none" aria-hidden />
      </a>
    </section>
  );
}

/* --------------------------------------------------------------- Promise */

function PromiseBand() {
  const c = useGymCopy();
  const icons = [PhoneIcon, Wrench, Eye];
  return (
    <section id="cercania" className="relative py-20 md:py-28">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        <div className="reveal min-w-0">
          <HeartHandshake className="size-9 text-hg-accent" aria-hidden />
          <p className="hg-display mt-6 text-[2.6rem] text-hg-fg sm:text-[3.6rem] lg:text-[4.2rem]">{c.promise.quote}</p>
          <p className="mt-6 max-w-2xl text-[1.07rem] leading-relaxed text-hg-muted sm:text-lg">{c.promise.text}</p>
        </div>
        <Photo name="estiramientos" className="reveal aspect-[4/3]" position="40% 60%" />
      </Container>
      <Container className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-3 lg:gap-5">
        {c.promise.pillars.map((p, i) => {
          const Icon = icons[i];
          return (
            <div key={p.title} className="hg-card reveal p-6" style={{ transitionDelay: `${i * 70}ms` }}>
              <Icon className="size-6 text-hg-accent" aria-hidden />
              <h3 className="mt-4 text-lg font-bold">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-hg-muted">{p.text}</p>
            </div>
          );
        })}
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
        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="reveal hidden lg:block">
            <Photo name="sala" alt={c.process.photoAlt} className="sticky top-28 aspect-[4/5]" position="38% 50%" />
          </div>
          <ol className="min-w-0">
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

/* -------------------------------------------------------------- Included */

function Included() {
  const c = useGymCopy();
  const icons = [Ruler, QrCode, Globe, HeartHandshake];
  return (
    <section id="incluido" className="relative py-20 md:py-28">
      <Container>
        <SectionHead eyebrow={c.included.eyebrow} title={c.included.title} sub={c.included.sub} />
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-5">
          {c.included.items.map((it, i) => {
            const Icon = icons[i];
            return (
              <article key={it.title} className="hg-card reveal flex flex-col p-6 lg:p-7" style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="grid size-11 place-items-center rounded-xl bg-hg-accent/[0.12] text-hg-accent"><Icon className="size-5" aria-hidden /></span>
                <h3 className="mt-5 text-lg font-bold leading-snug">{it.title}</h3>
                <p className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="hg-display text-[3.2rem] text-hg-accent">{c.included.zero}</span>
                  <span className="text-sm text-hg-muted">
                    {c.included.estimate} <s className="font-semibold text-hg-fg/70">{it.value}</s>
                  </span>
                </p>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-hg-muted">{it.text}</p>
              </article>
            );
          })}
        </div>
        <p className="reveal mt-6 text-sm text-hg-muted">{c.included.note}</p>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------ Difference */

function Difference() {
  const c = useGymCopy();
  return (
    <section id="diferencia" className="border-y border-hg-line bg-hg-deep py-20 md:py-28">
      <Container>
        <SectionHead eyebrow={c.difference.eyebrow} title={c.difference.title} sub={c.difference.sub} />

        {/* Mobile: one card per topic. */}
        <ul className="mt-12 grid grid-cols-1 gap-4 md:hidden">
          {c.difference.rows.map(([topic, generic, us]) => (
            <li key={topic} className="hg-card reveal overflow-hidden">
              <p className="px-5 pt-5 text-xs font-bold uppercase tracking-[0.14em] text-hg-fg/70">{topic}</p>
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
          <table className="w-full table-fixed text-left">
            <thead>
              <tr className="border-b border-hg-line">
                <th scope="col" className="w-[20%] p-5"><span className="sr-only">{c.difference.colTopic}</span></th>
                <th scope="col" className="w-[37%] p-5 text-xs font-bold uppercase tracking-[0.14em] text-hg-muted">{c.difference.colGeneric}</th>
                <th scope="col" className="w-[43%] bg-hg-accent/10 p-5"><span className="hg-display text-2xl text-hg-accent">{c.difference.colUs}</span></th>
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

/* -------------------------------------------------------------- Features */

const FEATURE_TAB_IDS = ["seguridad", "acceso", "trazabilidad", "tiempo-real", "app-socio"] as const;

function Features() {
  const c = useGymCopy();
  return (
    <section id="funcionalidades" className="py-20 md:py-28">
      <Container>
        <SectionHead eyebrow={c.features.eyebrow} title={c.features.title} sub={c.features.sub} />
      </Container>
      {/* Sub-menu of the features, stuck under the header while reading them. */}
      <div className="sticky top-[72px] z-30 mt-10 border-y border-hg-line bg-hg-bg/90 backdrop-blur-xl">
        <Container>
          <nav aria-label={c.features.eyebrow} className="hg-strip -mx-4 flex gap-2 overflow-x-auto px-4 py-3 sm:mx-0 sm:px-0">
            {c.features.tabs.map((t, i) => (
              <a key={t} href={`#${FEATURE_TAB_IDS[i]}`} className="shrink-0 rounded-full border border-hg-fg/15 px-4 py-2 text-sm font-bold text-hg-fg/80 transition-colors hover:border-hg-accent hover:text-hg-fg">
                {t}
              </a>
            ))}
          </nav>
        </Container>
      </div>
      <Security />
      <AccessOptions />
      <Traceability />
      <LiveControl />
      <MemberApp />
    </section>
  );
}

function FeatureBlock({ id, children, className }: { id: string; children: ReactNode; className?: string }) {
  return (
    <div id={id} className={cn("pt-16 md:pt-24", className)}>
      <Container>{children}</Container>
    </div>
  );
}

function FeatureTitle({ index, title, text }: { index: number; title: string; text: string }) {
  const c = useGymCopy();
  return (
    <div className="reveal">
      <p className="text-sm font-bold uppercase tracking-[0.16em] text-hg-accent">{c.features.tabs[index]}</p>
      <h3 className="hg-display mt-3 text-[2.3rem] sm:text-[3rem]">{title}</h3>
      <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-hg-muted">{text}</p>
    </div>
  );
}

function Security() {
  const c = useGymCopy();
  const s = c.features.security;
  const icons = [Siren, ShieldCheck, Camera, BellRing, LogOut];
  return (
    <FeatureBlock id="seguridad">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <FeatureTitle index={0} title={s.title} text={s.text} />
          <ul className="reveal mt-8 space-y-3.5">
            {s.points.map((p, i) => {
              const Icon = icons[i];
              return (
                <li key={p} className="flex items-center gap-3.5 font-medium">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-hg-accent/[0.12] text-hg-accent"><Icon className="size-[1.1rem]" aria-hidden /></span>
                  {p}
                </li>
              );
            })}
          </ul>
        </div>
        <div className="reveal relative min-w-0 pb-8">
          <Photo name="neon" className="aspect-[4/3]" position="50% 30%" />
          <PhoneShot src={appShot("panel-movil-admin-sensor")} alt={s.shotAlt} className="absolute -bottom-2 right-3 w-[42%] max-w-[220px] sm:right-6" />
        </div>
      </div>
    </FeatureBlock>
  );
}

function AccessOptions() {
  const c = useGymCopy();
  const a = c.features.access;
  const icons = [QrCode, ScanFace, Nfc, DoorOpen, ScanLine, Lock];
  return (
    <FeatureBlock id="acceso">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div className="min-w-0">
          <FeatureTitle index={1} title={a.title} text={a.text} />
          <Photo name="banca" className="reveal mt-8 hidden aspect-[16/10] lg:block" position="40% 40%" />
        </div>
        <div className="min-w-0">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:gap-4">
            {a.options.map((o, i) => {
              const Icon = icons[i];
              return (
                <div key={o.title} className="hg-card reveal p-5" style={{ transitionDelay: `${(i % 2) * 70}ms` }}>
                  <Icon className="size-6 text-hg-accent" aria-hidden />
                  <h4 className="mt-3 text-[1.05rem] font-bold">{o.title}</h4>
                  <p className="mt-1.5 text-[0.95rem] leading-relaxed text-hg-muted">{o.text}</p>
                </div>
              );
            })}
          </div>
          <p className="reveal mt-4 flex gap-3 rounded-xl border border-dashed border-hg-fg/20 p-4 text-[0.97rem] leading-relaxed text-hg-fg/80">
            <Lightbulb className="mt-0.5 size-5 shrink-0 text-hg-accent" aria-hidden /> {a.note}
          </p>
        </div>
      </div>
    </FeatureBlock>
  );
}

function Traceability() {
  const c = useGymCopy();
  const t = c.features.trace;
  const icons = [Users, Wallet, PackageCheck, UserPlus, Eye];
  return (
    <FeatureBlock id="trazabilidad">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="reveal order-2 mx-auto w-full min-w-0 max-w-[460px] lg:order-1">
          <TabletShot src={appShot("tableta-admin-employees")} alt={t.shotAlt} ratio="820 / 900" className="w-full" />
        </div>
        <div className="order-1 min-w-0 lg:order-2">
          <FeatureTitle index={2} title={t.title} text={t.text} />
          <ul className="reveal mt-8 space-y-3.5">
            {t.points.map((p, i) => {
              const Icon = icons[i];
              return (
                <li key={p} className="flex items-center gap-3.5 font-medium">
                  <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-hg-accent/[0.12] text-hg-accent"><Icon className="size-[1.1rem]" aria-hidden /></span>
                  {p}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </FeatureBlock>
  );
}

const LIVE_SHOTS = ["tableta-admin-accesos", "tableta-admin-presencia", "tableta-admin-sensor", "tableta-admin-pagos"];
const LIVE_ICONS = [DoorOpen, Users, ScanLine, Gauge];

function LiveControl() {
  const c = useGymCopy();
  const l = c.features.live;
  const [tab, setTab] = useState(0);
  return (
    <FeatureBlock id="tiempo-real">
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        <div className="min-w-0">
          <FeatureTitle index={3} title={l.title} text={l.text} />
          <div role="tablist" aria-label={l.title} className="reveal mt-8 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-1">
            {l.tabs.map((t, i) => {
              const Icon = LIVE_ICONS[i];
              const active = tab === i;
              return (
                <button
                  key={t.label}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setTab(i)}
                  className={cn(
                    "rounded-2xl border p-4 text-left transition-colors lg:p-5",
                    active ? "border-hg-accent/60 bg-hg-accent/10" : "border-hg-line bg-hg-surface/60 hover:border-hg-fg/25",
                  )}
                >
                  <span className="flex items-center gap-3">
                    <Icon className={cn("size-5 shrink-0", active ? "text-hg-accent" : "text-hg-muted")} aria-hidden />
                    <span className="font-bold lg:text-lg">{t.title}</span>
                  </span>
                  <span className={cn("mt-2 hidden leading-relaxed text-hg-muted", active && "lg:block")}>{t.text}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-4 leading-relaxed text-hg-muted lg:hidden">{l.tabs[tab].text}</p>
        </div>
        <div className="relative mx-auto w-full min-w-0 max-w-[460px]">
          <TabletShot key={tab} src={appShot(LIVE_SHOTS[tab])} alt={l.tabs[tab].title} ratio="820 / 1000" className="w-full animate-in fade-in duration-500" />
        </div>
      </div>
    </FeatureBlock>
  );
}

const APP_SHOTS = ["socio-mi-cuenta-tab-inicio", "socio-mi-cuenta-tab-membresia", "socio-tienda", "socio-clases", "socio-actividades", "socio-mi-cuenta-tab-rutinas", "socio-ocupacion", "socio-pagos"];
const APP_ICONS = [CreditCard, ShoppingBag, CalendarDays, Dumbbell, Gauge, Users, Lightbulb, Tv];

function MemberApp() {
  const c = useGymCopy();
  const a = c.features.app;
  const strip = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => strip.current?.scrollBy({ left: dir * Math.min(strip.current.clientWidth * 0.8, 560), behavior: "smooth" });
  return (
    <div id="app-socio" className="overflow-hidden pt-16 md:pt-24">
      <Container>
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <FeatureTitle index={4} title={a.title} text={a.text} />
          <div className="hidden shrink-0 gap-2 md:flex">
            <button type="button" onClick={() => scroll(-1)} aria-label="Anterior" className="grid size-12 place-items-center rounded-full border border-hg-fg/20 transition-colors hover:border-hg-fg/50"><ChevronLeft className="size-5" /></button>
            <button type="button" onClick={() => scroll(1)} aria-label="Siguiente" className="grid size-12 place-items-center rounded-full border border-hg-fg/20 transition-colors hover:border-hg-fg/50"><ChevronRight className="size-5" /></button>
          </div>
        </div>
      </Container>
      <div ref={strip} className="hg-strip mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:px-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        {APP_SHOTS.map((s, i) => (
          <figure key={s} className="w-[200px] shrink-0 snap-start sm:w-[230px] lg:w-[245px]">
            <PhoneShot src={appShot(s)} alt={a.screens[i]} className="w-full" />
            <figcaption className="mt-4 text-center text-sm font-bold uppercase tracking-[0.12em] text-hg-fg/80">{a.screens[i]}</figcaption>
          </figure>
        ))}
      </div>
      <Container>
        <div className="mt-14 grid grid-cols-1 gap-x-8 gap-y-8 min-[480px]:grid-cols-2 lg:grid-cols-4">
          {a.list.map((f, i) => {
            const Icon = APP_ICONS[i];
            return (
              <div key={f.title} className="reveal">
                <Icon className="size-6 text-hg-accent" aria-hidden />
                <h4 className="mt-3 text-[1.05rem] font-bold">{f.title}</h4>
                <p className="mt-1.5 text-[0.95rem] leading-relaxed text-hg-muted">{f.text}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
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
    <section id="tu-marca" className="border-y border-hg-line bg-hg-deep py-20 md:py-28">
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
            <p className="mt-3 leading-relaxed text-hg-muted">{c.brand.webText}</p>
            <CheckList items={c.brand.webPoints} className="mt-6" />
          </div>
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
        <div className="hg-card reveal mt-6 flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:p-7">
          <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-hg-accent/[0.12] text-hg-accent"><Satellite className="size-7" aria-hidden /></span>
          <div className="min-w-0">
            <h3 className="text-lg font-bold">{c.packs.starlinkTitle}</h3>
            <p className="mt-1.5 leading-relaxed text-hg-muted">{c.packs.starlinkText}</p>
          </div>
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
    <section id="caso-real" className="border-y border-hg-line bg-hg-deep py-20 md:py-28">
      <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="min-w-0">
          <SectionHead eyebrow={c.caseStudy.eyebrow} title={c.caseStudy.title} />
          <p className="reveal mt-6 text-[1.07rem] leading-relaxed text-hg-muted sm:text-lg">{c.caseStudy.text}</p>
          <CheckList items={c.caseStudy.points} className="reveal mt-8" />
        </div>
        <div className="reveal relative isolate min-w-0 overflow-hidden rounded-3xl border border-white/10">
          <img src={`${GYM_MEDIA}/cinta.webp`} alt="" aria-hidden loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" style={{ objectPosition: "30% 40%" }} />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-hg-deep via-hg-deep/80 to-hg-deep/10" aria-hidden />
          <div className="flex min-h-[460px] flex-col justify-end p-7 sm:p-10">
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

/* ----------------------------------------------------------------- Trust */

function Trust() {
  const c = useGymCopy();
  const icons = [Landmark, Lock, ShieldCheck, HeartHandshake];
  return (
    <section className="py-16 md:py-24">
      <Container className="grid grid-cols-1 gap-10 lg:grid-cols-[0.9fr_2fr] lg:items-center">
        <div className="reveal">
          <p className="hg-eyebrow">{c.trust.eyebrow}</p>
          <h2 className="mt-4 text-[2.3rem] sm:text-5xl">{c.trust.title}</h2>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          {c.trust.items.map((it, i) => {
            const Icon = icons[i];
            return (
              <div key={it.title} className="reveal flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-full border border-hg-line bg-hg-surface text-hg-accent"><Icon className="size-5" aria-hidden /></span>
                <div className="min-w-0">
                  <h3 className="font-bold">{it.title}</h3>
                  <p className="mt-1 text-[0.95rem] leading-relaxed text-hg-muted">{it.text}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------- FAQ */

function Faq() {
  const c = useGymCopy();
  return (
    <section id="preguntas" className="border-t border-hg-line bg-hg-deep py-20 md:py-28">
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
    <section className="bg-hg-deep pb-20 md:pb-24">
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
