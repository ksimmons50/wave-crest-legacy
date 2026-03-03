/**
 * Home page content for the luxury template.
 * All editable text content is centralized here for click-to-edit functionality.
 */

import {
  PROFESSIONAL_IMAGES,
  PROFESSIONAL_SERVICES,
  type ProfessionalImage,
} from "@/professionalConstants";

// =============================================================================
// Navigation
// =============================================================================

export const NAVIGATION = {
  logo: PROFESSIONAL_IMAGES[0] as ProfessionalImage,
};

// =============================================================================
// Hero Section
// =============================================================================

export const HERO = {
  image: PROFESSIONAL_IMAGES[0] as ProfessionalImage,
};

// =============================================================================
// Services Section
// =============================================================================

export const SERVICES = {
  label: "What We Offer",
  heading: "Our Services",
  items: [
    { name: PROFESSIONAL_SERVICES[0]?.name ?? "Signature Service", description: PROFESSIONAL_SERVICES[0]?.description ?? "An introduction to refined excellence" },
    { name: PROFESSIONAL_SERVICES[1]?.name ?? "Premium Experience", description: PROFESSIONAL_SERVICES[1]?.description ?? "Elevated service with meticulous attention to detail" },
    { name: PROFESSIONAL_SERVICES[2]?.name ?? "Bespoke Collection", description: PROFESSIONAL_SERVICES[2]?.description ?? "Tailored entirely to your unique vision" },
  ],
};

// =============================================================================
// Gallery Section
// =============================================================================

export const GALLERY = {
  label: "Portfolio",
  heading: "Our Work",
  images: [
    PROFESSIONAL_IMAGES[0] as ProfessionalImage,
    PROFESSIONAL_IMAGES[1] as ProfessionalImage,
    PROFESSIONAL_IMAGES[2] as ProfessionalImage,
    PROFESSIONAL_IMAGES[0] as ProfessionalImage,
    PROFESSIONAL_IMAGES[1] as ProfessionalImage,
    PROFESSIONAL_IMAGES[2] as ProfessionalImage,
  ],
};

// =============================================================================
// Image Break Section
// =============================================================================

export const IMAGE_BREAK = {
  quote: "Real estate is not just about properties—it's about building lasting wealth and legacy for generations to come.",
  image: PROFESSIONAL_IMAGES[1] as ProfessionalImage,
};

// =============================================================================
// Pricing Section
// =============================================================================

export const PRICING = {
  label: "Investment",
  heading: "Investment Tiers",
  description: "Each tier is designed to meet different investment goals, from individual properties to comprehensive portfolio management.",
  ctaText: "Start Investing",
  consultationCta: {
    prefix: "Ready to discuss your investment strategy? Please",
    linkText: "contact us",
    suffix: "to schedule a consultation.",
  },
  tiers: [
    {
      name: "Foundation",
      description: "Ideal for single property investors",
      price: "$50K",
      unit: "starting at",
      features: [
        "Property analysis & evaluation",
        "Investment strategy consultation",
        "Market research reports",
        "Quarterly portfolio review",
      ],
    },
    {
      name: "Growth",
      description: "For expanding your real estate portfolio",
      price: "$250K",
      unit: "starting at",
      features: [
        "Full portfolio management",
        "Market analysis & acquisition strategy",
        "Monthly performance reports",
        "Dedicated investment advisor",
        "Priority deal access",
      ],
      featured: true,
    },
    {
      name: "Legacy",
      description: "Comprehensive wealth building",
      price: "Custom",
      unit: "quote",
      features: [
        "Full-service portfolio management",
        "Strategic acquisition guidance",
        "Tax optimization planning",
        "Dedicated account manager",
        "VIP network access",
        "Lifetime legacy planning",
      ],
    },
  ],
};

// =============================================================================
// Reviews Section
// =============================================================================

export const REVIEWS = {
  label: "Testimonials",
  heading: "Client Voices",
};

// =============================================================================
// Contact Section
// =============================================================================

export const CONTACT = {
  label: "Get In Touch",
  heading: "Contact Us",
};
