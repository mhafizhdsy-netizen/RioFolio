import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SplashScreenProps {
  onComplete: () => void;
}

const LogoDecryption = () => {
  const targetText = "RIOFOLIO";
  const [displayText, setDisplayText] = useState("00000000"); 
  const chars = "01ABCDEF"; // Hex/Binary feel for tech theme

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        targetText
          .split("")
          .map((letter, index) => {
            // Lock in the letter if the iteration has passed its index
            if (index < iteration) {
              return targetText[index];
            }
            // Otherwise show random hex char
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      // Slower, more deliberate reveal speed
      if (iteration >= targetText.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 4; 
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-3xl sm:text-4xl md:text-6xl font-display font-bold text-white tracking-widest min-w-[200px] text-center inline-block">
      {displayText}
    </span>
  );
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 1; // Slightly faster boot
      });
    }, 40);

    // Step sequencer
    const step1 = setTimeout(() => setStep(1), 500); // Start text
    const step2 = setTimeout(() => setStep(2), 2200); // Logo Reveal
    const step3 = setTimeout(() => setStep(3), 4200); // Exit

    const finish = setTimeout(onComplete, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(step1);
      clearTimeout(step2);
      clearTimeout(step3);
      clearTimeout(finish);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {step < 3 && (
        <motion.div
          className="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center font-mono"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Phase 1: Boot Text & Progress */}
          {step < 2 && (
            <div className="w-full max-w-[280px] relative">
              <div className="flex justify-between text-xs text-zinc-500 mb-2 font-bold tracking-widest uppercase">
                <span>Bios Check</span>
                <span>Mem: OK</span>
              </div>
              
              {/* Progress Bar */}
              <div className="h-0.5 w-full bg-zinc-900 overflow-hidden mb-6">
                <motion.div 
                  className="h-full bg-accent shadow-[0_0_10px_#10b981]"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="h-24 overflow-hidden relative border-l-2 border-zinc-800 pl-4">
                <motion.div 
                   initial={{ y: 0 }}
                   animate={{ y: -120 }}
                   transition={{ duration: 2.2, ease: "linear" }}
                   className="text-[10px] text-zinc-500 space-y-1 font-mono leading-relaxed"
                >
                  <p>&gt; KERNEL_INIT_SEQUENCE_START</p>
                  <p>&gt; MOUNT_VOL: /DEV/RIO_MAIN</p>
                  <p>&gt; LOADING_MODULES: [UI, UX, GL]</p>
                  <p>&gt; ALLOCATING_VRAM... OK</p>
                  <p>&gt; DECRYPTING_ASSETS...</p>
                  <p>&gt; ESTABLISHING_SECURE_LINK...</p>
                  <p>&gt; RENDER_ENGINE: ACTIVE</p>
                  <p className="text-accent font-bold">&gt; EXEC_SUCCESS</p>
                </motion.div>
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent"></div>
              </div>
            </div>
          )}

          {/* Phase 2: Logo Decryption Reveal */}
          {step >= 2 && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0, filter: "blur(10px)" }}
              animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="relative z-10 flex flex-col items-center"
            >
              <div className="flex items-center gap-6">
                <motion.span 
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-4xl md:text-6xl text-zinc-700 font-mono font-light"
                >
                    [
                </motion.span>
                
                <LogoDecryption />

                <motion.span 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="text-4xl md:text-6xl text-zinc-700 font-mono font-light"
                >
                    ]
                </motion.span>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "100px" }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="mt-8 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
              />
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="mt-4 text-[10px] text-accent font-mono tracking-[0.5em] uppercase"
              >
                Access Granted
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
