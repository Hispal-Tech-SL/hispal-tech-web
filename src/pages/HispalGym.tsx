import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import {
  CreditCard, Layers, Smartphone, QrCode, ArrowRight, Dumbbell, CalendarDays, Bell,
  LayoutDashboard, ShoppingBag, Lock, Landmark, DatabaseBackup, IdCard, CheckCircle2, UserPlus, LogIn,
  ScanFace, Users, ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import {
  Phone, PanelFrame, QrScreen, MembershipScreen, RoutinesScreen, RoutineDetailScreen, TariffsScreen,
  CashPanel, PaymentsPanel, AccessPanel, CustomerPanel, ShopScreen, ShopOrderScreen, ClassesScreen, SensorPanel,
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
        <ThreeLayers />
        <Comparison />
        <Packs />
        <CaseStudy />
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
          <p className="mt-5 max-w-xl text-lg text-muted-foreground">Software de gestión con control de acceso por código QR, reconocimiento facial y conteo de personas: membresías, cobros, tienda, rutinas, clases y accesos en un solo sistema. Tus socios se dan de alta, pagan con tarjeta desde el móvil y entran con su código QR; tú controlas clientes, cobros y accesos desde un panel.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="font-semibold shadow-glow"><a href="#contacto">Solicitar demo</a></Button>
            <Button asChild size="lg" variant="secondary" className="font-semibold"><a href="#como-funciona">Ver cómo funciona <ArrowRight /></a></Button>
          </div>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {[[CreditCard, "Alta y pago online"], [QrCode, "Código QR en el móvil"], [LayoutDashboard, "Panel de gestión"]].map(([I, t]) => {
              const Icon = I as typeof CreditCard;
              return <li key={t as string} className="flex items-center gap-2.5 text-sm font-semibold"><span className="grid size-9 place-items-center rounded-lg bg-accent text-accent-foreground"><Icon className="size-4" aria-hidden /></span>{t as string}</li>;
            })}
          </ul>
        </div>
        <div className="relative">
          <Phone label="App del socio con el código QR de acceso al gimnasio" className="rotate-2 transition-transform duration-500 will-change-transform hover:rotate-0"><QrScreen /></Phone>
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
        <IconCard icon={QrCode} title="Un código QR que no se presta" text="El código QR cambia cada 4 segundos y la membresía se comprueba en el momento de entrar." />
      </div>
    </section>
  );
}

