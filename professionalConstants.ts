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
export const PROFESSIONAL_EMAIL = "info@wavecrestlegacy.com";
export const PROFESSIONAL_ADDRESS = "8708 Technology Forest Place Ste 175, Houston, TX";

// Company Logos
export const LOGO_LEGACY_GROUP = "/brand/logo-legacy-group.png";
export const LOGO_ACQUISITIONS = "/brand/logo-acquisitions.png";
export const LOGO_HOLDING = "/brand/logo-holding.png";

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
    url: "/photos/keys-handshake.webp",
    width: 1920,
    height: 2880,
    description: "Keys handshake",
  },
  {
    url: "/photos/house-keys-handover.webp",
    width: 1920,
    height: 1280,
    description: "House keys handover",
  },
  {
    url: "/photos/architects-inspecting.webp",
    width: 1920,
    height: 1282,
    description: "Architects inspecting building",
  },
  {
    url: "/photos/badge.png",
    width: 422,
    height: 422,
    description: "Wave Crest Legacy Group badge",
  },
];

export const PROFESSIONAL_SERVICES: ProfessionalService[] = [
  { name: "We Buy Houses", description: "Fast, fair cash offers for your property in any condition" },
  { name: "Quick Closings", description: "Close on your timeline - as fast as 7 days or on your schedule" },
  { name: "No Repairs Needed", description: "Sell your house as-is - no cleaning, repairs, or renovations required" },
];
