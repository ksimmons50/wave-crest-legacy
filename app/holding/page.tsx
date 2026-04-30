"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Shield, Lock, Home, ClipboardCheck, FolderCheck, ArrowUp } from "lucide-react";
import { LOGO_HOLDING } from "@/professionalConstants";

export default function HoldingPage() {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-section") || "0");
            setVisibleSections((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index].sort((a, b) => a - b);
              }
              return prev;
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-50px",
      }
    );

    const sections = document.querySelectorAll(".animate-section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const coreFunctions = [
    {
      icon: Home,
      title: "Long-Term Asset Holding",
      description: "Strategic stewardship of properties and portfolios with a legacy mindset.",
    },
    {
      icon: ClipboardCheck,
      title: "Clean Title Management",
      description: "Organized, compliant records that ensure clarity and confidence.",
    },
    {
      icon: FolderCheck,
      title: "Organized Documentation",
      description: "Investor-ready systems that support transparency and growth.",
    },
    {
      icon: Shield,
      title: "Portfolio Stability",
      description: "Disciplined oversight focused on long-term value and risk management.",
    },
    {
      icon: Lock,
      title: "Legacy-Driven Oversight",
      description: "Intentional planning that protects and grows what you're building.",
    },
  ];

  const principles = [
    "Stewardship",
    "Documentation Discipline",
    "Risk Management",
    "Long-Term Alignment",
    "Intentional Growth",
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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 pt-40 pb-32 bg-gradient-to-b from-[#2E5090] to-[#3B6BB5]">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Logo */}
          <div>
            <Image
              src={LOGO_HOLDING}
              alt="Wave Crest Legacy Holding"
              width={300}
              height={100}
              className="h-20 w-auto mx-auto mb-16"
              priority
            />
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="hero-title text-5xl md:text-7xl font-black text-[#f5f5f0] tracking-tight">
              Wave Crest Legacy Holding
            </h1>
            <p className="hero-title text-2xl md:text-3xl text-amber-400 font-bold">
              The Anchor of the Ecosystem
            </p>
          </div>

          {/* Tagline */}
          <p className="body-text text-sm uppercase tracking-[0.3em] text-[#a8a29e] font-semibold">
            Clarity. Structure. Momentum.
          </p>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-[#f5f5f0]/80 body-text max-w-3xl mx-auto leading-relaxed">
            Long-term asset stewardship with clean title, organized records, and disciplined portfolio stability.
          </p>

          {/* Scroll Indicator */}
          <div className="pt-12">
            <svg className="w-6 h-6 text-amber-400 mx-auto animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Section 1 - What We Manage */}
      <section
        data-section="0"
        className="animate-section relative py-24 px-6 bg-[#2E5090]"
        style={{
          opacity: visibleSections.includes(0) ? 1 : 0,
          transform: visibleSections.includes(0) ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0] mb-6">
              What We Manage
            </h2>
            <p className="body-text text-lg md:text-xl text-[#a8a29e] max-w-3xl mx-auto leading-relaxed">
              We maintain long-term assets with precision, organization, and a legacy-driven mindset.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {coreFunctions.map((item, index) => {
              const Icon = item.icon;
              const isVisible = visibleSections.includes(0);
              const delay = index * 150;

              return (
                <div
                  key={index}
                  className="p-8 bg-gradient-to-br from-[#3B6BB5] to-[#254680] border border-amber-500/20 hover:border-amber-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/10"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(30px)",
                    transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`,
                  }}
                >
                  <Icon
                    className="w-12 h-12 text-amber-400 mb-4"
                    strokeWidth={1.5}
                    style={{
                      strokeDasharray: isVisible ? "none" : "1000",
                      strokeDashoffset: isVisible ? "0" : "1000",
                      transition: `stroke-dashoffset 2s ease-out ${delay + 400}ms`,
                    }}
                  />
                  <h3 className="hero-title text-xl font-bold text-[#f5f5f0] mb-3">
                    {item.title}
                  </h3>
                  <p className="body-text text-[#a8a29e] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 1.5 - Rate Tiers */}
      <section
        data-section="1"
        className="animate-section relative py-24 px-6 bg-[#3B6BB5]"
        style={{
          opacity: visibleSections.includes(1) ? 1 : 0,
          transform: visibleSections.includes(1) ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0] mb-6">
              Our Owner-Finance Rate Structure
            </h2>
            <p className="body-text text-sm uppercase tracking-[0.2em] text-amber-400 font-semibold">
              Transparent. Straightforward. Professional.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {[
              { down: "25% down", rate: "8.5%" },
              { down: "20% down", rate: "8.9%" },
              { down: "15% down", rate: "9.5%" },
              { down: "10% down", rate: "10%" },
            ].map((tier, index) => {
              const isVisible = visibleSections.includes(1);
              const delay = index * 100;

              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-6 bg-gradient-to-br from-[#2E5090] to-[#254680] border border-amber-500/20"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0)" : "translateX(-30px)",
                    transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
                  }}
                >
                  <span className="body-text text-lg text-[#f5f5f0] font-medium">
                    {tier.down}
                  </span>
                  <div className="flex-1 mx-6 border-b border-dotted border-amber-500/30" />
                  <span className="hero-title text-2xl font-bold text-amber-400">
                    {tier.rate}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 2 - Our Approach */}
      <section
        data-section="2"
        className="animate-section relative py-24 px-6 bg-[#2E5090]"
        style={{
          opacity: visibleSections.includes(2) ? 1 : 0,
          transform: visibleSections.includes(2) ? "translateX(0)" : "translateX(-60px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0] mb-6">
              Our Approach
            </h2>
            <p className="body-text text-lg md:text-xl text-[#a8a29e] max-w-3xl mx-auto leading-relaxed">
              We focus on stability, clarity, and long-term value — ensuring every asset supports the legacy you're building.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {principles.map((principle, index) => {
              const isVisible = visibleSections.includes(1);
              const delay = index * 100;

              return (
                <div
                  key={index}
                  className="p-6 bg-gradient-to-br from-[#2E5090] to-[#254680] border border-amber-500/20 text-center"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "scale(1)" : "scale(0.9)",
                    transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
                  }}
                >
                  <div className="w-2 h-2 bg-amber-400 rounded-full mx-auto mb-4" />
                  <p className="body-text text-[#f5f5f0] font-semibold text-lg">
                    {principle}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3 - Ecosystem Connection */}
      <section
        data-section="3"
        className="animate-section relative py-24 px-6 bg-[#3B6BB5]"
        style={{
          opacity: visibleSections.includes(3) ? 1 : 0,
          transform: visibleSections.includes(3) ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0] mb-6">
              How Holding Fits Into the Ecosystem
            </h2>
          </div>

          <div className="relative">
            {/* Vertical Connection Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-amber-500 to-transparent hidden md:block"
              style={{
                opacity: visibleSections.includes(2) ? 1 : 0,
                transition: "opacity 1.5s ease-out 500ms",
              }}
            />

            <div className="relative space-y-12">
              <Link
                href="/acquisitions"
                className="block bg-gradient-to-br from-[#3B6BB5] to-[#254680] p-8 border border-amber-500/20 hover:border-amber-500/60 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/20 text-center group"
              >
                <p className="body-text text-sm uppercase tracking-[0.2em] text-amber-400 font-semibold mb-2">
                  Receives From
                </p>
                <p className="hero-title text-2xl font-bold text-[#f5f5f0] group-hover:text-amber-400 transition-colors">
                  Wave Crest Legacy Acquisitions
                </p>
                <p className="body-text text-[#a8a29e] mt-2">
                  The Engine of the Ecosystem
                </p>
              </Link>

              <div className="flex justify-center">
                <ArrowUp
                  className="w-8 h-8 text-amber-400 rotate-180"
                  style={{
                    opacity: visibleSections.includes(3) ? 1 : 0,
                    transform: visibleSections.includes(3) ? "translateY(0)" : "translateY(-20px)",
                    transition: "opacity 1s ease-out 800ms, transform 1s ease-out 800ms",
                  }}
                />
              </div>

              <div className="bg-gradient-to-br from-[#3B6BB5] to-[#254680] p-10 border border-amber-500/20 text-center">
                <p className="body-text text-lg md:text-xl text-[#f5f5f0]/90 leading-relaxed">
                  Wave Crest Legacy Holding is the anchor that preserves the value created by Acquisitions — ensuring every asset is managed with clarity and stability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-[#2E5090] to-[#3B6BB5]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0]">
            Protect What You're Building
          </h2>
          <p className="body-text text-xl text-[#a8a29e] max-w-2xl mx-auto">
            Let's manage your assets with intention and discipline.
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
    </div>
  );
}
