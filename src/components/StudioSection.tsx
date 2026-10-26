import React from 'react';
import FiligreeDivider from './FiligreeDivider';
import { STUDIO_INFO } from '../data/studioData';
import { MapPin, ShieldCheck, Sparkles, Clock, Compass, ExternalLink } from 'lucide-react';

export default function StudioSection() {
  return (
    <section className="relative py-24 bg-[#0a0a0a] text-white overflow-hidden border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <FiligreeDivider
          title="THE LAS VEGAS STUDIO"
          subtitle="Sanctuary of Ink & Precision"
          className="mb-14"
        />

        {/* Large Atmosphere Showcase */}
        <div className="relative shadow-2xl border border-neutral-800 bg-neutral-950 overflow-hidden mb-12 group">
          <div className="aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
            <img
              src={STUDIO_INFO.interiorPhoto}
              alt="Houndstooth Tattoo Studio Atmosphere in Las Vegas"
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 filter contrast-110"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

          {/* Bottom Banner inside Image */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 right-4 sm:right-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#00d2b2] font-heading font-semibold block">
                Official Studio Floor
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
                4045 S Buffalo Dr, Suite A109 · Las Vegas, NV
              </h3>
              <p className="text-xs text-neutral-300 max-w-lg mt-1 hidden sm:block">
                Custom tattoo stations, "Muse For The Soul" neon installation, private consultation booths, and sterile preparation bays.
              </p>
            </div>

            <a
              href={STUDIO_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-neutral-900/90 hover:bg-[#00d2b2] hover:text-neutral-950 text-white text-xs font-heading uppercase tracking-wider border border-neutral-700 hover:border-[#00d2b2] transition-colors inline-flex items-center gap-1.5 shrink-0"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Get Directions</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Studio Protocol Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-6 bg-neutral-900/40 border border-neutral-800 space-y-2">
            <div className="w-9 h-9 border border-[#00d2b2]/40 text-[#00d2b2] flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="font-heading text-base font-bold uppercase tracking-wider text-white">
              Hospital-Grade Hygiene
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Medical-grade autoclave sterilization, barrier wrapped stations, and 100% disposable single-use cartridges.
            </p>
          </div>

          <div className="p-6 bg-neutral-900/40 border border-neutral-800 space-y-2">
            <div className="w-9 h-9 border border-[#00d2b2]/40 text-[#00d2b2] flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-heading text-base font-bold uppercase tracking-wider text-white">
              Vegan & Pure Inks
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              We exclusively utilize high-pigment, cruelty-free vegan ink formulations engineered for crisp lines and long-term vibrancy.
            </p>
          </div>

          <div className="p-6 bg-neutral-900/40 border border-neutral-800 space-y-2">
            <div className="w-9 h-9 border border-[#00d2b2]/40 text-[#00d2b2] flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-heading text-base font-bold uppercase tracking-wider text-white">
              Walk-Ins & Appointments
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Tuesday through Saturday from 12:00 PM to 8:00 PM. Same-day walk-ins accommodated based on resident artist availability.
            </p>
          </div>

          <div className="p-6 bg-neutral-900/40 border border-neutral-800 space-y-2">
            <div className="w-9 h-9 border border-[#00d2b2]/40 text-[#00d2b2] flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-heading text-base font-bold uppercase tracking-wider text-white">
              South Buffalo Drive
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Convenient Las Vegas location with dedicated free plaza parking, spacious waiting lounge, and private rooms upon request.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
