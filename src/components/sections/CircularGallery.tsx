import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const images = [
  'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1503236823255-94609f598e71?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1457972729786-0411a3b2b626?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1560577345-013f785ae56c?w=400&h=500&fit=crop',
  'https://images.unsplash.com/photo-1519699047748-de8e457a634e?w=400&h=500&fit=crop',
];

export function CircularGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const totalImages = images.length;
  const angleStep = 360 / totalImages;
  const radius = 300; // Distance from center

  useEffect(() => {
    if (!isInView || isPaused) return;

    const interval = setInterval(() => {
      setRotation((prev) => prev + 0.3);
    }, 30);

    return () => clearInterval(interval);
  }, [isInView, isPaused]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background py-20"
    >
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
      </div>

      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center z-10 mb-16"
      >
        <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
          Our <span className="text-primary">Artistry</span>
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto">
          Beautiful transformations crafted with love
        </p>
      </motion.div>

      {/* 3D Carousel */}
      <div
        className="relative w-full h-[400px] md:h-[500px]"
        style={{ perspective: '1000px' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="absolute left-1/2 top-1/2 w-0 h-0"
          style={{
            transformStyle: 'preserve-3d',
            transform: `translateX(-50%) translateY(-50%) rotateY(${rotation}deg)`,
            transition: isPaused ? 'transform 0.3s ease-out' : 'none',
          }}
        >
          {images.map((image, index) => {
            const angle = angleStep * index;
            return (
              <div
                key={index}
                className="absolute group cursor-pointer"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  left: '-75px',
                  top: '-100px',
                }}
              >
                <div className="relative overflow-hidden rounded-xl shadow-2xl transition-all duration-300 group-hover:scale-105">
                  <img
                    src={image}
                    alt={`Gallery ${index + 1}`}
                    className="w-[150px] h-[200px] md:w-[180px] md:h-[240px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-xl transition-all duration-300" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2">
        <div className="w-px h-16 bg-gradient-to-b from-primary/50 to-transparent" />
      </div>
    </section>
  );
}
