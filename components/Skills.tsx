import React from 'react';
import { motion } from 'framer-motion';
import { Code, Database, Layout, Server, Zap, Wrench } from 'lucide-react';

const Skills: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30, 
      filter: "blur(8px)", 
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: "blur(0px)", 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  return (
    <section id="skills" className="py-24 relative">
       {/* Background Cross Pattern */}
       <div className="absolute inset-0 bg-cross-pattern opacity-[0.4] fade-mask-y pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="mb-16">
             <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-2 mb-4"
             >
                <span className="h-px w-8 bg-accent"></span>
                <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">Expertise</span>
             </motion.div>
             <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                {/* Masked Un-reveal Title */}
                <div className="overflow-hidden">
                    <motion.h2 
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white max-w-lg"
                    >
                        Technical <br /><span className="text-zinc-500">Arsenal</span>
                    </motion.h2>
                </div>
                <p className="text-zinc-400 max-w-sm text-sm leading-relaxed">
                    I constantly keep up with the latest technologies to ensure my work is fast, secure, and reliable.
                </p>
             </div>
        </div>

        {/* Bento Grid - Compact Design & Larger Content */}
        <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
            {/* Frontend Block */}
            <motion.div 
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="col-span-1 p-6 rounded-xl glass-panel relative overflow-hidden group min-h-[220px] flex flex-col hover:border-accent/30 hover:shadow-[0_10px_40px_-15px_rgba(var(--accent-rgb),0.15)] hover:bg-zinc-900/60 transition-all duration-500"
            >
                {/* Background Icon with Rotation */}
                <div className="absolute -top-2 -right-2 p-0 opacity-5 group-hover:opacity-10 transition-all duration-700 transform group-hover:scale-110 group-hover:-rotate-12 origin-top-right">
                    <Layout size={100} />
                </div>
                
                <div className="mb-auto z-10">
                    <div className="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center mb-4 text-accent border border-white/5 group-hover:border-accent/20 transition-colors duration-500">
                         <Code size={22} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">Frontend</h3>
                    <p className="text-zinc-400 text-sm">Pixel-perfect implementation with modern frameworks.</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-6 z-10">
                    {["React", "Next.js", "TypeScript", "Tailwind", "Motion", "Three.js"].map(skill => (
                        <span key={skill} className="px-2.5 py-1 bg-zinc-950/50 border border-zinc-800 group-hover:border-zinc-700 group-hover:text-zinc-200 transition-colors duration-300 rounded text-xs font-mono text-zinc-300">
                            {skill}
                        </span>
                    ))}
                </div>
            </motion.div>

            {/* Backend Block */}
            <motion.div 
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="col-span-1 p-6 rounded-xl glass-panel relative overflow-hidden group min-h-[220px] flex flex-col hover:border-accent/30 hover:shadow-[0_10px_40px_-15px_rgba(var(--accent-rgb),0.15)] hover:bg-zinc-900/60 transition-all duration-500"
            >
                {/* Background Icon with Rotation */}
                <div className="absolute -top-2 -right-2 p-0 opacity-5 group-hover:opacity-10 transition-all duration-700 transform group-hover:scale-110 group-hover:-rotate-12 origin-top-right">
                    <Server size={100} />
                </div>
                
                <div className="mb-auto z-10">
                    <div className="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center mb-4 text-secondary border border-white/5 group-hover:border-secondary/40 transition-colors duration-500">
                         <Database size={22} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-secondary transition-colors duration-300">Backend</h3>
                    <p className="text-zinc-400 text-sm">Robust & scalable server-side logic.</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-6 z-10">
                    {["Node.js", "PostgreSQL", "GraphQL", "Prisma", "Redis", "Docker"].map(skill => (
                        <span key={skill} className="px-2.5 py-1 bg-zinc-950/50 border border-zinc-800 group-hover:border-zinc-700 group-hover:text-zinc-200 transition-colors duration-300 rounded text-xs font-mono text-zinc-300">
                            {skill}
                        </span>
                    ))}
                </div>
            </motion.div>

            {/* Performance & Tools Block */}
            <motion.div 
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="col-span-1 p-6 rounded-xl glass-panel relative overflow-hidden group min-h-[220px] flex flex-col hover:border-accent/30 hover:shadow-[0_10px_40px_-15px_rgba(var(--accent-rgb),0.15)] hover:bg-zinc-900/60 transition-all duration-500"
            >
                {/* Background Icon with Rotation */}
                <div className="absolute -top-2 -right-2 p-0 opacity-5 group-hover:opacity-10 transition-all duration-700 transform group-hover:scale-110 group-hover:-rotate-12 origin-top-right">
                    <Zap size={100} />
                </div>

                <div className="mb-auto z-10">
                    <div className="w-10 h-10 rounded-lg bg-zinc-800/50 flex items-center justify-center mb-4 text-yellow-400 border border-white/5 group-hover:border-yellow-400/40 transition-colors duration-500">
                         <Wrench size={22} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">Tools & Perf</h3>
                    <p className="text-zinc-400 text-sm">Optimization, CI/CD pipelines & Workflow.</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-6 z-10">
                    {["Git", "AWS", "Vercel", "Jest", "CI/CD", "Figma"].map(skill => (
                        <span key={skill} className="px-2.5 py-1 bg-zinc-950/50 border border-zinc-800 group-hover:border-zinc-700 group-hover:text-zinc-200 transition-colors duration-300 rounded text-xs font-mono text-zinc-300">
                            {skill}
                        </span>
                    ))}
                </div>
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
