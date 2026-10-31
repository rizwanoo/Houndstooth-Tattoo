import React from 'react';
import FiligreeDivider from './FiligreeDivider';
import { ARTISTS, Artist, PortfolioItem, PORTFOLIO_ITEMS } from '../data/studioData';
import { Instagram, ExternalLink, Calendar, CheckCircle2, AtSign } from 'lucide-react';

interface ArtistsSectionProps {
  onSelectArtistForBooking?: (handle: string) => void;
  onSelectWork?: (piece: PortfolioItem) => void;
}

export default function ArtistsSection({
  onSelectArtistForBooking,
  onSelectWork,
}: ArtistsSectionProps) {
  const handlePieceClick = (imagePath: string, artist: Artist) => {
    if (!onSelectWork) return;
    const found = PORTFOLIO_ITEMS.find((p) => p.image === imagePath);
    if (found) {
      onSelectWork(found);
    } else {
      onSelectWork({
        id: `piece-${Date.now()}`,
        title: `${artist.name} Custom Piece`,
        category: 'Realism',
        image: imagePath,
        artistHandle: artist.handle,
        artistName: artist.name,
        description: `Bespoke custom tattoo artwork by ${artist.name} (${artist.handle}) in London, Ontario.`,
      });
    }
  };

  return (
    <section id="artists" className="relative py-28 sm:py-36 bg-[#080808] text-white overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#00d2b2]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <FiligreeDivider
          title="THE ARTIST"
          subtitle="Tattoo Artist Since 2005"
          className="mb-16 sm:mb-20"
        />

        {/* Master Artist Profile Card with Generous Editorial Padding */}
        <div className="max-w-4xl mx-auto">
          {ARTISTS.map((artist) => (
            <div
              key={artist.id}
              className="bg-neutral-900/60 border border-neutral-800 hover:border-[#00d2b2]/70 transition-all duration-300 overflow-hidden shadow-2xl"
            >
              <div className="p-8 sm:p-12 md:p-14 border-b border-neutral-800/80 bg-neutral-950/80 flex flex-col md:flex-row items-center md:items-start gap-8 sm:gap-10">
                
                {/* Artist Avatar Logo */}
                <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-2 border-[#00d2b2] p-1 bg-black shrink-0 shadow-[0_0_20px_rgba(0,210,178,0.3)]">
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className="w-full h-full object-cover rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Artist Bio & Credentials */}
                <div className="flex-1 text-center md:text-left space-y-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[#00d2b2] font-heading font-semibold block">
                      Master Tattoo Artist
                    </span>
                    <h3 className="font-heading text-3xl sm:text-4xl font-bold uppercase tracking-wider text-white mt-1">
                      {artist.name}
                    </h3>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-neutral-400 font-mono mt-2">
                      <a
                        href={artist.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#00d2b2] hover:underline flex items-center gap-1"
                      >
                        <AtSign className="w-3.5 h-3.5" />
                        <span>ralcontattoo</span>
                      </a>
                      <span>·</span>
                      <span>London, Ontario, Canada</span>
                      <span>·</span>
                      <span>Since 2005</span>
                    </div>
                  </div>

                  <p className="text-neutral-300 text-sm sm:text-base leading-relaxed sm:leading-loose max-w-2xl font-normal pt-1">
                    {artist.bio}
                  </p>

                  <div className="pt-3">
                    <span className="text-[11px] uppercase tracking-widest text-neutral-400 font-heading block mb-2 font-semibold">
                      Master Specialties:
                    </span>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                      {['Realism', 'Black & Grey', 'Dark Side', 'Ornamental'].map((spec) => (
                        <span
                          key={spec}
                          className="px-3.5 py-1.5 bg-neutral-900 border border-neutral-700/80 text-neutral-200 text-xs font-mono"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Booking CTA */}
                  <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
                    <button
                      onClick={() => onSelectArtistForBooking && onSelectArtistForBooking(artist.handle)}
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#00d2b2] hover:bg-[#00e8c4] text-neutral-950 font-heading font-bold text-xs uppercase tracking-widest transition-colors cursor-pointer inline-flex items-center justify-center gap-2"
                    >
                      <Calendar className="w-4 h-4" />
                      <span>Book With {artist.name}</span>
                    </button>
                    <a
                      href={artist.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white font-heading font-medium text-xs uppercase tracking-widest border border-neutral-700 transition-colors inline-flex items-center justify-center gap-2"
                    >
                      <Instagram className="w-4 h-4 text-[#00d2b2]" />
                      <span>Instagram Gallery</span>
                      <ExternalLink className="w-3 h-3 text-neutral-500" />
                    </a>
                  </div>
                </div>

              </div>

              {/* Featured Pieces Showcase Strip with Balanced Margins */}
              <div className="p-6 sm:p-8 bg-neutral-950">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-xs font-heading uppercase tracking-widest text-neutral-400 font-semibold">
                    Featured Master Works
                  </span>
                  <span className="text-xs text-neutral-500 font-mono">
                    Click piece to inspect
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5">
                  {artist.featuredWorks.map((work, idx) => (
                    <div
                      key={idx}
                      onClick={() => handlePieceClick(work, artist)}
                      className="aspect-square bg-neutral-900 border border-neutral-800 hover:border-[#00d2b2] transition-colors overflow-hidden group cursor-pointer relative shadow-md"
                    >
                      <img
                        src={work}
                        alt={`Work by ${artist.name}`}
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 filter contrast-105"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="text-[10px] font-heading uppercase tracking-wider text-white bg-black/80 px-2.5 py-1 border border-neutral-700">
                          Inspect
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
