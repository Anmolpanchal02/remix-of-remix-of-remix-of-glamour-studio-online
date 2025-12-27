import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const images = [
  'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=400&h=400&fit=crop',
];

export function CircularGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background py-20"
    >
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Section title */}
      <motion.div
        style={{ opacity }}
        className="absolute top-20 left-1/2 -translate-x-1/2 text-center z-10"
      >
        <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
          Our <span className="text-primary">Artistry</span>
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Scroll to explore our beautiful transformations
        </p>
      </motion.div>

      {/* Rotating circle of images */}
      <motion.div
        style={{ rotate, scale, opacity }}
        className="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]"
      >
        {images.map((image, index) => {
          const angle = (360 / images.length) * index;
          const radius = 180; // Distance from center on mobile
          const radiusMd = 220; // Distance from center on desktop

          return (
            <motion.div
              key={index}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `rotate(${angle}deg) translateY(-${radius}px) rotate(-${angle}deg)`,
              }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-primary/30 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src={image}
                  alt={`Gallery ${index + 1}`}
                  className="w-20 h-20 md:w-28 md:h-28 rounded-full object-cover border-2 border-primary/30 shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:border-primary"
                />
              </div>
            </motion.div>
          );
        })}

        {/* Center logo/text */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <motion.div
            style={{ rotate: useTransform(rotate, (r) => -r) }}
            className="bg-card/80 backdrop-blur-sm rounded-full w-24 h-24 md:w-32 md:h-32 flex items-center justify-center border border-primary/20"
          >
            <span className="font-heading text-xl md:text-2xl text-primary">Anushka</span>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-muted-foreground text-sm flex flex-col items-center gap-2"
        >
          <span>Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
