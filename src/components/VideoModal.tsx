import React, { useState, useRef, useEffect } from 'react';
import { X, Play, Pause, Volume2, VolumeX, Maximize, AlertCircle, CheckCircle2 } from 'lucide-react';
import { ProjectItem } from '../types';

interface VideoModalProps {
  project: ProjectItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ project, isOpen, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [durationTime, setDurationTime] = useState('00:00');
  const [videoSrc, setVideoSrc] = useState<string>('');
  const [isUsingFallback, setIsUsingFallback] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen && project) {
      // First attempt to load user's custom asset path
      setVideoSrc(project.assetVideoPath);
      setIsUsingFallback(false);
      setIsPlaying(true);
      setProgress(0);
    } else {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }
  }, [isOpen, project]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isPlaying]);

  if (!isOpen || !project) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const toggleFullscreen = () => {
    if (!videoRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      videoRef.current.requestFullscreen().catch(() => {});
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const current = videoRef.current.currentTime;
    const total = videoRef.current.duration || 1;
    setProgress((current / total) * 100);

    const curMins = Math.floor(current / 60).toString().padStart(2, '0');
    const curSecs = Math.floor(current % 60).toString().padStart(2, '0');
    setCurrentTime(`${curMins}:${curSecs}`);

    if (videoRef.current.duration) {
      const durMins = Math.floor(videoRef.current.duration / 60).toString().padStart(2, '0');
      const durSecs = Math.floor(videoRef.current.duration % 60).toString().padStart(2, '0');
      setDurationTime(`${durMins}:${durSecs}`);
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = clickX / rect.width;
    videoRef.current.currentTime = ratio * (videoRef.current.duration || 1);
  };

  // If local /assets/... file is not yet uploaded, seamlessly switch to fallback sample video
  const handleVideoError = () => {
    if (!isUsingFallback && project.fallbackVideoUrl) {
      console.log(`Asset ${project.assetVideoPath} not found. Switched to fallback video.`);
      setIsUsingFallback(true);
      setVideoSrc(project.fallbackVideoUrl);
    }
  };

  return (
    <div
      id="video-player-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn select-none"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl bg-[#0e0e12] border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#121216]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#e5484d] animate-pulse" />
            <div>
              <h3 className="font-display text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                {project.title}
              </h3>
              <p className="font-mono-code text-[10px] text-[#8e8e99]">
                {project.client} • {project.aspectRatio} • {project.category}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Status of asset */}
            <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono-code text-[#a1a1aa]">
              {isUsingFallback ? (
                <>
                  <AlertCircle className="w-3 h-3 text-amber-400" />
                  <span>PREVIEW FALLBACK</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>LOCAL ASSET</span>
                </>
              )}
            </div>

            <button
              id="close-video-modal-btn"
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Canvas Container */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden">
          <video
            ref={videoRef}
            src={videoSrc}
            poster={project.fallbackImageUrl}
            autoPlay
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onError={handleVideoError}
            onEnded={() => setIsPlaying(false)}
            onClick={togglePlay}
            className="w-full h-full object-contain cursor-pointer"
          />

          {/* Large Center Play Overlay if Paused */}
          {!isPlaying && (
            <div
              onClick={togglePlay}
              className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full bg-white/90 text-black flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                <Play className="w-7 h-7 fill-current ml-1" />
              </div>
            </div>
          )}
        </div>

        {/* Custom Video Control Bar */}
        <div className="p-3 sm:p-4 bg-[#0e0e12] border-t border-white/10 space-y-2">
          {/* Progress scrubber */}
          <div
            onClick={handleSeek}
            className="w-full h-1.5 bg-white/15 hover:h-2.5 rounded-full cursor-pointer transition-all duration-150 relative overflow-hidden"
          >
            <div
              className="h-full bg-[#e5484d] rounded-full transition-all duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs font-mono-code text-[#a1a1aa] pt-1">
            <div className="flex items-center gap-3">
              <button
                onClick={togglePlay}
                className="text-white hover:text-[#e5484d] transition-colors p-1"
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>

              <button
                onClick={toggleMute}
                className="text-white hover:text-[#e5484d] transition-colors p-1"
                aria-label={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>

              <span className="text-[11px] tracking-wider text-white">
                {currentTime} / {durationTime || project.duration}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden sm:inline text-[10px] text-[#71717a]">
                ROLE: {project.role}
              </span>
              <button
                onClick={toggleFullscreen}
                className="text-white hover:text-[#e5484d] transition-colors p-1"
                aria-label="Fullscreen"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Subtle note about asset replacement */}
        <div className="px-4 py-2 bg-[#09090b] border-t border-white/5 flex items-center justify-between text-[10px] font-mono-code text-[#71717a]">
          <span>Path: {project.assetVideoPath}</span>
          <span>Press [Space] to Pause • [ESC] to Exit</span>
        </div>
      </div>
    </div>
  );
};
