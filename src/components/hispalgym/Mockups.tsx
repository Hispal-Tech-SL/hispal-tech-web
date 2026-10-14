import type { ReactNode } from "react";
import { Dumbbell, CalendarDays, CheckCircle2, Users, CreditCard, ShieldCheck, Search } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "primary" | "lime" | "sky";
const toneText: Record<Tone, string> = { primary: "text-primary", lime: "text-theme-lime", sky: "text-theme-sky" };
const toneBg: Record<Tone, string> = { primary: "bg-primary", lime: "bg-theme-lime", sky: "bg-theme-sky" };

export function Phone({ children, className, label }: { children: ReactNode; className?: string; label: string }) {
  return (
    <div role="img" aria-label={label} className={cn("relative mx-auto w-[260px] rounded-[2.6rem] bg-device p-2.5 shadow-device", className)}>
      <div className="absolute left-1/2 top-3.5 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-device" />
      <div className="h-[520px] overflow-hidden rounded-[2.1rem] bg-screen px-4 pb-4 pt-10 text-screen-foreground">{children}</div>
    </div>
  );
}

function QrGlyph() {
  // deterministic pseudo-QR pattern
  const cells = Array.from({ length: 121 }, (_, i) => ((i * 7919) % 13) % 3 !== 0);
  const finder = (r: number, c: number) => (r < 3 && c < 3) || (r < 3 && c > 7) || (r > 7 && c < 3);
  return (
    <div className="grid grid-cols-11 gap-[2px] rounded-xl bg-screen-foreground p-3">
      {cells.map((on, i) => {
        const r = Math.floor(i / 11), c = i % 11;
        return <span key={i} className={cn("aspect-square rounded-[1px]", finder(r, c) || on ? "bg-screen" : "bg-screen-foreground")} />;
      })}
    </div>
  );
}

export function QrScreen({ tone = "primary" }: { tone?: Tone }) {
  return (
    <div className="flex h-full flex-col">
      <p className="text-xs opacity-60">Hola, Laura</p>
      <p className="font-display text-lg font-bold">Tu carnet</p>
      <div className="mt-4"><QrGlyph /></div>
      <div className="mt-4 rounded-2xl bg-screen-foreground/10 p-3">
        <div className="flex items-center justify-between">
          <span className="text-xs opacity-70">Membresía</span>
          <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold text-screen", toneBg[tone])}>Activa</span>
        </div>
        <p className="mt-2 font-display text-2xl font-bold"><span className={toneText[tone]}>18</span> días restantes</p>
        <div className="mt-2 h-1.5 rounded-full bg-screen-foreground/15"><div className={cn("h-full w-2/5 rounded-full", toneBg[tone])} /></div>
        <div className="mt-2 flex justify-between text-[10px] opacity-60"><span>Inicio 01/03</span><span>Fin 31/03</span></div>
      </div>
      <div className={cn("mt-auto rounded-xl py-2.5 text-center text-sm font-bold text-screen", toneBg[tone])}>Renovar membresía</div>
    </div>
  );
}

export function RoutineScreen({ tone = "lime" }: { tone?: Tone }) {
  const ex = [["Sentadilla", "4 × 10"], ["Press banca", "4 × 8"], ["Remo con barra", "3 × 12"], ["Zancadas", "3 × 12"], ["Plancha", "3 × 45 s"]];
  return (
    <div className="flex h-full flex-col">
      <p className="text-xs opacity-60">Rutina de hoy</p>
      <p className="font-display text-lg font-bold">Fuerza, cuerpo completo</p>
      <ul className="mt-4 space-y-2">
        {ex.map(([n, s]) => (
          <li key={n} className="flex items-center gap-3 rounded-xl bg-screen-foreground/10 p-3">
            <Dumbbell className={cn("size-4", toneText[tone])} aria-hidden />
            <span className="flex-1 text-sm">{n}</span>
            <span className="text-xs opacity-70">{s}</span>
          </li>
        ))}
      </ul>
      <div className={cn("mt-auto rounded-xl py-2.5 text-center text-sm font-bold text-screen", toneBg[tone])}>Empezar</div>
    </div>
  );
}

