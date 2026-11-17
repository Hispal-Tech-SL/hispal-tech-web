import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Menu, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GymLogo } from "@/components/hispalgym/Logo";
import { HISPALGYM_DEMO_URL } from "@/constants/hispalgym";

const Logo = GymLogo;

const links = [
  ["Acceso", "acceso"],
  ["Funciones", "funciones"],
  ["Caso real", "caso-real"],
  ["Packs", "packs"],
  ["Preguntas", "preguntas"],
];

export function GymHeader() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);
  return (
    <>
    <header className="sticky top-0 z-50 border-b border-ink-foreground/10 bg-ink/95 text-ink-foreground backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4">
        <a href="#producto" aria-label="Hispal GYM, inicio" onClick={() => setOpen(false)}><Logo className="text-[17px]" markClassName="size-8" /></a>
        <nav aria-label="Principal" className="hidden items-center gap-7 text-sm font-medium md:flex">
          {links.map(([l, id]) => (
            <a key={id} href={`#${id}`} className="text-ink-foreground/70 transition hover:text-ink-foreground">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/#productos" className="hidden items-center gap-1.5 text-sm text-ink-foreground/60 hover:text-ink-foreground xl:inline-flex">
            <ArrowLeft className="size-4" aria-hidden /> Hispal Network
          </Link>
          <Button asChild size="sm" variant="outline" className="hidden border-primary bg-transparent font-semibold text-primary hover:bg-primary hover:text-primary-foreground lg:inline-flex"><a href={HISPALGYM_DEMO_URL}><Play /> Ver demo</a></Button>
          <Button asChild size="sm" className="hidden font-semibold sm:inline-flex"><a href="#contacto">Solicita una llamada</a></Button>
          <button
            className="grid size-10 place-items-center rounded-lg text-ink-foreground md:hidden"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>
    </header>
      {open && (
        <nav aria-label="Móvil" className="fixed inset-x-0 bottom-0 top-14 z-40 overflow-y-auto bg-ink px-6 pb-10 pt-6 text-ink-foreground md:hidden">
          <ul className="divide-y divide-ink-foreground/10">
            {links.map(([l, id]) => (
              <li key={id}><a href={`#${id}`} onClick={() => setOpen(false)} className="block py-4 font-display text-2xl font-bold">{l}</a></li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-8 w-full font-semibold shadow-glow"><a href="#contacto" onClick={() => setOpen(false)}>Solicita una llamada</a></Button>
          <Button asChild size="lg" variant="outline" className="mt-3 w-full border-primary bg-transparent font-semibold text-primary hover:bg-primary hover:text-primary-foreground"><a href={HISPALGYM_DEMO_URL}><Play /> Ver demo</a></Button>
          <Link to="/#productos" className="mt-6 flex items-center justify-center gap-1.5 text-sm text-ink-foreground/60"><ArrowLeft className="size-4" aria-hidden /> Volver a Hispal Network</Link>
        </nav>
      )}
    </>
  );
}

export function GymFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-3">
        <div>
          <Logo className="text-xl" markClassName="size-10" />
          <p className="mt-3 max-w-xs text-sm opacity-70">Acceso autónomo y gestión integral para gimnasios y centros deportivos.</p>
        </div>
        <div>
          <p className="font-display font-bold">Producto</p>
          <ul className="mt-3 space-y-2 text-sm opacity-80">
            <li><a href="#acceso" className="hover:text-primary">Acceso autónomo</a></li>
            <li><a href="#funciones" className="hover:text-primary">Funciones</a></li>
            <li><a href="#packs" className="hover:text-primary">Packs</a></li>
            <li><a href="#preguntas" className="hover:text-primary">Preguntas</a></li>
          </ul>
        </div>
        <div>
          <p className="font-display font-bold">Contacto</p>
          <ul className="mt-3 space-y-2 text-sm opacity-80">
            <li><a href={HISPALGYM_DEMO_URL} className="hover:text-primary">Ver demo</a></li>
            <li><a href="#contacto" className="hover:text-primary">Solicita una llamada</a></li>
            <li><Link to="/" className="hover:text-primary">Hispal Network</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10 py-5 text-center text-xs opacity-60">
        © {new Date().getFullYear()} Hispal GYM, un producto de Hispal Network. Todos los derechos reservados.
      </div>
    </footer>
  );
}
