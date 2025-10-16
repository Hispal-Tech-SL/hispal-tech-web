import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Ana Martínez",
      role: "Directora de Marketing",
      company: "TechStart Solutions",
      rating: 5,
      text: "Hispal Tech superó todas nuestras expectativas. No solo nos entregaron una plataforma increíble por un precio increíblemente competitivo, sino que el soporte post-lanzamiento ha sido excepcional. Realmente cumplen con su promesa de mejor precio garantizado.",
      project: "E-commerce B2B",
      savings: "€2,100 ahorrados vs. competencia",
      timeline: "Entregado 2 semanas antes"
    },
    {
      name: "Carlos Ruiz",
      role: "CEO",
      company: "Innovate Corp",
      rating: 5,
      text: "Trabajar con Hispal Tech fue una decisión acertada. Su equipo técnico es extremadamente competente y su enfoque en el detalle es impresionante. La aplicación móvil que desarrollaron para nosotros ha aumentado nuestras ventas en un 40%.",
      project: "App Móvil Empresarial",
      savings: "€1,500 menos que otras propuestas",
      timeline: "Desarrollo en tiempo récord"
    },
    {
      name: "María López",
      role: "Fundadora",
      company: "Digital Ventures",
      rating: 5,
      text: "Como startup, necesitábamos calidad premium con presupuesto ajustado. Hispal Tech nos ofreció exactamente eso. Su transparencia en precios y la calidad del código son excepcionales. Han sido nuestros partners tecnológicos desde entonces.",
      project: "Plataforma Web Completa",
      savings: "50% menos que agencias grandes",
      timeline: "Lanzamiento exitoso en 8 semanas"
    },
    {
      name: "Roberto García",
      role: "Director IT",
      company: "Enterprise Solutions",
      rating: 5,
      text: "La migración de nuestro sistema legacy fue compleja, pero Hispal Tech la manejó con profesionalismo total. Cero tiempo de inactividad y una mejora significativa en rendimiento. Además, nos ahorraron más de €3,000 comparado con otras propuestas.",
      project: "Migración de Sistema Legacy",
      savings: "€3,200 por debajo del presupuesto",
      timeline: "Sin interrupciones operativas"
    },
    {
      name: "Laura Fernández",
      role: "Product Manager",
      company: "GrowthTech",
      rating: 5,
      text: "El dashboard que desarrolló Hispal Tech para nuestro equipo de ventas es simplemente perfecto. Intuitivo, rápido y con todas las funcionalidades que necesitábamos. El precio fue muy por debajo de lo que esperábamos pagar.",
      project: "Dashboard Analítico",
      savings: "€1,800 de ahorro confirmado",
      timeline: "Implementación sin complicaciones"
    },
    {
      name: "Diego Morales",
      role: "Operations Director",
      company: "LogiFlow",
      rating: 5,
      text: "Hispal Tech automatizó nuestros procesos internos de manera brillante. La integración con nuestros sistemas existentes fue perfecta y el ROI se materializó en menos de 3 meses. Definitivamente recomendamos sus servicios.",
      project: "Automatización de Procesos",
      savings: "Presupuesto 40% menor",
      timeline: "ROI en menos de 3 meses"
    }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star 
        key={i} 
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} 
      />
    ));
  };

  return (
    <section id="testimonios" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-hispaltech-green/10 text-hispaltech-green rounded-full px-4 py-2 mb-6">
            <Quote className="h-4 w-4" />
            <span className="text-sm font-semibold">TESTIMONIOS</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Lo Que Dicen
            <br />
            <span className="text-gradient">Nuestros Clientes</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            La satisfacción de nuestros clientes habla por sí sola. Descubre por qué eligen 
            Hispal Tech una y otra vez para sus proyectos tecnológicos.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-hispaltech transition-all duration-300 border-0 shadow-md hover:scale-105 bg-card/50 backdrop-blur-sm"
            >
              <CardContent className="p-6 space-y-4">
                {/* Quote Icon */}
                <div className="w-10 h-10 bg-hispaltech-green/10 rounded-full flex items-center justify-center mb-4">
                  <Quote className="h-5 w-5 text-hispaltech-green" />
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Testimonial Text */}
                <p className="text-muted-foreground leading-relaxed text-sm italic">
                  "{testimonial.text}"
                </p>

                {/* Project Details */}
                <div className="space-y-2 pt-2 border-t border-border">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className="text-xs border-hispaltech-green/30 text-hispaltech-green">
                      {testimonial.project}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-1 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-hispaltech-green rounded-full"></div>
                      <span>{testimonial.savings}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-hispaltech-green rounded-full"></div>
                      <span>{testimonial.timeline}</span>
                    </div>
                  </div>
                </div>

                {/* Client Info */}
                <div className="pt-4 border-t border-border">
                  <div className="font-semibold text-primary text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  <div className="text-xs font-medium text-hispaltech-green">{testimonial.company}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 bg-gradient-to-r from-hispaltech-navy/10 to-hispaltech-green/10 rounded-2xl p-8">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-hispaltech-green mb-2">98%</div>
            <div className="text-muted-foreground text-sm">Clientes Satisfechos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-hispaltech-green mb-2">4.9</div>
            <div className="text-muted-foreground text-sm">Rating Promedio</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-hispaltech-green mb-2">85%</div>
            <div className="text-muted-foreground text-sm">Clientes Recurrentes</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-hispaltech-green mb-2">€45K</div>
            <div className="text-muted-foreground text-sm">Ahorros Generados</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;