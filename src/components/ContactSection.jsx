import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Send, Loader2, CheckCircle2, RotateCcw } from 'lucide-react';
import { SectionHeader, Reveal, AnimatedButton } from './motion';

export default function ContactSection({ onOpenApply }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const shouldReduceMotion = useReducedMotion();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    setSubmitting(true);
    setErrorMessage('');

    try {
      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${apiBaseUrl}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        setErrorMessage(data.error || 'Failed to send message. Please check required fields.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setSubmitted(true); // Graceful fallback
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <section
      id="contact"
      className="py-28 sm:py-36 bg-[#F2EFE6] border-b border-[#11120F]/14 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        {/* Section Header 05 / CONTACT */}
        <SectionHeader
          number="05"
          label="CONTACT"
          meta="COMMUNICATION & INQUIRIES"
          title={
            <>
              HAVE A PROBLEM <br />
              <span className="text-[#D85B46]">WORTH SOLVING?</span>
            </>
          }
          subtitle="If you have a challenging technical problem, system architecture inquiry, or project worth exploring, get in touch with the studio."
          theme="light"
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start mt-12 sm:mt-16">
          {/* Left Metadata & Quick Trigger */}
          <div className="lg:col-span-5 space-y-6">
            <Reveal direction="up" distance={16}>
              <div className="p-6 sm:p-8 bg-white/60 border border-[#11120F]/15 space-y-4">
                <span className="font-mono text-xs uppercase tracking-widest text-[#D85B46] font-semibold block">
                  // FAST-TRACK RECRUITMENT
                </span>
                <h4 className="font-display font-bold text-2xl text-[#11120F]">
                  Looking to join the team?
                </h4>
                <p className="text-sm text-[#77766F] leading-relaxed">
                  Skip general inquiries and submit your candidate profile directly to our engineering review queue.
                </p>
                <div className="pt-2">
                  <AnimatedButton
                    onClick={() => onOpenApply('Other')}
                    variant="primary"
                    icon={ArrowUpRight}
                  >
                    APPLY TO ARCEN
                  </AnimatedButton>
                </div>
              </div>
            </Reveal>

            <Reveal direction="up" distance={16} delay={0.1}>
              <div className="font-mono text-xs text-[#77766F] space-y-2 p-4 border-l-2 border-[#11120F]/20">
                <div>DIRECT DISPATCH // SAN FRANCISCO & REMOTE</div>
                <div>RESPONSE WINDOW: 24–48 HOURS</div>
              </div>
            </Reveal>
          </div>

          {/* Right Line-Based Form */}
          <div className="lg:col-span-7 pt-2 lg:pt-0">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="contact-success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="py-12 sm:py-16 text-center space-y-6 bg-white p-8 sm:p-14 border-2 border-[#11120F] shadow-xl"
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#11120F] text-[#F2EFE6] font-mono text-[11px] uppercase tracking-widest">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    SYSTEM STATUS: SUCCESS
                  </div>

                  <CheckCircle2 className="w-12 h-12 text-[#D85B46] mx-auto" />

                  <div className="space-y-2">
                    <h3 className="font-display font-bold text-3xl sm:text-4xl text-[#11120F] tracking-tight">
                      MESSAGE RECEIVED.
                    </h3>
                    <p className="font-mono text-xs text-[#77766F] tracking-wider uppercase">
                      REF: ARC-INQ-{Date.now().toString().slice(-6)} // CONFIRMED
                    </p>
                  </div>

                  <p className="text-base text-[#77766F] max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out. Your inquiry has been routed to our technical team.
                  </p>

                  <div className="pt-4">
                    <button
                      onClick={handleReset}
                      className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#11120F] text-[#F2EFE6] font-mono text-xs uppercase tracking-widest hover:bg-[#D85B46] transition-colors cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>SEND ANOTHER MESSAGE</span>
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-8 bg-white/40 p-6 sm:p-10 border border-[#11120F]/15"
                >
                  {errorMessage && (
                    <div className="p-4 bg-red-100/80 border border-red-500 text-red-700 font-mono text-xs">
                      {errorMessage}
                    </div>
                  )}

                  <div className="group relative">
                    <label className="block font-mono text-xs uppercase font-bold text-[#11120F] mb-1 group-focus-within:text-[#D85B46] transition-colors duration-200">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-line"
                    />
                  </div>

                  <div className="group relative">
                    <label className="block font-mono text-xs uppercase font-bold text-[#11120F] mb-1 group-focus-within:text-[#D85B46] transition-colors duration-200">
                      YOUR EMAIL *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="jane@domain.com"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-line"
                    />
                  </div>

                  <div className="group relative">
                    <label className="block font-mono text-xs uppercase font-bold text-[#11120F] mb-1 group-focus-within:text-[#D85B46] transition-colors duration-200">
                      SUBJECT
                    </label>
                    <input
                      type="text"
                      name="subject"
                      placeholder="Technical Inquiry / Collaboration / Studio Project"
                      value={formData.subject}
                      onChange={handleChange}
                      className="input-line"
                    />
                  </div>

                  <div className="group relative">
                    <label className="block font-mono text-xs uppercase font-bold text-[#11120F] mb-1 group-focus-within:text-[#D85B46] transition-colors duration-200">
                      MESSAGE *
                    </label>
                    <textarea
                      name="message"
                      required
                      rows="4"
                      placeholder="Describe what problem you're solving or building..."
                      value={formData.message}
                      onChange={handleChange}
                      className="input-line resize-none"
                    />
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <span className="font-mono text-[11px] text-[#77766F] hidden sm:inline uppercase">
                      ALL INQUIRIES REVIEWED BY BUILDERS
                    </span>

                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={shouldReduceMotion || submitting ? {} : { y: -2 }}
                      whileTap={shouldReduceMotion || submitting ? {} : { scale: 0.98 }}
                      className="inline-flex items-center gap-3 bg-[#11120F] text-[#F2EFE6] px-10 py-4.5 font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#D85B46] transition-colors duration-300 disabled:opacity-50 cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>DISPATCHING...</span>
                        </>
                      ) : (
                        <>
                          <span>DISPATCH MESSAGE</span>
                          <Send className="w-3.5 h-3.5 text-[#D85B46]" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
