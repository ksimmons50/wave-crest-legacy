"use client";

import React from "react";
import Image from "next/image";
import { ProfessionalImage } from "@/professionalConstants";

interface HeroSectionProps {
  businessName: string;
  tagline: string;
  image: ProfessionalImage;
  ctaText?: string;
  ctaHref?: string;
}

export default function HeroSection({
  businessName,
  tagline,
  image,
  ctaText = "Discover",
  ctaHref = "#services",
}: HeroSectionProps) {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-foreground">
      {/* Background Image with Ken Burns effect */}
      <div className="absolute inset-0 animate-ken-burns">
        <Image
          src={image.url}
          alt={image.description}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Gradient overlays for cinematic effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/20 to-foreground/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-transparent to-foreground/40" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main title */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extralight text-background tracking-[0.15em] uppercase leading-none">
            {businessName}
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-background/80 font-light tracking-[0.1em] max-w-xl mx-auto leading-relaxed">
            {tagline}
          </p>

          {/* CTA */}
          <div className="pt-8">
            <a
              href={ctaHref}
              className="group inline-flex items-center gap-4 text-background/70 text-sm tracking-[0.3em] uppercase hover:text-background transition-colors duration-500"
            >
              <span className="w-12 h-px bg-background/30 group-hover:w-20 group-hover:bg-primary/60 transition-all duration-500" />
              {ctaText}
              <span className="w-12 h-px bg-background/30 group-hover:w-20 group-hover:bg-primary/60 transition-all duration-500" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3 text-background/70">
          <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-background/40 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
