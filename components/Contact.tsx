import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Copy } from 'lucide-react';
import { useToast } from './ToastSystem';
import Comments from './Comments';

const Contact: React.FC = () => {
  const { addToast } = useToast();

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('hafizhdsy24@gmail.com');
    addToast('Email copied to clipboard!', 'success');
  };

  return (
    <section id="contact" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-5xl">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900/30 p-12 md:p-24 text-center group mb-12"
        >
            {/* Background Grid */}
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-zinc-950/80 pointer-events-none" />
            
            <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 text-xs font-mono mb-8 uppercase tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
                    Open for opportunities
                </div>
                
                <div className="overflow-hidden mb-6">
                    <motion.h2 
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                        className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white tracking-tight"
                    >
                        Have a project <br /> in mind?
                    </motion.h2>
                </div>
                
                <p className="text-zinc-400 text-lg md:text-xl max-w-xl mx-auto mb-12 leading-relaxed">
                    I'm currently available for freelance work and open to full-time opportunities. 
                    Let's build something exceptional together.
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                    <a 
                        href="mailto:hafizhdsy24@gmail.com" 
                        className="group relative px-8 py-4 bg-white text-zinc-950 font-bold rounded-full transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
                    >
                        <Mail size={18} />
                        <span>Send me an email</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <button 
                        onClick={handleCopyEmail}
                        className="px-8 py-4 border border-zinc-700 text-zinc-300 font-bold rounded-full hover:bg-zinc-800 hover:text-white hover:border-zinc-500 transition-all flex items-center gap-2 group/copy"
                    >
                        <Copy size={18} className="group-hover/copy:text-accent transition-colors" />
                        Copy Email Address
                    </button>
                </div>
            </div>
        </motion.div>

        {/* Comment Section */}
        <Comments />
      </div>
    </section>
  );
};

export default Contact;
