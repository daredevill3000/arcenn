import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Send } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem, LineReveal, AnimatedButton } from './motion';

export default function Careers({ onOpenApply }) {
  const shouldReduceMotion = useReducedMotion();

  const opportunities = [
    { num: '01', role: 'Backend Engineering', tags: 'Software · APIs · Systems · Distributed Databases', area: 'Backend Engineering' },
    { num: '02', role: 'AI / ML Research', tags: 'Machine Learning · Neural Architectures · Applied AI', area: 'Artificial Intelligence & Machine Learning' },
    { num: '03', role: 'Computer Vision', tags: 'Perception · Image Processing · Edge Neural Vision', area: 'Computer Vision' },
    { num: '04', role: 'Mobile Development', tags: 'Offline-First · Applications · BLE & Sensors', area: 'Mobile & Application Development' },
    { num: '05', role: 'DevOps / Cloud Systems', tags: 'Infrastructure as Code · Deployment · Observability', area: 'DevOps & Cloud' },
    { num: '06', role: 'AR / Spatial Computing', tags: 'WebXR · Spatial UI · 3D Interaction · CAD Mapping', area: 'AR & Spatial Technology' },
    { num: '07', role: 'CAD / 3D Technology', tags: 'Geometry Kernels · B-Rep Modeling · Digital Engineering', area: 'CAD / 3D Technology' },
  ];

  return (
    <section
      id="careers"
      className="py-28 sm:py-36 bg-[#F2EFE6] border-b border-[#11120F]/14 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="mb-16 sm:mb-20">
          <Reveal direction="down" distance={12}>
            <span className="font-mono text-xs uppercase tracking-widest text-[#D85B46] block mb-3 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D85B46] animate-coral-dot inline-block" />
              // CAREERS & ROLES
            </span>
          </Reveal>

          <LineReveal className="h-[1px] bg-[#11120F]/14 mb-8" />

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <Reveal direction="up" distance={20} delay={0.1}>
              <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#11120F]">
                COME BUILD <br />
                <span className="text-[#D85B46]">WITH US.</span>
              </h2>
            </Reveal>

            <Reveal direction="up" distance={16} delay={0.2}>
              <p className="text-lg sm:text-xl text-[#77766F] max-w-xl font-normal leading-relaxed">
                You don't need to know everything. You need to be curious enough to learn and driven enough to build.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Opportunity Rows */}
        <StaggerContainer className="border-t border-[#11120F]/14 mb-20 sm:mb-24" stagger={0.06}>
          {opportunities.map((opp) => (
            <StaggerItem key={opp.num}>
              <motion.div
                onClick={() => onOpenApply(opp.area)}
                whileHover={shouldReduceMotion ? {} : { x: 6 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.99 }}
                className="group border-b border-[#11120F]/14 py-7 sm:py-8 px-4 sm:px-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-[#11120F]/04 transition-all duration-300 relative select-none"
              >
                {/* Left hover indicator */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D85B46] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="flex items-baseline gap-6 sm:gap-10">
                  <span className="font-mono text-xs sm:text-sm font-semibold text-[#77766F] group-hover:text-[#D85B46] transition-colors w-6">
                    {opp.num}
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#11120F] group-hover:text-[#D85B46] transition-colors duration-300">
                      {opp.role}
                    </h3>
                    <span className="font-mono text-xs text-[#77766F] block mt-1">
                      {opp.tags}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest font-semibold text-[#11120F] pt-2 sm:pt-0 shrink-0">
                  <span className="group-hover:text-[#D85B46] transition-colors">APPLY NOW</span>
                  <div className="p-2 border border-[#11120F]/20 group-hover:border-[#D85B46] group-hover:bg-[#D85B46] group-hover:text-[#F2EFE6] transition-all duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* General Application Accent Banner */}
        <Reveal direction="up" distance={20}>
          <div className="bg-[#D85B46] text-[#F2EFE6] p-8 sm:p-14 border-2 border-[#11120F] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 shadow-xl relative overflow-hidden group">
            <div className="space-y-3 max-w-2xl relative z-10">
              <span className="font-mono text-xs uppercase tracking-widest text-[#F2EFE6]/80 block font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                // OPEN PORTFOLIO SUBMISSION
              </span>
              <h3 className="font-display font-bold text-3xl sm:text-5xl tracking-tight leading-tight">
                DON'T SEE YOUR SPECIFIC TITLE?
              </h3>
              <p className="text-base sm:text-lg text-[#F2EFE6]/90 font-normal leading-relaxed">
                If you are a builder who solves challenging problems and ships real code, we want to hear from you.
              </p>
            </div>

            <AnimatedButton
              onClick={() => onOpenApply('Other')}
              variant="primary"
              icon={Send}
              className="bg-[#11120F] hover:bg-black text-[#F2EFE6] border-[#11120F] shrink-0 relative z-10"
            >
              SEND PROFILE
            </AnimatedButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
