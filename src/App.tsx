import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PageId, ProjectItem } from './types';
import { PROJECTS } from './data/portfolioData';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { WorksPage } from './components/WorksPage';
import { MorphTransition } from './components/MorphTransition';
import { VideoModal } from './components/VideoModal';
import { InquireModal } from './components/InquireModal';
import { CustomCursor } from './components/CustomCursor';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [targetPage, setTargetPage] = useState<PageId | null>(null);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isInquireOpen, setIsInquireOpen] = useState<boolean>(false);

  // Showreel project configuration
  const showreelProject: ProjectItem = {
    id: 'official-showreel',
    title: 'RATHISHCUTZ // OFFICIAL 2026 REEL',
    category: 'Commercial',
    client: 'Selected Directorial Cuts',
    year: '2026',
    duration: '01:12',
    aspectRatio: '2.39:1',
    role: 'Editor & Sound Designer',
    synopsis: 'Kinetic compilation of commercial, narrative, and music video cuts conformed by Rathish Kumar. Featuring dynamic match cuts, sound pacing, and deep contrast color grades.',
    tags: ['Showreel', 'Kinetic', 'Sound Mix', 'DaVinci Resolve'],
    assetVideoPath: '/assets/works-video-reel.mp4',
    fallbackVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1600&auto=format&fit=crop',
    metrics: 'Official Reel'
  };

  // Trigger GSAP page morph animation
  const handleNavigate = useCallback(
    (page: PageId) => {
      if (isAnimating || page === currentPage) return;
      setTargetPage(page);
      setIsAnimating(true);
    },
    [isAnimating, currentPage]
  );

  // Transition midpoint callback: swap page under the covered curtain
  const handleTransitionMidpoint = () => {
    if (targetPage) {
      setCurrentPage(targetPage);
    }
  };

  // Transition complete callback: unlock navigation
  const handleTransitionComplete = () => {
    setIsAnimating(false);
    setTargetPage(null);
  };

  // Scroll to navigate with morph transition (no scrolling screens)
  const lastWheelTime = useRef<number>(0);
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating || selectedProject || isInquireOpen) return;
      const now = Date.now();
      if (now - lastWheelTime.current < 900) return;

      if (e.deltaY > 30) {
        // Scrolling down -> morph to works
        if (currentPage === 'home') {
          lastWheelTime.current = now;
          handleNavigate('works');
        }
      } else if (e.deltaY < -30) {
        // Scrolling up -> morph to home
        if (currentPage === 'works') {
          lastWheelTime.current = now;
          handleNavigate('home');
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [isAnimating, selectedProject, isInquireOpen, currentPage, handleNavigate]);

  // Global Touch Swipe gestures for seamless mobile navigation
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null || isAnimating) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Vertical swipe takes priority for scroll-like behavior
    if (Math.abs(diffY) > 50 && Math.abs(diffY) > Math.abs(diffX)) {
      if (diffY > 0 && currentPage === 'home') {
        // Swiped up -> morph to works
        handleNavigate('works');
      } else if (diffY < 0 && currentPage === 'works') {
        // Swiped down -> morph to home
        handleNavigate('home');
      }
    } else if (Math.abs(diffX) > 60) {
      if (diffX > 0 && currentPage === 'home') {
        handleNavigate('works');
      } else if (diffX < 0 && currentPage === 'works') {
        handleNavigate('home');
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating || selectedProject || isInquireOpen) return;
      if (e.key === '1') handleNavigate('home');
      if (e.key === '2') handleNavigate('works');
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        if (currentPage === 'home') handleNavigate('works');
      }
      if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (currentPage === 'works') handleNavigate('home');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isAnimating, selectedProject, isInquireOpen, currentPage, handleNavigate]);

  return (
    <div
      id="app-viewport-root"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 w-full h-full overflow-hidden bg-black text-white select-none font-sans"
    >
      {/* Custom magnetic follower cursor (desktop only) */}
      <CustomCursor />

      {/* Main Top Header Navigation & Mobile Bottom Dock */}
      <Navigation
        currentPage={currentPage}
        onNavigate={handleNavigate}
        isAnimating={isAnimating}
        onOpenInquire={() => setIsInquireOpen(true)}
      />

      {/* Main Single Section Container */}
      <main id="single-section-stage" className="w-full h-full relative overflow-hidden">
        {currentPage === 'home' && (
          <HomePage
            isActive={currentPage === 'home'}
            onNavigate={handleNavigate}
            onOpenReel={() => setSelectedProject(showreelProject)}
            onOpenInquire={() => setIsInquireOpen(true)}
          />
        )}

        {currentPage === 'works' && (
          <WorksPage
            isActive={currentPage === 'works'}
            onNavigate={handleNavigate}
            onSelectProject={(project) => setSelectedProject(project)}
          />
        )}
      </main>

      {/* GSAP Morphing Transition Curtain */}
      <MorphTransition
        isAnimating={isAnimating}
        targetPage={targetPage}
        onTransitionMidpoint={handleTransitionMidpoint}
        onTransitionComplete={handleTransitionComplete}
      />

      {/* Cinematic Video Player Modal (Supports user assets + seamless fallback) */}
      <VideoModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />

      {/* Direct Inquire & Commission Modal */}
      <InquireModal
        isOpen={isInquireOpen}
        onClose={() => setIsInquireOpen(false)}
      />
    </div>
  );
}
