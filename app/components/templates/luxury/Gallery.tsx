"use client";

import CurvedGallery from "./CurvedGallery";
import { GALLERY } from "./content/home";

export default function Gallery() {
  return (
    <section className="py-20 bg-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.4em] uppercase text-primary/60">
            {GALLERY.label}
          </span>
          <h2 className="text-4xl md:text-5xl font-extralight text-foreground tracking-[0.1em] uppercase mt-4">
            {GALLERY.heading}
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mt-8" />
        </div>
      </div>

      <CurvedGallery images={GALLERY.images} />
    </section>
  );
}