export function ActivitiesScreen({ tone = "sky" }: { tone?: Tone }) {
  const days = ["L", "M", "X", "J", "V", "S", "D"];
  const cls = [["09:00", "Spinning", "Quedan plazas"], ["18:30", "Yoga", "Completo"], ["19:30", "Funcional", "Quedan plazas"], ["20:30", "Boxeo", "Quedan plazas"]];
  return (
    <div className="flex h-full flex-col">
      <p className="text-xs opacity-60">Actividades</p>
      <p className="font-display text-lg font-bold">Esta semana</p>
      <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px]">
        {days.map((d, i) => (
          <span key={d} className={cn("rounded-lg py-1.5", i === 2 ? cn(toneBg[tone], "font-bold text-screen") : "bg-screen-foreground/10")}>{d}</span>
        ))}
      </div>
      <ul className="mt-4 space-y-2">
        {cls.map(([h, n, s]) => (
          <li key={h} className="flex items-center gap-3 rounded-xl bg-screen-foreground/10 p-3">
            <CalendarDays className={cn("size-4", toneText[tone])} aria-hidden />
            <div className="flex-1"><p className="text-sm">{n}</p><p className="text-[10px] opacity-60">{h}</p></div>
            <span className="text-[10px] opacity-70">{s}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Desktop({ label, variant }: { label: string; variant: "staff" | "owner" }) {
  return (
    <div role="img" aria-label={label} className="overflow-hidden rounded-2xl border bg-card shadow-device">
      <div className="flex items-center gap-1.5 border-b bg-muted px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-destructive/70" /><span className="size-2.5 rounded-full bg-primary/70" /><span className="size-2.5 rounded-full bg-success/70" />
      </div>
      <div className="grid grid-cols-[110px_1fr] text-xs">
        <aside className="space-y-1 border-r bg-muted/50 p-3">
          {(variant === "staff" ? ["Clientes", "Cobros", "Accesos", "Actividades", "Rutinas"] : ["Resumen", "Ingresos", "Empleados", "Auditoría", "Ajustes"]).map((x, i) => (
            <div key={x} className={cn("rounded-md px-2 py-1.5", i === 0 ? "bg-primary font-semibold text-primary-foreground" : "text-muted-foreground")}>{x}</div>
          ))}
        </aside>
        <div className="p-4">
          {variant === "staff" ? (
            <>
              <div className="flex items-center gap-2 rounded-lg border px-2 py-1.5 text-muted-foreground"><Search className="size-3" aria-hidden />Buscar cliente</div>
              <div className="mt-3 space-y-2">
                {[["Laura M.", "Activa", "bg-success"], ["Javier R.", "Por vencer", "bg-primary"], ["Marta G.", "Vencida", "bg-destructive"], ["Pablo S.", "Pendiente", "bg-muted-foreground"]].map(([n, s, c]) => (
                  <div key={n} className="flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2">
                    <span className="flex items-center gap-2"><Users className="size-3 text-muted-foreground" aria-hidden />{n}</span>
                    <span className="flex items-center gap-1.5"><span className={cn("size-2 rounded-full", c)} />{s}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between rounded-lg border border-primary/40 bg-accent px-3 py-2 text-accent-foreground"><span className="flex items-center gap-2"><CreditCard className="size-3" aria-hidden />Cobro en mostrador</span><span className="font-semibold">Registrar</span></div>
            </>
          ) : (
            <>
              <div className="grid grid-cols-3 gap-2">
                {["Ingresos", "Altas", "Renovaciones"].map((k) => (
                  <div key={k} className="rounded-lg bg-muted/60 p-2"><p className="text-[10px] text-muted-foreground">{k}</p><div className="mt-1.5 h-2 w-3/4 rounded bg-primary/60" /></div>
                ))}
              </div>
              <div className="mt-3 flex h-20 items-end gap-1.5 rounded-lg bg-muted/60 p-2">
                {[40, 55, 35, 70, 60, 85, 75, 90].map((h, i) => <div key={i} className="flex-1 rounded-sm bg-primary" style={{ height: `${h}%` }} />)}
              </div>
              <div className="mt-3 space-y-1.5">
                {["Empleado cobró un pago", "Propietario archivó un cliente", "Empleado corrigió un pago"].map((a) => (
                  <div key={a} className="flex items-center gap-2 text-muted-foreground"><ShieldCheck className="size-3 text-primary" aria-hidden />{a}</div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export function AccessCard() {
  return (
    <div role="img" aria-label="Registro de accesos con entradas permitidas y denegadas" className="rounded-2xl border bg-card p-5 shadow-soft">
      <p className="font-display font-bold">Registro de accesos</p>
      <ul className="mt-4 space-y-2 text-sm">
        {[["07:12", "Laura M.", true], ["07:40", "Javier R.", true], ["08:05", "Marta G.", false], ["08:31", "Pablo S.", true]].map(([t, n, ok]) => (
          <li key={t as string} className="flex items-center justify-between rounded-lg bg-muted/60 px-3 py-2">
            <span className="text-muted-foreground">{t as string}</span><span className="flex-1 px-3">{n as string}</span>
            <span className={cn("flex items-center gap-1 text-xs font-semibold", ok ? "text-success" : "text-destructive")}><CheckCircle2 className="size-3.5" aria-hidden />{ok ? "Permitido" : "Denegado"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
