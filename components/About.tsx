import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { ScanFace } from 'lucide-react';

const About: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Adjusted scroll offset for better reading flow "scrubbing" effect
  // Starts when text top enters bottom 80% of screen, ends when it reaches top 20%
  const { scrollYProgress } = useScroll({
    target: textRef,
    offset: ["start 0.8", "start 0.2"]
  });

  const paragraph = "I am a creative developer who bridges the gap between design and technology. My work is driven by a passion for creating seamless, interactive, and highly performant digital experiences. I believe that the best websites are those that not only look good but feel good to use.";

  const words = paragraph.split(" ");

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background Dot Pattern */}
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.2] fade-mask-y pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10" ref={containerRef}>
        
        {/* Section Header - Moved to Top */}
        <div className="mb-12 md:mb-16">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2 mb-2"
             >
                <span className="h-px w-8 bg-accent"></span>
                <span className="text-sm font-bold uppercase tracking-widest text-zinc-400 block">About Me</span>
             </motion.div>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
          
          {/* Left Column: Tech Profile Card - Now under the title */}
          <div className="w-full md:w-auto flex flex-col items-center md:items-start self-start shrink-0">
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative w-full max-w-[240px] mx-auto md:mx-0"
             >
                {/* HUD / Tech Frame Container */}
                <div className="relative aspect-square bg-zinc-900/40 backdrop-blur-sm border border-zinc-800 p-2 group">
                    
                    {/* Corner Brackets */}
                    <div className="absolute -top-[1px] -left-[1px] w-6 h-6 border-t-2 border-l-2 border-accent transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:opacity-50"></div>
                    <div className="absolute -bottom-[1px] -right-[1px] w-6 h-6 border-b-2 border-r-2 border-accent transition-all duration-500 group-hover:w-full group-hover:h-full group-hover:opacity-50"></div>
                    <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-zinc-600"></div>
                    <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-zinc-600"></div>

                    {/* Inner Image Container */}
                    <div className="relative w-full h-full overflow-hidden bg-zinc-950 border border-zinc-800/50">
                        {/* Scanline Overlay */}
                        <div className="absolute inset-0 z-20 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                        <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-b from-transparent via-accent/5 to-transparent h-[200%] w-full animate-scan-fast opacity-50"></div>
                        
                        <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop" 
                            alt="Profile" 
                            loading="lazy"
                            decoding="async"
                            onLoad={() => setImageLoaded(true)}
                            className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        />
                        
                        {/* Status Overlay */}
                        <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent z-30 flex justify-between items-end">
                            <div>
                                <div className="text-[9px] text-accent font-mono tracking-widest mb-0.5 flex items-center gap-1.5">
                                    <span className="w-1 h-1 bg-accent rounded-full animate-pulse"></span>
                                    ONLINE
                                </div>
                                <div className="text-white font-display font-bold text-sm tracking-wide">RIO_DEV</div>
                            </div>
                            <ScanFace className="text-zinc-600 group-hover:text-accent transition-colors" size={18} strokeWidth={1.5} />
                        </div>
                    </div>

                    {/* Decorative Data Elements */}
                    <div className="absolute -right-6 top-6 hidden md:flex flex-col gap-2">
                        <div className="w-12 h-px bg-zinc-800"></div>
                        <div className="text-[8px] text-zinc-600 font-mono rotate-90 origin-left translate-x-2 w-16">ID: 884-XJ</div>
                    </div>
                </div>
             </motion.div>
          </div>
          
          {/* Right Column: Text & Stats */}
          <div className="w-full flex-1">
            {/* Added explicit gap-x-[0.25em] for natural word spacing instead of margin on words */}
            <div 
              ref={textRef}
              className="flex flex-wrap gap-x-[0.25em] gap-y-1 md:gap-y-2 text-lg sm:text-xl md:text-3xl font-display leading-relaxed text-zinc-300"
            >
              {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                return (
                  <Word key={i} range={[start, end]} progress={scrollYProgress}>
                    {word}
                  </Word>
                );
              })}
            </div>

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mt-12 grid grid-cols-2 gap-4 md:gap-8"
            >
                <div className="p-6 border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-accent/30 transition-all duration-500 group">
                    <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2 font-display group-hover:text-accent transition-colors">5+</h3>
                    <div className="h-0.5 w-8 bg-zinc-700 mb-3 group-hover:w-full group-hover:bg-accent transition-all duration-500"></div>
                    <p className="text-zinc-500 font-medium uppercase tracking-wide text-xs">Years Experience</p>
                </div>
                <div className="p-6 border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/60 hover:border-accent/30 transition-all duration-500 group">
                    <h3 className="text-3xl sm:text-4xl font-bold text-white mb-2 font-display group-hover:text-accent transition-colors">50+</h3>
                    <div className="h-0.5 w-8 bg-zinc-700 mb-3 group-hover:w-full group-hover:bg-accent transition-all duration-500"></div>
                    <p className="text-zinc-500 font-medium uppercase tracking-wide text-xs">Projects Delivered</p>
                </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface WordProps {
  children: React.ReactNode;
  range: number[];
  progress: MotionValue<number>;
}

const Word: React.FC<WordProps> = ({ children, range, progress }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <motion.span style={{ opacity }} className="transition-colors duration-500 inline-block">
      {children}
    </motion.span>
  );
}

export default About;
