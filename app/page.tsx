"use client";

import Image from "next/image";
import { Building2, ArrowRight, Users, Briefcase, HeartHandshake, FileText, Palette, Home as HomeIcon, Target, CheckCircle } from "lucide-react";
import { PROFESSIONAL_IMAGES, LOGO_LEGACY_GROUP } from "@/professionalConstants";

export default function LandingPage() {
  const whatWeDo = [
    {
      icon: FileText,
      title: "Business Clarity & Documentation",
      description: "Turn ideas into organized, investor-ready systems.",
    },
    {
      icon: Palette,
      title: "Brand Identity & Messaging",
      description: "Define who you are and communicate it clearly.",
    },
    {
      icon: HomeIcon,
      title: "Real Estate Support Services",
      description: "Due diligence, market studies, and portfolio organization.",
    },
    {
      icon: Target,
      title: "Mentorship & Strategic Guidance",
      description: "Accountability and clarity for your next chapter.",
    },
  ];

  const whoWeServe = [
    {
      icon: Briefcase,
      title: "Entrepreneurs",
      description: "Wave Crest helps you structure your ideas, build systems, and move forward with clarity.",
    },
    {
      icon: Users,
      title: "Investors",
      description: "We bring organization to your portfolio and create documentation that supports growth.",
    },
    {
      icon: HeartHandshake,
      title: "Families",
      description: "We help you plan, organize, and build a legacy with confidence.",
    },
  ];

  const whyWeWork = [
    "Clear, structured systems",
    "Investor-ready documentation",
    "Brand-forward identity",
    "Real estate operator experience",
    "Legacy-driven approach",
  ];

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

      {/* What We Do */}
      <section className="relative py-24 px-6 bg-[#1a1f3a]">
        <div className="max-w-6xl mx-auto">
          <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0] text-center mb-8">
            What We Do
          </h2>
          <p className="body-text text-xl text-amber-400 text-center mb-20">
            Clarity. Structure. Momentum.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {whatWeDo.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="space-y-4">
                  <Icon className="w-10 h-10 text-amber-400" />
                  <h3 className="hero-title text-2xl font-bold text-[#f5f5f0]">{item.title}</h3>
                  <p className="body-text text-[#a8a29e] text-lg leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="relative py-24 px-6 bg-[#0a0e27]">
        <div className="max-w-6xl mx-auto">
          <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0] text-center mb-20">
            Who We Serve
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {whoWeServe.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="p-8 bg-[#1a1f3a]/50 border border-amber-500/20 space-y-4"
                >
                  <Icon className="w-10 h-10 text-amber-400" />
                  <h3 className="hero-title text-2xl font-bold text-[#f5f5f0]">{item.title}</h3>
                  <p className="body-text text-[#a8a29e] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Wave Crest Works */}
      <section className="relative py-24 px-6 bg-[#1a1f3a]">
        <div className="max-w-4xl mx-auto">
          <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0] text-center mb-6">
            Why Wave Crest Works
          </h2>
          <p className="body-text text-lg text-[#a8a29e] text-center mb-16 max-w-2xl mx-auto">
            We bring clarity, structure, and momentum to every project.
          </p>

          <div className="space-y-6">
            {whyWeWork.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                <p className="body-text text-[#f5f5f0] text-lg">{item}</p>
              </div>
            ))}
          </div>
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
