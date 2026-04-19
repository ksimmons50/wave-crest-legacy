"use client";

import Image from "next/image";
import { CheckCircle } from "lucide-react";
import { LOGO_LEGACY_GROUP } from "@/professionalConstants";

export default function AboutPage() {
  const approach = [
    "We listen deeply",
    "We organize your ideas",
    "We build systems that support your goals",
    "We help you move with confidence",
  ];

  const values = ["Clarity", "Structure", "Legacy", "Integrity"];

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
            About Wave Crest
          </h1>
        </div>
      </section>

      {/* Our Story */}
      <section className="relative py-20 px-6 bg-[#3B6BB5]">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="hero-title text-3xl md:text-4xl font-bold text-amber-400 mb-6">
            Our Story
          </h2>
          <p className="body-text text-lg text-[#a8a29e] leading-relaxed">
            Wave Crest helps entrepreneurs, investors, and families create clarity and structure. We work with people who have ideas but need organized systems, who want to move forward but aren't sure where to start, and who value legacy over shortcuts. Everything we do is guided by our commitment to clarity, structure, and momentum.
          </p>
        </div>
      </section>

      {/* Our Mission */}
      <section className="relative py-20 px-6 bg-[#2E5090]">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="hero-title text-3xl md:text-4xl font-bold text-amber-400 mb-6">
            Our Mission
          </h2>
          <p className="body-text text-lg text-[#a8a29e] leading-relaxed">
            We help people move forward with purpose.
          </p>
        </div>
      </section>

      {/* Our Approach */}
      <section className="relative py-20 px-6 bg-[#3B6BB5]">
        <div className="max-w-4xl mx-auto">
          <h2 className="hero-title text-3xl md:text-4xl font-bold text-amber-400 mb-12">
            Our Approach
          </h2>
          <div className="space-y-6">
            {approach.map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-1" />
                <p className="body-text text-[#f5f5f0] text-lg">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="relative py-20 px-6 bg-[#2E5090] mb-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="hero-title text-3xl md:text-4xl font-bold text-amber-400 mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-6 bg-[#3B6BB5]/50 border border-amber-500/20 text-center"
              >
                <p className="hero-title text-xl font-bold text-[#f5f5f0]">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
