import React from 'react';
import { STUDIO_INFO } from '../data/studioData';
import { Instagram, MapPin, Shield, AtSign, Mail } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: 'home' | 'artists' | 'portfolio' | 'booking', sectionId?: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="relative bg-black text-white pt-20 pb-12 overflow-hidden border-t border-neutral-900">
      
      {/* Top Ink Splatter Transition */}
      <div className="absolute top-0 left-0 right-0 overflow-hidden leading-none z-20 pointer-events-none transform -translate-y-1">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-full h-8 text-[#080808] fill-current"
        >
          <path d="M0,0 L600,0 L1200,0 L1200,40 Q1100,10 1000,50 T800,20 T600,60 T400,20 T200,50 T0,30 Z" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
        
        {/* Centered Ralph Con Logo Emblem */}
        <button
          onClick={() => onNavigate('home')}
          className="group focus:outline-none mb-6 flex flex-col items-center cursor-pointer"
        >
          <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#00d2b2] p-1 shadow-[0_0_20px_rgba(0,210,178,0.3)] group-hover:scale-105 transition-all duration-300 bg-black">
            <img
              src={STUDIO_INFO.logo}
              alt="Ralph Con Official Logo"
              className="w-full h-full object-cover filter contrast-110 rounded-full"
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="font-heading text-2xl font-bold tracking-wider uppercase mt-3 text-white group-hover:text-[#00d2b2] transition-colors">
            Ralph Con
          </span>
          <span className="text-xs uppercase tracking-widest text-[#00d2b2] font-medium">
            London, Ontario, Canada
          </span>
        </button>

        {/* Primary Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-heading uppercase tracking-widest text-neutral-400 mb-8">
          <button
            onClick={() => onNavigate('home')}
            className="hover:text-[#00d2b2] transition-colors cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => onNavigate('home', 'about')}
            className="hover:text-[#00d2b2] transition-colors cursor-pointer"
          >
            About
          </button>
          <button
            onClick={() => onNavigate('portfolio')}
            className="hover:text-[#00d2b2] transition-colors cursor-pointer"
          >
            Portfolio
          </button>
          <button
            onClick={() => onNavigate('artists')}
            className="hover:text-[#00d2b2] transition-colors cursor-pointer"
          >
            Artist Profile
          </button>
          <button
            onClick={() => onNavigate('home', 'process')}
            className="hover:text-[#00d2b2] transition-colors cursor-pointer"
          >
            The Process
          </button>
          <button
            onClick={() => onNavigate('home', 'faq')}
            className="hover:text-[#00d2b2] transition-colors cursor-pointer"
          >
            FAQ
          </button>
          <button
            onClick={() => onNavigate('booking')}
            className="text-[#00d2b2] font-semibold hover:text-white transition-colors cursor-pointer"
          >
            Book Appointment
          </button>
        </nav>

        {/* Location, Email & Social Connections */}
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8 text-xs text-neutral-400 mb-8">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-[#00d2b2]" />
            <span>London, Ontario, Canada</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-[#00d2b2]" />
            <a href="mailto:Ralphcon.2020@gmail.com" className="hover:text-[#00d2b2] transition-colors">
              Ralphcon.2020@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/ralcontattoo/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-[#00d2b2] transition-colors"
            >
              <Instagram className="w-4 h-4 text-[#00d2b2]" />
              <span>@ralcontattoo</span>
            </a>
            <a
              href="https://www.threads.com/@ralcontattoo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-[#00d2b2] transition-colors"
            >
              <AtSign className="w-4 h-4 text-[#00d2b2]" />
              <span>Threads</span>
            </a>
          </div>
        </div>

        {/* Bottom Copyright & Trust Line */}
        <div className="pt-8 border-t border-neutral-900 w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-400 gap-3">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-[#00d2b2]" />
            <span>Tattoo Artist Since 2005 · Realism, Black & Grey, Dark Side & Ornamental</span>
          </div>
          <div>
            © {new Date().getFullYear()} Ralph Con. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
