"use client";

import { useState } from "react";
import Image from "next/image";
import { LOGO_LEGACY_GROUP } from "@/professionalConstants";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    supportType: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
            Let's Connect
          </h1>
          <p className="body-text text-xl text-[#a8a29e] max-w-2xl mx-auto">
            Share what you're working on and let's bring clarity, structure, and momentum to your next chapter.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="relative py-20 px-6 bg-[#3B6BB5]">
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <div className="p-12 bg-[#2E5090]/50 border border-amber-500/20 text-center space-y-4">
              <h2 className="hero-title text-3xl font-bold text-amber-400">
                Thank you!
              </h2>
              <p className="body-text text-lg text-[#a8a29e]">
                We'll be in touch soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block body-text text-[#f5f5f0] mb-2 font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2E5090] border border-amber-500/20 text-[#f5f5f0] body-text focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block body-text text-[#f5f5f0] mb-2 font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2E5090] border border-amber-500/20 text-[#f5f5f0] body-text focus:outline-none focus:border-amber-500/50 transition-colors"
                />
              </div>

              {/* Support Type */}
              <div>
                <label
                  htmlFor="supportType"
                  className="block body-text text-[#f5f5f0] mb-2 font-medium"
                >
                  What type of support are you looking for? (Optional)
                </label>
                <select
                  id="supportType"
                  name="supportType"
                  value={formData.supportType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2E5090] border border-amber-500/20 text-[#f5f5f0] body-text focus:outline-none focus:border-amber-500/50 transition-colors"
                >
                  <option value="">Select an option</option>
                  <option value="business-clarity">Business clarity</option>
                  <option value="branding">Branding</option>
                  <option value="real-estate">Real estate support</option>
                  <option value="mentorship">Mentorship</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block body-text text-[#f5f5f0] mb-2 font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#2E5090] border border-amber-500/20 text-[#f5f5f0] body-text focus:outline-none focus:border-amber-500/50 transition-colors resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-[#2E5090] font-bold body-text text-lg hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300"
                >
                  Send Message
                </button>
              </div>
            </form>
          )}
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
    </div>
  );
}
