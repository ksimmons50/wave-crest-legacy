"use client";

import Link from "next/link";
import { Layers, TrendingUp, Anchor, FileCheck, Home, Handshake } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#2E5090]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;700&display=swap');

        :root {
          --primary: #2E5090;
          --secondary: #3B6BB5;
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

      {/* SECTION 1 — HERO WITH ECOSYSTEM */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-b from-[#2E5090] to-[#3B6BB5]">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="hero-title text-5xl md:text-7xl font-black text-[#f5f5f0] tracking-tight mb-16">
            Wave Crest Legacy Group
          </h1>

          {/* Pyramid Layout */}
          <div className="flex flex-col items-center gap-8">
            {/* Top Box — Wave Crest Legacy Group */}
            <div className="w-full max-w-md">
              <div className="bg-gradient-to-br from-[#3B6BB5] to-[#254680] p-8 border-2 border-amber-500/30 h-full flex flex-col">
                <div className="flex justify-center mb-6">
                  <Layers className="w-16 h-16 text-amber-400" strokeWidth={1.5} />
                </div>
                <h3 className="hero-title text-2xl font-bold text-[#f5f5f0] text-center mb-3">
                  Wave Crest Legacy Group
                </h3>
                <p className="body-text text-sm uppercase tracking-[0.2em] text-amber-400 font-semibold text-center mb-6">
                  The Foundation
                </p>
                <div className="space-y-3 flex-grow">
                  {["Business Clarity & Documentation", "Brand Identity & Messaging", "Mentorship & Strategic Guidance", "Investor‑Ready Systems"].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0 mt-2" />
                      <span className="body-text text-sm text-[#f5f5f0]/90 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Row — Acquisitions & Holding */}
            <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
              {/* Acquisitions Box */}
              <Link href="/acquisitions" className="bg-gradient-to-br from-[#3B6BB5] to-[#254680] p-8 border-2 border-amber-500/30 h-full flex flex-col hover:border-amber-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20 cursor-pointer group">
                <div className="flex justify-center mb-6">
                  <TrendingUp className="w-16 h-16 text-amber-400 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="hero-title text-2xl font-bold text-[#f5f5f0] text-center mb-3 group-hover:text-amber-400 transition-colors">
                  Wave Crest Legacy Acquisitions
                </h3>
                <p className="body-text text-sm uppercase tracking-[0.2em] text-amber-400 font-semibold text-center mb-6">
                  The Engine
                </p>
                <div className="space-y-3 flex-grow">
                  {["Real Estate Due Diligence", "Market Studies & Analysis", "Deal Structuring", "Owner‑Finance Pathways"].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0 mt-2" />
                      <span className="body-text text-sm text-[#f5f5f0]/90 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </Link>

              {/* Holding Box */}
              <Link href="/holding" className="bg-gradient-to-br from-[#3B6BB5] to-[#254680] p-8 border-2 border-amber-500/30 h-full flex flex-col hover:border-amber-500/60 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20 cursor-pointer group">
                <div className="flex justify-center mb-6">
                  <Anchor className="w-16 h-16 text-amber-400 group-hover:scale-110 transition-transform duration-300" strokeWidth={1.5} />
                </div>
                <h3 className="hero-title text-2xl font-bold text-[#f5f5f0] text-center mb-3 group-hover:text-amber-400 transition-colors">
                  Wave Crest Legacy Holding
                </h3>
                <p className="body-text text-sm uppercase tracking-[0.2em] text-amber-400 font-semibold text-center mb-6">
                  The Anchor
                </p>
                <div className="space-y-3 flex-grow">
                  {["Portfolio Organization", "Clean Title Management", "Asset Stewardship", "Legacy Planning"].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-amber-400 rounded-full flex-shrink-0 mt-2" />
                      <span className="body-text text-sm text-[#f5f5f0]/90 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — ABOUT */}
      <section className="relative py-24 px-6 bg-[#f5f5f0]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="hero-title text-4xl md:text-5xl font-black text-[#2E5090] tracking-tight">
            About Our Company
          </h2>
          <p className="body-text text-lg text-[#2E5090]/80 leading-relaxed">
            Wave Crest Legacy Group is the umbrella organization that guides and connects our operating divisions: Acquisitions and Holding. We focus on clarity, structure, and long‑term value creation across every project we touch. Our mission is simple — build strong foundations, make intentional decisions, and create momentum that lasts.
          </p>
        </div>
      </section>

      {/* SECTION 3 — FLEXIBLE OWNERSHIP PATHWAYS */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-[#2E5090] to-[#3B6BB5]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0] tracking-tight mb-4">
              Flexible Ownership Pathways
            </h2>
            <p className="body-text text-lg text-[#f5f5f0]/90 leading-relaxed">
              Helping residents move from renting to owning with clarity and confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Card 1 — Lease-Option (L/O) */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <FileCheck className="w-14 h-14 text-amber-400" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="hero-title text-2xl font-bold text-[#f5f5f0] text-center mb-4">
                Lease-Option (L/O)
              </h3>
              <p className="body-text text-base text-[#f5f5f0]/80 leading-relaxed text-center">
                Lease today, lock in your purchase terms, and buy within 12–24 months.
              </p>
            </div>

            {/* Card 2 — Rent-to-Own (RTO) */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Home className="w-14 h-14 text-amber-400" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="hero-title text-2xl font-bold text-[#f5f5f0] text-center mb-4">
                Rent-to-Own (RTO)
              </h3>
              <p className="body-text text-base text-[#f5f5f0]/80 leading-relaxed text-center">
                Rent while building toward ownership. Includes option fee and a clear purchase timeline.
              </p>
            </div>

            {/* Card 3 — Support & Guidance */}
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-8 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/10">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <Handshake className="w-14 h-14 text-amber-400" strokeWidth={1.5} />
                </div>
              </div>
              <h3 className="hero-title text-2xl font-bold text-[#f5f5f0] text-center mb-4">
                Support & Guidance
              </h3>
              <p className="body-text text-base text-[#f5f5f0]/80 leading-relaxed text-center">
                We help residents understand their path, prepare for financing, and transition smoothly.
              </p>
            </div>
          </div>

          <p className="body-text text-sm text-center text-[#f5f5f0]/60 italic">
            Available on select Wave Crest homes. Program details vary by property.
          </p>
        </div>
      </section>

      {/* SECTION 4 — CTA */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-[#2E5090] to-[#3B6BB5]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0]">
            Let's Build Your Next Chapter
          </h2>
          <div className="pt-4">
            <Link
              href="/lets-connect"
              className="inline-block px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-[#2E5090] font-bold body-text text-lg hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300"
            >
              Start Your Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
