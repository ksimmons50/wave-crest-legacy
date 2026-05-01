"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Users, Cog, TrendingUp, Shield, MessageCircle, Home, ArrowDown } from "lucide-react";
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

      {/* SECTION 1 — HERO */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-32 bg-gradient-to-b from-[#2E5090] to-[#3B6BB5]">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <h1 className="hero-title text-6xl md:text-8xl font-black text-[#f5f5f0] tracking-tight leading-tight">
            Long‑Term Stewardship.<br/>Stable Growth.
          </h1>

          <p className="body-text text-xl md:text-2xl text-[#f5f5f0]/80 max-w-3xl mx-auto leading-relaxed">
            We manage and hold assets with a focus on durability, resident experience, and predictable returns.
          </p>

          <div className="pt-12">
            <ArrowDown className="w-6 h-6 text-amber-400 mx-auto animate-bounce" />
          </div>
        </div>
      </section>

      {/* SECTION 2 — OUR PHILOSOPHY */}
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

      {/* SECTION 3 — OWNER-FINANCE PROGRAM */}
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
              Owner‑Finance Program
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Column - Explanation */}
            <div className="space-y-6">
              <p className="body-text text-xl text-[#f5f5f0] leading-relaxed">
                We provide owner‑finance opportunities for qualified buyers seeking a stable path to homeownership. Our terms are transparent, fair, and structured for long‑term success.
              </p>
            </div>

            {/* Right Column - Graphic */}
            <div className="relative h-[400px] bg-gradient-to-br from-[#2E5090] to-[#254680] shadow-2xl overflow-hidden border border-amber-500/20 flex items-center justify-center">
              <Shield className="w-40 h-40 text-amber-400/30" strokeWidth={1} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — INTEREST RATE TABLE */}
      <section
        data-section="2"
        className="animate-section py-32 px-6 bg-[#2E5090]"
        style={{
          opacity: visibleSections.includes(2) ? 1 : 0,
          transform: visibleSections.includes(2) ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="hero-title text-5xl md:text-6xl font-black text-[#f5f5f0] mb-6">
              Owner‑Finance Rate Structure
            </h2>
            <p className="body-text text-sm uppercase tracking-[0.2em] text-amber-400 font-semibold">
              Transparent. Straightforward. Professional.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#3B6BB5] to-[#254680] shadow-2xl border border-amber-500/30 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-amber-500 to-amber-600 border-b-2 border-amber-500">
                  <th className="px-8 py-6 text-left hero-title text-2xl font-bold text-[#2E5090]">
                    Down Payment
                  </th>
                  <th className="px-8 py-6 text-left hero-title text-2xl font-bold text-[#2E5090]">
                    Interest Rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { down: "25% or more", rate: "8.5%" },
                  { down: "20% down", rate: "8.9%" },
                  { down: "15% down", rate: "9.5%" },
                  { down: "Below 15%", rate: "9.9%" },
                ].map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-amber-500/20 hover:bg-[#254680] transition-colors"
                  >
                    <td className="px-8 py-6 body-text text-lg text-[#f5f5f0] font-medium">
                      {row.down}
                    </td>
                    <td className="px-8 py-6 hero-title text-3xl text-amber-400 font-bold">
                      {row.rate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="body-text text-sm text-[#a8a29e] mt-8 text-center max-w-3xl mx-auto">
            Rates apply to standard owner‑finance structures and may vary based on property type and buyer profile.
          </p>
        </div>
      </section>

      {/* SECTION 5 — RESIDENT EXPERIENCE */}
      <section
        data-section="3"
        className="animate-section py-32 px-6 bg-[#3B6BB5]"
        style={{
          opacity: visibleSections.includes(3) ? 1 : 0,
          transform: visibleSections.includes(3) ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="hero-title text-5xl md:text-6xl font-black text-[#f5f5f0] mb-4">
              Resident Experience
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Column - Bullet List */}
            <div className="space-y-8">
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
                    <Icon className="w-8 h-8 text-amber-400 flex-shrink-0 mt-1" strokeWidth={1.5} />
                    <span className="body-text text-xl text-[#f5f5f0] font-medium leading-relaxed">{item.text}</span>
                  </div>
                );
              })}
            </div>

            {/* Right Column - Image */}
            <div className="relative h-[500px] bg-[#254680] shadow-2xl overflow-hidden border border-amber-500/20">
              <Image
                src={PROFESSIONAL_IMAGES[1]?.url || "/placeholder.jpg"}
                alt="Home interior"
                fill
                className="object-cover opacity-90"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 — CTA */}
      <section className="py-32 px-6 bg-gradient-to-b from-[#2E5090] to-[#3B6BB5]">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <h2 className="hero-title text-5xl md:text-6xl font-black text-[#f5f5f0]">
            Interested in Owner‑Finance Opportunities?
          </h2>

          <div className="pt-4">
            <Link
              href="/lets-connect"
              className="inline-block px-14 py-6 bg-gradient-to-r from-amber-500 to-amber-600 text-[#2E5090] body-text font-bold text-lg hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300"
            >
              View Available Homes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
