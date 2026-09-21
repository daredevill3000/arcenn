import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Reveal, StaggerContainer, StaggerItem, LineReveal } from './motion';

export default function WhoWeAreLookingFor() {
  const shouldReduceMotion = useReducedMotion();

  const traits = [
    'People who enjoy real-world problems over theoretical abstraction',
    'People comfortable diving into unfamiliar codebases & technologies',
    'People who can take open-ended goals and execute independently',
    'People who love collaborating across hardware, software & domain boundaries',
    'People who care about production reliability, not just completing tickets',
    'People with strong technical fundamentals and deep architectural curiosity',
    'People driven to understand how things work under the hood',
    'People who want tangible, measurable outcomes from their engineering work',
  ];

  return (
    <section className="py-28 sm:py-36 bg-[#F2EFE6] border-b border-[#11120F]/14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          {/* Left Column */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal direction="down" distance={12}>
              <span className="font-mono text-xs uppercase tracking-widest text-[#D85B46] block font-semibold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D85B46] animate-coral-dot inline-block" />
                // CANDIDATE PROFILE
              </span>
            </Reveal>

            <LineReveal className="h-[1px] bg-[#11120F]/14" />

            <Reveal direction="up" distance={20} delay={0.1}>
              <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#11120F] leading-[1.05]">
                PEOPLE WHO <br />
                LIKE TO <span className="underline decoration-[#D85B46] decoration-2 underline-offset-8">BUILD</span>.
              </h2>
            </Reveal>

            <Reveal direction="up" distance={16} delay={0.2}>
              <div className="pt-4 font-mono text-xs text-[#77766F] leading-relaxed border-l-2 border-[#11120F] pl-4">
                "You don't need to know everything. We care more about how you think, how quickly you learn, and what you can build."
              </div>
            </Reveal>
          </div>

          {/* Right Column: Staggered Traits List */}
          <div className="lg:col-span-7 pt-4 lg:pt-0">
            <StaggerContainer className="space-y-2" stagger={0.06}>
              {traits.map((trait, idx) => (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={shouldReduceMotion ? {} : { x: 8 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.99 }}
                    className="py-4.5 px-3 border-b border-[#11120F]/14 flex items-center gap-4 group hover:bg-[#11120F]/03 transition-colors duration-200 select-none cursor-default"
                  >
                    <span className="text-[#D85B46] font-bold text-lg group-hover:translate-x-1.5 transition-transform duration-300 shrink-0">
                      →
                    </span>
                    <span className="font-display text-lg sm:text-xl text-[#11120F] font-medium group-hover:text-[#D85B46] transition-colors duration-300">
                      {trait}
                    </span>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </div>
    </section>
  );
}
