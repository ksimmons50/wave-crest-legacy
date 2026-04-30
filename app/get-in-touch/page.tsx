"use client";

import { useEffect } from "react";
import FloatingChat from "../components/FloatingChat";

export default function GetInTouchPage() {
  useEffect(() => {
    // Load the Breezy form script
    const script = document.createElement('script');
    script.src = 'https://app.getbreezy.app/embeddable/lead-form-direct.js';
    script.setAttribute('data-token', 'caf098fe22e8bbcbee5cfd56e06f4978f9d72fe18807cdff77cfb925fb50');
    script.setAttribute('data-button-text', 'Submit');
    script.setAttribute('data-button-color', '#d4af37');
    script.setAttribute('data-fields', 'name,email,phone,message');
    script.setAttribute('data-required', 'name,email,message');
    script.setAttribute('data-success-message', "Thank you! We'll be in touch soon.");
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
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

      {/* Header Section */}
      <section className="relative py-16 px-6 bg-[#2E5090]">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0] mb-4">
            Get in Touch
          </h1>
          <p className="body-text text-lg text-[#a8a29e]">
            Fill out the form below and we'll get back to you soon.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative py-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div id="breezy-form-container"></div>
        </div>
      </section>

      <FloatingChat />
    </div>
  );
}
