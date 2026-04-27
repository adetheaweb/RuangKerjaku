import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, ArrowRight, ShieldCheck, Mail } from 'lucide-react';

interface LoginDialogProps {
  onLogin: (email: string) => boolean;
}

export const LoginDialog = ({ onLogin }: LoginDialogProps) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onLogin(email)) {
      setIsSuccess(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-indigo-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[50%] h-[50%] bg-pink-600/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[50%] h-[50%] bg-indigo-500/20 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }} />
      </div>

      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="login-form"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            className="relative w-full max-w-md px-6"
          >
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 shadow-2xl">
              <div className="flex flex-col items-center text-center mb-10">
                <div className="w-20 h-20 bg-indigo-500/20 rounded-3xl flex items-center justify-center text-indigo-300 mb-6 border border-indigo-400/20 ring-4 ring-indigo-500/5">
                  <Lock size={36} strokeWidth={1.5} />
                </div>
                <h1 className="text-3xl font-black uppercase italic text-white tracking-widest mb-2">Terbatas</h1>
                <p className="text-[10px] text-indigo-400 font-black uppercase tracking-[0.4em]">Izin Keamanan Internal</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-[9px] font-black text-indigo-300 uppercase tracking-widest ml-1 flex items-center gap-2">
                    <Mail size={10} className="text-pink-500" /> Email Terotorisasi
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Masukkan email terdaftar..."
                      className={`w-full px-6 py-4 bg-indigo-900/40 border rounded-2xl outline-none transition-all text-white placeholder:text-indigo-400/30 ${
                        error ? 'border-red-500 bg-red-500/5 animate-shake' : 'border-white/10 focus:border-pink-500/50'
                      }`}
                    />
                  </div>
                  {error && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="text-[10px] font-black text-red-400 uppercase tracking-widest text-center mt-2"
                    >
                      Akses Ditolak: Email tidak dikenali
                    </motion.p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-5 bg-indigo-600 hover:bg-pink-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] text-xs transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-3 group"
                >
                  Verifikasi Akses
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
              
              <p className="mt-10 text-center text-[9px] text-indigo-400 font-black uppercase tracking-[0.3em] opacity-40 leading-relaxed">
                Dilindungi oleh RUANG KERJA ADETHEA <br/> Mesin Keamanan v1.0
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center text-center px-6"
          >
            <motion.div 
              initial={{ rotate: -20, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: 'spring', damping: 10 }}
              className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center text-white shadow-2xl shadow-green-500/40 mb-8"
            >
              <ShieldCheck size={48} />
            </motion.div>
            <motion.h2 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter mb-4"
            >
              Selamat Datang <br/>
              <span className="text-yellow-300">di Ruang Kerja Adethea</span>
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 100 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent mb-8"
            />
            <p className="text-indigo-300 font-black uppercase tracking-[0.4em] text-xs animate-pulse">Memulai Ruang Kerja...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
