import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeader, Reveal, StaggerContainer, StaggerItem, LineReveal } from './motion';
import { Cpu, Eye, Box, Layers, Smartphone, Cloud, Workflow, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AboutArcen() {
  const shouldReduceMotion = useReducedMotion();

  const technologyComponents = [
    {
      title: 'AI/ML models',
      subtitle: 'Intent understanding and inference',
      icon: Sparkles
    },
    {
      title: 'Computer vision systems',
      subtitle: 'Interpreting visual and physical inputs',
      icon: Eye
    },
    {
      title: 'Parametric CAD/geometry engines',
      subtitle: 'Generating and refining design structures',
      icon: Box
    },
    {
      title: 'High-throughput backend systems',
      subtitle: 'Reliability, low latency, continuous iteration',
      icon: Cpu
    },
    {
      title: 'Event-driven pipelines',
      subtitle: 'Reactive asynchronous data streams',
      icon: Workflow
    },
    {
      title: 'Scalable cloud infrastructure',
      subtitle: 'Distributed cloud architecture and scalability',
      icon: Cloud
    },
    {
      title: 'Mobile and application layers with offline-first capabilities',
      subtitle: 'Hardware integration across environments',
      icon: Smartphone
    },
    {
      title: 'AR/XR and spatial computing interfaces',
      subtitle: 'Real-time visualization and environment mapping',
      icon: Layers
    },
    {
      title: 'Simulation and rendering systems',
      subtitle: 'Validating outputs before production',
      icon: CheckCircle2
    }
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
          subtitle="ARCEN is being developed as a multi-layered technology system designed to address inefficiencies in the jewellery design-to-production pipeline."
          theme="dark"
        />

        {/* Narrative Introduction Banner */}
        <div className="mt-8 mb-16">
          <Reveal direction="up" distance={16} duration={0.7}>
            <div className="p-8 sm:p-10 border border-white/10 bg-white/[0.03] backdrop-blur-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1.5 h-full bg-[#D85B46]" />
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="space-y-4 max-w-4xl">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D85B46]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D85B46]" />
                    <span>SYSTEM VISION & PIPELINE</span>
                  </div>
                  <p className="text-lg sm:text-xl text-[#F2EFE6] font-normal leading-relaxed">
                    ARCEN is being developed as a multi-layered technology system designed to address inefficiencies in the jewellery design-to-production pipeline. The system integrates components across artificial intelligence, computer vision, computational design, spatial computing, and distributed infrastructure to enable a more connected and intelligent workflow.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Core Intent Translation Callout */}
        <div className="mb-16">
          <Reveal direction="up" distance={16} duration={0.7} delay={0.1}>
            <div className="border border-white/10 bg-white/[0.02] p-8 sm:p-12 relative overflow-hidden group hover:border-white/20 transition-all duration-300">
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-8">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#D85B46]">
                    // CORE TRANSLATION ENGINE
                  </span>
                </div>
                <span className="font-mono text-xs text-[#9E9D95] uppercase tracking-wider hidden sm:inline">
                  UNSTRUCTURED INTENT → STRUCTURED OUTPUT
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 space-y-4">
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#F2EFE6] tracking-tight">
                    Translating Unstructured Customer Intent into Manufacturable Design.
                  </h3>
                  <p className="text-base sm:text-lg text-[#F2EFE6]/80 leading-relaxed font-normal">
                    At its core, ARCEN explores the translation of unstructured customer intent into structured, manufacturable design outputs. This involves combining AI/ML models for intent understanding and inference, computer vision systems for interpreting visual and physical inputs, and parametric CAD/geometry engines for generating and refining design structures.
                  </p>
                </div>

                <div className="lg:col-span-5 grid grid-cols-1 gap-3">
                  <div className="p-4 border border-white/10 bg-white/[0.03] flex items-start gap-3">
                    <span className="font-mono text-xs text-[#D85B46] font-bold mt-0.5">01</span>
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-wider text-[#F2EFE6] font-semibold">Intent Inference</h4>
                      <p className="text-xs text-[#9E9D95] mt-1">AI/ML models decode nuanced customer preferences into actionable parameters.</p>
                    </div>
                  </div>
                  <div className="p-4 border border-white/10 bg-white/[0.03] flex items-start gap-3">
                    <span className="font-mono text-xs text-[#D85B46] font-bold mt-0.5">02</span>
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-wider text-[#F2EFE6] font-semibold">Vision Interpretation</h4>
                      <p className="text-xs text-[#9E9D95] mt-1">Computer vision systems process reference imagery and physical benchmarks.</p>
                    </div>
                  </div>
                  <div className="p-4 border border-white/10 bg-white/[0.03] flex items-start gap-3">
                    <span className="font-mono text-xs text-[#D85B46] font-bold mt-0.5">03</span>
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-wider text-[#F2EFE6] font-semibold">Parametric Generation</h4>
                      <p className="text-xs text-[#9E9D95] mt-1">Mathematical CAD engines generate exact, production-grade jewellery structures.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Dual Pillar Architecture Breakdown */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Reveal direction="up" distance={16} duration={0.7} delay={0.15}>
            <div className="h-full p-8 border border-white/10 bg-white/[0.02] flex flex-col justify-between hover:border-white/20 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#D85B46]">
                    // DISTRIBUTED INFRASTRUCTURE & APPLICATION LAYER
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F2EFE6] tracking-tight mb-4">
                  Resilient Cloud & Offline-First Mobility
                </h3>
                <p className="text-base text-[#F2EFE6]/80 leading-relaxed font-normal">
                  The architecture is supported by high-throughput backend systems, event-driven pipelines, and scalable cloud infrastructure to ensure reliability, low latency, and continuous iteration. Mobile and application layers are designed with offline-first and hardware-integrated capabilities, enabling seamless interaction across environments.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-2">
                <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-[#9E9D95]">High Throughput</span>
                <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-[#9E9D95]">Event-Driven</span>
                <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-[#9E9D95]">Offline-First</span>
                <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-[#9E9D95]">Hardware Interfaced</span>
              </div>
            </div>
          </Reveal>

          <Reveal direction="up" distance={16} duration={0.7} delay={0.2}>
            <div className="h-full p-8 border border-white/10 bg-white/[0.02] flex flex-col justify-between hover:border-white/20 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#D85B46]">
                    // SPATIAL COMPUTING & VALIDATION
                  </span>
                </div>
                <h3 className="font-display font-bold text-xl sm:text-2xl text-[#F2EFE6] tracking-tight mb-4">
                  Real-Time XR & Production Simulation
                </h3>
                <p className="text-base text-[#F2EFE6]/80 leading-relaxed font-normal">
                  Additional layers include AR/XR and spatial computing interfaces for real-time visualization, environment mapping, and interactive design exploration, along with simulation and rendering systems to validate outputs before production.
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap gap-2">
                <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-[#9E9D95]">AR/XR Visualization</span>
                <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-[#9E9D95]">Environment Mapping</span>
                <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-[#9E9D95]">Real-time Exploration</span>
                <span className="px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider bg-white/5 border border-white/10 text-[#9E9D95]">Production Simulation</span>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Technology Components Grid */}
        <div>
          <Reveal direction="down" distance={10}>
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#9E9D95] pb-4 border-b border-white/10">
              <span>// TECHNOLOGY COMPONENTS</span>
              <span className="hidden sm:inline">09 SUBSYSTEMS</span>
            </div>
          </Reveal>

          <StaggerContainer className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" stagger={0.06}>
            {technologyComponents.map((component, idx) => {
              const Icon = component.icon;
              return (
                <StaggerItem key={idx}>
                  <div
                    className="relative p-6 border border-white/10 bg-white/5 hover:border-[#D85B46] hover:bg-white/10 overflow-hidden group transition-all duration-200 h-full flex flex-col justify-between"
                  >
                    {/* Left vertical accent bar */}
                    <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-[#D85B46] opacity-0 group-hover:opacity-100 transition-opacity duration-150" />

                    {/* Coral shimmer sweep from bottom */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#D85B46]/10 via-[#D85B46]/04 to-transparent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />

                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="font-mono text-xs text-[#D85B46] font-bold group-hover:scale-110 transition-transform duration-150 origin-left">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <Icon className="w-4 h-4 text-[#9E9D95] group-hover:text-[#D85B46] transition-colors duration-150" />
                      </div>

                      <p className="text-sm font-semibold text-[#F2EFE6] group-hover:text-white leading-snug transition-colors duration-150 mb-2">
                        {component.title}
                      </p>
                    </div>

                    <p className="text-xs text-[#9E9D95] group-hover:text-[#F2EFE6]/80 leading-relaxed transition-colors duration-150 mt-2">
                      {component.subtitle}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Development Approach & Phased Expansion */}
          <Reveal direction="up" distance={10}>
            <div className="mt-12 p-8 sm:p-10 border-l-2 border-[#D85B46] bg-white/[0.03] border border-white/10 relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10 mb-6">
                <h3 className="font-mono text-xs uppercase tracking-widest text-[#D85B46] font-semibold">
                  DEVELOPMENT APPROACH
                </h3>
                <span className="font-mono text-xs text-[#9E9D95] uppercase tracking-wider">
                  STRUCTURED PHASES STARTING WITH MVP FOLLOWED BY PROGRESSIVE EXPANSION
                </span>
              </div>

              <div className="space-y-4">
                <p className="text-base sm:text-lg text-[#F2EFE6] leading-relaxed font-normal">
                  The overall system is being developed in structured phases—starting with an MVP focused on validating core interactions and workflows, followed by progressive expansion into more advanced intelligence, automation, and system integration capabilities.
                </p>

                <div className="pt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-white/10 bg-white/5">
                    <span className="font-mono text-xs text-[#D85B46] font-bold block mb-1">PHASE 01 // FOUNDATION</span>
                    <h4 className="font-mono text-xs text-[#F2EFE6] uppercase tracking-wider font-semibold mb-1">MVP Workflow Validation</h4>
                    <p className="text-xs text-[#9E9D95]">Validating core interaction models, design pipeline mechanics, and intent capture.</p>
                  </div>
                  <div className="p-4 border border-white/10 bg-white/5">
                    <span className="font-mono text-xs text-[#D85B46] font-bold block mb-1">PHASE 02 // INTELLIGENCE</span>
                    <h4 className="font-mono text-xs text-[#F2EFE6] uppercase tracking-wider font-semibold mb-1">Inference & Automation</h4>
                    <p className="text-xs text-[#9E9D95]">Integrating vision interpretation models and automated parametric geometry engines.</p>
                  </div>
                  <div className="p-4 border border-white/10 bg-white/5">
                    <span className="font-mono text-xs text-[#D85B46] font-bold block mb-1">PHASE 03 // SCALE</span>
                    <h4 className="font-mono text-xs text-[#F2EFE6] uppercase tracking-wider font-semibold mb-1">System Integration</h4>
                    <p className="text-xs text-[#9E9D95]">Expanding into AR/XR spatial interfaces, distributed simulation, and production pipelines.</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

