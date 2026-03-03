"use client";

import React from "react";
import { Check } from "lucide-react";
import { PRICING } from "./content/home";

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <span className="text-xs tracking-[0.4em] uppercase text-primary/60">
            {PRICING.label}
          </span>
          <h2 className="text-4xl md:text-5xl font-extralight text-foreground tracking-[0.1em] uppercase mt-4">
            {PRICING.heading}
          </h2>
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mt-8" />
            <p className="text-muted-foreground mt-8 max-w-2xl mx-auto leading-relaxed tracking-wide">
              {PRICING.description}
            </p>
        </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRICING.tiers.map((tier, index) => (
              <div
                key={index}
                className={`group relative p-8 md:p-10 transition-all duration-500 flex flex-col ${
                  tier.featured
                    ? "bg-gradient-to-b from-primary/10 to-transparent border border-primary/30"
                    : "border border-border hover:border-primary/30 bg-foreground/50 hover:bg-foreground/80"
                }`}
              >
                {tier.featured && (
                  <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
                )}

                {/* Subtle line accent */}
                <div
                  className={`w-8 h-px mb-8 transition-all duration-500 ${
                    tier.featured
                      ? "bg-primary/60 w-12"
                      : "bg-primary/40 group-hover:w-12"
                  }`}
                />

                <div className="mb-8">
                  <h3
                    className={`text-xl font-extralight tracking-[0.1em] uppercase mb-3 transition-colors duration-500 ${
                      tier.featured ? "text-primary" : "text-background group-hover:text-primary"
                    }`}
                  >
                    {tier.name}
                  </h3>
                  <p className={`text-sm tracking-wide ${tier.featured ? "text-muted-foreground" : "text-background/70"}`}>{tier.description}</p>
                </div>

                <div className="mb-8">
                  <p className={`text-xs uppercase tracking-widest mb-2 ${tier.featured ? "text-muted-foreground" : "text-background/60"}`}>{tier.unit}</p>
                  <span
                    className={`text-4xl font-extralight ${
                      tier.featured ? "text-primary" : "text-background"
                    }`}
                  >
                    {tier.price}
                  </span>
                </div>

                <ul className="space-y-4 mb-10 flex-1">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check
                        className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          tier.featured ? "text-primary" : "text-primary/60"
                        }`}
                      />
                      <span className={`text-sm tracking-wide ${tier.featured ? "text-muted-foreground" : "text-background/70"}`}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className={`block w-full text-center py-4 text-xs tracking-[0.2em] uppercase transition-all duration-500 mt-auto ${
                    tier.featured
                      ? "bg-primary text-foreground hover:bg-primary"
                      : "border border-border text-background hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {PRICING.ctaText}
                </a>
              </div>
            ))}
          </div>

        <div className="mt-20 text-center">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent mx-auto mb-8" />
            <p className="text-muted-foreground tracking-wide">
              {PRICING.consultationCta.prefix}{" "}
              <a href="#contact" className="text-primary/80 hover:text-primary transition-colors">
                {PRICING.consultationCta.linkText}
              </a>{" "}
              {PRICING.consultationCta.suffix}
            </p>
        </div>
      </div>
    </section>
  );
}
