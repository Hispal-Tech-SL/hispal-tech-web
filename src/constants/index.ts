// API Configuration
export const API_CONFIG = {
  emailServiceUrl: "https://api.web3forms.com/submit",
  // emailServiceUrl: "https://formspree.io/f/your-endpoint", // Alternative
  // emailServiceUrl: "https://api.emailjs.com/v1.0/email/send", // Alternative
};

// Email Configuration
export const EMAIL_CONFIG = {
  to: "info@hispal-network.com",
  from: "noreply@hispaltech.dev",
  replyTo: "info@hispal-network.com",
};

// Re-export all constants for backward compatibility
export { CONTACT_INFO } from "./contact-info";
export { HISPALGYM_DEMO_URL } from "./hispalgym";
export { SERVICES_DATA } from "./services-data";
export { PORTFOLIO_DATA } from "./portfolio-data";
export { TEAM_DATA } from "./team-data";
export { PROJECTS_DATA, type Project } from "./projects-data";
export { PRODUCTS_DATA, type Product } from "./products-data";
