import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { SectionHeader, Reveal, StaggerContainer, StaggerItem } from './motion';

const flowSteps = [
  { step: '01', name: 'Research', desc: 'AI/ML & Vision' },
  { step: '02', name: 'Engineering', desc: 'CAD & Backend' },
  { step: '03', name: 'Product', desc: 'UX & Cloud' },
  { step: '04', name: 'Industry', desc: 'Manufacturing' },
  { step: '05', name: 'Business', desc: 'Go-to-Market' },
  { step: '06', name: 'Investment', desc: 'Venture Capital' },
];

const expertDesignations = [
  {
    num: '01',
    title: 'AI/ML Systems Expert',
    expertise:
      'Artificial intelligence, machine learning, applied LLMs, neural architectures, model optimization, inference systems and intelligent automation',
    responsibilities: [
      'Evaluate technical feasibility of proposed AI/ML models and algorithms',
      'Determine whether requested AI features add genuine user or product value',
      'Guide choice of model architectures, training strategies, and fine-tuning methods',
      'Advise on data pipelines, synthetic data generation, and model evaluation protocols',
      'Assess computational requirements and cost-efficiency of inference systems',
    ],
    contribution:
      'This expert helps establish the intelligence layer of ARCEN and ensures that the proposed AI capabilities are technically achievable, efficient and commercially meaningful',
  },
  {
    num: '02',
    title: 'Computer Vision & Perception Expert',
    expertise:
      'Computer vision, object detection, image/video understanding, 3D perception, synthetic data, edge inference and visual computing',
    responsibilities: [
      'Review vision pipelines for object detection, segmentation, and feature extraction',
      'Advise on 3D reconstruction from 2D images and spatial perception techniques',
      'Guide selection of synthetic data techniques and domain adaptation strategies',
      'Evaluate real-time vs off-line visual computing tradeoffs',
      'Ensure visual analysis accuracy meets jewelry design requirements',
    ],
    contribution:
      'This role creates the bridge between physical/visual reality and digital intelligence',
  },
  {
    num: '03',
    title: 'CAD/Computational Geometry Expert',
    expertise:
      'Parametric CAD, B-Rep geometry, STEP/STP, IGES, computational geometry, rendering, simulation and engineering design',
    responsibilities: [
      'Review parametric geometry engines and CAD data representation formats',
      'Guide CAD file generation and compatibility with manufacturing standards',
      'Assess computational geometry algorithms for topological validity and tolerance',
      'Advise on real-time 3D rendering and physical simulation approaches',
      'Ensure design outputs translate accurately into manufacturable models',
    ],
    contribution:
      'This expert is responsible for the design-to-engineering bridge—ensuring that intelligent design concepts can ultimately become technically viable jewellery models',
  },
  {
    num: '04',
    title: 'Distributed Systems & Backend Architect',
    expertise:
      'Distributed systems, backend architecture, high-throughput APIs, databases, event streaming, fault tolerance and system integration',
    responsibilities: [
      'Review overall system architecture for scalability, performance, and fault tolerance',
      'Guide event-driven design, queue mechanisms, and API contract specifications',
      'Evaluate data storage, caching strategies, and database schema designs',
      'Advise on system integration between AI models, CAD engines, and frontend interfaces',
      'Ensure backend infrastructure can support low-latency high-concurrency requests',
    ],
    contribution:
      'This person creates the technical backbone that allows AI, vision, CAD, applications and other components to function as one system',
  },
  {
    num: '05',
    title: 'Cloud DevOps & Infrastructure Expert',
    expertise:
      'Cloud architecture, infrastructure-as-code, CI/CD, observability, deployment, security, scalability and infrastructure reliability',
    responsibilities: [
      'Guide setup of CI/CD pipelines, automated testing, and deployment workflows',
      'Advise on cloud resource provisioning, cost management, and scaling strategies',
      'Establish monitoring, logging, and observability standards for system health',
      'Review security protocols, data protection measures, and access controls',
      'Ensure system reliability and uptime across all development and production environments',
    ],
    contribution:
      'This role transforms the technology from a prototype into a reliable, deployable and scalable system',
  },
  {
    num: '06',
    title: 'AR/XR & Spatial Computing Expert',
    expertise:
      'Augmented reality, XR, spatial computing, LiDAR, 3D environments, spatial mapping and 3D interaction',
    responsibilities: [
      'Evaluate AR/XR framework selection and spatial interaction paradigms',
      'Guide 3D model rendering optimization for real-time spatial interfaces',
      'Assess hardware integration with mobile LiDAR and camera sensors',
      'Advise on intuitive 3D manipulation and try-on visualization UX',
      'Review latency and frame rate performance for AR experiences',
    ],
    contribution:
      'This expert works on the physical-digital interaction layer, potentially allowing users to interact with jewellery concepts in a much more intuitive way',
  },
  {
    num: '07',
    title: 'Product & UX Strategy Expert',
    expertise:
      'Product management, UX, customer journeys, human-computer interaction, product validation and MVP strategy',
    responsibilities: [
      'Evaluate product-market fit hypothesis and core user value propositions',
      'Review user experience flows, interaction design, and interface ergonomics',
      'Map user journeys across design creation, customization, and approval workflows',
      'Guide MVP feature prioritization and release scope definition',
      'Establish user feedback loops and usability testing protocols',
    ],
    contribution:
      'This person answers one of the most important questions: "Are we building something technically impressive that actually solves the right problem?" They become the bridge between technology and the user',
  },
  {
    num: '08',
    title: 'Jewellery Industry & Manufacturing Expert',
    expertise:
      'Jewellery design, CAD-to-production workflows, manufacturing, retail, wholesale, gemstones, diamonds and jewellery operations',
    responsibilities: [
      'Validate technical specifications against real-world jewelry manufacturing constraints',
      'Evaluate CAD output compatibility with casting, 3D printing, and setting processes',
      'Guide alignment with industry pricing, material specifications, and tolerances',
      'Review market workflow integration for retail, wholesale, and custom design houses',
      'Provide direct feedback from jewelry designers, manufacturers, and brand owners',
    ],
    contribution:
      'This is the industry reality check. It ensures ARCEN does not become a technology looking for a problem',
  },
  {
    num: '09',
    title: 'Business Strategy & Go-to-Market Expert',
    expertise:
      'Business models, commercialization, market strategy, customer acquisition, partnerships, pricing and go-to-market planning',
    responsibilities: [
      'Assess business model sustainability, pricing tiers, and revenue streams',
      'Guide go-to-market strategy for enterprise brands and independent jewelers',
      'Advise on strategic partnership opportunities across the supply chain',
      'Evaluate customer acquisition tactics and unit economics',
      'Formulate growth roadmap for market penetration and expansion',
    ],
    contribution:
      'This person converts: Technology → Product → Business. They help answer: "Who will pay for ARCEN, why will they pay, and how do we reach them?"',
  },
  {
    num: '10',
    title: 'Venture Investment & Fundraising Expert',
    expertise:
      'Venture capital, angel investment, fundraising, startup strategy, investor relations and venture positioning',
    responsibilities: [
      'Evaluate venture positioning, investment narrative, and pitch materials',
      'Guide fundraising strategy, timing, and capital requirements',
      'Advise on cap table structure, valuation metrics, and investor terms',
      'Connect project with relevant venture networks and strategic angels',
      'Prepare founding team for investor due diligence and presentation rounds',
    ],
    contribution:
      'This expert helps transform ARCEN from a technology project into an investable venture',
  },
];

