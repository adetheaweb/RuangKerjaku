import { useState, useEffect, useRef } from 'react';
import { SliderItem } from '../types';
import { SLIDER_ITEMS } from '../constants';

const getInitialSlides = (): SliderItem[] => {
  try {
    const saved = localStorage.getItem('user_slides');
    return saved ? JSON.parse(saved) : SLIDER_ITEMS;
  } catch (error) {
    console.error('Failed to load slides:', error);
    return SLIDER_ITEMS;
  }
};

export const useSlider = () => {
  const [slides, setSlides] = useState<SliderItem[]>(getInitialSlides);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem('user_slides', JSON.stringify(slides));
  }, [slides]);

  const addSlide = (slide: Omit<SliderItem, 'id'>) => {
    const newSlide = { 
      ...slide, 
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11)
    };
    setSlides((prev) => [...prev, newSlide]);
  };

  const removeSlide = (id: string) => {
    if (slides.length <= 1) return;
    setSlides((prev) => prev.filter((s) => s.id !== id));
  };

  return { slides, addSlide, removeSlide };
};
