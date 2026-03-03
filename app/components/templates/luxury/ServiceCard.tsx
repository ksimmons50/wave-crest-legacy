import React from "react";

interface ServiceCardProps {
  name: string;
  description: string;
  number?: string;
}

export default function ServiceCard({
  name,
  description,
  number = "01",
}: ServiceCardProps) {
  return (
    <div className="group relative p-8 md:p-12 border border-border hover:border-primary/30 transition-all duration-500 bg-foreground/50 hover:bg-foreground/80">
      {/* Number accent */}
      <span className="absolute top-6 right-6 text-6xl font-extralight text-background/20 group-hover:text-primary/30 transition-colors duration-500">
        {number}
      </span>

      <div className="relative">
        {/* Subtle line accent */}
        <div className="w-8 h-px bg-primary/40 mb-6 group-hover:w-12 transition-all duration-500" />

        <h3 className="text-xl font-extralight text-background tracking-[0.1em] uppercase mb-4 group-hover:text-primary transition-colors duration-500">
          {name}
        </h3>

        <p className="text-background/70 leading-relaxed text-sm tracking-wide">
          {description}
        </p>
      </div>
    </div>
  );
}
