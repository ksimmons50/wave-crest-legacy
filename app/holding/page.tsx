"use client";

import Link from "next/link";
import Image from "next/image";
import { FileText, Calculator, TrendingUp, Shield, Home, CheckCircle, Users, Award } from "lucide-react";
import { PROFESSIONAL_IMAGES, LOGO_HOLDING } from "@/professionalConstants";

export default function HoldingPage() {
  const ownerFinanceBenefits = [
    "Create stable, affordable pathways to homeownership",
    "Serve families who are ready to buy but underserved by traditional lending",
    "Maintain control of the asset and the quality of the transaction",
    "Build long term, predictable cashflow for the business",
    "Strengthen neighborhoods through responsible, transparent lending practices"
  ];

  const alternativeMethods = [
    "Conventional retail resale",
    "Investor wholesale or assignment",
    "Rental hold strategies",
    "Portfolio disposition opportunities",
    "Hybrid exit structures when appropriate"
  ];

  const whyItMatters = [
    {
      icon: Shield,
      title: "Consistent underwriting",
      description: "Professional standards on every transaction"
    },
    {
      icon: FileText,
      title: "Clean, compliant documentation",
      description: "Protecting buyers and the business"
    },
    {
      icon: Calculator,
      title: "Professional servicing",
      description: "Expert payment management and support"
    },
    {
      icon: Award,
      title: "Stronger asset protection",
      description: "Strategic positioning for long-term success"
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
                  src={LOGO_HOLDING}
                  alt="Wave Crest Legacy Holding, LLC"
                  width={300}
                  height={100}
                  className="h-20 w-auto"
                  priority
                />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Where Discipline Meets Long-Term Vision
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-4">
                The engine that powers our mission to build wealth with precision and purpose
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Centralized management for sustainable exit strategies and owner finance opportunities
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={PROFESSIONAL_IMAGES[0]?.url || ''}
                alt={PROFESSIONAL_IMAGES[0]?.description || 'Mortgage holding services'}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* What We Do */}
          <div className="bg-white rounded-2xl p-10 shadow-xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              What We Do
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Wave Crest Legacy Holding, LLC serves as the centralized entity for managing, servicing, and executing the long term exit strategies of Wave Crest Legacy Group.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              The Holding company ensures every property is structured, protected, and positioned for sustainable performance — whether the exit is owner finance, conventional resale, or another method that best serves the business and the community.
            </p>
          </div>

          {/* Owner Financing - Primary Strategy */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-10 text-white shadow-xl mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-4">
                <Home className="w-5 h-5" />
                <span className="text-sm font-semibold">Our Primary Sales Strategy</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Owner Financing
              </h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Owner financing is the heart of our mission
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {ownerFinanceBenefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                  <CheckCircle className="w-6 h-6 flex-shrink-0 mt-0.5" />
                  <span className="text-lg">{benefit}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-blue-100 italic">
                Owner finance deals are structured through Wave Crest Legacy Holding, LLC to ensure compliance, servicing stability, and long term asset protection.
              </p>
            </div>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mortgage Notes</h3>
              <p className="text-gray-600">Secure holding and management of mortgage notes</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Process</h3>
              <p className="text-gray-600">Professional and confidential service</p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-2 border-green-200">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Calculator className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Payment Examples</h3>
              <p className="text-sm text-gray-700 font-semibold mb-3">$260,000 Home - Monthly P&I</p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center bg-white/70 px-3 py-2 rounded">
                  <span className="text-gray-700">25% down (8.5%)</span>
                  <span className="font-bold text-green-700">$1,499/mo</span>
                </div>
                <div className="flex justify-between items-center bg-white/70 px-3 py-2 rounded">
                  <span className="text-gray-700">20% down (8.9%)</span>
                  <span className="font-bold text-blue-700">$1,631/mo</span>
                </div>
                <div className="flex justify-between items-center bg-white/70 px-3 py-2 rounded">
                  <span className="text-gray-700">15% down (9.5%)</span>
                  <span className="font-bold text-purple-700">$1,859/mo</span>
                </div>
                <div className="flex justify-between items-center bg-white/70 px-3 py-2 rounded">
                  <span className="text-gray-700">10% down (10%)</span>
                  <span className="font-bold text-orange-700">$2,053/mo</span>
                </div>
              </div>
              <p className="text-xs text-gray-600 mt-3 italic">*Higher down payment = lower monthly payment</p>
            </div>
          </div>

          {/* Alternative Sales Methods */}
          <div className="bg-white rounded-2xl p-10 shadow-xl mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
              Open to Conventional and Alternative Sales Methods
            </h2>
            <p className="text-lg text-gray-700 text-center mb-8 max-w-3xl mx-auto">
              While owner financing is our preferred and primary strategy, we remain flexible and responsive to market conditions. Wave Crest Legacy Holding, LLC evaluates each property individually and may pursue:
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
              {alternativeMethods.map((method, index) => (
                <div key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{method}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-3">Our Commitment is Simple:</h3>
              <p className="text-lg text-gray-200">
                Choose the exit strategy that protects the business, serves the buyer, and preserves the long term legacy of Wave Crest.
              </p>
            </div>
          </div>

          {/* Down Payment & Interest Rate Tiers */}
          <div className="bg-white rounded-2xl p-10 shadow-xl mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Competitive Interest Rates
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Save thousands with a higher down payment. All loans are 30-year fixed rates with no balloon payments.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
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

            <div className="mt-8 text-center">
              <div className="inline-flex items-center gap-2 bg-blue-50 px-6 py-3 rounded-full border border-blue-200">
                <Shield className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-semibold text-blue-900">
                  30-Year Fixed Rate • No Balloon Payments • No Surprises
                </span>
              </div>
            </div>
          </div>

          {/* Why This Matters */}
          <div className="mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Why This Matters
            </h2>
            <p className="text-lg text-gray-700 text-center mb-10 max-w-3xl mx-auto">
              By centralizing our exit strategies under the Holding company, we ensure:
            </p>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyItMatters.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-8 text-center">
              <p className="text-lg text-gray-700 italic">
                A unified brand experience for buyers, sellers, and partners
              </p>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Complete our credit questionnaire to begin the process
            </p>
            <Link
              href="/credit-questionnaire"
              className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Complete Credit Questionnaire
            </Link>
          </div>

          {/* Contact Info */}
          <div className="mt-16 text-center">
            <p className="text-gray-600 mb-2">Questions? Contact us:</p>
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
