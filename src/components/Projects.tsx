import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { PROJECTS_DATA } from "@/constants";
import { ExternalLink, ArrowRight, Briefcase } from "lucide-react";

const Projects = () => {
  const { language } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="proyectos" className="py-20 bg-background pt-10">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-hispaltech-green/10 text-hispaltech-green rounded-full px-4 py-2 mb-6">
            <Briefcase className="h-4 w-4" />
            <span className="text-sm font-semibold">
              {language === "en" ? "PROJECTS" : "PROYECTOS"}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            {language === "en" ? "Projects" : "Proyectos Realizados"}
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {language === "en"
              ? "Showcase of completed projects built for satisfied clients across different industries."
              : "Todos nuestros proyectos realizados para clientes satisfechos en diferentes industrias."}
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {PROJECTS_DATA.map((project) => (
            <Card
              key={project.id}
              className="group overflow-hidden hover:shadow-hispaltech transition-all duration-300 border-0 shadow-md hover:scale-105 flex flex-col h-full"
            >
              {/* Project Image */}
              <div className="relative h-64 overflow-hidden bg-muted">
                <div className="absolute inset-0 top-0 h-12 bg-gradient-to-b from-black/20 to-transparent z-10 pointer-events-none"></div>
                <img
                  src={project.image}
                  alt={language === "en" ? project.titleEn : project.titleEs}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    className="gap-2 bg-hispaltech-green hover:bg-hispaltech-green/90"
                    onClick={() => window.open(project.url, "_blank")}
                  >
                    <ExternalLink className="h-4 w-4" />
                    {language === "en" ? "View Project" : "Ver Proyecto"}
                  </Button>
                </div>
              </div>

              {/* Project Info */}
              <CardHeader>
                <CardTitle className="text-xl">
                  {language === "en" ? project.titleEn : project.titleEs}
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-grow">
                <p className="text-muted-foreground text-sm">
                  {language === "en"
                    ? project.descriptionEn
                    : project.descriptionEs}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-hispaltech-green/10 to-hispaltech-green/5 border border-hispaltech-green/20 rounded-lg p-8 md:p-12 text-center -mb-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
            {language === "en"
              ? "Want a Project Like These?"
              : "¿Quieres un Proyecto Como Estos?"}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {language === "en"
              ? "We transform your ideas into reality. Contact us today to discuss your next project and get a personalized quote."
              : "Transformamos tus ideas en realidad. Contacta con nosotros hoy para discutir tu próximo proyecto y obtener una cotización personalizada."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
