import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  Bell, Menu, Home, QrCode, User, ChevronRight, RefreshCw, Info, X, ArrowLeft, Dumbbell, Euro, SlidersHorizontal, DoorOpen, Pencil, Trash2, Search,
  ShoppingCart, ShoppingBag, Store, PackageCheck, FileDown, MapPin, UserRound, AlertCircle, ArrowDownToLine,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { GymLogo } from "@/components/hispalgym/Logo";

/*
 * Screens of the Hispal GYM member app and staff/owner panel.
 * They reproduce the real screens (same structure, labels and flows) rebuilt as HTML,
 * so they stay sharp at any size and carry the Hispal GYM brand. All data is fictitious.
 */

const eyebrow = "text-[8px] font-bold uppercase tracking-[0.22em] text-primary";

/* ------------------------------------------------------------------ frames */

export function Phone({ children, className, label }: { children: ReactNode; className?: string; label: string }) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn("relative mx-auto w-[260px] rounded-[2.6rem] bg-device p-2.5 shadow-device ring-1 ring-white/15", className)}
    >
      <div className="absolute left-1/2 top-3.5 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
      <div className="flex h-[540px] flex-col overflow-hidden rounded-[2.1rem] bg-screen px-3.5 pt-9 text-screen-foreground">
        {children}
      </div>
    </div>
  );
}

