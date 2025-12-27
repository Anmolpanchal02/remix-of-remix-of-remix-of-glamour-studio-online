import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, Crown, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: Crown,
    name: 'Bridal Makeup',
    description: 'Complete bridal beauty package including trial, day-of application, and touch-up kit.',
    price: 'From $350',
    duration: '2-3 hours',
    features: [
      'Pre-wedding consultation & trial',
      'Day-of application',
      'Long-lasting premium products',
      'Touch-up kit included',
      'False lashes application',
    ],
    featured: true,
  },
  {
    icon: Sparkles,
    name: 'Special Events',
    description: 'Perfect for galas, photoshoots, proms, and any occasion where you want to shine.',
    price: 'From $150',
    duration: '1-1.5 hours',
    features: [
      'Personalized consultation',
      'Event-appropriate styling',
      'Long-wear formulas',
      'False lashes included',
      'Lip touch-up provided',
    ],
    featured: false,
  },
  {
    icon: Star,
    name: 'Editorial & Fashion',
    description: 'Creative and avant-garde looks for magazines, campaigns, and runway shows.',
    price: 'From $250',
    duration: '2+ hours',
    features: [
      'Concept development',
      'Creative direction collaboration',
      'High-definition techniques',
      'On-set touch-ups',
      'Multiple look changes',
    ],
    featured: false,
  },
];

const addOns = [
  { name: 'Bridal Party (per person)', price: '$120' },
  { name: 'Hair Styling', price: '$100' },
  { name: 'Travel Fee (outside city)', price: '$50+' },
  { name: 'Airbrush Application', price: '+$50' },
];

export function ServicesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="services" className="py-24 lg:py-32 bg-gradient-elegant relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container mx-auto px-4" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-[0.2em] font-medium">
            Services
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
            Tailored <span className="text-gradient-gold">Experiences</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every service is crafted to bring out your unique beauty. Choose the experience
            that suits your special occasion.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className={`relative group ${
                service.featured ? 'md:-mt-4 md:mb-4' : ''
              }`}
            >
              {service.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs uppercase tracking-wider px-4 py-1 font-medium z-10">
                  Most Popular
                </div>
              )}
              <div
                className={`h-full p-8 border transition-all duration-400 ${
                  service.featured
                    ? 'bg-card border-primary/50 shadow-gold'
                    : 'bg-card/50 border-border hover:border-primary/30'
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`p-3 rounded-sm ${
                      service.featured ? 'bg-primary/20' : 'bg-secondary'
                    }`}
                  >
                    <service.icon
                      className={`w-6 h-6 ${
                        service.featured ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-foreground">
                      {service.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">{service.duration}</p>
                  </div>
                </div>

                <p className="text-muted-foreground mb-6">{service.description}</p>

                <div className="mb-6">
                  <span className="font-heading text-3xl font-semibold text-primary">
                    {service.price}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  onClick={scrollToContact}
                  className={`w-full ${
                    service.featured
                      ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  Book Now
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add-ons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-2xl mx-auto"
        >
          <h3 className="font-heading text-2xl font-semibold text-foreground text-center mb-8">
            Add-on Services
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {addOns.map((addon) => (
              <div
                key={addon.name}
                className="flex items-center justify-between p-4 bg-card/50 border border-border"
              >
                <span className="text-foreground">{addon.name}</span>
                <span className="text-primary font-semibold">{addon.price}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
