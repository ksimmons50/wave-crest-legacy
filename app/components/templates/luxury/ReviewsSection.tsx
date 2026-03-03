"use client";

import RealReviews from "@/app/components/RealReviews";
import { REVIEWS } from "./content/home";

export default function Reviews() {
  return (
    <section id="reviews" className="py-32 bg-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-xs tracking-[0.4em] uppercase text-primary/60">
            {REVIEWS.label}
          </span>
          <h2 className="text-4xl md:text-5xl font-extralight text-foreground tracking-[0.1em] uppercase mt-4">
            {REVIEWS.heading}
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mt-8" />
        </div>
        <RealReviews />
      </div>
    </section>
  );
}