function Showcase() {
  return (
    <section className="bg-ink py-20 text-ink-foreground">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="La app del socio" title="Una app instalable en el móvil de tus socios" sub="Se instala desde el navegador, sin pasar por tiendas de apps. Membresía, código QR, rutinas, clases y tienda en un mismo sitio." />
        <div className="mt-14 flex snap-x gap-8 overflow-x-auto pb-6 md:justify-center md:overflow-visible">
          <div className="reveal snap-center shrink-0"><Phone label="Pantalla de membresía con tarifa, fechas, días restantes y botón para pagar el siguiente periodo"><MembershipScreen /></Phone></div>
          <div className="reveal snap-center shrink-0 md:-translate-y-6"><Phone label="Pantalla del código QR de acceso al gimnasio"><QrScreen /></Phone></div>
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
  const socio = ["Alta online 24/7 y pago con tarjeta desde el móvil", "Membresía con fecha de inicio y fin, días restantes y estado", "Renovar o encadenar un periodo sin perder días, o pagar hoy y empezar más adelante", "Código QR en el móvil para entrar", "Rutinas con ejercicios, series, repeticiones y entrenamiento guiado", "Reserva de clases y eventos con plazas, y aviso si se cancelan", "Tienda de suplementación: compra con tarjeta y recoge con un código QR", "Factura en PDF de cada pago, de la membresía o de la tienda", "Buzón de avisos y notificaciones push", "Recordatorio por email antes de que venza la membresía"];
  const empleado = ["Listado y ficha de clientes con buscador y estado de membresía", "Cobro en mostrador: efectivo o tarjeta en datáfono", "Registro de fecha de pago, periodo y quién cobró", "Corrección de pagos con traza, sin perder el histórico", "Registro de entradas con aviso de accesos sospechosos", "Pantalla del sensor: cuántas personas entran con cada código QR", "Venta de productos en el mostrador, en efectivo o con datáfono", "Entrega de pedidos escaneando el código QR del socio", "Catálogo de la tienda: marcas, precios y disponibilidad", "Clases, eventos y espacios con sus plazas", "Gestión de rutinas y asignación a los socios"];
  const propietario = ["Todo lo del empleado", "Libro de pagos: ingresos por día, semana, mes o año, con reparto online y presencial", "Roles diferenciados: el empleado no ve los ingresos", "Cada pago muestra quién lo registró", "Altas, roles y accesos de tu equipo desde el panel", "Archivar clientes duplicados o antiguos conservando su histórico"];
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
  const steps = [[UserPlus, "El socio se da de alta y paga desde el móvil", "A cualquier hora, con tarjeta en la pasarela bancaria Redsys."], [IdCard, "Crea su cuenta y recibe su código QR", "Tras el pago crea su contraseña y ya lo tiene en el móvil. Sin tarjetas físicas."], [LogIn, "Entra con su QR; tú lo ves en el panel", "Cada entrada concedida queda registrada con fecha y hora."]] as const;
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
      <div className={flip ? "min-w-0 md:order-2" : "min-w-0"}>{visual}</div>
      <div className="min-w-0">
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
      <Spotlight flip eyebrow="Control de acceso con QR" title="Tu puerta sabe quién puede entrar" text="Integrado con lectores y controladoras Kimaldi. Con membresía vigente se entra; si no, se deniega." points={["El código QR cambia cada 4 segundos y solo funciona en un dispositivo", "El socio recupera su código QR en un móvil nuevo sin pasar por recepción", "Registro de entradas con aviso de accesos sospechosos", "Verificación facial y conteo de personas en los packs Seguro y Total"]} link="Consultar hardware compatible" visual={<PanelFrame label="Registro de accesos del panel, con entradas agrupadas por día y botón para abrir la puerta"><AccessPanel /></PanelFrame>} />
      <Spotlight eyebrow="Contador de personas" title="Sin torno, sabes quién entra y quién se cuela" text="Instalamos un sensor sobre la puerta que cuenta a cada persona que cruza y lo cruza con el código QR leído. Es la alternativa más económica a un torno, para los gimnasios que no quieren instalarlo. Y si lo prefieres, también te suministramos el torno." points={["Cada entrada con código QR queda cruzada con las personas que cuenta el sensor", "Si pasan más personas que accesos concedidos, queda registrado y marcado en rojo", "Si alguien entra acompañado, sabes quién abrió la puerta y a qué hora", "Pantalla del sensor en el panel: imagen casi en directo, contadores y lista de entradas"]} link="Pedir información del sensor" visual={<PanelFrame label="Pantalla del sensor del panel con la imagen de la puerta, los contadores de entradas y salidas y la lista de entradas con código QR, con las acompañadas y sin código marcadas en rojo"><SensorPanel /></PanelFrame>} />
      <Spotlight flip eyebrow="Clases, eventos y espacios" title="Agenda y reservas desde el móvil" text="Crea clases y eventos con su horario, su sala y su aforo. El socio con la membresía en vigor reserva su plaza desde la app y el equipo controla las plazas desde el panel." points={["Reserva y cancelación de plazas, con aviso de plazas libres, completa o reservada", "Espacios con su aforo, para no pasarte de plazas", "Clases con reserva o de entrada libre, y eventos puntuales", "Aviso al socio cuando se apunta o se cancela una sesión"]} link="Ver la agenda en la demo" visual={<Phone label="Agenda de clases con el selector de días y cada clase con su horario, sala, monitor y plazas libres"><ClassesScreen /></Phone>} />
      <Spotlight eyebrow="Tienda del gimnasio" title="Suplementación y accesorios, a un toque" text="Una nueva fuente de ingresos dentro de la app que ya usan tus socios. Catálogo con fotos, carrito y pago con tarjeta en la pasarela bancaria Redsys." points={["Catálogo por categorías, con marca, precio y disponibilidad que gestiona tu equipo", "Carrito y pago con tarjeta desde el móvil, a cualquier hora", "El importe lo calcula el servidor: el socio nunca manda un precio", "Una historia a pantalla completa presenta la tienda al abrir la app"]} link="Ver la tienda en la demo" visual={<Phone label="Tienda de la app del socio con el catálogo de productos, su precio, el botón de añadir y el carrito"><ShopScreen /></Phone>} />
      <Spotlight flip eyebrow="Recogida con código QR" title="Compra online, recoge con un código QR" text="Cada compra de la tienda aparece en Mis pagos con su factura y un código QR. En el mostrador, el equipo lo escanea para entregar el pedido." points={["Sin código QR no hay entrega: el servidor lo exige y no se puede marcar a mano", "Venta en el mostrador en efectivo o con datáfono, con entrega inmediata si se lo lleva", "Factura en PDF de cada compra, con una fila por producto", "Aviso al socio cuando paga y cuando recoge su pedido"]} link="Ver la recogida en la demo" visual={<Phone label="Mis pagos con una compra de la tienda por recoger, con sus productos, la factura y el código QR de recogida"><ShopOrderScreen /></Phone>} />
      <Spotlight eyebrow="Rutinas de entrenamiento" title="Entrenamiento en el bolsillo" text="Crea rutinas desde el panel y asígnalas a todos tus socios o solo a algunos. El socio las sigue desde el móvil." points={["Ejercicios con series, repeticiones, descanso y superseries", "Entrenamiento guiado con temporizador", "Aviso al socio cuando le asignas una rutina"]} link="Ver rutinas en la demo" visual={<Phone label="Detalle de una rutina con sus días de entrenamiento y los ejercicios de cada uno"><RoutineDetailScreen /></Phone>} />
      <Spotlight flip eyebrow="Panel de gestión" title="Cobros corregidos, con traza" text="Cada pago muestra quién lo registró y cuándo. Si el mostrador se equivoca, se corrige sin perder el histórico." points={["Roles diferenciados para empleado y propietario", "Pagos corregidos con motivo y posibilidad de restaurar", "Clientes archivados sin perder historial"]} link="Ver el panel en la demo" visual={<PanelFrame label="Ficha de cliente con sus datos, membresía activa y pagos realizados, con quién los registró"><CustomerPanel /></PanelFrame>} />
    </section>
  );
}

