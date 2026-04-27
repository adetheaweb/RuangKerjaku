import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, X, Trash2, Smartphone, Layout, Link as LinkIconLucide, Image as ImageIcon, Upload, Palette } from 'lucide-react';
import { AppLink, SliderItem } from '../types';
import { LinkIcon } from './LinkIcon';

interface LinkManagerProps {
  links: AppLink[];
  isOpen: boolean;
  onClose: () => void;
  onAdd: (link: Omit<AppLink, 'id'>) => void;
  onRemove: (id: string) => void;
  slides: SliderItem[];
  onAddSlide: (slide: Omit<SliderItem, 'id'>) => void;
  onRemoveSlide: (id: string) => void;
  bgColor: string;
  onBgColorChange: (color: string) => void;
}

const AVAILABLE_ICONS = ['Youtube', 'Mail', 'Github', 'Map', 'Cloud', 'Languages', 'Search', 'Music', 'Camera', 'MessageSquare', 'ShoppingBag', 'Play'];
const CATEGORIES = ['Productivity', 'Entertainment', 'Social', 'Development', 'Travel', 'Tools', 'Shopping'];
const PRESET_COLORS = ['#0f172a', '#1e1b4b', '#4c1d95', '#701a75', '#831843', '#111827', '#000000', '#1c1917'];

