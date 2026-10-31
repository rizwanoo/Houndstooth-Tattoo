import React from 'react';
import FiligreeDivider from './FiligreeDivider';
import { Shield, CheckCircle2, MapPin, Award } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';

interface AboutSectionProps {
  onBookClick: () => void;
}

export default function AboutSection({ onBookClick }: AboutSectionProps) {
  return (
    <section id="about" className="relative py-28 sm:py-36 bg-neutral-100 text-neutral-900 overflow-hidden">
      
      {/* Top Ripped Paper / Splatter Grunge SVG Edge */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none z-20 pointer-events-none transform -translate-y-1">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 sm:h-16 text-[#080808] fill-current"
        >
          <path d="M0,0 L600,0 L1200,0 L1200,60 Q1100,20 1000,70 T800,40 T600,80 T400,30 T200,65 T0,40 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 items-center">
          
          {/* Left Column: Official Shop Photograph with Roomy Framing */}
          <div className="lg:col-span-6 relative">
            <div className="relative shadow-2xl overflow-hidden border-8 border-white bg-black group">
              <div className="aspect-[4/5] sm:aspect-[4/5] max-h-[580px] overflow-hidden">
                <img
                  src={STUDIO_INFO.interiorPhoto}
                  alt="Ralph Con Tattoo Shop in London Ontario"
                  className="w-full h-full object-cover filter contrast-105 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Official Shop Tag Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-neutral-950/90 text-white p-5 backdrop-blur-sm flex items-center justify-between border-t border-neutral-800">
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-[#00d2b2]" />
                  <span className="font-heading uppercase tracking-wider text-xs font-semibold">
                    Ralph Con Tattoo Studio
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-[#00d2b2]" />
                  <span>London, ON, Canada</span>
                </div>
              </div>
            </div>

            {/* Offset decorative frame */}
            <div className="absolute -bottom-5 -right-5 w-full h-full border-2 border-neutral-300 -z-10 pointer-events-none hidden sm:block" />
          </div>

          {/* Right Column: Editorial Copy with Generous Breathing Room */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            
            <FiligreeDivider
              title="ABOUT RALPH CON"
              subtitle="Tattoo Artist Since 2005"
              light={true}
              className="lg:items-start lg:text-left mb-2"
            />

            <p className="text-neutral-800 text-base sm:text-lg lg:text-xl leading-relaxed sm:leading-loose max-w-xl font-normal">
              <strong>Ralph Con</strong> is a master tattoo artist based in <strong>London, Ontario, Canada</strong>, with professional tattooing experience dating back to 2005. Dedicated to creating bespoke body art that lives beneath the skin, Ralph combines technical precision with a distinct artistic vision.
            </p>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed sm:leading-loose max-w-xl">
              Specializing in <strong>Realism, Black & Grey, Dark Side, and Ornamental</strong> tattoo artistry, every piece is custom designed to flow seamlessly with your body's natural anatomy and endure with time.
            </p>

            {/* Key Quality Pillars with Spacious Gaps */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 pt-3 w-full max-w-lg text-left">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#00a88f] shrink-0" />
                <span>Custom Realism & Dark Artistry</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#00a88f] shrink-0" />
                <span>Ornamental & Black & Grey Flow</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#00a88f] shrink-0" />
                <span>Hospital-Grade Sterility Standards</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#00a88f] shrink-0" />
                <span>London, Ontario Private Studio</span>
              </div>
            </div>

            {/* Appointment CTA with Generous Padding */}
            <div className="pt-4">
              <button
                onClick={onBookClick}
                className="px-9 py-4 bg-[#00a88f] hover:bg-[#008c77] text-white font-heading font-bold text-sm uppercase tracking-widest shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
              >
                Book an Appointment
              </button>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Ripped Edge Divider back into Dark Mode */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none z-20 pointer-events-none transform translate-y-1">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-12 sm:h-16 text-[#080808] fill-current rotate-180"
        >
          <path d="M0,0 L600,0 L1200,0 L1200,60 Q1100,20 1000,70 T800,40 T600,80 T400,30 T200,65 T0,40 Z" />
        </svg>
      </div>

    </section>
  );
}
