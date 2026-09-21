import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let startTimestamp = null;
    let animationFrameId = null;
    const duration = 1700; // 1.7 seconds total loading time

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const elapsed = timestamp - startTimestamp;
      const linearProgress = Math.min(elapsed / duration, 1);

      // Realistic easing: swift early progress, steady middle, clean snap to 100
      // Bezier ease approximation: 1 - Math.pow(1 - linearProgress, 2.8)
      const currentPercent = Math.min(Math.floor(linearProgress * 100), 100);
      setProgress(currentPercent);

      if (linearProgress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setProgress(100);
        setIsComplete(true);

        // Hold briefly at 100% for readability, then trigger exit transition
        const exitTimer = setTimeout(() => {
          setIsExiting(true);
          // Notify parent that exit has started so Hero can begin orchestrating
          if (onComplete) onComplete();
        }, 220);

        return () => clearTimeout(exitTimer);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          key="arcen-preloader"
          initial={{ opacity: 1, y: 0 }}
          exit={{
            y: '-100%',
            transition: {
              duration: 0.75,
              ease: [0.65, 0, 0.35, 1], // Editorial curtain reveal
            },
          }}
          className="fixed inset-0 z-50 bg-[#F2EFE6] text-[#11120F] flex flex-col justify-between p-8 sm:p-14 select-none overflow-hidden"
        >
          {/* Subtle Technical Corner Coordinates */}
          <div className="absolute top-6 left-8 sm:top-8 sm:left-14 font-mono text-[10px] text-[#77766F]/60 tracking-widest hidden sm:block">
            + SYS_INIT // 2026.ARC
          </div>
          <div className="absolute top-6 right-8 sm:top-8 sm:right-14 font-mono text-[10px] text-[#77766F]/60 tracking-widest hidden sm:block">
            LAT 37.7749° N · LON 122.4194° W
          </div>

          {/* Central Monogram & Identity Block */}
          <div className="my-auto flex flex-col items-center text-center justify-center space-y-6 max-w-xl mx-auto w-full">
            {/* Stylized 'A' Geometric Mark */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, filter: 'blur(6px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center border border-[#11120F]/20 bg-[#11120F]/03"
            >
              {/* Monogram A with Coral Accent */}
              <span className="font-display font-bold text-2xl sm:text-3xl text-[#11120F]">
                A
              </span>
              <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#D85B46]" />
            </motion.div>

            {/* ARCEN Title */}
            <motion.div
              initial={{ opacity: 0, y: 12, filter: 'blur(4px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="font-display font-bold text-4xl sm:text-6xl tracking-tight text-[#11120F]">
                ARCEN
              </h1>
            </motion.div>

            {/* Subtitle Statement */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-2"
            >
              <p className="font-mono text-xs sm:text-sm uppercase tracking-[0.25em] text-[#77766F] font-medium">
                TECHNOLOGY. PEOPLE. REAL-WORLD IMPACT.
              </p>
            </motion.div>
          </div>

          {/* Bottom Technical Status & Synchronized Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="w-full max-w-5xl mx-auto space-y-4"
          >
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-[#11120F]">
              <div className="flex items-center gap-3">
                <span className="text-[#11120F] font-semibold">ARCEN / 2026</span>
                <span className="text-[#77766F]">•</span>
                <span className={`transition-colors duration-300 ${isComplete ? 'text-[#D85B46] font-semibold' : 'text-[#77766F]'}`}>
                  {isComplete ? 'SYSTEM READY' : 'INITIALIZING...'}
                </span>
              </div>

              {/* Percentage Counter */}
              <div className="font-mono font-bold text-sm sm:text-base text-[#11120F] tracking-wider">
                {String(progress).padStart(2, '0')}%
              </div>
            </div>

            {/* Progress Line */}
            <div className="w-full h-[2px] bg-[#11120F]/12 relative overflow-hidden">
              <motion.div
                className="h-full bg-[#D85B46]"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'linear' }}
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
