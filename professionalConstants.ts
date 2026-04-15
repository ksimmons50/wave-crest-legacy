// Professional business constants

export interface ProfessionalImage {
  url: string;
  width: number;
  height: number;
  description: string;
}

export interface ProfessionalService {
  name: string;
  description: string;
}

export const BREEZY_PROFESSIONAL_TOKEN = "caf098fe22e8bbcbee5cfd56e06f4978f9d72fe18807cdff77cfb925fb50";
export const BREEZY_SITE_SETTINGS_TOKEN = "2994f7e13b2a1781c799438cb5b6280200a5d6dc3cc1665f7f07c00a7677";

// Business information
export const PROFESSIONAL_NAME = "Wave Crest Legacy Group, LLC";
export const PROFESSIONAL_PHONE = "+18176463927";
export const PROFESSIONAL_EMAIL = "ksimmons@wavecrestlegacy.com";
export const PROFESSIONAL_ADDRESS = "8708 Technology Forest Place #175, Houston, TX";

// Company Logos
export const LOGO_LEGACY_GROUP = "https://breezy-sites.s3.amazonaws.com/site_images/caf098fe22e8bbcbee5cfd56e06f4978f9d72fe18807cdff77cfb925fb50/7b54a4f3e20880d8bc10c2ba3fa0bf28b5178757814a12406297a60b03cd.png";
export const LOGO_ACQUISITIONS = "https://breezy-sites.s3.amazonaws.com/site_images/caf098fe22e8bbcbee5cfd56e06f4978f9d72fe18807cdff77cfb925fb50/7f46065e03ba672e12c613037b093de508c4301b9139575e11d42b945852.png";
export const LOGO_HOLDING = "https://breezy-sites.s3.amazonaws.com/site_images/caf098fe22e8bbcbee5cfd56e06f4978f9d72fe18807cdff77cfb925fb50/e811d23589f1a76d3c0400022d93b345d4d84b3e93c82fa1ac3c7637a34c.png";

export const PROFESSIONAL_TAGLINE = "Empowering families, investors, and entrepreneurs through clarity, structure, and sustainable real estate solutions";

export const PROFESSIONAL_SOCIAL_LINKS = {
  facebook: '',
  instagram: '',
  x: '',
  linkedin: '',
  youtube: '',
};

// Professional images
export const PROFESSIONAL_IMAGES: ProfessionalImage[] = [
  {
    url: "https://breezy-sites.s3.amazonaws.com/site_images/caf098fe22e8bbcbee5cfd56e06f4978f9d72fe18807cdff77cfb925fb50/e789498ce362721aeda9ff314307ee11ffd9fb9b22e95bf767e6f2aa884c_optimized.webp",
    width: 1920,
    height: 2880,
    description: "Keys handshake",
  },
  {
    url: "https://breezy-sites.s3.amazonaws.com/site_images/caf098fe22e8bbcbee5cfd56e06f4978f9d72fe18807cdff77cfb925fb50/d1dbc2769b177904ae6947b6d8f37e0a6d63e2959022e70bad48f18348a0_optimized.webp",
    width: 1920,
    height: 1280,
    description: "House keys handover",
  },
  {
    url: "https://breezy-sites.s3.amazonaws.com/site_images/caf098fe22e8bbcbee5cfd56e06f4978f9d72fe18807cdff77cfb925fb50/b6e1dbe91b6134146a78b3ec5cebded850e270d5d58e520587d8db841066_optimized.webp",
    width: 1920,
    height: 1282,
    description: "Architects inspecting building",
  },
  {
    url: "https://breezy-sites.s3.amazonaws.com/site_images/caf098fe22e8bbcbee5cfd56e06f4978f9d72fe18807cdff77cfb925fb50/9c35510d3e881067f95522213375daeea35ddc26008e4e5d31bd1d114744.png",
    width: 422,
    height: 422,
    description: "Processing description…",
  },
];

export const PROFESSIONAL_SERVICES: ProfessionalService[] = [
  { name: "We Buy Houses", description: "Fast, fair cash offers for your property in any condition" },
  { name: "Quick Closings", description: "Close on your timeline - as fast as 7 days or on your schedule" },
  { name: "No Repairs Needed", description: "Sell your house as-is - no cleaning, repairs, or renovations required" },
];
