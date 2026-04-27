import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [bgColor, setBgColor] = useState(() => {
    const saved = localStorage.getItem('user_bg_color');
    return saved || '#0f172a'; // Default indigo-950
  });

  useEffect(() => {
    localStorage.setItem('user_bg_color', bgColor);
  }, [bgColor]);

  return { bgColor, setBgColor };
};
