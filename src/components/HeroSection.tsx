import React, { useRef, useState } from 'react';
import { STUDIO_INFO } from '../data/studioData';
import { Volume2, VolumeX, Shield, Star, MapPin } from 'lucide-react';

interface HeroSectionProps {
  onBookClick: () => void;
  onPortfolioClick: () => void;
}

export default function HeroSection({
  onBookClick,
  onPortfolioClick,
}: HeroSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const toggleSound = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black pt-24 sm:pt-28 pb-16">
      
      {/* Cinematic Full-Bleed Video Background extending from the top edge behind Navbar */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          poster="/assets/images/studio_interior_1.jpg"
          onCanPlay={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover filter brightness-115 contrast-110 transition-opacity duration-700 ${
            videoLoaded ? 'opacity-90 scale-102' : 'opacity-60'
          }`}
        >
          <source src="/assets/video/hero_new.mp4" type="video/mp4" />
          <source src={STUDIO_INFO.heroVideo} type="video/mp4" />
        </video>

        {/* Luminous scrim ensuring video brightness while keeping text readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-black/25 to-black/45 pointer-events-none" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/15 to-black/55 pointer-events-none" />
        <div className="absolute inset-0 bg-noise opacity-15 pointer-events-none" />
      </div>

      {/* Main Centered Content Container (Logo removed from center per user request) */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center flex flex-col items-center">
        
        {/* Arched Script Badge Ribbon */}
        <div className="inline-flex items-center justify-center gap-3 mb-4 animate-in fade-in duration-500">
          <span className="h-[1px] w-8 sm:w-16 bg-[#00d2b2]" />
          <span className="font-script text-3xl sm:text-4xl md:text-5xl text-[#00d2b2] drop-shadow-[0_2px_12px_rgba(0,210,178,0.7)]">
            Custom Tattoo & Piercing
          </span>
          <span className="h-[1px] w-8 sm:w-16 bg-[#00d2b2]" />
        </div>

        {/* Giant Condensed Headline (Unobstructed, prominent display) */}
        <h1 className="font-heading font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-white uppercase leading-[0.88] drop-shadow-[0_4px_30px_rgba(0,0,0,0.9)] max-w-4xl mx-auto text-balance">
          Ink That Tells <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-100 to-[#00d2b2]">
            Your Story
          </span>
        </h1>

        {/* Studio Subtitle */}
        <p className="mt-6 text-neutral-200 text-sm sm:text-base md:text-lg max-w-2xl font-normal leading-relaxed drop-shadow-md">
          Veteran-owned custom tattoo and piercing studio proudly based in Las Vegas, Nevada.
          Bespoke black & grey realism, sacred geometry, fine line, and hospital-grade sterile piercing crafted for longevity.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 w-full sm:w-auto">
          <button
            onClick={onBookClick}
            className="w-full sm:w-auto px-9 py-4 bg-[#00d2b2] hover:bg-[#00e8c4] text-neutral-950 font-heading font-bold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(0,210,178,0.55)] hover:shadow-[0_0_35px_rgba(0,210,178,0.8)] transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer text-center"
          >
            Book an Appointment
          </button>
          <button
            onClick={onPortfolioClick}
            className="w-full sm:w-auto px-9 py-4 bg-black/75 hover:bg-neutral-900 text-white font-heading font-semibold text-sm uppercase tracking-wider border border-neutral-600 hover:border-[#00d2b2] backdrop-blur-sm transition-all duration-200 cursor-pointer text-center"
          >
            View Portfolio
          </button>
        </div>

        {/* Studio Trust Markers Strip */}
        <div className="mt-12 pt-6 border-t border-neutral-700/60 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm text-neutral-200 font-medium drop-shadow">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#00d2b2] shrink-0" />
            <span>Veteran-Owned & Operated</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#00d2b2] shrink-0" />
            <span>4045 S Buffalo Dr, Las Vegas NV</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-[#00d2b2] fill-[#00d2b2] shrink-0" />
            <span>5.0 Star Rated Studio</span>
          </div>
        </div>

      </div>

      {/* Floating sound toggle for hero video */}
      <button
        onClick={toggleSound}
        className="absolute bottom-6 right-6 z-20 p-3 bg-black/70 hover:bg-black/95 border border-neutral-600 hover:border-[#00d2b2] text-neutral-200 hover:text-[#00d2b2] transition-all rounded-full backdrop-blur-md shadow-lg"
        aria-label={isMuted ? "Unmute video atmosphere" : "Mute video atmosphere"}
        title={isMuted ? "Unmute video atmosphere" : "Mute video atmosphere"}
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#00d2b2]" />}
      </button>

      {/* Ripped bottom edge divider leading into About Section */}
      <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#080808] to-transparent pointer-events-none z-10" />
    </section>
  );
}
