import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

export default function AnimatedButton({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary' | 'secondary' | 'coral' | 'ghost'
  className = '',
  disabled = false,
  icon: Icon,
  ...props
}) {
  const shouldReduceMotion = useReducedMotion();

  const baseStyles = 'group relative inline-flex items-center justify-center gap-3 font-mono text-xs uppercase tracking-widest font-semibold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer select-none';

  const variantStyles = {
    primary: 'bg-[#11120F] text-[#F2EFE6] px-8 py-4.5 hover:bg-[#D85B46] border border-[#11120F]',
    secondary: 'bg-transparent text-[#11120F] px-8 py-4.5 border border-[#11120F]/30 hover:border-[#11120F] hover:bg-[#11120F]/05',
    secondaryDark: 'bg-transparent text-[#F2EFE6] px-8 py-4.5 border border-[#F2EFE6]/20 hover:border-[#F2EFE6] hover:bg-[#F2EFE6]/05',
    coral: 'bg-[#D85B46] text-[#F2EFE6] px-8 py-4.5 hover:bg-black border border-[#D85B46]',
    ghost: 'bg-transparent text-[#11120F] p-2 hover:text-[#D85B46]',
  };

  const selectedVariant = variantStyles[variant] || variantStyles.primary;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${selectedVariant} ${className}`}
      whileHover={shouldReduceMotion || disabled ? {} : { y: -2 }}
      whileTap={shouldReduceMotion || disabled ? {} : { scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {Icon && (
        <span className="relative z-10 inline-block transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5">
          <Icon className="w-4 h-4" />
        </span>
      )}
    </motion.button>
  );
}
