"use client";

import Image from "next/image";
import { PROFESSIONAL_IMAGES, LOGO_LEGACY_GROUP } from "@/professionalConstants";
import { Layers, TrendingUp, Anchor } from "lucide-react";

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
                  <Layers className="w-14 h-14 md:w-16 md:h-16 text-amber-400" strokeWidth={1.5} />
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

                  {/* Services List */}
                  <div className="border-t border-amber-500/10 pt-4 mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-w-lg mx-auto">
                      {["Business Clarity & Documentation", "Brand Identity & Messaging", "Mentorship & Strategic Guidance", "Investor-Ready Systems"].map((service, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-left">
                          <div className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0" />
                          <span className="body-text text-xs text-[#a8a29e]">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>
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
                    <TrendingUp className="w-12 h-12 md:w-14 md:h-14 text-amber-400" strokeWidth={1.5} />
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

                    {/* Services List */}
                    <div className="border-t border-amber-500/10 pt-4 mt-4">
                      <div className="grid grid-cols-1 gap-2">
                        {["Real Estate Due Diligence", "Market Studies & Analysis", "Deal Structuring", "Owner-Finance Pathways"].map((service, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-left">
                            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0" />
                            <span className="body-text text-xs text-[#a8a29e]">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
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
                    <Anchor className="w-12 h-12 md:w-14 md:h-14 text-amber-400" strokeWidth={1.5} />
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

                    {/* Services List */}
                    <div className="border-t border-amber-500/10 pt-4 mt-4">
                      <div className="grid grid-cols-1 gap-2">
                        {["Portfolio Organization", "Clean Title Management", "Asset Stewardship", "Legacy Planning"].map((service, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-left">
                            <div className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0" />
                            <span className="body-text text-xs text-[#a8a29e]">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
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
