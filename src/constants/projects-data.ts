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
    id: "premium-gym",
    titleEn: "Premium Gym Health & Beauty",
    titleEs: "Premium Gym Health & Beauty",
    descriptionEn:
      "Website for a premium gym with a modern and high-impact visual UI/UX design. It includes a showcase of facilities, equipment catalog, and trainer profiles. It features a dynamic contact form with email integration to facilitate direct communication with clients, as well as social media integration and an interactive map to easily locate the center. The entire flow is optimized to offer an immersive, top-tier user experience.",
    descriptionEs:
      "Página web para gimnasio premium con diseño UI/UX moderno y de alto impacto visual. Incluye presentación de instalaciones, catálogo de equipamiento y perfiles de entrenadores. Dispone de un formulario de contacto dinámico con integración de email para facilitar la comunicación directa con los clientes, además de integración con redes sociales y un mapa interactivo para localizar fácilmente el centro. Todo el flujo está optimizado para ofrecer una experiencia de usuario inmersiva y de primer nivel.",
    image: "/projects/Carátula Web - Proyecto Premium Gym.png",
    url: "https://premium-gym-health-beauty.netlify.app/",
  },
  {
    id: "alquiler-casa-islantilla",
    titleEn: "Islantilla Real - Vacation Rental",
    titleEs: "Alquiler vacacional Islantilla Real",
    descriptionEn:
      "Website for property rental with modern UI/UX design, visual gallery, calendar synchronized with Airbnb, Booking and more. Includes contact form that sends real-time notifications via Telegram, automatic customer storage in Google Contacts and mass marketing/email campaigns. The entire flow is automated from first contact, with interactive map for easy property access. Features an AI chatbot that assists clients with inquiries and management, answering questions about availability, amenities, and providing comprehensive property information.",
    descriptionEs:
      "Página web para alquiler de vivienda con diseño UI/UX moderno, galería visual, calendario sincronizado con Airbnb, Booking y más. Incluye formulario de contacto que envía notificaciones en tiempo real vía Telegram, almacenamiento automático de clientes en Google Contacts y campañas de marketing/email masivo. Todo el flujo está automatizado desde el primer contacto, con mapa interactivo para llegar fácilmente a la propiedad. Cuenta con un chatbot de IA que asiste a los clientes con cualquier gestión e información, respondiendo dudas sobre disponibilidades, comodidades y proporcionando información completa de la propiedad.",
    image:
      "/projects/Carátula Web - Proyecto Alquiler Casa Islantilla Real.png",
    url: "https://alquiler-islantilla-real.netlify.app/",
  },
  {
    id: "barberia-erostarbe",
    titleEn: "Barber shop Erostarbe",
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
    titleEn: "Gas Compare platform",
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
  {
    id: "neonkyo",
    titleEn: "Neonkyo agencia marketing",
    titleEs: "Neonkyo agencia marketing",
    descriptionEn:
      "Custom-designed website featuring exceptional UX/UI crafted to the client's specific requirements. This project showcases sophisticated web design with a high-level user experience, combining aesthetic appeal with intuitive navigation. Every detail has been carefully tailored to create a unique digital presence.",
    descriptionEs:
      "Página web diseñada especialmente a medida según los requisitos del cliente. Este proyecto destaca por su diseño sofisticado con UX/UI de gran nivel, combinando atractivo estético con navegación intuitiva. Cada detalle ha sido cuidadosamente personalizado para crear una presencia digital única.",
    image: "/projects/Carátula Web - Proyecto Neonkyo.png",
    url: "https://neonkyo.netlify.app/",
  },
  {
    id: "oscar-hellboy",
    titleEn: "Oscar Hellboy Professional Boxer",
    titleEs: "Oscar Hellboy Boxeador Profesional",
    descriptionEn:
      "Website for Oscar Hellboy, professional boxer in Dos Hermanas (Seville). Features a modern web design focused on his personal brand. It includes sections about his career, image gallery of his matches, and links to his social networks. A project designed to highlight his athletic career and connect with his followers.",
    descriptionEs:
      "Página web para Oscar Hellboy, boxeador profesional en Dos Hermanas (Sevilla). Cuenta con un diseño moderno y enfocado en su marca personal. Incluye secciones sobre su trayectoria deportiva, galería de imágenes de sus combates, y enlaces a sus redes sociales. Un proyecto diseñado a medida para destacar su carrera como atleta y conectar con sus seguidores y patrocinadores.",
    image: "/projects/Carátula Web - Proyecto Oscar Hellboy.png",
    url: "https://oscar-hellboy.netlify.app/",
  },
];
