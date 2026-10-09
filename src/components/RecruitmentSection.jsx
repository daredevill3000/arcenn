import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, CheckCircle, Clock, Award, Users, Compass } from 'lucide-react';
import { SectionHeader, Reveal, StaggerContainer, StaggerItem, LineReveal } from './motion';

const technicalRoles = [
  {
    num: '01',
    title: 'Backend Engineering (Distributed Systems)',
    tagline: 'APIs · Event Streaming · Databases · System Integration',
    responsibilities: [
      'Design and develop scalable backend systems',
      'Work on APIs, event-driven architecture, and data pipelines',
      'Ensure performance, reliability, and system integration across modules',
    ],
    area: 'Backend Engineering',
  },
  {
    num: '02',
    title: 'AI/ML Research',
    tagline: 'Applied AI · LLMs · Optimization · Intelligent Systems',
    responsibilities: [
      'Explore and develop models for intent understanding and inference',
      'Work on applied AI systems and optimization strategies',
      'Contribute to building intelligent pipelines for decision-making',
    ],
    area: 'AI/ML Research',
  },
  {
    num: '03',
    title: 'Computer Vision',
    tagline: 'Image Processing · Object Detection · Visual Computing',
    responsibilities: [
      'Develop systems for image/video understanding and object detection',
      'Work on visual interpretation relevant to design inputs',
      'Support real-time or near real-time processing pipelines',
    ],
    area: 'Computer Vision',
  },
  {
    num: '04',
    title: 'Mobile & Application Development',
    tagline: 'Cross-Platform · Offline-First · Low-Latency Interfaces',
    responsibilities: [
      'Build cross-platform applications with intuitive user flows',
      'Work on low-latency interfaces and system interaction layers',
      'Integrate frontend with backend and hardware where required',
    ],
    area: 'Mobile Development',
  },
  {
    num: '05',
    title: 'DevOps & Cloud Systems',
    tagline: 'Infrastructure as Code · CI/CD · Monitoring · Scalability',
    responsibilities: [
      'Set up infrastructure, CI/CD pipelines, and deployment workflows',
      'Ensure system reliability, monitoring, and scalability',
      'Manage cloud environments and operational efficiency',
    ],
    area: 'DevOps & Cloud',
  },
  {
    num: '06',
    title: 'AR/Spatial Computing',
    tagline: 'Augmented Reality · 3D Environments · Spatial Interfaces',
    responsibilities: [
      'Work on augmented reality and interactive 3D environments',
      'Explore spatial interfaces and visualization systems',
      'Contribute to real-time interaction and environment mapping',
    ],
    area: 'AR/Spatial Computing',
  },
  {
    num: '07',
    title: 'CAD/3D Engineering',
    tagline: 'Parametric Modeling · Geometry · Rendering · Simulation',
    responsibilities: [
      'Develop and work with parametric 3D models and geometry',
      'Focus on design structures, rendering, and simulation',
      'Ensure technical feasibility and manufacturable outputs',
    ],
    area: 'CAD/3D Engineering',
  },
];

const engagementStructure = [
  {
    icon: Clock,
    label: 'DURATION',
    value: '3 Months (Project-Based)',
  },
  {
    icon: Award,
    label: 'COMPENSATION',
    value: 'Fixed project amount (paid monthly)',
  },
  {
    icon: Compass,
    label: 'MODE',
    value: 'Focused, outcome-driven collaboration',
  },
  {
    icon: CheckCircle,
    label: 'EVALUATION',
    value: 'Final review upon project completion',
  },
  {
    icon: Users,
    label: 'OPPORTUNITY',
    value: 'High-performing contributors may be considered for long-term or core team roles',
  },
];

