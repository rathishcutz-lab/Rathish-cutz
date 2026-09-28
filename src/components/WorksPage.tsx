import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  ChevronUp,
  ChevronDown
} from 'lucide-react';
import gsap from 'gsap';
import { PROJECTS, CLOUDINARY_CLOUD_NAME, buildCloudinaryVideoUrl } from '../data/portfolioData';
import { ProjectItem, PageId } from '../types';

interface WorksPageProps {
  onNavigate: (page: PageId) => void;
  onSelectProject?: (project: ProjectItem) => void;
  isActive: boolean;
}

export const WorksPage: React.FC<WorksPageProps> = ({
  onNavigate,
  isActive,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [showPlayPulse, setShowPlayPulse] = useState<boolean>(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const reelContainerRef = useRef<HTMLDivElement>(null);

  const currentProject = PROJECTS[currentIndex];

  // Resolve video path: check local /works/ then fallback
  const [videoSrc, setVideoSrc] = useState<string>(currentProject.fallbackVideoUrl);

  // Probe candidate video sources: Cloudinary, local /works/, then fallback
  useEffect(() => {
    let isCancelled = false;
    const project = PROJECTS[currentIndex];
    const candidatePaths: string[] = [];

    // 1. Direct Cloudinary video url if provided
    if (project.cloudinaryUrl) {
      candidatePaths.push(project.cloudinaryUrl);
    }

    // 2. Cloudinary cloud delivery if cloud name is set
    if (CLOUDINARY_CLOUD_NAME) {
      if (project.cloudinaryPublicId) {
        candidatePaths.push(buildCloudinaryVideoUrl(project.cloudinaryPublicId));
      }
      candidatePaths.push(buildCloudinaryVideoUrl(`${project.id}.mp4`));
      candidatePaths.push(buildCloudinaryVideoUrl(project.id));
      candidatePaths.push(buildCloudinaryVideoUrl(`edits_of_rk/${project.id}`));
      candidatePaths.push(buildCloudinaryVideoUrl(`works/${project.id}`));
    }

    // 3. Local public folder assets and fallback
    candidatePaths.push(
      `/works/${project.id}.mp4`,
      `/works/works-video-${currentIndex + 1}.mp4`,
      `/works/video-${currentIndex + 1}.mp4`,
      `/works/${currentIndex + 1}.mp4`,
      project.fallbackVideoUrl
    );

    const testCandidates = async () => {
      for (const path of candidatePaths) {
        if (path === project.fallbackVideoUrl) {
          if (!isCancelled) setVideoSrc(path);
          return;
        }
        try {
          const res = await fetch(path, { method: 'HEAD' });
          if (res.ok && !isCancelled) {
            setVideoSrc(path);
            return;
          }
        } catch {
          // continue probe
        }
      }
      if (!isCancelled) setVideoSrc(project.fallbackVideoUrl);
    };

    testCandidates();
    return () => {
      isCancelled = true;
    };
  }, [currentIndex]);

  // Reset video playback on project switch
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {
        setIsPlaying(false);
      });
      setIsPlaying(true);
    }

    if (reelContainerRef.current && isActive) {
      gsap.fromTo(
        reelContainerRef.current,
        { scale: 0.96, opacity: 0.6 },
        { scale: 1, opacity: 1, duration: 0.45, ease: 'power2.out' }
      );
    }
  }, [currentIndex, isActive]);

  // Handle Play/Pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
    setShowPlayPulse(true);
    setTimeout(() => setShowPlayPulse(false), 500);
  };

  // Next and previous project navigation
  const nextReel = () => {
    setCurrentIndex((prev) => (prev + 1) % PROJECTS.length);
  };

  const prevReel = () => {
    if (currentIndex === 0) {
      onNavigate('home');
      return;
    }
    setCurrentIndex((prev) => prev - 1);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        nextReel();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        prevReel();
      } else if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, currentIndex]);

  // Wheel scroll navigation (throttle)
  const wheelTimeout = useRef<number | null>(null);
  const handleWheel = (e: React.WheelEvent) => {
    if (wheelTimeout.current) return;
    if (Math.abs(e.deltaY) > 30) {
      if (e.deltaY > 0) {
        nextReel();
      } else {
        prevReel();
      }
      wheelTimeout.current = window.setTimeout(() => {
        wheelTimeout.current = null;
      }, 600);
    }
  };

  // Touch swipe navigation
  const touchStartY = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY.current === null) return;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    if (Math.abs(diffY) > 50) {
      if (diffY > 0) {
        nextReel();
      } else {
        prevReel();
      }
    }
    touchStartY.current = null;
  };

  return (
    <div
      id="works-stage-container"
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative w-full h-full flex items-center justify-center overflow-hidden select-none bg-white text-black p-2 sm:p-4"
    >
      {/* Central Clean Video Container */}
      <div className="relative z-10 w-full flex items-center justify-center h-full max-h-[96vh] pt-12 sm:pt-14 pb-2">
        
        {/* Video Frame */}
        <div
          ref={reelContainerRef}
          id="clean-video-frame"
          className="relative w-full max-w-[380px] sm:max-w-[400px] h-full max-h-[730px] rounded-2xl sm:rounded-3xl overflow-hidden bg-black shadow-2xl border border-zinc-200 sm:border-zinc-800 flex flex-col justify-end"
        >
          {/* Main Video Element */}
          <div
            className="absolute inset-0 z-0 bg-black cursor-pointer flex items-center justify-center"
            onClick={togglePlay}
          >
            <video
              ref={videoRef}
              src={videoSrc}
              poster={currentProject.fallbackImageUrl}
              playsInline
              loop
              muted
              autoPlay
              className={`w-full h-full ${currentProject.aspectRatio === '16:9' ? 'object-contain bg-zinc-950' : 'object-cover'} select-none pointer-events-none transition-all duration-300`}
            />

            {/* Center Play/Pause Pop Animation */}
            {showPlayPulse && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
                <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center animate-ping">
                  {isPlaying ? (
                    <Play className="w-7 h-7 fill-current ml-1" />
                  ) : (
                    <Pause className="w-7 h-7 fill-current" />
                  )}
                </div>
              </div>
            )}

            {/* Subtle bottom gradient scrim for title readability */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none" />
          </div>

          {/* Clean Project Title & Category (No Reels UI) */}
          <div className="relative z-20 p-4 sm:p-5 pointer-events-none">
            <div className="flex items-center gap-2">
              <h3 className="font-display font-black text-sm sm:text-base text-white uppercase tracking-tight drop-shadow-md">
                {currentProject.title}
              </h3>
              <span className="px-2 py-0.5 rounded bg-white/20 backdrop-blur-sm text-[9px] font-mono-code text-white tracking-wider uppercase font-semibold">
                {currentProject.category}
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Vertical Stepper Controls */}
        <div className="hidden sm:flex flex-col items-center gap-2 ml-4 sm:ml-5 z-20">
          <button
            onClick={prevReel}
            aria-label="Previous project"
            className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 active:scale-95 border border-zinc-200 flex items-center justify-center text-zinc-700 hover:text-black transition-all cursor-pointer shadow-sm"
          >
            <ChevronUp className="w-4 h-4" />
          </button>

          <span className="font-mono-code text-[11px] text-zinc-400 font-bold my-0.5">
            {(currentIndex + 1).toString().padStart(2, '0')}
          </span>

          <button
            onClick={nextReel}
            aria-label="Next project"
            className="w-9 h-9 rounded-full bg-zinc-100 hover:bg-zinc-200 active:scale-95 border border-zinc-200 flex items-center justify-center text-zinc-700 hover:text-black transition-all cursor-pointer shadow-sm"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
