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

export const BREEZY_PROFESSIONAL_TOKEN = "0761a9c2bc652bba0fa0cc4be219e6cdb1c8a08417e3739ec2eccb5e07e5";
export const BREEZY_SITE_SETTINGS_TOKEN = "0f37b70fe951aeac2c62c11c59fff91d211267808574f9a70e38424a9e35";

// Business information
// TODO(CODING_AGENT): Make sure these are the right values.
export const PROFESSIONAL_NAME = "Breezy & Sons";
export const PROFESSIONAL_PHONE = "+16503918238";
export const PROFESSIONAL_EMAIL = "contact@example.com";
export const PROFESSIONAL_ADDRESS = "123 Main St, City, State 12345";

// TODO(CODING_AGENT): Populate social media links if you know them for this business
// only add a platform link if it was provided to you by the professional
// Remove the TODO comment when you are done even if you don't have all (or any) platforms
// Leave empty string to hide a platform
export const PROFESSIONAL_SOCIAL_LINKS = {
  facebook: '',
  instagram: '',
  x: '',
  linkedin: '',
  youtube: '',
};

// TODO(CODING_AGENT): Update tagline based on the business
export const PROFESSIONAL_TAGLINE = "Quality service you can trust";

// TODO(CODING_AGENT): Update services based on what this business offers
export const PROFESSIONAL_SERVICES: ProfessionalService[] = [
  { name: "Consultation", description: "Expert advice tailored to your needs" },
  { name: "Full Service", description: "End-to-end professional solutions" },
  { name: "Support", description: "Dedicated customer support" },
];

// Professional images
export const PROFESSIONAL_IMAGES: ProfessionalImage[] = [
  {
    url: "https://breezy-sites.s3.amazonaws.com/site_images/ce7ac00d3621ecc3f6ea5e605ae10dccd5c5e2fad35b1ffbb7419a323ebb/33f2f6837aa53b13e222e6266ca7ad76d1c62c1e7d4c3d1ee2439be32bfd.jpg",
    width: 2000,
    height: 1429,
    description: "Couple sharing a tender moment on the beach at sunset, bride in white wedding dress with veil holding bouquet",
  },
  {
    url: "https://breezy-sites.s3.amazonaws.com/site_images/ce7ac00d3621ecc3f6ea5e605ae10dccd5c5e2fad35b1ffbb7419a323ebb/367f8c82bbf94fde2907d2e0fff12451a2d2064f033fa32a661c0775e835.jpg",
    width: 2000,
    height: 1429,
    description: "Happy couple embracing outdoors in winter, wearing warm coats and beanies",
  },
  {
    url: "https://breezy-sites.s3.amazonaws.com/site_images/ce7ac00d3621ecc3f6ea5e605ae10dccd5c5e2fad35b1ffbb7419a323ebb/837e174209ab95943a62fbf9aaca9b1b94e36332ec8cbc5410bfa6426973.jpg",
    width: 2000,
    height: 1429,
    description: "Professional service team working together",
  },
  {
    url: "https://breezy-sites.s3.amazonaws.com/site_images/ce7ac00d3621ecc3f6ea5e605ae10dccd5c5e2fad35b1ffbb7419a323ebb/b6d748ded1b283db66ac7c48581c1f79356ad8d7f4fbbed6ded87beaa644.jpg",
    width: 2000,
    height: 1429,
    description: "Professional service in action",
  },
  {
    url: "https://breezy-sites.s3.amazonaws.com/site_images/ce7ac00d3621ecc3f6ea5e605ae10dccd5c5e2fad35b1ffbb7419a323ebb/11b69b581de6ea7eeae319b63de6ff466f500ac82f307df4aa7bd411f100.jpg",
    width: 2000,
    height: 1429,
    description: "Quality professional work showcase",
  },
];
