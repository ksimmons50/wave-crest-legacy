"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { formatPhoneNumber } from "@/app/utils/phoneUtils";
import {
  PROFESSIONAL_NAME,
  PROFESSIONAL_PHONE,
  PROFESSIONAL_EMAIL,
  PROFESSIONAL_ADDRESS,
  PROFESSIONAL_SOCIAL_LINKS,
  LOGO_LEGACY_GROUP,
} from "@/professionalConstants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2E5090] border-t border-amber-500/20 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center text-center mb-12">
          <Link href="/" className="mb-5 inline-flex items-center justify-center bg-background rounded-lg px-5 py-3">
            <Image
              src={LOGO_LEGACY_GROUP}
              alt={PROFESSIONAL_NAME}
              width={240}
              height={120}
              className="h-14 w-auto object-contain"
            />
          </Link>
          <p className="body-text text-amber-400 text-lg">
            Clarity. Structure. Momentum.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex justify-center gap-8 mb-12">
          <Link
            href="/"
            className="body-text text-[#a8a29e] hover:text-amber-400 transition-colors duration-300"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="body-text text-[#a8a29e] hover:text-amber-400 transition-colors duration-300"
          >
            About
          </Link>
          <Link
            href="/services"
            className="body-text text-[#a8a29e] hover:text-amber-400 transition-colors duration-300"
          >
            Services
          </Link>
          <Link
            href="/contact"
            className="body-text text-[#a8a29e] hover:text-amber-400 transition-colors duration-300"
          >
            Contact
          </Link>
        </div>

        {/* Copyright */}
        <div className="border-t border-amber-500/20 pt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-3">
            <p className="body-text text-[#a8a29e] text-sm">
              © {currentYear} Wave Crest Legacy Group, LLC
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
