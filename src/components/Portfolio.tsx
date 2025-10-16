import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { PORTFOLIO_DATA } from "@/constants";
import { ExternalLink, Github, ArrowRight, Code } from "lucide-react";

const Portfolio = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="portafolio" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-hispaltech-green/10 text-hispaltech-green rounded-full px-4 py-2 mb-6">
            <Code className="h-4 w-4" />
            <span className="text-sm font-semibold">
              {t("nav.portfolio").toUpperCase()}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            {t("portfolio.title")}
            <br />
            <span className="text-gradient">{t("portfolio.subtitle")}</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("portfolio.description")}
          </p>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {PORTFOLIO_DATA.map((project, index) => (
            <Card
              key={project.id}
              className="group hover:shadow-hispaltech transition-all duration-300 border-0 shadow-md hover:scale-105 overflow-hidden"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Ver Demo
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className="bg-white/20 backdrop-blur-sm text-white hover:bg-white/30"
                    >
                      <Github className="h-4 w-4 mr-1" />
                      Código
                    </Button>
                  </div>
                </div>
              </div>

              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs bg-hispaltech-green/10 text-hispaltech-green px-2 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
                <CardTitle className="text-xl text-primary">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-hispaltech-navy/10 to-hispaltech-green/10 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            {t("portfolio.cta.title")}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {t("portfolio.cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="cta"
              size="lg"
              onClick={() => scrollToSection("contacto")}
              className="group"
            >
              {t("portfolio.cta.primary")}
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("servicios")}
            >
              {t("portfolio.cta.secondary")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
