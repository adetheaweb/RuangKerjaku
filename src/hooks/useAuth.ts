import { useState, useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('is_authenticated') === 'true';
  });

  const login = (email: string) => {
    // Check against the registered email provided in metadata
    if (email.toLowerCase() === 'ayobelajar4y0@gmail.com') {
      setIsAuthenticated(true);
      localStorage.setItem('is_authenticated', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('is_authenticated');
  };

  return { isAuthenticated, login, logout };
};
