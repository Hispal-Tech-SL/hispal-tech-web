import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useReveal } from "@/hooks/use-reveal";
import SectionHeader from "@/components/SectionHeader";
import { PROJECTS_DATA } from "@/constants";
import { CheckCircle2, ChevronRight, ExternalLink } from "lucide-react";

const Projects = () => {
  const { language, t } = useLanguage();
  const sectionRef = useReveal<HTMLElement>();
  const isEn = language === "en";
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrolled, setScrolled] = useState(false);

  const nextCard = () => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section
      id="proyectos"
      ref={sectionRef}
      className="bg-background py-16 md:py-24"
    >
      <div className="container mx-auto px-4 lg:px-8">
        <SectionHeader
          title={t("sections.projects")}
          description={
            isEn
              ? "Some of the projects we have built for satisfied clients."
              : "Algunos de los proyectos que hemos realizado para clientes satisfechos."
          }
        />

        {/* Projects Grid (swipeable on mobile) */}
        <div className="relative">
        <div
          ref={trackRef}
          onScroll={(e) => setScrolled(e.currentTarget.scrollLeft > 24)}
          className="reveal -mx-4 mb-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:mb-16 md:grid md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3">
          {PROJECTS_DATA.map((project) => {
            const title = isEn ? project.titleEn : project.titleEs;
            const features = isEn ? project.featuresEn : project.featuresEs;
            return (
              <Card
                key={project.id}
                className="group flex h-full w-[82%] shrink-0 snap-center flex-col overflow-hidden border-0 shadow-md transition-all duration-300 hover:shadow-hispaltech sm:w-[46%] md:w-auto"
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block aspect-square overflow-hidden bg-muted"
                  aria-label={title}
                >
                  <img
                    src={project.image}
                    alt={title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </a>

                <CardHeader className="pb-2">
                  <CardTitle className="text-lg leading-snug">{title}</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-grow flex-col">
                  <ul className="flex-grow space-y-2">
                    {features.map((f) => (
                      <li key={f} className="flex gap-2 text-sm text-muted-foreground">
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-hispaltech-blue"
                          aria-hidden
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-5 w-full gap-2 border-hispaltech-blue text-hispaltech-blue hover:bg-hispaltech-blue hover:text-white"
                  >
                    <a href={project.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      {isEn ? "View project" : "Ver proyecto"}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {!scrolled && (
          <button
            type="button"
            onClick={nextCard}
            aria-label={isEn ? "See next project" : "Ver siguiente proyecto"}
            className="absolute right-0 top-1/3 z-10 grid size-11 animate-pulse place-items-center rounded-full bg-hispaltech-blue text-white shadow-lg md:hidden"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        )}
        </div>
        <p className="mb-10 flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground md:hidden">
          {isEn ? "Swipe to see more projects" : "Desliza para ver más proyectos"}
          <ChevronRight className="h-3.5 w-3.5" aria-hidden />
        </p>

        {/* CTA Section */}
        <div className="reveal rounded-2xl border border-hispaltech-blue/20 bg-gradient-to-r from-hispaltech-blue/10 to-hispaltech-blue/5 p-8 text-center md:p-12">
          <h3 className="mb-4 text-2xl font-bold text-primary md:text-3xl">
            {isEn
              ? "Want a project like these?"
              : "¿Quieres un proyecto como estos?"}
          </h3>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            {isEn
              ? "We transform your ideas into reality. Contact us today to discuss your next project and get a personalized quote."
              : "Transformamos tus ideas en realidad. Contacta con nosotros hoy para discutir tu próximo proyecto y obtener una cotización personalizada."}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
