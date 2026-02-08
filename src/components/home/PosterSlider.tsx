import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePosters } from '@/hooks/usePosters';

export const PosterSlider = () => {
  const { data: posters = [], isLoading } = usePosters('home');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying || posters.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posters.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlaying, posters.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + posters.length) % posters.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % posters.length);
  };

  if (isLoading || posters.length === 0) {
    return null; // Don't show anything if no posters
  }

  return (
    <section className="w-full py-6 md:py-8">
      <div className="container-custom">
        <div className="relative">
          {/* Main Slider Container */}
          <div className="relative overflow-hidden rounded-lg shadow-brand-lg">
            <div className="relative h-48 md:h-64 lg:h-80">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  <img
                    src={posters[currentIndex].image_url}
                    alt={posters[currentIndex].title || 'Poster'}
                    className="w-full h-full object-cover"
                  />
                  {/* Optional overlay for text */}
                  {posters[currentIndex].title && (
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <h3 className="text-white font-semibold text-lg md:text-xl">
                        {posters[currentIndex].title}
                      </h3>
                      {posters[currentIndex].description && (
                        <p className="text-white/80 text-sm md:text-base mt-1">
                          {posters[currentIndex].description}
                        </p>
                      )}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation Arrows */}
            {posters.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200"
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}
          </div>

          {/* Dots Indicator */}
          {posters.length > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              {posters.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 h-2 bg-primary rounded-full'
                      : 'w-2 h-2 bg-gray-300 rounded-full hover:bg-gray-400'
                  }`}
                  onMouseEnter={() => setIsAutoPlaying(false)}
                  onMouseLeave={() => setIsAutoPlaying(true)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
