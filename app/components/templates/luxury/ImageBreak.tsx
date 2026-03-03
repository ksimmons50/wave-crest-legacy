"use client";

import Image from "next/image";
import { IMAGE_BREAK } from "./content/home";

export default function ImageBreak() {
  return (
    <section className="relative h-[70vh] overflow-hidden">
      <Image
        src={IMAGE_BREAK.image.url}
        alt={IMAGE_BREAK.image.description}
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-foreground/40" />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center px-6">
            <p className="text-muted-foreground text-lg md:text-2xl font-extralight tracking-[0.15em] max-w-2xl leading-relaxed italic">
              &quot;{IMAGE_BREAK.quote}&quot;
            </p>
        </div>
      </div>
    </section>
  );
}
