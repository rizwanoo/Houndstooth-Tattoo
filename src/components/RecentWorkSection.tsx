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
    'Sacred Geometry',
    'Realism',
    'Black & Grey',
    'Illustrative & Fine Line',
    'Custom Work',
  ];

  const filteredItems = selectedCategory === 'All'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === selectedCategory);

  const displayItems = expanded ? filteredItems : filteredItems.slice(0, limit);

  return (
    <section id="portfolio" className="relative py-20 bg-[#080808] text-white overflow-hidden">
      
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#00d2b2]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading matching reference "OUR RECENT WORK" */}
        <FiligreeDivider
          title="OUR RECENT WORK"
          subtitle="Genuine Tattoo Artistry"
          className="mb-10"
        />

        {/* Category Filter Buttons (Functional segmented tabs) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-heading font-medium tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#00d2b2] text-neutral-950 font-bold shadow-[0_0_12px_rgba(0,210,178,0.4)]'
                  : 'bg-neutral-900/80 hover:bg-neutral-800 text-neutral-400 hover:text-white border border-neutral-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Masonry / Showcase Grid strictly matching reference proportions */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {displayItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => onSelectPiece(item)}
              className="group relative cursor-pointer overflow-hidden bg-neutral-950 border border-neutral-800/80 hover:border-[#00d2b2]/80 transition-all duration-300 shadow-lg"
            >
              {/* Aspect Ratio container */}
              <div className="aspect-[3/4] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  loading={idx > 4 ? 'lazy' : 'eager'}
                  decoding="async"
                  className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 filter contrast-110 brightness-95 group-hover:brightness-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-end">
                <span className="text-[10px] font-heading uppercase tracking-widest text-[#00d2b2] font-semibold">
                  {item.category}
                </span>
                <h3 className="font-heading text-sm font-bold text-white uppercase leading-snug line-clamp-1">
                  {item.title}
                </h3>
                <span className="text-[11px] text-neutral-300 flex items-center gap-1 mt-0.5">
                  <Instagram className="w-3 h-3 text-[#00d2b2]" />
                  {item.artistHandle}
                </span>
                
                <div className="mt-2 flex items-center gap-1.5 text-[10px] text-neutral-300 font-medium">
                  <Eye className="w-3 h-3 text-[#00d2b2]" />
                  <span>Inspect Piece</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* "See More ∨" link button matching reference design */}
        {filteredItems.length > limit && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setExpanded(!expanded)}
              className="group inline-flex items-center gap-2 text-sm font-heading uppercase tracking-widest text-neutral-400 hover:text-[#00d2b2] transition-colors py-2 px-6 border border-neutral-800 hover:border-[#00d2b2]/50 bg-neutral-900/50 cursor-pointer"
            >
              <span>{expanded ? 'Show Less' : `See More Works (${filteredItems.length - limit} more)`}</span>
              {expanded ? (
                <ChevronUp className="w-4 h-4 text-[#00d2b2] group-hover:-translate-y-0.5 transition-transform" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#00d2b2] group-hover:translate-y-0.5 transition-transform" />
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
