import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Target, Zap, Users, ShieldCheck } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem, LineReveal } from './motion';

export default function LifeAtArcen() {
  const shouldReduceMotion = useReducedMotion();

  const items = [
    {
      num: '01',
      icon: Target,
      title: 'Work on meaningful problems.',
      desc: "Work isn't limited to theoretical exercises. Projects are directly connected to practical, high-value real-world applications.",
    },
    {
      num: '02',
      icon: Zap,
      title: 'Learn by doing.',
      desc: 'Engineers are empowered to experiment, prototype, research, fail, improve, and deploy real production software.',
    },
    {
      num: '03',
      icon: Users,
      title: 'Cross-discipline collaboration.',
      desc: 'Engineers work alongside specialists from different technical and domain backgrounds to create holistic systems.',
    },
    {
      num: '04',
      icon: ShieldCheck,
      title: 'High ownership & autonomy.',
      desc: 'Small teams, meaningful responsibility, visible outcomes, and direct personal impact on what gets built.',
    },
  ];

  return (
    <section className="py-28 sm:py-36 bg-[#171916] text-[#F2EFE6] border-b border-[#F2EFE6]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="mb-16 sm:mb-20">
          <Reveal direction="down" distance={12}>
            <span className="font-mono text-xs uppercase tracking-widest text-[#D85B46] block mb-3 font-semibold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#D85B46] inline-block animate-coral-dot" />
              // STUDIO ENVIRONMENT
            </span>
          </Reveal>

          <LineReveal className="h-[1px] bg-[#F2EFE6]/15 mb-8" />

          <Reveal direction="up" distance={20} delay={0.1}>
            <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-tight max-w-4xl text-[#F2EFE6]">
              A PLACE TO BUILD, <br />
              <span className="text-[#D85B46]">LEARN & GROW.</span>
            </h2>
          </Reveal>
        </div>

        {/* 4 Cards Grid */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8" stagger={0.08}>
          {items.map((item) => {
            const IconComponent = item.icon;

            return (
              <StaggerItem key={item.num}>
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { y: -4 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.99 }}
                  className="p-8 border border-[#F2EFE6]/12 bg-[#F2EFE6]/03 hover:bg-[#F2EFE6]/06 hover:border-[#D85B46]/40 transition-all duration-300 group relative overflow-hidden h-full flex flex-col justify-between select-none cursor-default"
                >
                  {/* Top accent expand */}
                  <div className="absolute top-0 left-0 w-0 h-1 bg-[#D85B46] group-hover:w-full transition-all duration-500 ease-out" />

                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <span className="font-mono text-xs text-[#D85B46] font-semibold tracking-widest block">
                        {item.num} //
                      </span>
                      <IconComponent className="w-5 h-5 text-[#9E9D95] group-hover:text-[#D85B46] transition-colors duration-300" />
                    </div>

                    <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F2EFE6] group-hover:text-[#D85B46] transition-colors mb-3 leading-snug">
                      {item.title}
                    </h3>
                  </div>

                  <p className="text-sm text-[#9E9D95] group-hover:text-[#F2EFE6]/90 leading-relaxed font-normal transition-colors mt-4">
                    {item.desc}
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
