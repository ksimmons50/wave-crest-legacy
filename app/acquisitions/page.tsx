"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Zap, Target, MessageSquare, Home, Wrench, MapPin, CheckCircle, ArrowDown } from "lucide-react";
import { LOGO_ACQUISITIONS, PROFESSIONAL_IMAGES } from "@/professionalConstants";

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

  return (
    <div className="min-h-screen bg-[#2E5090]">
      {/* SECTION 1 — HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-32 bg-gradient-to-b from-[#2E5090] to-[#3B6BB5]">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h1 className="hero-title text-6xl md:text-8xl font-black text-[#f5f5f0] tracking-tight leading-tight">
            We Acquire.<br/>We Improve.<br/>We Elevate Value.
          </h1>

          <p className="body-text text-xl md:text-2xl text-[#f5f5f0]/80 max-w-3xl mx-auto leading-relaxed">
            Targeted single‑family acquisitions across Houston and surrounding markets.
          </p>

          <div className="pt-4">
            <Link
              href="/lets-connect"
              className="inline-block px-12 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-[#2E5090] font-bold body-text text-lg hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300"
            >
              Submit a Property
            </Link>
          </div>

          <div className="pt-12">
            <ArrowDown className="w-6 h-6 text-amber-400 mx-auto animate-bounce" />
          </div>
        </div>
      </section>

      {/* SECTION 2 — OUR APPROACH */}
      <section
        data-section="0"
        className="animate-section py-32 px-6 bg-[#2E5090]"
        style={{
          opacity: visibleSections.includes(0) ? 1 : 0,
          transform: visibleSections.includes(0) ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="hero-title text-5xl md:text-6xl font-black text-[#f5f5f0] mb-4">
              Our Approach
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Zap,
                title: "Speed & Certainty",
                description: "We evaluate quickly and close with confidence",
              },
              {
                icon: Target,
                title: "Value‑Driven Strategy",
                description: "We target homes where design, structure, and efficiency create upside",
              },
              {
                icon: MessageSquare,
                title: "Transparent Process",
                description: "Clear communication from offer to closing",
              },
            ].map((item, index) => {
              const Icon = item.icon;
              const isVisible = visibleSections.includes(0);
              const delay = index * 150;

              return (
                <div
                  key={index}
                  className="bg-gradient-to-br from-[#3B6BB5] to-[#254680] p-10 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-500 hover:shadow-xl hover:shadow-amber-500/10"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(30px)",
                    transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`,
                  }}
                >
                  <Icon className="w-14 h-14 text-amber-400 mb-6" strokeWidth={1.5} />
                  <h3 className="hero-title text-2xl font-bold text-[#f5f5f0] mb-4">
                    {item.title}
                  </h3>
                  <p className="body-text text-[#a8a29e] leading-relaxed text-lg">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 3 — WHAT WE LOOK FOR */}
      <section
        data-section="1"
        className="animate-section py-32 px-6 bg-[#3B6BB5]"
        style={{
          opacity: visibleSections.includes(1) ? 1 : 0,
          transform: visibleSections.includes(1) ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="hero-title text-5xl md:text-6xl font-black text-[#f5f5f0] mb-4">
              What We Look For
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Column - Bullet List */}
            <div className="space-y-8">
              {[
                { icon: Home, text: "Single‑family homes" },
                { icon: Wrench, text: "Cosmetic or structural rehab opportunities" },
                { icon: CheckCircle, text: "Distressed, inherited, or off‑market properties" },
                { icon: MapPin, text: "Houston, Missouri City, Cypress, Bay City" },
              ].map((item, index) => {
                const Icon = item.icon;
                const isVisible = visibleSections.includes(1);
                const delay = index * 100;

                return (
                  <div
                    key={index}
                    className="flex items-start gap-5"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "translateX(0)" : "translateX(-30px)",
                      transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
                    }}
                  >
                    <Icon className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" strokeWidth={1.5} />
                    <span className="body-text text-xl text-[#f5f5f0] font-medium leading-relaxed">{item.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Right Column - Image */}
            <div className="relative h-[500px] bg-[#254680] shadow-2xl overflow-hidden border border-amber-500/20">
              <Image
                src={PROFESSIONAL_IMAGES[2]?.url || "/placeholder.jpg"}
                alt="Property inspection"
                fill
                className="object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — OUR PROCESS */}
      <section
        data-section="2"
        className="animate-section py-32 px-6 bg-[#2E5090]"
        style={{
          opacity: visibleSections.includes(2) ? 1 : 0,
          transform: visibleSections.includes(2) ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="hero-title text-5xl md:text-6xl font-black text-[#f5f5f0] mb-4">
              Our Process
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-16 left-0 right-0 h-0.5 bg-amber-500/30 hidden md:block" />

            <div className="grid md:grid-cols-4 gap-8 relative">
              {[
                { number: "01", title: "Submit Property", description: "Share basic details about your home" },
                { number: "02", title: "Evaluation & Offer", description: "We review and present a fair offer" },
                { number: "03", title: "Walkthrough", description: "We inspect and confirm details" },
                { number: "04", title: "Closing", description: "Fast, seamless transaction" },
              ].map((step, index) => {
                const isVisible = visibleSections.includes(2);
                const delay = index * 150;

                return (
                  <div
                    key={index}
                    className="text-center relative"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? "scale(1)" : "scale(0.9)",
                      transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`,
                    }}
                  >
                    <div className="w-32 h-32 mx-auto bg-gradient-to-br from-amber-500 to-amber-600 text-[#2E5090] flex items-center justify-center hero-title text-4xl font-black mb-6 shadow-lg relative z-10">
                      {step.number}
                    </div>
                    <h3 className="hero-title text-2xl font-bold text-[#f5f5f0] mb-3">
                      {step.title}
                    </h3>
                    <p className="body-text text-[#a8a29e] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — CTA */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#2E5090] to-[#3B6BB5]">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="hero-title text-5xl md:text-6xl font-black text-[#f5f5f0]">
            Ready to Sell or Partner?
          </h2>

          <div className="pt-4">
            <Link
              href="/lets-connect"
              className="inline-block px-14 py-6 bg-gradient-to-r from-amber-500 to-amber-600 text-[#2E5090] body-text font-bold text-lg hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300"
            >
              Start the Process
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
