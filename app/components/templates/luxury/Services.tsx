"use client";

import ServiceCard from "./ServiceCard";
import { SERVICES } from "./content/home";

export default function Services() {
  return (
    <section id="services" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <span className="text-xs tracking-[0.4em] uppercase text-primary/60">
            {SERVICES.label}
          </span>
          <h2 className="text-4xl md:text-5xl font-extralight text-foreground tracking-[0.1em] uppercase mt-4">
            {SERVICES.heading}
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mt-8" />
        </div>

        {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICES.items.map((service, index) => (
              <ServiceCard
                key={index}
                name={service.name}
                description={service.description}
                number={String(index + 1).padStart(2, "0")}
              />
            ))}
          </div>
      </div>
    </section>
  );
}
