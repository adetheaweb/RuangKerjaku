import { motion } from 'motion/react';
import { AppLink } from '../types';
import { LinkIcon } from './LinkIcon';

interface LinkCardProps {
  link: AppLink;
  onClick?: () => void;
  index: number;
}

export const LinkCard = ({ link, index }: LinkCardProps) => {
  return (
    <motion.a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.95 }}
      className="group relative flex flex-col items-center justify-center p-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-[2rem] hover:bg-white/15 transition-all duration-500 overflow-hidden text-center"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-pink-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative w-12 h-12 flex items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-300 group-hover:bg-pink-500 group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(236,72,153,0.4)] transition-all duration-500 mb-3">
        <LinkIcon name={link.iconName} size={24} strokeWidth={2} />
      </div>
      
      <span className="relative font-black uppercase text-white tracking-widest text-xs group-hover:text-pink-400 transition-colors uppercase">{link.title}</span>
      <span className="relative text-[9px] font-black text-indigo-400 uppercase tracking-[0.2em] mt-2 group-hover:text-indigo-200 transition-colors">{link.category}</span>
    </motion.a>
  );
};
