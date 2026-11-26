import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Menu, Play, X } from "lucide-react";
import { HISPALGYM_DEMO_URL } from "@/constants/hispalgym";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGymCopy } from "@/components/hispalgym/copy";
import { NAVIGATE_EVENT, useActiveSection } from "@/components/hispalgym/scroll";
import { cn } from "@/lib/utils";

/** Sections shown in the menu, in page order. */
const SECTION_IDS = ["inicio", "como-trabajamos", "incluido", "funcionalidades", "tu-marca", "packs", "caso-real"] as const;

function useNavLinks() {
  const c = useGymCopy();
  const labels = [c.nav.home, c.nav.process, c.nav.included, c.nav.features, c.nav.brand, c.nav.packs, c.nav.case];
  return SECTION_IDS.map((id, i) => [labels[i], id] as const);
}

/** The Hispal GYM logo and name, larger and with the condensed italic of the app. */
export function GymBrand({ size = "md" }: { size?: "md" | "lg" }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <img src="/hispalgym/logo.png" alt="" draggable={false} className={cn("shrink-0 object-contain", size === "lg" ? "size-14" : "size-11")} />
      <span className={cn("hg-display leading-none tracking-[0.01em]", size === "lg" ? "text-[2.1rem]" : "text-[1.75rem]")}>
        Hispal <span className="text-hg-accent">GYM</span>
      </span>
    </span>
  );
}

function LanguageToggle({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
  const c = useGymCopy();
  return (
    <div role="group" aria-label={c.nav.language} className={cn("flex items-center rounded-lg border border-hg-fg/15 p-0.5 text-xs font-bold", className)}>
      {(["es", "en"] as const).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLanguage(l)}
          aria-pressed={language === l}
          className={cn("min-w-9 rounded-md px-2 py-1.5 uppercase transition-colors", language === l ? "bg-hg-fg text-hg-ink" : "text-hg-fg/60 hover:text-hg-fg")}
        >
          {l}
        </button>
      ))}
    </div>
  );
}

export function GymHeader() {
  const c = useGymCopy();
  const links = useNavLinks();
  const active = useActiveSection(SECTION_IDS);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const onNavigate = () => setOpen(false);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener(NAVIGATE_EVENT, onNavigate);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener(NAVIGATE_EVENT, onNavigate);
    };
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-300",
          scrolled || open ? "border-b border-hg-fg/10 bg-hg-deep/90 backdrop-blur-xl" : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <a href="#inicio" aria-label="Hispal GYM">
            <GymBrand />
          </a>
          <nav aria-label="Principal" className="hidden items-center gap-1 xl:flex">
            {links.map(([label, id]) => (
              <a
                key={id}
                href={`#${id}`}
                aria-current={active === id ? "true" : undefined}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-[0.92rem] font-semibold transition-colors",
                  active === id ? "text-hg-fg" : "text-hg-fg/60 hover:text-hg-fg",
                )}
              >
                {label}
                <span className={cn("absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-hg-accent transition-opacity", active === id ? "opacity-100" : "opacity-0")} aria-hidden />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <LanguageToggle className="hidden sm:flex" />
            <a href="#contacto" className="hg-btn hg-btn--primary hg-btn--sm hidden sm:inline-flex">{c.nav.cta}</a>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-lg text-hg-fg xl:hidden"
              aria-label={open ? c.nav.menuClose : c.nav.menuOpen}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
          </div>
        </div>
      </header>
      {open && (
        <nav aria-label="Móvil" className="fixed inset-x-0 bottom-0 top-[72px] z-40 overflow-y-auto bg-hg-deep px-6 pb-10 pt-4 text-hg-fg xl:hidden">
          <ul className="divide-y divide-hg-fg/10">
            {links.map(([label, id]) => (
              <li key={id}>
                <a href={`#${id}`} className={cn("hg-display block py-4 text-3xl", active === id && "text-hg-accent")}>{label}</a>
              </li>
            ))}
          </ul>
          <a href="#contacto" className="hg-btn hg-btn--primary mt-8 w-full">{c.nav.cta}</a>
          <a href={HISPALGYM_DEMO_URL} className="hg-btn hg-btn--ghost mt-3 w-full"><Play className="size-4" aria-hidden /> {c.nav.demo}</a>
          <div className="mt-8 flex items-center justify-between gap-4">
            <LanguageToggle />
            <Link to="/#productos" className="flex items-center gap-1.5 text-sm text-hg-fg/60"><ArrowLeft className="size-4" aria-hidden /> {c.nav.backLong}</Link>
          </div>
        </nav>
      )}
    </>
  );
}

export function GymFooter() {
  const c = useGymCopy();
  return (
    <footer className="border-t border-hg-line bg-hg-deep">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr] lg:px-8">
        <div>
          <GymBrand size="lg" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-hg-muted">{c.footer.tagline}</p>
          <p className="mt-4 text-sm font-semibold text-hg-fg/80">{c.footer.maker}</p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-hg-fg">{c.footer.product}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-hg-muted">
            <li><a href="#como-trabajamos" className="hover:text-hg-accent">{c.nav.process}</a></li>
            <li><a href="#incluido" className="hover:text-hg-accent">{c.nav.included}</a></li>
            <li><a href="#funcionalidades" className="hover:text-hg-accent">{c.nav.features}</a></li>
            <li><a href="#packs" className="hover:text-hg-accent">{c.nav.packs}</a></li>
            <li><a href="#preguntas" className="hover:text-hg-accent">{c.nav.faq}</a></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-hg-fg">{c.footer.company}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-hg-muted">
            <li><a href="#contacto" className="hover:text-hg-accent">{c.nav.cta}</a></li>
            <li><a href={HISPALGYM_DEMO_URL} className="hover:text-hg-accent">{c.nav.demo}</a></li>
            <li><Link to="/" className="hover:text-hg-accent">Hispal Network</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-hg-line py-6 text-center text-xs text-hg-muted">
        © {new Date().getFullYear()} {c.footer.rights}
      </div>
    </footer>
  );
}
