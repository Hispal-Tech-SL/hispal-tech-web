import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  CreditCard, Layers, Smartphone, QrCode, ArrowRight, Dumbbell, CalendarDays, Bell, UserCog,
  LayoutDashboard, ShoppingBag, Lock, Landmark, DatabaseBackup, IdCard, CheckCircle2, UserPlus, LogIn,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Phone, PanelFrame, QrScreen, MembershipScreen, RoutinesScreen, RoutineDetailScreen, TariffsScreen,
  CashPanel, PaymentsPanel, AccessPanel, CustomerPanel,
} from "@/components/hispalgym/Mockups";
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
    // Hispal GYM favicon while this page is open (the rest of the site keeps the Hispal Tech one)
    const icons = Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="apple-touch-icon"]'));
    const original = icons.map((l) => [l, l.getAttribute("href")] as const);
    icons.forEach((l) => l.setAttribute("href", l.rel === "apple-touch-icon" ? "/hispalgym/favicon-180.png" : "/hispalgym/favicon-32.png"));
    return () => {
      document.title = prev;
      original.forEach(([l, href]) => href && l.setAttribute("href", href));
    };
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
        <Roadmap />
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
          <h1 className="mt-4 text-4xl font-extrabold leading-[1.05] md:text-6xl">Gestiona tu gimnasio y da a tus socios <span className="text-primary">acceso autónomo con QR</span>.</h1>
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">Software de gestión con control de acceso por QR: membresías, cobros, rutinas y accesos en un solo sistema. Tus socios se dan de alta, pagan con tarjeta desde el móvil y entran con su carnet QR; tú controlas clientes, cobros y accesos desde un panel.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="font-semibold shadow-glow"><a href="#contacto">Solicitar demo</a></Button>
            <Button asChild size="lg" variant="secondary" className="font-semibold"><a href="#como-funciona">Ver cómo funciona <ArrowRight /></a></Button>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {[[CreditCard, "Alta y pago online"], [QrCode, "Carnet QR en el móvil"], [LayoutDashboard, "Panel de gestión"]].map(([I, t]) => {
              const Icon = I as typeof CreditCard;
              return <li key={t as string} className="flex items-center gap-2.5 text-sm font-semibold"><span className="grid size-9 place-items-center rounded-lg bg-accent text-accent-foreground"><Icon className="size-4" aria-hidden /></span>{t as string}</li>;
            })}
          </ul>
        </div>
        <div className="relative">
          <Phone label="App del socio con el carnet QR de acceso al gimnasio" className="rotate-2 transition-transform duration-500 will-change-transform hover:rotate-0"><QrScreen /></Phone>
        </div>
      </div>
    </section>
  );
}

function IconCard({ icon: Icon, title, text, children }: { icon: typeof CreditCard; title: string; text: string; children?: ReactNode }) {
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
      <SectionHead eyebrow="Por qué Hispal GYM" title="Gestión completa, con acceso autónomo para tus socios" />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <IconCard icon={Layers} title="Un solo sistema para todo" text="Membresías, pagos, accesos y rutinas sin hojas de cálculo ni programas sueltos." />
        <IconCard icon={Smartphone} title="Alta y pago a cualquier hora" text="Tus socios se apuntan y pagan con tarjeta desde el móvil, sin pasar por recepción." />
        <IconCard icon={QrCode} title="Acceso con QR antifraude" text="El código del carnet cambia cada 4 segundos y la membresía se comprueba en el momento de entrar." />
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section className="bg-ink py-20 text-ink-foreground">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="La app del socio" title="Una app instalable en el móvil de tus socios" sub="Se instala desde el navegador, sin pasar por tiendas de apps. Membresía, carnet QR y rutinas en un mismo sitio." />
        <div className="mt-14 flex snap-x gap-8 overflow-x-auto pb-6 md:justify-center md:overflow-visible">
          <div className="reveal snap-center shrink-0"><Phone label="Pantalla de membresía con tarifa, fechas, días restantes y botón para pagar el siguiente periodo"><MembershipScreen /></Phone></div>
          <div className="reveal snap-center shrink-0 md:-translate-y-6"><Phone label="Pantalla del carnet QR de acceso al gimnasio"><QrScreen /></Phone></div>
          <div className="reveal snap-center shrink-0"><Phone label="Lista de rutinas de entrenamiento con sus días y número de ejercicios"><RoutinesScreen /></Phone></div>
        </div>
        <p className="mx-auto mt-6 max-w-xl text-center text-xs opacity-60">Pantallas de la app con datos ficticios. El nombre, el logo y los colores se adaptan a tu centro bajo proyecto.</p>
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
  const socio = ["Alta online 24/7 y pago con tarjeta desde el móvil", "Membresía con fecha de inicio y fin, días restantes y estado", "Renovar o encadenar un periodo sin perder días, o pagar hoy y empezar más adelante", "Carnet QR virtual para entrar", "Rutinas con ejercicios, series, repeticiones y entrenamiento guiado", "Buzón de avisos y notificaciones push", "Recordatorio por email antes de que venza la membresía"];
  const empleado = ["Listado y ficha de clientes con buscador y estado de membresía", "Cobro en mostrador: efectivo o tarjeta en datáfono", "Registro de fecha de pago, periodo y quién cobró", "Corrección de pagos con traza, sin perder el histórico", "Registro de entradas con aviso de accesos sospechosos", "Gestión de rutinas y asignación a los socios"];
  const propietario = ["Todo lo del empleado", "Libro de pagos: ingresos por día, semana, mes o año, con reparto online y presencial", "Roles diferenciados: el empleado no ve los ingresos", "Cada pago muestra quién lo registró", "Archivar clientes duplicados o antiguos conservando su histórico"];
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
            <Phone label="App del socio con su membresía activa y los días que le quedan"><MembershipScreen /></Phone>
          </div>
        </TabsContent>
        <TabsContent value="empleado" className="mt-10 animate-in fade-in-50">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div><h3 className="text-2xl font-bold">Panel de mostrador</h3><p className="mb-6 mt-2 text-muted-foreground">Clientes, cobros y accesos desde un panel que se adapta al ordenador, la tablet y el móvil.</p><Checklist items={empleado} /></div>
            <PanelFrame label="Panel del empleado registrando un pago en mostrador, en efectivo o con tarjeta en datáfono"><CashPanel /></PanelFrame>
          </div>
        </TabsContent>
        <TabsContent value="propietario" className="mt-10 animate-in fade-in-50">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div><h3 className="text-2xl font-bold">Visión completa del negocio</h3><p className="mb-6 mt-2 text-muted-foreground">Ingresos y control de lo que pasa en el gimnasio.</p><Checklist items={propietario} /></div>
            <PanelFrame label="Libro de pagos del propietario con total ingresado y reparto entre online y presencial"><PaymentsPanel /></PanelFrame>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}

