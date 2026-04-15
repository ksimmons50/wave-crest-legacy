"use client";

import Image from "next/image";
import { PROFESSIONAL_IMAGES, LOGO_LEGACY_GROUP } from "@/professionalConstants";
import WaveCrestEcosystem from "@/app/components/WaveCrestEcosystem";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0e27]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;700&display=swap');

        :root {
          --primary: #0a0e27;
          --secondary: #1a1f3a;
          --accent-gold: #d4af37;
          --accent-warm: #e8d4b0;
          --text-light: #f5f5f0;
          --text-muted: #a8a29e;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .body-text {
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 py-32">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Logo */}
          <div>
            <Image
              src={LOGO_LEGACY_GROUP}
              alt="Wave Crest Legacy Group"
              width={300}
              height={100}
              className="h-20 w-auto mx-auto mb-16"
              priority
            />
          </div>

          {/* Main Heading */}
          <h1 className="hero-title text-5xl md:text-7xl font-black text-[#f5f5f0] tracking-tight">
            Clarity. Structure. Momentum.
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-[#a8a29e] body-text max-w-3xl mx-auto leading-relaxed">
            Wave Crest helps entrepreneurs, investors, and families turn ideas into organized, investor-ready systems.
          </p>

          {/* CTA */}
          <div className="pt-8">
            <a
              href="/contact"
              className="inline-block px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-[#0a0e27] font-bold body-text text-lg hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300"
            >
              Start Your Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Wave Crest Ecosystem */}
      <WaveCrestEcosystem />

      {/* Final CTA */}
      <section className="relative py-32 px-6 bg-[#0a0e27]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0]">
            Let's Build Your Next Chapter
          </h2>
          <p className="body-text text-xl text-[#a8a29e] max-w-2xl mx-auto">
            Book a consultation and experience clarity, structure, and momentum in action.
          </p>
          <div className="pt-4">
            <a
              href="/contact"
              className="inline-block px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-[#0a0e27] font-bold body-text text-lg hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300"
            >
              Start Your Consultation
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
