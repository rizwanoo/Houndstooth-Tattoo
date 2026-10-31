import React, { useState } from 'react';
import FiligreeDivider from './FiligreeDivider';
import { FAQ_ITEMS } from '../data/studioData';
import { ChevronDown } from 'lucide-react';

export default function FAQSection() {
  // Pre-expand question 0 by default
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (idx: number) => {
    setOpenIndices((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const leftColumnFaqs = FAQ_ITEMS.slice(0, 4);
  const rightColumnFaqs = FAQ_ITEMS.slice(4, 8);

  return (
    <section id="faq" className="relative py-28 sm:py-36 bg-[#080808] text-white overflow-hidden border-t border-neutral-900">
      
      {/* Background Dim Photo Overlay */}
      <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
        <img
          src="/assets/images/portfolio_04.jpg"
          alt="Studio atmosphere overlay"
          className="w-full h-full object-cover filter contrast-125 grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-radial from-transparent via-[#080808]/70 to-[#080808]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <FiligreeDivider
          title="FREQUENTLY ASKED QUESTIONS"
          subtitle="Consultation & Tattooing Details"
          className="mb-16 sm:mb-20"
        />

        {/* 2-Column Grid Layout with Generous Column Gap */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
          
          {/* Left Column (Items 1-4) */}
          <div className="space-y-5 sm:space-y-6">
            {leftColumnFaqs.map((item, localIdx) => {
              const globalIdx = localIdx;
              const isOpen = openIndices.includes(globalIdx);

              return (
                <div
                  key={globalIdx}
                  className="border border-neutral-800 bg-neutral-950/80 backdrop-blur-sm transition-all duration-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleIndex(globalIdx)}
                    className={`w-full p-5 sm:p-6 text-left font-heading font-bold text-sm sm:text-base uppercase tracking-wider flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                      isOpen
                        ? 'bg-[#00d2b2] text-neutral-950 shadow-sm'
                        : 'bg-neutral-900/60 text-white hover:text-[#00d2b2]'
                    }`}
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-neutral-950' : 'text-[#00d2b2]'
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="p-6 sm:p-8 text-neutral-300 text-sm sm:text-base leading-relaxed sm:leading-loose border-t border-neutral-800/80 bg-neutral-950/95 animate-in fade-in duration-200">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column (Items 5-8) */}
          <div className="space-y-5 sm:space-y-6">
            {rightColumnFaqs.map((item, localIdx) => {
              const globalIdx = localIdx + 4;
              const isOpen = openIndices.includes(globalIdx);

              return (
                <div
                  key={globalIdx}
                  className="border border-neutral-800 bg-neutral-950/80 backdrop-blur-sm transition-all duration-200 overflow-hidden"
                >
                  <button
                    onClick={() => toggleIndex(globalIdx)}
                    className={`w-full p-5 sm:p-6 text-left font-heading font-bold text-sm sm:text-base uppercase tracking-wider flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                      isOpen
                        ? 'bg-[#00d2b2] text-neutral-950 shadow-sm'
                        : 'bg-neutral-900/60 text-white hover:text-[#00d2b2]'
                    }`}
                  >
                    <span>{item.question}</span>
                    <ChevronDown
                      className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-neutral-950' : 'text-[#00d2b2]'
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="p-6 sm:p-8 text-neutral-300 text-sm sm:text-base leading-relaxed sm:leading-loose border-t border-neutral-800/80 bg-neutral-950/95 animate-in fade-in duration-200">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
