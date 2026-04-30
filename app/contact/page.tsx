"use client";

import { useEffect } from "react";
import Image from "next/image";
import FloatingChat from "../components/FloatingChat";
import { LOGO_LEGACY_GROUP } from "@/professionalConstants";

export default function ContactPage() {
  useEffect(() => {
    // Load the Breezy form script
    const script = document.createElement('script');
    script.src = 'https://app.getbreezy.app/embeddable/lead-form-direct.js';
    script.setAttribute('data-token', 'caf098fe22e8bbcbee5cfd56e06f4978f9d72fe18807cdff77cfb925fb50');
    script.setAttribute('data-button-text', 'Submit');
    script.setAttribute('data-button-color', '#d4af37');
    script.setAttribute('data-fields', 'name,email,phone,type,message');
    script.setAttribute('data-required', 'name,email,type,message');
    script.setAttribute('data-type-options', 'Acquisition Opportunity,Owner-Finance Inquiry,Partnership Discussion,General Question');
    script.setAttribute('data-success-message', "Thank you! We'll be in touch soon.");
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
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

      {/* Let's Connect - Combined Header and Form */}
      <section className="relative py-16 px-6 bg-gradient-to-b from-[#2E5090] to-[#3B6BB5]">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-6 mb-12">
            <Image
              src={LOGO_LEGACY_GROUP}
              alt="Wave Crest Legacy Group"
              width={300}
              height={100}
              className="h-16 w-auto mx-auto"
              priority
            />
            <h1 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0]">
              Get In Touch
            </h1>
            <p className="body-text text-lg text-[#a8a29e] max-w-2xl mx-auto">
              Share what you're working on and let's bring clarity, structure, and momentum to your next chapter.
            </p>
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            <div id="breezy-form-container"></div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="relative py-20 px-6 bg-[#2E5090] mb-20">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="hero-title text-2xl font-bold text-amber-400">
            Or reach us directly
          </h2>
          <div className="space-y-3 body-text text-[#a8a29e]">
            <p>
              <a
                href="mailto:info@wavecrestlegacy.com"
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                info@wavecrestlegacy.com
              </a>
            </p>
            <p>
              <a
                href="tel:+18176463927"
                className="text-amber-400 hover:text-amber-300 transition-colors"
              >
                (817) 646-3927
              </a>
            </p>
            <p className="pt-4">8708 Technology Forest Place Ste 175, Houston, TX</p>
          </div>
        </div>
      </section>
      <FloatingChat />
    </div>
  );
}
