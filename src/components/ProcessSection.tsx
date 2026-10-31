import React from 'react';
import FiligreeDivider from './FiligreeDivider';
import { Sparkles, Calendar, HeartHandshake } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';

interface ProcessSectionProps {
  onBookClick: () => void;
}

export default function ProcessSection({ onBookClick }: ProcessSectionProps) {
  const steps = [
    {
      num: "01",
      title: "Share Your Concept",
      desc: "Send your design idea, placement preference, approximate size, and reference photos via our online booking form or direct email.",
      icon: Sparkles,
    },
    {
      num: "02",
      title: "Consultation & Deposit",
      desc: "Discuss your custom design directly with Ralph Con, review custom mockups, and secure your session date in London, Ontario.",
      icon: Calendar,
    },
    {
      num: "03",
      title: "Wear Art That Endures",
      desc: "Experience a private, sterile session and leave with museum-grade body art engineered to live beneath the skin.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="process" className="relative py-28 sm:py-36 bg-[#0a0a0a] text-white overflow-hidden border-t border-b border-neutral-900">
      
      {/* Decorative filigree background aura */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#00d2b2]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          
          {/* Left Column: Official Shop Photo in Cyan/Teal Brush Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              <div className="teal-brush-frame bg-black shadow-2xl relative z-10">
                <div className="aspect-[4/5] overflow-hidden bg-neutral-950 relative">
                  <img
                    src={STUDIO_INFO.interiorPhoto}
                    alt="Ralph Con Studio London Ontario"
                    className="w-full h-full object-cover filter contrast-115"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-5 left-5 right-5 z-20">
                    <span className="text-[10px] font-heading uppercase tracking-widest text-[#00d2b2] font-semibold block">
                      Ralph Con Studio
                    </span>
                    <span className="font-heading text-lg font-bold text-white uppercase block mt-0.5">
                      London, Ontario, Canada
                    </span>
                    <span className="text-xs text-neutral-400 font-mono block mt-1">
                      Private Atelier · Since 2005
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative accent behind */}
              <div className="absolute -top-4 -left-4 w-full h-full border border-neutral-800 -z-10 pointer-events-none hidden sm:block" />
            </div>
          </div>

          {/* Right Column: 3-Step Process with Generous Breathing Room */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            <FiligreeDivider
              title="THE PROCESS"
              subtitle="How We Work"
              className="lg:items-start lg:text-left mb-12 sm:mb-16"
            />

            <div className="space-y-8 sm:space-y-10">
              {steps.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={step.num}
                    className="flex flex-col sm:flex-row items-start gap-5 sm:gap-6 p-6 sm:p-7 bg-neutral-950/70 border border-neutral-850 hover:border-[#00d2b2]/50 transition-all duration-300 group"
                  >
                    {/* Step Number & Icon */}
                    <div className="flex items-center gap-3 sm:flex-col sm:items-center shrink-0">
                      <span className="font-heading text-3xl sm:text-4xl font-bold text-[#00d2b2] group-hover:scale-105 transition-transform">
                        {step.num}
                      </span>
                      <div className="w-10 h-10 rounded-none bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#00d2b2] shrink-0">
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Step Content */}
                    <div className="flex-1">
                      <h4 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-white group-hover:text-[#00d2b2] transition-colors leading-snug">
                        {step.title}
                      </h4>
                      <p className="mt-2.5 text-neutral-300 text-sm sm:text-base leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Consultation Button */}
            <div className="mt-12 sm:mt-14 pt-4">
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto px-10 py-4 bg-[#00d2b2] hover:bg-[#00e8c4] text-neutral-950 font-heading font-bold text-sm uppercase tracking-widest shadow-[0_0_20px_rgba(0,210,178,0.4)] hover:shadow-[0_0_25px_rgba(0,210,178,0.7)] transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer text-center"
              >
                Start Your Consultation
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
