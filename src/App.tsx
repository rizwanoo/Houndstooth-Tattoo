/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import RecentWorkSection from './components/RecentWorkSection';
import ProcessSection from './components/ProcessSection';
import ArtistsSection from './components/ArtistsSection';
import StudioSection from './components/StudioSection';
import FAQSection from './components/FAQSection';
import BookingSection from './components/BookingSection';
import Footer from './components/Footer';
import LightboxModal from './components/LightboxModal';
import FiligreeDivider from './components/FiligreeDivider';
import StudioAIChatbot from './components/StudioAIChatbot';
import { PORTFOLIO_ITEMS, PortfolioItem, STUDIO_INFO } from './data/studioData';
import { ArrowLeft, Sparkles, MapPin, Shield } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'artists' | 'portfolio' | 'booking'>('home');
  const [selectedPiece, setSelectedPiece] = useState<PortfolioItem | null>(null);
  const [preselectedArtist, setPreselectedArtist] = useState<string>('');

  const handleBookClick = (artistHandle?: string) => {
    if (artistHandle) {
      setPreselectedArtist(artistHandle);
    }
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPiece = (piece: PortfolioItem) => {
    setSelectedPiece(piece);
  };

  const handleNextPiece = () => {
    if (!selectedPiece) return;
    const currentIndex = PORTFOLIO_ITEMS.findIndex((p) => p.id === selectedPiece.id);
    const nextIndex = (currentIndex + 1) % PORTFOLIO_ITEMS.length;
    setSelectedPiece(PORTFOLIO_ITEMS[nextIndex]);
  };

  const handlePrevPiece = () => {
    if (!selectedPiece) return;
    const currentIndex = PORTFOLIO_ITEMS.findIndex((p) => p.id === selectedPiece.id);
    const prevIndex = (currentIndex - 1 + PORTFOLIO_ITEMS.length) % PORTFOLIO_ITEMS.length;
    setSelectedPiece(PORTFOLIO_ITEMS[prevIndex]);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-white flex flex-col font-sans selection:bg-[#00d2b2]/30 selection:text-white">
      {/* Top Navigation */}
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        
        {/* PAGE 1: HOME */}
        {currentPage === 'home' && (
          <>
            {/* Cinematic Video Hero (matches Dribbble video reference) */}
            <HeroSection
              onBookClick={() => handleBookClick()}
              onPortfolioClick={() => {
                setCurrentPage('portfolio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* About Section with Ripped Paint Grunge Edge */}
            <AboutSection onBookClick={() => handleBookClick()} />

            {/* Our Recent Work (Masonry portfolio showcase matching reference layout) */}
            <RecentWorkSection
              limit={10}
              onSelectPiece={handleSelectPiece}
              onViewAll={() => {
                setCurrentPage('portfolio');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />

            {/* The Process (3-Step layout matching reference screenshot) */}
            <ProcessSection onBookClick={() => handleBookClick()} />

            {/* Resident Artists Showcase */}
            <ArtistsSection
              onSelectArtistForBooking={(handle) => handleBookClick(handle)}
              onSelectWork={handleSelectPiece}
            />

            {/* Las Vegas Studio Atmosphere & Hygiene Standards */}
            <StudioSection />

            {/* Frequently Asked Questions (2-column accordion) */}
            <FAQSection />

            {/* Contact & Booking Section (dual-card layout matching reference screenshot) */}
            <BookingSection preselectedArtist={preselectedArtist} />
          </>
        )}

        {/* PAGE 2: ARTISTS */}
        {currentPage === 'artists' && (
          <div className="pt-36 sm:pt-44 pb-28 sm:pb-36">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-neutral-400 hover:text-[#00d2b2] transition-colors mb-8 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>

              <div className="bg-neutral-950 border border-neutral-800 p-10 sm:p-16 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#00d2b2]/5 rounded-full blur-3xl pointer-events-none" />
                <FiligreeDivider
                  title="THE TATTOO ARTIST"
                  subtitle="Ralph Con · Tattoo Artist Since 2005"
                  className="mb-6 sm:mb-8"
                />
                <p className="text-base sm:text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed sm:leading-loose">
                  Ralph Con has been creating bespoke custom body artistry since 2005. Specializing in Realism, Black & Grey, Dark Side, and Ornamental tattooing, every piece combines technical mastery with anatomical composition.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-8 mt-8 text-xs sm:text-sm text-neutral-400 font-mono">
                  <span className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-[#00d2b2]" />
                    Tattoo Artist Since 2005
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#00d2b2]" />
                    London, Ontario, Canada
                  </span>
                </div>
              </div>
            </div>

            <ArtistsSection
              onSelectArtistForBooking={(handle) => handleBookClick(handle)}
              onSelectWork={handleSelectPiece}
            />
          </div>
        )}

        {/* PAGE 3: PORTFOLIO */}
        {currentPage === 'portfolio' && (
          <div className="pt-36 sm:pt-44 pb-28 sm:pb-36">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-neutral-400 hover:text-[#00d2b2] transition-colors mb-8 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>

              <div className="bg-neutral-950 border border-neutral-800 p-10 sm:p-16 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#00d2b2]/5 rounded-full blur-3xl pointer-events-none" />
                <FiligreeDivider
                  title="AUTHENTIC TATTOO PORTFOLIO"
                  subtitle="Selected Tattoo Artistry by Ralph Con"
                  className="mb-6 sm:mb-8"
                />
                <p className="text-base sm:text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed sm:leading-loose">
                  Browse real, unedited photographs of tattoos completed by Ralph Con. Filter by style or click on any piece to inspect details and request a consultation.
                </p>
              </div>
            </div>

            <RecentWorkSection
              limit={50}
              onSelectPiece={handleSelectPiece}
            />
          </div>
        )}

        {/* PAGE 4: CONTACT & BOOKING */}
        {currentPage === 'booking' && (
          <div className="pt-36 sm:pt-44 pb-28 sm:pb-36">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 sm:mb-16">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="inline-flex items-center gap-2 text-xs font-heading uppercase tracking-widest text-neutral-400 hover:text-[#00d2b2] transition-colors mb-8 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </button>

              <div className="bg-neutral-950 border border-neutral-800 p-10 sm:p-16 text-center relative overflow-hidden shadow-2xl">
                <FiligreeDivider
                  title="BOOKING & CONSULTATION"
                  subtitle="Ralph Con Tattoo · London, Ontario, Canada"
                  className="mb-6 sm:mb-8"
                />
                <p className="text-base sm:text-lg text-neutral-300 max-w-3xl mx-auto leading-relaxed sm:leading-loose">
                  Ready to start your custom tattoo? Tell us about your idea, preferred placement, size, and resident artist. We will review your inquiry and follow up promptly with next steps.
                </p>
              </div>
            </div>

            <BookingSection preselectedArtist={preselectedArtist} />
          </div>
        )}

      </main>

      {/* Footer */}
      <Footer
        onNavigate={(page, sectionId) => {
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
        }}
      />

      {/* Lightbox Modal for Full Screen Tattoo Inspection */}
      <LightboxModal
        piece={selectedPiece}
        onClose={() => setSelectedPiece(null)}
        onNext={handleNextPiece}
        onPrev={handlePrevPiece}
        onBookWithArtist={(artistHandle) => {
          setSelectedPiece(null);
          handleBookClick(artistHandle);
        }}
      />

      {/* AI Consultation Chatbot Concierge */}
      <StudioAIChatbot onBookClick={() => handleBookClick()} />
    </div>
  );
}
