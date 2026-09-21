import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, X, Eye, Server, Layers, Smartphone, CheckCircle } from 'lucide-react';
import { SectionHeader, Reveal, NumberCounter, LineReveal } from './motion';

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const frameworkSteps = [
    {
      step: 1,
      title: 'DISCOVER',
      desc: 'Understand\nthe problem',
    },
    {
      step: 2,
      title: 'DESIGN',
      desc: 'Shape the\nsolution',
    },
    {
      step: 3,
      title: 'ENGINEER',
      desc: 'Build the\nsystem',
    },
    {
      step: 4,
      title: 'INTEGRATE',
      desc: 'Connect the\npieces',
    },
    {
      step: 5,
      title: 'EVOLVE',
      desc: 'Refine and\nimprove',
    },
  ];

  const projects = [
    {
      num: '01',
      code: 'SYS-CV-01',
      name: 'Autonomous Visual Quality Verification',
      domain: 'Computer Vision & AI',
      icon: Eye,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
      focus: 'Computer vision and image processing workflows targeting automated visual recognition, surface inspection, and defect identification across physical components.',
      expertise: 'Applied AI, machine learning, deep learning, and neural object detection optimized for real-time edge processing and low-latency inference.',
      technology: ['Computer Vision', 'PyTorch', 'OpenCV', 'Edge AI', 'TensorRT'],
      application: 'Vision-based automation and AI perception systems designed for continuous automated inspection, assembly verification, and quality assurance.',
    },
    {
      num: '02',
      code: 'SYS-DIST-02',
      name: 'Distributed Industrial Sensor Network',
      domain: 'Backend & Systems',
      icon: Server,
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
      focus: 'Connected systems and data workflows that ingest, aggregate, and process continuous telemetry from distributed hardware environments.',
      expertise: 'Backend systems, high-performance APIs, distributed systems, databases, and resilient application architecture designed for fault tolerance.',
      technology: ['Distributed Systems', 'Go', 'Kafka', 'PostgreSQL', 'TimescaleDB'],
      application: 'Robust infrastructure focused on performance and scalability, enabling real-time telemetry streaming, condition monitoring, and intelligent alerting pipelines.',
    },
    {
      num: '03',
      code: 'SYS-XR-03',
      name: 'AR Field Maintenance Guidance',
      domain: 'Spatial Computing',
      icon: Layers,
      image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&w=1200&q=80',
      focus: 'Contextual operational guidance connecting technical documentation, 3D equipment models, and physical machinery in field environments.',
      expertise: 'Augmented reality, spatial computing, 3D interaction, and CAD geometry alignment for real-world digital interfaces.',
      technology: ['Spatial Computing', 'WebXR', 'Three.js', 'CAD Geometry', 'iOS ARKit'],
      application: 'Immersive applications delivering hands-free spatial overlays, interactive maintenance sequences, and dynamic digital schematics.',
    },
    {
      num: '04',
      code: 'SYS-MOB-04',
      name: 'Cross-Platform Field Diagnostics Suite',
      domain: 'Mobile & Platform Technology',
      icon: Smartphone,
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80',
      focus: 'Equipping field personnel and technicians with portable, offline-first diagnostic interfaces and real-time equipment telemetry tools.',
      expertise: 'Mobile applications, modern application architecture, user-facing systems, and cross-platform development.',
      technology: ['React Native', 'TypeScript', 'BLE Communication', 'SQLite'],
      application: 'Platform integration connecting local device hardware, Bluetooth protocols, and sensor feeds into unified operational suites.',
    },
  ];

  return (
    <section
      id="projects"
      className="py-28 sm:py-36 bg-[#171916] text-[#F2EFE6] border-b border-[#F2EFE6]/14 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <SectionHeader
          number="02"
          label="PROJECTS"
          meta="CASE STUDIES & PROTOTYPES"
          title={
            <>
              FROM IDEA TO <br />
              <span className="text-[#D85B46]">IMPACT.</span>
            </>
          }
          subtitle="Exploring technology, engineering ideas, and emerging possibilities to create solutions for real-world needs."
          theme="dark"
        />

        {/* ARCEN Technology Framework Row */}
        <div className="mb-20 sm:mb-28 border border-[#F2EFE6]/15 bg-[#F2EFE6]/02 p-6 sm:p-10">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#F2EFE6]/10 font-mono text-xs uppercase tracking-widest text-[#9E9D95]">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#D85B46]" />
              ARCEN TECHNOLOGY FRAMEWORK
            </span>
            <span className="hidden sm:inline text-[10px]">ENGINEERING APPROACH</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8">
            {frameworkSteps.map((item, idx) => (
              <Reveal key={idx} direction="up" distance={16} delay={idx * 0.08}>
                <div className="space-y-2">
                  <div className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-[#F2EFE6] tracking-tight">
                    <NumberCounter
                      to={item.step}
                      prefix="0"
                      duration={1.2}
                      delay={idx * 0.12}
                    />
                  </div>
                  <div className="font-mono text-xs sm:text-sm font-semibold text-[#D85B46] uppercase tracking-wider">
                    {item.title}
                  </div>
                  <p className="font-mono text-[11px] sm:text-xs text-[#9E9D95] leading-relaxed whitespace-pre-line">
                    {item.desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Project Showcase Cards List */}
        <div className="space-y-20 sm:space-y-28">
          {projects.map((proj, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              whileHover={shouldReduceMotion ? {} : { y: -4 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.995 }}
              className="group border border-[#F2EFE6]/15 bg-[#171916] hover:border-[#D85B46]/60 transition-all duration-500 overflow-hidden relative"
            >
              {/* Top Accent Line that animates on card hover */}
              <div className="absolute top-0 left-0 w-0 h-[2px] bg-[#D85B46] group-hover:w-full transition-all duration-500 ease-out z-10" />

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 p-6 sm:p-10 lg:p-12 items-center">
                {/* Image Container with subtle scale */}
                <div className="lg:col-span-6 overflow-hidden border border-[#F2EFE6]/15 relative aspect-[16/10] bg-[#11120F]">
                  <img
                    src={proj.image}
                    alt={proj.name}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 brightness-90 group-hover:brightness-100"
                  />
                  
                  {/* Technical Badge */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-[#171916]/90 backdrop-blur-sm border border-[#F2EFE6]/20 text-[#F2EFE6] font-mono text-[11px] px-3 py-1 uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D85B46]" />
                    <span>PROJECT {proj.num} // {proj.code}</span>
                  </div>
                </div>

                {/* Content Breakdown */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-widest text-[#D85B46] font-semibold">
                      {proj.domain}
                    </span>
                    <span className="font-mono text-[10px] text-[#9E9D95] uppercase tracking-wider">
                      EXPERTISE
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-2xl sm:text-4xl text-[#F2EFE6] group-hover:text-[#D85B46] transition-colors duration-300 leading-tight">
                    {proj.name}
                  </h3>

                  {/* Focus / Expertise / Application Specification */}
                  <div className="space-y-3 font-mono text-xs border-l-2 border-[#D85B46]/60 group-hover:border-[#D85B46] pl-4 transition-colors duration-300">
                    <div>
                      <span className="text-[#9E9D95] uppercase block text-[10px]">FOCUS:</span>
                      <p className="text-[#F2EFE6]/90 font-sans text-sm">{proj.focus}</p>
                    </div>
                    <div>
                      <span className="text-[#9E9D95] uppercase block text-[10px]">EXPERTISE:</span>
                      <p className="text-[#F2EFE6]/90 font-sans text-sm">{proj.expertise}</p>
                    </div>
                    <div>
                      <span className="text-[#D85B46] uppercase block text-[10px] font-bold">APPLICATION:</span>
                      <p className="text-[#D85B46] font-sans text-sm font-semibold">{proj.application}</p>
                    </div>
                  </div>

                  {/* Technology Tags */}
                  <div className="pt-2 flex flex-wrap gap-2 font-mono text-[11px]">
                    {proj.technology.map((t, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-[#F2EFE6]/06 border border-[#F2EFE6]/12 text-[#F2EFE6]/90"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Action Link */}
                  <div className="pt-2">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest font-semibold text-[#F2EFE6] hover:text-[#D85B46] group-hover:translate-x-1.5 transition-all duration-300 cursor-pointer"
                    >
                      <span>EXPLORE CAPABILITY</span>
                      <ArrowUpRight className="w-4 h-4 text-[#D85B46]" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal with Smooth Transition */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#171916] border-2 border-[#F2EFE6]/25 max-w-2xl w-full p-6 sm:p-10 relative shadow-2xl text-[#F2EFE6] max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 right-6 p-2 text-[#F2EFE6] hover:bg-[#F2EFE6]/10 border border-[#F2EFE6]/20 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <span className="font-mono text-xs uppercase tracking-widest text-[#D85B46] font-semibold block mb-2">
                PROJECT {selectedProject.num} // {selectedProject.domain}
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F2EFE6] mb-6">
                {selectedProject.name}
              </h3>

              <div className="space-y-4 text-sm font-sans">
                <div className="p-4 bg-[#F2EFE6]/04 border border-[#F2EFE6]/12">
                  <strong className="font-mono text-xs block text-[#9E9D95] uppercase mb-1">
                    FOCUS
                  </strong>
                  <p className="text-[#F2EFE6]/90">{selectedProject.focus}</p>
                </div>
                <div className="p-4 bg-[#F2EFE6]/04 border border-[#F2EFE6]/12">
                  <strong className="font-mono text-xs block text-[#9E9D95] uppercase mb-1">
                    EXPERTISE
                  </strong>
                  <p className="text-[#F2EFE6]/90">{selectedProject.expertise}</p>
                </div>
                <div className="p-4 bg-[#D85B46]/10 border border-[#D85B46]/40">
                  <strong className="font-mono text-xs block text-[#D85B46] uppercase mb-1">
                    APPLICATION
                  </strong>
                  <p className="font-semibold text-[#F2EFE6]">{selectedProject.application}</p>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#F2EFE6]/15 flex items-center justify-between">
                <div className="flex flex-wrap gap-2 font-mono text-[10px]">
                  {selectedProject.technology.map((t, idx) => (
                    <span key={idx} className="text-[#9E9D95]">#{t}</span>
                  ))}
                </div>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-6 py-3 bg-[#D85B46] text-[#F2EFE6] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-black transition-colors cursor-pointer"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
