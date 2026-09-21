import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeader, StaggerContainer, StaggerItem } from './motion';

export default function RecruitmentProcess() {
  const shouldReduceMotion = useReducedMotion();

  const steps = [
    { num: '01', title: 'APPLICATION & REVIEW', desc: "Tell us about yourself, your technical skills, and projects you've built." },
    { num: '02', title: 'DISCOVERY CONVERSATION', desc: 'A dialogue about your curiosity, technical journey, and problem-solving mindset.' },
    { num: '03', title: 'TECHNICAL COLLABORATION', desc: 'Depending on the domain, we explore system architecture, code, or previous prototypes.' },
    { num: '04', title: 'MEET THE TEAM', desc: "Deep dive into active studio projects and the real-world problems you'll tackle." },
    { num: '05', title: 'BUILD WITH ARCEN', desc: 'If there is mutual alignment, welcome to the engineering studio.' },
  ];

  return (
    <section
      id="process"
      className="py-28 sm:py-36 bg-[#171916] text-[#F2EFE6] border-b border-[#F2EFE6]/15 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header 04 / PROCESS */}
        <SectionHeader
          number="04"
          label="PROCESS"
          meta="HIRING & COLLABORATION WORKFLOW"
          title={
            <>
              HOW WE WORK <br />
              <span className="text-[#D85B46]">TOGETHER.</span>
            </>
          }
          subtitle="A transparent, respectful process designed to evaluate how you solve problems, think about systems, and collaborate with engineers."
          theme="dark"
        />

        {/* Steps List */}
        <StaggerContainer className="border-t border-[#F2EFE6]/15 space-y-2 pt-4" stagger={0.07}>
          {steps.map((step) => (
            <StaggerItem key={step.num}>
              <motion.div
                whileHover={shouldReduceMotion ? {} : { x: 6 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.99 }}
                className="py-8 px-4 sm:px-6 border-b border-[#F2EFE6]/15 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group hover:bg-[#F2EFE6]/04 transition-all duration-300 relative cursor-default select-none"
              >
                {/* Left accent hover bar */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#D85B46] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="md:col-span-2 font-mono text-xs text-[#D85B46] font-semibold tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-[#D85B46] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  {step.num} //
                </div>

                <div className="md:col-span-5 font-display font-bold text-2xl sm:text-3xl text-[#F2EFE6] group-hover:text-[#D85B46] transition-colors duration-300">
                  {step.title}
                </div>

                <div className="md:col-span-5 text-sm sm:text-base text-[#9E9D95] group-hover:text-[#F2EFE6]/90 font-normal leading-relaxed transition-colors duration-300">
                  {step.desc}
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
