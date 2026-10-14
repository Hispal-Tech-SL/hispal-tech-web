import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  Clock, CreditCard, DoorOpen, Layers, Smartphone, QrCode, ArrowRight, Dumbbell, CalendarDays,
  LayoutDashboard, ShoppingBag, Lock, Landmark, FileCheck2, DatabaseBackup, IdCard, CheckCircle2, UserPlus, LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, QrScreen, RoutineScreen, ActivitiesScreen, Desktop, AccessCard } from "@/components/hispalgym/Mockups";
import { GymHeader, GymFooter } from "@/components/hispalgym/GymChrome";
import { sendEmailAlternative } from "@/services/emailService";

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && e.target.classList.add("is-visible")), { threshold: 0.12 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-sm font-bold uppercase tracking-widest text-primary">{children}</p>;
}
function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="reveal mx-auto max-w-2xl text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}

const HispalGym = () => {
  useReveal();
  useEffect(() => {
    window.scrollTo(0, 0);
    const prev = document.title;
    document.title = "Hispal GYM, software de gestión para gimnasios con acceso por QR";
    return () => { document.title = prev; };
  }, []);
  return (
    <div className="hispalgym min-h-screen overflow-x-hidden">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">Saltar al contenido</a>
      <GymHeader />
      <main id="main">
        <Hero />
        <Values />
        <Showcase />
        <Profiles />
        <HowItWorks />
        <Spotlights />
        <Shop />
        <AllInOne />
        <Trust />
        <Contact />
        <Faq />
      </main>
      <GymFooter />
    </div>
  );
};

export default HispalGym;

function Hero() {
  return (
    <section id="producto" className="relative overflow-hidden bg-hero-glow">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:grid-cols-[1.15fr_1fr] md:py-24">
        <div>
          <Eyebrow>Software de gestión para gimnasios</Eyebrow>
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] md:text-6xl">Gestiona tu gimnasio y <span className="text-primary">ábrelo las 24 horas</span> si quieres.</h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">Software de gestión con control de acceso por QR: cobros, membresías, rutinas y actividades en un solo sistema. Con recepción o sin ella, y si quieres abrir 24 horas, tus socios entran solos, pagan desde el móvil y tú lo ves todo desde un panel.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="font-semibold shadow-glow"><a href="#contacto">Solicitar demo</a></Button>
            <Button asChild size="lg" variant="secondary" className="font-semibold"><a href="#como-funciona">Ver cómo funciona <ArrowRight /></a></Button>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {[[Clock, "Abierto 24/7"], [CreditCard, "Cobros online"], [DoorOpen, "Acceso sin recepción"]].map(([I, t]) => {
              const Icon = I as typeof Clock;
              return <li key={t as string} className="flex items-center gap-2.5 text-sm font-semibold"><span className="grid size-9 place-items-center rounded-lg bg-accent text-accent-foreground"><Icon className="size-4" aria-hidden /></span>{t as string}</li>;
            })}
          </ul>
        </div>
        <div className="relative">
          <Phone label="App del socio con carnet QR y membresía activa con 18 días restantes" className="rotate-2 transition-transform duration-500 hover:rotate-0"><QrScreen /></Phone>
        </div>
      </div>
    </section>
  );
}

function IconCard({ icon: Icon, title, text, children }: { icon: typeof Clock; title: string; text: string; children?: ReactNode }) {
  return (
    <div className="reveal group rounded-2xl border bg-card p-6 shadow-soft transition hover:-translate-y-1 hover:border-primary/40">
      <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground transition group-hover:bg-primary group-hover:text-primary-foreground"><Icon className="size-5" aria-hidden /></span>
      <h3 className="mt-5 text-lg font-bold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{text}</p>
      {children}
    </div>
  );
}

