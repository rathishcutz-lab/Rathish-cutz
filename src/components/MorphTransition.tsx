import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PageId } from '../types';

interface MorphTransitionProps {
  isAnimating: boolean;
  targetPage: PageId | null;
  onTransitionMidpoint: () => void;
  onTransitionComplete: () => void;
}

export const MorphTransition: React.FC<MorphTransitionProps> = ({
  isAnimating,
  onTransitionMidpoint,
  onTransitionComplete,
}) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!isAnimating || !overlayRef.current || !pathRef.current) return;

    const overlay = overlayRef.current;
    const path = pathRef.current;

    // Reset overlay visibility
    overlay.style.pointerEvents = 'auto';
    overlay.style.visibility = 'visible';

    // SVG path coordinates (viewBox="0 0 100 100" preserveAspectRatio="none")
    // Initial: Flat line at top
    const startPath = 'M 0 0 V 0 Q 50 0 100 0 V 0 Z';
    // Wave down: curved belly downward
    const curveInPath = 'M 0 0 V 70 Q 50 120 100 70 V 0 Z';
    // Full screen fill
    const fullPath = 'M 0 0 V 100 Q 50 100 100 100 V 0 Z';
    // Exit path
    const finalExitPath = 'M 0 100 V 100 Q 50 100 100 100 V 100 Z';

    // Set initial
    path.setAttribute('d', startPath);

    if (timelineRef.current) {
      timelineRef.current.kill();
    }

    const tl = gsap.timeline({
      onComplete: () => {
        overlay.style.pointerEvents = 'none';
        overlay.style.visibility = 'hidden';
        onTransitionComplete();
      }
    });

    timelineRef.current = tl;

    // 1. Entrance morph: Wipe down with curve
    tl.set(overlay, { opacity: 1 })
      .to(path, {
        duration: 0.38,
        ease: 'power3.in',
        attr: { d: curveInPath },
      })
      .to(path, {
        duration: 0.28,
        ease: 'power2.out',
        attr: { d: fullPath },
      })
      // Midpoint: screen is completely covered -> switch page immediately without text
      .add(() => {
        onTransitionMidpoint();
      })
      // 2. Exit morph: curve leaves downward cleanly
      .to(path, {
        duration: 0.38,
        ease: 'power3.in',
        attr: { d: 'M 0 60 V 100 Q 50 120 100 60 V 100 Z' },
      })
      .to(path, {
        duration: 0.28,
        ease: 'power2.out',
        attr: { d: finalExitPath },
      });

    return () => {
      tl.kill();
    };
  }, [isAnimating, onTransitionMidpoint, onTransitionComplete]);

  return (
    <div
      ref={overlayRef}
      id="gsap-morph-curtain"
      className="fixed inset-0 z-50 pointer-events-none invisible flex items-center justify-center overflow-hidden"
    >
      <svg
        className="absolute inset-0 w-full h-full fill-[#0a0a0d]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path
          ref={pathRef}
          d="M 0 0 V 0 Q 50 0 100 0 V 0 Z"
          fill="#0c0c10"
        />
      </svg>
    </div>
  );
};
