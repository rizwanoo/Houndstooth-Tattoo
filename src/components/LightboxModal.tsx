import React, { useEffect } from 'react';
import { PortfolioItem, ARTISTS } from '../data/studioData';
import { X, ChevronLeft, ChevronRight, Instagram, Calendar, MapPin } from 'lucide-react';

interface LightboxModalProps {
  piece: PortfolioItem | null;
  onClose: () => void;
  onNext?: () => void;
  onPrev?: () => void;
  onBookWithArtist?: (handle: string) => void;
}

export default function LightboxModal({
  piece,
  onClose,
  onNext,
  onPrev,
  onBookWithArtist,
}: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNext, onPrev]);

  if (!piece) return null;

  const artistInfo = ARTISTS.find((a) => a.handle === piece.artistHandle);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lightbox-piece-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 animate-in fade-in duration-200"
    >
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Close image viewer"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 p-2.5 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 hover:border-[#00d2b2] rounded-full transition-colors cursor-pointer"
      >
        <X className="w-5 h-5 text-[#00d2b2]" />
      </button>

      {/* Prev button */}
      {onPrev && (
        <button
          onClick={onPrev}
          aria-label="Previous artwork"
          className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 hover:border-[#00d2b2] rounded-full transition-colors hidden sm:block cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
      )}

      {/* Next button */}
      {onNext && (
        <button
          onClick={onNext}
          aria-label="Next artwork"
          className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-3 bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 hover:border-[#00d2b2] rounded-full transition-colors hidden sm:block cursor-pointer"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      )}

      {/* Modal Dialog Card */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 max-w-4xl w-full bg-neutral-950 border border-neutral-800 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
      >
        {/* Left: High-Res Image View */}
        <div className="md:w-3/5 bg-black flex items-center justify-center overflow-hidden relative min-h-[300px] md:min-h-[500px]">
          <img
            src={piece.image}
            alt={piece.title}
            className="w-full h-full object-contain max-h-[80vh] filter contrast-110"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Right: Artwork Metadata & Artist Connection */}
        <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-neutral-950 border-t md:border-t-0 md:border-l border-neutral-800 text-left overflow-y-auto">
          <div>
            <span className="text-[11px] font-heading uppercase tracking-widest text-[#00d2b2] font-semibold block mb-1">
              {piece.category}
            </span>

            <h3 id="lightbox-piece-title" className="font-heading text-2xl font-bold uppercase tracking-wider text-white">
              {piece.title}
            </h3>

            {piece.placement && (
              <div className="flex items-center gap-1.5 text-xs text-neutral-400 mt-2 font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#00d2b2]" />
                <span>Placement: {piece.placement}</span>
              </div>
            )}

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mt-4 font-normal">
              {piece.description}
            </p>

            {/* Artist Box */}
            <div className="mt-6 p-4 bg-neutral-900/70 border border-neutral-800 space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-heading block font-semibold">
                Created by Resident Artist
              </span>
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-heading font-bold text-base text-white block">
                    {piece.artistName}
                  </span>
                  <a
                    href={artistInfo?.instagram || `https://www.instagram.com/${piece.artistHandle.replace('@', '')}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-[#00d2b2] hover:text-[#00e8c4] flex items-center gap-1 font-mono transition-colors"
                  >
                    <Instagram className="w-3 h-3" />
                    <span>{piece.artistHandle}</span>
                  </a>
                </div>

                {artistInfo?.avatar && (
                  <div className="w-10 h-10 rounded-full overflow-hidden border border-[#00d2b2]/40 bg-black">
                    <img
                      src={artistInfo.avatar}
                      alt={piece.artistName}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-6 border-t border-neutral-850 mt-6">
            <button
              onClick={() => {
                onClose();
                if (onBookWithArtist) {
                  onBookWithArtist(piece.artistHandle);
                }
              }}
              className="w-full py-3 bg-[#00d2b2] hover:bg-[#00e8c4] text-neutral-950 font-heading font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,210,178,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book In With {piece.artistName}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
