import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Hexagon, ArrowRight, Palette } from 'lucide-react';
import { NavItem } from '../types';

const navItems: NavItem[] = [
  { name: 'About', href: '#about' },
  { name: 'Expertise', href: '#skills' },
  { name: 'Education', href: '#education' },
  { name: 'Work', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const themes = [
    { name: 'Emerald', rgb: '16 185 129', hex: '#10b981' },
    { name: 'Violet', rgb: '139 92 246', hex: '#8b5cf6' },
    { name: 'Blue', rgb: '59 130 246', hex: '#3b82f6' },
    { name: 'Rose', rgb: '244 63 94', hex: '#f43f5e' },
    { name: 'Amber', rgb: '245 158 11', hex: '#f59e0b' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showThemePicker, setShowThemePicker] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('#')) {
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
            // Using a custom ease for scrolling via window.scrollTo would require a custom hook or library
            // Standard smooth scroll is "okay", but CSS scroll-behavior: smooth covers it mostly
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    setIsOpen(false);
  };

  const changeTheme = (rgb: string) => {
    document.documentElement.style.setProperty('--accent-rgb', rgb);
    setShowThemePicker(false);
  };

  return (
    <>
      <motion.nav
        className={`fixed left-0 right-0 z-40 flex justify-center transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] ${scrolled ? 'top-4' : 'top-6'}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className={`
          flex items-center justify-between gap-4 px-4 py-2 pl-6 rounded-full transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] relative
          ${scrolled 
            ? 'bg-zinc-900/80 border border-zinc-800 shadow-[0_8px_32px_rgba(0,0,0,0.12)] backdrop-blur-xl w-[min(90%,580px)]' 
            : 'bg-transparent border border-transparent w-[min(90%,680px)]'}
        `}>
          <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-2 group">
            <div className="relative">
                <Hexagon className="text-accent fill-accent/10 group-hover:rotate-180 transition-transform duration-700 ease-out" size={28} strokeWidth={2} />
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-3 py-2 text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/5 rounded-full transition-all duration-300"
              >
                {item.name}
              </a>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Theme Picker Trigger */}
            <div className="relative">
                <button 
                    onClick={() => setShowThemePicker(!showThemePicker)}
                    className={`p-2 rounded-full transition-colors ${showThemePicker ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}
                >
                    <Palette size={16} />
                </button>
                
                <AnimatePresence>
                    {showThemePicker && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full right-0 mt-3 p-3 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl flex gap-2 min-w-[180px] justify-center backdrop-blur-md"
                        >
                            {themes.map((t) => (
                                <button
                                    key={t.name}
                                    onClick={() => changeTheme(t.rgb)}
                                    className="w-6 h-6 rounded-full border border-white/10 hover:scale-125 transition-transform duration-300 relative group"
                                    style={{ backgroundColor: t.hex }}
                                >
                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-zinc-950 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-zinc-800">
                                        {t.name}
                                    </span>
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <button 
                onClick={(e) => handleNavClick(e, '#contact')}
                className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-white text-zinc-950 text-xs font-bold hover:bg-zinc-200 transition-all duration-300 hover:scale-105 active:scale-95"
            >
                Let's Talk <ArrowRight size={14} />
            </button>

            <button 
                className="md:hidden text-zinc-400 hover:text-white p-2 transition-colors z-50 relative" 
                onClick={() => setIsOpen(true)}
            >
                <Menu size={20} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Fullscreen Mobile Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-xl flex flex-col items-center justify-center p-8"
          >
             <button 
                onClick={() => setIsOpen(false)} 
                className="absolute top-8 right-8 text-zinc-400 hover:text-white p-2 rounded-full border border-zinc-800 hover:bg-zinc-900 transition-all"
            >
                <X size={24} />
            </button>

            <div className="flex flex-col items-center gap-6">
                {navItems.map((item, i) => (
                    <div key={item.name} className="overflow-hidden">
                        <motion.a
                            href={item.href}
                            initial={{ y: "120%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "120%" }}
                            transition={{ delay: i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className="text-3xl sm:text-4xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-zinc-500 hover:to-accent transition-all block text-center p-2"
                        >
                            {item.name}
                        </motion.a>
                    </div>
                ))}
            </div>
            
            {/* Mobile Theme Picker */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-12 flex gap-4"
            >
                {themes.map((t) => (
                    <button
                        key={t.name}
                        onClick={() => changeTheme(t.rgb)}
                        className="w-8 h-8 rounded-full border border-white/10"
                        style={{ backgroundColor: t.hex }}
                    />
                ))}
            </motion.div>

            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-12 text-zinc-500 text-xs font-mono uppercase tracking-widest"
            >
                RioFolio V.2.2.26
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;