export default function RecruitmentSection({ onOpenApply }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="recruitment"
      className="py-28 sm:py-36 bg-[#F2EFE6] border-b border-[#11120F]/14 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <SectionHeader
          number="02"
          label="RECRUITMENT"
          meta="TECHNICAL ROLES & ENGAGEMENT"
          title={
            <>
              BUILD ARCEN <br />
              <span className="text-[#D85B46]">WITH US.</span>
            </>
          }
          subtitle="An opportunity to work on a high-impact, early-stage technology system."
          theme="light"
        />

        {/* High-Impact Recruitment Introduction */}
        <Reveal direction="up" distance={20}>
          <div className="p-8 sm:p-12 border border-[#11120F]/14 bg-white/50 mb-16 sm:mb-24 space-y-6">
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#D85B46] animate-coral-dot inline-block" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#D85B46] font-semibold">
                // OPPORTUNITY POSITIONING
              </span>
            </div>

            <p className="text-xl sm:text-2xl text-[#11120F] font-normal leading-relaxed">
              ARCEN is being built at the intersection of real industry problems and deep technology. We are opening project-based collaboration roles across key technical tracks.
            </p>

            <p className="text-base sm:text-lg text-[#11120F]/80 leading-relaxed">
              This is an opportunity to work on complex, first-principles challenges alongside experienced professionals, with direct exposure to industry leaders, venture ecosystems, and advanced technical domains. Exceptional performers may have the opportunity to grow into long-term core or founding roles.
            </p>

            <div className="pt-4 border-t border-[#11120F]/10">
              <p className="font-mono text-xs uppercase tracking-wider text-[#D85B46] font-semibold">
                This is not a conventional internship or job—it's an opportunity to work on a high-impact, early-stage system where your contributions directly shape the foundation of the product.
              </p>
            </div>
          </div>
        </Reveal>

        {/* 7 Technical Roles Header */}
        <Reveal direction="down" distance={10}>
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#77766F] pb-4 border-b border-[#11120F]/14 mb-8">
            <span>// TECHNICAL TRACKS (01 - 07)</span>
            <span>CLICK ROLE TO APPLY</span>
          </div>
        </Reveal>

        {/* 7 Technical Roles Cards List */}
        <StaggerContainer className="space-y-3 sm:space-y-4 mb-20 sm:mb-28" stagger={0.08}>
          {technicalRoles.map((role) => (
            <StaggerItem key={role.num}>
              <motion.div
                whileHover={shouldReduceMotion ? {} : { x: 14, y: -3, scale: 1.012 }}
                transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                onClick={() => onOpenApply(role.area)}
                className="group relative border border-[#11120F]/14 bg-white/40 hover:bg-white/90 hover:border-[#D85B46] p-6 sm:p-8 cursor-pointer overflow-hidden"
              >
                {/* Left accent bar — slides in faster */}
                <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-[#D85B46] opacity-0 group-hover:opacity-100 transition-all duration-150" />

                {/* Coral background shimmer sweep */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#D85B46]/08 via-[#D85B46]/04 to-transparent translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out pointer-events-none" />

                {/* Bottom glow line */}
                <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-[#D85B46] to-transparent transition-all duration-300 ease-out" />

                <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  {/* Left: Role Number & Details */}
                  <div className="space-y-3 flex-1">
                    <div className="flex items-center gap-3">
                      {/* Number — scales up on hover */}
                      <span className="font-mono text-xs text-[#D85B46] font-bold group-hover:scale-125 group-hover:tracking-wider transition-all duration-200 origin-left">
                        {role.num}
                      </span>
                      <span className="font-mono text-xs uppercase tracking-widest text-[#77766F] group-hover:text-[#11120F]/60 transition-colors duration-200">
                        {role.tagline}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-2xl sm:text-3xl text-[#11120F] group-hover:text-[#D85B46] transition-colors duration-150">
                      {role.title}
                    </h3>

                    {/* Responsibilities list */}
                    <ul className="space-y-2 pt-2">
                      {role.responsibilities.map((resp, idx) => (
                        <li key={idx} className="text-sm text-[#11120F]/85 flex items-start gap-2.5 group-hover:text-[#11120F] transition-colors duration-200">
                          <motion.span
                            className="text-[#D85B46] font-mono text-xs font-bold mt-0.5 shrink-0"
                            animate={undefined}
                          >
                            →
                          </motion.span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: Apply CTA Button */}
                  <div className="shrink-0 self-start lg:self-center">
                    <span className="inline-flex items-center gap-2 px-5 py-3 bg-[#11120F] text-[#F2EFE6] font-mono text-xs uppercase tracking-widest font-semibold group-hover:bg-[#D85B46] group-hover:gap-3 transition-all duration-200">
                      <span>APPLY NOW</span>
                      <ArrowUpRight className="w-4 h-4 text-[#D85B46] group-hover:text-[#F2EFE6] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-200" />
                    </span>
                  </div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* Engagement Structure Section */}
        <Reveal direction="up" distance={20}>
          <div className="border-2 border-[#11120F] bg-white/80 p-8 sm:p-12 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#11120F]/14 pb-6">
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#D85B46] font-semibold block mb-1">
                  // STRUCTURE & TERMS
                </span>
                <h3 className="font-display font-bold text-3xl sm:text-4xl text-[#11120F]">
                  Engagement Structure
                </h3>
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#77766F] px-3 py-1 bg-[#11120F]/05 border border-[#11120F]/10 self-start sm:self-auto">
                3-MONTH COLLABORATION
              </span>
            </div>

            <dl className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {engagementStructure.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={shouldReduceMotion ? {} : { y: -6, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 24 }}
                    className={`group relative p-6 border border-[#11120F]/10 bg-[#F2EFE6]/50 hover:border-[#D85B46] hover:bg-white overflow-hidden cursor-default space-y-2 ${
                      idx === 4 ? 'md:col-span-2 lg:col-span-2' : ''
                    }`}
                  >
                    {/* Coral shimmer sweep */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D85B46]/08 via-[#D85B46]/04 to-transparent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out pointer-events-none" />

                    {/* Top accent line */}
                    <div className="absolute top-0 left-0 h-[2px] w-0 group-hover:w-full bg-[#D85B46] transition-all duration-300 ease-out" />

                    <div className="relative flex items-center gap-2 text-[#D85B46]">
                      <IconComponent className="w-4 h-4 group-hover:scale-125 group-hover:rotate-6 transition-transform duration-200 origin-center" />
                      <dt className="font-mono text-xs uppercase tracking-widest font-bold group-hover:tracking-[0.18em] transition-all duration-200">
                        {item.label}
                      </dt>
                    </div>
                    <dd className="relative text-base text-[#11120F]/90 group-hover:text-[#11120F] font-medium leading-relaxed transition-colors duration-150">
                      {item.value}
                    </dd>
                  </motion.div>
                );
              })}
            </dl>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#11120F]/10">
              <span className="font-mono text-xs text-[#77766F] uppercase tracking-wider">
                READY TO CONTRIBUTE TO ARCEN?
              </span>
              <button
                onClick={() => onOpenApply('Backend Engineering')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#11120F] text-[#F2EFE6] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#D85B46] transition-colors cursor-pointer"
              >
                <span>SUBMIT CANDIDATE APPLICATION</span>
                <ArrowUpRight className="w-4 h-4 text-[#D85B46]" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
