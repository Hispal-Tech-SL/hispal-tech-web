import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  Bell, Menu, Home, QrCode, User, ChevronRight, RefreshCw, Info, X, ArrowLeft, Dumbbell, Euro, SlidersHorizontal, DoorOpen, Pencil, Trash2, Search,
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
    <Fit width={PANEL_W} className={cn("mx-auto w-full max-w-[460px]", className)}>
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
      <div className="flex-1 pt-4">{children}</div>
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
