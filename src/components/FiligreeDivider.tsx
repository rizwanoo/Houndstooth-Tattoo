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
      {/* Top ornamental crown */}
      <div className="flex items-center gap-3 opacity-90 mb-2">
        <svg width="60" height="12" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 6H24M24 6L28 2L32 6L28 10L24 6ZM32 6H56M56 6L60 2" stroke={strokeColor} strokeWidth="1.2" />
        </svg>
        <span className="w-1.5 h-1.5 rotate-45 bg-[#00d2b2]" />
        <svg width="60" height="12" viewBox="0 0 60 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M60 6H36M36 6L32 2L28 6L32 10L36 6ZM28 6H4M4 6L0 2" stroke={strokeColor} strokeWidth="1.2" />
        </svg>
      </div>

      {subtitle && (
        <span className="font-script text-2xl text-[#00d2b2] tracking-wider mb-1">
          {subtitle}
        </span>
      )}

      {title && (
        <h2 className={`font-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-wider uppercase ${textColor}`}>
          {title}
        </h2>
      )}

      {/* Bottom ornamental flourish */}
      <div className="flex items-center gap-3 opacity-90 mt-2">
        <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#00d2b2] to-transparent" />
        <span className="w-1.5 h-1.5 rotate-45 border border-[#00d2b2]" />
        <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent via-[#00d2b2] to-transparent" />
      </div>
    </div>
  );
}
