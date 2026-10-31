import React from 'react';

interface FiligreeDividerProps {
  title?: string;
  subtitle?: string;
  className?: string;
  light?: boolean;
}

export default function FiligreeDivider({
  title,
  subtitle,
  className = "",
  light = false,
}: FiligreeDividerProps) {
  const strokeColor = light ? "#1a1a1a" : "#00d2b2";
  const textColor = light ? "text-neutral-900" : "text-white";

  return (
    <div className={`flex flex-col items-center justify-center text-center ${className}`}>
      {/* Top ornamental crown with generous breathing room */}
      <div className="flex items-center gap-3 opacity-90 mb-3 sm:mb-4">
        <svg width="60" height="12" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 6H24M24 6L28 2L32 6L28 10L24 6ZM32 6H56M56 6L60 2" stroke={strokeColor} strokeWidth="1.2" />
        </svg>
        <span className="w-1.5 h-1.5 rotate-45 bg-[#00d2b2]" />
        <svg width="60" height="12" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 6H36M36 6L32 2L28 6L32 10L36 6ZM28 6H4M4 6L0 2" stroke={strokeColor} strokeWidth="1.2" />
        </svg>
      </div>

      {subtitle && (
        <span className="font-script text-2xl sm:text-3xl md:text-4xl text-[#00d2b2] tracking-wider mb-2.5 sm:mb-3 drop-shadow-sm">
          {subtitle}
        </span>
      )}

      {title && (
        <h2 className={`font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-wider sm:tracking-widest uppercase max-w-4xl mx-auto leading-tight ${textColor}`}>
          {title}
        </h2>
      )}

      {/* Bottom ornamental flourish with intentional editorial spacing */}
      <div className="flex items-center gap-3 opacity-90 mt-4 sm:mt-5">
        <div className="h-[1px] w-14 sm:w-24 bg-gradient-to-r from-transparent via-[#00d2b2] to-transparent" />
        <span className="w-1.5 h-1.5 rotate-45 border border-[#00d2b2]" />
        <div className="h-[1px] w-14 sm:w-24 bg-gradient-to-r from-transparent via-[#00d2b2] to-transparent" />
      </div>
    </div>
  );
}
