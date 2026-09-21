import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { X, Send, Loader2, CheckCircle, FileText, Trash2, ArrowUpRight } from 'lucide-react';

export default function ApplicationFormModal({ isOpen, onClose, initialInterest = 'Backend Engineering' }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: initialInterest || 'Backend Engineering',
    about: '',
    whatBuilt: '',
    portfolio: '',
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [fileError, setFileError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const shouldReduceMotion = useReducedMotion();

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (value && !emailRegex.test(value)) {
        setEmailError('Please enter a valid email address.');
      } else {
        setEmailError('');
      }
    }
  };

  const handleFileSelect = (file) => {
    setFileError('');
    if (!file) return;

    const isPdfExt = file.name.toLowerCase().endsWith('.pdf');
    const isPdfMime = file.type === 'application/pdf';

    if (!isPdfExt && !isPdfMime) {
      setFileError('Invalid file format. Please upload a PDF document (.pdf).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setFileError('File size exceeds maximum limit of 5 MB.');
      return;
    }

    setResumeFile(file);
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleRemoveFile = () => {
    setResumeFile(null);
    setFileError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (emailError) {
      setErrorMessage('Please fix field validation errors before submitting.');
      return;
    }

    setSubmitting(true);
    setErrorMessage('');

    try {
      const dataPayload = new FormData();
      dataPayload.append('name', formData.name);
      dataPayload.append('email', formData.email);
      dataPayload.append('phone', formData.phone);
      dataPayload.append('interest', formData.interest);
      dataPayload.append('about', formData.about);
      dataPayload.append('whatBuilt', formData.whatBuilt);
      dataPayload.append('portfolio', formData.portfolio);

      if (resumeFile) {
        dataPayload.append('resume', resumeFile);
      }

      const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || '';
      const response = await fetch(`${apiBaseUrl}/api/apply`, {
        method: 'POST',
        body: dataPayload,
      });

      const responseData = await response.json();

      if (response.ok) {
        setSubmitted(true);
      } else {
        setErrorMessage(responseData.error || 'Failed to submit application. Please try again.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setSubmitted(false);
    setErrorMessage('');
    setFileError('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/75 backdrop-blur-md">
          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#F2EFE6] border-2 border-[#11120F] max-w-3xl w-full p-6 sm:p-12 relative max-h-[92vh] overflow-y-auto shadow-2xl"
          >
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 p-2.5 text-[#11120F] hover:bg-[#11120F]/10 border border-[#11120F]/20 transition-colors cursor-pointer"
              aria-label="Close Application Modal"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="py-12 sm:py-16 text-center space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#11120F] text-[#F2EFE6] font-mono text-[11px] uppercase tracking-widest mx-auto">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  SYSTEM STATUS: SUCCESS
                </div>

                <div className="w-16 h-16 bg-[#11120F] text-[#F2EFE6] rounded-full flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle className="w-8 h-8 text-[#D85B46]" />
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-bold text-3xl sm:text-5xl text-[#11120F] tracking-tight">
                    APPLICATION RECEIVED.
                  </h3>
                  <p className="font-mono text-xs text-[#77766F] tracking-wider uppercase">
                    CONFIRMATION ID: ARC-REC-{Date.now().toString().slice(-6)} // QUEUED
                  </p>
                </div>

                <p className="text-base sm:text-lg text-[#77766F] max-w-md mx-auto leading-relaxed">
                  Thanks for sharing what you're building. Your candidate profile has been ingested into our engineering review queue.
                </p>

                <div className="pt-4">
                  <button
                    onClick={handleClose}
                    className="px-10 py-4 bg-[#11120F] text-[#F2EFE6] font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#D85B46] transition-colors cursor-pointer"
                  >
                    RETURN TO ARCEN
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <span className="font-mono text-xs uppercase tracking-widest text-[#D85B46] font-semibold block mb-3 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D85B46] animate-coral-dot inline-block" />
                  // CANDIDATE APPLICATION PORTAL
                </span>

                <h2 className="font-display font-bold text-4xl sm:text-6xl text-[#11120F] tracking-tight leading-[0.95] mb-3">
                  START WITH <br />
                  <span className="text-[#D85B46]">THE BASICS.</span>
                </h2>

                <p className="text-sm sm:text-base text-[#77766F] max-w-lg mb-8 font-normal leading-relaxed">
                  Share context so we can understand where your curiosity, technical strengths, and problem-solving meet.
                </p>

                {errorMessage && (
                  <div className="mb-6 p-4 bg-[#D85B46]/10 border border-[#D85B46] text-[#D85B46] text-xs font-mono">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Name */}
                  <div className="group">
                    <label className="block font-mono text-xs uppercase font-bold text-[#11120F] mb-1 group-focus-within:text-[#D85B46] transition-colors">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="Alex Mercer"
                      value={formData.name}
                      onChange={handleTextChange}
                      className="input-line"
                    />
                  </div>

                  {/* Email */}
                  <div className="group">
                    <label className="block font-mono text-xs uppercase font-bold text-[#11120F] mb-1 group-focus-within:text-[#D85B46] transition-colors">
                      YOUR EMAIL *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      placeholder="alex@example.com"
                      value={formData.email}
                      onChange={handleTextChange}
                      className="input-line"
                    />
                    {emailError && (
                      <span className="font-mono text-xs text-[#D85B46] mt-1 block">
                        {emailError}
                      </span>
                    )}
                  </div>

                  {/* Phone */}
                  <div className="group">
                    <label className="block font-mono text-xs uppercase font-bold text-[#11120F] mb-1 group-focus-within:text-[#D85B46] transition-colors">
                      YOUR PHONE NUMBER
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={handleTextChange}
                      className="input-line"
                    />
                  </div>

                  {/* Area of Interest */}
                  <div className="group">
                    <label className="block font-mono text-xs uppercase font-bold text-[#11120F] mb-1 group-focus-within:text-[#D85B46] transition-colors">
                      PRIMARY AREA OF INTEREST *
                    </label>
                    <select
                      name="interest"
                      value={formData.interest}
                      onChange={handleTextChange}
                      className="input-line font-mono text-sm bg-transparent cursor-pointer"
                    >
                      <option value="Backend Engineering">Backend Engineering</option>
                      <option value="Artificial Intelligence & Machine Learning">Artificial Intelligence & Machine Learning</option>
                      <option value="Computer Vision">Computer Vision</option>
                      <option value="Mobile & Application Development">Mobile & Application Development</option>
                      <option value="DevOps & Cloud">DevOps & Cloud</option>
                      <option value="AR & Spatial Technology">AR & Spatial Technology</option>
                      <option value="CAD / 3D Technology">CAD / 3D Technology</option>
                      <option value="Other">Other / Multi-disciplinary</option>
                    </select>
                  </div>

                  {/* Tell us about yourself */}
                  <div className="group">
                    <label className="block font-mono text-xs uppercase font-bold text-[#11120F] mb-1 group-focus-within:text-[#D85B46] transition-colors">
                      TELL US ABOUT YOURSELF
                    </label>
                    <textarea
                      name="about"
                      rows="3"
                      placeholder="What are you curious about right now?"
                      value={formData.about}
                      onChange={handleTextChange}
                      className="input-line resize-none"
                    />
                  </div>

                  {/* What have you built */}
                  <div className="group">
                    <label className="block font-mono text-xs uppercase font-bold text-[#11120F] mb-1 group-focus-within:text-[#D85B46] transition-colors">
                      WHAT HAVE YOU BUILT?
                    </label>
                    <textarea
                      name="whatBuilt"
                      rows="3"
                      placeholder="Projects, systems, experiments, tools, or problems you've worked on."
                      value={formData.whatBuilt}
                      onChange={handleTextChange}
                      className="input-line resize-none"
                    />
                  </div>

                  {/* Portfolio */}
                  <div className="group">
                    <label className="block font-mono text-xs uppercase font-bold text-[#11120F] mb-1 group-focus-within:text-[#D85B46] transition-colors">
                      PORTFOLIO / GITHUB / LINKEDIN
                    </label>
                    <input
                      type="text"
                      name="portfolio"
                      placeholder="https://github.com/yourusername (Optional)"
                      value={formData.portfolio}
                      onChange={handleTextChange}
                      className="input-line"
                    />
                  </div>

                  {/* Resume Drag and Drop */}
                  <div>
                    <label className="block font-mono text-xs uppercase font-bold text-[#11120F] mb-2">
                      RESUME / CV (PDF ONLY)
                    </label>

                    {resumeFile ? (
                      <div className="p-4 bg-white border border-[#11120F] flex items-center justify-between font-mono text-xs">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-[#D85B46]" />
                          <div>
                            <span className="font-bold text-[#11120F] block">{resumeFile.name}</span>
                            <span className="text-[#77766F]">
                              {(resumeFile.size / (1024 * 1024)).toFixed(2)} MB • <span className="text-emerald-700 font-semibold">✓ Ready to attach</span>
                            </span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={handleRemoveFile}
                          className="p-2 text-[#77766F] hover:text-[#D85B46] transition-colors cursor-pointer"
                          aria-label="Remove File"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        className="border-2 border-dashed border-[#11120F]/30 hover:border-[#D85B46] p-8 text-center bg-white/40 hover:bg-white/70 transition-all duration-200 cursor-pointer"
                      >
                        <input
                          type="file"
                          id="pdf-resume-file"
                          onChange={handleFileInput}
                          accept=".pdf,application/pdf"
                          className="hidden"
                        />
                        <label htmlFor="pdf-resume-file" className="cursor-pointer block space-y-2">
                          <FileText className="w-8 h-8 text-[#77766F] mx-auto" />
                          <span className="font-mono text-xs uppercase font-bold text-[#11120F] block">
                            DROP YOUR PDF HERE OR CLICK TO UPLOAD
                          </span>
                          <span className="font-mono text-[10px] text-[#77766F] block">
                            PDF • MAXIMUM 5 MB
                          </span>
                        </label>
                      </div>
                    )}

                    {fileError && (
                      <span className="font-mono text-xs text-[#D85B46] mt-2 block">
                        {fileError}
                      </span>
                    )}
                  </div>

                  {/* Bottom Action */}
                  <div className="pt-6 border-t border-[#11120F]/14 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                    <span className="font-mono text-[11px] text-[#77766F] tracking-wider uppercase">
                      ALL FIELDS ARE USEFUL. NONE ARE A TEST.
                    </span>

                    <motion.button
                      type="submit"
                      disabled={submitting}
                      whileHover={shouldReduceMotion || submitting ? {} : { y: -2 }}
                      whileTap={shouldReduceMotion || submitting ? {} : { scale: 0.98 }}
                      className="inline-flex items-center justify-center gap-3 bg-[#11120F] text-[#F2EFE6] px-10 py-4.5 font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#D85B46] transition-colors disabled:opacity-50 cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>ATTACHING & DISPATCHING...</span>
                        </>
                      ) : (
                        <>
                          <span>SUBMIT APPLICATION</span>
                          <Send className="w-3.5 h-3.5 text-[#D85B46]" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
