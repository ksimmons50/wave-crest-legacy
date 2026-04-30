"use client";

import Image from "next/image";
import { FileText, Palette, Home, Target } from "lucide-react";
import { LOGO_LEGACY_GROUP } from "@/professionalConstants";

export default function ServicesPage() {
  const services = [
    {
      icon: FileText,
      title: "Business Clarity & Documentation",
      description: "We help you organize your ideas, document your processes, and create systems that support growth. Whether you're launching a new venture or scaling an existing operation, we bring structure to complexity.",
      bullets: [
        "Business plans",
        "SOPs (Standard Operating Procedures)",
        "Investor decks",
        "Workflow systems",
      ],
    },
    {
      icon: Palette,
      title: "Brand Identity & Messaging",
      description: "Your brand is more than a logo — it's how you communicate your value. We help you define your voice, clarify your message, and present yourself with confidence.",
      bullets: [
        "Brand voice development",
        "Taglines and positioning",
        "Visual identity guidance",
        "Website content strategy",
      ],
    },
    {
      icon: Home,
      title: "Real Estate Support Services",
      description: "Whether you're acquiring properties, managing a portfolio, or exploring owner-finance strategies, we provide the documentation, analysis, and planning you need to move with confidence.",
      bullets: [
        "Due diligence support",
        "Market studies and valuation",
        "Rehab planning and oversight",
        "Portfolio organization",
      ],
    },
    {
      icon: Target,
      title: "Mentorship & Strategic Guidance",
      description: "Sometimes you need a partner who listens, asks the right questions, and helps you think through the next step. We provide accountability, strategic planning, and clarity for both business and personal goals.",
      bullets: [
        "Business development guidance",
        "Accountability systems",
        "Strategic planning sessions",
        "Personal and professional clarity",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#2E5090]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;700&display=swap');

        .hero-title {
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .body-text {
          font-family: 'DM Sans', sans-serif;
        }
      `}</style>

      {/* Header */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-[#2E5090] to-[#3B6BB5]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Image
            src={LOGO_LEGACY_GROUP}
            alt="Wave Crest Legacy Group"
            width={300}
            height={100}
            className="h-20 w-auto mx-auto mb-8"
            priority
          />
          <h1 className="hero-title text-5xl md:text-6xl font-black text-[#f5f5f0]">
            Services
          </h1>
          <p className="body-text text-xl text-amber-400">
            Clarity. Structure. Momentum.
          </p>
        </div>
      </section>

      {/* Services Sections */}
      <div className="max-w-6xl mx-auto">
        {services.map((service, index) => {
          const Icon = service.icon;
          const bgClass = index % 2 === 0 ? "bg-[#3B6BB5]/50" : "bg-[#2E5090]/50";

          return (
            <section
              key={index}
              className={`relative py-24 px-6 md:px-12 ${bgClass}`}
            >
              <div className="max-w-4xl mx-auto">
                <div className="flex items-start gap-6 mb-6">
                  <Icon className="w-12 h-12 text-amber-400 flex-shrink-0" />
                  <h2 className="hero-title text-3xl md:text-4xl font-bold text-amber-400">
                    {service.title}
                  </h2>
                </div>

                <p className="body-text text-lg text-[#f5f5f0]/80 leading-relaxed mb-8 max-w-3xl">
                  {service.description}
                </p>

                <ul className="space-y-4">
                  {service.bullets.map((bullet, bulletIndex) => (
                    <li
                      key={bulletIndex}
                      className="flex items-start gap-3 body-text text-[#f5f5f0]"
                    >
                      <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          );
        })}
      </div>

      {/* CTA */}
      <section className="relative py-20 px-6 bg-[#3B6BB5]">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="hero-title text-3xl md:text-4xl font-bold text-[#f5f5f0]">
            Ready to get started?
          </h2>
          <p className="body-text text-lg text-[#a8a29e]">
            Let's talk about what you're building.
          </p>
          <div className="pt-4">
            <a
              href="/contact"
              className="inline-block px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-[#2E5090] font-bold body-text text-lg hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300"
            >
              Start Your Consultation
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
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
              <a href="/" className="body-text text-sm text-[#f5f5f0]/70 hover:text-amber-400 transition-colors">
                Home
              </a>
              <a href="/about" className="body-text text-sm text-[#f5f5f0]/70 hover:text-amber-400 transition-colors">
                About
              </a>
              <a href="/services" className="body-text text-sm text-[#f5f5f0]/70 hover:text-amber-400 transition-colors">
                Services
              </a>
              <a href="/lets-connect" className="body-text text-sm text-[#f5f5f0]/70 hover:text-amber-400 transition-colors">
                Contact
              </a>
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
