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
    <div className="min-h-screen bg-[#0a0e27]">
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
      <section className="relative py-32 px-6 bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a]">
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
      <div className="max-w-5xl mx-auto px-6 pb-32">
        {services.map((service, index) => {
          const Icon = service.icon;
          const bgClass = index % 2 === 0 ? "bg-[#1a1f3a]" : "bg-[#0a0e27]";

          return (
            <section
              key={index}
              className={`relative py-20 -mx-6 px-6 ${bgClass}`}
            >
              <div className="max-w-5xl mx-auto">
                <div className="flex items-start gap-4 mb-6">
                  <Icon className="w-10 h-10 text-amber-400 flex-shrink-0" />
                  <h2 className="hero-title text-3xl md:text-4xl font-bold text-amber-400">
                    {service.title}
                  </h2>
                </div>

                <p className="body-text text-lg text-[#a8a29e] leading-relaxed mb-8 max-w-3xl">
                  {service.description}
                </p>

                <ul className="space-y-3">
                  {service.bullets.map((bullet, bulletIndex) => (
                    <li
                      key={bulletIndex}
                      className="flex items-start gap-3 body-text text-[#f5f5f0]"
                    >
                      <span className="w-1.5 h-1.5 bg-amber-400 rounded-full mt-2.5 flex-shrink-0" />
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
      <section className="relative py-20 px-6 bg-[#1a1f3a]">
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