function Values() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <SectionHead eyebrow="Por qué Hispal GYM" title="Gestión completa, con la opción de abrir sin personal en el local" />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <IconCard icon={Layers} title="Un solo sistema para todo" text="Membresías, pagos, accesos, rutinas y clases sin hojas de cálculo ni programas sueltos." />
        <IconCard icon={Smartphone} title="Alta y pago a cualquier hora" text="Tus socios se apuntan y pagan desde el móvil, sin pasar por recepción." />
        <IconCard icon={QrCode} title="Acceso sin personal" text="Carnet QR en el móvil. Quien tiene membresía vigente entra; quien no, queda registrado." />
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section className="bg-ink py-20 text-ink-foreground">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="La app del socio" title="Una app instalable, con los colores de tu gimnasio" sub="Se instala desde el navegador, sin pasar por tiendas de apps. Adapta el color al estilo de tu centro." />
        <div className="mt-14 flex snap-x gap-8 overflow-x-auto pb-6 md:justify-center md:overflow-visible">
          <div className="reveal snap-center shrink-0"><Phone label="Pantalla de membresía con carnet QR en tono naranja"><QrScreen tone="primary" /></Phone></div>
          <div className="reveal snap-center shrink-0 md:-translate-y-6"><Phone label="Pantalla de rutina de entrenamiento en tono lima"><RoutineScreen tone="lime" /></Phone></div>
          <div className="reveal snap-center shrink-0"><Phone label="Calendario de actividades en tono azul"><ActivitiesScreen tone="sky" /></Phone></div>
        </div>
      </div>
    </section>
  );
}

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((i) => <li key={i} className="flex gap-3 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />{i}</li>)}
    </ul>
  );
}

function Profiles() {
  const socio = ["Alta online 24/7 y pago con tarjeta desde el móvil", "Membresía con inicio, fin, días restantes y estado", "Renovar o encadenar un periodo sin perder días, o pagar hoy y empezar más adelante", "Carnet QR virtual para entrar y salir", "Historial de entradas, salidas, pagos y recibos", "Rutinas, actividades, eventos y espacios con reserva y aforo", "Promociones e invitar a un amigo", "Recordatorio por email antes de que venza la membresía"];
  const empleado = ["Listado y ficha de clientes con buscador y estado de membresía", "Cobro en mostrador: efectivo, tarjeta u otros", "Registro de fecha de pago, periodo y quién cobró", "Corrección de pagos con traza, sin perder el histórico", "Registro de accesos permitidos y denegados", "Gestión de actividades, eventos, espacios y rutinas"];
  const propietario = ["Todo lo del empleado", "Cuentas de empleados y roles", "Auditoría completa: quién hizo qué y cuándo", "Ingresos, altas, renovaciones y bajas de membresía", "Archivar clientes duplicados o antiguos conservando su histórico"];
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <SectionHead eyebrow="Un sistema, tres perfiles" title="Cada persona ve exactamente lo que necesita" />
      <Tabs defaultValue="socio" className="reveal mt-10">
        <TabsList className="mx-auto grid h-auto w-full max-w-md grid-cols-3 rounded-xl p-1">
          <TabsTrigger value="socio" className="rounded-lg py-2 font-semibold">Socio</TabsTrigger>
          <TabsTrigger value="empleado" className="rounded-lg py-2 font-semibold">Empleado</TabsTrigger>
          <TabsTrigger value="propietario" className="rounded-lg py-2 font-semibold">Propietario</TabsTrigger>
        </TabsList>
        <TabsContent value="socio" className="mt-10 animate-in fade-in-50">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div><h3 className="text-2xl font-bold">App web instalable en el móvil</h3><p className="mb-6 mt-2 text-muted-foreground">Todo lo que el socio necesita, sin llamar ni pasar por recepción.</p><Checklist items={socio} /></div>
            <Phone label="App del socio con rutina de entrenamiento"><RoutineScreen tone="primary" /></Phone>
          </div>
        </TabsContent>
        <TabsContent value="empleado" className="mt-10 animate-in fade-in-50">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div><h3 className="text-2xl font-bold">Panel de mostrador</h3><p className="mb-6 mt-2 text-muted-foreground">Clientes, cobros y accesos en una sola pantalla.</p><Checklist items={empleado} /></div>
            <Desktop variant="staff" label="Panel del empleado con listado de clientes y estado de membresía" />
          </div>
        </TabsContent>
        <TabsContent value="propietario" className="mt-10 animate-in fade-in-50">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div><h3 className="text-2xl font-bold">Visión completa del negocio</h3><p className="mb-6 mt-2 text-muted-foreground">Control total de equipo, configuración y estadísticas.</p><Checklist items={propietario} /></div>
            <Desktop variant="owner" label="Panel del propietario con ingresos, gráfico y auditoría" />
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}