export const LinkManager = ({ 
  links, 
  isOpen, 
  onClose, 
  onAdd, 
  onRemove, 
  slides, 
  onAddSlide, 
  onRemoveSlide,
  bgColor,
  onBgColorChange
}: LinkManagerProps) => {
  const [activeTab, setActiveTab] = useState<'links' | 'header' | 'appearance'>('links');
  
  // Link form state
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newIcon, setNewIcon] = useState('Smartphone');
  const [newCategory, setNewCategory] = useState('Tools');

  // Slide form state
  const [newSlideTitle, setNewSlideTitle] = useState('');
  const [newSlideSubtitle, setNewSlideSubtitle] = useState('');
  const [newSlideImage, setNewSlideImage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newUrl) return;
    const formattedUrl = newUrl.startsWith('http') ? newUrl : `https://${newUrl}`;
    onAdd({ title: newTitle, url: formattedUrl, iconName: newIcon, category: newCategory });
    setNewTitle(''); setNewUrl('');
  };

  const handleSlideSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSlideTitle || !newSlideImage) return;
    onAddSlide({ title: newSlideTitle, subtitle: newSlideSubtitle, image: newSlideImage });
    setNewSlideTitle(''); setNewSlideSubtitle(''); setNewSlideImage('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewSlideImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div id="link-manager-overlay" className="fixed inset-0 z-50 flex items-center justify-end p-4 md:p-6 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="w-full max-w-md h-full bg-indigo-950 border-l border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-8 border-b border-white/5 bg-indigo-900/40">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-black uppercase italic text-white tracking-widest leading-none">Management Center</h2>
                  <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.3em] mt-2">Personalize Workspace</p>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-white/10 text-indigo-300 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex bg-black/20 p-1 rounded-xl">
                <button 
                  onClick={() => setActiveTab('links')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                    activeTab === 'links' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-indigo-400 hover:text-indigo-200'
                  }`}
                >
                  <LinkIconLucide size={14} /> My Links
                </button>
                <button 
                  onClick={() => setActiveTab('header')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                    activeTab === 'header' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-indigo-400 hover:text-indigo-200'
                  }`}
                >
                  <Layout size={14} /> Header
                </button>
                <button 
                  onClick={() => setActiveTab('appearance')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all ${
                    activeTab === 'appearance' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-indigo-400 hover:text-indigo-200'
                  }`}
                >
                  <Palette size={14} /> Theme
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
              {activeTab === 'links' ? (
                <>
                  <section>
                    <h3 className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                      <Plus size={14} className="text-pink-500" /> New Integration
                    </h3>
                    <form onSubmit={handleLinkSubmit} className="space-y-5 bg-white/5 p-6 rounded-3xl border border-white/5">
                      <div className="space-y-1">
                        <label className="block text-[9px] font-black text-indigo-400 uppercase tracking-widest ml-1">Label</label>
                        <input
                          type="text"
                          value={newTitle}
                          onChange={(e) => setNewTitle(e.target.value)}
                          placeholder="e.g., Creative Hub"
                          className="w-full px-5 py-3 bg-indigo-900/50 border border-white/10 rounded-2xl focus:border-pink-500/50 outline-none transition-all placeholder:text-indigo-400/30 text-white"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[9px] font-black text-indigo-400 uppercase tracking-widest ml-1">Destination URL</label>
                        <input
                          type="text"
                          value={newUrl}
                          onChange={(e) => setNewUrl(e.target.value)}
                          placeholder="e.g., app.io"
                          className="w-full px-5 py-3 bg-indigo-900/50 border border-white/10 rounded-2xl focus:border-pink-500/50 outline-none transition-all placeholder:text-indigo-400/30 text-white"
                        />
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-1 space-y-1">
                          <label className="block text-[9px] font-black text-indigo-400 uppercase tracking-widest ml-1">Symbol</label>
                          <select 
                            value={newIcon} 
                            onChange={(e) => setNewIcon(e.target.value)}
                            className="w-full px-3 py-3 bg-indigo-900/50 border border-white/10 rounded-2xl outline-none text-white appearance-none"
                          >
                            {AVAILABLE_ICONS.map(icon => <option key={icon} value={icon} className="bg-indigo-950">{icon}</option>)}
                          </select>
                        </div>
                        <div className="flex-1 space-y-1">
                          <label className="block text-[9px] font-black text-indigo-400 uppercase tracking-widest ml-1">Tag</label>
                          <select 
                            value={newCategory} 
                            onChange={(e) => setNewCategory(e.target.value)}
                            className="w-full px-3 py-3 bg-indigo-900/50 border border-white/10 rounded-2xl outline-none text-white appearance-none"
                          >
                            {CATEGORIES.map(cat => <option key={cat} value={cat} className="bg-indigo-950">{cat}</option>)}
                          </select>
                        </div>
                      </div>
                      <button type="submit" className="w-full py-4 bg-pink-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-pink-500 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-pink-600/20">
                        Register link
                      </button>
                    </form>
                  </section>

                  <section>
                    <h3 className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em] mb-6">
                      System Modules ({links.length})
                    </h3>
                    <div className="space-y-4">
                      {links.map((link) => (
                        <div key={link.id} className="flex items-center gap-5 p-4 bg-white/5 border border-white/5 rounded-3xl group">
                          <div className="w-12 h-12 flex items-center justify-center bg-indigo-500/20 rounded-2xl text-indigo-300 group-hover:bg-pink-500 group-hover:text-white transition-all">
                            <LinkIcon name={link.iconName} size={22} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-black text-white uppercase text-xs tracking-widest truncate">{link.title}</h4>
                            <p className="text-[9px] text-indigo-400 uppercase font-black truncate">{link.url}</p>
                          </div>
                          <button 
                            onClick={() => onRemove(link.id)}
                            className="p-3 text-indigo-400/40 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              ) : activeTab === 'header' ? (
                <>
                  <section>
                    <h3 className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                      <ImageIcon size={14} className="text-pink-500" /> New Header Module
                    </h3>
                    <form onSubmit={handleSlideSubmit} className="space-y-5 bg-white/5 p-6 rounded-3xl border border-white/5">
                      <div className="space-y-4">
                        <div 
                          onClick={() => fileInputRef.current?.click()}
                          className={`relative h-32 rounded-2xl border-2 border-dashed transition-all flex flex-col items-center justify-center cursor-pointer overflow-hidden ${
                            newSlideImage ? 'border-pink-500' : 'border-indigo-500/30 bg-indigo-900/50 hover:border-indigo-500'
                          }`}
                        >
                          {newSlideImage ? (
                            <img src={newSlideImage} className="w-full h-full object-cover" />
                          ) : (
                            <>
                              <Upload className="text-indigo-400 mb-2" />
                              <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">Select Header Image</span>
                            </>
                          )}
                          <input 
                            ref={fileInputRef}
                            type="file" 
                            accept="image/*" 
                            onChange={handleImageUpload} 
                            className="hidden" 
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="block text-[9px] font-black text-indigo-400 uppercase tracking-widest ml-1">Main Heading</label>
                          <input
                            type="text"
                            value={newSlideTitle}
                            onChange={(e) => setNewSlideTitle(e.target.value)}
                            placeholder="e.g., Focus Mode"
                            className="w-full px-5 py-3 bg-indigo-900/50 border border-white/10 rounded-2xl focus:border-pink-500/50 outline-none transition-all placeholder:text-indigo-400/30 text-white"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="block text-[9px] font-black text-indigo-400 uppercase tracking-widest ml-1">Caption</label>
                          <textarea
                            value={newSlideSubtitle}
                            onChange={(e) => setNewSlideSubtitle(e.target.value)}
                            placeholder="What's this header about?"
                            className="w-full px-5 py-3 bg-indigo-900/50 border border-white/10 rounded-2xl focus:border-pink-500/50 outline-none transition-all placeholder:text-indigo-400/30 text-white text-xs"
                            rows={3}
                          />
                        </div>
                      </div>
                      <button type="submit" className="w-full py-4 bg-pink-600 text-white rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-pink-500 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-pink-600/20">
                        Deploy Slide
                      </button>
                    </form>
                  </section>

                  <section>
                    <h3 className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em] mb-6">
                      Active Slides ({slides.length})
                    </h3>
                    <div className="space-y-4">
                      {slides.map((slide) => (
                        <div key={slide.id} className="flex items-center gap-5 p-3 bg-white/5 border border-white/5 rounded-3xl group">
                          <div className="w-20 h-14 rounded-xl overflow-hidden shadow-lg shadow-indigo-950 flex-shrink-0">
                            <img src={slide.image} className="w-full h-full object-cover" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-black text-white uppercase text-[10px] tracking-widest truncate">{slide.title}</h4>
                            <p className="text-[9px] text-indigo-400 uppercase font-black truncate opacity-60">System Slide</p>
                          </div>
                          <button 
                            onClick={() => onRemoveSlide(slide.id)}
                            className="p-3 text-indigo-400/40 hover:text-red-400 hover:bg-red-400/10 rounded-xl transition-all"
                            disabled={slides.length <= 1}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>
                </>
              ) : (
                <>
                  <section>
                    <h3 className="text-[10px] font-black text-indigo-300 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                      <Palette size={14} className="text-pink-500" /> Background Workspace
                    </h3>
                    
                    <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-6">
                      <div className="space-y-4">
                        <label className="block text-[9px] font-black text-indigo-400 uppercase tracking-widest ml-1">Preset Themes</label>
                        <div className="grid grid-cols-4 gap-3">
                          {PRESET_COLORS.map(color => (
                            <button
                              key={color}
                              onClick={() => onBgColorChange(color)}
                              className={`w-full aspect-square rounded-xl border-2 transition-all ${
                                bgColor === color ? 'border-pink-500 scale-110 shadow-lg shadow-pink-500/20' : 'border-transparent hover:scale-105'
                              }`}
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="block text-[9px] font-black text-indigo-400 uppercase tracking-widest ml-1">Custom Color</label>
                        <div className="flex gap-4 items-center">
                          <input 
                            type="color" 
                            value={bgColor}
                            onChange={(e) => onBgColorChange(e.target.value)}
                            className="w-12 h-12 bg-transparent border-none cursor-pointer"
                          />
                          <input 
                            type="text" 
                            value={bgColor}
                            onChange={(e) => onBgColorChange(e.target.value)}
                            className="flex-1 px-4 py-2 bg-indigo-900/50 border border-white/10 rounded-xl text-white font-mono text-xs outline-none focus:border-pink-500/50"
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
