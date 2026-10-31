import React, { useState } from 'react';
import { STUDIO_INFO } from '../data/studioData';
import { Shield, Star, MapPin, Image as ImageIcon } from 'lucide-react';

interface HeroSectionProps {
  onBookClick: () => void;
  onPortfolioClick: () => void;
}

export default function HeroSection({
  onBookClick,
  onPortfolioClick,
}: HeroSectionProps) {
  // Option to toggle between the 2 high-resolution photos
  const [activeBg, setActiveBg] = useState<'realism' | 'atelier'>('realism');
  const [imageLoaded, setImageLoaded] = useState(false);

  const heroImageSrc =
    activeBg === 'realism'
      ? STUDIO_INFO.heroPhoto
      : STUDIO_INFO.heroPhotoAlt;

  return (
    <section className="relative min-h-[95vh] sm:min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#080808] pt-36 pb-28 sm:pt-44 sm:pb-36">
      {/* High-Resolution Static Photograph Background — Crisp, Bright & Luminous */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          key={heroImageSrc}
          src={heroImageSrc}
          alt={activeBg === 'realism' ? "Ralph Con Realism Tattoo Artistry" : "Ralph Con Custom Tattoo Atelier"}
          fetchPriority="high"
          loading="eager"
          decoding="async"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-center filter brightness-105 contrast-105 saturate-105 transition-all duration-1000 ease-out transform ${
            imageLoaded ? 'scale-100 opacity-95' : 'scale-105 opacity-0'
          }`}
        />

        {/* Minimal, soft lighting gradients — Keeps photograph bright & clearly visible while ensuring text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/20 to-black/40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/35 via-transparent to-black/35 pointer-events-none" />
      </div>

      {/* Main Centered Content Container with Generous Editorial Whitespace */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center">
        
        {/* Arched Script Badge Ribbon with Generous Vertical Space */}
        <div className="inline-flex items-center justify-center gap-4 mb-6 sm:mb-8 animate-in fade-in duration-500">
          <span className="h-[1px] w-10 sm:w-20 bg-[#00d2b2]" />
          <span className="font-script text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#00d2b2] drop-shadow-[0_2px_15px_rgba(0,210,178,0.7)]">
            Tattoo Artist Since 2005
          </span>
          <span className="h-[1px] w-10 sm:w-20 bg-[#00d2b2]" />
        </div>

        {/* Confident Headline with High-Impact Editorial Typographic Hierarchy */}
        <h1 className="font-heading font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white uppercase leading-[0.92] sm:leading-[0.88] drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)] max-w-4xl mx-auto text-balance">
          Art That Lives <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-[#00d2b2]">
            Beneath The Skin
          </span>
        </h1>

        {/* Supporting Text Block with Controlled Line Length & Generous Spacing */}
        <p className="mt-8 sm:mt-10 text-white sm:text-neutral-100 text-base sm:text-lg md:text-xl max-w-2xl mx-auto font-normal leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          Tattooing since 2005. Specializing in Realism, Black & Grey, Dark Side and Ornamental tattoo artistry in London, Ontario.
        </p>

        {/* Action Buttons with Editorial Spacing & Proportions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6 mt-10 sm:mt-12 w-full sm:w-auto">
          <button
            onClick={onBookClick}
            className="w-full sm:w-auto px-10 py-4.5 bg-[#00d2b2] hover:bg-[#00e8c4] text-neutral-950 font-heading font-bold text-sm uppercase tracking-widest shadow-[0_0_25px_rgba(0,210,178,0.6)] hover:shadow-[0_0_35px_rgba(0,210,178,0.85)] transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer text-center"
          >
            Book an Appointment
          </button>
          <button
            onClick={onPortfolioClick}
            className="w-full sm:w-auto px-10 py-4.5 bg-black/80 hover:bg-black text-white font-heading font-semibold text-sm uppercase tracking-widest border border-neutral-500 hover:border-[#00d2b2] backdrop-blur-md transition-all duration-200 cursor-pointer text-center"
          >
            View Portfolio
          </button>
        </div>

        {/* Studio Trust Markers Strip with Breathable Vertical Rhythm */}
        <div className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-white/20 flex flex-wrap items-center justify-center gap-8 sm:gap-14 text-xs sm:text-sm text-white font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
          <div className="flex items-center gap-2.5">
            <Shield className="w-4 h-4 text-[#00d2b2] shrink-0" />
            <span className="tracking-wide">Artist Since 2005</span>
          </div>
          <div className="flex items-center gap-2.5">
            <MapPin className="w-4 h-4 text-[#00d2b2] shrink-0" />
            <span className="tracking-wide">London, Ontario, Canada</span>
          </div>
          <div className="flex items-center gap-2.5">
            <Star className="w-4 h-4 text-[#00d2b2] fill-[#00d2b2] shrink-0" />
            <span className="tracking-wide">5.0 Star Rated Artistry</span>
          </div>
        </div>

      </div>

      {/* Wallpaper Switcher Pill (Realism Art / Studio Atelier) */}
      <div className="absolute bottom-6 left-6 z-20 hidden sm:flex items-center gap-1.5 p-1 bg-black/85 border border-neutral-700/80 rounded-none backdrop-blur-md shadow-2xl">
        <span className="text-[10px] uppercase font-mono text-neutral-300 px-2 flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-[#00d2b2]" />
          <span>Wallpaper:</span>
        </span>
        <button
          onClick={() => {
            setImageLoaded(false);
            setActiveBg('realism');
          }}
          className={`px-3 py-1 text-[10px] font-heading uppercase tracking-wider transition-colors cursor-pointer ${
            activeBg === 'realism'
              ? 'bg-[#00d2b2] text-neutral-950 font-bold'
              : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
          }`}
        >
          Realism Art
        </button>
        <button
          onClick={() => {
            setImageLoaded(false);
            setActiveBg('atelier');
          }}
          className={`px-3 py-1 text-[10px] font-heading uppercase tracking-wider transition-colors cursor-pointer ${
            activeBg === 'atelier'
              ? 'bg-[#00d2b2] text-neutral-950 font-bold'
              : 'text-neutral-300 hover:text-white hover:bg-neutral-900'
          }`}
        >
          Studio Atelier
        </button>
      </div>

      {/* Smooth bottom fade into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none z-10" />
    </section>
  );
}
