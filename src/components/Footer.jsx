import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { Reveal, LineReveal } from './motion';

export default function Footer() {
  const shouldReduceMotion = useReducedMotion();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'ABOUT', href: '#about' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'SERVICES', href: '#technology' },
    { name: 'PROCESS', href: '#process' },
    { name: 'CAREERS', href: '#careers' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#171916] text-[#F2EFE6] pt-24 pb-12 border-t border-[#F2EFE6]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 pb-16 sm:pb-20 border-b border-[#F2EFE6]/15">
          {/* Logo & Headline */}
          <div className="lg:col-span-6 space-y-4">
            <Reveal direction="up" distance={16}>
              <a href="#" className="font-display font-bold text-4xl tracking-tighter block text-[#F2EFE6] group">
                <span>ARCEN</span>
                <span className="text-[#D85B46] inline-block transition-transform duration-300 group-hover:scale-125">.</span>
              </a>
              <p className="font-mono text-sm text-[#9E9D95] max-w-sm mt-3">
                Technology. People. Real-World Impact.
              </p>
              <div className="pt-3 font-mono text-xs text-[#9E9D95] flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D85B46] animate-coral-dot inline-block" />
                <span>SYSTEM OPERATIONAL // EST. 2026</span>
              </div>
            </Reveal>
          </div>

          {/* Nav Links */}
          <div className="lg:col-span-4 space-y-3">
            <Reveal direction="up" distance={16} delay={0.1}>
              <span className="font-mono text-xs uppercase tracking-widest text-[#D85B46] block font-semibold mb-4 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D85B46]" />
                // DIRECTORY
              </span>
              <ul className="space-y-3 font-mono text-xs uppercase tracking-widest">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="text-[#9E9D95] hover:text-[#D85B46] hover:translate-x-1.5 inline-block transition-all duration-300 select-none"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Contact CTA & Back to top */}
          <div className="lg:col-span-2 flex flex-col justify-between items-start lg:items-end gap-6">
            <Reveal direction="up" distance={16} delay={0.15}>
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#D85B46] hover:underline"
              >
                <span>CONTACT STUDIO</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </Reveal>

            <motion.button
              onClick={scrollToTop}
              whileHover={shouldReduceMotion ? {} : { y: -3 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
              className="p-3.5 border border-[#F2EFE6]/20 hover:border-[#D85B46] hover:bg-[#D85B46] hover:text-[#F2EFE6] transition-all duration-300 group cursor-pointer"
              aria-label="Scroll to Top"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </motion.button>
          </div>
        </div>

        {/* Bottom copyright & tagline */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#9E9D95]">
          <div>
            © {new Date().getFullYear()} ARCEN TECHNOLOGY STUDIO. ALL RIGHTS RESERVED.
          </div>
          <div className="text-[#D85B46] font-semibold tracking-wider">
            BUILD WHAT MATTERS.
          </div>
        </div>
      </div>
    </footer>
  );
}
