import { useRef, useEffect, useState } from 'react';
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

// Random starting positions for each image
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

export function CircularGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const totalImages = images.length;
  const angleStep = 360 / totalImages;
  const radius = 250;

  // Rotation based on scroll (starts after images assemble)
  const rotation = useTransform(scrollYProgress, [0.5, 1], [0, 360]);

  return (
    <section
      ref={containerRef}
      className="relative h-[200vh] bg-background"
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
            opacity: useTransform(scrollYProgress, [0, 0.15], [0, 1]),
            y: useTransform(scrollYProgress, [0, 0.15], [50, 0]),
          }}
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
          className="relative w-full h-[400px] md:h-[450px]"
          style={{ perspective: '1000px' }}
        >
          <motion.div
            className="absolute left-1/2 top-1/2 w-0 h-0"
            style={{
              transformStyle: 'preserve-3d',
              rotateY: rotation,
              x: '-50%',
              y: '-50%',
            }}
          >
            {images.map((image, index) => {
              const angle = angleStep * index;
              const startPos = startPositions[index];
              
              // Each image appears at different scroll points
              const imageStart = 0.1 + (index * 0.04);
              const imageEnd = imageStart + 0.15;

              const imageX = useTransform(
                scrollYProgress,
                [imageStart, imageEnd],
                [startPos.x, 0]
              );
              const imageY = useTransform(
                scrollYProgress,
                [imageStart, imageEnd],
                [startPos.y, 0]
              );
              const imageOpacity = useTransform(
                scrollYProgress,
                [imageStart, imageStart + 0.05, imageEnd],
                [0, 0.5, 1]
              );
              const imageScale = useTransform(
                scrollYProgress,
                [imageStart, imageEnd],
                [0.3, 1]
              );

              return (
                <motion.div
                  key={index}
                  className="absolute group cursor-pointer"
                  style={{
                    transformStyle: 'preserve-3d',
                    x: imageX,
                    y: imageY,
                    opacity: imageOpacity,
                    scale: imageScale,
                    rotateY: angle,
                    translateZ: radius,
                    left: '-70px',
                    top: '-90px',
                  }}
                >
                  <div className="relative overflow-hidden rounded-xl shadow-2xl">
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-[130px] h-[170px] md:w-[150px] md:h-[200px] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute inset-0 border-2 border-primary/20 rounded-xl" />
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{
            opacity: useTransform(scrollYProgress, [0, 0.1, 0.4], [1, 1, 0]),
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