function HowItWorks() {
  const steps = [[UserPlus, "El socio se da de alta y paga desde el móvil", "A cualquier hora, con tarjeta en la pasarela bancaria Redsys."], [IdCard, "Crea su cuenta y recibe su carnet QR", "Tras el pago crea su contraseña y ya lo tiene en el móvil. Sin tarjetas físicas."], [LogIn, "Entra con su QR; tú lo ves en el panel", "Cada entrada concedida queda registrada con fecha y hora."]] as const;
  return (
    <section id="como-funciona" className="bg-muted/60 py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="Cómo funciona" title="Tres pasos, sin pasar por recepción" />
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
      <Spotlight eyebrow="Pagos y membresías" title="Sin sorpresas en el recibo" text="No hay cobros automáticos. El socio paga cuando decide, el gimnasio sabe exactamente quién tiene acceso y hasta cuándo." points={["Cada pago compra un periodo de acceso", "Encadena periodos sin perder días, o empieza más adelante", "Paga varios meses de una vez, hasta 12"]} link="Ver pagos en la demo" visual={<Phone label="Pantalla de alta online con la parrilla de tarifas, cada una con su periodo de acceso"><TariffsScreen /></Phone>} />
      <Spotlight flip eyebrow="Control de acceso con QR" title="Tu puerta sabe quién puede entrar" text="Integrado con lectores y controladoras Kimaldi. Con membresía vigente se entra; si no, se deniega." points={["El QR cambia cada 4 segundos y solo funciona en un dispositivo", "El socio recupera su QR en un móvil nuevo sin pasar por recepción", "Registro de entradas con aviso de accesos sospechosos"]} link="Consultar hardware compatible" visual={<PanelFrame label="Registro de accesos del panel, con entradas agrupadas por día y botón para abrir la puerta"><AccessPanel /></PanelFrame>} />
      <Spotlight eyebrow="Rutinas de entrenamiento" title="Entrenamiento en el bolsillo" text="Crea rutinas desde el panel y asígnalas a todos tus socios o solo a algunos. El socio las sigue desde el móvil." points={["Ejercicios con series, repeticiones, descanso y superseries", "Entrenamiento guiado con temporizador", "Aviso al socio cuando le asignas una rutina"]} link="Ver rutinas en la demo" visual={<Phone label="Detalle de una rutina con sus días de entrenamiento y los ejercicios de cada uno"><RoutineDetailScreen /></Phone>} />
      <Spotlight flip eyebrow="Panel de gestión" title="Cobros corregidos, con traza" text="Cada pago muestra quién lo registró y cuándo. Si el mostrador se equivoca, se corrige sin perder el histórico." points={["Roles diferenciados para empleado y propietario", "Pagos corregidos con motivo y posibilidad de restaurar", "Clientes archivados sin perder historial"]} link="Ver el panel en la demo" visual={<PanelFrame label="Ficha de cliente con sus datos, membresía activa y pagos realizados, con quién los registró"><CustomerPanel /></PanelFrame>} />
    </section>
  );
}

