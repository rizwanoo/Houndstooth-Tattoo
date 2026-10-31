import React from 'react';
import FiligreeDivider from './FiligreeDivider';
import { STUDIO_INFO } from '../data/studioData';
import { MapPin, ShieldCheck, Sparkles, Clock, Compass, ExternalLink } from 'lucide-react';

export default function StudioSection() {
  return (
    <section className="relative py-24 bg-[#0a0a0a] text-white overflow-hidden border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <FiligreeDivider
          title="THE STUDIO"
          subtitle="London, Ontario · Tattoo Artist Since 2005"
          className="mb-14"
        />

        {/* Studio Photo Showcase */}
        <div className="relative shadow-2xl border border-neutral-800 bg-neutral-950 overflow-hidden mb-12 group">
          <div className="aspect-[16/9] sm:aspect-[21/9] w-full max-h-[500px] overflow-hidden">
            <img
              src={STUDIO_INFO.interiorPhoto}
              alt="Ralph Con Studio London Ontario"
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700 filter contrast-110"
              referrerPolicy="no-referrer"
            />
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none" />

          {/* Bottom Banner inside Image */}
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-8 right-4 sm:right-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#00d2b2] font-heading font-semibold block">
                Official Studio Space
              </span>
              <h3 className="font-heading text-xl sm:text-2xl font-bold uppercase tracking-wider text-white">
                Ralph Con Tattoo · London, Ontario, Canada
              </h3>
              <p className="text-xs text-neutral-300 max-w-lg mt-1 hidden sm:block">
                Dedicated private space designed for focused custom artistry, sterile preparation, and high-end client comfort.
              </p>
            </div>

            <a
              href={STUDIO_INFO.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-neutral-900/90 hover:bg-[#00d2b2] hover:text-neutral-950 text-white text-xs font-heading uppercase tracking-wider border border-neutral-700 hover:border-[#00d2b2] transition-colors inline-flex items-center gap-1.5 shrink-0"
            >
              <Compass className="w-3.5 h-3.5" />
              <span>London, ON Map</span>
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
              Medical-grade autoclave sterilization, barrier-wrapped equipment, and 100% disposable single-use needle cartridges.
            </p>
          </div>

          <div className="p-6 bg-neutral-900/40 border border-neutral-800 space-y-2">
            <div className="w-9 h-9 border border-[#00d2b2]/40 text-[#00d2b2] flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="font-heading text-base font-bold uppercase tracking-wider text-white">
              Bespoke Custom Art
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Every design is custom created for the individual client, specializing in Realism, Black & Grey, Dark Side, and Ornamental flow.
            </p>
          </div>

          <div className="p-6 bg-neutral-900/40 border border-neutral-800 space-y-2">
            <div className="w-9 h-9 border border-[#00d2b2]/40 text-[#00d2b2] flex items-center justify-center mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="font-heading text-base font-bold uppercase tracking-wider text-white">
              Artist Since 2005
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Over two decades of professional experience delivering precise linework, smooth shading, and long-lasting body art.
            </p>
          </div>

          <div className="p-6 bg-neutral-900/40 border border-neutral-800 space-y-2">
            <div className="w-9 h-9 border border-[#00d2b2]/40 text-[#00d2b2] flex items-center justify-center mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <h4 className="font-heading text-base font-bold uppercase tracking-wider text-white">
              London, Ontario
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Convenient private studio setting in London, Ontario. Sessions arranged by appointment and advance consultation.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
