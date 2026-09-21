import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenApply }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body/touch scrolling strictly when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;

      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'ABOUT', href: '#about', index: '01' },
    { name: 'PROJECTS', href: '#projects', index: '02' },
    { name: 'SERVICES', href: '#technology', index: '03' },
    { name: 'PROCESS', href: '#process', index: '04' },
    { name: 'CAREERS', href: '#careers', index: '—' },
    { name: 'CONTACT', href: '#contact', index: '05' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        const offsetTop = element.getBoundingClientRect().top + window.pageYOffset - 80;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth',
        });
      }
    }, 120);
  };

  const handleApplyClick = () => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      onOpenApply();
    }, 120);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-[#F2EFE6]/90 backdrop-blur-md border-b border-[#11120F]/14 py-3.5 shadow-xs'
            : 'bg-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#"
            className="font-display font-bold text-2xl tracking-tighter text-[#11120F] flex items-center gap-2 group cursor-pointer select-none"
          >
            <span>ARCEN</span>
            <span className="w-1.5 h-1.5 bg-[#D85B46] rounded-full transition-transform duration-300 group-hover:scale-150" />
          </a>

          {/* Desktop Links with Animated Underline */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10 font-mono text-xs uppercase tracking-widest text-[#77766F]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-[#11120F] transition-colors relative py-1 group select-none cursor-pointer"
              >
                <span>{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#D85B46] group-hover:w-full transition-all duration-300 ease-out" />
              </a>
            ))}
          </nav>

          {/* Desktop CTA & Mobile Menu Toggle */}
          <div className="flex items-center gap-4 sm:gap-6">
            <motion.button
              onClick={onOpenApply}
              whileHover={shouldReduceMotion ? {} : { y: -1 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              className="hidden sm:inline-flex items-center gap-2 bg-[#11120F] text-[#F2EFE6] px-5 py-2.5 font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#D85B46] transition-colors duration-300 cursor-pointer"
            >
              <span>JOIN ARCEN</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#D85B46]" />
            </motion.button>

            <button
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-[#11120F] hover:text-[#D85B46] transition-colors cursor-pointer"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* True Top-Level Fully Opaque Mobile Navigation Overlay via Portal */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                key="mobile-nav-portal-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                style={{ backgroundColor: '#F2EFE6' }}
                className="fixed inset-0 z-[999] bg-[#F2EFE6] text-[#11120F] flex flex-col md:hidden overflow-hidden select-none"
              >
                {/* 1. Header Remains Visible (Top Bar) */}
                <div
                  style={{ backgroundColor: '#F2EFE6' }}
                  className="w-full px-6 sm:px-10 py-5 flex items-center justify-between border-b border-[#11120F]/14 shrink-0"
                >
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileMenuOpen(false);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="font-display font-bold text-2xl tracking-tighter text-[#11120F] flex items-center gap-2 cursor-pointer"
                  >
                    <span>ARCEN</span>
                    <span className="w-1.5 h-1.5 bg-[#D85B46] rounded-full" />
                  </a>

                  {/* Close button with high-contrast tactile feedback */}
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-2.5 text-[#11120F] hover:text-[#D85B46] border border-[#11120F]/20 hover:border-[#D85B46] transition-colors cursor-pointer"
                    aria-label="Close Navigation Menu"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* 2. Scrollable Menu Body (Fits 375x667, 390x844, 412x915, and shorter screens) */}
                <div
                  style={{ backgroundColor: '#F2EFE6' }}
                  className="flex-1 overflow-y-auto overscroll-contain px-6 sm:px-10 py-6 sm:py-8 flex flex-col justify-between gap-6"
                >
                  <div className="space-y-6">
                    {/* 3. // ARCEN NAVIGATION appears */}
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
                      className="font-mono text-xs uppercase tracking-widest text-[#77766F] flex items-center gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D85B46] animate-coral-dot" />
                      <span>// ARCEN NAVIGATION</span>
                    </motion.div>

                    {/* 4 & 5. Navigation items reveal sequentially + section numbers subtle stagger */}
                    <div className="flex flex-col">
                      {navLinks.map((link, idx) => (
                        <motion.a
                          key={link.name}
                          href={link.href}
                          initial={{ opacity: 0, x: -16 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: 0.1 + idx * 0.045,
                            duration: 0.35,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className="font-display font-bold text-3xl sm:text-4xl text-[#11120F] hover:text-[#D85B46] transition-colors flex items-center justify-between border-b border-[#11120F]/10 py-3.5 sm:py-4 cursor-pointer"
                        >
                          <span>{link.name}</span>
                          <span className="font-mono text-xs font-semibold text-[#77766F]">
                            {link.index}
                          </span>
                        </motion.a>
                      ))}
                    </div>
                  </div>

                  {/* 6. JOIN ARCEN button appears last */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.1 + navLinks.length * 0.045 + 0.05,
                      duration: 0.35,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="pt-4 border-t border-[#11120F]/14 shrink-0 pb-2"
                  >
                    <button
                      onClick={handleApplyClick}
                      className="w-full flex items-center justify-center gap-3 bg-[#11120F] text-[#F2EFE6] py-4 px-6 font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#D85B46] transition-colors cursor-pointer border border-[#11120F]"
                    >
                      <span>JOIN ARCEN RECRUITMENT</span>
                      <ArrowUpRight className="w-4 h-4 text-[#D85B46]" />
                    </button>

                    <div className="flex items-center justify-between font-mono text-[10px] text-[#77766F] uppercase tracking-wider mt-3">
                      <span>ARCEN STUDIO // 2026</span>
                      <span>SYS_ACTIVE</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
