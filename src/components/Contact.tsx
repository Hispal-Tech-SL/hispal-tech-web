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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { CONTACT_INFO } from "@/constants";
import { sendEmailAlternative } from "@/services/emailService";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  Calculator,
} from "lucide-react";

const Contact = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    project: "",
    budget: "",
    description: "",
    timeline: "",
    newsletter: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const success = await sendEmailAlternative(formData);

      if (success) {
        toast({
          title: t("common.success"),
          description: t("contact.form.guarantee"),
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          project: "",
          budget: "",
          description: "",
          timeline: "",
          newsletter: false,
        });
      } else {
        toast({
          title: t("common.error"),
          description:
            "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: t("common.error"),
        description:
          "Error al enviar el mensaje. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: Mail,
      title: t("contact.directContact.email.title"),
      description: t("contact.directContact.email.description"),
      value: CONTACT_INFO.email,
      action: t("contact.directContact.email.action"),
      link: `mailto:${CONTACT_INFO.email}`,
    },
    // Phone contact commented out as requested
    // {
    //   icon: Phone,
    //   title: t("contact.directContact.phone.title"),
    //   description: t("contact.directContact.phone.description"),
    //   value: CONTACT_INFO.phone,
    //   action: t("contact.directContact.phone.action"),
    //   link: `tel:${CONTACT_INFO.phone.replace(/\s/g, "")}`,
    // },
  ];

  return (
    <section id="contacto" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-hispaltech-green/10 text-hispaltech-green rounded-full px-4 py-2 mb-6">
            <Mail className="h-4 w-4" />
            <span className="text-sm font-semibold">
              {t("nav.contact").toUpperCase()}
            </span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            {t("contact.title")}
            <br />
            <span className="text-gradient">{t("contact.subtitle")}</span>
          </h2>

          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("contact.description")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="border-0 shadow-hispaltech">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5 text-hispaltech-green" />
                  {t("contact.form.title")}
                </CardTitle>
                <CardDescription>
                  {t("contact.form.description")}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">
                        {t("contact.form.fields.name")} *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          handleInputChange("name", e.target.value)
                        }
                        placeholder={t("contact.form.fields.name")}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">
                        {t("contact.form.fields.email")} *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Phone field commented out as requested */}
                    {/* <div>
                        <Label htmlFor="phone">
                          {t("contact.form.fields.phone")}
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="+34 600 000 000"
                        />
                      </div> */}
                    <div>
                      <Label htmlFor="company">
                        {t("contact.form.fields.company")}
                      </Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) =>
                          handleInputChange("company", e.target.value)
                        }
                        placeholder={t("contact.form.fields.company")}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="project">
                        {t("contact.form.fields.project")} *
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("project", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("contact.form.fields.project")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="web">
                            {t("contact.form.projectTypes.web")}
                          </SelectItem>
                          <SelectItem value="ecommerce">
                            {t("contact.form.projectTypes.ecommerce")}
                          </SelectItem>
                          <SelectItem value="app">
                            {t("contact.form.projectTypes.app")}
                          </SelectItem>
                          <SelectItem value="system">
                            {t("contact.form.projectTypes.system")}
                          </SelectItem>
                          <SelectItem value="integration">
                            {t("contact.form.projectTypes.integration")}
                          </SelectItem>
                          <SelectItem value="other">
                            {t("contact.form.projectTypes.other")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="budget">
                        {t("contact.form.fields.budget")}
                      </Label>
                      <Select
                        onValueChange={(value) =>
                          handleInputChange("budget", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue
                            placeholder={t("contact.form.fields.budget")}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="500-1000">
                            {t("contact.form.budgetRanges.500-1000")}
                          </SelectItem>
                          <SelectItem value="1000-2500">
                            {t("contact.form.budgetRanges.1000-2500")}
                          </SelectItem>
                          <SelectItem value="2500-5000">
                            {t("contact.form.budgetRanges.2500-5000")}
                          </SelectItem>
                          <SelectItem value="5000+">
                            {t("contact.form.budgetRanges.5000+")}
                          </SelectItem>
                          <SelectItem value="undefined">
                            {t("contact.form.budgetRanges.undefined")}
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="timeline">
                      {t("contact.form.fields.timeline")}
                    </Label>
                    <Select
                      onValueChange={(value) =>
                        handleInputChange("timeline", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue
                          placeholder={t("contact.form.fields.timeline")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urgent">
                          {t("contact.form.timelineOptions.urgent")}
                        </SelectItem>
                        <SelectItem value="month">
                          {t("contact.form.timelineOptions.month")}
                        </SelectItem>
                        <SelectItem value="quarter">
                          {t("contact.form.timelineOptions.quarter")}
                        </SelectItem>
                        <SelectItem value="flexible">
                          {t("contact.form.timelineOptions.flexible")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description">
                      {t("contact.form.fields.description")} *
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        handleInputChange("description", e.target.value)
                      }
                      placeholder={t("contact.form.fields.description")}
                      rows={4}
                      required
                    />
                  </div>

                  {/* Newsletter checkbox - Hidden */}
                  {/* <div className="flex items-center space-x-2">
                    <Checkbox
                      id="newsletter"
                      checked={formData.newsletter}
                      onCheckedChange={(checked) =>
                        handleInputChange("newsletter", checked as boolean)
                      }
                    />
                    <Label htmlFor="newsletter" className="text-sm">
                      {t("contact.form.newsletter")}
                    </Label>
                  </div> */}

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
                        <Send className="h-4 w-4 mr-2" />
                        {t("contact.form.submit")}
                      </>
                    )}
                  </Button>

                  <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle className="h-3 w-3 text-hispaltech-green" />
                    <span>{t("contact.form.guarantee")}</span>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">
                {t("contact.directContact.title")}
              </h3>
              <p className="text-muted-foreground text-sm mb-6">
                {t("contact.directContact.description")}
              </p>
            </div>

            {contactInfo.map((contact, index) => {
              const IconComponent = contact.icon;
              return (
                <Card
                  key={index}
                  className="border-0 shadow-md hover:shadow-hispaltech transition-all duration-300 group"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-hispaltech-green/10 rounded-lg flex items-center justify-center group-hover:bg-hispaltech-green group-hover:text-white transition-colors">
                        <IconComponent className="h-5 w-5 text-hispaltech-green group-hover:text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-primary">
                          {contact.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-1">
                          {contact.description}
                        </p>
                        <p className="text-sm font-medium text-muted-foreground mb-2">
                          {contact.value}
                        </p>
                        <Button
                          size="sm"
                          variant="outline"
                          asChild
                          className="text-xs border-hispaltech-green text-hispaltech-green hover:bg-hispaltech-green hover:text-white"
                        >
                          <a
                            href={contact.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {contact.action}
                          </a>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            {/* Business Hours - Removed */}
            {/* <Card className="border-0 shadow-md bg-gradient-to-br from-hispaltech-navy/5 to-hispaltech-green/5">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-hispaltech-green/10 rounded-lg flex items-center justify-center">
                    <Clock className="h-5 w-5 text-hispaltech-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-2">
                      {t("contact.directContact.hours.title")}
                    </h4>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>{t("contact.directContact.hours.weekdays")}</p>
                      <p>{t("contact.directContact.hours.saturday")}</p>
                      <p>{t("contact.directContact.hours.sunday")}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card> */}

            {/* Location */}
            <Card className="border-0 shadow-md">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-hispaltech-green/10 rounded-lg flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-hispaltech-green" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary mb-1">
                      {t("contact.directContact.location.title")}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      España
                      <br />
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
