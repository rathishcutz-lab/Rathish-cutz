import React from 'react';
import { X } from 'lucide-react';
import { PageId } from '../types';

interface NavigationProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  isAnimating: boolean;
  onOpenInquire?: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPage,
  onNavigate,
  isAnimating,
  onOpenInquire,
}) => {
  return (
    <>
      {/* Top Left: edits.of.rk Brand Logo */}
      <div className="fixed top-5 sm:top-6 left-5 sm:left-8 md:left-12 z-40 pointer-events-auto">
        <button
          id="nav-logo-btn"
          disabled={isAnimating}
          onClick={() => !isAnimating && currentPage !== 'home' && onNavigate('home')}
          aria-label="edits.of.rk home"
          className="group flex items-center gap-2 cursor-pointer text-left focus:outline-none"
        >
          <span className={`font-display font-black text-base sm:text-lg tracking-tight lowercase leading-none transition-colors ${
            currentPage === 'home' ? 'text-white group-hover:text-[#e5484d]' : 'text-black group-hover:text-[#e5484d]'
          }`}>
            edits.of.rk
          </span>
        </button>
      </div>

      {/* TOP RIGHT: ONLY X CLOSE ICON ON WORKS PAGE */}
      <div className="fixed top-5 sm:top-6 right-5 sm:right-8 md:right-12 z-40 pointer-events-auto flex items-center gap-3">
        {/* On Works Page: ONLY X Close Icon */}
        {currentPage === 'works' && (
          <button
            id="works-close-btn"
            disabled={isAnimating}
            onClick={() => !isAnimating && onNavigate('home')}
            aria-label="Close Works and return to home"
            className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-100 hover:bg-black hover:text-white active:scale-95 border border-zinc-200 flex items-center justify-center text-zinc-900 transition-all duration-200 group shadow-sm cursor-pointer"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" />
          </button>
        )}
      </div>
    </>
  );
};
