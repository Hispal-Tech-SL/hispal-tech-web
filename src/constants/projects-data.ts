export interface Project {
  id: string;
  titleEn: string;
  titleEs: string;
  descriptionEn: string;
  descriptionEs: string;
  image: string;
  url: string;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "alquiler-casa-islantilla",
    titleEn: "Islantilla Real - Vacation Rental",
    titleEs: "Alquiler Vacacional Islantilla Real",
    descriptionEn:
      "Website for property rental with modern UI/UX design, visual gallery, calendar synchronized with Airbnb, Booking and more. Includes contact form that sends real-time notifications via Telegram, automatic customer storage in Google Contacts and mass marketing/email campaigns. The entire flow is automated from first contact, with interactive map for easy property access.",
    descriptionEs:
      "Página web para alquiler de vivienda con diseño UI/UX moderno, galería visual, calendario sincronizado con Airbnb, Booking y más. Incluye formulario de contacto que envía notificaciones en tiempo real vía Telegram, almacenamiento automático de clientes en Google Contacts y campañas de marketing/email masivo. Todo el flujo está automatizado desde el primer contacto, con mapa interactivo para llegar fácilmente a la propiedad.",
    image:
      "/projects/Carátula Web - Proyecto Alquiler Casa Islantilla Real.png",
    url: "https://alquiler-islantilla-real.netlify.app/",
  },
  {
    id: "barberia-erostarbe",
    titleEn: "Barber Shop Erostarbe",
    titleEs: "Barbería Erostarbe",
    descriptionEn:
      "Website for barber shop with modern and functional design. Includes service list with clear pricing, visual gallery, reviews section and contact. Integrated with Booksy appointment system, allowing customers to book directly from the website easily and quickly.",
    descriptionEs:
      "Página web para barbería con diseño moderno y funcional. Incluye listado de servicios con precios claros, galería visual, sección de opiniones y contacto. Está integrada con el sistema de citas de Booksy, permitiendo a los clientes reservar directamente desde la web de forma sencilla y rápida.",
    image: "/projects/Carátula Web - Proyecto Barberia Erostarbe.png",
    url: "https://barberia-erostarbe.netlify.app/",
  },
  {
    id: "gas-compare",
    titleEn: "Gas Compare Platform",
    titleEs: "Plataforma Gas Compare",
    descriptionEn:
      "Mobile app that allows comparing gas station prices by fuel type and brand. Includes trip planning feature to optimize routes based on cost and availability. The project is complemented with an informative website that redirects directly to Play Store for download. Currently available on Android.",
    descriptionEs:
      "App móvil que permite comparar precios de gasolineras por tipo de combustible y marca. Incluye función de planificación de viajes para optimizar rutas según coste y disponibilidad. El proyecto se complementa con una web informativa que redirige directamente al Play Store para su descarga. Actualmente disponible en Android.",
    image: "/projects/Carátula Web - Proyecto Gas Compare.png",
    url: "https://gascompare.netlify.app/",
  },
  {
    id: "urbanizacion-islantilla",
    titleEn: "Urbanización Islantilla Real",
    titleEs: "Urbanización Islantilla Real",
    descriptionEn:
      "Website for an urbanization in Islantilla with clear and visual design. Includes complete description of the complex, image gallery, amenities section, surroundings and entertainment. It has a contact form and an area dedicated to announcing properties in the urbanization, both for rental and sale, offering a practical and centralized platform for residents and visitors.",
    descriptionEs:
      "Página web para una urbanización en Islantilla con diseño claro y visual. Incluye descripción completa del complejo, galería de imágenes, sección de comodidades, entorno y ocio. Dispone de formulario de contacto y un área dedicada a anunciar inmuebles de la propia urbanización, tanto para alquiler como para venta, ofreciendo una plataforma práctica y centralizada para residentes y visitantes.",
    image: "/projects/Carátula Web - Proyecto Urbanización Islantilla Real.png",
    url: "https://urbanizacion-islantilla-real.netlify.app/",
  },
];