function ThreeLayers() {
  const layers = [
    [QrCode, "1 · QR que no se copia", "El código QR cambia cada 4 segundos y solo funciona en un dispositivo. La membresía se comprueba al instante, en cada entrada."],
    [ScanFace, "2 · Verificación facial", "Tras el QR, el terminal confirma que quien lo presenta es su titular, con protección contra fotos y vídeos. Un QR prestado deja de valer."],
    [Users, "3 · Conteo de personas", "Un sensor sobre la puerta cuenta cada persona que cruza. Si pasan más personas que accesos concedidos, el sistema lo registra y avisa."],
  ] as const;
  return (
    <section id="seguridad" className="bg-ink py-20 text-ink-foreground">
      <div className="mx-auto max-w-6xl px-4">
        <SectionHead eyebrow="Acceso en tres capas" title="Tu puerta sabe quién entra, quién abre y cuántos pasan" sub="Sin tarjetas físicas y sin torno obligatorio: se instala sobre tu puerta, con el sensor como alternativa más económica. Si prefieres torno, también te lo suministramos e integramos." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {layers.map(([Icon, t, d]) => (
            <div key={t} className="reveal rounded-2xl border border-ink-foreground/15 bg-ink-foreground/5 p-6">
              <Icon className="size-7 text-primary" aria-hidden />
              <h3 className="mt-4 text-lg font-bold">{t}</h3>
              <p className="mt-2 text-sm opacity-80">{d}</p>
            </div>
          ))}
        </div>
        <div className="reveal mx-auto mt-10 max-w-3xl rounded-2xl bg-primary/10 p-6 text-center">
          <ShieldCheck className="mx-auto size-7 text-primary" aria-hidden />
          <h3 className="mt-3 text-xl font-bold">Cada entrada tiene un responsable</h3>
          <p className="mt-2 text-sm opacity-80">Si alguien entra acompañado, el sistema sabe exactamente quién abrió la puerta y a qué hora. El socio responde de quien deja pasar, y tú tienes el dato para actuar.</p>
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
          <p className="mt-4 text-muted-foreground">Hispal GYM nació en Premium GYM, en Huétor Tájar (Granada). Allí los socios se dan de alta, pagan, entran, reservan clases, compran en la tienda y entrenan con la app cada día, y el equipo lo gestiona todo desde el panel.</p>
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

function Roadmap() {
  const items = [[CalendarDays, "Clases: lista de espera y asistencia", "Lista de espera, estadísticas de asistencia y asistencia con código QR en las clases."]] as const;
  return (
    <section className="mx-auto max-w-6xl px-4 pb-20">
      <div className="reveal relative overflow-hidden rounded-3xl bg-ink p-8 text-ink-foreground md:p-14">
        <div className="absolute inset-0 bg-hero-glow" aria-hidden />
        <div className="relative">
          <span className="inline-block rounded-full bg-primary px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-foreground">Próximamente</span>
          <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">Lo que viene</h2>
          <p className="mt-3 max-w-xl opacity-80">Estamos construyendo estos módulos. Si alguno te interesa, cuéntanoslo en la llamada de introducción.</p>
          <ul className="mt-8 grid max-w-md gap-4">
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
  const items = [[CreditCard, "Pagos online", "Pago con tarjeta desde el móvil y cobro en mostrador, en efectivo o con datáfono."], [IdCard, "Membresías", "Estados claros: activa, sin empezar, vencida o sin pago."], [QrCode, "Control de acceso", "Lectores QR Kimaldi con torno o puerta, y registro de entradas."], [Dumbbell, "Rutinas", "Ejercicios, series y repeticiones en la app, con modo guiado."], [Bell, "Avisos al socio", "Email, buzón y notificaciones push: vencimientos, pagos y rutinas."], [LayoutDashboard, "Panel de gestión", "Clientes, cobros, accesos e ingresos, con roles de empleado y propietario y altas del equipo."], [CalendarDays, "Clases, eventos y espacios", "Agenda, reservas con control de plazas y avisos al socio desde su app."], [ShoppingBag, "Tienda del gimnasio", "Catálogo, carrito y pago con tarjeta; el socio recoge con un código QR y tiene su factura."], [ScanFace, "Facial y conteo de personas", "Reconocimiento facial tras el código QR y sensor de conteo para saber quién abre y cuántos pasan."]] as const;
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
  const items = [[Lock, "Datos protegidos", "Acceso por roles y conexión cifrada. El socio solo ve sus propios datos."], [Landmark, "Pago con Redsys", "Los pagos con tarjeta se hacen en la pasarela bancaria Redsys: los datos de tu tarjeta no pasan por el gimnasio."], [QrCode, "Código QR antifraude", "Un solo dispositivo por socio y un código que cambia cada 4 segundos."], [DatabaseBackup, "Copias de seguridad", "Copias automáticas y cifradas cada 6 horas."]] as const;
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
    ["¿Qué hardware de acceso es compatible?", "Trabajamos con controladoras y lectores QR de Kimaldi, terminales de reconocimiento facial y sensores de conteo de personas, con una puerta o torno por instalación. Otros equipos son posibles bajo proyecto. Revisamos contigo tu instalación durante la llamada de introducción."],
    ["¿Hace falta un torno?", "No. Hispal GYM se instala sobre la puerta que ya tienes: código QR, verificación facial y sensor de conteo de personas. El sensor es la alternativa más económica a un torno: no impide el paso, pero registra quién abrió y cuántas personas pasaron. Si prefieres un torno físico, también te lo suministramos e integramos."],
    ["¿Cómo funciona el reconocimiento facial y qué pasa con la protección de datos?", "El terminal confirma que quien presenta el QR es su titular. Incluimos la documentación de protección de datos y una alternativa sin biometría: el socio que no quiera usar su cara entra con QR y validación en recepción. Tu gimnasio es el responsable del tratamiento y te damos la documentación y la configuración para cumplir."],
    ["¿Qué pasa si alguien entra acompañado?", "Un sensor sobre la puerta cuenta las personas que cruzan. Si pasan más personas que accesos concedidos, el sistema lo registra y lo marca en rojo en la pantalla del sensor, y queda constancia de quién abrió la puerta y a qué hora."],
    ["¿Puedo vender productos desde la app?", "Sí. La tienda incluye catálogo con fotos y precios, carrito y pago con tarjeta desde el móvil. El socio recoge su pedido en el mostrador enseñando un código QR, y el personal solo puede marcarlo como entregado escaneándolo. También puedes vender en el mostrador, en efectivo o con datáfono. Cada compra tiene su factura en PDF."],
    ["¿Cómo funcionan las clases y los eventos?", "Tu equipo crea clases y eventos con su horario, su sala y sus plazas. El socio con la membresía en vigor reserva y cancela su plaza desde la app, y recibe avisos. Las sesiones pueden ser con reserva o de entrada libre."],
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
