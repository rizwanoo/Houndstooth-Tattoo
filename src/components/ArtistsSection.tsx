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
    <section id="artists" className="relative py-24 bg-[#080808] text-white overflow-hidden">
      
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-[#00d2b2]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <FiligreeDivider
          title="THE ARTIST"
          subtitle="Tattoo Artist Since 2005"
          className="mb-14"
        />

        {/* Master Artist Profile Card */}
        <div className="max-w-4xl mx-auto">
          {ARTISTS.map((artist) => (
            <div
              key={artist.id}
              className="bg-neutral-900/60 border border-neutral-800 hover:border-[#00d2b2]/70 transition-all duration-300 overflow-hidden shadow-2xl"
            >
              <div className="p-8 sm:p-10 border-b border-neutral-800/80 bg-neutral-950/80 flex flex-col md:flex-row items-center md:items-start gap-6">
                
                {/* Artist Avatar Logo */}
                <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-[#00d2b2] p-1 bg-black shrink-0 shadow-[0_0_20px_rgba(0,210,178,0.3)]">
                  <img
                    src={artist.avatar}
                    alt={artist.name}
                    className="w-full h-full object-cover filter contrast-110 rounded-full"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Artist Bio & Metadata */}
                <div className="flex-1 text-center md:text-left space-y-3">
                  <div className="flex flex-col sm:flex-row items-center md:items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center justify-center md:justify-start gap-2">
                        <h3 className="font-heading font-bold text-2xl sm:text-3xl uppercase tracking-wider text-white">
                          {artist.name}
                        </h3>
                        <span title="Master Artist Since 2005">
                          <CheckCircle2 className="w-5 h-5 text-[#00d2b2] shrink-0" />
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs text-[#00d2b2] mt-1 font-mono">
                        <a
                          href={artist.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-[#00e8c4] transition-colors inline-flex items-center gap-1"
                        >
                          <Instagram className="w-3.5 h-3.5" />
                          <span>{artist.handle}</span>
                          <ExternalLink className="w-3 h-3 opacity-70" />
                        </a>
                        {artist.threads && (
                          <a
                            href={artist.threads}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-[#00e8c4] transition-colors inline-flex items-center gap-1"
                          >
                            <AtSign className="w-3.5 h-3.5" />
                            <span>Threads</span>
                          </a>
                        )}
                      </div>
                    </div>

                    <span className="inline-block text-xs uppercase tracking-wider font-heading font-semibold text-[#00d2b2] bg-neutral-900 px-3 py-1.5 border border-neutral-800">
                      Tattoo Artist Since 2005
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-neutral-300 leading-relaxed font-normal pt-2">
                    {artist.bio}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2 justify-center md:justify-start">
                    <span className="text-xs bg-neutral-900 text-neutral-300 px-2.5 py-1 border border-neutral-800 font-heading uppercase tracking-wider">
                      Realism
                    </span>
                    <span className="text-xs bg-neutral-900 text-neutral-300 px-2.5 py-1 border border-neutral-800 font-heading uppercase tracking-wider">
                      Black & Grey
                    </span>
                    <span className="text-xs bg-neutral-900 text-neutral-300 px-2.5 py-1 border border-neutral-800 font-heading uppercase tracking-wider">
                      Dark Side
                    </span>
                    <span className="text-xs bg-neutral-900 text-neutral-300 px-2.5 py-1 border border-neutral-800 font-heading uppercase tracking-wider">
                      Ornamental
                    </span>
                  </div>
                </div>

              </div>

              {/* Featured Works Grid */}
              <div className="p-6 sm:p-8 bg-neutral-950/40">
                <span className="text-xs font-heading uppercase tracking-widest text-neutral-400 block mb-4 font-semibold text-center md:text-left">
                  Featured Portfolio Highlights
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {artist.featuredWorks.map((workImg, idx) => (
                    <div
                      key={idx}
                      onClick={() => handlePieceClick(workImg, artist)}
                      className="aspect-square bg-neutral-950 overflow-hidden border border-neutral-800 hover:border-[#00d2b2] cursor-pointer group/thumb shadow-md"
                      title="Click to inspect artwork"
                    >
                      <img
                        src={workImg}
                        alt={`${artist.name} artwork sample ${idx + 1}`}
                        className="w-full h-full object-cover group-hover/thumb:scale-110 transition-transform duration-300 filter contrast-105"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>

                {/* Card Actions */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-end gap-3">
                  <a
                    href={artist.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-3 px-6 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white text-xs font-heading uppercase tracking-wider text-center border border-neutral-800 transition-colors flex items-center justify-center gap-2"
                  >
                    <Instagram className="w-4 h-4 text-[#00d2b2]" />
                    <span>Follow @ralcontattoo</span>
                  </a>
                  <button
                    onClick={() => onSelectArtistForBooking && onSelectArtistForBooking(artist.handle)}
                    className="w-full sm:w-auto py-3 px-6 bg-[#00d2b2] hover:bg-[#00e8c4] text-neutral-950 text-xs font-heading font-bold uppercase tracking-wider text-center transition-colors flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,210,178,0.3)] cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Book Session With Ralph Con</span>
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