function Roadmap() {
  const items = [[CalendarDays, "Clases, eventos y espacios", "Agenda, reservas y aforo desde la app del socio."], [UserCog, "Gestión de empleados", "Altas, roles y accesos del equipo desde el panel."], [ShoppingBag, "Módulo de tienda", "Productos del gimnasio como nueva fuente de ingresos."]] as const;
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20">
      <div className="reveal relative overflow-hidden rounded-3xl bg-ink p-8 text-ink-foreground md:p-14">
        <div className="absolute inset-0 bg-hero-glow" aria-hidden />
        <div className="relative">
          <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">Próximamente</span>
          <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">Lo que viene</h2>
          <p className="mt-3 max-w-xl opacity-80">Estamos construyendo estos módulos. Si alguno te interesa, cuéntanoslo en la llamada de introducción.</p>
          <ul className="mt-8 grid gap-4 md:grid-cols-3">
            {items.map(([Icon, t, d]) => (
              <li key={t} className="rounded-2xl border border-ink-foreground/15 bg-ink-foreground/5 p-5">
                <Icon className="size-6 text-primary" aria-hidden />
                <h3 className="mt-3 font-bold">{t}</h3>
                <p className="mt-1 text-sm opacity-75">{d}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function AllInOne() {
  const items = [[CreditCard, "Pagos online", "Pago con tarjeta desde el móvil y cobro en mostrador, en efectivo o con datáfono."], [IdCard, "Membresías", "Estados claros: activa, sin empezar, vencida o sin pago."], [QrCode, "Control de acceso", "Lectores QR Kimaldi con torno o puerta, y registro de entradas."], [Dumbbell, "Rutinas", "Ejercicios, series y repeticiones en la app, con modo guiado."], [Bell, "Avisos al socio", "Email, buzón y notificaciones push: vencimientos, pagos y rutinas."], [LayoutDashboard, "Panel de gestión", "Clientes, cobros, accesos e ingresos, con roles de empleado y propietario."]] as const;
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
  const items = [[Lock, "Datos protegidos", "Acceso por roles y conexión cifrada. El socio solo ve sus propios datos."], [Landmark, "Pago con Redsys", "Los pagos con tarjeta se hacen en la pasarela bancaria Redsys: los datos de tu tarjeta no pasan por el gimnasio."], [QrCode, "QR antifraude", "Un solo dispositivo por socio y un código que cambia cada 4 segundos."], [DatabaseBackup, "Copias de seguridad", "Copias automáticas y cifradas cada 6 horas."]] as const;
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
    ["¿Qué hardware de acceso es compatible?", "Hoy trabajamos con controladoras y lectores QR de Kimaldi, con una puerta o torno por instalación. Otros lectores son posibles bajo proyecto. Revisamos contigo tu instalación durante la llamada de introducción."],
    ["¿Se cobra automáticamente a los socios?", "No. No hay cobros automáticos. Cada pago compra un periodo de acceso y termina. El socio renueva cuando quiere, pagando de nuevo."],
    ["¿Cómo se pagan las membresías?", "Online con tarjeta desde la app, en la pasarela bancaria Redsys, o en el mostrador en efectivo o con tarjeta en datáfono."],
    ["¿Puedo abrir 24 horas sin personal?", "El flujo no necesita a nadie: alta online, pago, carnet QR y torno. Aun así, hoy no hay control de aforo ni de franjas horarias, la salida no se registra y, si cae la conexión, el torno no abre. Lo valoramos contigo según tu centro."],
    ["¿Qué pasa si falla la conexión?", "Por seguridad, no se valida ninguna entrada sin conexión: el torno no abre y la pantalla indica que pases por recepción. Conviene tener un plan de contingencia para esos casos y lo definimos contigo."],
    ["¿Se puede personalizar con la marca de mi gimnasio?", "Sí, bajo proyecto. Nombre, logo y colores se adaptan a tu centro durante la puesta en marcha; no es un ajuste que cambies tú mismo desde el panel."],
    ["¿Quién ve los datos de los socios?", "Solo las personas autorizadas de tu gimnasio, según su rol. El socio ve únicamente sus propios datos."],
    ["¿Cuánto tarda la puesta en marcha?", "Depende del tamaño del centro y del hardware de acceso. Te damos un plan concreto tras la llamada de introducción."],
    ["¿Puedo migrar mi base de clientes actual?", "Sí, como servicio de puesta en marcha: preparamos la migración a medida desde tu sistema actual para que no tengas que dar de alta a nadie a mano."],
    ["¿Las pantallas que se ven son reales?", "Reproducen fielmente las pantallas de la app que ya usa Premium GYM, el gimnasio sobre el que se ha construido Hispal GYM, con la marca de Hispal GYM y datos ficticios."],
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
