import React from 'react';
import FiligreeDivider from './FiligreeDivider';
import { ARTISTS, Artist, PortfolioItem, PORTFOLIO_ITEMS } from '../data/studioData';
import { Instagram, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';

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
        category: 'Custom Work',
        image: imagePath,
        artistHandle: artist.handle,
        artistName: artist.name,
        description: `Bespoke custom work by ${artist.name} (${artist.handle}) at Houndstooth Tattoo Las Vegas.`,
      });
    }
  };

  return (
    <section id="artists" className="relative py-24 bg-[#080808] text-white overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#00d2b2]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <FiligreeDivider
          title="RESIDENT ARTISTS"
          subtitle="Master Craftsmen & Piercers"
          className="mb-14"
        />

        <p className="text-center text-neutral-300 max-w-2xl mx-auto -mt-8 mb-12 text-sm sm:text-base leading-relaxed">
          Meet the verified resident artists at Houndstooth Tattoo Las Vegas. Each artist brings an authentic signature style — from sacred geometry and dark realism to fine-line botanicals and custom script.
        </p>

        {/* 3-Column / Responsive Artist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {ARTISTS.map((artist) => (
            <div
              key={artist.id}
              className="bg-neutral-900/60 border border-neutral-800 hover:border-[#00d2b2]/70 transition-all duration-300 flex flex-col justify-between overflow-hidden group shadow-xl"
            >
              <div>
                {/* Header with Artist Name & Instagram */}
                <div className="p-6 border-b border-neutral-800/80 bg-neutral-950/70">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-heading font-bold text-xl uppercase tracking-wider text-white group-hover:text-[#00d2b2] transition-colors">
                          {artist.name}
                        </h3>
                        <span title="Verified Studio Resident">
                          <CheckCircle2 className="w-4 h-4 text-[#00d2b2] shrink-0" />
                        </span>
                      </div>
                      <a
                        href={artist.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-[#00d2b2] hover:text-[#00e8c4] transition-colors mt-1 font-mono"
                      >
                        <Instagram className="w-3.5 h-3.5" />
                        <span>{artist.handle}</span>
                        <ExternalLink className="w-3 h-3 opacity-70" />
                      </a>
                    </div>

                    {/* Small avatar or signature icon */}
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-[#00d2b2]/40 bg-black shrink-0">
                      <img
                        src={artist.avatar}
                        alt={artist.name}
                        className="w-full h-full object-cover filter contrast-110"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>

                  <span className="inline-block mt-3 text-xs uppercase tracking-wider font-heading font-semibold text-neutral-400 bg-neutral-900 px-2.5 py-1 border border-neutral-800">
                    {artist.specialty}
                  </span>
                </div>

                {/* Bio Prose */}
                <div className="p-6">
                  <p className="text-sm text-neutral-300 leading-relaxed font-normal">
                    {artist.bio}
                  </p>

                  {/* Featured Works Showcase Thumbnails */}
                  <div className="mt-5">
                    <span className="text-[11px] font-heading uppercase tracking-widest text-neutral-400 block mb-2 font-semibold">
                      Featured Tattoos & Artwork
                    </span>
                    <div className="grid grid-cols-4 gap-2">
                      {artist.featuredWorks.map((workImg, idx) => (
                        <div
                          key={idx}
                          onClick={() => handlePieceClick(workImg, artist)}
                          className="aspect-square bg-neutral-950 overflow-hidden border border-neutral-800 hover:border-[#00d2b2] cursor-pointer group/thumb"
                          title="Click to inspect piece"
                        >
                          <img
                            src={workImg}
                            alt={`${artist.name} tattoo sample ${idx + 1}`}
                            className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300 filter contrast-105"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="p-6 pt-0 mt-auto">
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={artist.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2.5 px-3 bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-heading uppercase tracking-wider text-center border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#00d2b2]" />
                    <span>Instagram</span>
                  </a>
                  <button
                    onClick={() => onSelectArtistForBooking && onSelectArtistForBooking(artist.handle)}
                    className="py-2.5 px-3 bg-[#00d2b2] hover:bg-[#00e8c4] text-neutral-950 text-xs font-heading font-bold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-1.5 shadow-[0_0_10px_rgba(0,210,178,0.2)] cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Artist</span>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