function HowItWorks() {
  const steps = [[UserPlus, "El socio se da de alta y paga desde el móvil", "A cualquier hora, con pasarela bancaria segura."], [IdCard, "Recibe su carnet QR", "Al instante, en su app. Sin tarjetas físicas."], [LogIn, "Entra y sale solo; tú lo ves todo en el panel", "Cada acceso queda registrado, permitido o denegado."]] as const;
  return (
    <section id="como-funciona" className="bg-muted/60 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="Cómo funciona" title="Tres pasos y tu gimnasio funciona solo" />
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map(([Icon, t, d], i) => (
            <li key={t} className="reveal relative rounded-2xl border bg-card p-6 shadow-soft">
              <span className="font-display text-5xl font-extrabold text-primary/25">0{i + 1}</span>
              <Icon className="absolute right-6 top-6 size-6 text-primary" aria-hidden />
              <h3 className="mt-3 text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Spotlight({ eyebrow, title, text, points, visual, flip, link }: { eyebrow: string; title: string; text: string; points: string[]; visual: ReactNode; flip?: boolean; link: string }) {
  return (
    <div className="reveal grid items-center gap-10 md:grid-cols-2 md:gap-16">
      <div className={flip ? "md:order-2" : ""}>{visual}</div>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h3 className="mt-3 text-2xl font-extrabold md:text-3xl">{title}</h3>
        <p className="mt-3 text-muted-foreground">{text}</p>
        <div className="mt-6"><Checklist items={points} /></div>
        <a href="#contacto" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">{link} <ArrowRight className="size-4" aria-hidden /></a>
      </div>
    </div>
  );
}

function Spotlights() {
  return (
    <section id="funcionalidades" className="mx-auto max-w-6xl space-y-24 px-4 py-24">
      <Spotlight eyebrow="Pagos y membresías" title="Sin sorpresas en el recibo" text="No hay cobros automáticos. El socio paga cuando decide, el gimnasio sabe exactamente quién tiene acceso y hasta cuándo." points={["Cada pago compra un periodo de acceso", "Encadena periodos sin perder días", "Promociones para los primeros ciclos"]} link="Ver pagos en la demo" visual={<Phone label="Membresía activa con días restantes y botón de renovar"><QrScreen /></Phone>} />
      <Spotlight flip eyebrow="Control de acceso con QR" title="Tu puerta sabe quién puede entrar" text="Integración con lectores QR y torno o puerta. Con membresía vigente se entra; si no, se deniega y queda registrado." points={["Sin recepcionista presente", "Registro de entradas y salidas por hora", "Accesos denegados visibles en el panel"]} link="Consultar hardware compatible" visual={<AccessCard />} />
      <Spotlight eyebrow="Rutinas y actividades" title="Entrenamiento y clases en el bolsillo" text="Rutinas con ejercicios, series y repeticiones. Clases dirigidas, eventos y espacios con aforo y reservas." points={["Rutinas consultables desde el móvil", "Reservas con control de aforo", "Gestión desde el panel de mostrador"]} link="Ver actividades en la demo" visual={<Phone label="Calendario semanal de clases dirigidas"><ActivitiesScreen tone="primary" /></Phone>} />
      <Spotlight flip eyebrow="Panel de gestión y auditoría" title="Todo lo que pasa, con nombre y hora" text="Ingresos, altas y renovaciones de un vistazo. Cada acción queda registrada para saber quién hizo qué y cuándo." points={["Roles para empleados y propietario", "Pagos corregidos con traza", "Clientes archivados sin perder historial"]} link="Ver el panel en la demo" visual={<Desktop variant="owner" label="Panel con estadísticas de ingresos y registro de auditoría" />} />
    </section>
  );
}

function Shop() {
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20">
      <div className="reveal relative overflow-hidden rounded-3xl bg-ink p-8 text-ink-foreground md:p-14">
        <div className="absolute inset-0 bg-hero-glow" aria-hidden />
        <div className="relative grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div>
            <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">Próximamente</span>
            <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">Módulo de tienda</h2>
            <p className="mt-3 max-w-xl opacity-80">Vende suplementos y productos del gimnasio desde la propia app del socio, con carrito y pago integrado. Ofrece rutinas de pago y productos adicionales como nuevas fuentes de ingreso.</p>
          </div>
          <ShoppingBag className="size-24 text-primary md:size-32" aria-hidden />
        </div>
      </div>
    </section>
  );
}

function AllInOne() {
  const items = [[CreditCard, "Pagos online", "Pago con tarjeta desde el móvil y cobro en mostrador."], [IdCard, "Membresías", "Estados claros: activa, por vencer, vencida o pendiente."], [QrCode, "Control de acceso", "Lectores QR, torno o puerta, con registro completo."], [Dumbbell, "Rutinas", "Ejercicios, series y repeticiones en la app."], [CalendarDays, "Actividades y eventos", "Clases, eventos y espacios con aforo y reservas."], [LayoutDashboard, "Panel y auditoría", "Estadísticas, roles y trazabilidad de cada acción."]] as const;
  return (
    <section className="bg-muted/60 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="Software todo en uno" title="Todo lo que tu gimnasio necesita" />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([I, t, d]) => (
            <IconCard key={t} icon={I} title={t} text={d}>
              <a href="#contacto" className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline">Saber más <ArrowRight className="size-4" aria-hidden /><span className="sr-only">sobre {t}</span></a>
            </IconCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const items = [[Lock, "Datos protegidos", "Acceso por roles y comunicaciones cifradas."], [Landmark, "Pasarela bancaria certificada", "Los pagos con tarjeta se procesan con una pasarela bancaria segura."], [FileCheck2, "Cumplimiento RGPD", "Tratamiento de datos conforme a la normativa europea."], [DatabaseBackup, "Copias de seguridad", "Copias automáticas para que no pierdas nada."]] as const;
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <SectionHead eyebrow="Confianza" title="Seguro para ti y para tus socios" />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(([Icon, t, d]) => (
          <div key={t} className="reveal text-center">
            <span className="mx-auto grid size-12 place-items-center rounded-full bg-accent text-accent-foreground"><Icon className="size-5" aria-hidden /></span>
            <h3 className="mt-4 font-bold">{t}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

type Errors = Partial<Record<"nombre" | "gimnasio" | "email" | "telefono", string>>;

function Contact() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [failed, setFailed] = useState(false);
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const v = (k: string) => String(f.get(k) ?? "").trim();
    const err: Errors = {};
    if (v("nombre").length < 2) err.nombre = "Indica tu nombre.";
    if (v("gimnasio").length < 2) err.gimnasio = "Indica el nombre de tu gimnasio.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v("email"))) err.email = "Introduce un email válido.";
    if (!/^[+\d\s]{9,15}$/.test(v("telefono"))) err.telefono = "Introduce un teléfono válido.";
    setErrors(err);
    if (Object.keys(err).length > 0) return;
    setSending(true);
    setFailed(false);
    const ok = await sendEmailAlternative({
      name: v("nombre"),
      email: v("email"),
      phone: v("telefono"),
      company: v("gimnasio"),
      project: "Hispal GYM (demo)",
      budget: "",
      timeline: "",
      description: v("mensaje") || "Solicitud de demo de Hispal GYM",
      newsletter: false,
    });
    setSending(false);
    if (ok) setSent(true);
    else setFailed(true);
  };
  const field = (id: keyof Errors, label: string, type = "text", auto?: string) => (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} name={id} type={type} autoComplete={auto} aria-invalid={!!errors[id]} aria-describedby={errors[id] ? `${id}-err` : undefined} className="mt-1.5 h-11 bg-background" />
      {errors[id] && <p id={`${id}-err`} className="mt-1 text-xs text-destructive">{errors[id]}</p>}
    </div>
  );
  return (
    <section id="contacto" className="bg-ink py-20 text-ink-foreground">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2">
        <div className="reveal">
          <Eyebrow>Contacto</Eyebrow>
          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Reserva una llamada de introducción sin compromiso</h2>
          <p className="mt-4 opacity-80">Te enseñamos Hispal GYM con tu caso concreto y resolvemos tus dudas sobre puesta en marcha, hardware de acceso y migración de clientes.</p>
        </div>
        <div className="reveal rounded-2xl bg-card p-6 text-card-foreground shadow-soft md:p-8">
          {sent ? (
            <div role="status" className="py-10 text-center">
              <CheckCircle2 className="mx-auto size-12 text-success" aria-hidden />
              <h3 className="mt-4 text-xl font-bold">Solicitud recibida</h3>
              <p className="mt-2 text-sm text-muted-foreground">Gracias. Te contactaremos en breve para concretar la llamada.</p>
            </div>
          ) : (
            <form noValidate onSubmit={onSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">{field("nombre", "Nombre", "text", "name")}{field("gimnasio", "Gimnasio", "text", "organization")}</div>
              <div className="grid gap-4 sm:grid-cols-2">{field("email", "Email", "email", "email")}{field("telefono", "Teléfono", "tel", "tel")}</div>
              <div><Label htmlFor="mensaje">Mensaje (opcional)</Label><Textarea id="mensaje" name="mensaje" rows={4} className="mt-1.5 bg-background" /></div>
              {failed && <p role="alert" className="text-sm text-destructive">No se pudo enviar la solicitud. Inténtalo de nuevo.</p>}
              <Button type="submit" size="lg" disabled={sending} className="w-full font-semibold">{sending ? "Enviando..." : "Solicitar demo"}</Button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const qa = [
    ["¿Cómo se instala la app del socio?", "Es una app web instalable. El socio abre el enlace de tu gimnasio en el navegador del móvil y la añade a su pantalla de inicio en un par de toques."],
    ["¿Hace falta publicarla en tiendas de apps?", "No. Al ser una app web instalable, no pasa por tiendas de apps ni necesita actualizaciones manuales."],
    ["¿Qué hardware de acceso es compatible?", "Lectores de código QR conectados a torno o puerta. Revisamos contigo tu instalación actual durante la llamada de introducción."],
    ["¿Se cobra automáticamente a los socios?", "No. No hay cobros automáticos. Cada pago compra un periodo de acceso y termina. El socio renueva cuando quiere, pagando de nuevo."],
    ["¿Cómo se pagan las membresías?", "Online con tarjeta desde la app, a través de una pasarela bancaria segura, o en el mostrador en efectivo, tarjeta u otros métodos."],
    ["¿Qué pasa si falla la conexión?", "Lo analizamos contigo según tu instalación de acceso para definir cómo debe comportarse la puerta y que todo quede registrado al recuperar la conexión."],
    ["¿Quién ve los datos de los socios?", "Solo las personas autorizadas de tu gimnasio, según su rol. El socio ve únicamente sus propios datos."],
    ["¿Cuánto tarda la puesta en marcha?", "Depende del tamaño del centro y del hardware de acceso. Te damos un plan concreto tras la llamada de introducción."],
    ["¿Puedo migrar mi base de clientes actual?", "Sí. Te ayudamos a importar tus clientes para que empieces sin volver a dar de alta a nadie."],
  ];
  return (
    <section id="preguntas" className="mx-auto max-w-3xl px-4 py-20">
      <SectionHead eyebrow="Preguntas frecuentes" title="Resolvemos tus dudas" />
      <Accordion type="single" collapsible className="reveal mt-10">
        {qa.map(([q, a], i) => (
          <AccordionItem key={q} value={`q${i}`}>
            <AccordionTrigger className="text-left font-display text-base font-semibold">{q}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
