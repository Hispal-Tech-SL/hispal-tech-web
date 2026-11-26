import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Menu, Play, X } from "lucide-react";
import { GymLogo } from "@/components/hispalgym/Logo";
import { HISPALGYM_DEMO_URL } from "@/constants/hispalgym";
import { useLanguage } from "@/contexts/LanguageContext";
import { useGymCopy } from "@/components/hispalgym/copy";
import { cn } from "@/lib/utils";

function useNavLinks() {
  const c = useGymCopy();
  return [
    [c.nav.included, "incluido"],
    [c.nav.brand, "tu-marca"],
    [c.nav.access, "acceso"],
    [c.nav.control, "control"],
    [c.nav.packs, "packs"],
    [c.nav.case, "caso-real"],
  ] as const;
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
          className={cn(
            "min-w-9 rounded-md px-2 py-1.5 uppercase transition-colors",
            language === l ? "bg-hg-fg text-hg-ink" : "text-hg-fg/60 hover:text-hg-fg",
          )}
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
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || open ? "border-b border-hg-fg/10 bg-hg-deep/85 backdrop-blur-xl" : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
          <a href="#inicio" aria-label="Hispal GYM" onClick={() => setOpen(false)}>
            <GymLogo className="hg-display text-[1.35rem] italic" markClassName="size-9" />
          </a>
          <nav aria-label="Principal" className="hidden items-center gap-6 text-[0.92rem] font-semibold lg:flex">
            {links.map(([label, id]) => (
              <a key={id} href={`#${id}`} className="text-hg-fg/70 transition-colors hover:text-hg-fg">{label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/#productos" className="hidden items-center gap-1.5 text-sm text-hg-fg/55 hover:text-hg-fg 2xl:inline-flex">
              <ArrowLeft className="size-4" aria-hidden /> {c.nav.back}
            </Link>
            <LanguageToggle className="hidden sm:flex" />
            <a href={HISPALGYM_DEMO_URL} className="hg-btn hg-btn--ghost hg-btn--sm hidden xl:inline-flex"><Play className="size-4" aria-hidden /> {c.nav.demo}</a>
            <a href="#contacto" className="hg-btn hg-btn--primary hg-btn--sm hidden sm:inline-flex">{c.nav.cta}</a>
            <button
              type="button"
              className="grid size-11 place-items-center rounded-lg text-hg-fg lg:hidden"
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
        <nav aria-label="Móvil" className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-hg-deep px-6 pb-10 pt-4 text-hg-fg lg:hidden">
          <ul className="divide-y divide-hg-fg/10">
            {links.map(([label, id]) => (
              <li key={id}>
                <a href={`#${id}`} onClick={() => setOpen(false)} className="hg-display block py-4 text-3xl">{label}</a>
              </li>
            ))}
          </ul>
          <a href="#contacto" onClick={() => setOpen(false)} className="hg-btn hg-btn--primary mt-8 w-full">{c.nav.cta}</a>
          <a href={HISPALGYM_DEMO_URL} className="hg-btn hg-btn--ghost mt-3 w-full"><Play className="size-4" aria-hidden /> {c.nav.demo}</a>
          <div className="mt-8 flex items-center justify-between">
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
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <GymLogo className="hg-display text-2xl italic" markClassName="size-11" />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-hg-muted">{c.footer.tagline}</p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.14em] text-hg-fg">{c.footer.product}</p>
          <ul className="mt-4 space-y-2.5 text-sm text-hg-muted">
            <li><a href="#incluido" className="hover:text-hg-accent">{c.nav.included}</a></li>
            <li><a href="#tu-marca" className="hover:text-hg-accent">{c.nav.brand}</a></li>
            <li><a href="#acceso" className="hover:text-hg-accent">{c.nav.access}</a></li>
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
