import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Hammer, Lightbulb, Workflow, Target } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem, LineReveal } from './motion';

export default function HowWeThink() {
  const shouldReduceMotion = useReducedMotion();

  const pillars = [
    {
      num: '01 / BUILD',
      icon: Hammer,
      title: "Build, don't just discuss.",
      desc: 'Ideas become valuable when they are turned into something useful, measurable, and functional.',
    },
    {
      num: '02 / LEARN',
      icon: Lightbulb,
      title: 'Learn continuously.',
      desc: 'We value deep curiosity and the ability to rapidly master unfamiliar technical domains.',
    },
    {
      num: '03 / COLLABORATE',
      icon: Workflow,
      title: 'Work across disciplines.',
      desc: 'The best breakthroughs occur where software, engineering, and domain insight converge.',
    },
    {
      num: '04 / OWN',
      icon: Target,
      title: 'Own the outcome.',
      desc: 'We obsess over whether what we build actually delivers real-world performance and impact.',
    },
  ];

  return (
    <section
      id="how-we-think"
      className="py-28 sm:py-36 bg-[#F2EFE6] text-[#11120F] border-b border-[#11120F]/14 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Headline */}
        <div className="mb-16 sm:mb-20">
          <Reveal direction="down" distance={12}>
            <span className="font-mono text-xs uppercase tracking-widest text-[#D85B46] block mb-3 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D85B46] animate-coral-dot inline-block" />
              // ENGINEERING CULTURE & ETHOS
            </span>
          </Reveal>

          <LineReveal className="h-[1px] bg-[#11120F]/14 mb-8" />

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <Reveal direction="up" distance={20} delay={0.1}>
              <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] max-w-4xl text-[#11120F]">
                REAL PROBLEMS. <br />
                REAL PEOPLE. <br />
                <span className="text-[#D85B46]">REAL OUTCOMES.</span>
              </h2>
            </Reveal>

            <Reveal direction="up" distance={16} delay={0.2}>
              <p className="text-base sm:text-lg text-[#77766F] max-w-md font-normal leading-relaxed">
                Our core operating principles that guide how Arcen approaches complex technical challenges and collaborative work.
              </p>
            </Reveal>
          </div>
        </div>

        {/* Pillars Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8" stagger={0.08}>
          {pillars.map((pillar, idx) => {
            const IconComponent = pillar.icon;

            return (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { y: -4 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.99 }}
                  className="group relative p-8 sm:p-10 border border-[#11120F]/12 bg-[#11120F]/02 hover:bg-[#11120F] hover:text-[#F2EFE6] transition-colors duration-500 overflow-hidden cursor-default select-none"
                >
                  {/* Top Coral accent line expanding smoothly */}
                  <div className="absolute top-0 left-0 w-0 h-1 bg-[#D85B46] group-hover:w-full transition-all duration-500 ease-out" />

                  <div className="flex items-center justify-between mb-8">
                    <span className="font-mono text-xs text-[#D85B46] font-semibold tracking-widest block">
                      {pillar.num}
                    </span>
                    <IconComponent className="w-6 h-6 text-[#77766F] group-hover:text-[#D85B46] transition-colors duration-300" />
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#11120F] group-hover:text-[#F2EFE6] transition-colors mb-4 leading-tight">
                    {pillar.title}
                  </h3>

                  <p className="text-base text-[#77766F] group-hover:text-[#F2EFE6]/80 leading-relaxed font-normal transition-colors">
                    {pillar.desc}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
