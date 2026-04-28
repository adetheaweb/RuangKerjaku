import { useState, useEffect, useRef } from 'react';
import { AppLink } from '../types';
import { DEFAULT_LINKS } from '../constants';

const getInitialLinks = (): AppLink[] => {
  try {
    const saved = localStorage.getItem('user_links');
    return saved ? JSON.parse(saved) : DEFAULT_LINKS;
  } catch (error) {
    console.error('Failed to load links:', error);
    return DEFAULT_LINKS;
  }
};

export const useLinks = () => {
  const [links, setLinks] = useState<AppLink[]>(getInitialLinks);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    localStorage.setItem('user_links', JSON.stringify(links));
  }, [links]);

  const addLink = (link: Omit<AppLink, 'id'>) => {
    const newLink = { 
      ...link, 
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11)
    };
    setLinks((prev) => [...prev, newLink]);
  };

  const removeLink = (id: string) => {
    setLinks((prev) => prev.filter((l) => l.id !== id));
  };

  const updateLink = (id: string, updates: Partial<AppLink>) => {
    setLinks((prev) => prev.map((l) => (l.id === id ? { ...l, ...updates } : l)));
  };

  return { links, addLink, removeLink, updateLink };
};
