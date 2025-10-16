import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { TEAM_DATA } from "@/constants";
import { Linkedin, Github, ArrowRight, Users } from "lucide-react";

const Team = () => {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="equipo" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-hispaltech-green/10 text-hispaltech-green rounded-full px-4 py-2 mb-6">
            <Users className="h-4 w-4" />
            <span className="text-sm font-semibold">
              {t("nav.team").toUpperCase()}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            {t("team.title")}
            <br />
            <span className="text-gradient">{t("team.subtitle")}</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("team.description")}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {TEAM_DATA.map((member, index) => (
            <Card
              key={member.id}
              className="group hover:shadow-hispaltech transition-all duration-300 border-0 shadow-md hover:scale-105 text-center"
            >
              <CardHeader className="pb-4">
                <div className="relative mx-auto w-32 h-32 mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full border-4 border-hispaltech-green/20 group-hover:border-hispaltech-green transition-colors duration-300"
                  />
                </div>
                <CardTitle className="text-xl text-primary">
                  {member.name}
                </CardTitle>
                <CardDescription className="text-hispaltech-green font-semibold">
                  {member.role}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {member.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4 justify-center">
                  {member.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="text-xs bg-hispaltech-green/10 text-hispaltech-green px-2 py-1 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex gap-2 justify-center">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-hispaltech-green text-hispaltech-green hover:bg-hispaltech-green hover:text-white"
                    asChild
                  >
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-4 w-4 mr-1" />
                      LinkedIn
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-hispaltech-green text-hispaltech-green hover:bg-hispaltech-green hover:text-white"
                    asChild
                  >
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-1" />
                      GitHub
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center bg-gradient-to-r from-hispaltech-navy/10 to-hispaltech-green/10 rounded-2xl p-8 md:p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            {t("team.cta.title")}
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            {t("team.cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="cta"
              size="lg"
              onClick={() => scrollToSection("contacto")}
              className="group"
            >
              {t("team.cta.primary")}
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("portafolio")}
            >
              {t("team.cta.secondary")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Team;
