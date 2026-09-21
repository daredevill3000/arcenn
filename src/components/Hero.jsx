import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import AnimatedButton from './motion/AnimatedButton';

export default function Hero({ onOpenApply, isLoaded = true }) {
  const shouldReduceMotion = useReducedMotion();

  const scrollTo = (id) => {
    const element = document.querySelector(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const easeArcen = [0.16, 1, 0.3, 1];

  return (
    <section
      className="relative min-h-[92vh] pt-32 sm:pt-36 pb-16 sm:pb-20 flex flex-col justify-between bg-[#F2EFE6] bg-technical-grid border-b border-[#11120F]/14 overflow-hidden"
    >
      {/* Corner Technical Crosshairs & Data Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute top-8 left-8 sm:top-10 sm:left-10 font-mono text-[10px] text-[#77766F] hidden md:block select-none"
      >
        + SYS_ACTIVE // REF. 2026.09
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 0.6 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.15 }}
        className="absolute top-8 right-8 sm:top-10 sm:right-10 font-mono text-[10px] text-[#77766F] uppercase tracking-widest hidden md:block select-none"
      >
        <span>LAT 37.7749° N · LON 122.4194° W</span>
      </motion.div>

      <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full my-auto">
        {/* Top Tag & Status Line */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: 0.6, delay: 0.2, ease: easeArcen }}
          className="mb-8 flex flex-wrap items-center gap-3 sm:gap-4"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-[#D85B46] font-semibold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#D85B46] animate-coral-dot inline-block" />
            01 / ARCEN RECRUITMENT
          </span>
          <span className="w-8 sm:w-12 h-[1px] bg-[#11120F]/20" />
          <span className="font-mono text-xs uppercase tracking-widest text-[#77766F] hidden sm:inline">
            TECHNOLOGY • PEOPLE • REAL-WORLD IMPACT
          </span>
        </motion.div>

        {/* Hero Editorial Display Headline */}
        <div className="max-w-5xl mb-8 sm:mb-10 overflow-hidden">
          <motion.h1
            initial={{
              opacity: 0,
              y: shouldReduceMotion ? 0 : 36,
              filter: shouldReduceMotion ? 'none' : 'blur(4px)',
            }}
            animate={isLoaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: 36 }}
            transition={{ duration: 0.8, delay: 0.3, ease: easeArcen }}
            className="font-display font-bold text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight leading-[0.92] text-[#11120F]"
          >
            BUILD WHAT <br />
            <span className="text-[#11120F]/30 hover:text-[#11120F] transition-colors duration-500">
              MATTERS
            </span>
            <span className="inline-block w-3.5 h-3.5 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-[#D85B46] rounded-full ml-2 sm:ml-4 animate-coral-dot align-baseline" />
          </motion.h1>
        </div>

        {/* Paragraph & Action Triggers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end pt-2 sm:pt-4">
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.45, ease: easeArcen }}
            className="lg:col-span-7"
          >
            <p className="text-lg sm:text-2xl text-[#11120F]/85 font-normal leading-relaxed max-w-2xl">
              We bring together curious people, deep technical skills, and real-world problems to build technology that makes a difference.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            animate={isLoaded ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.7, delay: 0.55, ease: easeArcen }}
            className="lg:col-span-5 flex flex-wrap items-center gap-4"
          >
            <AnimatedButton
              onClick={() => scrollTo('#careers')}
              variant="primary"
              icon={ArrowUpRight}
            >
              EXPLORE CAREERS
            </AnimatedButton>

            <AnimatedButton
              onClick={() => scrollTo('#about')}
              variant="secondary"
            >
              MEET ARCEN
            </AnimatedButton>
          </motion.div>
        </div>
      </div>

      {/* Subtle Technical Footer Ticker */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="max-w-7xl mx-auto px-6 sm:px-10 w-full pt-12 sm:pt-16 flex items-center justify-between font-mono text-[10px] text-[#77766F] uppercase tracking-widest border-t border-[#11120F]/08 mt-8 sm:mt-12 select-none"
      >
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#11120F]/40 rounded-full" />
          EST. 2026 // ENGINEERING STUDIO
        </span>

        <button
          onClick={() => scrollTo('#about')}
          className="flex items-center gap-2 hover:text-[#D85B46] transition-colors group cursor-pointer"
        >
          <span>SCROLL TO DISCOVER</span>
          <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
        </button>
      </motion.div>
    </section>
  );
}
