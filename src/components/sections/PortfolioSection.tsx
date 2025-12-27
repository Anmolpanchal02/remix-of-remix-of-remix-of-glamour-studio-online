import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = ['All', 'Bridal', 'Engagement', 'Reception', 'Party'];

const portfolioItems = [
  {
    id: 1,
    title: 'Traditional Bridal',
    category: 'Bridal',
    image: 'https://images.unsplash.com/photo-1595959183082-7b570b7e08e2?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Engagement Glow',
    category: 'Engagement',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1987&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Reception Glamour',
    category: 'Reception',
    image: 'https://images.unsplash.com/photo-1519699047748-de8e457a634e?q=80&w=1780&auto=format&fit=crop',
  },
  {
    id: 4,
    title: 'Party Ready',
    category: 'Party',
    image: 'https://images.unsplash.com/photo-1526666923127-b2970f64b422?q=80&w=2072&auto=format&fit=crop',
  },
  {
    id: 5,
    title: 'South Indian Bride',
    category: 'Bridal',
    image: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=1974&auto=format&fit=crop',
  },
  {
    id: 6,
    title: 'Minimalist Bride',
    category: 'Bridal',
    image: 'https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=1935&auto=format&fit=crop',
  },
  {
    id: 7,
    title: 'Cocktail Night',
    category: 'Party',
    image: 'https://images.unsplash.com/photo-1583255448430-17c5eda08e5c?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 8,
    title: 'Sangeet Look',
    category: 'Engagement',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1987&auto=format&fit=crop',
  },
];

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const filteredItems =
    activeCategory === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeCategory);

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;
    const currentIndex = filteredItems.findIndex((item) => item.id === selectedImage);
    if (direction === 'prev') {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1;
      setSelectedImage(filteredItems[newIndex].id);
    } else {
      const newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0;
      setSelectedImage(filteredItems[newIndex].id);
    }
  };

  return (
    <section id="portfolio" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm uppercase tracking-[0.2em] font-medium">
            Portfolio
          </span>
          <h2 className="font-heading text-4xl md:text-5xl font-semibold text-foreground mt-4 mb-6">
            My <span className="text-gradient-gold">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore a curated collection of my makeup artistry, from ethereal bridal looks
            to bold editorial statements.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category)}
              className={`px-6 ${
                activeCategory === category
                  ? 'bg-primary text-primary-foreground'
                  : 'border-border text-foreground hover:border-primary hover:text-primary'
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
                onClick={() => setSelectedImage(item.id)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                  <span className="text-primary text-xs uppercase tracking-wider mb-2">
                    {item.category}
                  </span>
                  <h3 className="font-heading text-xl font-semibold text-foreground">
                    {item.title}
                  </h3>
                </div>
                {/* Border accent */}
                <div className="absolute inset-2 border border-primary/0 group-hover:border-primary/50 transition-all duration-400" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-6 right-6 p-2 text-foreground/70 hover:text-foreground transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-8 h-8" />
            </button>

            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-card/50 rounded-full text-foreground/70 hover:text-foreground hover:bg-card transition-all"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('prev');
              }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-card/50 rounded-full text-foreground/70 hover:text-foreground hover:bg-card transition-all"
              onClick={(e) => {
                e.stopPropagation();
                navigateImage('next');
              }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              src={filteredItems.find((item) => item.id === selectedImage)?.image}
              alt=""
              className="max-w-full max-h-[85vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
