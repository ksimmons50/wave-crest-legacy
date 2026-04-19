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

      {/* Hero Section - Org Chart */}
      <section className="relative min-h-screen flex items-center px-6 py-24 md:py-32">
        <div className="max-w-6xl mx-auto w-full text-center">
          {/* Main Heading */}
          <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-black text-[#f5f5f0] tracking-tight mb-20 md:mb-28">
            Wave Crest Legacy Group
          </h1>

          {/* Org Chart Layout */}
          <div className="flex flex-col items-center gap-8 md:gap-12">
            {/* Top Box - Group (Slightly Larger) */}
            <a
              href="#about"
              className="group block w-full max-w-md md:max-w-lg transition-all duration-500 hover:scale-105"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <div className="relative bg-gradient-to-br from-[#1a1f3a] to-[#0f1629] p-8 md:p-10 border-2 border-amber-500/30 hover:border-amber-500/70 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/30">
                {/* Icon */}
                <div className="flex justify-center mb-5">
                  <svg className="w-14 h-14 md:w-16 md:h-16 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                  </svg>
                </div>

                {/* Content */}
                <div className="text-center space-y-3">
                  <h3 className="hero-title text-2xl md:text-3xl font-bold text-[#f5f5f0] tracking-tight">
                    Wave Crest Legacy Group
                  </h3>
                  <p className="body-text text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold">
                    The Foundation
                  </p>
                  <p className="body-text text-sm md:text-base text-[#f5f5f0]/90 leading-relaxed max-w-md mx-auto">
                    The central hub that provides clarity, structure, and systems across every project and entity.
                  </p>
                </div>

                {/* Hover Indicator */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="body-text text-xs text-amber-400 uppercase tracking-[0.2em] font-semibold">
                    Learn More
                  </div>
                </div>
              </div>
            </a>

            {/* Bottom Row - Acquisitions & Holding (Side by Side) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl">
              {/* Acquisitions Box */}
              <a
                href="/acquisitions"
                className="group block transition-all duration-500 hover:scale-105"
              >
                <div className="relative bg-gradient-to-br from-[#1a1f3a] to-[#0f1629] p-7 md:p-9 border-2 border-amber-500/30 hover:border-amber-500/70 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/30 h-full">
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <svg className="w-12 h-12 md:w-14 md:h-14 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-3">
                    <h3 className="hero-title text-xl md:text-2xl font-bold text-[#f5f5f0] tracking-tight">
                      Wave Crest Legacy Acquisitions
                    </h3>
                    <p className="body-text text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold">
                      The Engine
                    </p>
                    <p className="body-text text-sm text-[#f5f5f0]/90 leading-relaxed">
                      Identifying opportunities, structuring deals, and supporting owner-finance pathways.
                    </p>
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="body-text text-xs text-amber-400 uppercase tracking-[0.2em] font-semibold">
                      Learn More
                    </div>
                  </div>
                </div>
              </a>

              {/* Holding Box */}
              <a
                href="/holding"
                className="group block transition-all duration-500 hover:scale-105"
              >
                <div className="relative bg-gradient-to-br from-[#1a1f3a] to-[#0f1629] p-7 md:p-9 border-2 border-amber-500/30 hover:border-amber-500/70 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/30 h-full">
                  {/* Icon */}
                  <div className="flex justify-center mb-4">
                    <svg className="w-12 h-12 md:w-14 md:h-14 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="text-center space-y-3">
                    <h3 className="hero-title text-xl md:text-2xl font-bold text-[#f5f5f0] tracking-tight">
                      Wave Crest Legacy Holding
                    </h3>
                    <p className="body-text text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold">
                      The Anchor
                    </p>
                    <p className="body-text text-sm text-[#f5f5f0]/90 leading-relaxed">
                      Long-term asset management with clean title, organized records, and portfolio stability.
                    </p>
                  </div>

                  {/* Hover Indicator */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="body-text text-xs text-amber-400 uppercase tracking-[0.2em] font-semibold">
                      Learn More
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Our Company Section */}
      <section id="about" className="relative py-24 md:py-32 px-6 bg-[#f5f5f0]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="hero-title text-3xl md:text-5xl font-black text-[#0a0e27] tracking-tight">
            About Our Company
          </h2>
          <p className="body-text text-base md:text-lg text-[#0a0e27]/80 leading-relaxed max-w-3xl mx-auto">
            Wave Crest Legacy Group is the umbrella organization that guides and connects our operating divisions: Acquisitions and Holding. We focus on clarity, structure, and long‑term value creation across every project we touch. Our mission is simple — build strong foundations, make intentional decisions, and create momentum that lasts. Through disciplined acquisitions, thoughtful design, and responsible stewardship, we turn properties into long‑term assets and long‑term assets into legacy.
          </p>
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
