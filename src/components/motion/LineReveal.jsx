import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function LineReveal({
  className = 'h-[1px] bg-[#11120F]/14',
  duration = 0.85,
  delay = 0,
  once = true,
  threshold = 0.1,
  origin = 'left',
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={`w-full ${className}`} {...props} />;
  }

  return (
    <div className="w-full overflow-hidden" {...props}>
      <motion.div
        className={`w-full ${className}`}
        style={{ transformOrigin: origin }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once, amount: threshold }}
        transition={{
          duration,
          delay,
          ease: [0.16, 1, 0.3, 1], // ARCEN curve
        }}
      />
    </div>
  );
}
