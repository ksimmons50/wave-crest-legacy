"use client";

import HeroSection from "./HeroSection";
import {
  PROFESSIONAL_NAME,
  PROFESSIONAL_TAGLINE,
} from "@/professionalConstants";
import { HERO } from "./content/home";

export default function Hero() {
  return (
    <HeroSection
      businessName={PROFESSIONAL_NAME}
      tagline={PROFESSIONAL_TAGLINE}
      image={HERO.image}
    />
  );
}
