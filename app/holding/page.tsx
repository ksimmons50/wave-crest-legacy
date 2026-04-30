"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Cog, TrendingUp, Shield, MessageCircle, Home } from "lucide-react";
import { LOGO_HOLDING, PROFESSIONAL_IMAGES } from "@/professionalConstants";

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
          <svg className="absolute top-20 left-20 text-slate-200" width="400" height="400" viewBox="0 0 200 200">
            <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1"/>
            <rect x="100" y="100" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="1"/>
            <circle cx="150" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="1"/>
          </svg>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h1 className="heading-font text-6xl md:text-8xl font-black text-slate-900 mb-8 leading-tight">
            Long‑Term Stewardship.<br/>Stable Growth.
          </h1>

          <p className="body-font text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto font-light">
            We manage and hold assets with a focus on durability, resident experience, and predictable returns.
          </p>
        </div>
      </section>

      {/* SECTION 2 — OUR PHILOSOPHY */}
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
              Our Philosophy
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Users,
                title: "Resident‑First Experience",
                description: "Clean, safe, well‑maintained homes",
              },
              {
                icon: Cog,
                title: "Operational Excellence",
                description: "Efficient systems, proactive maintenance",
              },
              {
                icon: TrendingUp,
                title: "Long‑Term Value",
                description: "Strategic improvements that increase equity and stability",
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

      {/* SECTION 3 — OWNER-FINANCE PROGRAM */}
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
              Owner‑Finance Program
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Column - Explanation */}
            <div className="space-y-6">
              <p className="body-font text-xl text-slate-700 leading-relaxed">
                We provide owner‑finance opportunities for qualified buyers seeking a stable path to homeownership. Our terms are transparent, fair, and structured for long‑term success.
              </p>
            </div>

            {/* Right Column - Graphic */}
            <div className="relative h-[400px] bg-slate-200 shadow-xl overflow-hidden flex items-center justify-center">
              <Shield className="w-40 h-40 text-slate-400" strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — INTEREST RATE TABLE */}
      <section
        data-section="2"
        className="animate-section py-32 px-6 bg-white"
        style={{
          opacity: visibleSections.includes(2) ? 1 : 0,
          transform: visibleSections.includes(2) ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="heading-font text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              Owner‑Finance Rate Structure
            </h2>
          </div>

          <div className="bg-white shadow-2xl border border-slate-200 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-900">
                  <th className="px-8 py-6 text-left heading-font text-xl font-bold text-white">
                    Down Payment
                  </th>
                  <th className="px-8 py-6 text-left heading-font text-xl font-bold text-white">
                    Interest Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { down: "20% down", rate: "8.9%" },
                  { down: "15% down", rate: "9.5%" },
                  { down: "Below 15%", rate: "9.9%" },
                ].map((row, index) => (
                  <tr
                    key={index}
                    className={`border-b border-slate-200 hover:bg-slate-50 transition-colors ${
                      index % 2 === 0 ? "bg-white" : "bg-slate-50"
                    }`}
                  >
                    <td className="px-8 py-6 body-font text-lg text-slate-700 font-medium">
                      {row.down}
                    </td>
                    <td className="px-8 py-6 heading-font text-2xl text-slate-900 font-bold">
                      {row.rate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="body-font text-sm text-slate-500 mt-8 text-center max-w-3xl mx-auto">
            Rates apply to standard owner‑finance structures and may vary based on property type and buyer profile.
          </p>
        </div>
      </section>

      {/* SECTION 5 — RESIDENT EXPERIENCE */}
      <section
        data-section="3"
        className="animate-section py-32 px-6 bg-slate-50"
        style={{
          opacity: visibleSections.includes(3) ? 1 : 0,
          transform: visibleSections.includes(3) ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="heading-font text-5xl md:text-6xl font-bold text-slate-900 mb-4">
              Resident Experience
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Column - Bullet List */}
            <div className="space-y-6">
              {[
                { icon: Cog, text: "Responsive maintenance" },
                { icon: Home, text: "Clean, safe homes" },
                { icon: MessageCircle, text: "Transparent communication" },
              ].map((item, index) => {
                const Icon = item.icon;
                const isVisible = visibleSections.includes(3);
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
                src={PROFESSIONAL_IMAGES[1]?.url || "/placeholder.jpg"}
                alt="Home interior"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — CTA */}
      <section className="py-32 px-6 bg-slate-900">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="heading-font text-5xl md:text-6xl font-bold text-white">
            Interested in Owner‑Finance Opportunities?
          </h2>

          <Link
            href="/lets-connect"
            className="inline-block px-14 py-6 bg-white text-slate-900 body-font font-bold text-lg hover:bg-slate-100 transition-all duration-300 shadow-2xl"
          >
            View Available Homes
          </Link>
        </div>
      </section>
    </div>
  );
}
