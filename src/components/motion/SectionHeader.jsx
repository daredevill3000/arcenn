import React from 'react';
import Reveal from './Reveal';
import LineReveal from './LineReveal';

export default function SectionHeader({
  number = '01',
  label = 'SECTION',
  title = '',
  subtitle = '',
  theme = 'light', // 'light' or 'dark'
  className = 'mb-16 sm:mb-20',
  meta = '',
  children,
}) {
  const isDark = theme === 'dark';

  return (
    <div className={`w-full ${className}`}>
      {/* Top Metadata & Number Label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <Reveal direction="down" distance={12} duration={0.5}>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#D85B46] animate-coral-dot inline-block shrink-0" />
            <span className="font-mono text-xs uppercase tracking-widest text-[#D85B46] font-semibold">
              {number} / {label}
            </span>
            {meta && (
              <>
                <span className={`text-xs ${isDark ? 'text-[#9E9D95]' : 'text-[#77766F]'}`}>•</span>
                <span className={`font-mono text-[11px] uppercase tracking-wider ${isDark ? 'text-[#9E9D95]' : 'text-[#77766F]'}`}>
                  {meta}
                </span>
              </>
            )}
          </div>
        </Reveal>

        <Reveal direction="left" distance={12} duration={0.5} delay={0.1}>
          <span className={`font-mono text-[10px] uppercase tracking-widest hidden sm:inline ${
            isDark ? 'text-[#9E9D95]/80' : 'text-[#77766F]/80'
          }`}>
            ARCEN SYSTEM // REF. {number}
          </span>
        </Reveal>
      </div>

      {/* Growing Horizontal Line (0% to 100%) */}
      <div className="mb-8">
        <LineReveal
          className={`h-[1px] ${isDark ? 'bg-[#F2EFE6]/15' : 'bg-[#11120F]/14'}`}
          duration={0.9}
        />
      </div>

      {/* Main Title & Subtitle Flex Row */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8">
        {title && (
          <Reveal direction="up" distance={20} duration={0.7} delay={0.15}>
            <h2 className={`font-display font-bold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-tight ${
              isDark ? 'text-[#F2EFE6]' : 'text-[#11120F]'
            }`}>
              {title}
            </h2>
          </Reveal>
        )}

        {subtitle && (
          <Reveal direction="up" distance={16} duration={0.7} delay={0.25}>
            <p className={`text-base sm:text-lg max-w-md font-normal leading-relaxed ${
              isDark ? 'text-[#9E9D95]' : 'text-[#77766F]'
            }`}>
              {subtitle}
            </p>
          </Reveal>
        )}

        {children}
      </div>
    </div>
  );
}
