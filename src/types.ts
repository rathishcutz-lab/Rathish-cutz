export type PageId = 'home' | 'works' | 'about';

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  client: string;
  year: string;
  duration: string;
  aspectRatio: string;
  role: string;
  synopsis: string;
  tags: string[];
  assetVideoPath: string;      // e.g. '/assets/works-video-1.mp4' (checked first)
  fallbackVideoUrl: string;    // Fallback cinematic clip
  fallbackImageUrl: string;    // High-definition fallback still/poster
  cloudinaryPublicId?: string; // Optional Cloudinary public ID (e.g. 'edits_of_rk/velocity_noir')
  cloudinaryUrl?: string;      // Direct full Cloudinary video delivery URL
  colorGradeStills?: string[];
  metrics?: string;
}

export interface BrandInfo {
  brandName: string;
  creatorName: string;
  title: string;
  subtitle: string;
  location: string;
  status: string;
  bio: string[];
  email: string;
  whatsappNumber?: string;
  instagram: string;
  instagramHandle?: string;
  youtube: string;
  vimeo: string;
  tools: { name: string; level: string; icon: string }[];
  awards: { year: string; title: string; organization: string }[];
}
