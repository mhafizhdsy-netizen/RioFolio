import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Education from './components/Education';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import Background from './components/Background';
import BackToTop from './components/BackToTop';
import { ToastProvider } from './components/ToastSystem';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  return (
    <ToastProvider>
      <CustomCursor />
      <AnimatePresence mode="wait">
        {loading && <SplashScreen onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Background />
          <Navbar />
          <main className="relative z-10">
            <Hero />
            <About />
            <Skills />
            <Education />
            <Projects />
            <Contact />
          </main>
          <Footer />
          <BackToTop />
        </motion.div>
      )}
    </ToastProvider>
  );
};

export default App;