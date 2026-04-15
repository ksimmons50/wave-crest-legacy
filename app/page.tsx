"use client";

import Link from "next/link";
import Image from "next/image";
import { FileText, Search, ClipboardCheck, Hammer, TrendingUp, Building2, ArrowRight, Users, Home, Briefcase, FileCheck, Palette, FileSpreadsheet, Target, ShieldCheck, DollarSign, ArrowDownUp, HeartHandshake } from "lucide-react";
import { PROFESSIONAL_IMAGES, LOGO_LEGACY_GROUP, LOGO_ACQUISITIONS, LOGO_HOLDING } from "@/professionalConstants";

export default function LandingPage() {
  const realEstateServices = [
    {
      icon: DollarSign,
      title: "Owner-Finance Structuring",
      description: "We design compliant, win-win owner-finance solutions that help families achieve homeownership while protecting investor interests.",
      color: "accent1"
    },
    {
      icon: FileSpreadsheet,
      title: "Deal Analysis & Underwriting",
      description: "We evaluate properties using conservative ARV models, rehab budgets, and risk-adjusted projections.",
      color: "accent2"
    },
    {
      icon: Search,
      title: "Due Diligence Support",
      description: "Title review, comps, neighborhood analysis, contractor verification, and risk scanning.",
      color: "accent3"
    },
    {
      icon: Hammer,
      title: "Rehab Oversight",
      description: "Scope of work creation, contractor coordination, payment draw structure, and quality control.",
      color: "accent4"
    },
    {
      icon: TrendingUp,
      title: "Market Studies & Valuation Support",
      description: "Houston-focused market insights, rental analysis, and resale positioning.",
      color: "accent5"
    }
  ];

  const documentationServices = [
    {
      icon: FileCheck,
      title: "Standard Operating Procedures"
    },
    {
      icon: Briefcase,
      title: "Business Plans"
    },
    {
      icon: Target,
      title: "Pitch Decks"
    },
    {
      icon: FileText,
      title: "Branded PDFs"
    },
    {
      icon: ClipboardCheck,
      title: "Process Documentation"
    },
    {
      icon: ArrowDownUp,
      title: "Workflow Design"
    },
    {
      icon: Palette,
      title: "Logo-Forward Visual Identity"
    }
  ];

  const whoWeServe = [
    { icon: Building2, label: "Real estate investors" },
    { icon: Home, label: "First-time homebuyers needing flexible financing" },
    { icon: Users, label: "Entrepreneurs needing documentation" },
    { icon: Briefcase, label: "Small businesses needing branding" },
    { icon: HeartHandshake, label: "Families building long-term stability" }
  ];

  const colorClasses = {
    accent1: "bg-amber-50 text-amber-900 border-amber-200",
    accent2: "bg-emerald-50 text-emerald-900 border-emerald-200",
    accent3: "bg-sky-50 text-sky-900 border-sky-200",
    accent4: "bg-rose-50 text-rose-900 border-rose-200",
    accent5: "bg-violet-50 text-violet-900 border-violet-200"
  };

  return (
    <div className="min-h-screen bg-[#0a0e27]">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=DM+Sans:wght@400;500;700&display=swap');

        :root {
          --primary: #0a0e27;
          --secondary: #1a1f3a;
          --accent-gold: #d4af37;
          --accent-warm: #e8d4b0;
          --text-light: #f5f5f0;
          --text-muted: #a8a29e;
        }

        .hero-title {
          font-family: 'Playfair Display', serif;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .body-text {
          font-family: 'DM Sans', sans-serif;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }

        .grain-overlay {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 grain-overlay"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0a0e27]"></div>

        {/* Decorative geometric shapes */}
        <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-amber-500/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-sky-500/10 to-transparent rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto relative z-10 py-20">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left Content - 7 columns */}
            <div className="lg:col-span-7 space-y-8">
              {/* Logo */}
              <div className="animate-fade-in-up" style={{animationDelay: '0.1s', opacity: 0}}>
                <Image
                  src={LOGO_LEGACY_GROUP}
                  alt="Wave Crest Legacy Group"
                  width={300}
                  height={100}
                  className="h-24 w-auto"
                  priority
                />
              </div>

              {/* Label */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm animate-fade-in-up" style={{animationDelay: '0.2s', opacity: 0}}>
                <Building2 className="w-4 h-4 text-amber-400" />
                <span className="text-sm font-medium text-amber-300 body-text tracking-wide">Real Estate & Business Consulting</span>
              </div>

              {/* Main Heading */}
              <h1 className="hero-title text-4xl md:text-5xl lg:text-6xl font-black text-[#f5f5f0] animate-fade-in-up leading-tight" style={{animationDelay: '0.3s', opacity: 0}}>
                Empowering families, investors, and entrepreneurs through{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
                    clarity, structure, and sustainable real estate solutions
                  </span>
                  <span className="absolute inset-0 animate-shimmer"></span>
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-xl md:text-2xl text-[#a8a29e] body-text leading-relaxed max-w-xl animate-fade-in-up" style={{animationDelay: '0.4s', opacity: 0}}>
                We document, design, acquire, and develop with purpose — building long-term stability and legacy.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4 animate-fade-in-up" style={{animationDelay: '0.5s', opacity: 0}}>
                <a
                  href="#services"
                  className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-[#0a0e27] font-bold body-text overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Our Services
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </a>
                <a
                  href="#ecosystem"
                  className="px-8 py-4 border-2 border-[#a8a29e]/30 text-[#f5f5f0] font-bold body-text hover:border-amber-500/50 hover:bg-amber-500/5 transition-all duration-300"
                >
                  Our Ecosystem
                </a>
              </div>
            </div>

            {/* Right Content - 5 columns */}
            <div className="lg:col-span-5 relative animate-fade-in-up" style={{animationDelay: '0.7s', opacity: 0}}>
              <div className="relative">
                {/* Decorative frame */}
                <div className="absolute -inset-4 bg-gradient-to-br from-amber-500/20 to-sky-500/20 rounded-2xl blur-xl"></div>

                {/* Image container */}
                <div className="relative h-[600px] rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl">
                  <Image
                    src={PROFESSIONAL_IMAGES[2]?.url || ''}
                    alt={PROFESSIONAL_IMAGES[2]?.description || 'Professional consulting'}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e27]/80 via-transparent to-transparent"></div>

                  {/* Floating accent */}
                  <div className="absolute bottom-8 left-8 right-8 p-6 bg-[#1a1f3a]/80 backdrop-blur-md border border-amber-500/30 rounded-xl">
                    <div className="text-sm text-amber-400 font-semibold body-text mb-1">Houston-Based</div>
                    <div className="text-lg text-[#f5f5f0] body-text">Building legacy through sustainable real estate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

          {/* Wave Crest Legacy Ecosystem */}
          <section id="ecosystem" className="relative py-32 px-6 bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a]">
            <div className="absolute inset-0 grain-overlay"></div>
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm mb-6">
                  <Building2 className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-amber-300 body-text tracking-wide">Our Structure</span>
                </div>
                <h2 className="hero-title text-5xl md:text-6xl font-black text-[#f5f5f0] mb-6">
                  The Wave Crest Legacy Ecosystem
                </h2>
                <p className="text-xl text-[#a8a29e] body-text max-w-2xl mx-auto">
                  Three integrated entities working together to build sustainable, long-term value
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {/* Wave Crest Legacy Group */}
                <div className="group relative p-8 bg-[#1a1f3a]/50 backdrop-blur-sm border border-amber-500/20 hover:bg-[#1a1f3a] transition-all duration-500 hover:scale-105 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-transparent transition-all duration-500"></div>

                  <div className="relative z-10">
                    <div className="mb-6">
                      <Image
                        src={LOGO_LEGACY_GROUP}
                        alt="Wave Crest Legacy Group"
                        width={200}
                        height={60}
                        className="h-16 w-auto"
                      />
                    </div>
                    <h3 className="hero-title text-2xl font-bold text-amber-400 mb-4">Wave Crest Legacy Group</h3>
                    <p className="body-text text-[#a8a29e] leading-relaxed">
                      Strategic documentation, business clarity, branding, mentorship, and operational support.
                    </p>
                  </div>
                </div>

                {/* Wave Crest Legacy Acquisitions */}
                <div className="group relative p-8 bg-[#1a1f3a]/50 backdrop-blur-sm border border-sky-500/20 hover:bg-[#1a1f3a] transition-all duration-500 hover:scale-105 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-500/0 to-sky-500/0 group-hover:from-sky-500/5 group-hover:to-transparent transition-all duration-500"></div>

                  <div className="relative z-10">
                    <div className="mb-6">
                      <Image
                        src={LOGO_ACQUISITIONS}
                        alt="Wave Crest Legacy Acquisitions"
                        width={200}
                        height={60}
                        className="h-16 w-auto"
                      />
                    </div>
                    <h3 className="hero-title text-2xl font-bold text-sky-400 mb-4">Wave Crest Legacy Acquisitions</h3>
                    <p className="body-text text-[#a8a29e] leading-relaxed">
                      Real estate acquisitions, rehabs, due diligence, deal analysis, and owner-finance exit strategies.
                    </p>
                  </div>
                </div>

                {/* Wave Crest Legacy Holding */}
                <div className="group relative p-8 bg-[#1a1f3a]/50 backdrop-blur-sm border border-purple-500/20 hover:bg-[#1a1f3a] transition-all duration-500 hover:scale-105 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-purple-500/0 group-hover:from-purple-500/5 group-hover:to-transparent transition-all duration-500"></div>

                  <div className="relative z-10">
                    <div className="mb-6">
                      <Image
                        src={LOGO_HOLDING}
                        alt="Wave Crest Legacy Holding"
                        width={200}
                        height={60}
                        className="h-16 w-auto"
                      />
                    </div>
                    <h3 className="hero-title text-2xl font-bold text-purple-400 mb-4">Wave Crest Legacy Holding</h3>
                    <p className="body-text text-[#a8a29e] leading-relaxed">
                      Long-term asset management, note servicing, and legacy-building real estate operations.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Real Estate Support Services */}
          <section id="services" className="relative py-32 px-6 bg-[#0a0e27]">
            <div className="absolute inset-0 grain-overlay"></div>
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm mb-6">
                  <Home className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-amber-300 body-text tracking-wide">Real Estate Expertise</span>
                </div>
                <h2 className="hero-title text-5xl md:text-6xl font-black text-[#f5f5f0] mb-6">
                  Real Estate Support Services
                </h2>
                <p className="text-xl text-[#a8a29e] body-text max-w-2xl mx-auto">
                  Comprehensive support for investors, from acquisition to exit
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {realEstateServices.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <div
                      key={index}
                      className={`group relative p-8 bg-[#1a1f3a]/50 backdrop-blur-sm border ${colorClasses[service.color as keyof typeof colorClasses].split(' ')[2]} hover:bg-[#1a1f3a] transition-all duration-500 hover:scale-105 overflow-hidden`}
                      style={{animationDelay: `${index * 0.1}s`}}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-transparent transition-all duration-500"></div>

                      <div className="relative z-10">
                        <div className={`w-14 h-14 ${colorClasses[service.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border`}>
                          <Icon className="w-7 h-7" />
                        </div>
                        <h3 className="hero-title text-2xl font-bold text-[#f5f5f0] mb-4">{service.title}</h3>
                        <p className="body-text text-[#a8a29e] leading-relaxed">{service.description}</p>

                        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-amber-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Business Documentation & Branding */}
          <section className="relative py-32 px-6 bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a]">
            <div className="absolute inset-0 grain-overlay"></div>
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm mb-6">
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-amber-300 body-text tracking-wide">Professional Clarity</span>
                </div>
                <h2 className="hero-title text-5xl md:text-6xl font-black text-[#f5f5f0] mb-6">
                  Business Documentation & Branding
                </h2>
                <p className="text-xl text-[#a8a29e] body-text max-w-2xl mx-auto">
                  Professional, structured, and legacy-focused documentation that brings clarity to your business
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                {documentationServices.map((service, index) => {
                  const Icon = service.icon;
                  return (
                    <div
                      key={index}
                      className="group relative p-6 bg-[#1a1f3a]/50 backdrop-blur-sm border border-amber-500/20 hover:bg-[#1a1f3a] transition-all duration-500 hover:scale-105 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-transparent transition-all duration-500"></div>

                      <div className="relative z-10 text-center">
                        <div className="w-12 h-12 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-lg flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300">
                          <Icon className="w-6 h-6" />
                        </div>
                        <h3 className="body-text font-semibold text-[#f5f5f0]">{service.title}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Who We Serve */}
          <section className="relative py-32 px-6 bg-[#0a0e27]">
            <div className="absolute inset-0 grain-overlay"></div>
            <div className="max-w-7xl mx-auto relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm mb-6">
                  <Users className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-amber-300 body-text tracking-wide">Our Community</span>
                </div>
                <h2 className="hero-title text-5xl md:text-6xl font-black text-[#f5f5f0] mb-6">
                  Who We Serve
                </h2>
                <p className="text-xl text-[#a8a29e] body-text max-w-2xl mx-auto">
                  Building partnerships with those committed to long-term value
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {whoWeServe.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="group relative p-8 bg-[#1a1f3a]/50 backdrop-blur-sm border border-amber-500/20 hover:bg-[#1a1f3a] transition-all duration-500 hover:scale-105 overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-amber-500/0 group-hover:from-amber-500/5 group-hover:to-transparent transition-all duration-500"></div>

                      <div className="relative z-10 flex items-center gap-4">
                        <div className="w-12 h-12 bg-amber-500/10 text-amber-400 border border-amber-500/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                          <Icon className="w-6 h-6" />
                        </div>
                        <p className="body-text text-[#f5f5f0] font-medium">{item.label}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Why Owner Finance */}
          <section className="relative py-32 px-6 bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a]">
            <div className="absolute inset-0 grain-overlay"></div>
            <div className="max-w-5xl mx-auto relative z-10">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 backdrop-blur-sm mb-6">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-medium text-amber-300 body-text tracking-wide">Investment Strategy</span>
                </div>
                <h2 className="hero-title text-5xl md:text-6xl font-black text-[#f5f5f0] mb-6">
                  Why Owner Finance?
                </h2>
              </div>

              <div className="bg-[#1a1f3a]/50 backdrop-blur-sm border border-amber-500/20 p-10 md:p-12">
                <p className="text-xl text-[#a8a29e] body-text leading-relaxed mb-8">
                  Owner financing creates a pathway to homeownership for families who need flexible solutions, while building stable, long-term income streams for investors.
                </p>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                    <p className="body-text text-[#a8a29e] leading-relaxed">
                      <span className="text-[#f5f5f0] font-semibold">Helps families</span> who need flexible pathways to homeownership
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                    <p className="body-text text-[#a8a29e] leading-relaxed">
                      <span className="text-[#f5f5f0] font-semibold">Creates stable</span>, long-term income streams
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                    <p className="body-text text-[#a8a29e] leading-relaxed">
                      <span className="text-[#f5f5f0] font-semibold">Aligns incentives</span> between buyer and seller
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-2 h-2 bg-amber-400 rounded-full mt-2"></div>
                    <p className="body-text text-[#a8a29e] leading-relaxed">
                      <span className="text-[#f5f5f0] font-semibold">Supports community</span> stability
                    </p>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-amber-500/20">
                  <p className="body-text text-[#a8a29e] text-center italic">
                    We treat owner financing as an investment strategy, not retail inventory.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <section className="relative py-32 px-6 bg-gradient-to-b from-[#1a1f3a] to-[#0a0e27]">
            <div className="absolute inset-0 grain-overlay"></div>
            <div className="max-w-4xl mx-auto relative z-10">
              <div className="relative overflow-hidden bg-gradient-to-br from-amber-500/10 via-[#1a1f3a]/50 to-sky-500/10 backdrop-blur-sm border border-amber-500/30 p-12 md:p-16 text-center">
                {/* Decorative corner elements */}
                <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-amber-500/30"></div>
                <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-amber-500/30"></div>

                <div className="relative z-10">
                  <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0] mb-6">
                    Let's Work Together
                  </h2>
                  <p className="text-xl body-text text-[#a8a29e] mb-10 max-w-2xl mx-auto">
                    Ready to build clarity, structure, and sustainable value? Connect with us today.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                    <a
                      href="mailto:ksimmons@wavecrestlegacy.com"
                      className="group px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-600 text-[#0a0e27] font-bold body-text hover:shadow-2xl hover:shadow-amber-500/50 hover:scale-105 transition-all duration-300"
                    >
                      <span className="flex items-center gap-2">
                        Email Us
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </a>
                    <a
                      href="tel:+18176463927"
                      className="px-8 py-4 border-2 border-amber-500/50 text-[#f5f5f0] font-bold body-text hover:bg-amber-500/10 hover:border-amber-500 transition-all duration-300"
                    >
                      Call (817) 646-3927
                    </a>
                  </div>

                  <div className="pt-8 border-t border-amber-500/20 space-y-2">
                    <p className="body-text text-[#a8a29e]">
                      8708 Technology Forest Place #175, Houston, TX
                    </p>
                    <p className="body-text text-amber-400 font-medium">
                      Wave Crest Legacy Group proudly serves the Greater Houston area.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
    </div>
  );
}
