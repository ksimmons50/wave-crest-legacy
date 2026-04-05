"use client";

import Link from "next/link";
import { Lightbulb, Code, Home, Mic, Users, Building2, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const services = [
    {
      icon: Users,
      title: "Mentoring",
      description: "One-on-one guidance to help you achieve your personal and professional goals",
      color: "blue"
    },
    {
      icon: Code,
      title: "IT Consulting",
      description: "Technology solutions and strategic IT planning for your business needs",
      color: "purple"
    },
    {
      icon: Home,
      title: "Real Estate Consulting",
      description: "Strategic planning, business continuity, and smart home planning expertise",
      color: "green"
    },
    {
      icon: Mic,
      title: "Public Speaking",
      description: "Engaging presentations and keynote speeches for your events",
      color: "orange"
    },
    {
      icon: Lightbulb,
      title: "Brainstorming Sessions",
      description: "Collaborative sessions to unlock creative solutions and innovative strategies",
      color: "pink"
    }
  ];

  const entities = [
    {
      name: "Wave Crest Legacy Acquisitions, LLC",
      description: "We buy houses for cash in Houston - fast, fair, and hassle-free",
      link: "/acquisitions",
      icon: Building2,
      color: "from-blue-600 to-blue-700"
    },
    {
      name: "Wave Crest Legacy Holding, LLC",
      description: "Professional mortgage note holding and management services",
      link: "/holding",
      icon: Building2,
      color: "from-purple-600 to-purple-700"
    }
  ];

  const colorClasses = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
    orange: "bg-orange-100 text-orange-600",
    pink: "bg-pink-100 text-pink-600"
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Wave Crest Legacy Group, LLC
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto mb-8">
              Empowering success through consulting, mentoring, and strategic guidance
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#services"
                className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Explore Services
              </a>
              <a
                href="#entities"
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl border-2 border-blue-600"
              >
                Our Companies
              </a>
            </div>
          </div>

          {/* Services Section */}
          <div id="services" className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
              Consulting Services
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div
                    key={index}
                    className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className={`w-14 h-14 ${colorClasses[service.color as keyof typeof colorClasses]} rounded-xl flex items-center justify-center mb-6`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Entities Section */}
          <div id="entities" className="mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 text-center mb-12">
              Our Companies
            </h2>
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {entities.map((entity, index) => {
                const Icon = entity.icon;
                return (
                  <Link
                    key={index}
                    href={entity.link}
                    className="group"
                  >
                    <div className={`bg-gradient-to-br ${entity.color} p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 text-white`}>
                      <div className="flex items-start justify-between mb-6">
                        <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                          <Icon className="w-7 h-7" />
                        </div>
                        <ArrowRight className="w-6 h-6 transform group-hover:translate-x-2 transition-transform" />
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{entity.name}</h3>
                      <p className="text-white/90 leading-relaxed">{entity.description}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Contact CTA */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-12 text-center text-white shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Let's Work Together
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Ready to transform your vision into reality? Get in touch today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="mailto:ksimmons@wavecrestlegacy.com"
                className="inline-block bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Email Us
              </a>
              <a
                href="tel:+18176463927"
                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg"
              >
                Call (817) 646-3927
              </a>
            </div>
            <p className="mt-8 text-gray-400">
              8708 Technology Forest Place #175, Houston, TX
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
