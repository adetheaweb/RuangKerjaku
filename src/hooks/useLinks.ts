import { useState, useEffect } from 'react';
import { AppLink } from '../types';
import { DEFAULT_LINKS } from '../constants';

export const useLinks = () => {
  const [links, setLinks] = useState<AppLink[]>(() => {
    const saved = localStorage.getItem('user_links');
    return saved ? JSON.parse(saved) : DEFAULT_LINKS;
  });

  useEffect(() => {
    localStorage.setItem('user_links', JSON.stringify(links));
  }, [links]);

  const addLink = (link: Omit<AppLink, 'id'>) => {
    const newLink = { ...link, id: crypto.randomUUID() };
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
