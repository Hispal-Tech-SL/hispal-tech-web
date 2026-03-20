import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { PROJECTS_DATA, Project } from "@/constants";
import {
  ExternalLink,
  ArrowRight,
  Briefcase,
  ChevronDown,
  X,
} from "lucide-react";

const Projects = () => {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="proyectos" className="pt-32 pb-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            {language === "en" ? "Projects" : "Proyectos realizados"}
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
              <div className="relative h-64 overflow-hidden bg-white">
                <div className="absolute inset-0 top-0 h-12 bg-gradient-to-b from-black/20 to-transparent z-10 pointer-events-none"></div>
                <img
                  src={project.image}
                  alt={language === "en" ? project.titleEn : project.titleEs}
                  className="w-full h-full object-contain p-2 md:p-4 transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button
                    className="gap-2 bg-hispaltech-blue hover:bg-hispaltech-blue/90"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.url, "_blank");
                    }}
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

              <CardContent className="flex-grow flex flex-col">
                <p className="text-muted-foreground text-sm line-clamp-3">
                  {language === "en"
                    ? project.descriptionEn
                    : project.descriptionEs}
                </p>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-hispaltech-blue hover:text-hispaltech-blue/80 text-sm font-semibold mt-3 flex items-center gap-1 transition-colors"
                >
                  {language === "en" ? "Read More" : "Leer más"}
                  <ChevronDown className="h-4 w-4" />
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Project Modal */}
        <Dialog
          open={!!selectedProject}
          onOpenChange={() => setSelectedProject(null)}
        >
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">
                    {language === "en"
                      ? selectedProject.titleEn
                      : selectedProject.titleEs}
                  </DialogTitle>
                  <DialogClose />
                </DialogHeader>

                <div className="space-y-6">
                  {/* Project Image */}
                  <img
                    src={selectedProject.image}
                    alt={
                      language === "en"
                        ? selectedProject.titleEn
                        : selectedProject.titleEs
                    }
                    className="w-full h-64 object-contain p-2 md:p-4 rounded-lg bg-white"
                  />

                  {/* Project Description */}
                  <div className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {language === "en"
                        ? selectedProject.descriptionEn
                        : selectedProject.descriptionEs}
                    </p>
                  </div>

                  {/* CTA Button */}
                  <Button
                    className="w-full gap-2 bg-hispaltech-blue hover:bg-hispaltech-blue/90 text-white"
                    onClick={() => {
                      window.open(selectedProject.url, "_blank");
                      setSelectedProject(null);
                    }}
                  >
                    <ExternalLink className="h-4 w-4" />
                    {language === "en" ? "View Project" : "Ver Proyecto"}
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-hispaltech-blue/10 to-hispaltech-blue/5 border border-hispaltech-blue/20 rounded-lg p-8 md:p-12 text-center -mb-10">
          <h3 className="text-2xl md:text-3xl font-bold mb-4 text-primary">
            {language === "en"
              ? "Want a project like these?"
              : "¿Quieres un proyecto como estos?"}
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
