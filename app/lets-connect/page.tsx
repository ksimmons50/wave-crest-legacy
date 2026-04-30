"use client";

import Image from "next/image";
import { LOGO_LEGACY_GROUP } from "@/professionalConstants";

export default function LetsConnectPage() {
  return (
    <div className="min-h-screen bg-[#2E5090] flex items-center justify-center px-6 py-16">
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

      {/* Contact Card */}
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-[#3B6BB5] to-[#254680] p-12 md:p-16 border-2 border-amber-500/30 shadow-2xl">
          {/* Logo */}
          <div className="text-center mb-8">
            <Image
              src={LOGO_LEGACY_GROUP}
              alt="Wave Crest Legacy Group"
              width={300}
              height={100}
              className="h-16 w-auto mx-auto"
              priority
            />
          </div>

          {/* Header */}
          <div className="text-center space-y-4 mb-10">
            <h1 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0]">
              Let's Connect
            </h1>
            <p className="body-text text-lg text-[#a8a29e]">
              Ready to bring clarity, structure, and momentum to your next chapter?
            </p>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 body-text">
            {/* Email */}
            <div className="text-center p-6 bg-[#2E5090]/50 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold mb-2">
                Email
              </p>
              <a
                href="mailto:info@wavecrestlegacy.com"
                className="text-xl md:text-2xl text-[#f5f5f0] hover:text-amber-400 transition-colors"
              >
                info@wavecrestlegacy.com
              </a>
            </div>

            {/* Phone */}
            <div className="text-center p-6 bg-[#2E5090]/50 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold mb-2">
                Phone
              </p>
              <a
                href="tel:+18176463927"
                className="text-xl md:text-2xl text-[#f5f5f0] hover:text-amber-400 transition-colors"
              >
                (817) 646-3927
              </a>
            </div>

            {/* Address */}
            <div className="text-center p-6 bg-[#2E5090]/50 border border-amber-500/20">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-400 font-semibold mb-2">
                Address
              </p>
              <p className="text-lg text-[#a8a29e]">
                8708 Technology Forest Place<br />
                Suite 175<br />
                Houston, TX
              </p>
            </div>
          </div>

          {/* Or Fill Out Form */}
          <div className="mt-10 pt-8 border-t border-amber-500/20 text-center">
            <p className="body-text text-[#a8a29e] mb-4">
              Prefer to share more details about your project?
            </p>
            <a
              href="/lets-connect"
              className="inline-block px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-[#2E5090] font-bold body-text hover:shadow-xl hover:shadow-amber-500/30 transition-all duration-300"
            >
              Fill Out Our Form
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
