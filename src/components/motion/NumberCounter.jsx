import React, { useEffect, useState, useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

export default function NumberCounter({
  from = 0,
  to,
  duration = 1.6,
  delay = 0,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(shouldReduceMotion ? to : from);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      if (shouldReduceMotion) setDisplayValue(to);
      return;
    }

    let startTimestamp = null;
    let animationFrameId = null;

    const timeoutId = setTimeout(() => {
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        
        // ARCEN precision ease-out curve (equivalent to cubic-bezier(0.16, 1, 0.3, 1))
        // Approximation: 1 - Math.pow(1 - progress, 3.5)
        const easedProgress = 1 - Math.pow(1 - progress, 3.5);
        const currentValue = from + (to - from) * easedProgress;

        setDisplayValue(currentValue);

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        } else {
          setDisplayValue(to);
        }
      };

      animationFrameId = requestAnimationFrame(step);
    }, delay * 1000);

    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isInView, from, to, duration, delay, shouldReduceMotion]);

  const formattedValue = decimals > 0
    ? displayValue.toFixed(decimals)
    : Math.round(displayValue).toString();

  return (
    <span ref={ref} className={className}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
}
