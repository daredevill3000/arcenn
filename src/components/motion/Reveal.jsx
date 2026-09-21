import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function Reveal({
  children,
  className = '',
  direction = 'up',
  distance = 24,
  delay = 0,
  duration = 0.65,
  blur = true,
  once = true,
  threshold = 0.1,
  as = 'div',
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  const getInitialPosition = () => {
    if (shouldReduceMotion) return { x: 0, y: 0 };
    switch (direction) {
      case 'up':
        return { x: 0, y: distance };
      case 'down':
        return { x: 0, y: -distance };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialPos = getInitialPosition();

  const MotionComponent = motion[as] || motion.div;

  if (shouldReduceMotion) {
    return (
      <MotionComponent
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once, amount: threshold }}
        transition={{ duration: 0.2, delay }}
        {...props}
      >
        {children}
      </MotionComponent>
    );
  }

  return (
    <MotionComponent
      className={className}
      initial={{
        opacity: 0,
        x: initialPos.x,
        y: initialPos.y,
        filter: blur ? 'blur(4px)' : 'none',
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        filter: 'blur(0px)',
      }}
      viewport={{ once, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // ARCEN precision curve
      }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
