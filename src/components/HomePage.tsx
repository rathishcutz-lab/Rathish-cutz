import React, { useEffect, useRef, useState } from 'react';
import { Mail, Instagram, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { PageId } from '../types';
import { BRAND_INFO } from '../data/portfolioData';

export interface OnlineTool {
  name: string;
  logoUrl: string;
}

export const ONLINE_TOOLS: OnlineTool[] = [
  {
    name: 'Adobe Premiere Pro',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-original.svg',
  },
  {
    name: 'DaVinci Resolve Studio',
    logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/DaVinci_Resolve_Studio.png',
  },
  {
    name: 'Adobe After Effects',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/aftereffects/aftereffects-original.svg',
  },
  {
    name: 'Adobe Photoshop',
    logoUrl: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-original.svg',
  },
];

// 2 identical halves for seamless infinite CSS marquee loop
const TICKER_ITEMS: OnlineTool[] = [
  ...ONLINE_TOOLS,
  ...ONLINE_TOOLS,
  ...ONLINE_TOOLS,
  ...ONLINE_TOOLS,
];

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenReel?: () => void;
  onOpenInquire?: () => void;
  isActive: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  isActive,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  // Background/Avatar image: public/bgimagehome.png
  const [bgSrc, setBgSrc] = useState<string>('/bgimagehome.png');

  // Timeline as background image
  const [timelineSrc, setTimelineSrc] = useState<string>(
    'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2560&auto=format&fit=crop'
  );

  useEffect(() => {
    const candidatePaths = ['/bgimagehome.png', '/public/bgimagehome.png', '/assets/bg.jpg', '/bg.jpg'];
    let resolved = false;

    candidatePaths.forEach((path) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        if (!resolved) {
          resolved = true;
          setBgSrc(path);
        }
      };
    });

    const timelinePaths = [
      '/timeline.png',
      '/timeline.jpg',
      '/timeline.jpeg',
      '/timeline.webp',
      '/assets/timeline.png',
      '/assets/timeline.jpg'
    ];
    timelinePaths.forEach((path) => {
      const img = new Image();
      img.src = path;
      img.onload = () => {
        setTimelineSrc(path);
      };
    });
  }, []);

  // GSAP animation on hero entrance
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const ctx = gsap.context(() => {
      if (heroContentRef.current) {
        gsap.fromTo(
          heroContentRef.current,
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 0.8, ease: 'power2.out', delay: 0.1 }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isActive]);

  return (
    <div
      ref={containerRef}
      id="home-stage-container"
      className="relative w-full h-full max-h-screen overflow-hidden select-none bg-black text-white flex flex-col justify-center px-6 sm:px-12 md:px-16 lg:px-24 py-8"
    >
      {/* TIMELINE AS FULL BACKGROUND IMAGE */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <img
          id="home-timeline-bg"
          src={timelineSrc}
          alt="Timeline Background"
          referrerPolicy="no-referrer"
          onError={() =>
            setTimelineSrc(
              'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=2560&auto=format&fit=crop'
            )
          }
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Dark film scrim overlay for high legibility */}
        <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px]" />
      </div>

      {/* LEFT-ALIGNED HERO CONTENT */}
      <div
        ref={heroContentRef}
        className="relative z-10 w-full max-w-2xl lg:max-w-3xl flex flex-col items-start text-left pr-4 sm:pr-8 lg:pr-0"
      >
        {/* Circular Avatar with outer white cropped */}
        {bgSrc && (
          <div className="mb-4 sm:mb-5 relative group">
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden shadow-2xl border-2 border-white/20 bg-zinc-950 flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
              <img
                id="home-avatar-image"
                src={bgSrc}
                alt="RATHISH KUMAR"
                className="w-full h-full object-cover object-center rounded-full scale-[1.08] select-none"
              />
            </div>
          </div>
        )}

        {/* Creator Name (No text wrap) */}
        <h1
          id="home-hero-name"
          className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white uppercase leading-none drop-shadow-lg whitespace-nowrap"
        >
          RATHISH KUMAR
        </h1>

        {/* Role Subtitle */}
        <p
          id="home-hero-title"
          className="font-mono-code text-xs sm:text-sm tracking-[0.28em] text-[#e5484d] uppercase font-bold mt-2.5 sm:mt-3 drop-shadow"
        >
          FULL STACK VIDEO EDITOR
        </p>

        {/* TOOLS HORIZONTAL INFINITE SCROLL TICKER WITHIN CONTAINER */}
        <div
          id="tools-ticker-container"
          className="relative w-full max-w-md sm:max-w-lg mt-5 sm:mt-6 overflow-hidden py-2"
          style={{
            maskImage:
              'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage:
              'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <div
            id="tools-ticker-track"
            className="animate-tools-ticker flex items-center gap-6 sm:gap-8"
          >
            {TICKER_ITEMS.map((tool, idx) => (
              <div
                key={`${tool.name}-${idx}`}
                title={tool.name}
                className="shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-115 cursor-default"
              >
                <img
                  src={tool.logoUrl}
                  alt={tool.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 sm:w-12 sm:h-12 md:w-13 md:h-13 object-contain drop-shadow-lg select-none pointer-events-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ABOUT US / BIO SECTION WITH HUMAN-LIKE TONE & WORKS BUTTON */}
        <div
          id="bio-works-section"
          className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 sm:gap-7 w-full max-w-2xl pt-1"
        >
          {/* Simple, warm human-like English bio */}
          <p
            id="home-bio-text"
            className="text-xs sm:text-sm md:text-[15px] font-sans text-zinc-300 leading-relaxed max-w-md"
          >
            {BRAND_INFO.bio[0]}
          </p>

          {/* WORKS Button on the Right Side of Bio */}
          <button
            id="home-works-cta-btn"
            onClick={() => onNavigate('works')}
            aria-label="View works"
            className="group shrink-0 flex items-center gap-3 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#e5484d] hover:bg-[#ff5a5f] text-white font-display font-black text-xs sm:text-sm tracking-[0.18em] uppercase transition-all duration-300 shadow-[0_0_25px_rgba(229,72,77,0.4)] hover:shadow-[0_0_35px_rgba(229,72,77,0.7)] hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>WORKS</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      {/* BOTTOM RIGHT SOCIALS & CONTACT ICONS */}
      <div
        id="bottom-right-social-dock"
        className="fixed bottom-6 sm:bottom-8 right-6 sm:right-8 md:right-12 z-30 flex items-center gap-3 sm:gap-4 pointer-events-auto"
      >
        {/* WhatsApp Icon */}
        <a
          href={`https://wa.me/91${BRAND_INFO.whatsappNumber || '9677265861'}?text=Hi%20Rathish%2C%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20collaborate%20on%20a%20video%20project`}
          target="_blank"
          rel="noopener noreferrer"
          title={`WhatsApp: +91 ${BRAND_INFO.whatsappNumber || '9677265861'}`}
          aria-label="WhatsApp"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-emerald-500/20 backdrop-blur-md border border-white/15 hover:border-emerald-500/50 text-white hover:text-emerald-400 flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-110 active:scale-95 group cursor-pointer"
        >
          <svg
            viewBox="0 0 24 24"
            className="w-5 h-5 sm:w-5.5 sm:h-5.5 fill-current transition-colors"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
          </svg>
        </a>

        {/* Email Icon */}
        <a
          href={`mailto:${BRAND_INFO.email}?subject=Project%20Inquiry%20-%20Video%20Editing`}
          title={`Email: ${BRAND_INFO.email}`}
          aria-label="Email"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-[#e5484d]/20 backdrop-blur-md border border-white/15 hover:border-[#e5484d]/50 text-white hover:text-[#e5484d] flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-110 active:scale-95 group cursor-pointer"
        >
          <Mail className="w-5 h-5 sm:w-5.5 sm:h-5.5 transition-colors" />
        </a>

        {/* Instagram Icon */}
        <a
          href={BRAND_INFO.instagram}
          target="_blank"
          rel="noopener noreferrer"
          title={`Instagram: ${BRAND_INFO.instagramHandle || '@edits.of.rk'}`}
          aria-label="Instagram"
          className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/10 hover:bg-pink-500/20 backdrop-blur-md border border-white/15 hover:border-pink-500/50 text-white hover:text-pink-400 flex items-center justify-center transition-all duration-300 shadow-xl hover:scale-110 active:scale-95 group cursor-pointer"
        >
          <Instagram className="w-5 h-5 sm:w-5.5 sm:h-5.5 transition-colors" />
        </a>
      </div>
    </div>
  );
};
