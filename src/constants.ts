import { AppLink, SliderItem } from './types';

export const DEFAULT_LINKS: AppLink[] = [
  { id: '1', title: 'YouTube', url: 'https://youtube.com', iconName: 'Youtube', category: 'Entertainment' },
  { id: '2', title: 'Gmail', url: 'https://mail.google.com', iconName: 'Mail', category: 'Productivity' },
  { id: '3', title: 'GitHub', url: 'https://github.com', iconName: 'Github', category: 'Development' },
  { id: '4', title: 'Maps', url: 'https://maps.google.com', iconName: 'Map', category: 'Travel' },
  { id: '5', title: 'Drive', url: 'https://drive.google.com', iconName: 'Cloud', category: 'Storage' },
  { id: '6', title: 'Translate', url: 'https://translate.google.com', iconName: 'Languages', category: 'Tools' },
];

export const SLIDER_ITEMS: SliderItem[] = [
  {
    id: 's1',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=2072',
    title: 'Work Smart',
    subtitle: 'Manage your daily workflows with ease and efficiency.'
  },
  {
    id: 's2',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=2070',
    title: 'Always Connected',
    subtitle: 'Access your favorite tools from any device, anywhere.'
  },
  {
    id: 's3',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=2070',
    title: 'Your Digital Hub',
    subtitle: 'The center of your digital life, organized and simple.'
  }
];
