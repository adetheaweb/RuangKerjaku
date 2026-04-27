import { useState } from 'react';
import { Settings, Plus, GripVertical } from 'lucide-react';
import { HeroSlider } from './components/HeroSlider';
import { LinkCard } from './components/LinkCard';
import { LinkManager } from './components/LinkManager';
import { useLinks } from './hooks/useLinks';
import { useSlider } from './hooks/useSlider';
import { useTheme } from './hooks/useTheme';

export default function App() {
  const { links, addLink, removeLink } = useLinks();
  const { slides, addSlide, removeSlide } = useSlider();
  const { bgColor, setBgColor } = useTheme();
  const [isManagerOpen, setIsManagerOpen] = useState(false);

  return (
    <div style={{ backgroundColor: bgColor }} className="min-h-screen text-white flex flex-col font-sans selection:bg-pink-500 selection:text-white transition-colors duration-500">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-pink-600/20 blur-[120px] rounded-full" />
        <div className="absolute top-[20%] -right-[5%] w-[30%] h-[30%] bg-indigo-500/20 blur-[100px] rounded-full" />
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-40 bg-indigo-950/60 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-pink-500/30 transform -rotate-6 transition-transform hover:rotate-0">
              <span className="text-2xl font-black italic">L</span>
            </div>
            <span className="text-xl font-black tracking-tight uppercase">RUANG KERJA ADETHEA</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsManagerOpen(true)}
              className="bg-indigo-800/50 hover:bg-indigo-700 px-6 py-2.5 rounded-full border border-indigo-400/20 transition-all flex items-center gap-3 group"
            >
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse group-hover:scale-125 transition-transform" />
              <span className="text-sm font-bold uppercase tracking-widest">My Link Menu</span>
            </button>
            <div className="w-10 h-10 bg-indigo-400/20 rounded-full border-2 border-indigo-400/30 overflow-hidden flex items-center justify-center">
               <Settings size={20} className="text-indigo-200" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 pt-20 relative z-10">
        <div className="max-w-7xl mx-auto px-6 mt-6">
          {/* Slider Header */}
          <div className="rounded-[2.5rem] overflow-hidden shadow-2xl shadow-black/20 border border-white/5">
            <HeroSlider slides={slides} />
          </div>

          {/* Content Section */}
          <section className="py-20">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="text-4xl font-black tracking-tight mb-2 uppercase italic">Quick Shortcuts</h2>
                <button 
                  onClick={() => setIsManagerOpen(true)}
                  className="text-indigo-300 hover:text-pink-400 font-bold flex items-center gap-2 transition-colors uppercase tracking-widest text-xs"
                >
                  Edit Dashboard <span className="text-lg">&rarr;</span>
                </button>
              </div>
              <div className="h-px flex-1 bg-white/5 mx-8 hidden md:block" />
              <div className="flex items-center gap-2 text-xs font-black text-indigo-400 uppercase tracking-[0.2em] bg-indigo-900/50 px-4 py-2 rounded-full border border-white/5">
                <span>{links.length} Active Modules</span>
              </div>
            </div>

            <div id="links-grid" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {/* Add More Shadow Button */}
              <button 
                onClick={() => setIsManagerOpen(true)}
                className="group flex flex-col items-center justify-center p-8 bg-indigo-900/30 border-2 border-dashed border-indigo-500/30 rounded-3xl hover:border-pink-500 hover:bg-pink-500/10 transition-all text-indigo-300"
              >
                <div className="w-14 h-14 rounded-full bg-indigo-800/50 group-hover:bg-pink-500 flex items-center justify-center text-3xl font-light mb-4 transition-all group-hover:text-white shadow-lg group-hover:shadow-pink-500/40">
                  <Plus size={28} />
                </div>
                <span className="text-sm font-black uppercase tracking-widest transition-colors group-hover:text-pink-400">Add New</span>
              </button>

              {links.map((link, index) => (
                <LinkCard key={link.id} link={link} index={index} />
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-indigo-950/40 backdrop-blur-md py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-indigo-400/60 text-sm font-bold uppercase tracking-widest leading-none">© 2026 RUANG KERJA ADETHEA. All rights reserved.</p>
          <div className="flex items-center gap-10 text-[10px] font-black text-indigo-100 uppercase tracking-[0.2em]">
            <a href="#" className="hover:text-pink-400 transition-colors">Security</a>
            <a href="#" className="hover:text-pink-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-pink-400 transition-colors">Contact</a>
          </div>
        </div>
      </footer>

      {/* Management Sidebar */}
      <LinkManager 
        links={links}
        isOpen={isManagerOpen}
        onClose={() => setIsManagerOpen(false)}
        onAdd={addLink}
        onRemove={removeLink}
        slides={slides}
        onAddSlide={addSlide}
        onRemoveSlide={removeSlide}
        bgColor={bgColor}
        onBgColorChange={setBgColor}
      />
    </div>
  );
}
