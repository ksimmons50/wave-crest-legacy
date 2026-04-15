"use client";

import Link from "next/link";
import Image from "next/image";
import { Home, MapPin, DollarSign, CheckCircle, XCircle, Shield, TrendingUp, Target, Award } from "lucide-react";
import { PROFESSIONAL_IMAGES, LOGO_ACQUISITIONS } from "@/professionalConstants";

export default function AcquisitionsPage() {
  const buyBoxCriteria = [
    {
      title: "Property Types",
      items: [
        "Single family homes",
        "Townhomes and duplexes",
        "1970s–2000s construction preferred",
        "Cosmetic to full gut rehabs acceptable",
        "No burnouts, major structural collapse, or unpermittable additions"
      ]
    },
    {
      title: "Location Criteria",
      items: [
        "Greater Houston area",
        "Missouri City, Cypress, Katy, Pearland, Baytown, Humble, Spring",
        "Strong rental comps and stable owner occupant demand",
        "Avoid floodway; floodplain considered case by case"
      ]
    },
    {
      title: "Financial Targets",
      items: [
        "ARV Range: $220K–$350K (sweet spot)",
        "Minimum Monthly Spread: $800+ after PITI + reserves",
        "Rehab Budget: Must align with Houston baselines",
        "Exit Strategy: Owner finance preferred; rental viability required as backup"
      ]
    }
  ];

  const corePrinciples = [
    {
      icon: Target,
      title: "Discipline over emotion",
      description: "Numbers and risk posture drive decisions"
    },
    {
      icon: Home,
      title: "Rehab realism",
      description: "Scopes match actual Houston labor and material costs"
    },
    {
      icon: Shield,
      title: "Operational control",
      description: "We manage the process, timeline, and quality"
    },
    {
      icon: TrendingUp,
      title: "Owner finance viability",
      description: "Every deal must support a safe, sustainable exit"
    },
    {
      icon: Award,
      title: "Legacy mindset",
      description: "We build assets that outlast the transaction"
    }
  ];

  const goNoCriteria = [
    {
      type: "GO",
      icon: CheckCircle,
      color: "green",
      criteria: [
        "ARV comps support conservative underwriting",
        "Rehab fits within realistic Houston cost ranges",
        "Foundation, roof, HVAC, plumbing, and electrical are fixable within budget",
        "Monthly spread meets or exceeds Wave Crest thresholds",
        "Neighborhood supports owner finance demand",
        "Clear path to clean title and insurable structure",
        "Contractor availability aligns with timeline"
      ]
    },
    {
      type: "NO GO",
      icon: XCircle,
      color: "red",
      criteria: [
        "ARV is inflated or comp set is unreliable",
        "Rehab exceeds margin protection or introduces structural unknowns",
        "Foundation, roof, or mechanicals exceed allowable risk",
        "Monthly spread falls below minimum thresholds",
        "Floodway, environmental, or permitting issues threaten exit strategy",
        "Seller expectations are unrealistic",
        "Timeline risk outweighs potential return"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div>
              <div className="mb-8">
                <Image
                  src={LOGO_ACQUISITIONS}
                  alt="Wave Crest Legacy Acquisitions, LLC"
                  width={300}
                  height={100}
                  className="h-20 w-auto"
                  priority
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Legacy Built One Deal at a Time
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-4">
                Building Wealth with Precision and Purpose
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We buy with precision, rehab with intention, and exit with integrity.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={PROFESSIONAL_IMAGES[1]?.url || ''}
                alt={PROFESSIONAL_IMAGES[1]?.description || 'Houston property acquisitions'}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Who We Are */}
          <div className="bg-white rounded-2xl p-10 shadow-xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Who We Are
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Wave Crest Legacy Acquisitions is a Houston based acquisitions and redevelopment company focused on transforming distressed residential properties into safe, stable, owner finance opportunities for working families.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              We operate with discipline, transparency, and a long term mindset: <strong>Legacy Built One Deal at a Time.</strong>
            </p>
          </div>

          {/* What We Do / Why We Exist */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-10 text-white shadow-xl">
              <h2 className="text-3xl font-bold mb-6">What We Do</h2>
              <p className="text-lg leading-relaxed mb-6">
                Wave Crest Legacy Acquisitions identifies, acquires, and revitalizes residential properties across the Houston area.
              </p>
              <p className="text-lg leading-relaxed">
                We specialize in turning distressed homes into safe, affordable owner finance opportunities for families who deserve a path to homeownership.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl p-10 text-white shadow-xl">
              <h2 className="text-3xl font-bold mb-6">Why We Exist</h2>
              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <span>Because every family deserves a chance to build stability</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <span>Because every neighborhood deserves investment</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
                  <span>Because legacy is built through disciplined, repeatable action</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Our Promise */}
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-10 text-center text-white shadow-xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Promise</h2>
            <div className="text-2xl md:text-3xl font-semibold space-y-3">
              <p>We buy right.</p>
              <p>We rehab right.</p>
              <p>We exit right.</p>
              <p className="text-blue-300 mt-4">Every time.</p>
            </div>
          </div>

          {/* Core Principles */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Our Acquisition Philosophy
            </h2>
            <p className="text-lg text-gray-700 text-center mb-10 max-w-3xl mx-auto">
              Every deal must protect the business, the community, and the long term health of the Wave Crest ecosystem.
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {corePrinciples.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{principle.title}</h3>
                    <p className="text-gray-600">{principle.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Buy Box Criteria */}
          <div className="bg-white rounded-2xl p-10 shadow-xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Wave Crest Buy Box
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {buyBoxCriteria.map((category, index) => (
                <div key={index}>
                  <h3 className="text-xl font-semibold text-blue-600 mb-4">{category.title}</h3>
                  <ul className="space-y-3">
                    {category.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-700">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Down Payment Tiers */}
            <div className="mt-10 pt-8 border-t border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 text-center">Interest Rate Tiers</h3>
              <p className="text-center text-gray-600 mb-6">Save thousands with a higher down payment - All 30-year fixed rates</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="relative bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border-2 border-green-300 shadow-lg">
                  <div className="absolute -top-3 -right-3 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                    BEST RATE
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-700 mb-2">8.5%</div>
                    <div className="text-sm text-gray-600 mb-4">Interest Rate</div>
                    <div className="text-2xl font-semibold text-gray-900 mb-1">25%</div>
                    <div className="text-sm text-gray-600">Down Payment</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 shadow-lg">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-blue-700 mb-2">8.9%</div>
                    <div className="text-sm text-gray-600 mb-4">Interest Rate</div>
                    <div className="text-2xl font-semibold text-gray-900 mb-1">20%</div>
                    <div className="text-sm text-gray-600">Down Payment</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200 shadow-lg">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-purple-700 mb-2">9.5%</div>
                    <div className="text-sm text-gray-600 mb-4">Interest Rate</div>
                    <div className="text-2xl font-semibold text-gray-900 mb-1">15%</div>
                    <div className="text-sm text-gray-600">Down Payment</div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border-2 border-orange-200 shadow-lg">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-orange-700 mb-2">10%</div>
                    <div className="text-sm text-gray-600 mb-4">Interest Rate</div>
                    <div className="text-2xl font-semibold text-gray-900 mb-1">10%</div>
                    <div className="text-sm text-gray-600">Down Payment</div>
                    <div className="text-xs text-orange-600 font-semibold mt-2">Minimum</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Go / No Go Criteria */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Go / No Go Criteria
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {goNoCriteria.map((section, index) => {
                const Icon = section.icon;
                const colorClasses = section.color === 'green'
                  ? 'from-green-50 to-green-100 border-green-300'
                  : 'from-red-50 to-red-100 border-red-300';
                const iconColor = section.color === 'green' ? 'text-green-600' : 'text-red-600';

                return (
                  <div key={index} className={`bg-gradient-to-br ${colorClasses} border-2 rounded-2xl p-8 shadow-lg`}>
                    <div className="flex items-center gap-3 mb-6">
                      <Icon className={`w-10 h-10 ${iconColor}`} />
                      <h3 className="text-2xl font-bold text-gray-900">{section.type}</h3>
                    </div>
                    <ul className="space-y-3">
                      {section.criteria.map((criterion, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-700">
                          <div className={`w-2 h-2 rounded-full ${section.color === 'green' ? 'bg-green-600' : 'bg-red-600'} flex-shrink-0 mt-2`}></div>
                          <span>{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Have a Property to Sell?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              We buy houses for cash in Houston - fast, fair, and hassle-free
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@wavecrestlegacy.com"
                className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Contact Us Today
              </a>
              <a
                href="tel:+18176463927"
                className="px-8 py-4 border-2 border-white text-white font-semibold text-lg rounded-xl hover:bg-white/10 transition-colors"
              >
                Call (817) 646-3927
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-2">Questions about selling your property?</p>
            <p className="text-lg font-semibold text-gray-900">
              <a href="mailto:info@wavecrestlegacy.com" className="text-blue-600 hover:text-blue-700">
                info@wavecrestlegacy.com
              </a>
            </p>
            <p className="text-lg font-semibold text-gray-900">
              <a href="tel:+18176463927" className="text-blue-600 hover:text-blue-700">
                (817) 646-3927
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
