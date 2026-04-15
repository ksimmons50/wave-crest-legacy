"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Compass, TrendingUp, FileText, Search, ClipboardCheck, ArrowDown } from "lucide-react";
import { LOGO_ACQUISITIONS } from "@/professionalConstants";

export default function AcquisitionsPage() {
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
      icon: Compass,
      title: "Opportunity Identification",
      description: "Strategic evaluation of potential acquisitions aligned with long-term goals.",
    },
    {
      icon: FileText,
      title: "Deal Structuring",
      description: "Clean, transparent frameworks that create win-win outcomes.",
    },
    {
      icon: TrendingUp,
      title: "Owner-Finance Support",
      description: "Flexible pathways that support sustainable transactions.",
    },
    {
      icon: Search,
      title: "Due Diligence & Market Clarity",
      description: "Thorough research and risk-aware evaluation for every opportunity.",
    },
    {
      icon: ClipboardCheck,
      title: "Clean, Organized Documentation",
      description: "Investor-ready records that support clarity and confidence.",
    },
  ];

  const principles = [
    "Transparency",
    "Clean Documentation",
    "Risk-Aware Evaluation",
    "Win-Win Structuring",
    "Long-Term Alignment",
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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 py-32 bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a]">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Logo */}
          <div>
            <Image
              src={LOGO_ACQUISITIONS}
              alt="Wave Crest Legacy Acquisitions"
              width={300}
              height={100}
              className="h-20 w-auto mx-auto mb-16"
              priority
            />
          </div>

          {/* Main Heading */}
          <div className="space-y-6">
            <h1 className="hero-title text-5xl md:text-7xl font-black text-[#f5f5f0] tracking-tight">
              Wave Crest Legacy Acquisitions
            </h1>
            <p className="hero-title text-2xl md:text-3xl text-amber-400 font-bold">
              The Engine of the Ecosystem
            </p>
          </div>

          {/* Tagline */}
          <p className="body-text text-sm uppercase tracking-[0.3em] text-[#a8a29e] font-semibold">
            Clarity. Structure. Momentum.
          </p>

          {/* Subheading */}
          <p className="text-xl md:text-2xl text-[#f5f5f0]/80 body-text max-w-3xl mx-auto leading-relaxed">
            Identifying opportunities, structuring clean deals, and supporting owner-finance pathways that create win-win outcomes.
          </p>

          {/* Scroll Indicator */}
          <div className="pt-12">
            <ArrowDown className="w-6 h-6 text-amber-400 mx-auto animate-bounce" />
          </div>
        </div>
      </section>

      {/* Section 1 - What We Do */}
      <section
        data-section="0"
        className="animate-section relative py-24 px-6 bg-[#0a0e27]"
        style={{
          opacity: visibleSections.includes(0) ? 1 : 0,
          transform: visibleSections.includes(0) ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0] mb-6">
              What We Do
            </h2>
            <p className="body-text text-lg md:text-xl text-[#a8a29e] max-w-3xl mx-auto leading-relaxed">
              We bring structure, transparency, and disciplined evaluation to every acquisition opportunity.
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
                  className="p-8 bg-gradient-to-br from-[#1a1f3a] to-[#0f1629] border border-amber-500/20 hover:border-amber-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/10"
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

      {/* Section 2 - Our Approach */}
      <section
        data-section="1"
        className="animate-section relative py-24 px-6 bg-[#1a1f3a]"
        style={{
          opacity: visibleSections.includes(1) ? 1 : 0,
          transform: visibleSections.includes(1) ? "translateX(0)" : "translateX(60px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0] mb-6">
              Our Approach
            </h2>
            <p className="body-text text-lg md:text-xl text-[#a8a29e] max-w-3xl mx-auto leading-relaxed">
              We operate with intention and discipline — ensuring every deal aligns with long-term stability and legacy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {principles.map((principle, index) => {
              const isVisible = visibleSections.includes(1);
              const delay = index * 100;

              return (
                <div
                  key={index}
                  className="p-6 bg-gradient-to-br from-[#0a0e27] to-[#0f1629] border border-amber-500/20 text-center"
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
        data-section="2"
        className="animate-section relative py-24 px-6 bg-[#0a0e27]"
        style={{
          opacity: visibleSections.includes(2) ? 1 : 0,
          transform: visibleSections.includes(2) ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0] mb-6">
              How Acquisitions Fits Into the Ecosystem
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
              <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1629] p-10 border border-amber-500/20 text-center">
                <p className="body-text text-lg md:text-xl text-[#f5f5f0]/90 leading-relaxed">
                  Wave Crest Legacy Acquisitions is the engine that powers growth within the Wave Crest ecosystem — feeding opportunities into the Holding entity for long-term stewardship.
                </p>
              </div>

              <div className="flex justify-center">
                <ArrowDown
                  className="w-8 h-8 text-amber-400"
                  style={{
                    opacity: visibleSections.includes(2) ? 1 : 0,
                    transform: visibleSections.includes(2) ? "translateY(0)" : "translateY(-20px)",
                    transition: "opacity 1s ease-out 800ms, transform 1s ease-out 800ms",
                  }}
                />
              </div>

              <Link
                href="/holding"
                className="block bg-gradient-to-br from-[#1a1f3a] to-[#0f1629] p-8 border border-amber-500/20 hover:border-amber-500/60 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/20 text-center group"
              >
                <p className="body-text text-sm uppercase tracking-[0.2em] text-amber-400 font-semibold mb-2">
                  Flows Into
                </p>
                <p className="hero-title text-2xl font-bold text-[#f5f5f0] group-hover:text-amber-400 transition-colors">
                  Wave Crest Legacy Holding
                </p>
                <p className="body-text text-[#a8a29e] mt-2">
                  The Anchor of the Ecosystem
                </p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0]">
            Build With Intention
          </h2>
          <p className="body-text text-xl text-[#a8a29e] max-w-2xl mx-auto">
            Let's structure your next opportunity with clarity and confidence.
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
