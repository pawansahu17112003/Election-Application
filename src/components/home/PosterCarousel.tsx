import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePosters } from '@/hooks/usePosters';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const PosterCarousel = () => {
  const { data: posters = [], isLoading } = usePosters('home');
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 4 seconds
  useEffect(() => {
    if (posters.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posters.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [posters.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + posters.length) % posters.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % posters.length);
  };

  // Don't render if no posters or loading
  if (isLoading) {
    return (
      <section className="py-6 md:py-10 bg-muted/30">
        <div className="container-custom">
          <div className="h-48 md:h-72 lg:h-96 flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        </div>
      </section>
    );
  }

  if (posters.length === 0) {
    return null;
  }

  return (
    <section className="py-6 md:py-10 bg-muted/30">
      <div className="container-custom">
        <div className="relative overflow-hidden rounded-lg shadow-brand-lg">
          {/* Carousel Container */}
          <div className="relative aspect-[16/9] md:aspect-[21/9]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <img
                  src={posters[currentIndex].image_url}
                  alt={posters[currentIndex].title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay with title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                  <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6">
                    <h3 className="text-white font-bold text-lg md:text-2xl lg:text-3xl">
                      {posters[currentIndex].title}
                    </h3>
                    {posters[currentIndex].description && (
                      <p className="text-white/80 text-sm md:text-base mt-1 line-clamp-2">
                        {posters[currentIndex].description}
                      </p>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows - Only show if more than 1 poster */}
            {posters.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-colors z-10"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 md:p-3 rounded-full transition-colors z-10"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
                </button>
              </>
            )}
          </div>

          {/* Dots Indicator */}
          {posters.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {posters.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-colors ${
                    index === currentIndex
                      ? 'bg-white'
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};