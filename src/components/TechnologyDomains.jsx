import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Cpu, Network, Eye, Smartphone, Cloud, Layers, Box, ChevronDown } from 'lucide-react';
import { SectionHeader, Reveal, LineReveal } from './motion';

export default function TechnologyDomains() {
  const [activeIdx, setActiveIdx] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const domains = [
    {
      num: '01',
      title: 'Backend Engineering',
      icon: Cpu,
      tagline: 'Build the systems that power reliable, scalable products.',
      focus: ['Distributed Systems', 'High-throughput APIs', 'Event Streaming', 'Fault Tolerance', 'Database Architecture'],
      svg: (
        <svg className="w-10 h-10 text-[#D85B46]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="2" width="20" height="8" rx="2" />
          <rect x="2" y="14" width="20" height="8" rx="2" />
          <line x1="6" y1="6" x2="6.01" y2="6" strokeWidth="3" />
          <line x1="6" y1="18" x2="6.01" y2="18" strokeWidth="3" />
        </svg>
      ),
    },
    {
      num: '02',
      title: 'Artificial Intelligence & Machine Learning',
      icon: Network,
      tagline: 'Research and develop intelligent systems that solve practical problems.',
      focus: ['Neural Architectures', 'Applied LLMs', 'Edge Optimization', 'Continuous Training', 'Inference Pipelines'],
      svg: (
        <svg className="w-10 h-10 text-[#D85B46]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="3" />
          <path d="M12 2v4m0 12v4M2 12h4m12 0h4m-3.5-6.5l-2.8 2.8m-7.4 7.4l-2.8 2.8m13-2.8l-2.8-2.8m-7.4-7.4l-2.8-2.8" />
        </svg>
      ),
    },
    {
      num: '03',
      title: 'Computer Vision',
      icon: Eye,
      tagline: 'Teach machines to understand images, video, environments, and physical objects.',
      focus: ['Real-time Object Detection', 'Stereo Vision', 'Spatial Tracking', 'Synthetic Data', 'Edge TensorRT'],
      svg: (
        <svg className="w-10 h-10 text-[#D85B46]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      ),
    },
    {
      num: '04',
      title: 'Mobile & Application Development',
      icon: Smartphone,
      tagline: 'Build intuitive applications that connect people, systems, and technology.',
      focus: ['Cross-Platform Suites', 'Offline-first Architecture', 'Hardware Interfacing', 'BLE Protocols', 'Ultra-low Latency UI'],
      svg: (
        <svg className="w-10 h-10 text-[#D85B46]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="5" y="2" width="14" height="20" rx="3" />
          <line x1="12" y1="18" x2="12.01" y2="18" strokeWidth="2" />
        </svg>
      ),
    },
    {
      num: '05',
      title: 'DevOps & Cloud Systems',
      icon: Cloud,
      tagline: 'Create the infrastructure that keeps products reliable, scalable, and deployable.',
      focus: ['Infrastructure as Code', 'Immutable Deployments', 'Observability', 'Air-gapped Environments', 'Zero-downtime CI/CD'],
      svg: (
        <svg className="w-10 h-10 text-[#D85B46]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z" />
        </svg>
      ),
    },
    {
      num: '06',
      title: 'AR & Spatial Technology',
      icon: Layers,
      tagline: 'Explore the intersection of software, physical environments, and immersive experiences.',
      focus: ['Augmented Reality HUDs', 'WebXR Applications', 'LiDAR Reconstruction', 'Physical Digital Mapping', '3D UI Paradigms'],
      svg: (
        <svg className="w-10 h-10 text-[#D85B46]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      num: '07',
      title: 'CAD & 3D Engineering',
      icon: Box,
      tagline: 'Work with digital models, 3D environments, geometry, and engineering workflows.',
      focus: ['Parametric CAD Engines', 'B-Rep Geometry', 'STEP/IGES Parsing', 'Photorealistic Rendering', 'Mechanical Simulation'],
      svg: (
        <svg className="w-10 h-10 text-[#D85B46]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" />
        </svg>
      ),
    },
  ];

  const toggleDomain = (index) => {
    setActiveIdx(activeIdx === index ? null : index);
  };

  return (
    <section
      id="technology"
      className="py-28 sm:py-36 bg-[#171916] text-[#F2EFE6] border-b border-[#F2EFE6]/14 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <SectionHeader
          number="03"
          label="SERVICES & DOMAINS"
          meta="CAPABILITIES & PRACTICE AREAS"
          title={
            <>
              WHAT WE <br />
              <span className="text-[#D85B46]">WORK ON.</span>
            </>
          }
          subtitle="The core engineering disciplines where Arcen builds software, research capabilities, and real-world tools."
          theme="dark"
        />

        {/* Editorial Rows */}
        <div className="border-t border-[#F2EFE6]/15">
          {domains.map((domain, index) => {
            const isActive = activeIdx === index;
            const IconComp = domain.icon;

            return (
              <Reveal key={domain.num} direction="up" distance={16} delay={index * 0.05}>
                <div
                  onClick={() => toggleDomain(index)}
                  onMouseEnter={() => {
                    // Only auto-hover on non-touch screens
                    if (!window.matchMedia('(pointer: coarse)').matches) {
                      setActiveIdx(index);
                    }
                  }}
                  className={`group border-b border-[#F2EFE6]/14 py-7 sm:py-9 transition-all duration-300 cursor-pointer px-4 sm:px-6 relative select-none ${
                    isActive ? 'bg-[#F2EFE6]/06' : 'hover:bg-[#F2EFE6]/03'
                  }`}
                >
                  {/* Left subtle indicator */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 bg-[#D85B46] transition-all duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'
                    }`}
                  />

                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    {/* Left: Number + Icon + Title */}
                    <div className="flex items-center gap-4 sm:gap-6">
                      <span className="font-mono text-xs sm:text-sm font-semibold text-[#9E9D95] group-hover:text-[#D85B46] transition-colors w-6">
                        {domain.num}
                      </span>

                      <div className="p-2 sm:p-2.5 border border-[#F2EFE6]/12 bg-[#F2EFE6]/02 rounded-none group-hover:border-[#D85B46]/50 transition-colors shrink-0">
                        <IconComp className="w-5 h-5 text-[#9E9D95] group-hover:text-[#D85B46] transition-colors" />
                      </div>

                      <h3 className="font-display font-bold text-xl sm:text-3xl lg:text-4xl text-[#F2EFE6] group-hover:text-[#D85B46] transition-colors duration-300">
                        {domain.title}
                      </h3>
                    </div>

                    {/* Right: Tagline + Micro SVG Preview + Action Indicator */}
                    <div className="flex items-center justify-between lg:justify-end gap-6 pl-10 lg:pl-0">
                      <p className="text-sm text-[#9E9D95] max-w-sm hidden md:block">
                        {domain.tagline}
                      </p>

                      {/* SVG diagram micro-preview */}
                      <div className="hidden xl:block opacity-30 group-hover:opacity-90 group-hover:scale-105 transition-all duration-300">
                        {domain.svg}
                      </div>

                      <div
                        className={`p-2.5 border transition-all duration-300 ${
                          isActive
                            ? 'bg-[#D85B46] border-[#D85B46] text-[#F2EFE6]'
                            : 'border-[#F2EFE6]/20 group-hover:border-[#D85B46] text-[#9E9D95] group-hover:text-[#F2EFE6]'
                        }`}
                      >
                        <ArrowUpRight
                          className={`w-4 h-4 transition-transform duration-300 ${
                            isActive ? 'rotate-90' : 'group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Focus Areas Expansion Row */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="mt-6 pl-10 sm:pl-16 pt-4 border-t border-dashed border-[#F2EFE6]/12 flex flex-wrap items-center gap-2.5 font-mono text-xs">
                          <span className="text-[#D85B46] font-semibold tracking-wider">
                            CORE FOCUS:
                          </span>
                          {domain.focus.map((item, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-[#F2EFE6]/08 border border-[#F2EFE6]/14 text-[#F2EFE6]"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
