import { useState, useEffect, useRef } from 'react';

const getInitialColor = (): string => {
  try {
    const saved = localStorage.getItem('user_bg_color');
    return saved || '#0f172a';
  } catch (error) {
    return '#0f172a';
  }
};

export const useTheme = () => {
  const [bgColor, setBgColor] = useState<string>(getInitialColor);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem('user_bg_color', bgColor);
  }, [bgColor]);

  return { bgColor, setBgColor };
};
