import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Smartphone, Globe, Cpu, Layers, ArrowUpRight, Lock } from 'lucide-react';
import { Project } from '../types';

const projects: Project[] = [
  {
    id: 1,
    title: 'FinTech Dashboard',
    description: 'A high-performance financial analytics dashboard with real-time data visualization and complex filtering systems. Built to handle millions of data points without lag.',
    tags: ['Next.js', 'D3.js', 'TypeScript', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
    link: '#',
    github: '#',
    category: 'Web',
  },
  {
    id: 2,
    title: 'Zenith Fitness',
    description: 'Cross-platform mobile application for workout tracking and diet planning. Features real-time sync, gamification elements, and wearable integration.',
    tags: ['React Native', 'Firebase', 'Redux', 'HealthKit'],
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=1975&auto=format&fit=crop',
    link: '#',
    github: '#',
    category: 'Mobile',
  },
  {
    id: 3,
    title: 'AI Architect',
    description: 'SaaS platform leveraging generative AI to create architectural floor plans and 3D previews from text descriptions. Features instant rendering and export capabilities.',
    tags: ['React', 'Three.js', 'OpenAI API', 'WebGL'],
    image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=2000&auto=format&fit=crop',
    link: '#',
    github: '#',
    category: 'AI',
  },
  {
    id: 4,
    title: 'Nebula Stream',
    description: 'Interactive streaming platform built with WebRTC, featuring ultra-low latency and custom engagement tools. Scaled to support 10k+ concurrent users.',
    tags: ['WebRTC', 'Node.js', 'Redis', 'Socket.io'],
    image: 'https://images.unsplash.com/photo-1614624532983-4ce03382d63d?q=80&w=2000&auto=format&fit=crop',
    link: '#',
    github: '#',
    category: 'Web',
  },
  {
    id: 5,
    title: 'CryptoVault App',
    description: 'Secure mobile wallet for managing cryptocurrency assets. Includes biometric authentication, real-time market charts, and secure P2P transfer protocols.',
    tags: ['Flutter', 'Dart', 'Blockchain', 'Solidity'],
    image: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=1969&auto=format&fit=crop',
    link: '#',
    github: '#',
    category: 'Mobile',
  },
  {
    id: 6,
    title: 'VisionSense',
    description: 'Computer vision system for automated quality control in manufacturing lines. Uses deep learning to detect defects with 99.9% accuracy.',
    tags: ['Python', 'TensorFlow', 'OpenCV', 'FastAPI'],
    image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=2032&auto=format&fit=crop',
    link: '#',
    github: '#',
    category: 'AI',
  },
];

const categories = ['Web', 'Mobile', 'AI'];

const Projects: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('Web');
  const filteredProjects = projects.filter(p => p.category === activeCategory);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.2,
        when: "afterChildren"
      }
    }
  };

  return (
    <section id="projects" className="py-32 relative">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        {/* Header aligned with content */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-2 mb-4"
                >
                    <span className="h-px w-8 bg-accent"></span>
                    <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">Selected Works</span>
                </motion.div>
                
                <div className="overflow-hidden">
                    <motion.h2 
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                        className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white leading-tight"
                    >
                        Featured <br /> <span className="text-zinc-600">Projects</span>
                    </motion.h2>
                </div>
            </div>

            {/* Filter Tabs */}
            <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-wrap gap-2"
            >
                {categories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-6 py-2 rounded-full text-xs font-bold font-mono uppercase tracking-wider transition-all duration-300 border relative overflow-hidden group ${
                            activeCategory === cat 
                            ? 'text-zinc-950 border-accent' 
                            : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-white'
                        }`}
                    >
                        {activeCategory === cat && (
                            <motion.div 
                                layoutId="activeTab"
                                className="absolute inset-0 bg-accent"
                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            />
                        )}
                        <span className="relative z-10">{cat}</span>
                    </button>
                ))}
            </motion.div>
        </div>

        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
             <motion.div
               key={activeCategory}
               variants={containerVariants}
               initial="hidden"
               animate="visible"
               exit="exit"
               className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
             >
               {filteredProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
               ))}
               
               {filteredProjects.length === 0 && (
                  <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-20 text-zinc-600 col-span-full"
                  >
                      <p>No projects found in this category yet.</p>
                  </motion.div>
               )}
             </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const getCategoryIcon = (cat: string) => {
    switch(cat) {
        case 'Mobile': return <Smartphone size={14} />;
        case 'Web': return <Globe size={14} />;
        case 'AI': return <Cpu size={14} />;
        default: return <Layers size={14} />;
    }
  };

  const cardVariants = {
    hidden: { 
        opacity: 0, 
        y: 30,
        filter: "blur(4px)"
    },
    visible: { 
        opacity: 1, 
        y: 0, 
        filter: "blur(0px)",
        transition: { 
            duration: 0.5, 
            ease: [0.25, 0.1, 0.25, 1] 
        } 
    }
  };

  return (
    <motion.div 
      variants={cardVariants}
      className="group relative flex flex-col h-full bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-500 hover:border-accent/50 hover:bg-zinc-900/50 hover:shadow-[0_0_30px_-10px_rgba(var(--accent-rgb),0.15)]"
    >
        {/* Browser Header */}
        <div className="bg-zinc-950/50 px-4 py-3 border-b border-white/5 flex items-center gap-4 select-none shrink-0 z-20 relative transition-colors duration-500 group-hover:bg-zinc-950/80">
            {/* Traffic Lights */}
            <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/50 group-hover:bg-red-500 transition-colors duration-500" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/50 group-hover:bg-yellow-500 transition-colors duration-500 delay-75" />
                <div className="w-2.5 h-2.5 rounded-full bg-zinc-700/50 group-hover:bg-green-500 transition-colors duration-500 delay-150" />
            </div>
            
            {/* URL Bar */}
            <div className="flex-1 bg-zinc-900/80 rounded flex items-center gap-2 px-3 py-1 border border-white/5 group-hover:border-white/10 transition-colors">
                <Lock size={10} className="text-zinc-600 group-hover:text-accent transition-colors duration-500" />
                <span className="text-[10px] font-mono text-zinc-600 truncate w-full group-hover:text-zinc-500 transition-colors">
                    localhost:3000/{project.title.toLowerCase().replace(/\s/g, '-')}
                </span>
            </div>
        </div>

        {/* Content Wrapper */}
        <div className="flex flex-col flex-1 relative bg-zinc-900/0">
            {/* Image Section */}
            <div className="relative aspect-video w-full overflow-hidden bg-zinc-950 border-b border-white/5 group-hover:border-accent/10 transition-colors duration-500">
                <AnimatePresence>
                    {!imageLoaded && (
                        <motion.div
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0 bg-zinc-900 animate-pulse"
                        />
                    )}
                </AnimatePresence>

                {/* Image Overlay - Fades out on hover for "Cinematic Reveal" */}
                <div className="absolute inset-0 z-10 bg-zinc-950/20 mix-blend-multiply group-hover:opacity-0 transition-opacity duration-700" />
                
                <img 
                    src={project.image} 
                    alt={project.title} 
                    className={`w-full h-full object-cover transform transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-110 grayscale-[0.5] group-hover:grayscale-0 ${imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}`}
                    onLoad={() => setImageLoaded(true)}
                />

                {/* Floating Category Badge */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-white bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
                    {getCategoryIcon(project.category)}
                    <span>{project.category}</span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-6 md:p-8 flex flex-col flex-1 relative">
                {/* Watermark Number - Moves slightly on hover */}
                <div className="absolute right-4 top-4 text-6xl font-bold text-white/[0.02] pointer-events-none font-display leading-none select-none transition-transform duration-700 group-hover:-translate-x-2">
                    0{project.id}
                </div>

                <h3 className="text-xl md:text-2xl font-display font-bold text-white mb-3 group-hover:text-accent transition-colors duration-300 relative z-10">
                    {project.title}
                </h3>

                <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light line-clamp-3 relative z-10 group-hover:text-zinc-300 transition-colors duration-500">
                    {project.description}
                </p>

                <div className="mt-auto relative z-10">
                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.slice(0, 3).map((tag) => (
                            <span 
                                key={tag} 
                                className="px-2.5 py-1 text-[10px] font-medium font-mono text-zinc-500 bg-zinc-950 border border-zinc-800 rounded transition-colors group-hover:border-zinc-700 group-hover:text-zinc-400"
                            >
                                {tag}
                            </span>
                        ))}
                        {project.tags.length > 3 && (
                            <span className="px-2.5 py-1 text-[10px] font-medium font-mono text-zinc-500 bg-zinc-950 border border-zinc-800 rounded">
                                +{project.tags.length - 3}
                            </span>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3">
                        <a 
                            href={project.link} 
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white text-zinc-950 font-bold text-xs rounded-lg hover:bg-zinc-200 transition-all duration-300 active:scale-95 shadow-lg shadow-white/5"
                        >
                            Live Demo 
                            <ArrowUpRight size={14} />
                        </a>
                        <a 
                            href={project.github} 
                            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-zinc-900 border border-zinc-800 text-white font-medium text-xs rounded-lg hover:bg-zinc-800 hover:border-accent/30 transition-all duration-300 active:scale-95 group/git"
                        >
                            <Github size={16} className="text-zinc-400 group-hover/git:text-white transition-colors" /> 
                            <span>Source</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </motion.div>
  );
};

export default Projects;