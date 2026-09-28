import { BrandInfo, ProjectItem } from '../types';

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
    id: 'velocity-noir',
    title: 'VELOCITY / NOIR',
    category: 'Commercial',
    client: 'Apex Automotive & Nocturne',
    year: '2025',
    duration: '01:45',
    aspectRatio: '2.39:1',
    role: 'Lead Editor & Sound Design',
    synopsis: 'A heart-pounding nocturnal drive captured through anamorphic lenses. Cut on the pulse of an escalating bass synth, blending raw engine foley with razor-sharp match cuts.',
    tags: ['Automotive', 'Sound Design', 'High Contrast', 'Match Cuts'],
    assetVideoPath: '/assets/works-video-1.mp4',
    fallbackVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop',
    metrics: '2.4M Views'
  },
  {
    id: 'echoes-of-solitude',
    title: 'ECHOES OF SOLITUDE',
    category: 'Narrative',
    client: 'Mirage Pictures',
    year: '2025',
    duration: '04:12',
    aspectRatio: '1.85:1',
    role: 'Offline Editor & Colorist',
    synopsis: 'A meditative psychological drama set in coastal mist. Uses extended takes and jarring jump cuts to mirror the protagonist’s unraveling perception of time.',
    tags: ['Narrative', 'Psychological', 'Kodak 5219 Emulation', 'Pacing'],
    assetVideoPath: '/assets/works-video-2.mp4',
    fallbackVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1518173946687-a4c8a383392e?q=80&w=1600&auto=format&fit=crop',
    metrics: 'Festival Official Selection'
  },
  {
    id: 'neon-rebirth',
    title: 'NEON REBIRTH: LIVE VIBE',
    category: 'Music Video',
    client: 'Subterranean Records',
    year: '2024',
    duration: '03:28',
    aspectRatio: '16:9',
    role: 'Editor & VFX Compositing',
    synopsis: 'Hyper-kinetic music video cut at 140 BPM with glitch transitions, retro CRT tape distortion, and speed ramps synced to 808 percussion.',
    tags: ['Music Video', 'Kinetic', 'Speed Ramps', 'Beat Sync'],
    assetVideoPath: '/assets/works-video-3.mp4',
    fallbackVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1600&auto=format&fit=crop',
    metrics: '5.1M Streams'
  },
  {
    id: 'lumina-haute',
    title: 'LUMINA SS/25 CAMPAIGN',
    category: 'Fashion Reel',
    client: 'Lumina Atelier Paris',
    year: '2025',
    duration: '00:58',
    aspectRatio: '9:16',
    role: 'Creative Editor & Sound Sync',
    synopsis: 'Vertical editorial cut crafted for high-end fashion houses. Seamless morph wipes, silk fabric velocity, and textured ASMR sound layers.',
    tags: ['Vertical Edit', 'Fashion', 'Luxury', 'Morph Cuts'],
    assetVideoPath: '/assets/works-video-4.mp4',
    fallbackVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1600&auto=format&fit=crop',
    metrics: 'Global Social Launch'
  },
  {
    id: 'obsidian-titan',
    title: 'CHRONO / OBSIDIAN',
    category: 'Commercial',
    client: 'Krono Horology',
    year: '2024',
    duration: '01:15',
    aspectRatio: '2.39:1',
    role: 'Lead Post Production & Micro-Macro Cut',
    synopsis: 'Macro horology craftsmanship contrasted with expansive alpine landscapes. Precision split screens and rhythmically engineered tick-tock pacing.',
    tags: ['Commercial', 'Macro Cinema', 'Precision Audio', 'Clean Cut'],
    assetVideoPath: '/assets/works-video-5.mp4',
    fallbackVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    fallbackImageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?q=80&w=1600&auto=format&fit=crop',
    metrics: 'Brand Campaign Award'
  }
];

export const FALLBACK_BACKGROUNDS = {
  home: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2000&auto=format&fit=crop', // Cinematic dark camera lens / shoot aesthetic
  about: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=2000&auto=format&fit=crop', // Dark textured atmosphere
  works: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=2000&auto=format&fit=crop', // Film editing monitor glow
};
