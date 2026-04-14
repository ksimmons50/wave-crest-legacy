"use client";

import Link from "next/link";
import Image from "next/image";
import { FileText, Calculator, TrendingUp, Shield } from "lucide-react";
import { PROFESSIONAL_IMAGES, LOGO_HOLDING } from "@/professionalConstants";

export default function HoldingPage() {
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
                Professional Mortgage Note Services
              </h1>
              <p className="text-xl md:text-2xl text-gray-600">
                30-year fixed-rate mortgages with no balloon payments and competitive rates
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

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Mortgage Notes</h3>
              <p className="text-gray-600">Secure holding and management of mortgage notes</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Calculator className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Rate Advantages</h3>
              <p className="text-gray-600">Lower interest rates with higher down payments - from 8.5% to 10%</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Competitive Rates</h3>
              <p className="text-gray-600">Fair and transparent financing options</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Secure Process</h3>
              <p className="text-gray-600">Professional and confidential service</p>
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
