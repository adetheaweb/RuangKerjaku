import { useState, useEffect } from 'react';
import { SliderItem } from '../types';
import { SLIDER_ITEMS } from '../constants';

export const useSlider = () => {
  const [slides, setSlides] = useState<SliderItem[]>(() => {
    const saved = localStorage.getItem('user_slides');
    return saved ? JSON.parse(saved) : SLIDER_ITEMS;
  });

  useEffect(() => {
    localStorage.setItem('user_slides', JSON.stringify(slides));
  }, [slides]);

  const addSlide = (slide: Omit<SliderItem, 'id'>) => {
    const newSlide = { ...slide, id: crypto.randomUUID() };
    setSlides((prev) => [...prev, newSlide]);
  };

  const removeSlide = (id: string) => {
    // Prevent removing all slides
    if (slides.length <= 1) return;
    setSlides((prev) => prev.filter((s) => s.id !== id));
  };

  return { slides, addSlide, removeSlide };
};
