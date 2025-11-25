import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Calendar } from 'lucide-react';
import { EducationItem } from '../types';

const educationData: EducationItem[] = [
  {
    id: 1,
    degree: 'Master of Computer Science',
    school: 'Stanford University',
    year: '2021 - 2023',
    description: 'Specialized in Artificial Intelligence and Human-Computer Interaction. Graduated with distinction. Thesis on "Adaptive UI Systems using Generative Adversarial Networks".'
  },
  {
    id: 2,
    degree: 'Bachelor of Science in Informatics',
    school: 'Bandung Institute of Technology',
    year: '2017 - 2021',
    description: 'Focus on Software Engineering and Data Structures. Lead Developer for the university tech club. Dean\'s List for 6 consecutive semesters.'
  },
  {
    id: 3,
    degree: 'Full Stack Web Development Bootcamp',
    school: 'Hacktiv8 Indonesia',
    year: '2020',
    description: 'Intensive 12-week immersive program covering JavaScript, Node.js, React, and cloud architecture. Built 3 real-world projects in agile teams.'
  }
];

const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 relative bg-zinc-950/50">
      {/* Background Diagonal Pattern */}
      <div className="absolute inset-0 bg-diagonal-pattern opacity-[0.3] fade-mask-y pointer-events-none" />

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="mb-16">
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex items-center gap-2 mb-4"
            >
                <span className="h-px w-8 bg-accent"></span>
                <span className="text-sm font-bold uppercase tracking-widest text-zinc-400">Academic Background</span>
            </motion.div>
            
            <div className="overflow-hidden">
                <motion.h2 
                    initial={{ y: "100%" }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: "circOut" }}
                    className="text-4xl md:text-5xl font-display font-bold text-white"
                >
                    Education <br /> <span className="text-zinc-600">History</span>
                </motion.h2>
            </div>
        </div>

        <div className="relative border-l border-zinc-800 ml-3 md:ml-6 space-y-12 pb-12">
            {educationData.map((item, index) => (
                <motion.div 
                    key={item.id}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
                    transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
                    className="relative pl-8 md:pl-12"
                >
                    {/* Timeline Dot */}
                    <div className="absolute -left-[5px] top-2 w-[11px] h-[11px] rounded-full bg-zinc-950 border-2 border-accent z-10 shadow-[0_0_10px_rgba(16,185,129,0.2)]"></div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                        <h3 className="text-xl md:text-2xl font-bold text-white font-display">{item.degree}</h3>
                        <span className="hidden sm:block text-zinc-600">•</span>
                        <div className="flex items-center gap-2 text-accent text-sm font-mono bg-accent/10 px-2 py-1 rounded border border-accent/20 w-fit">
                            <Calendar size={12} />
                            {item.year}
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-2 text-zinc-400 mb-4 font-medium">
                        <GraduationCap size={18} />
                        {item.school}
                    </div>
                    
                    <p className="text-zinc-500 leading-relaxed text-sm max-w-xl">
                        {item.description}
                    </p>
                </motion.div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Education;