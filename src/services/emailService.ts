import emailjs from "@emailjs/browser";
import { CONTACT_INFO, API_CONFIG, EMAIL_CONFIG } from "@/constants";

// EmailJS configuration
const EMAILJS_CONFIG = {
  serviceId: "service_hispaltech", // You'll need to create this in EmailJS
  templateId: "template_contact", // You'll need to create this template
  publicKey: "your_public_key_here", // You'll get this from EmailJS
};

export interface EmailData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  project: string;
  budget?: string;
  timeline?: string;
  description: string;
  newsletter: boolean;
}

export const sendEmail = async (data: EmailData): Promise<boolean> => {
  try {
    // Initialize EmailJS with your public key
    emailjs.init(EMAILJS_CONFIG.publicKey);

    // Prepare template parameters
    const templateParams = {
      from_name: data.name,
      from_email: data.email,
      phone: data.phone || "",
      company: data.company || "",
      project_type: data.project,
      budget: data.budget || "",
      timeline: data.timeline || "",
      message: data.description,
      newsletter: data.newsletter ? "Sí" : "No",
      to_email: "hola@hispaltech.dev",
    };

    // Send email
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    console.log("Email sent successfully:", response);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

// Alternative: Using Web3Forms (real email service)
export const sendEmailAlternative = async (
  data: EmailData
): Promise<boolean> => {
  try {
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      console.error(
        "❌ VITE_WEB3FORMS_ACCESS_KEY not found in environment variables"
      );
      console.log("📝 Please create a .env file with your Web3Forms API key");
      console.log("📝 Get your API key from: https://web3forms.com");
      return false;
    }

    // Validate required fields
    if (!data.name || !data.email || !data.project || !data.description) {
      console.error("❌ Missing required fields");
      return false;
    }

    // Prepare the email data for Web3Forms
    const emailData = {
      access_key: accessKey,
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      company: data.company || "",
      project: data.project,
      budget: data.budget || "",
      timeline: data.timeline || "",
      message: data.description,
      newsletter: data.newsletter ? "Yes" : "No",
      subject: `Nueva solicitud de presupuesto de ${data.name}`,
      to: EMAIL_CONFIG.to,
      from_name: data.name,
      reply_to: data.email,
    };

    console.log("📧 Sending email to:", EMAIL_CONFIG.to);
    console.log("📧 From:", data.email, "(" + data.name + ")");
    console.log("📧 Project:", data.project);
    console.log("📧 Access Key:", accessKey.substring(0, 8) + "...");

    const response = await fetch(API_CONFIG.emailServiceUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(emailData),
    });

    if (!response.ok) {
      console.error("❌ HTTP Error:", response.status, response.statusText);
      return false;
    }

    const result = await response.json();
    console.log("📧 Web3Forms Response:", result);

    if (result.success) {
      console.log("✅ Email sent successfully!");
      console.log("📧 Message ID:", result.messageId);
      return true;
    } else {
      console.error("❌ Email sending failed:", result);
      if (result.errors) {
        console.error("❌ Errors:", result.errors);
      }
      return false;
    }
  } catch (error) {
    console.error("❌ Error sending email:", error);
    if (error instanceof Error) {
      console.error("❌ Error details:", error.message);
    }
    return false;
  }
};
