import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Reveal, LineReveal } from './motion';

export default function Intro() {
  const scrollTo = (id) => {
    const element = document.querySelector(id);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <section className="py-28 sm:py-36 bg-[#F2EFE6] border-b border-[#11120F]/14 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="max-w-5xl">
          {/* Tag & Horizontal Line */}
          <Reveal direction="down" distance={12}>
            <div className="flex items-center gap-4 mb-6">
              <span className="font-mono text-xs uppercase tracking-widest text-[#D85B46] font-semibold flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D85B46]" />
                // PHILOSOPHY & PEOPLE
              </span>
              <div className="w-24">
                <LineReveal className="h-[1px] bg-[#D85B46]/40" duration={0.8} />
              </div>
            </div>
          </Reveal>

          {/* Large Editorial Headline */}
          <Reveal direction="up" distance={24} duration={0.75} delay={0.1}>
            <h2 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.05] text-[#11120F] mb-12">
              WE DON'T JUST HIRE SKILLS. <br />
              <span className="text-[#11120F]/40 hover:text-[#11120F] transition-colors duration-500">
                WE LOOK FOR PEOPLE WHO{' '}
              </span>
              <span className="underline decoration-[#D85B46] decoration-2 underline-offset-8">
                BUILD
              </span>.
            </h2>
          </Reveal>

          {/* Paragraphs and Action Link */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <Reveal direction="up" distance={18} duration={0.7} delay={0.2} className="md:col-span-8">
              <div className="text-lg sm:text-xl text-[#11120F]/80 font-normal leading-relaxed space-y-6">
                <p>
                  At Arcen, we work across software systems, artificial intelligence, computer vision, mobile technology, cloud engineering, spatial computing, and CAD 3D workflows.
                </p>
                <p>
                  We are looking for people who enjoy solving difficult problems, learning quickly, and turning ideas into things that actually work in the physical and digital world.
                </p>
              </div>
            </Reveal>

            <Reveal direction="up" distance={18} duration={0.7} delay={0.3} className="md:col-span-4 pt-4 md:pt-0 flex md:justify-end">
              <button
                onClick={() => scrollTo('#technology')}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-semibold text-[#11120F] hover:text-[#D85B46] transition-colors group border-b border-[#11120F] hover:border-[#D85B46] pb-1 cursor-pointer"
              >
                <span>DISCOVER WHAT WE DO</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 text-[#D85B46]" />
              </button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
