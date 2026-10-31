import React from 'react';
import FiligreeDivider from './FiligreeDivider';
import { STUDIO_INFO } from '../data/studioData';
import { MapPin, ShieldCheck, Sparkles, Clock, Compass, ExternalLink } from 'lucide-react';

export default function StudioSection() {
  return (
    <section className="relative py-28 sm:py-36 bg-[#0a0a0a] text-white overflow-hidden border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <FiligreeDivider
          title="THE STUDIO"
          subtitle="London, Ontario · Tattoo Artist Since 2005"
          className="mb-16 sm:mb-20"
        />

        {/* Studio Photo Showcase with Generous Framing */}
        <div className="relative shadow-2xl border border-neutral-800 bg-neutral-950 overflow-hidden mb-16 sm:mb-20 group">
          <div className="aspect-[16/9] sm:aspect-[21/9] w-full max-h-[520px] overflow-hidden">
            <img
              src={STUDIO_INFO.interiorPhoto}
              alt="Ralph Con Studio London Ontario"
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 filter contrast-110"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent pointer-events-none" />

          {/* Bottom Banner inside Image with Spacious Padding */}
          <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-10 right-6 sm:right-10 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#00d2b2] font-heading font-semibold block">
                Official Studio Space
              </span>
              <h3 className="font-heading text-xl sm:text-2xl md:text-3xl font-bold uppercase tracking-wider text-white mt-1">
                Ralph Con Tattoo · London, Ontario, Canada
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 max-w-xl mt-2 hidden sm:block leading-relaxed">
                Dedicated private space designed for focused custom artistry, sterile preparation, and high-end client comfort.
              </p>
            </div>

            <a
              href="https://maps.google.com/?q=London+Ontario+Canada"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-neutral-900/90 hover:bg-[#00d2b2] hover:text-neutral-950 text-white border border-neutral-700 text-xs font-heading font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5 shrink-0"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>London, ON Map</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* 3 Studio Highlights with Generous Grid Spacing */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10">
          
          <div className="p-8 sm:p-10 bg-neutral-950/80 border border-neutral-800/80 hover:border-[#00d2b2]/50 transition-all duration-300">
            <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#00d2b2] mb-6">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-white mb-3">
              Sterile Standards
            </h4>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed sm:leading-loose">
              Hospital-grade autoclave sterilization, 100% single-use medical needles, and top-tier clinical sanitation protocols for every single session.
            </p>
          </div>

          <div className="p-8 sm:p-10 bg-neutral-950/80 border border-neutral-800/80 hover:border-[#00d2b2]/50 transition-all duration-300">
            <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#00d2b2] mb-6">
              <Sparkles className="w-6 h-6" />
            </div>
            <h4 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-white mb-3">
              Private Custom Atelier
            </h4>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed sm:leading-loose">
              By appointment only. You receive dedicated, undivided attention from Ralph Con with zero distractions in an inspiring private studio environment.
            </p>
          </div>

          <div className="p-8 sm:p-10 bg-neutral-950/80 border border-neutral-800/80 hover:border-[#00d2b2]/50 transition-all duration-300">
            <div className="w-12 h-12 bg-neutral-900 border border-neutral-800 flex items-center justify-center text-[#00d2b2] mb-6">
              <Clock className="w-6 h-6" />
            </div>
            <h4 className="font-heading text-lg sm:text-xl font-bold uppercase tracking-wider text-white mb-3">
              20+ Years Mastery
            </h4>
            <p className="text-neutral-300 text-sm sm:text-base leading-relaxed sm:leading-loose">
              Tattooing continuously since 2005. Decades of refined hand technique, needle depth control, and specialized pigment saturation knowledge.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
