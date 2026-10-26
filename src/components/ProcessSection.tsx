import React from 'react';
import FiligreeDivider from './FiligreeDivider';
import { Sparkles, Calendar, HeartHandshake, ShieldCheck } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';

interface ProcessSectionProps {
  onBookClick: () => void;
}

export default function ProcessSection({ onBookClick }: ProcessSectionProps) {
  const steps = [
    {
      num: "01",
      title: "Share Your Idea",
      desc: "Send your design concept, size, reference images, and desired placement via our booking form or scheduled in-studio consultation.",
      icon: Sparkles,
    },
    {
      num: "02",
      title: "Secure Your Spot",
      desc: "Consult with your dedicated resident artist, finalize custom artwork mockups, and confirm your session time with a deposit.",
      icon: Calendar,
    },
    {
      num: "03",
      title: "Enjoy Your New Ink",
      desc: "Come in, relax in our hospital-grade sterile Las Vegas studio, and leave with museum-grade custom body art made to endure.",
      icon: HeartHandshake,
    },
  ];

  return (
    <section id="process" className="relative py-24 bg-[#0a0a0a] text-white overflow-hidden border-t border-b border-neutral-900">
      
      {/* Decorative filigree background aura */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-[#00d2b2]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Studio Photo in Signature Cyan/Teal Brush Frame */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-sm sm:max-w-md">
              <div className="teal-brush-frame bg-black shadow-2xl relative z-10">
                <div className="aspect-[4/5] overflow-hidden bg-neutral-950 relative">
                  <img
                    src={STUDIO_INFO.interiorPhoto}
                    alt="Houndstooth Tattoo Studio Interior Las Vegas"
                    className="w-full h-full object-cover filter contrast-115"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  <div className="absolute bottom-4 left-4 right-4 z-20">
                    <span className="text-[10px] font-heading uppercase tracking-widest text-[#00d2b2] font-semibold block">
                      Las Vegas Studio
                    </span>
                    <span className="font-heading text-base font-bold text-white uppercase block">
                      4045 S Buffalo Dr, Suite A109
                    </span>
                    <span className="text-xs text-neutral-300 block mt-0.5">
                      Private booths & hospital-grade hygiene
                    </span>
                  </div>
                </div>
              </div>

              {/* Background glow behind frame */}
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#00d2b2]/10 rounded-full blur-2xl pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Process Steps matching reference */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-8">
            
            <FiligreeDivider
              title="THE PROCESS"
              subtitle="Three Simple Steps"
              className="items-start text-left"
            />

            <div className="space-y-6 w-full max-w-xl">
              {steps.map((step) => {
                const IconComponent = step.icon;
                return (
                  <div
                    key={step.num}
                    className="flex items-start gap-5 p-5 bg-neutral-900/40 border border-neutral-800/80 hover:border-[#00d2b2]/40 transition-colors"
                  >
                    {/* Number block strictly matching reference cyan bordered box */}
                    <div className="w-12 h-12 shrink-0 border-2 border-[#00d2b2] text-[#00d2b2] flex items-center justify-center font-heading font-bold text-xl bg-[#00d2b2]/10 shadow-[0_0_10px_rgba(0,210,178,0.2)]">
                      {step.num}
                    </div>

                    <div className="space-y-1">
                      <h3 className="font-heading text-lg font-bold uppercase tracking-wider text-white">
                        {step.title}
                      </h3>
                      <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Teal Appointment CTA */}
            <div className="pt-2">
              <button
                onClick={onBookClick}
                className="px-8 py-3.5 bg-[#00d2b2] hover:bg-[#00e8c4] text-neutral-950 font-heading font-bold text-sm uppercase tracking-wider shadow-[0_0_20px_rgba(0,210,178,0.4)] hover:shadow-[0_0_28px_rgba(0,210,178,0.6)] transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
              >
                Book an Appointment
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
