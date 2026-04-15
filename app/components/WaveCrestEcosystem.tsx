"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Layers, TrendingUp, Anchor } from "lucide-react";

interface EcosystemEntity {
  icon: any;
  name: string;
  subtitle: string;
  description: string;
  microCopy: string;
  href: string;
}

export default function WaveCrestEcosystem() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [lineHeight, setLineHeight] = useState(0);

  const entities: EcosystemEntity[] = [
    {
      icon: Layers,
      name: "Wave Crest Legacy Group",
      subtitle: "The Foundation",
      description: "The central hub that provides clarity, structure, and systems across every project and entity.",
      microCopy: "Clarity, structure, and systems that guide every project.",
      href: "/",
    },
    {
      icon: TrendingUp,
      name: "Wave Crest Legacy Acquisitions",
      subtitle: "The Engine",
      description: "Identifying opportunities, structuring deals, and supporting owner-finance pathways that create win-win outcomes.",
      microCopy: "Identifying opportunities and structuring clean, transparent deals.",
      href: "/acquisitions",
    },
    {
      icon: Anchor,
      name: "Wave Crest Legacy Holding",
      subtitle: "The Anchor",
      description: "Long-term asset management with clean title, organized records, and disciplined portfolio stability.",
      microCopy: "Long-term asset stewardship with clean title and organized records.",
      href: "/holding",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-index") || "0");
            setVisibleCards((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index].sort((a, b) => a - b);
              }
              return prev;
            });
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-50px",
      }
    );

    const cards = document.querySelectorAll(".ecosystem-card");
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !lineRef.current) return;

      const section = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the section is visible
      const visibleTop = Math.max(0, -section.top);
      const visibleBottom = Math.min(section.height, windowHeight - section.top);
      const visiblePercentage = ((visibleBottom - visibleTop) / section.height) * 100;

      // Animate line from 0 to 100% as section scrolls into view
      setLineHeight(Math.min(100, Math.max(0, visiblePercentage)));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="relative py-32 px-6 bg-[#0a0e27] overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <h2 className="hero-title text-4xl md:text-6xl font-black text-[#f5f5f0] mb-6 tracking-tight">
            The Wave Crest Ecosystem
          </h2>
          <p className="body-text text-sm uppercase tracking-[0.3em] text-amber-400 font-semibold mb-8">
            Clarity. Structure. Momentum.
          </p>
          <p className="body-text text-lg text-[#a8a29e] max-w-2xl mx-auto leading-relaxed">
            A vertically aligned, animated framework that reveals how each entity supports the next — creating a unified system built for clarity, stability, and long-term legacy.
          </p>
        </div>

        {/* Vertical Stack with Connecting Line */}
        <div className="relative">
          {/* Animated Connecting Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-hidden hidden md:block">
            <div className="absolute top-0 left-0 w-full bg-gradient-to-b from-transparent via-amber-500/30 to-transparent h-full" />
            <div
              ref={lineRef}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-amber-500 via-amber-400 to-amber-500 transition-all duration-700 ease-out"
              style={{
                height: `${lineHeight}%`,
                boxShadow: "0 0 20px rgba(212, 175, 55, 0.4)",
              }}
            />
          </div>

          {/* Cards */}
          <div className="space-y-16 md:space-y-24">
            {entities.map((entity, index) => {
              const Icon = entity.icon;
              const isVisible = visibleCards.includes(index);
              const delay = index * 200;

              return (
                <Link
                  key={index}
                  href={entity.href}
                  data-index={index}
                  className="ecosystem-card group block relative"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(40px)",
                    transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`,
                  }}
                >
                  <div className="relative bg-gradient-to-br from-[#1a1f3a] to-[#0f1629] p-10 md:p-12 border border-amber-500/20 hover:border-amber-500/60 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/20 group-hover:scale-[1.02]">
                    {/* Icon with Line Draw Animation */}
                    <div className="flex justify-center mb-6">
                      <div className="relative">
                        <Icon
                          className="w-16 h-16 md:w-20 md:h-20 text-amber-400 transition-all duration-500 group-hover:scale-110"
                          strokeWidth={1.5}
                          style={{
                            strokeDasharray: isVisible ? "none" : "1000",
                            strokeDashoffset: isVisible ? "0" : "1000",
                            transition: `stroke-dashoffset 2s ease-out ${delay + 400}ms`,
                          }}
                        />
                        {/* Glow Effect */}
                        <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/10 blur-xl transition-all duration-500 rounded-full scale-150" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="text-center space-y-4">
                      <div>
                        <h3 className="hero-title text-2xl md:text-3xl font-bold text-[#f5f5f0] mb-2 tracking-tight">
                          {entity.name}
                        </h3>
                        <p className="body-text text-sm uppercase tracking-[0.2em] text-amber-400 font-semibold mb-6">
                          {entity.subtitle}
                        </p>
                      </div>

                      <p className="body-text text-base md:text-lg text-[#f5f5f0]/90 leading-relaxed mb-4 max-w-xl mx-auto">
                        {entity.description}
                      </p>

                      <p className="body-text text-sm text-[#a8a29e] italic leading-relaxed max-w-lg mx-auto border-t border-amber-500/10 pt-4 mt-4">
                        {entity.microCopy}
                      </p>
                    </div>

                    {/* Hover Indicator */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="body-text text-xs text-amber-400 uppercase tracking-[0.2em] font-semibold flex items-center gap-2">
                        <span>Learn More</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Card Number Badge */}
                  <div className="absolute -left-4 top-8 md:left-1/2 md:-translate-x-1/2 md:top-0 md:-translate-y-1/2 w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg shadow-amber-500/30 z-10">
                    <span className="body-text text-[#0a0e27] font-black text-lg">{index + 1}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Closing Line */}
        <div
          className="text-center mt-24 pt-12 border-t border-amber-500/20"
          style={{
            opacity: visibleCards.length >= 3 ? 1 : 0,
            transform: visibleCards.length >= 3 ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 1s ease-out 800ms, transform 1s ease-out 800ms",
          }}
        >
          <p className="body-text text-lg text-[#a8a29e] leading-relaxed max-w-2xl mx-auto italic">
            A structured hierarchy designed to move with clarity, structure, and momentum — the core of the Wave Crest legacy.
          </p>
        </div>
      </div>
    </section>
  );
}
