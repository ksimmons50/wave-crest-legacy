"use client";

import Link from "next/link";
import { Layers, TrendingUp, Anchor } from "lucide-react";

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

      {/* SECTION 1 — HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-b from-[#2E5090] to-[#3B6BB5]">
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <h1 className="hero-title text-5xl md:text-7xl font-black text-[#f5f5f0] tracking-tight">
            Wave Crest Legacy Group
          </h1>
          <p className="body-text text-xl md:text-2xl text-amber-400 font-semibold uppercase tracking-[0.2em]">
            Clarity. Structure. Momentum.
          </p>
          <div className="pt-6">
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-[#2E5090] font-bold body-text text-lg hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300"
            >
              Start Your Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 2 — THE ECOSYSTEM */}
      <section className="relative py-24 px-6 bg-[#2E5090]">
        <div className="max-w-6xl mx-auto">
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
              <div className="bg-gradient-to-br from-[#3B6BB5] to-[#254680] p-8 border-2 border-amber-500/30 h-full flex flex-col">
                <div className="flex justify-center mb-6">
                  <TrendingUp className="w-16 h-16 text-amber-400" strokeWidth={1.5} />
                </div>
                <h3 className="hero-title text-2xl font-bold text-[#f5f5f0] text-center mb-3">
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
              </div>

              {/* Holding Box */}
              <div className="bg-gradient-to-br from-[#3B6BB5] to-[#254680] p-8 border-2 border-amber-500/30 h-full flex flex-col">
                <div className="flex justify-center mb-6">
                  <Anchor className="w-16 h-16 text-amber-400" strokeWidth={1.5} />
                </div>
                <h3 className="hero-title text-2xl font-bold text-[#f5f5f0] text-center mb-3">
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
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — ABOUT */}
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

      {/* SECTION 4 — CTA */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-[#2E5090] to-[#3B6BB5]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0]">
            Let's Build Your Next Chapter
          </h2>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-block px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-[#2E5090] font-bold body-text text-lg hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300"
            >
              Start Your Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 5 — FOOTER */}
      <footer className="relative py-16 px-6 bg-[#2E5090] border-t border-amber-500/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            {/* Company Name & Tagline */}
            <div>
              <h3 className="hero-title text-2xl md:text-3xl font-bold text-[#f5f5f0] mb-2">
                Wave Crest Legacy Group
              </h3>
              <p className="body-text text-sm uppercase tracking-[0.2em] text-amber-400 font-semibold">
                Clarity. Structure. Momentum.
              </p>
            </div>

            {/* Navigation Links */}
            <nav className="flex justify-center gap-8">
              <Link href="/" className="body-text text-sm text-[#f5f5f0]/70 hover:text-amber-400 transition-colors">
                Home
              </Link>
              <Link href="/about" className="body-text text-sm text-[#f5f5f0]/70 hover:text-amber-400 transition-colors">
                About
              </Link>
              <Link href="/services" className="body-text text-sm text-[#f5f5f0]/70 hover:text-amber-400 transition-colors">
                Services
              </Link>
              <Link href="/lets-connect" className="body-text text-sm text-[#f5f5f0]/70 hover:text-amber-400 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Copyright & Powered by */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <p className="body-text text-sm text-[#a8a29e]">
                © 2026 Wave Crest Legacy Group, LLC
              </p>
              <div className="flex items-center gap-2 px-4 py-2 bg-white rounded">
                <span className="body-text text-xs text-gray-600">Powered by</span>
                <span className="body-text text-xs font-bold text-gray-900 tracking-wider">BREEZY</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
