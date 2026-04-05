"use client";

import Link from "next/link";
import { FileText, Calculator, TrendingUp, Shield } from "lucide-react";

export default function HoldingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Wave Crest Legacy Holding, LLC
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              Professional mortgage note holding and management services
            </p>
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
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Flexible Terms</h3>
              <p className="text-gray-600">Customized payment plans tailored to your needs</p>
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