export default function MentorshipSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="mentorship"
      className="py-28 sm:py-36 bg-[#171916] border-b border-white/10 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header */}
        <SectionHeader
          number="03"
          label="MENTORSHIP"
          meta="EXPERT ADVISORY PANEL"
          title={
            <>
              STRATEGIC <br />
              <span className="text-[#D85B46]">GUIDANCE.</span>
            </>
          }
          subtitle="A selective mentorship panel across key technical and industry domains."
          theme="dark"
        />

        {/* Definition Paragraph */}
        <Reveal direction="up" distance={20}>
          <div className="p-8 sm:p-10 border-l-4 border-[#D85B46] bg-white/5 mb-16 sm:mb-20">
            <p className="text-base sm:text-xl text-[#F2EFE6]/90 font-normal leading-relaxed">
              ARCEN is establishing a selective mentorship panel across key technical and industry domains. Mentors will contribute through structured evaluation of the project—assessing feasibility, scalability, and market alignment—while providing strategic guidance on architecture, research direction, and execution. Beyond periodic reviews and detailed feedback, mentors will play an active role in supporting the team through complex challenges, offering insights drawn from experience to strengthen decision-making and accelerate development.
            </p>
          </div>
        </Reveal>

        {/* Visual Flow Diagram: Research → Engineering → Product → Industry → Business → Investment */}
        <Reveal direction="down" distance={10}>
          <div className="mb-16 sm:mb-24">
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#9E9D95] pb-4 border-b border-white/10 mb-8">
              <span>// ADVISORY DOMAIN FLOW</span>
              <span>STRATEGIC COLLABORATION</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
              {flowSteps.map((stepItem, idx) => (
                <div
                  key={stepItem.step}
                  className="p-4 border border-white/10 bg-white/5 flex flex-col justify-between relative group hover:border-[#D85B46] transition-colors"
                >
                  <div className="flex items-center justify-between font-mono text-[11px] text-[#D85B46] font-semibold mb-3">
                    <span>{stepItem.step}</span>
                    {idx < flowSteps.length - 1 && (
                      <ArrowRight className="w-3.5 h-3.5 text-[#9E9D95] hidden lg:block" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-lg text-[#F2EFE6]">
                      {stepItem.name}
                    </h4>
                    <p className="font-mono text-[10px] text-[#9E9D95] uppercase tracking-wider mt-1">
                      {stepItem.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* 10 Expert Designations List Header */}
        <Reveal direction="down" distance={10}>
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#9E9D95] pb-4 border-b border-white/10 mb-8">
            <span>// EXPERT DESIGNATIONS (01 - 10)</span>
            <span>DOMAINS & RESPONSIBILITIES</span>
          </div>
        </Reveal>

        {/* 10 Expert Designation Cards — Accordion Dropdowns */}
        <ExpertAccordion shouldReduceMotion={shouldReduceMotion} />
      </div>
    </section>
  );
}

function ExpertAccordion({ shouldReduceMotion }) {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" stagger={0.06}>
      {expertDesignations.map((expert, idx) => {
        const isOpen = openIdx === idx;
        return (
          <StaggerItem key={expert.num}>
            <div
              className={`relative border transition-all duration-300 flex flex-col group overflow-hidden ${
                isOpen
                  ? 'border-[#D85B46] bg-white/10'
                  : 'border-white/10 bg-white/5 hover:border-[#D85B46]/50'
              }`}
            >
              {/* Left vertical accent bar */}
              <div className={`absolute top-0 left-0 bottom-0 w-[3px] bg-[#D85B46] transition-all duration-200 ${
                isOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`} />
              {/* Card Header — always visible */}
              <button
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                className="w-full text-left pl-7 pr-6 sm:pr-8 py-6 sm:py-8 min-h-[140px] flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D85B46]"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="font-mono text-xs text-[#D85B46] font-bold shrink-0">
                    {expert.num}
                  </span>
                  <h3 className={`font-display font-bold text-xl sm:text-2xl transition-colors duration-300 leading-tight ${isOpen ? 'text-[#D85B46]' : 'text-[#F2EFE6] group-hover:text-[#D85B46]'}`}>
                    {expert.title}
                  </h3>
                </div>

                {/* Know More / Close indicator */}
                <div className="shrink-0 flex items-center gap-2">
                  <span className={`font-mono text-[10px] uppercase tracking-widest font-semibold transition-colors duration-300 hidden sm:block ${isOpen ? 'text-[#D85B46]' : 'text-[#9E9D95] group-hover:text-[#D85B46]'}`}>
                    {isOpen ? 'CLOSE' : 'KNOW MORE'}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`p-1.5 border transition-colors duration-300 ${isOpen ? 'bg-[#D85B46] border-[#D85B46]' : 'border-white/20 group-hover:border-[#D85B46]'}`}
                  >
                    <ChevronDown className={`w-4 h-4 ${isOpen ? 'text-white' : 'text-[#9E9D95] group-hover:text-[#D85B46]'}`} />
                  </motion.div>
                </div>
              </button>

              {/* Expandable Content */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: shouldReduceMotion ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0 space-y-5 border-t border-white/10">
                      {/* Expertise */}
                      <div className="pt-5">
                        <span className="font-mono text-[11px] uppercase tracking-widest text-[#9E9D95] font-semibold block mb-2">
                          EXPERTISE
                        </span>
                        <p className="text-sm text-[#F2EFE6]/85 leading-relaxed bg-white/5 p-3 border border-white/10">
                          {expert.expertise}
                        </p>
                      </div>

                      {/* What They Will Do */}
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-widest text-[#9E9D95] font-semibold block mb-2">
                          WHAT THEY WILL DO
                        </span>
                        <ul className="space-y-2">
                          {expert.responsibilities.map((resp, rIdx) => (
                            <li key={rIdx} className="text-xs sm:text-sm text-[#F2EFE6]/85 flex items-start gap-2">
                              <span className="text-[#D85B46] font-mono font-bold mt-0.5 shrink-0">→</span>
                              <span className="leading-snug">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Core Contribution */}
                      <div className="pt-4 border-t border-white/10">
                        <span className="font-mono text-[10px] uppercase tracking-widest text-[#D85B46] font-semibold block mb-1">
                          CORE CONTRIBUTION
                        </span>
                        <p className="text-xs sm:text-sm text-[#F2EFE6]/90 font-medium italic leading-relaxed">
                          "{expert.contribution}"
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </StaggerItem>
        );
      })}
    </StaggerContainer>
  );
}
