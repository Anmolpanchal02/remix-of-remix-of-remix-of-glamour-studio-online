import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, Instagram, MessageCircle, Send, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  phone: z.string().optional(),
  service_interest: z.string().optional(),
  message: z.string().trim().min(1, 'Message is required').max(1000, 'Message must be less than 1000 characters'),
});

const contactInfo = [
  {
    icon: Phone,
    label: 'Phone',
    value: '+91 99999 99999',
    href: 'tel:+919999999999',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'makeoveranushka@gmail.com',
    href: 'mailto:makeoveranushka@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Delhi NCR, India',
    href: '#',
  },
  {
    icon: Clock,
    label: 'Hours',
    value: 'Mon-Sun: 9AM - 8PM',
    href: '#',
  },
];

const socialLinks = [
  {
    icon: Instagram,
    label: 'Instagram',
    href: 'https://instagram.com/makeoveranushka',
    color: 'hover:text-pink-500',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    href: 'https://wa.me/919999999999',
    color: 'hover:text-green-500',
  },
];

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service_interest: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form data
      const validatedData = contactSchema.parse(formData);

      // Submit to database
      const { error } = await supabase.from('contact_submissions').insert([{
        name: validatedData.name,
        email: validatedData.email,
        phone: validatedData.phone || null,
        service_interest: validatedData.service_interest || null,
        message: validatedData.message,
      }]);

      if (error) throw error;

      toast({
        title: 'Message sent!',
        description: "Thank you for reaching out. I'll get back to you soon.",
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service_interest: '',
        message: '',
      });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        err.errors.forEach((error) => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as string] = error.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        toast({
          title: 'Error',
          description: 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-gradient-elegant relative">
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
            Get in Touch
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
            Let's Create <span className="text-gradient-gold">Magic</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ready to book your appointment or have questions? Reach out and let's discuss
            how to make your vision come to life.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 space-y-8"
          >
            <div className="space-y-6">
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-start gap-4 group"
                >
                  <div className="p-3 bg-primary/10 rounded-sm group-hover:bg-primary/20 transition-colors">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{item.label}</p>
                    <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div className="section-divider" />

            {/* Social Links */}
            <div>
              <h3 className="font-heading text-xl font-semibold text-foreground mb-4">
                Follow Along
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-4 bg-card border border-border hover:border-primary/50 transition-all ${social.color}`}
                  >
                    <social.icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick booking CTA */}
            <div className="p-6 bg-primary/10 border border-primary/20">
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                Quick Booking
              </h3>
              <p className="text-muted-foreground text-sm mb-4">
                Prefer to chat directly? Message me on WhatsApp for faster response.
              </p>
              <Button
                asChild
                className="w-full bg-green-600 hover:bg-green-700 text-white"
              >
                <a
                  href="https://wa.me/15551234567?text=Hi! I'm interested in booking a makeup session."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </a>
              </Button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="p-8 bg-card border border-border">
              <h3 className="font-heading text-2xl font-semibold text-foreground mb-6">
                Send a Message
              </h3>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="name" className="block text-sm text-muted-foreground mb-2">
                    Your Name *
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    className={`bg-secondary border-border focus:border-primary ${
                      errors.name ? 'border-destructive' : ''
                    }`}
                  />
                  {errors.name && (
                    <p className="text-destructive text-xs mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-muted-foreground mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jane@example.com"
                    className={`bg-secondary border-border focus:border-primary ${
                      errors.email ? 'border-destructive' : ''
                    }`}
                  />
                  {errors.email && (
                    <p className="text-destructive text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="phone" className="block text-sm text-muted-foreground mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="bg-secondary border-border focus:border-primary"
                  />
                </div>
                <div>
                  <label htmlFor="service_interest" className="block text-sm text-muted-foreground mb-2">
                    Service Interest
                  </label>
                  <select
                    id="service_interest"
                    name="service_interest"
                    value={formData.service_interest}
                    onChange={handleChange}
                    className="w-full h-10 px-3 bg-secondary border border-border rounded-md text-foreground focus:border-primary focus:outline-none"
                  >
                    <option value="">Select a service</option>
                    <option value="Bridal Makeup">Bridal Makeup</option>
                    <option value="Special Events">Special Events</option>
                    <option value="Editorial">Editorial / Fashion</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-sm text-muted-foreground mb-2">
                  Your Message *
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your event, date, and any specific looks you have in mind..."
                  rows={5}
                  className={`bg-secondary border-border focus:border-primary resize-none ${
                    errors.message ? 'border-destructive' : ''
                  }`}
                />
                {errors.message && (
                  <p className="text-destructive text-xs mt-1">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-12"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Message
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
