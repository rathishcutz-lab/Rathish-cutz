import { BrandInfo, ProjectItem } from '../types';

export const CLOUDINARY_CLOUD_NAME = (import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string | undefined)?.trim() || 'dpdpjs3iu';

/**
 * Builds a fast, auto-optimised Cloudinary video delivery URL if cloud name is provided.
 */
export const buildCloudinaryVideoUrl = (publicId: string): string => {
  const cleanId = publicId.replace(/^\/+/, '');
  const cloud = CLOUDINARY_CLOUD_NAME || 'dpdpjs3iu';
  return `https://res.cloudinary.com/${cloud}/video/upload/q_auto,f_auto/${cleanId}`;
};

export const BRAND_INFO: BrandInfo = {
  brandName: 'edits.of.rk',
  creatorName: 'RATHISH KUMAR',
  title: 'Video Editor & Visual Storyteller',
  subtitle: 'Clean Cuts • Punchy Sound • Engaging Pacing',
  location: 'Chennai / Global Remote',
  status: 'Available for Commission & Video Projects',
  bio: [
    "Hey, I'm Rathish — a video editor who loves turning raw footage into engaging stories. From fast-paced reels and commercial ads to music videos, I focus on clean cuts, punchy sound design, and pacing that keeps people hooked.",
    "I work with creators, brands, and directors to deliver polished videos that stand out.",
    "If you have footage you want to bring to life, let's connect and make something awesome."
  ],
  whatsappNumber: '9677265861',
  email: 'rathishcutz@gmail.com',
  instagram: 'https://instagram.com/edits.of.rk',
  instagramHandle: '@edits.of.rk',
  youtube: 'https://youtube.com/@edits.of.rk',
  vimeo: 'https://vimeo.com/edits.of.rk',
  tools: [
    { name: 'DaVinci Resolve Studio', level: 'Mastery / Advanced Color', icon: 'Film' },
    { name: 'Adobe Premiere Pro', level: 'Primary NLE / Multi-cam', icon: 'Scissors' },
    { name: 'Adobe After Effects', level: 'Motion Graphics / Cleanups', icon: 'Layers' },
    { name: 'Sound Design & Mix', level: 'Foley, Stereo & 5.1 Stems', icon: 'Volume2' },
    { name: 'Avid Media Composer', level: 'Feature / Long-form Conform', icon: 'Tv' },
  ],
  awards: [
    { year: '2025', title: 'Best Commercial Editing', organization: 'Independent Film & Ad Awards' },
    { year: '2024', title: 'Outstanding Music Video Cut', organization: 'Chennai Indie Collective' },
    { year: '2023', title: 'Official Selection (Short Cut)', organization: 'Bengaluru International Film Festival' },
  ]
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'dragon-opening-day',
    title: 'DRAGON / OPENING DAY',
    category: 'Celebrity Reel',
    client: 'Dragon Movie Campaign',
    year: '2025',
    duration: '00:45',
    aspectRatio: '9:16',
    role: 'Lead Editor & Color',
    synopsis: 'High-octane opening day celebratory reel featuring punchy cuts, rhythmic beat-matching, and crowd energy.',
    tags: ['Celebrity Reel', 'Opening Day', 'Fast Cuts', 'Sound Sync'],
    assetVideoPath: '/assets/works-video-1.mp4',
    cloudinaryPublicId: 'DRAGON_OPENING_DAY_FINAL',
    cloudinaryUrl: 'https://res.cloudinary.com/dpdpjs3iu/video/upload/v1789364138/DRAGON_OPENING_DAY_FINAL.mp4',
    fallbackVideoUrl: 'https://res.cloudinary.com/dpdpjs3iu/video/upload/v1789364138/DRAGON_OPENING_DAY_FINAL.mp4',
    fallbackImageUrl: 'https://res.cloudinary.com/dpdpjs3iu/video/upload/so_1,q_auto,f_auto/DRAGON_OPENING_DAY_FINAL.jpg',
    metrics: 'Viral Campaign Launch'
  },
  {
    id: 'celebrity-reel-mani',
    title: 'CELEBRITY REEL / MANI',
    category: 'Celebrity Reel',
    client: 'Mani & Creative Team',
    year: '2025',
    duration: '00:38',
    aspectRatio: '9:16',
    role: 'Editor & Motion Grade',
    synopsis: 'Dynamic celebrity reel with seamless transitions, audio punch, and striking cinematic color grade.',
    tags: ['Celebrity', 'Portrait', 'Transitions', 'Color Grade'],
    assetVideoPath: '/assets/works-video-2.mp4',
    cloudinaryPublicId: 'CELEBRITY_REEL_MANI',
    cloudinaryUrl: 'https://res.cloudinary.com/dpdpjs3iu/video/upload/v1789364135/CELEBRITY_REEL_MANI.mp4',
    fallbackVideoUrl: 'https://res.cloudinary.com/dpdpjs3iu/video/upload/v1789364135/CELEBRITY_REEL_MANI.mp4',
    fallbackImageUrl: 'https://res.cloudinary.com/dpdpjs3iu/video/upload/so_1,q_auto,f_auto/CELEBRITY_REEL_MANI.jpg',
    metrics: 'Social Release'
  },
  {
    id: 'marshal-poojai',
    title: 'MARSHAL / POOJAI CEREMONY',
    category: 'Cinema Launch',
    client: 'Marshal Production Team',
    year: '2025',
    duration: '01:10',
    aspectRatio: '9:16',
    role: 'Editor & Audio Mastering',
    synopsis: 'Traditional auspicious launch ceremony cut into an engaging cinematic highlight reel.',
    tags: ['Cinema Launch', 'Poojai', 'Atmospheric', 'Highlight Cut'],
    assetVideoPath: '/assets/works-video-3.mp4',
    cloudinaryPublicId: 'MARSHAL_POOJAI',
    cloudinaryUrl: 'https://res.cloudinary.com/dpdpjs3iu/video/upload/v1789364132/MARSHAL_POOJAI.mp4',
    fallbackVideoUrl: 'https://res.cloudinary.com/dpdpjs3iu/video/upload/v1789364132/MARSHAL_POOJAI.mp4',
    fallbackImageUrl: 'https://res.cloudinary.com/dpdpjs3iu/video/upload/so_1,q_auto,f_auto/MARSHAL_POOJAI.jpg',
    metrics: 'Official Ceremony Video'
  },
  {
    id: 'karthi-marshal-pooja',
    title: 'KARTHI / MARSHAL POOJA',
    category: 'Celebrity Spotlight',
    client: 'Marshal Movie Launch',
    year: '2025',
    duration: '00:55',
    aspectRatio: '9:16',
    role: 'Lead Video Editor',
    synopsis: 'Special celebrity spotlight cut capturing actor Karthi at the Marshal Pooja event.',
    tags: ['Karthi', 'Celebrity Spotlight', 'Event Cut', 'Engaging'],
    assetVideoPath: '/assets/works-video-4.mp4',
    cloudinaryPublicId: 'KARTHI_MARSHAL_POOJA',
    cloudinaryUrl: 'https://res.cloudinary.com/dpdpjs3iu/video/upload/v1789364125/KARTHI_MARSHAL_POOJA.mp4',
    fallbackVideoUrl: 'https://res.cloudinary.com/dpdpjs3iu/video/upload/v1789364125/KARTHI_MARSHAL_POOJA.mp4',
    fallbackImageUrl: 'https://res.cloudinary.com/dpdpjs3iu/video/upload/so_1,q_auto,f_auto/KARTHI_MARSHAL_POOJA.jpg',
    metrics: 'Star Spotlight Feature'
  },
  {
    id: 'vishal-actor',
    title: 'VISHAL ACTOR / SPOTLIGHT',
    category: 'Feature Interview',
    client: 'Media & Entertainment',
    year: '2024',
    duration: '01:20',
    aspectRatio: '16:9',
    role: 'Lead Post & Audio Mix',
    synopsis: 'Polished feature interview cut of Actor Vishal with focused pacing and crisp dialogue audio.',
    tags: ['Vishal', 'Actor Spotlight', 'Cinema', 'Clean Sound'],
    assetVideoPath: '/assets/works-video-5.mp4',
    cloudinaryPublicId: 'VISHAL_ACTOR',
    cloudinaryUrl: 'https://res.cloudinary.com/dpdpjs3iu/video/upload/v1789364124/VISHAL_ACTOR.mp4',
    fallbackVideoUrl: 'https://res.cloudinary.com/dpdpjs3iu/video/upload/v1789364124/VISHAL_ACTOR.mp4',
    fallbackImageUrl: 'https://res.cloudinary.com/dpdpjs3iu/video/upload/so_1,q_auto,f_auto/VISHAL_ACTOR.jpg',
    metrics: 'Exclusive Interview Cut'
  }
];

export const FALLBACK_BACKGROUNDS = {
  home: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop', // Cinematic dark camera lens / shoot aesthetic
  about: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2000&auto=format&fit=crop', // Dark textured atmosphere
  works: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2000&auto=format&fit=crop', // Film editing monitor glow
};
