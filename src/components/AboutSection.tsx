import React from 'react';
import FiligreeDivider from './FiligreeDivider';
import { Shield, Sparkles, CheckCircle2, MapPin } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';

interface AboutSectionProps {
  onBookClick: () => void;
}

export default function AboutSection({ onBookClick }: AboutSectionProps) {
  return (
    <section id="about" className="relative py-24 bg-neutral-100 text-neutral-900 overflow-hidden">
      
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Official HD Studio Photo */}
          <div className="lg:col-span-6 relative">
            <div className="relative shadow-2xl overflow-hidden border-8 border-white bg-black group">
              <div className="aspect-[4/3] sm:aspect-[16/11] overflow-hidden">
                <img
                  src={STUDIO_INFO.interiorPhoto}
                  alt="Houndstooth Tattoo Official Las Vegas Studio Interior"
                  className="w-full h-full object-cover filter contrast-110 group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Verified Studio Tag Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-neutral-950/90 text-white p-4 backdrop-blur-sm flex items-center justify-between border-t border-neutral-800">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#00d2b2]" />
                  <span className="font-heading uppercase tracking-wider text-xs font-semibold">
                    Veteran-Owned & Operated
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono">
                  <MapPin className="w-3.5 h-3.5 text-[#00d2b2]" />
                  <span>4045 S Buffalo Dr, Las Vegas</span>
                </div>
              </div>
            </div>

            {/* Subtle offset grunge frame */}
            <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-neutral-300 -z-10 pointer-events-none hidden sm:block" />
          </div>

          {/* Right Column: Editorial Copy strictly matching reference hierarchy */}
          <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            
            <FiligreeDivider
              title="ABOUT HOUNDSTOOTH TATTOO STUDIO"
              subtitle="Veteran-Owned Custom Craft"
              light={true}
              className="lg:items-start lg:text-left"
            />

            <p className="text-neutral-700 text-base sm:text-lg leading-relaxed max-w-xl font-normal">
              Houndstooth Tattoo is a premier veteran-owned tattoo and piercing studio located at <strong>4045 S Buffalo Dr, Las Vegas</strong>. We are dedicated to creating custom tattoos that embody your individuality and personal journey. Alongside our verified resident artists, we bring unmatched precision, creativity, and hospital-grade sterility to every session.
            </p>

            <p className="text-neutral-600 text-sm sm:text-base leading-relaxed max-w-xl">
              From sacred geometry, intricate mandalas, and fine line to deep-contrast black & gray realism and custom script, each piece is engineered to fit your body’s natural contours. Your skin is our canvas — and every piece is crafted to endure.
            </p>

            {/* Key Quality Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2 w-full max-w-lg text-left">
              <div className="flex items-center gap-2.5 text-xs text-neutral-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#00a88f] shrink-0" />
                <span>100% Single-Use Sterile Cartridges</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-neutral-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#00a88f] shrink-0" />
                <span>Dedicated Custom Consultations</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-neutral-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#00a88f] shrink-0" />
                <span>Hospital-Grade Autoclave Sterilization</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs text-neutral-800 font-medium">
                <CheckCircle2 className="w-4 h-4 text-[#00a88f] shrink-0" />
                <span>Vegan & Premium Pigment Formulations</span>
              </div>
            </div>

            {/* Teal Appointment Button */}
            <div className="pt-2">
              <button
                onClick={onBookClick}
                className="px-8 py-3.5 bg-[#00a88f] hover:bg-[#008c77] text-white font-heading font-bold text-sm uppercase tracking-wider shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
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
