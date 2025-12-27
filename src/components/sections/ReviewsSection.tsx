import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Review {
  id: string;
  client_name: string;
  client_photo: string | null;
  rating: number;
  review_text: string;
  service_type: string | null;
}

// Fallback reviews for when database is empty
const fallbackReviews: Review[] = [
  {
    id: '1',
    client_name: 'Priya Sharma',
    client_photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    review_text: 'Anushka did my bridal makeup and I looked absolutely stunning! She understood exactly what I wanted and the makeup lasted all day and night.',
    service_type: 'Bridal',
  },
  {
    id: '2',
    client_name: 'Neha Gupta',
    client_photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    review_text: 'Amazing work for my engagement ceremony! The look was perfect - elegant yet glamorous. Everyone kept complimenting my makeup.',
    service_type: 'Engagement',
  },
  {
    id: '3',
    client_name: 'Anjali Verma',
    client_photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    review_text: 'Got my makeup done for a friend\'s wedding and received so many compliments! Anushka is truly talented.',
    service_type: 'Party',
  },
  {
    id: '4',
    client_name: 'Ritu Singh',
    client_photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop',
    rating: 5,
    review_text: 'Best makeup artist! She made me feel like a queen on my reception. The HD makeup was flawless in photos.',
    service_type: 'Reception',
  },
];

export function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>(fallbackReviews);
  const [isLoading, setIsLoading] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(6);

      if (data && data.length > 0) {
        setReviews(data);
      }
      setIsLoading(false);
    };

    fetchReviews();
  }, []);

  return (
    <section id="reviews" className="py-24 lg:py-32 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 opacity-10">
        <Quote className="w-32 h-32 text-primary" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10 rotate-180">
        <Quote className="w-32 h-32 text-primary" />
      </div>

      <div className="container mx-auto px-4" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-[0.2em] font-medium">
            Testimonials
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
            Client <span className="text-gradient-gold">Love</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take my word for it—hear from the beautiful clients who have trusted
            me with their special moments.
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.slice(0, 4).map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="group"
            >
              <div className="h-full p-6 bg-card border border-border hover:border-primary/30 transition-all duration-400 relative">
                {/* Quote icon */}
                <Quote className="w-8 h-8 text-primary/20 mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating ? 'text-primary fill-primary' : 'text-muted'
                      }`}
                    />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-foreground/80 text-sm leading-relaxed mb-6 line-clamp-4">
                  "{review.review_text}"
                </p>

                {/* Client info */}
                <div className="flex items-center gap-3 mt-auto">
                  {review.client_photo ? (
                    <img
                      src={review.client_photo}
                      alt={review.client_name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-primary font-heading text-lg font-semibold">
                        {review.client_name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h4 className="font-heading font-semibold text-foreground">
                      {review.client_name}
                    </h4>
                    {review.service_type && (
                      <p className="text-xs text-primary uppercase tracking-wider">
                        {review.service_type}
                      </p>
                    )}
                  </div>
                </div>

                {/* Hover accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 bg-card border border-border"
        >
          {[
            { value: '500+', label: 'Happy Clients' },
            { value: '4.9', label: 'Average Rating' },
            { value: '100%', label: 'Satisfaction' },
            { value: '50+', label: 'Five-Star Reviews' },
          ].map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-3xl md:text-4xl font-semibold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
