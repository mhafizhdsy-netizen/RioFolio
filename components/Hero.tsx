import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2, Terminal, ArrowRight, Mail } from 'lucide-react';

const ScrambleText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [display, setDisplay] = useState("");
  const [started, setStarted] = useState(false);
  // Including some special chars for hacker feel
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&[]{}<>";

  useEffect(() => {
    const startTimeout = setTimeout(() => {
        setStarted(true);
    }, delay * 1000);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      // Scramble speed
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 2; // Slower iteration for better effect
    }, 40);

    return () => clearInterval(interval);
  }, [text, started]);

  return <span className="inline-block min-w-[2ch]">{display || <span className="opacity-0">{text}</span>}</span>;
};

// New Typewriter Effect Component
const TypewriterEffect = () => {
    const words = ["EXPERIENCES", "SOLUTIONS", "INTERFACES", "PRODUCTS"];
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    
    useEffect(() => {
        const typeSpeed = isDeleting ? 50 : 150;
        const word = words[currentWordIndex];
        
        const timer = setTimeout(() => {
            if (!isDeleting && currentText === word) {
                // Finished typing word, wait before deleting
                setTimeout(() => setIsDeleting(true), 2000);
            } else if (isDeleting && currentText === "") {
                // Finished deleting, move to next word
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
            } else {
                // Typing or deleting
                const nextText = isDeleting 
                    ? word.substring(0, currentText.length - 1) 
                    : word.substring(0, currentText.length + 1);
                setCurrentText(nextText);
            }
        }, typeSpeed);

        return () => clearTimeout(timer);
    }, [currentText, isDeleting, currentWordIndex]);

    return (
        <span className="inline-block">
            {currentText}
            <span className="animate-pulse ml-1 text-accent">|</span>
        </span>
    );
};

const Hero: React.FC = () => {
  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
        opacity: 1, 
        y: 0,
        transition: {
            duration: 1,
            ease: [0.22, 1, 0.36, 1]
        }
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-start justify-center px-6 relative pt-32 md:pt-40 pb-20">
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.06] fade-mask-radial pointer-events-none" />

      <style>
        {`
          @keyframes text-shimmer {
            0% { background-position: 200% center; }
            100% { background-position: -200% center; }
          }
          .animate-text-shimmer {
            animation: text-shimmer 3s linear infinite;
          }
        `}
      </style>

      <div className="container mx-auto max-w-5xl z-10">
        
        {/* Header Tags */}
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="flex justify-between items-center w-full mb-12 text-zinc-500 font-mono text-xs uppercase tracking-widest border-b border-zinc-800 pb-4"
        >
            <span>V.2.2.26</span>
            <div className="flex items-center gap-3 px-3 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800/50">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75 duration-1000"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.6)]"></span>
                </span>
                {/* Updated gradient to use 'via-accent' for dynamic theme support */}
                <span className="font-bold bg-gradient-to-r from-zinc-600 via-accent to-zinc-600 bg-[length:200%_auto] animate-text-shimmer bg-clip-text text-transparent">
                  System Online
                </span>
            </div>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-8">
                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium mb-8"
                >
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                    </span>
                    Available for freelance
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-tight mb-8 text-white space-y-2">
                    <div className="overflow-hidden">
                        <motion.span 
                            initial={{ y: "110%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                            className="block text-zinc-500 text-2xl sm:text-3xl md:text-5xl font-normal"
                        >
                            I engineer
                        </motion.span>
                    </div>
                    
                    <div className="overflow-hidden">
                        <motion.span 
                            initial={{ y: "110%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
                            className="block"
                        >
                            {/* Start scramble immediately as it slides up */}
                            <ScrambleText text="DIGITAL" delay={0.2} />
                        </motion.span>
                    </div>

                    <div className="overflow-hidden">
                        <motion.span 
                            initial={{ y: "110%" }}
                            animate={{ y: 0 }}
                            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                            className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500 min-h-[1.2em]"
                        >
                            <TypewriterEffect />
                        </motion.span>
                    </div>
                </h1>

                <motion.p 
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    transition={{ delay: 0.5, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="text-zinc-400 text-lg md:text-xl max-w-xl leading-relaxed mb-10"
                >
                    Full-stack developer specializing in building exceptional digital experiences. 
                    Merging clean code with pixel-perfect design.
                </motion.p>

                <motion.div 
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    transition={{ delay: 0.7, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="flex flex-col sm:flex-row items-center gap-4"
                >
                    <button 
                        onClick={scrollToProjects}
                        className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-black font-bold rounded-full transition-all duration-300 overflow-hidden hover:scale-105 active:scale-95 shadow-lg shadow-accent/20 hover:shadow-accent/40 w-full sm:w-auto"
                    >
                        <span className="relative z-10">View Projects</span>
                        <ArrowRight size={16} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                    <button 
                        onClick={scrollToContact}
                        className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/10 hover:border-white/20 active:scale-95 w-full sm:w-auto backdrop-blur-sm"
                    >
                        <Mail size={16} className="transition-colors duration-300 group-hover:text-accent" />
                        <span>Contact Me</span>
                    </button>
                </motion.div>
            </div>

            {/* Abstract Tech Visual */}
            <div className="md:col-span-4 relative hidden md:block pt-4">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1, rotate: 360 }}
                    transition={{ 
                        scale: { duration: 1.5, ease: [0.22, 1, 0.36, 1] },
                        opacity: { duration: 1.5 },
                        rotate: { duration: 50, repeat: Infinity, ease: "linear" } 
                    }}
                    className="w-64 h-64 border border-zinc-800 rounded-full flex items-center justify-center mx-auto"
                >
                     <div className="w-48 h-48 border border-zinc-800 rounded-full flex items-center justify-center">
                        <div className="w-32 h-32 border border-zinc-700/50 rounded-full relative">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 bg-accent rounded-full shadow-[0_0_10px_#10b981]" />
                        </div>
                     </div>
                </motion.div>
                
                <motion.div 
                    initial={{ scale: 0.8, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 grid grid-cols-2 gap-4"
                >
                    <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl">
                        <Code2 className="text-accent" size={24} />
                    </div>
                    <div className="p-3 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl translate-y-4">
                        <Terminal className="text-secondary" size={24} />
                    </div>
                </motion.div>
            </div>
        </div>

        {/* Redesigned CTA - Animated Mouse Icon */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1, ease: 'easeOut' }}
            className="mt-32 flex justify-center"
        >
            <a
                href="#about"
                onClick={(e) => {
                    e.preventDefault();
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="cursor-pointer group flex flex-col items-center gap-4"
                aria-label="Scroll to explore"
            >
                <div className="w-6 h-10 border-2 border-zinc-700 group-hover:border-accent rounded-full flex justify-center items-start p-1 transition-colors duration-500">
                    <motion.div
                        className="w-1.5 h-1.5 bg-zinc-700 group-hover:bg-accent rounded-full"
                        animate={{ y: [0, 16, 0] }}
                        transition={{
                            duration: 2.2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                </div>
                <p className="text-[10px] font-mono tracking-[0.2em] text-zinc-600 group-hover:text-accent transition-colors duration-500 uppercase">
                    Scroll to Explore
                </p>
            </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;