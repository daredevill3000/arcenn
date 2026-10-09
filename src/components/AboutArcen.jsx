import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeader, Reveal, StaggerContainer, StaggerItem } from './motion';

export default function AboutArcen() {
  const shouldReduceMotion = useReducedMotion();

  const technologyComponents = [
    'AI/ML models',
    'Computer vision systems',
    'Parametric CAD/geometry engines',
    'High-throughput backend systems',
    'Event-driven pipelines',
    'Scalable cloud infrastructure',
    'Mobile and application layers with offline-first capabilities',
    'AR/XR and spatial computing interfaces',
    'Simulation and rendering systems'
  ];

  return (
    <section
      id="about"
      className="py-28 sm:py-36 bg-[#171916] border-b border-white/10 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Standard ARCEN Section Header (01 / ABOUT) */}
        <SectionHeader
          number="01"
          label="ABOUT"
          meta="MULTI-LAYERED TECHNOLOGY SYSTEM"
          title={
            <>
              ARCEN<span className="text-[#D85B46]">.</span>
            </>
          }
          subtitle="ARCEN is being developed as a multi-layered technology system. The core focus is the translation of unstructured customer intent into structured, manufacturable design outputs."
          theme="dark"
        />

        {/* Technology Components Grid */}
        <div className="mt-16 sm:mt-24">
          <Reveal direction="down" distance={10}>
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#9E9D95] pb-4 border-b border-white/10">
              <span>// TECHNOLOGY COMPONENTS</span>
            </div>
          </Reveal>

          <StaggerContainer className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" stagger={0.07}>
            {technologyComponents.map((component, idx) => (
              <StaggerItem key={idx}>
                <div
                  className="relative p-6 border border-white/10 bg-white/5 hover:border-[#D85B46] hover:bg-white/10 overflow-hidden group"
                >
                  {/* Left vertical accent bar */}
                  <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-[#D85B46] opacity-0 group-hover:opacity-100 transition-opacity duration-150" />

                  {/* Coral shimmer sweep from bottom */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#D85B46]/10 via-[#D85B46]/04 to-transparent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />

                  <div className="relative flex items-start gap-3">
                    <span className="font-mono text-xs text-[#D85B46] font-bold mt-1 group-hover:scale-125 transition-transform duration-150 origin-top-left shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <p className="text-sm text-[#F2EFE6]/85 group-hover:text-[#F2EFE6] leading-relaxed transition-colors duration-150">
                      {component}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Development Approach */}
          <Reveal direction="up" distance={10}>
            <div className="mt-12 p-6 border-l-2 border-[#D85B46] bg-white/5">
              <h3 className="font-mono text-xs uppercase tracking-widest text-[#9E9D95] mb-3">
                DEVELOPMENT APPROACH
              </h3>
              <p className="text-base text-[#F2EFE6]/85 leading-relaxed">
                Structured phases starting with MVP followed by progressive expansion.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
