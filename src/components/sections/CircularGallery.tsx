import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

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

// Starting positions from outside screen
const startPositions = [
  { x: -500, y: -400 },
  { x: 500, y: -300 },
  { x: -400, y: 400 },
  { x: 400, y: 500 },
  { x: -600, y: 0 },
  { x: 600, y: 100 },
  { x: 0, y: -500 },
  { x: 0, y: 500 },
];

function ImageCard({ 
  image, 
  index, 
  scrollYProgress, 
  totalImages,
  radius 
}: { 
  image: string; 
  index: number; 
  scrollYProgress: any;
  totalImages: number;
  radius: number;
}) {
  const startPos = startPositions[index];
  const angle = (360 / totalImages) * index;
  
  // Calculate final position on circle
  const finalX = Math.sin((angle * Math.PI) / 180) * radius;
  const finalY = -Math.cos((angle * Math.PI) / 180) * radius * 0.3; // Flatten for perspective
  
  // Each image appears at different scroll points
  const imageStart = 0.08 + (index * 0.05);
  const imageEnd = imageStart + 0.2;

  const x = useTransform(scrollYProgress, [imageStart, imageEnd], [startPos.x, finalX]);
  const y = useTransform(scrollYProgress, [imageStart, imageEnd], [startPos.y, finalY]);
  const opacity = useTransform(scrollYProgress, [imageStart, imageStart + 0.05, imageEnd], [0, 0.7, 1]);
  const scale = useTransform(scrollYProgress, [imageStart, imageEnd], [0.3, 1]);
  const zIndex = Math.round(Math.cos((angle * Math.PI) / 180) * 10) + 10;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2 cursor-pointer"
      style={{
        x,
        y,
        opacity,
        scale,
        zIndex,
        marginLeft: '-65px',
        marginTop: '-90px',
      }}
    >
      <div className="relative overflow-hidden rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300">
        <img
          src={image}
          alt={`Gallery ${index + 1}`}
          className="w-[130px] h-[180px] md:w-[150px] md:h-[200px] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <div className="absolute inset-0 border-2 border-primary/30 rounded-xl" />
      </div>
    </motion.div>
  );
}

export function CircularGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const totalImages = images.length;
  const radius = 280;

  // Rotation of entire carousel after images assemble
  const carouselRotation = useTransform(scrollYProgress, [0.55, 1], [0, 360]);

  return (
    <section
      ref={containerRef}
      className="relative h-[250vh] bg-background"
    >
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        {/* Section title */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.1], [0, 1]),
            y: useTransform(scrollYProgress, [0, 0.1], [50, 0]),
          }}
          className="text-center z-10 mb-8"
        >
          <h2 className="font-heading text-4xl md:text-5xl text-foreground mb-4">
            Our <span className="text-primary">Artistry</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Beautiful transformations crafted with love
          </p>
        </motion.div>

        {/* Carousel container */}
        <motion.div
          className="relative w-full h-[450px] md:h-[500px]"
          style={{
            rotateZ: carouselRotation,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {images.map((image, index) => (
              <ImageCard
                key={index}
                image={image}
                index={index}
                scrollYProgress={scrollYProgress}
                totalImages={totalImages}
                radius={radius}
              />
            ))}
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.08, 0.3], [1, 1, 0]),
          }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-muted-foreground text-sm flex flex-col items-center gap-2"
          >
            <span>Scroll to reveal</span>
            <div className="w-px h-8 bg-gradient-to-b from-primary/50 to-transparent" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
