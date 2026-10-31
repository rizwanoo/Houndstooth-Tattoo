import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, MapPin } from 'lucide-react';
import { STUDIO_INFO } from '../data/studioData';

interface NavbarProps {
  currentPage: 'home' | 'artists' | 'portfolio' | 'booking';
  setCurrentPage: (page: 'home' | 'artists' | 'portfolio' | 'booking') => void;
  onNavigateSection?: (sectionId: string) => void;
}

export default function Navbar({
  currentPage,
  setCurrentPage,
  onNavigateSection,
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: 'home' | 'artists' | 'portfolio' | 'booking', sectionId?: string) => {
    setMobileMenuOpen(false);
    if (page === 'home' && sectionId) {
      if (currentPage !== 'home') {
        setCurrentPage('home');
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#080808]/95 backdrop-blur-md border-b border-neutral-800/80 shadow-2xl py-2.5'
          : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left Navigation Zone */}
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-heading">
            <button
              onClick={() => handleNavClick('home')}
              className={`transition-colors hover:text-[#00d2b2] ${
                currentPage === 'home' ? 'text-[#00d2b2] font-semibold' : 'text-neutral-300'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('home', 'about')}
              className="text-neutral-300 hover:text-[#00d2b2] transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              onClick={() => handleNavClick('portfolio')}
              className={`transition-colors hover:text-[#00d2b2] ${
                currentPage === 'portfolio' ? 'text-[#00d2b2] font-semibold' : 'text-neutral-300'
              }`}
            >
              Portfolio
            </button>
          </nav>

          {/* Center Brand Zone: Official Ralph Con Logo Emblem */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 group focus:outline-none cursor-pointer"
            aria-label="Ralph Con Tattoo Home"
          >
            <div className="relative w-11 h-11 sm:w-13 sm:h-13 rounded-full overflow-hidden border-2 border-[#00d2b2]/80 shadow-[0_0_15px_rgba(0,210,178,0.3)] group-hover:border-[#00d2b2] group-hover:scale-105 transition-all duration-300 bg-black">
              <img
                src={STUDIO_INFO.logo}
                alt="Ralph Con Logo"
                className="w-full h-full object-cover filter contrast-110"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-heading text-lg sm:text-xl font-bold tracking-wider text-white uppercase group-hover:text-[#00d2b2] transition-colors leading-tight">
                Ralph Con
              </span>
              <span className="text-[10px] uppercase tracking-widest text-[#00d2b2] font-medium leading-none">
                Tattoo · London, ON
              </span>
            </div>
          </button>

          {/* Right Navigation Zone */}
          <div className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-heading">
            <button
              onClick={() => handleNavClick('home', 'process')}
              className="text-neutral-300 hover:text-[#00d2b2] transition-colors cursor-pointer"
            >
              The Process
            </button>
            <button
              onClick={() => handleNavClick('artists')}
              className={`transition-colors hover:text-[#00d2b2] ${
                currentPage === 'artists' ? 'text-[#00d2b2] font-semibold' : 'text-neutral-300'
              }`}
            >
              Artist Bio
            </button>
            <button
              onClick={() => handleNavClick('home', 'faq')}
              className="text-neutral-300 hover:text-[#00d2b2] transition-colors cursor-pointer"
            >
              FAQ
            </button>
            
            {/* Primary Action Button */}
            <button
              onClick={() => handleNavClick('booking')}
              className="px-5 py-2.5 bg-[#00d2b2] hover:bg-[#00e8c4] text-neutral-950 font-heading font-bold text-xs uppercase tracking-wider rounded-none shadow-[0_0_15px_rgba(0,210,178,0.4)] hover:shadow-[0_0_20px_rgba(0,210,178,0.6)] transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
            >
              Book Now!
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex lg:hidden items-center gap-3">
            <button
              onClick={() => handleNavClick('booking')}
              className="px-3.5 py-1.5 bg-[#00d2b2] text-neutral-950 font-heading font-bold text-xs uppercase tracking-wider shadow-sm cursor-pointer"
            >
              Book Now
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-300 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#00d2b2]" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-neutral-950/98 border-b border-neutral-800 px-6 py-6 backdrop-blur-xl animate-in slide-in-from-top duration-300">
          <nav className="flex flex-col gap-4 font-heading text-sm uppercase tracking-widest">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left py-2 border-b border-neutral-900 ${
                currentPage === 'home' ? 'text-[#00d2b2] font-bold' : 'text-neutral-300'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('home', 'about')}
              className="text-left py-2 border-b border-neutral-900 text-neutral-300"
            >
              About Ralph Con
            </button>
            <button
              onClick={() => handleNavClick('portfolio')}
              className={`text-left py-2 border-b border-neutral-900 ${
                currentPage === 'portfolio' ? 'text-[#00d2b2] font-bold' : 'text-neutral-300'
              }`}
            >
              Tattoo Portfolio
            </button>
            <button
              onClick={() => handleNavClick('artists')}
              className={`text-left py-2 border-b border-neutral-900 ${
                currentPage === 'artists' ? 'text-[#00d2b2] font-bold' : 'text-neutral-300'
              }`}
            >
              Artist Profile
            </button>
            <button
              onClick={() => handleNavClick('home', 'process')}
              className="text-left py-2 border-b border-neutral-900 text-neutral-300"
            >
              The Process
            </button>
            <button
              onClick={() => handleNavClick('home', 'faq')}
              className="text-left py-2 border-b border-neutral-900 text-neutral-300"
            >
              FAQ
            </button>
            <button
              onClick={() => handleNavClick('booking')}
              className="w-full mt-2 py-3 bg-[#00d2b2] text-neutral-950 font-bold text-center uppercase tracking-wider cursor-pointer"
            >
              Book Consultation
            </button>
            
            <div className="pt-4 text-xs text-neutral-400 flex flex-col gap-1.5 normal-case">
              <div className="flex items-center gap-2 text-neutral-300 font-medium">
                <MapPin className="w-3.5 h-3.5 text-[#00d2b2]" />
                <span>London, Ontario, Canada</span>
              </div>
              <div className="flex items-center gap-2 text-neutral-400">
                <Shield className="w-3.5 h-3.5 text-[#00d2b2]" />
                <span>Tattoo Artist Since 2005</span>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