/** Scales fixed-width content down to the width of its container (never up). */
function Fit({ width, children, className }: { width: number; children: ReactNode; className?: string }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [height, setHeight] = useState<number>();
  useLayoutEffect(() => {
    const el = outer.current;
    if (!el) return;
    const measure = () => {
      const s = Math.min(1, el.clientWidth / width);
      setScale(s);
      if (inner.current) setHeight(inner.current.offsetHeight * s);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [width]);
  return (
    <div ref={outer} className={className} style={{ height }}>
      <div ref={inner} style={{ width, transform: `scale(${scale})`, transformOrigin: "top left" }}>
        {children}
      </div>
    </div>
  );
}

const PANEL_W = 460;

export function PanelFrame({ children, label, className }: { children: ReactNode; label: string; className?: string }) {
  return (
    <Fit width={PANEL_W} className={cn("mx-auto w-full min-w-0 max-w-[460px]", className)}>
      <div role="img" aria-label={label} className="overflow-hidden rounded-2xl border border-white/10 bg-screen text-screen-foreground shadow-device">
        <div className="flex items-center gap-1.5 border-b border-white/10 bg-device px-4 py-2.5">
          <span className="size-2.5 rounded-full bg-destructive/70" />
          <span className="size-2.5 rounded-full bg-primary/70" />
          <span className="size-2.5 rounded-full bg-success/70" />
        </div>
        <div className="px-5 pt-3">
          <AppHeader />
        </div>
        <div className="relative h-[330px] overflow-hidden px-5 pt-5">{children}</div>
      </div>
    </Fit>
  );
}

/* ------------------------------------------------------------ shared bits */

function AppHeader() {
  return (
    <div className="flex items-center justify-between border-b border-primary/50 pb-2">
      <GymLogo className="gap-1.5 text-[12px]" markClassName="size-7" />
      <div className="flex gap-1.5">
        <span className="relative grid size-6 place-items-center rounded border border-white/20">
          <Bell className="size-3" aria-hidden />
          <span className="absolute -right-1 -top-1 grid size-3 place-items-center rounded-full bg-primary text-[7px] font-bold text-primary-foreground">2</span>
        </span>
        <span className="grid size-6 place-items-center rounded border border-white/20"><Menu className="size-3" aria-hidden /></span>
      </div>
    </div>
  );
}

function BottomNav({ active }: { active: "inicio" | "qr" | "cuenta" }) {
  const item = (key: string, Icon: typeof Home, text: string) => (
    <span className={cn("flex flex-col items-center gap-0.5 text-[8px]", active === key ? "text-primary" : "opacity-80")}>
      <Icon className="size-3.5" aria-hidden />
      {text}
    </span>
  );
  return (
    <div className="relative -mx-3.5 mt-auto flex items-end justify-around border-t border-primary/50 px-3.5 pb-2.5 pt-3">
      {item("inicio", Home, "Inicio")}
      <span className="grid size-10 -translate-y-1 place-items-center rounded-full bg-primary text-primary-foreground ring-4 ring-screen">
        <QrCode className="size-5" aria-hidden />
      </span>
      {item("cuenta", User, "Mi cuenta")}
    </div>
  );
}

function AppShell({ active, children }: { active: "inicio" | "qr" | "cuenta"; children: ReactNode }) {
  return (
    <>
      <AppHeader />
      <div className="relative min-h-0 flex-1 overflow-hidden pt-4">{children}</div>
      <BottomNav active={active} />
    </>
  );
}

// Sample QR credential (25x25 modules) taken from the real app; it is expired, so it opens nothing.
const QR_PATH =
  "M0 0h1v1h-1zM1 0h1v1h-1zM2 0h1v1h-1zM3 0h1v1h-1zM4 0h1v1h-1zM5 0h1v1h-1zM6 0h1v1h-1zM8 0h1v1h-1zM9 0h1v1h-1zM12 0h1v1h-1zM14 0h1v1h-1zM18 0h1v1h-1zM19 0h1v1h-1zM20 0h1v1h-1zM21 0h1v1h-1zM22 0h1v1h-1zM23 0h1v1h-1zM24 0h1v1h-1zM0 1h1v1h-1zM6 1h1v1h-1zM9 1h1v1h-1zM10 1h1v1h-1zM12 1h1v1h-1zM18 1h1v1h-1zM24 1h1v1h-1zM0 2h1v1h-1zM2 2h1v1h-1zM3 2h1v1h-1zM4 2h1v1h-1zM6 2h1v1h-1zM10 2h1v1h-1zM11 2h1v1h-1zM12 2h1v1h-1zM13 2h1v1h-1zM15 2h1v1h-1zM16 2h1v1h-1zM18 2h1v1h-1zM20 2h1v1h-1zM21 2h1v1h-1zM22 2h1v1h-1zM24 2h1v1h-1zM0 3h1v1h-1zM2 3h1v1h-1zM3 3h1v1h-1zM4 3h1v1h-1zM6 3h1v1h-1zM8 3h1v1h-1zM12 3h1v1h-1zM14 3h1v1h-1zM15 3h1v1h-1zM16 3h1v1h-1zM18 3h1v1h-1zM20 3h1v1h-1zM21 3h1v1h-1zM22 3h1v1h-1zM24 3h1v1h-1zM0 4h1v1h-1zM2 4h1v1h-1zM3 4h1v1h-1zM4 4h1v1h-1zM6 4h1v1h-1zM8 4h1v1h-1zM13 4h1v1h-1zM14 4h1v1h-1zM15 4h1v1h-1zM16 4h1v1h-1zM18 4h1v1h-1zM20 4h1v1h-1zM21 4h1v1h-1zM22 4h1v1h-1zM24 4h1v1h-1zM0 5h1v1h-1zM6 5h1v1h-1zM8 5h1v1h-1zM9 5h1v1h-1zM13 5h1v1h-1zM14 5h1v1h-1zM18 5h1v1h-1zM24 5h1v1h-1zM0 6h1v1h-1zM1 6h1v1h-1zM2 6h1v1h-1zM3 6h1v1h-1zM4 6h1v1h-1zM5 6h1v1h-1zM6 6h1v1h-1zM8 6h1v1h-1zM10 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM16 6h1v1h-1zM18 6h1v1h-1zM19 6h1v1h-1zM20 6h1v1h-1zM21 6h1v1h-1zM22 6h1v1h-1zM23 6h1v1h-1zM24 6h1v1h-1zM8 7h1v1h-1zM9 7h1v1h-1zM10 7h1v1h-1zM11 7h1v1h-1zM14 7h1v1h-1zM16 7h1v1h-1zM0 8h1v1h-1zM4 8h1v1h-1zM6 8h1v1h-1zM7 8h1v1h-1zM8 8h1v1h-1zM9 8h1v1h-1zM10 8h1v1h-1zM11 8h1v1h-1zM13 8h1v1h-1zM14 8h1v1h-1zM15 8h1v1h-1zM17 8h1v1h-1zM18 8h1v1h-1zM19 8h1v1h-1zM20 8h1v1h-1zM21 8h1v1h-1zM24 8h1v1h-1zM2 9h1v1h-1zM8 9h1v1h-1zM9 9h1v1h-1zM11 9h1v1h-1zM12 9h1v1h-1zM16 9h1v1h-1zM17 9h1v1h-1zM18 9h1v1h-1zM20 9h1v1h-1zM21 9h1v1h-1zM22 9h1v1h-1zM24 9h1v1h-1zM1 10h1v1h-1zM2 10h1v1h-1zM3 10h1v1h-1zM6 10h1v1h-1zM7 10h1v1h-1zM9 10h1v1h-1zM10 10h1v1h-1zM11 10h1v1h-1zM13 10h1v1h-1zM14 10h1v1h-1zM16 10h1v1h-1zM18 10h1v1h-1zM19 10h1v1h-1zM20 10h1v1h-1zM22 10h1v1h-1zM0 11h1v1h-1zM1 11h1v1h-1zM10 11h1v1h-1zM11 11h1v1h-1zM13 11h1v1h-1zM17 11h1v1h-1zM20 11h1v1h-1zM21 11h1v1h-1zM22 11h1v1h-1zM24 11h1v1h-1zM0 12h1v1h-1zM2 12h1v1h-1zM4 12h1v1h-1zM5 12h1v1h-1zM6 12h1v1h-1zM9 12h1v1h-1zM11 12h1v1h-1zM12 12h1v1h-1zM13 12h1v1h-1zM15 12h1v1h-1zM16 12h1v1h-1zM18 12h1v1h-1zM19 12h1v1h-1zM20 12h1v1h-1zM21 12h1v1h-1zM23 12h1v1h-1zM24 12h1v1h-1zM0 13h1v1h-1zM1 13h1v1h-1zM4 13h1v1h-1zM5 13h1v1h-1zM8 13h1v1h-1zM10 13h1v1h-1zM13 13h1v1h-1zM14 13h1v1h-1zM17 13h1v1h-1zM19 13h1v1h-1zM23 13h1v1h-1zM24 13h1v1h-1zM2 14h1v1h-1zM6 14h1v1h-1zM8 14h1v1h-1zM9 14h1v1h-1zM16 14h1v1h-1zM17 14h1v1h-1zM19 14h1v1h-1zM22 14h1v1h-1zM23 14h1v1h-1zM4 15h1v1h-1zM5 15h1v1h-1zM7 15h1v1h-1zM9 15h1v1h-1zM10 15h1v1h-1zM12 15h1v1h-1zM14 15h1v1h-1zM16 15h1v1h-1zM17 15h1v1h-1zM18 15h1v1h-1zM19 15h1v1h-1zM20 15h1v1h-1zM23 15h1v1h-1zM0 16h1v1h-1zM1 16h1v1h-1zM2 16h1v1h-1zM3 16h1v1h-1zM6 16h1v1h-1zM7 16h1v1h-1zM9 16h1v1h-1zM11 16h1v1h-1zM13 16h1v1h-1zM14 16h1v1h-1zM16 16h1v1h-1zM17 16h1v1h-1zM18 16h1v1h-1zM19 16h1v1h-1zM20 16h1v1h-1zM22 16h1v1h-1zM23 16h1v1h-1zM8 17h1v1h-1zM10 17h1v1h-1zM12 17h1v1h-1zM15 17h1v1h-1zM16 17h1v1h-1zM20 17h1v1h-1zM21 17h1v1h-1zM22 17h1v1h-1zM24 17h1v1h-1zM0 18h1v1h-1zM1 18h1v1h-1zM2 18h1v1h-1zM3 18h1v1h-1zM4 18h1v1h-1zM5 18h1v1h-1zM6 18h1v1h-1zM8 18h1v1h-1zM9 18h1v1h-1zM10 18h1v1h-1zM11 18h1v1h-1zM12 18h1v1h-1zM13 18h1v1h-1zM14 18h1v1h-1zM16 18h1v1h-1zM18 18h1v1h-1zM20 18h1v1h-1zM22 18h1v1h-1zM23 18h1v1h-1zM0 19h1v1h-1zM6 19h1v1h-1zM9 19h1v1h-1zM10 19h1v1h-1zM11 19h1v1h-1zM13 19h1v1h-1zM15 19h1v1h-1zM16 19h1v1h-1zM20 19h1v1h-1zM23 19h1v1h-1zM0 20h1v1h-1zM2 20h1v1h-1zM3 20h1v1h-1zM4 20h1v1h-1zM6 20h1v1h-1zM8 20h1v1h-1zM10 20h1v1h-1zM12 20h1v1h-1zM13 20h1v1h-1zM16 20h1v1h-1zM17 20h1v1h-1zM18 20h1v1h-1zM19 20h1v1h-1zM20 20h1v1h-1zM21 20h1v1h-1zM23 20h1v1h-1zM0 21h1v1h-1zM2 21h1v1h-1zM3 21h1v1h-1zM4 21h1v1h-1zM6 21h1v1h-1zM13 21h1v1h-1zM14 21h1v1h-1zM16 21h1v1h-1zM18 21h1v1h-1zM20 21h1v1h-1zM22 21h1v1h-1zM24 21h1v1h-1zM0 22h1v1h-1zM2 22h1v1h-1zM3 22h1v1h-1zM4 22h1v1h-1zM6 22h1v1h-1zM9 22h1v1h-1zM16 22h1v1h-1zM19 22h1v1h-1zM23 22h1v1h-1zM0 23h1v1h-1zM6 23h1v1h-1zM10 23h1v1h-1zM12 23h1v1h-1zM14 23h1v1h-1zM16 23h1v1h-1zM17 23h1v1h-1zM21 23h1v1h-1zM23 23h1v1h-1zM24 23h1v1h-1zM0 24h1v1h-1zM1 24h1v1h-1zM2 24h1v1h-1zM3 24h1v1h-1zM4 24h1v1h-1zM5 24h1v1h-1zM6 24h1v1h-1zM8 24h1v1h-1zM10 24h1v1h-1zM11 24h1v1h-1zM13 24h1v1h-1zM14 24h1v1h-1zM15 24h1v1h-1zM16 24h1v1h-1zM21 24h1v1h-1zM22 24h1v1h-1zM24 24h1v1h-1z";

function Qr() {
  return (
    <svg viewBox="-3 -3 31 31" className="w-full rounded-lg bg-white" shapeRendering="crispEdges" aria-hidden>
      <path d={QR_PATH} fill="#0c0a09" />
    </svg>
  );
}

/* ------------------------------------------------------------ member app */

export function QrScreen() {
  return (
    <AppShell active="qr">
      <p className={eyebrow}>Acceso al gimnasio con QR</p>
      <div className="mx-auto mt-6 w-[84%]"><Qr /></div>
      <p className="mt-3 flex items-center justify-center gap-1.5 text-[9px] opacity-80"><span className="size-1.5 rounded-full bg-primary" aria-hidden />Código activo</p>
      <p className="mt-2 text-center text-[8px] underline opacity-50">Desactivar el acceso en este dispositivo</p>
    </AppShell>
  );
}

export function MembershipScreen() {
  return (
    <AppShell active="inicio">
      <p className={eyebrow}>Membresía</p>
      <div className="mt-3 rounded-lg border border-white/15 bg-white/[0.03] p-3">
        <div className="flex items-start justify-between gap-2">
          <p className="font-display text-[13px] font-semibold leading-tight">Tarifa: “Mensualidad Estándar” (39,90 €)</p>
          <span className="rounded border border-success px-1.5 py-0.5 text-[8px] font-bold text-success">Activa</span>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[9px]">
          <div><p className="opacity-60">Fecha de inicio</p><p className="mt-0.5 text-[11px] font-medium">09/10/2026</p></div>
          <div><p className="opacity-60">Fecha de vencimiento</p><p className="mt-0.5 text-[11px] font-medium">09/11/2026</p></div>
        </div>
        <div className="mt-3 h-1 rounded-full bg-white/15"><div className="h-full w-1/5 rounded-full bg-primary" /></div>
        <div className="mt-1.5 flex justify-between text-[8px] opacity-60"><span>Llevas 6 días</span><span>Te quedan 25 días</span></div>
        <div className="mt-3 flex gap-1.5 rounded border border-primary/40 p-2 text-[9px] leading-snug text-primary">
          <Info className="mt-0.5 size-3 shrink-0" aria-hidden />
          Puedes dejar pagado el siguiente periodo, o varios meses de una vez: se colocan justo detrás del que tienes, así que no pierdes ni un día.
        </div>
        <div className="mt-3 flex items-center justify-center gap-1.5 rounded bg-primary py-2 text-[8px] font-bold uppercase tracking-[0.16em] text-primary-foreground">
          <RefreshCw className="size-3" aria-hidden />Pagar el siguiente periodo
        </div>
      </div>
    </AppShell>
  );
}

function RoutineThumb() {
  return (
    <span className="grid size-12 shrink-0 place-items-center rounded-md bg-primary/15 text-primary">
      <Dumbbell className="size-5" aria-hidden />
    </span>
  );
}

export function RoutinesScreen() {
  const rows = [
    ["Empuje, tirón y pierna · mujeres (5 días)", "5 días · 28 ejercicios", ""],
    ["Full body · mujeres (3 días)", "3 días · 19 ejercicios", ""],
    ["Multifrecuencia · 3 días", "3 días · 21 ejercicios", "Intermedio"],
  ];
  return (
    <AppShell active="inicio">
      <p className={eyebrow}>Rutinas</p>
      <ul className="mt-3 space-y-2">
        {rows.map(([t, s, lvl]) => (
          <li key={t} className="flex items-center gap-2.5 rounded-lg border border-white/15 bg-white/[0.03] p-2">
            <RoutineThumb />
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-semibold leading-tight">{t}</span>
              <span className="mt-0.5 block text-[9px] opacity-60">{s}</span>
              {lvl && <span className="mt-0.5 block text-[9px] opacity-60">{lvl}</span>}
            </span>
            <ChevronRight className="size-3.5 shrink-0 opacity-60" aria-hidden />
          </li>
        ))}
      </ul>
    </AppShell>
  );
}

export function RoutineDetailScreen() {
  const days = [["Full body A · fuerza y multiarticular", "7 ejercicios"], ["Full body B · hipertrofia y unilateral", "7 ejercicios"], ["Full body C · tensión continua y máquinas", "7 ejercicios"]];
  return (
    <>
      <div className="flex items-center gap-3 border-b border-white/10 pb-2.5">
        <X className="size-4" aria-hidden />
        <span className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-80">Multifrecuencia · 3 días</span>
      </div>
      <p className="mt-4 text-[8px] font-bold uppercase tracking-[0.2em] opacity-60">Elige el día</p>
      <ul className="mt-3 space-y-2">
        {days.map(([t, s]) => (
          <li key={t} className="flex items-center gap-2.5 rounded-lg border border-white/15 bg-white/[0.03] p-2.5">
            <RoutineThumb />
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-semibold leading-tight">{t}</span>
              <span className="mt-0.5 block text-[9px] opacity-60">{s}</span>
            </span>
            <ChevronRight className="size-3.5 shrink-0 opacity-60" aria-hidden />
          </li>
        ))}
      </ul>
      <div className="mt-auto -mx-3.5"><BottomNav active="inicio" /></div>
    </>
  );
}

export function TariffsScreen() {
  const tariffs = [["1 Día", "10,00", "1 día de acceso"], ["Mensualidad Estándar", "39,90", "1 mes de acceso"], ["Bono 15 Días", "24,00", "15 días de acceso"]];
  return (
    <>
      <div className="flex items-center justify-between border-b border-primary/50 pb-2">
        <GymLogo className="gap-1.5 text-[12px]" markClassName="size-7" />
        <span className="flex items-center gap-1 rounded bg-white px-2 py-1 text-[7px] font-bold uppercase tracking-widest text-black"><ArrowLeft className="size-2.5" aria-hidden />Inicio</span>
      </div>
      <div className="pt-4 text-center">
        <p className={eyebrow}>Hazte socio</p>
        <p className="mt-1.5 font-display text-xl font-semibold leading-tight">Elige tu <em className="text-primary">tarifa</em></p>
        <p className="mt-1.5 text-[9px] leading-snug opacity-60">Cada tarifa cubre un periodo de acceso, y tú eliges desde qué día empieza. Nada se renueva solo: cuando termine, decides tú si vuelves.</p>
      </div>
      <p className="mt-3 rounded border border-dashed border-primary/50 py-1.5 text-center text-[9px] opacity-80">¿Ya eres socio? <span className="text-primary underline">Entra en tu cuenta</span></p>
      <ul className="mt-3 space-y-2">
        {tariffs.map(([n, p, d]) => (
          <li key={n} className="rounded-lg border border-white/15 bg-white/[0.03] p-3">
            <p className="font-display text-[12px] font-semibold">{n}</p>
            <p className="mt-1 text-lg font-light leading-none">{p}<span className="ml-0.5 text-[9px] opacity-60">€</span></p>
            <p className="mt-1 text-[8px] opacity-60">{d}</p>
            <span className="mt-2 inline-block rounded bg-primary px-2.5 py-1.5 text-[7px] font-bold uppercase tracking-[0.18em] text-primary-foreground">Seleccionar →</span>
          </li>
        ))}
      </ul>
    </>
  );
}

/* ------------------------------------------------------- staff / owner panel */

function Row({ name, meta, right, sub, accent }: { name: string; meta?: ReactNode; right: string; sub?: string; accent?: boolean }) {
  return (
    <div className={cn("flex items-center justify-between rounded border border-white/12 bg-white/[0.03] px-3 py-2", accent && "border-l-2 border-l-primary")}>
      <span>
        <span className="block text-[11px] font-medium">{name}</span>
        {meta && <span className="mt-0.5 block text-[9px] opacity-60">{meta}</span>}
      </span>
      <span className="text-right">
        <span className="block text-[11px] font-semibold">{right}</span>
        {sub && <span className="block text-[9px] opacity-60">{sub}</span>}
      </span>
    </div>
  );
}

function DayDivider({ children }: { children: ReactNode }) {
  return (
    <div className="my-3 flex items-center gap-3">
      <span className="h-px flex-1 bg-primary/30" />
      <span className="text-[8px] font-bold uppercase tracking-[0.22em] text-primary">{children}</span>
      <span className="h-px flex-1 bg-primary/30" />
    </div>
  );
}

export function PaymentsPanel() {
  return (
    <div>
      <p className={eyebrow}>Pagos</p>
      <div className="mt-2.5 flex gap-1.5 text-[9px]">
        {["Hoy", "Esta semana", "Este mes", "Este año"].map((c, i) => (
          <span key={c} className={cn("rounded border px-2 py-1", i === 2 ? "border-primary text-primary" : "border-white/20")}>{c}</span>
        ))}
      </div>
      <div className="mt-3 rounded border border-primary/40 bg-primary/10 px-3 py-2.5">
        <p className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-70">Total ingresado</p>
        <p className="mt-0.5 text-xl font-semibold">2.010,30 <span className="text-xs opacity-70">€</span></p>
        <p className="text-[9px] opacity-60">47 pagos</p>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        {[["Online", "633,40", "32 %"], ["Presencial", "1.376,90", "68 %"]].map(([k, v, p]) => (
          <div key={k} className="rounded border border-white/15 px-3 py-2">
            <p className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-70">{k}</p>
            <p className="mt-0.5 text-sm font-semibold">{v} <span className="text-[10px] opacity-70">€</span></p>
            <p className="text-[9px] opacity-60">{p} del total</p>
          </div>
        ))}
      </div>
      <DayDivider>15 de octubre de 2026</DayDivider>
      <div className="space-y-2">
        <Row name="Irene Vidal Soler" meta="Online" right="39,90 €" sub="16:32" />
        <Row name="Álvaro Campos Lara" meta="Efectivo · Raúl Benítez" right="39,90 €" accent />
      </div>
    </div>
  );
}

export function AccessPanel() {
  const days: [string, [string, string][]][] = [
    ["14 de octubre de 2026", [["Lucía Fernández Ortega", "15:05"], ["Hugo Medina Crespo", "08:18"]]],
    ["13 de octubre de 2026", [["Rubén Gallego Fuentes", "15:50"]]],
    ["12 de octubre de 2026", [["Marta Delgado Pérez", "16:56"], ["Irene Vidal Soler", "10:09"]]],
  ];
  return (
    <div>
      <p className={eyebrow}>Accesos</p>
      <div className="mt-2.5 flex items-center gap-2 border-b border-primary/50 pb-1.5 text-[10px] opacity-70"><Search className="size-3" aria-hidden />Nombre, DNI, teléfono o email…</div>
      <div className="mt-2.5 rounded border border-white/20 px-2.5 py-1.5 text-[10px]">Todos los accesos</div>
      {days.map(([d, rows]) => (
        <div key={d}>
          <DayDivider>{d}</DayDivider>
          <div className="space-y-1.5">
            {rows.map(([n, h]) => (
              <div key={n + h} className="flex items-center justify-between rounded border border-white/12 bg-white/[0.03] px-3 py-1.5 text-[11px]">
                <span>{n}</span><span className="text-[9px] opacity-60">{h}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <span className="absolute bottom-3 right-4 flex items-center gap-1.5 rounded-full bg-primary px-3 py-2 text-[8px] font-bold uppercase tracking-[0.18em] text-primary-foreground shadow-lg">
        <DoorOpen className="size-3" aria-hidden />Abrir puerta
      </span>
    </div>
  );
}

export function CustomerPanel() {
  return (
    <div>
      <p className={eyebrow}>Datos del cliente</p>
      <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-2 rounded border border-white/15 p-3 text-[9px]">
        <div><p className="opacity-60">Nombre</p><p className="mt-0.5 text-[11px] font-medium">Lucía Fernández Ortega</p></div>
        <div><p className="opacity-60">Teléfono</p><p className="mt-0.5 text-[11px] font-medium">600 000 011</p></div>
        <div className="col-span-2"><p className="opacity-60">Email</p><p className="mt-0.5 flex items-center gap-1.5 text-[11px] font-medium">socio1@example.com<span className="rounded border border-success px-1 text-[7px] font-bold uppercase text-success">Verificado</span></p></div>
      </div>
      <p className={cn(eyebrow, "mt-4")}>Membresía</p>
      <div className="mt-2 rounded border border-white/15 p-3">
        <div className="flex items-start justify-between">
          <p className="font-display text-[13px] font-semibold">Tarifa: “Mensualidad Estándar” (39,90 €)</p>
          <span className="rounded border border-success px-1.5 py-0.5 text-[8px] font-bold text-success">Activa</span>
        </div>
        <div className="mt-2 h-1 rounded-full bg-white/15"><div className="h-full w-[10%] rounded-full bg-primary" /></div>
        <div className="mt-1 flex justify-between text-[8px] opacity-60"><span>Lleva 3 días</span><span>Le quedan 28 días</span></div>
      </div>
      <p className={cn(eyebrow, "mt-4")}>Pagos realizados</p>
      <div className="mt-2 rounded border border-white/15">
        <div className="flex items-start justify-between px-3 pt-2.5 text-[11px]">
          <span><span className="block font-medium">Mensualidad Estándar</span><span className="mt-1 inline-block rounded border border-primary/50 px-1.5 py-0.5 text-[8px] text-primary">Efectivo</span></span>
          <span className="text-right"><span className="block font-semibold">39,90 €</span><span className="mt-1 inline-block rounded border border-success px-1.5 py-0.5 text-[8px] text-success">Vigente</span></span>
        </div>
        <div className="mt-2 flex items-center justify-between border-t border-white/10 px-3 py-2">
          <span className="text-[8px] opacity-60">Registrado el 12/10/2026 por Raúl Benítez</span>
          <span className="flex gap-1.5 text-[7px] font-bold uppercase tracking-widest text-primary-foreground">
            <span className="flex items-center gap-1 rounded bg-primary px-2 py-1"><Pencil className="size-2.5" aria-hidden />Editar</span>
            <span className="flex items-center gap-1 rounded bg-primary px-2 py-1"><Trash2 className="size-2.5" aria-hidden />Eliminar</span>
          </span>
        </div>
      </div>
    </div>
  );
}

export function CashPanel() {
  return (
    <div className="mx-auto max-w-[330px] rounded border border-primary/50 bg-device p-4 shadow-xl">
      <p className="font-display text-lg font-semibold">Registrar un <em className="text-primary">pago</em></p>
      <p className="mt-1 text-[10px] opacity-70">Lucía Fernández Ortega · cobrado fuera de la web</p>
      <p className={cn(eyebrow, "mt-3.5")}>Tarifa</p>
      <div className="mt-1.5 rounded bg-white px-2.5 py-2 text-[10px] text-black">Elige una tarifa…</div>
      <p className={cn(eyebrow, "mt-3.5")}>Forma de pago</p>
      <div className="mt-1.5 flex gap-2 text-[10px]">
        <span className="rounded border border-primary px-2.5 py-1.5 text-primary">Efectivo</span>
        <span className="rounded border border-white/25 px-2.5 py-1.5">Tarjeta en datáfono</span>
      </div>
      <span className="mt-3.5 inline-flex items-center gap-1.5 rounded border border-dashed border-primary/60 px-2.5 py-1.5 text-[10px] text-primary"><SlidersHorizontal className="size-3" aria-hidden />Ajustar fechas o precio</span>
      <div className="mt-3.5 flex items-center justify-center gap-1.5 rounded bg-primary py-2.5 text-[8px] font-bold uppercase tracking-[0.2em] text-primary-foreground">
        <Euro className="size-3" aria-hidden />Registrar el pago
      </div>
    </div>
  );
}

/* ------------------------------------------------------- shop, classes and sensor */

/** Neutral supplement tub, so the mockups show products without using any brand's photos. */
function Tub({ color, label }: { color: string; label: string }) {
  return (
    <svg viewBox="0 0 100 100" className="h-full w-full" aria-hidden>
      <ellipse cx="50" cy="90" rx="26" ry="4" fill="#000" opacity="0.12" />
      <rect x="31" y="14" width="38" height="9" rx="3" fill="#1a120b" />
      <rect x="25" y="23" width="50" height="62" rx="7" fill={color} />
      <rect x="31" y="38" width="38" height="28" rx="3" fill="#fff" opacity="0.95" />
      <rect x="35" y="43" width="22" height="4" rx="2" fill={color} />
      <rect x="35" y="50" width="30" height="2.5" rx="1.25" fill="#1a120b" opacity="0.35" />
      <rect x="35" y="55" width="26" height="2.5" rx="1.25" fill="#1a120b" opacity="0.35" />
      <text x="50" y="76" textAnchor="middle" fontSize="7" fontWeight="700" fill="#fff" opacity="0.9">{label}</text>
    </svg>
  );
}

function ProductTile({ color, label, className }: { color: string; label: string; className?: string }) {
  return (
    <span className={cn("block overflow-hidden rounded bg-gradient-to-b from-white to-zinc-200", className)}>
      <Tub color={color} label={label} />
    </span>
  );
}

export function ShopScreen() {
  const products = [
    ["Nutrix", "Proteína whey 2 kg Vainilla", "54,90", "#f06800", "2 KG"],
    ["Nutrix", "Proteína whey 2 kg Chocolate", "54,90", "#7c3f1d", "2 KG"],
    ["Alpha Labs", "Creatina 300 g Limón", "22,90", "#c9a800", "300 G"],
    ["Alpha Labs", "Creatina 300 g Cola", "22,90", "#b3261e", "300 G"],
  ];
  return (
    <AppShell active="inicio">
      <p className={eyebrow}>Tienda</p>
      <div className="mt-2.5 flex items-center gap-1.5 border-b border-primary/50 pb-1.5 text-[9px] opacity-70"><Search className="size-3" aria-hidden />Nombre o marca…</div>
      <div className="mt-2 flex items-center justify-between rounded border border-white/20 px-2 py-1 text-[9px]"><span>Todas las categorías</span><ChevronRight className="size-3 rotate-90 opacity-60" aria-hidden /></div>
      <p className="mt-3 text-[8px] font-bold uppercase tracking-[0.22em] text-primary">Proteína</p>
      <ul className="mt-1.5 grid grid-cols-2 gap-2">
        {products.map(([brand, name, price, color, label]) => (
          <li key={name} className="overflow-hidden rounded-lg border border-white/15 bg-white/[0.03]">
            <ProductTile color={color} label={label} className="h-[74px] rounded-none" />
            <div className="p-1.5">
              <p className="text-[7px] opacity-60">{brand}</p>
              <p className="mt-0.5 h-[22px] text-[8.5px] font-semibold leading-tight">{name}</p>
              <div className="mt-1 flex items-center justify-between gap-1">
                <span className="font-display text-[10px] font-semibold">{price} €</span>
                <span className="rounded bg-primary px-1.5 py-1 text-[6px] font-bold uppercase tracking-[0.14em] text-primary-foreground">Añadir</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <span className="absolute bottom-2 right-0 grid size-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg">
        <ShoppingCart className="size-5" aria-hidden />
        <span className="absolute -right-0.5 -top-0.5 grid size-4 place-items-center rounded-full border-2 border-screen bg-white text-[8px] font-bold text-black">2</span>
      </span>
    </AppShell>
  );
}

export function ShopOrderScreen() {
  const lines = [
    ["Proteína whey 2 kg Vainilla", "2 × 54,90 €", "109,80", "#f06800", "2 KG"],
    ["Creatina 300 g Limón", "22,90 €", "22,90", "#c9a800", "300 G"],
  ];
  return (
    <AppShell active="cuenta">
      <p className={eyebrow}>Pagos</p>
      <div className="mt-2.5 flex items-baseline justify-between">
        <p className="font-display text-[10px] font-semibold uppercase tracking-[0.18em] text-primary">Octubre 2026</p>
        <p className="text-[9px] opacity-60">132,70 €</p>
      </div>
      <div className="mt-1.5 rounded-lg border border-l-[3px] border-white/15 border-l-primary bg-white/[0.03]">
        <div className="flex items-start justify-between gap-2 px-2.5 pt-2.5">
          <span>
            <span className="inline-flex items-center gap-1 rounded border border-primary/40 bg-primary/10 px-1.5 py-0.5 text-[8px] font-bold text-primary"><ShoppingBag className="size-2.5" aria-hidden />Tienda</span>
            <span className="mt-1.5 flex items-center gap-1 text-[8px] opacity-80"><Store className="size-2.5 text-primary" aria-hidden />Pagado el 29 oct · web</span>
          </span>
          <span className="text-right">
            <span className="block text-[12px] font-semibold leading-none">132,70<span className="ml-0.5 text-[8px] font-normal opacity-60">€</span></span>
            <span className="mt-1 flex items-center justify-end gap-1 text-[8px] font-medium text-primary"><PackageCheck className="size-2.5" aria-hidden />Por recoger</span>
          </span>
        </div>
        <ul className="mx-2.5 mt-2 divide-y divide-white/10 overflow-hidden rounded border border-white/10 bg-black/20">
          {lines.map(([name, qty, total, color, label]) => (
            <li key={name} className="flex items-center gap-2 px-2 py-1.5">
              <ProductTile color={color} label={label} className="size-8 shrink-0" />
              <span className="min-w-0 flex-1">
                <span className="block text-[9px] leading-tight">{name}</span>
                <span className="mt-0.5 block text-[8px] opacity-55">{qty}</span>
              </span>
              <span className="text-[9px] font-semibold">{total}<span className="ml-0.5 text-[7px] font-normal opacity-60">€</span></span>
            </li>
          ))}
        </ul>
        <div className="mt-2 flex items-center gap-3 border-t border-white/10 px-2.5 py-1.5 text-[8px] text-primary">
          <span className="flex items-center gap-1 underline"><FileDown className="size-2.5" aria-hidden />Descargar factura</span>
          <span className="flex items-center gap-1 underline"><QrCode className="size-2.5" aria-hidden />Ocultar QR</span>
        </div>
        <div className="border-t border-white/10 px-2.5 pb-2 pt-2.5">
          <div className="mx-auto w-[46%]"><Qr /></div>
          <p className="mt-1.5 text-center text-[7.5px] opacity-70">Enseña este código QR en el mostrador. Código <span className="font-bold tracking-wider text-primary">K7M2-9QX4</span></p>
        </div>
      </div>
    </AppShell>
  );
}

export function ClassesScreen() {
  const days = [["JUE", "29"], ["VIE", "30"], ["SÁB", "31"], ["DOM", "1"], ["LUN", "2"]];
  const sessions: [string, string, string, string, string, "ok" | "booked" | "full"][] = [
    ["18:00", "19:00", "Spinning", "Sala 1", "Marta", "ok"],
    ["19:00", "20:00", "Pilates", "Sala 2", "Elena", "booked"],
    ["20:00", "21:00", "Boxeo", "Sala 1", "Raúl", "full"],
  ];
  const badge = {
    ok: ["Quedan 6 plazas", "border-success text-success bg-success/10"],
    booked: ["Reservada", "border-primary text-primary bg-primary/10"],
    full: ["Completa", "border-destructive text-destructive bg-destructive/10"],
  } as const;
  return (
    <AppShell active="inicio">
      <p className={eyebrow}>Clases</p>
      <div className="mt-2.5 flex gap-1.5 text-[8px]">
        <span className="rounded bg-primary px-2.5 py-1 font-bold uppercase tracking-[0.12em] text-primary-foreground">Agenda</span>
        <span className="rounded border border-white/25 px-2.5 py-1 font-semibold uppercase tracking-[0.12em] opacity-80">Mis reservas (1)</span>
      </div>
      <div className="mt-2.5 flex gap-1">
        {days.map(([d, n], i) => (
          <span key={d} className={cn("flex-1 rounded border py-1 text-center", i === 1 ? "border-primary bg-primary text-primary-foreground" : "border-white/20")}>
            <span className="block text-[7px] opacity-80">{d}</span>
            <span className="block text-[12px] font-semibold leading-tight">{n}</span>
          </span>
        ))}
      </div>
      <p className="mt-2 text-[8px] opacity-60">Viernes, 30 de octubre</p>
      <ul className="mt-1.5 space-y-1.5">
        {sessions.map(([from, to, title, room, who, tone]) => (
          <li key={title} className="flex items-start gap-2.5 rounded border border-white/20 bg-white/[0.03] p-2">
            <span className="w-9 shrink-0"><span className="block text-[11px] font-semibold leading-tight">{from}</span><span className="block text-[8px] opacity-50">{to}</span></span>
            <span className="min-w-0 flex-1">
              <span className="block text-[11px] font-semibold leading-tight">{title}</span>
              <span className="mt-0.5 flex items-center gap-2 text-[8px] opacity-60"><span className="flex items-center gap-0.5"><MapPin className="size-2.5" aria-hidden />{room}</span><span className="flex items-center gap-0.5"><UserRound className="size-2.5" aria-hidden />{who}</span></span>
              <span className={cn("mt-1 inline-block rounded border px-1.5 py-0.5 text-[7px] font-semibold", badge[tone][1])}>{badge[tone][0]}</span>
            </span>
          </li>
        ))}
      </ul>
    </AppShell>
  );
}

/** Stylised overhead view of the door sensor: counting zone, crossing line and two people. */
function SensorView() {
  return (
    <div className="relative h-[92px] overflow-hidden rounded border border-white/15 bg-gradient-to-b from-zinc-800 to-zinc-950">
      <svg viewBox="0 0 400 92" className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden>
        <rect x="110" y="8" width="180" height="76" rx="4" fill="none" stroke="hsl(var(--primary))" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.9" />
        <line x1="110" y1="46" x2="290" y2="46" stroke="hsl(var(--success))" strokeWidth="1.5" />
        <path d="M0 80 L110 84 M400 80 L290 84" stroke="#fff" strokeWidth="1" opacity="0.15" />
        <g fill="#f5f0e8" opacity="0.9">
          <ellipse cx="170" cy="34" rx="12" ry="9" /><ellipse cx="170" cy="34" rx="5" ry="4" fill="#1a120b" />
          <ellipse cx="205" cy="60" rx="12" ry="9" /><ellipse cx="205" cy="60" rx="5" ry="4" fill="#1a120b" />
        </g>
      </svg>
      <span className="absolute left-2 top-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[7px] font-bold uppercase tracking-[0.18em] text-primary">Puerta de entrada</span>
    </div>
  );
}

export function SensorPanel() {
  const entries: [string, string, string, "ok" | "companion" | "noQr"][] = [
    ["Lucía Fernández Ortega", "Entró una persona · 1 persona", "15:05:12", "ok"],
    ["Hugo Medina Crespo", "Entraron varias · 2 personas", "15:02:48", "companion"],
    ["Sin QR", "Entrada sin QR · 1 persona", "14:58:31", "noQr"],
    ["Irene Vidal Soler", "Entró una persona · 1 persona", "14:55:07", "ok"],
  ];
  return (
    <div>
      <p className={eyebrow}>Sensor</p>
      <div className="mt-2"><SensorView /></div>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {[["Entradas", "18"], ["Salidas", "11"], ["Dentro (estimado)", "7"]].map(([k, v]) => (
          <div key={k} className="rounded border border-white/15 px-2 py-1.5 text-center">
            <p className="text-sm font-semibold leading-none">{v}</p>
            <p className="mt-1 text-[7px] uppercase tracking-[0.14em] opacity-60">{k}</p>
          </div>
        ))}
      </div>
      <p className={cn(eyebrow, "mt-3")}>Entradas con QR</p>
      <div className="mt-1.5 divide-y divide-white/10 rounded border border-white/12">
        {entries.map(([name, what, at, tone]) => (
          <div key={at} className="flex items-center gap-2.5 px-2.5 py-1.5">
            {tone === "ok" ? <ArrowDownToLine className="size-3 shrink-0 text-primary" aria-hidden /> : <AlertCircle className="size-3 shrink-0 text-destructive" aria-hidden />}
            <span className="min-w-0 flex-1">
              <span className="block truncate text-[10px] font-medium">{name}</span>
              <span className={cn("block text-[8px]", tone === "ok" ? "opacity-60" : "text-destructive")}>{what}</span>
            </span>
            <span className="text-[8px] tabular-nums opacity-60">{at}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
