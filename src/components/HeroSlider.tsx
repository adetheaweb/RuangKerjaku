import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SliderItem } from '../types';

interface HeroSliderProps {
  slides: SliderItem[];
}

export const HeroSlider = ({ slides }: HeroSliderProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div id="hero-slider" className="relative h-[400px] w-full overflow-hidden bg-indigo-900">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentIndex]?.id || currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          {/* Vibrant Gradient Background or Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-[10000ms] scale-110"
            style={{ 
              backgroundImage: `linear-gradient(to bottom, rgba(30, 27, 75, 0.4), rgba(30, 27, 75, 0.8)), url(${slides[currentIndex].image})`,
              backgroundBlendMode: 'multiply'
            }}
          >
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }} />
          </div>
          
          <div className="relative h-full flex flex-col md:flex-row items-center justify-between px-16 max-w-7xl mx-auto">
            <div className="max-w-xl text-left">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-block bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-lg text-[10px] font-black uppercase mb-6 tracking-[0.3em] text-white border border-white/10"
              >
                Konsep Unggulan
              </motion.span>
              <motion.h1 
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className="text-5xl md:text-7xl font-black text-white leading-[1.05] uppercase italic mb-6 tracking-tighter"
              >
                {slides[currentIndex].title.split(' ')[0]} <br/>
                <span className="text-yellow-300 drop-shadow-[0_0_20px_rgba(253,224,71,0.3)]">{slides[currentIndex].title.split(' ').slice(1).join(' ')}</span>
              </motion.h1>
              <motion.p 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-lg text-indigo-100/90 font-medium max-w-md leading-relaxed mb-8"
              >
                {slides[currentIndex].subtitle}
              </motion.p>
            </div>

            <div className="hidden lg:flex flex-1 justify-end">
              <motion.div
                animate={{ rotate: [5, 15, 5], y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="w-56 h-56 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[3rem] flex items-center justify-center shadow-2xl"
              >
                <div className="text-8xl animate-pulse">✨</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-10 left-16 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`transition-all duration-500 rounded-full ${
              i === currentIndex ? 'w-12 h-2 bg-yellow-300' : 'w-2 h-2 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
