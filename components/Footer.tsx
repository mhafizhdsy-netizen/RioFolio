import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Hexagon, Mail, MapPin, Github, Instagram, Clock } from 'lucide-react';
import LegalModal from './LegalModal';

const TiktokIcon = (props: { size: number; [key: string]: any }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M9 12a4 4 0 1 0 4 4v-12a5 5 0 0 0 5 5" />
    </svg>
  );

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const [activeModal, setActiveModal] = useState<'privacy' | 'terms' | null>(null);
  const [malangTime, setMalangTime] = useState<string>("");

  useEffect(() => {
    // Function to update time for Malang (Asia/Jakarta)
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Jakarta',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      };
      setMalangTime(now.toLocaleTimeString('en-GB', options));
    };

    updateTime();
    // Update every minute to keep it sync without over-rendering
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (href.startsWith('#') && href.length > 1) {
        const targetId = href.replace('#', '');
        const element = document.getElementById(targetId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
  };

  const socialLinks = [
    { name: "GitHub", href: "#", icon: Github },
    { name: "TikTok", href: "#", icon: TiktokIcon },
    { name: "Instagram", href: "#", icon: Instagram },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
    }
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-24 pb-8 overflow-hidden relative">
      {/* Background Pattern for Footer */}
      <div className="absolute inset-0 bg-dot-pattern opacity-[0.03] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 mb-20"
        >
            {/* Brand Column (4 cols) */}
            <motion.div variants={itemVariants} className="md:col-span-4 flex flex-col items-start">
                <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="flex items-center gap-2 mb-6 text-white group">
                    <Hexagon className="text-accent fill-accent/10 group-hover:rotate-180 transition-transform duration-500" size={32} strokeWidth={2} />
                    <span className="font-display font-bold text-xl tracking-wider">RIOFOLIO</span>
                </a>
                <p className="text-zinc-500 text-sm leading-relaxed mb-8 max-w-sm">
                    Crafting digital experiences where precision meets creativity. 
                    Building scalable, performant, and aesthetic software solutions.
                </p>
                
                <div className="flex gap-4">
                    {socialLinks.map((social) => (
                        <a 
                            key={social.name} 
                            href={social.href}
                            className="p-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-accent hover:bg-zinc-800 transition-all duration-300"
                        >
                            <social.icon size={18} />
                        </a>
                    ))}
                </div>
            </motion.div>

            {/* Sitemap Column (3 cols) */}
            <motion.div variants={itemVariants} className="md:col-span-3">
                <div className="overflow-hidden mb-6">
                    <h4 className="text-white font-bold block text-sm uppercase tracking-wider">
                        Navigation
                    </h4>
                </div>
                <ul className="space-y-3">
                    {[
                        { name: "Home", href: "#home" },
                        { name: "About", href: "#about" },
                        { name: "Expertise", href: "#skills" },
                        { name: "Education", href: "#education" },
                        { name: "Projects", href: "#projects" },
                    ].map((item) => (
                        <li key={item.name}>
                            <a 
                                href={item.href} 
                                onClick={(e) => handleNavClick(e, item.href)}
                                className="text-zinc-500 text-sm hover:text-accent transition-colors flex items-center gap-2 group w-fit"
                            >
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-accent transition-colors" />
                                {item.name}
                            </a>
                        </li>
                    ))}
                </ul>
            </motion.div>

            {/* Contact Column (5 cols) */}
             <motion.div variants={itemVariants} className="md:col-span-5">
                <div className="overflow-hidden mb-6">
                    <h4 className="text-white font-bold block text-sm uppercase tracking-wider">
                        Get in Touch
                    </h4>
                </div>
                
                <div className="flex flex-col gap-6">
                    <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 flex items-start gap-4 hover:border-zinc-700 transition-colors">
                        <div className="p-2 bg-accent/10 rounded text-accent mt-0.5">
                            <Mail size={18} />
                        </div>
                        <div>
                            <span className="text-zinc-400 text-xs uppercase font-bold tracking-wider">Email Me</span>
                            <a href="mailto:hafizhdsy24@gmail.com" className="block text-white font-medium hover:text-accent transition-colors">hafizhdsy24@gmail.com</a>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg bg-zinc-900/50 border border-zinc-800 flex items-start gap-4 hover:border-zinc-700 transition-colors">
                        <div className="p-2 bg-secondary/10 rounded text-secondary mt-0.5">
                            <MapPin size={18} />
                        </div>
                        <div>
                            <span className="text-zinc-400 text-xs uppercase font-bold tracking-wider">Based In</span>
                            <p className="text-white font-medium">Malang, Indonesia</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10"
        >
            {/* Left: Copyright */}
            <p className="text-zinc-600 text-xs font-mono order-2 md:order-1">
                &copy; {currentYear} RioFolio.
            </p>

            {/* Center: Legal Links */}
            <div className="flex gap-6 order-3 md:order-2">
                <button onClick={() => setActiveModal('privacy')} className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">Privacy Policy</button>
                <button onClick={() => setActiveModal('terms')} className="text-zinc-600 hover:text-zinc-400 text-xs transition-colors">Terms of Service</button>
            </div>
            
            {/* Right: Status / Time Indicator */}
            <div className="order-1 md:order-3">
                <div className="flex items-center gap-2.5 px-3 py-1.5 bg-zinc-900/50 border border-zinc-800 rounded-full text-[10px] font-mono text-zinc-400 group hover:border-accent/30 transition-colors cursor-default backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-accent shadow-[0_0_8px_rgba(var(--accent-rgb),0.6)]"></span>
                    </span>
                    <span className="text-zinc-300 tracking-wider">
                        {malangTime || "--:--"} <span className="text-zinc-500">WIB</span>
                    </span>
                </div>
            </div>
        </motion.div>

        {/* Large Watermark */}
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 0.02, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1 }}
            className="absolute -bottom-4 left-0 right-0 overflow-hidden pointer-events-none"
        >
            <h1 className="text-[14vw] font-display font-bold text-white leading-none whitespace-nowrap text-center select-none">
                RIOFOLIO
            </h1>
        </motion.div>
      </div>

      <LegalModal 
        isOpen={!!activeModal}
        type={activeModal || 'privacy'}
        onClose={() => setActiveModal(null)}
      />
    </footer>
  );
};

export default Footer;