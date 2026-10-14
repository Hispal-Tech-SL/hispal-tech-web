export interface Project {
  id: string;
  titleEn: string;
  titleEs: string;
  /** Short bullet list. The first point always says what the project is. */
  featuresEn: string[];
  featuresEs: string[];
  image: string;
  url: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "premium-gym",
    titleEn: "Premium GYM Health & Beauty",
    titleEs: "Premium GYM Health & Beauty",
    featuresEn: [
      "Website plus a complete management app, built on our Hispal GYM product and fully customized",
      "Online payments, classes, events and activities",
      "QR access with no reception staff (Kimaldi)",
      "Member area with training routines and history",
      "Integrated supplement store",
      "Admin panel with full payment traceability",
    ],
    featuresEs: [
      "Web y aplicación de gestión completa, basada en nuestro producto Hispal GYM y totalmente personalizada",
      "Pagos online, clases, eventos y actividades",
      "Acceso con QR sin personal en recepción (Kimaldi)",
      "Área del socio con rutinas de entrenamiento e historial",
      "Tienda de suplementación integrada",
      "Panel de administración con trazabilidad de pagos",
    ],
    image: "/projects/Carátula Web - Proyecto Premium Gym.png",
    url: "https://www.premiumgymgranada.com",
  },
  {
    id: "alquiler-casa-islantilla",
    titleEn: "Islantilla Real - Vacation Rental",
    titleEs: "Alquiler vacacional Islantilla Real",
    featuresEn: [
      "Website for a vacation rental property",
      "Gallery and calendar synced with Airbnb and Booking",
      "Contact form with real-time Telegram alerts",
      "Customers saved automatically in Google Contacts",
      "AI chatbot answering availability and amenities",
    ],
    featuresEs: [
      "Página web para una vivienda de alquiler vacacional",
      "Galería y calendario sincronizado con Airbnb y Booking",
      "Formulario con avisos en tiempo real por Telegram",
      "Clientes guardados automáticamente en Google Contacts",
      "Chatbot de IA que responde disponibilidad y servicios",
    ],
    image:
      "/projects/Carátula Web - Proyecto Alquiler Casa Islantilla Real.png",
    url: "https://alquiler-islantilla-real.netlify.app/",
  },
  {
    id: "barberia-erostarbe",
    titleEn: "Barber shop Erostarbe",
    titleEs: "Barbería Erostarbe",
    featuresEn: [
      "Website for a barber shop",
      "Services list with clear pricing",
      "Visual gallery and reviews section",
      "Booksy integration: book straight from the website",
    ],
    featuresEs: [
      "Página web para una barbería",
      "Listado de servicios con precios claros",
      "Galería visual y sección de opiniones",
      "Integración con Booksy: reserva directa desde la web",
    ],
    image: "/projects/Carátula Web - Proyecto Barberia Erostarbe.png",
    url: "https://barberia-erostarbe.netlify.app/",
  },
  {
    id: "urbanizacion-islantilla",
    titleEn: "Urbanización Islantilla Real",
    titleEs: "Urbanización Islantilla Real",
    featuresEn: [
      "Website for a residential complex",
      "Complex presentation with image gallery",
      "Amenities, surroundings and leisure sections",
      "Property listings for rent and sale",
      "Contact form",
    ],
    featuresEs: [
      "Página web para una urbanización residencial",
      "Presentación del complejo con galería de imágenes",
      "Secciones de comodidades, entorno y ocio",
      "Anuncios de inmuebles en alquiler y venta",
      "Formulario de contacto",
    ],
    image: "/projects/Carátula Web - Proyecto Urbanización Islantilla Real.png",
    url: "https://urbanizacion-islantilla-real.netlify.app/",
  },
  {
    id: "neonkyo",
    titleEn: "Neonkyo agencia marketing",
    titleEs: "Neonkyo agencia marketing",
    featuresEn: [
      "Custom website for a marketing agency",
      "Fully custom UX/UI design",
      "Intuitive navigation",
      "Unique visual identity",
    ],
    featuresEs: [
      "Página web a medida para una agencia de marketing",
      "Diseño UX/UI totalmente personalizado",
      "Navegación intuitiva",
      "Identidad visual única",
    ],
    image: "/projects/Carátula Web - Proyecto Neonkyo.png",
    url: "https://neonkyo.netlify.app/",
  },
  {
    id: "oscar-hellboy",
    titleEn: "Oscar Hellboy Professional Boxer",
    titleEs: "Oscar Hellboy Boxeador Profesional",
    featuresEn: [
      "Personal brand website for a professional boxer",
      "Career section and fight gallery",
      "Social media links for fans and sponsors",
    ],
    featuresEs: [
      "Web de marca personal para boxeador profesional",
      "Sección de trayectoria y galería de combates",
      "Enlaces a redes para seguidores y patrocinadores",
    ],
    image: "/projects/Carátula Web - Proyecto Oscar Hellboy.png",
    url: "https://oscar-hellboy.netlify.app/",
  },
];
