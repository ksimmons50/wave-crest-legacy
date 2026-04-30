"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Phone } from "lucide-react";
import { formatPhoneNumber } from "@/app/utils/phoneUtils";
import {
  PROFESSIONAL_PHONE,
  LOGO_LEGACY_GROUP,
} from "@/professionalConstants";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Let's Connect", href: "/lets-connect" },
];

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`relative z-50 transition-all duration-500 bg-foreground/95 backdrop-blur-xl py-4`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <Image src={LOGO_LEGACY_GROUP} alt="Wave Crest Legacy Group" width={180} height={60} className="h-10 w-auto object-contain" />
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-10">
            {NAV_LINKS.map((link, index) => (
              <Link
                key={link.label}
                href={link.href}
                className="group relative text-[11px] font-light text-background/70 hover:text-background transition-colors duration-300 uppercase tracking-[0.2em] py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-primary/60 group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </div>

          {/* Phone CTA */}
          {PROFESSIONAL_PHONE && (
            <a
              href={`tel:${PROFESSIONAL_PHONE}`}
              className="hidden md:flex items-center gap-2 text-[11px] text-background tracking-[0.1em] bg-gradient-to-r from-primary/20 to-primary/20 hover:from-primary/30 hover:to-primary/30 border border-primary/30 hover:border-primary/50 px-5 py-2.5 transition-all duration-300"
            >
              <Phone className="w-3.5 h-3.5 text-primary" />
              <span>{formatPhoneNumber(PROFESSIONAL_PHONE)}</span>
            </a>
          )}

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-background"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-4 flex flex-col justify-between">
              <span
                className={`block w-full h-px bg-background transition-all duration-300 origin-center ${
                  mobileMenuOpen ? "rotate-45 translate-y-[7px]" : ""
                }`}
              />
              <span
                className={`block w-full h-px bg-background transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0 scale-0" : ""
                }`}
              />
              <span
                className={`block w-full h-px bg-background transition-all duration-300 origin-center ${
                  mobileMenuOpen ? "-rotate-45 -translate-y-[7px]" : ""
                }`}
              />
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
}
