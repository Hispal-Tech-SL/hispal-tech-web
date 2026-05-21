import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { sendEmailAlternative } from "@/services/emailService";
import { Send, CheckCircle, Rocket, ShieldCheck, Zap } from "lucide-react";

const LeadForm = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    description: "",
    privacyPolicy: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const success = await sendEmailAlternative({
        ...formData,
        company: "",
        project: "Lead Web",
        budget: "",
        timeline: "",
        newsletter: false,
      });

      if (success) {
        toast({
          title: t("common.success"),
          description: t("contact.form.guarantee"),
        });

        setFormData({
          name: "",
          email: "",
          phone: "",
          description: "",
          privacyPolicy: false,
        });
      } else {
        toast({
          title: t("common.error"),
          description: "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: t("common.error"),
        description: "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="py-6 bg-muted/30 min-h-screen flex items-center">
      <div className="container mx-auto px-4 max-w-lg">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-2 bg-hispaltech-blue/10 rounded-full mb-3">
            <Rocket className="h-5 w-5 text-hispaltech-blue" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-2">
            Lleva tu empresa al <span className="text-gradient">siguiente nivel</span>
          </h2>
          <p className="text-sm text-muted-foreground mx-auto">
            Déjanos tus datos y nos pondremos en contacto contigo para ver cómo podemos colaborar.
          </p>
        </div>

        <Card className="border-0 shadow-hispaltech">
          <CardHeader className="bg-muted/30 border-b border-border/50 pb-4 mb-2">
            <CardTitle className="flex items-center gap-2 text-xl">
              <Zap className="h-5 w-5 text-hispaltech-blue" />
              Contacta con nosotros
            </CardTitle>
            <CardDescription className="text-sm">
              Un especialista analizará tu caso y te contactará a la mayor brevedad.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <Label htmlFor="name" className="text-sm">{t("contact.form.fields.name")} *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder={t("contact.form.fields.name")}
                    required
                    className="h-9"
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email" className="text-sm">{t("contact.form.fields.email")} *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="tu@email.com"
                    required
                    className="h-9"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <Label htmlFor="phone" className="text-sm">Teléfono</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="+34 600 000 000"
                  className="h-9"
                />
              </div>

              <div className="space-y-1">
                <Label htmlFor="description" className="text-sm">¿En qué podemos ayudarte? *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Cuéntanos brevemente tu idea..."
                  rows={3}
                  required
                  className="resize-none"
                />
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="privacyPolicy"
                  checked={formData.privacyPolicy}
                  onCheckedChange={(checked) => handleInputChange("privacyPolicy", checked as boolean)}
                  required
                  className="mt-1"
                />
                <Label htmlFor="privacyPolicy" className="text-sm font-normal leading-relaxed text-muted-foreground">
                  {t("contact.form.privacyPolicy")} *
                </Label>
              </div>

              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>{t("contact.form.submitting")}</>
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    Enviar
                  </>
                )}
              </Button>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-xs text-muted-foreground pt-2">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>Respuesta en menos de 24h</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShieldCheck className="h-4 w-4 text-green-500" />
                  <span>Tus datos están seguros</span>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LeadForm;
