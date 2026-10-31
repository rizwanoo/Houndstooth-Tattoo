import React, { useState } from 'react';
import FiligreeDivider from './FiligreeDivider';
import { PORTFOLIO_ITEMS, PortfolioItem } from '../data/studioData';
import { Eye, ChevronDown, ChevronUp, Instagram } from 'lucide-react';

interface RecentWorkSectionProps {
  onSelectPiece: (piece: PortfolioItem) => void;
  onViewAll?: () => void;
  limit?: number;
}

export default function RecentWorkSection({
  onSelectPiece,
  onViewAll,
  limit = 10,
}: RecentWorkSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expanded, setExpanded] = useState(false);

  const categories = [
    'All',
    'Realism',
    'Black & Grey',
    'Dark Side',
    'Ornamental',
  ];

  const filteredItems = selectedCategory === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === selectedCategory);

  const displayItems = expanded ? filteredItems : filteredItems.slice(0, limit);

  return (
    <section id="portfolio" className="relative py-28 sm:py-36 bg-[#080808] text-white overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#00d2b2]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Generous Bottom Margin */}
        <FiligreeDivider
          title="SELECTED TATTOO WORK"
          subtitle="Realism, Black & Grey, Dark Side & Ornamental"
          className="mb-14 sm:mb-16"
        />

        {/* Category Filter Buttons with Editorial Spacing */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-14 sm:mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-heading font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#00d2b2] text-neutral-950 font-bold shadow-[0_0_15px_rgba(0,210,178,0.4)]'
                  : 'bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Showcase Grid with Balanced Breathing Room */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {displayItems.map((piece) => (
            <div
              key={piece.id}
              onClick={() => onSelectPiece(piece)}
              className="group relative bg-neutral-950 border border-neutral-800 hover:border-[#00d2b2] transition-all duration-300 overflow-hidden cursor-pointer shadow-xl aspect-square"
            >
              <img
                src={piece.image}
                alt={`${piece.title} by Ralph Con`}
                className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 filter contrast-105"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Hover Details Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 sm:p-5">
                <span className="text-[10px] font-heading uppercase tracking-widest text-[#00d2b2] font-semibold block">
                  {piece.category}
                </span>
                <h4 className="font-heading text-sm sm:text-base font-bold text-white uppercase tracking-wider leading-tight">
                  {piece.title}
                </h4>
                <div className="mt-2.5 inline-flex items-center gap-1.5 text-xs text-neutral-300">
                  <Eye className="w-3.5 h-3.5 text-[#00d2b2]" />
                  <span>Inspect Piece</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All / Instagram Controls with Generous Vertical Space */}
        <div className="mt-16 sm:mt-20 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-6">
          {limit < filteredItems.length && !expanded && (
            <button
              onClick={() => {
                if (onViewAll) {
                  onViewAll();
                } else {
                  setExpanded(true);
                }
              }}
              className="px-9 py-4 bg-neutral-900 hover:bg-neutral-800 text-white font-heading font-semibold text-xs uppercase tracking-widest border border-neutral-700 hover:border-[#00d2b2] transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Explore All {filteredItems.length} Pieces</span>
              <ChevronDown className="w-4 h-4 text-[#00d2b2]" />
            </button>
          )}

          {expanded && (
            <button
              onClick={() => setExpanded(false)}
              className="px-9 py-4 bg-neutral-900 hover:bg-neutral-800 text-white font-heading font-semibold text-xs uppercase tracking-widest border border-neutral-700 hover:border-[#00d2b2] transition-all duration-200 cursor-pointer inline-flex items-center gap-2"
            >
              <span>Show Less</span>
              <ChevronUp className="w-4 h-4 text-[#00d2b2]" />
            </button>
          )}

          <a
            href="https://www.instagram.com/ralcontattoo/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-9 py-4 bg-black/60 hover:bg-neutral-900 text-neutral-300 hover:text-white font-heading font-semibold text-xs uppercase tracking-widest border border-neutral-800 hover:border-[#00d2b2] transition-all duration-200 inline-flex items-center gap-2"
          >
            <Instagram className="w-4 h-4 text-[#00d2b2]" />
            <span>Follow @ralcontattoo</span>
          </a>
        </div>

      </div>
    </section>
  );
}
