// API Configuration
export const API_CONFIG = {
  emailServiceUrl: "https://api.web3forms.com/submit",
  // emailServiceUrl: "https://formspree.io/f/your-endpoint", // Alternative
  // emailServiceUrl: "https://api.emailjs.com/v1.0/email/send", // Alternative
};

// Email Configuration
export const EMAIL_CONFIG = {
  to: "hola@hispaltech.dev",
  from: "noreply@hispaltech.dev",
  replyTo: "hola@hispaltech.dev",
};

// Re-export all constants for backward compatibility
export { CONTACT_INFO } from "./contact-info";
export { SERVICES_DATA } from "./services-data";
export { PORTFOLIO_DATA } from "./portfolio-data";
export { TEAM_DATA } from "./team-data";
export { PRICING_COMPARISON_DATA, PRICING_FEATURES } from "./pricing-data";
export { PROJECTS_DATA } from "./projects-data";
