import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeader, Reveal, StaggerContainer, StaggerItem, LineReveal } from './motion';

export default function AboutArcen() {
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    { num: '01 / UNDERSTAND', title: 'Understand', desc: 'Start with the real problem, root constraints, and physical environment.' },
    { num: '02 / EXPLORE', title: 'Explore', desc: 'Research possibilities, technical trade-offs, and state-of-the-art approaches.' },
    { num: '03 / BUILD', title: 'Build', desc: 'Turn ideas into working prototypes, robust systems, and shipping products.' },
    { num: '04 / TEST', title: 'Test', desc: 'Validate whether the solution performs reliably under actual real-world conditions.' },
    { num: '05 / IMPROVE', title: 'Improve', desc: 'Learn from telemetry and user feedback to continuously iterate and refine.' },
  ];

  return (
    <section
      id="about"
      className="py-28 sm:py-36 bg-[#F2EFE6] border-b border-[#11120F]/14 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Standard ARCEN Section Header (01 / ABOUT) */}
        <SectionHeader
          number="01"
          label="ABOUT"
          meta="STUDIO & METHODOLOGY"
          title={
            <>
              ARCEN<span className="text-[#D85B46]">.</span>
            </>
          }
          subtitle="A technology company focused on practical, high-leverage solutions at the intersection of software, artificial intelligence, computer vision, spatial computing, and emerging physical systems."
          theme="light"
        />

        {/* Vertical Editorial Process Progression */}
        <div className="mt-16 sm:mt-24 space-y-6">
          <Reveal direction="down" distance={10}>
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#77766F] pb-4 border-b border-[#11120F]/14">
              <span>// OUR SYSTEMATIC METHODOLOGY</span>
              <span className="hidden sm:inline">CYCLE 01–05</span>
            </div>
          </Reveal>

          <StaggerContainer className="space-y-3" stagger={0.07}>
            {steps.map((s, idx) => (
              <StaggerItem key={s.num}>
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { x: 6 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.99 }}
                  className="py-6 sm:py-7 px-4 sm:px-6 border-b border-[#11120F]/14 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center group hover:bg-[#11120F]/04 transition-all duration-300 relative select-none cursor-default"
                >
                  {/* Subtle left hover bar */}
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D85B46] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="sm:col-span-3 font-mono text-xs text-[#D85B46] font-semibold tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D85B46] opacity-0 group-hover:opacity-100 transition-opacity" />
                    {s.num}
                  </div>

                  <div className="sm:col-span-4 font-display font-bold text-2xl sm:text-3xl text-[#11120F] group-hover:text-[#D85B46] transition-colors duration-300">
                    {s.title}
                  </div>

                  <div className="sm:col-span-5 text-sm sm:text-base text-[#77766F] font-normal leading-relaxed">
                    {s.desc}
                  </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
