import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export function StaggerContainer({
  children,
  className = '',
  stagger = 0.08,
  delayChildren = 0,
  once = true,
  threshold = 0.1,
  as = 'div',
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = motion[as] || motion.div;

  const containerVariants = {
    hidden: { opacity: shouldReduceMotion ? 1 : 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : stagger,
        delayChildren,
      },
    },
  };

  return (
    <MotionComponent
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}

export function StaggerItem({
  children,
  className = '',
  distance = 20,
  duration = 0.55,
  as = 'div',
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = motion[as] || motion.div;

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : distance,
      filter: shouldReduceMotion ? 'none' : 'blur(2px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <MotionComponent className={className} variants={itemVariants} {...props}>
      {children}
    </MotionComponent>
  );
}
