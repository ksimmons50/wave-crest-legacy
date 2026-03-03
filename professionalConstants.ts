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
export const PROFESSIONAL_PHONE = "(555) 123-4567";
export const PROFESSIONAL_EMAIL = "contact@example.com";
export const PROFESSIONAL_ADDRESS = "Houston, TX, USA";

// TODO(CODING_AGENT): Update tagline based on the business
export const PROFESSIONAL_TAGLINE = "Quality service you can trust";

// TODO(CODING_AGENT): Populate social media links if you know them for this business
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
];

// TODO(CODING_AGENT): Update services based on what this business offers
export const PROFESSIONAL_SERVICES: ProfessionalService[] = [
  { name: "Consultation", description: "Expert advice tailored to your needs" },
  { name: "Full Service", description: "End-to-end professional solutions" },
  { name: "Support", description: "Dedicated customer support" },
];
