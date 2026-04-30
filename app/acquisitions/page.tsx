"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Zap, Target, MessageSquare, Home, Wrench, MapPin, CheckCircle } from "lucide-react";
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
    <div className="min-h-screen bg-white">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        .heading-font {
          font-family: 'Space Grotesk', sans-serif;
          letter-spacing: -0.03em;
        }

        .body-font {
          font-family: 'Inter', sans-serif;
        }
      `}</style>

      {/* SECTION 1 — HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <svg className="absolute top-20 right-20 text-slate-200" width="400" height="400" viewBox="0 0 200 200">
            <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1"/>
            <rect x="100" y="100" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="150" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="heading-font text-6xl md:text-8xl font-black text-slate-900 mb-8 leading-tight">
            We Acquire.<br/>We Improve.<br/>We Elevate Value.
          </h1>

          <p className="body-font text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto font-light">
            Targeted single‑family acquisitions across Houston and surrounding markets.
          </p>

          <Link
            href="/lets-connect"
            className="inline-block px-12 py-5 bg-slate-900 text-white body-font font-semibold text-lg hover:bg-slate-800 transition-all duration-300 shadow-lg hover:shadow-2xl"
          >
            Submit a Property
          </Link>
        </div>
      </section>

      {/* SECTION 2 — OUR APPROACH */}
      <section
        data-section="0"
        className="animate-section py-32 px-6 bg-white"
        style={{
          opacity: visibleSections.includes(0) ? 1 : 0,
          transform: visibleSections.includes(0) ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="heading-font text-5xl md:text-6xl font-bold text-slate-900 mb-4">
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
                  className="bg-white p-12 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateY(0)" : "translateY(30px)",
                    transition: `opacity 0.8s ease-out ${delay}ms, transform 0.8s ease-out ${delay}ms`,
                  }}
                >
                  <Icon className="w-14 h-14 text-slate-900 mb-6" strokeWidth={1.5} />
                  <h3 className="heading-font text-2xl font-bold text-slate-900 mb-4">
                    {item.title}
                  </h3>
                  <p className="body-font text-slate-600 leading-relaxed text-lg">
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
        className="animate-section py-32 px-6 bg-slate-50"
        style={{
          opacity: visibleSections.includes(1) ? 1 : 0,
          transform: visibleSections.includes(1) ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="heading-font text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              What We Look For
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Column - Bullet List */}
            <div className="space-y-6">
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
                    <Icon className="w-7 h-7 text-slate-900 flex-shrink-0 mt-1" strokeWidth={1.5} />
                    <span className="body-font text-xl text-slate-700 font-medium">{item.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Right Column - Image */}
            <div className="relative h-[500px] bg-slate-200 shadow-xl overflow-hidden">
              <Image
                src={PROFESSIONAL_IMAGES[2]?.url || "/placeholder.jpg"}
                alt="Property inspection"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — OUR PROCESS */}
      <section
        data-section="2"
        className="animate-section py-32 px-6 bg-white"
        style={{
          opacity: visibleSections.includes(2) ? 1 : 0,
          transform: visibleSections.includes(2) ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="heading-font text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              Our Process
            </h2>
          </div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute top-12 left-0 right-0 h-0.5 bg-slate-200 hidden md:block" />

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
                    <div className="w-24 h-24 mx-auto bg-slate-900 text-white flex items-center justify-center heading-font text-3xl font-bold mb-6 shadow-lg relative z-10">
                      {step.number}
                    </div>
                    <h3 className="heading-font text-2xl font-bold text-slate-900 mb-3">
                      {step.title}
                    </h3>
                    <p className="body-font text-slate-600 leading-relaxed">
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
      <section className="py-32 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="heading-font text-5xl md:text-6xl font-bold text-white">
            Ready to Sell or Partner?
          </h2>

          <Link
            href="/lets-connect"
            className="inline-block px-14 py-6 bg-white text-slate-900 body-font font-bold text-lg hover:bg-slate-100 transition-all duration-300 shadow-2xl"
          >
            Start the Process
          </Link>
        </div>
      </section>
    </div>
  );
}
