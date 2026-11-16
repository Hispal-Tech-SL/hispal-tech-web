import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  CreditCard, QrCode, ArrowRight, CalendarDays, UserCog, LayoutDashboard, ShoppingBag, Lock, Landmark, DatabaseBackup, IdCard, CheckCircle2, ScanFace, Users, KeyRound, Lightbulb, Wrench, Layers, Smartphone, ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Phone, PanelFrame, QrScreen, MembershipScreen, TariffsScreen, RoutineDetailScreen, ShopScreen, ShopOrderScreen, ClassesScreen,
  PaymentsPanel, DomoticaScreen, TracePanel,
} from "@/components/hispalgym/Mockups";
import { AccessScene, SensorAlarm, OpeningHours, GymFacade } from "@/components/hispalgym/Illustrations";
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
  return <p className="text-xs font-bold uppercase tracking-widest text-primary sm:text-sm">{children}</p>;
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="reveal mx-auto max-w-2xl text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-3 text-2xl font-extrabold sm:text-3xl md:text-4xl">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground [.bg-ink_&]:text-ink-foreground/75">{sub}</p>}
    </div>
  );
}

const HispalGym = () => {
  useReveal();
  useEffect(() => {
    window.scrollTo(0, 0);
    const prev = document.title;
    document.title = "Hispal GYM, acceso autónomo y gestión para gimnasios sin recepción";
    // Hispal GYM favicon while this page is open (the rest of the site keeps the Hispal Network one)
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
        <Access />
        <Comparison />
        <CostBand />
        <Features />
        <Profiles />
        <Custom />
        <CaseStudy />
        <Packs />
        <Trust />
        <Faq />
        <Contact />
      </main>
      <GymFooter />
    </div>
  );
};

export default HispalGym;

function Hero() {
  return (
    <section id="producto" className="relative overflow-hidden bg-ink text-ink-foreground">
      <div className="absolute inset-0 bg-hero-glow opacity-70" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-8 px-4 pb-12 pt-9 md:grid-cols-[1.1fr_1fr] md:gap-12 md:py-24">
        <div>
          <Eyebrow>Acceso autónomo para gimnasios</Eyebrow>
          <h1 className="mt-3 text-[2rem] font-extrabold leading-[1.08] tracking-tight sm:text-5xl md:text-6xl">Abre tu gimnasio las horas que quieras, <span className="text-primary">sin nadie en recepción</span>.</h1>
          <p className="mt-4 max-w-xl text-base opacity-80 md:text-lg">El software que abre y controla la puerta con el móvil del socio, y gestiona los cobros, la tienda, las clases y tu equipo.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="w-full font-semibold shadow-glow sm:w-auto"><a href="#contacto">Solicitar demo</a></Button>
            <Button asChild size="lg" variant="outline" className="w-full border-primary bg-transparent font-semibold text-primary hover:bg-primary hover:text-primary-foreground sm:w-auto"><a href="#acceso">Ver cómo funciona <ArrowRight /></a></Button>
          </div>
          <ul className="mt-6 flex flex-wrap gap-2">
            {[[CreditCard, "Cobros online"], [QrCode, "QR, cara y sensor"], [LayoutDashboard, "Panel de gestión"]].map(([I, t]) => {
              const Icon = I as typeof CreditCard;
              return <li key={t as string} className="flex items-center gap-2 rounded-full border border-ink-foreground/15 bg-ink-foreground/5 py-1.5 pl-2 pr-3.5 text-xs font-semibold sm:text-sm"><Icon className="size-4 text-primary" aria-hidden />{t as string}</li>;
            })}
          </ul>
        </div>
        <div className="relative mx-auto w-full max-w-md md:max-w-none md:pb-14">
          <GymFacade className="rounded-3xl shadow-device" />
          <div className="pointer-events-none absolute -bottom-2 -right-2 hidden origin-bottom-right rotate-3 scale-[0.5] md:block"><Phone label="App del socio con el código QR de acceso al gimnasio"><QrScreen /></Phone></div>
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <SectionHead eyebrow="Todo en un solo sistema" title="Cobra. Abre. Vende. Sin nadie en la puerta." sub="Control total de quién entra y quién sale, con cámara y sensor de conteo, y alarma si pasa más de una persona." />
      <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-3 md:gap-6">
        <IconCard icon={CreditCard} title="Cobra" text="Tarjeta, Bizum y efectivo. Tus socios se apuntan y pagan desde el móvil, a cualquier hora, y todo queda registrado." />
        <IconCard icon={QrCode} title="Abre" text="QR que cambia cada 4 segundos, cara que confirma al titular y un sensor que cuenta quién cruza." />
        <IconCard icon={ShoppingBag} title="Vende" text="Una tienda dentro de la app: el socio compra y paga cuando quiere, con su factura, y recoge con su QR." />
      </div>
    </section>
  );
}

function Access() {
  const layers = [
    [QrCode, "1 · Identificación (QR)", "Un código QR dinámico en el móvil del socio: cambia cada 4 segundos y solo funciona en un dispositivo. La membresía se comprueba en cada entrada."],
    [ScanFace, "2 · Verificación facial", "Tras el QR, el terminal confirma que quien lo presenta es su titular, con protección contra fotos y vídeos. Un QR prestado deja de valer."],
    [Users, "3 · Sensor de conteo", "Un sensor sobre la puerta cuenta cada persona que cruza. Una identificación, una persona: si pasa más de una, salta una alarma."],
  ] as const;
  return (
    <section id="acceso" className="bg-ink py-14 text-ink-foreground md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="Acceso autónomo" title="Tu puerta sabe quién entra, quién sale y cuántos pasan" sub="Sin tarjetas físicas y sin torno obligatorio: se instala sobre tu puerta. Si prefieres torno, también te lo suministramos e integramos." />
        <div className="mt-10 grid gap-4 md:mt-12 md:grid-cols-3 md:gap-6">
          {layers.map(([Icon, t, d]) => (
            <div key={t} className="reveal rounded-2xl border border-ink-foreground/15 bg-ink-foreground/5 p-5 md:p-6">
              <Icon className="size-7 text-primary" aria-hidden />
              <h3 className="mt-3 text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm opacity-80">{d}</p>
            </div>
          ))}
        </div>
        <div className="reveal mt-12 grid items-center gap-8 md:mt-16 md:grid-cols-2 md:gap-12">
          <AccessScene className="rounded-2xl" />
          <div>
            <Eyebrow>Tú eliges</Eyebrow>
            <h3 className="mt-3 text-2xl font-extrabold md:text-3xl">Cada centro decide cómo entra su gente</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {[[QrCode, "Solo QR"], [ScanFace, "Solo cara"], [ShieldCheck, "QR + cara: máxima seguridad"], [KeyRound, "PIN o tarjeta, opcional según el centro"]].map(([I, t]) => {
                const Icon = I as typeof QrCode;
                return <li key={t as string} className="flex items-center gap-3"><Icon className="size-4 shrink-0 text-primary" aria-hidden />{t as string}</li>;
              })}
            </ul>
            <p className="mt-5 rounded-xl bg-primary/15 p-3 text-sm font-semibold">Lo recomendado: QR + cara + sensor de conteo.</p>
          </div>
        </div>
        <div className="reveal mt-12 grid items-center gap-8 md:mt-16 md:grid-cols-2 md:gap-12">
          <div className="md:order-2"><SensorAlarm className="rounded-2xl" /></div>
          <div>
            <Eyebrow>Contador de personas</Eyebrow>
            <h3 className="mt-3 text-2xl font-extrabold md:text-3xl">Una identificación, una persona</h3>
            <p className="mt-3 opacity-80">Un sensor sobre la puerta cuenta a cada persona que cruza y lo cruza con el código QR leído. Es la alternativa más económica a un torno.</p>
            <ul className="mt-5 space-y-3 text-sm">
              {["Si pasa más de una por un solo acceso, salta una alarma en la aplicación y por los altavoces del local", "Sabes quién abrió, a qué hora y cuántas personas pasaron, y puedes hablar con ese socio", "Entradas, salidas y personas dentro en el panel, con las acompañadas marcadas en rojo"].map((t) => (
                <li key={t} className="flex gap-3"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

type Feature = { id: string; label: string; icon: typeof CreditCard; title: string; text: string; points: string[]; visual: ReactNode };

function Features() {
  const phone = (label: string, screen: ReactNode, extra = "") => <div className={extra}><Phone label={label}>{screen}</Phone></div>;
  const items: Feature[] = [
    { id: "cobros", label: "Cobros", icon: CreditCard, title: "Cobros y membresías, sin sorpresas", text: "No hay cobros automáticos. El socio paga cuando decide y el gimnasio sabe exactamente quién tiene acceso y hasta cuándo.",
      points: ["Pago con tarjeta o Bizum desde el móvil, a cualquier hora", "Cada pago compra un periodo: encadénalos sin perder días o empieza más adelante", "Varios meses de una vez, hasta 12", "Cobro en mostrador, en efectivo o con datáfono, con corrección y traza"],
      visual: <>{phone("Membresía con tarifa, fechas y días restantes", <MembershipScreen />)}{phone("Alta online con las tarifas", <TariffsScreen />, "hidden sm:block")}</> },
    { id: "tienda", label: "Tienda", icon: ShoppingBag, title: "Tu tienda, siempre abierta", text: "Una nueva fuente de ingresos dentro de la app que ya usan tus socios, con factura y recogida con código QR.",
      points: ["Catálogo por categorías, con marca, precio y disponibilidad que gestiona tu equipo", "Pago con tarjeta desde el móvil, y venta también en el mostrador", "Sin código QR no hay entrega: el equipo lo escanea para entregar", "Factura en PDF de cada compra y aviso al socio"],
      visual: <>{phone("Tienda de la app con catálogo y carrito", <ShopScreen />)}{phone("Compra por recoger con su factura y código QR", <ShopOrderScreen />, "hidden sm:block")}</> },
    { id: "clases", label: "Clases y rutinas", icon: CalendarDays, title: "Clases, rutinas y ejercicios", text: "Tus socios reservan, entrenan con rutinas guiadas y consultan un catálogo de ejercicios, todo desde la misma app.",
      points: ["Agenda de clases y eventos con aforo, reservas y avisos al socio", "Rutinas creadas por tu equipo y asignadas a todos o a algunos", "Entrenamiento guiado con temporizador, y catálogo por grupo muscular y material", "Próximamente: lista de espera y asistencia con QR en las clases"],
      visual: <>{phone("Agenda de clases con plazas libres", <ClassesScreen />)}{phone("Detalle de una rutina de entrenamiento", <RoutineDetailScreen />, "hidden sm:block")}</> },
    { id: "equipo", label: "Equipo y panel", icon: UserCog, title: "Tu equipo y tu negocio, bajo control", text: "Cada cobro, venta y ficha nueva queda a nombre de quien la registró, y cada persona ve solo lo que le toca.",
      points: ["Control de empleados: qué ha cobrado y vendido cada uno, con trazabilidad completa", "Libro de pagos: ingresos por día, mes o año, online y presencial", "Roles: el empleado cobra, pero no ve los ingresos del negocio", "Fichas de clientes, altas del equipo y avisos a los socios"],
      visual: <div className="w-full space-y-6"><PanelFrame label="Control de empleados con cobro, venta de tienda y ficha nueva, cada uno con su autor"><TracePanel /></PanelFrame><PanelFrame label="Libro de pagos con el total ingresado y el reparto online y presencial"><PaymentsPanel /></PanelFrame></div> },
    { id: "local", label: "Tu local", icon: Lightbulb, title: "Luces, portones, música y alarmas", text: "Controla el local desde el panel, estés donde estés.",
      points: ["Luces del gimnasio, una a una o todas a la vez", "Portón: abrir, parar y cerrar, con su estado en vivo (dispositivos Shelly)", "Música con Spotify en los altavoces del local", "Las alarmas de acceso suenan por los mismos altavoces"],
      visual: phone("Domótica con las luces y el portón del gimnasio", <DomoticaScreen />) },
  ];
  return (
    <section id="funciones" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <SectionHead eyebrow="Funciones" title="Todo lo que necesita tu gimnasio, en un solo sistema" sub="Elige una área y mira cómo se ve." />
      <Tabs defaultValue="cobros" className="mt-8 md:mt-10">
        <TabsList className="flex h-auto w-full justify-start gap-1 overflow-x-auto rounded-xl p-1 md:justify-center">
          {items.map(({ id, label, icon: Icon }) => (
            <TabsTrigger key={id} value={id} className="shrink-0 gap-2 rounded-lg px-3.5 py-2 text-sm font-semibold"><Icon className="size-4" aria-hidden />{label}</TabsTrigger>
          ))}
        </TabsList>
        {items.map((f) => (
          <TabsContent key={f.id} value={f.id} className="mt-8 animate-in fade-in-50 md:mt-10">
            <div className="grid items-center gap-8 md:grid-cols-[0.85fr_1.15fr] md:gap-10">
              <div className="min-w-0">
                <h3 className="text-2xl font-extrabold md:text-3xl">{f.title}</h3>
                <p className="mt-3 text-muted-foreground">{f.text}</p>
                <div className="mt-6"><Checklist items={f.points} /></div>
                <a href="#contacto" className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">Verlo en una demo <ArrowRight className="size-4" aria-hidden /></a>
              </div>
              <div className="flex min-w-0 flex-wrap items-start justify-center gap-6">{f.visual}</div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
      <p className="mx-auto mt-8 max-w-xl text-center text-xs text-muted-foreground">Pantallas con datos ficticios. El nombre, el logo y los colores se adaptan a tu centro bajo proyecto.</p>
    </section>
  );
}

function Profiles() {
  const roles = [
    [Smartphone, "Socio", ["Alta y pago desde el móvil, a cualquier hora", "Su QR de acceso, y lo recupera en un móvil nuevo", "Rutinas, clases, tienda y avisos", "Solo ve sus propios datos"]],
    [IdCard, "Empleado", ["Clientes con buscador y estado de membresía", "Cobro y venta en el mostrador", "Entrega de pedidos con el QR del socio", "Abre la puerta, pero no ve los ingresos"]],
    [LayoutDashboard, "Propietario", ["Todo lo del empleado", "Ingresos por día, mes o año, online y presencial", "Cada cobro y venta, con quién la registró", "Altas y roles de tu equipo"]],
  ] as const;
  return (
    <section className="bg-muted/60 py-14 md:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="Tres perfiles" title="Cada persona ve exactamente lo que necesita" />
        <div className="mt-10 grid gap-5 md:grid-cols-3 md:gap-6">
          {roles.map(([Icon, t, pts]) => (
            <div key={t} className="reveal rounded-2xl border bg-card p-6 shadow-soft">
              <span className="grid size-11 place-items-center rounded-xl bg-accent text-accent-foreground"><Icon className="size-5" aria-hidden /></span>
              <h3 className="mt-4 text-xl font-bold">{t}</h3>
              <div className="mt-4"><Checklist items={[...pts]} /></div>
            </div>
          ))}
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

function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((i) => <li key={i} className="flex gap-3 text-sm"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />{i}</li>)}
    </ul>
  );
}

function CostBand() {
  return (
    <section className="bg-primary py-20 text-[#1a120b]">
      <div className="reveal mx-auto grid max-w-6xl items-center gap-8 px-4 md:grid-cols-[1.3fr_1fr]">
        <h2 className="text-5xl font-extrabold leading-[0.98] tracking-tight md:text-7xl">¿Cuánto cuesta cada hora <span className="text-white">cerrada</span>?</h2>
        <div>
          <p className="text-lg font-semibold">Horas de recepción que dejas de cubrir × lo que te cuesta cada hora = lo que ahorras cada mes. Hacemos la cuenta contigo, sin compromiso.</p>
          <Button asChild size="lg" className="mt-6 bg-[#1a120b] font-semibold text-white hover:bg-black"><a href="#contacto">Reserva una llamada</a></Button>
        </div>
      </div>
    </section>
  );
}

function Comparison() {
  const rows: [string, string, string, string][] = [
    ["Se puede prestar a otra persona", "Sí: se pasan de mano en mano", "Si el código es fijo, sí", "No: el código QR cambia cada 4 s y la cara confirma al titular"],
    ["Confirma quién entra de verdad", "No", "No", "Sí, con verificación facial"],
    ["Sabe cuántas personas cruzan", "No", "No", "Sí, con el sensor de conteo"],
    ["Sabe quién abrió si entra un acompañante", "No", "No", "Sí: queda registrado quién abrió y cuántos pasaron"],
    ["Necesita torno", "Suele necesitarlo", "Suele necesitarlo", "No: se instala sobre tu puerta"],
  ];
  return (
    <section id="comparativa" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHead eyebrow="Por qué ya no basta una tarjeta" title="Una tarjeta se presta. Tu cara, no." sub="Las tarjetas, pulseras, llaveros y códigos fijos identifican un objeto, no a una persona. Hispal GYM comprueba a la persona y cuenta quién pasa." />
      <div className="reveal mt-12 overflow-x-auto rounded-2xl border shadow-soft">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="bg-ink text-ink-foreground">
              <th scope="col" className="p-4 font-semibold"><span className="sr-only">Característica</span></th>
              <th scope="col" className="p-4 font-semibold">Tarjeta, pulsera o llavero</th>
              <th scope="col" className="p-4 font-semibold">Solo QR o código en el móvil</th>
              <th scope="col" className="bg-primary p-4 font-bold text-primary-foreground">Hispal GYM</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([a, b, c, d]) => (
              <tr key={a} className="border-t">
                <th scope="row" className="p-4 font-semibold">{a}</th>
                <td className="p-4 text-muted-foreground">{b}</td>
                <td className="p-4 text-muted-foreground">{c}</td>
                <td className="bg-accent/40 p-4 font-semibold">{d}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mx-auto mt-4 max-w-2xl text-center text-xs text-muted-foreground">Comparativa por tipo de sistema de acceso. Las funciones de verificación facial y conteo de personas se incluyen en los packs Seguro y Total.</p>
    </section>
  );
}

function CaseStudy() {
  const points = ["Altas y pagos online, sin pasar por recepción", "Acceso autónomo en la puerta con código QR, cada día", "Rutinas, clases y tienda desde la app del socio", "Panel de gestión para el equipo del centro", "Estamos instalando el sensor de conteo de personas en su puerta"];
  return (
    <section id="caso-real" className="bg-muted/60 py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 md:grid-cols-2">
        <div className="reveal">
          <Eyebrow>Caso real</Eyebrow>
          <h2 className="mt-3 text-3xl font-extrabold md:text-4xl">Pruébalo donde ya funciona</h2>
          <p className="mt-4 text-muted-foreground">Hispal GYM nació en Premium GYM Health & Beauty, en Huétor Tájar (Granada), calle Ancha, 88. Abre todos los días del año, en un pueblo de 10.000 habitantes y con competencia activa. Allí los socios se dan de alta, pagan, entran, reservan clases, compran en la tienda y entrenan con la app cada día, y el equipo lo gestiona todo desde el panel.</p>
          <div className="mt-6 rounded-2xl border bg-card p-5"><OpeningHours /></div>
          <div className="mt-6"><Checklist items={points} /></div>
          <Button asChild size="lg" className="mt-8 font-semibold shadow-glow"><a href="#contacto">Pedir una visita</a></Button>
        </div>
        <div className="reveal rounded-3xl bg-ink p-8 text-ink-foreground md:p-10">
          <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">Visítalo</span>
          <h3 className="mt-4 text-2xl font-extrabold">Ve el sistema funcionando</h3>
          <p className="mt-3 text-sm opacity-80">Te enseñamos Premium GYM en Huétor Tájar y resolvemos tus dudas sobre el acceso, los cobros y la puesta en marcha en tu centro. Coordinamos la visita contigo desde el formulario.</p>
        </div>
      </div>
    </section>
  );
}

function Packs() {
  const packs = [
    { name: "Esencial", tag: "Acceso con QR", rec: false, points: ["Todo el software de gestión", "Acceso con QR en una puerta", "Panel con roles y registro de accesos", "Puerta remota", "Soporte por email"] },
    { name: "Seguro", tag: "QR + cara", rec: true, points: ["Todo lo de Esencial", "Reconocimiento facial tras el QR", "Documentación de protección de datos", "Alternativa sin biometría para quien la pida", "Informe mensual de accesos", "Soporte prioritario"] },
    { name: "Total", tag: "QR + cara + conteo", rec: false, points: ["Todo lo de Seguro", "Contador de personas con aforo en vivo", "Alerta de acompañantes", "Lector QR de salida con registro de salidas", "Respaldo 4G y SAI", "Revisión trimestral", "Torno físico opcional"] },
  ];
  return (
    <section id="packs" className="mx-auto max-w-6xl px-4 py-20">
      <SectionHead eyebrow="Packs" title="Elige la seguridad que necesita tu centro" sub="La instalación del hardware se presupuesta según tu centro, con precio cerrado tras la llamada de introducción." />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {packs.map((p) => (
          <div key={p.name} className={`reveal relative rounded-2xl border-2 p-6 ${p.rec ? "border-primary bg-accent/40 shadow-glow" : "bg-card"}`}>
            {p.rec && <span className="absolute -top-3 left-6 rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">Recomendado</span>}
            <h3 className="font-display text-2xl font-extrabold">{p.name}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{p.tag}</p>
            <div className="mt-6"><Checklist items={p.points} /></div>
            <Button asChild className="mt-8 w-full font-semibold" variant={p.rec ? "default" : "secondary"}><a href="#contacto">Solicitar demo</a></Button>
          </div>
        ))}
      </div>
    </section>
  );
}

function Custom() {
  const items = [[Wrench, "Cambiamos lo que no encaja", "Si una función no hace lo que necesitas, la modificamos para que lo haga."], [CheckCircle2, "Añadimos lo que te falta", "Funcionalidades nuevas, desarrolladas para tu centro sobre la misma plataforma."], [Layers, "Integramos con tu sistema", "Con tu hardware y tu software actuales. Si ya tienes torno o controladoras, trabajamos con ellos."], [IdCard, "Tu marca, tus centros", "Nombre, logo y colores de tu gimnasio, y varios centros en el mismo sistema."]] as const;
  return (
    <section id="a-medida" className="bg-ink py-20 text-ink-foreground">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="A tu medida" title="Es un producto, pero no una caja cerrada" sub="Cada gimnasio funciona a su manera. Hispal GYM llega ya hecho y probado, y nosotros lo adaptamos a tu forma de trabajar, no al revés." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(([Icon, t, d]) => (
            <div key={t} className="reveal rounded-2xl border border-ink-foreground/15 bg-ink-foreground/5 p-6">
              <Icon className="size-7 text-primary" aria-hidden />
              <h3 className="mt-4 text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm opacity-80">{d}</p>
            </div>
          ))}
        </div>
        <p className="reveal mx-auto mt-8 max-w-3xl text-center text-sm opacity-80">Ya lo hemos hecho: lector QR, controladora y torno Kimaldi, cobros con tarjeta y Bizum por Redsys, sensor de conteo, domótica del local y migración de socios desde el programa anterior.</p>
      </div>
    </section>
  );
}

function Trust() {
  const items = [[Lock, "Datos protegidos", "Acceso por roles y conexión cifrada. El socio solo ve sus propios datos."], [Landmark, "Pago con Redsys", "Los pagos con tarjeta se hacen en la pasarela bancaria Redsys: los datos de tu tarjeta no pasan por el gimnasio."], [QrCode, "Código QR antifraude", "Un solo dispositivo por socio y un código que cambia cada 4 segundos."], [DatabaseBackup, "Copias de seguridad", "Copias automáticas y cifradas cada 6 horas."]] as const;
  return (
    <section className="mx-auto max-w-6xl px-4 py-20">
      <SectionHead eyebrow="Confianza" title="Seguro para ti y para tus socios" />
      <div className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 md:mt-12 lg:grid-cols-4">
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
    ["¿Qué hardware de acceso es compatible?", "Trabajamos con controladoras y lectores QR de Kimaldi, terminales de reconocimiento facial y sensores de conteo de personas, con una puerta o torno por instalación. Otros equipos son posibles bajo proyecto. Revisamos contigo tu instalación durante la llamada de introducción."],
    ["¿Hace falta un torno?", "No. Hispal GYM se instala sobre la puerta que ya tienes: código QR, verificación facial y sensor de conteo de personas. El sensor es la alternativa más económica a un torno: no impide el paso, pero registra quién abrió y cuántas personas pasaron. Si prefieres un torno físico, también te lo suministramos e integramos."],
    ["¿Cómo funciona el reconocimiento facial y qué pasa con la protección de datos?", "El terminal confirma que quien presenta el QR es su titular. Incluimos la documentación de protección de datos y una alternativa sin biometría: el socio que no quiera usar su cara entra con QR y validación en recepción. Tu gimnasio es el responsable del tratamiento y te damos la documentación y la configuración para cumplir."],
    ["¿Qué pasa si alguien entra acompañado?", "Un sensor sobre la puerta cuenta las personas que cruzan. Si pasan más personas que accesos concedidos, salta una alarma y el sistema lo marca en rojo en la pantalla del sensor. Queda constancia de quién abrió la puerta y a qué hora, y el gimnasio puede hablar con ese socio."],
    ["¿Puedo vender productos desde la app?", "Sí. La tienda incluye catálogo con fotos y precios, carrito y pago con tarjeta desde el móvil. El socio recoge su pedido en el mostrador enseñando un código QR, y el personal solo puede marcarlo como entregado escaneándolo. También puedes vender en el mostrador, en efectivo o con datáfono. Cada compra tiene su factura en PDF."],
    ["¿Cómo funcionan las clases y los eventos?", "Tu equipo crea clases y eventos con su horario, su sala y sus plazas. El socio con la membresía en vigor reserva y cancela su plaza desde la app, y recibe avisos. Las sesiones pueden ser con reserva o de entrada libre."],
    ["¿Puedo elegir cómo entran mis socios?", "Sí. Cada centro elige: solo QR, solo cara o QR y cara juntos. Lo recomendado para la máxima seguridad es QR + reconocimiento facial + sensor de conteo. Según el centro, también se puede ofrecer un PIN o una tarjeta como opción."],
    ["¿Qué muestra el control de empleados?", "Cada cobro, cada venta de la tienda y cada ficha nueva queda a nombre de quien la registró. Sabes qué ha cobrado y vendido cada empleado, con trazabilidad completa. El empleado no ve los ingresos del negocio."],
    ["¿Qué incluye la domótica?", "Luces y portones del gimnasio controlados desde el panel con dispositivos Shelly, y música con Spotify y alarmas por los altavoces del local."],
    ["¿Se adapta a mi gimnasio?", "Sí. Es un producto, pero nos adaptamos: modificamos funciones, añadimos nuevas e integramos con tu sistema actual, con presupuesto cerrado."],
    ["¿Se cobra automáticamente a los socios?", "No. No hay cobros automáticos. Cada pago compra un periodo de acceso y termina. El socio renueva cuando quiere, pagando de nuevo."],
    ["¿Cómo se pagan las membresías?", "Online con tarjeta desde la app, en la pasarela bancaria Redsys, o en el mostrador en efectivo o con tarjeta en datáfono."],
    ["¿Puedo abrir 24 horas sin personal?", "El flujo no necesita a nadie: alta online, pago, código QR, verificación facial y conteo de personas. Con el pack Total tienes aforo en vivo y salida registrada. No hay control de franjas horarias, y por seguridad no se valida ninguna entrada sin conexión. Lo valoramos contigo según tu centro."],
    ["¿Qué pasa si falla la conexión?", "Por seguridad, no se valida ninguna entrada sin conexión: la puerta no abre y la pantalla indica que pases por recepción. Con el pack Total, un respaldo 4G y un SAI mantienen la puerta funcionando si cae la fibra o la luz. En los demás packs definimos contigo un plan de contingencia."],
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
