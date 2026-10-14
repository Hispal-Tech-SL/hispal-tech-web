import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Dumbbell, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

function Logo() {
  return (
    <span className="flex items-center gap-2 font-display text-lg font-extrabold">
      <span className="grid size-8 place-items-center rounded-lg bg-primary text-primary-foreground">
        <Dumbbell className="size-4" aria-hidden />
      </span>
      Hispal <span className="text-primary">GYM</span>
    </span>
  );
}

const links = [
  ["Producto", "producto"],
  ["Funcionalidades", "funcionalidades"],
  ["Cómo funciona", "como-funciona"],
  ["Preguntas", "preguntas"],
  ["Contacto", "contacto"],
];

export function GymHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <a href="#producto" aria-label="Hispal GYM, inicio"><Logo /></a>
        <nav aria-label="Principal" className="hidden items-center gap-6 text-sm md:flex">
          {links.map(([l, id]) => (
            <a key={id} href={`#${id}`} className="text-muted-foreground hover:text-foreground">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <Link
            to="/#productos"
            className="mr-2 hidden items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground lg:inline-flex"
          >
            <ArrowLeft className="size-4" aria-hidden /> Hispal Tech
          </Link>
          <Button asChild className="hidden font-semibold sm:inline-flex"><a href="#contacto">Solicitar demo</a></Button>
          <button
            className="grid size-9 place-items-center rounded-lg md:hidden"
            aria-label="Abrir menú"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open && (
        <nav aria-label="Móvil" className="border-t px-4 py-3 md:hidden">
          {links.map(([l, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="block py-2.5 font-medium">{l}</a>
          ))}
          <Link to="/#productos" className="block py-2.5 font-medium text-muted-foreground">← Volver a Hispal Tech</Link>
          <Button asChild className="mt-2 w-full font-semibold"><a href="#contacto" onClick={() => setOpen(false)}>Solicitar demo</a></Button>
        </nav>
      )}
    </header>
  );
}

export function GymFooter() {
  return (
    <footer className="bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-3 text-sm opacity-70">Software de gestión integral para gimnasios y centros deportivos.</p>
        </div>
        <div>
          <p className="font-display font-bold">Producto</p>
          <ul className="mt-3 space-y-2 text-sm opacity-80">
            <li><a href="#funcionalidades" className="hover:text-primary">Funcionalidades</a></li>
            <li><a href="#como-funciona" className="hover:text-primary">Cómo funciona</a></li>
            <li><a href="#preguntas" className="hover:text-primary">Preguntas</a></li>
          </ul>
        </div>
        <div>
          <p className="font-display font-bold">Contacto</p>
          <ul className="mt-3 space-y-2 text-sm opacity-80">
            <li><a href="#contacto" className="hover:text-primary">Solicitar demo</a></li>
            <li><Link to="/" className="hover:text-primary">Hispal Tech</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10 py-5 text-center text-xs opacity-60">
        © {new Date().getFullYear()} Hispal GYM, un producto de Hispal Tech. Todos los derechos reservados.
      </div>
    </footer>
  );
}
