"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { FileText, DollarSign, Calendar, Home, Shield, CheckCircle, XCircle, ClipboardCheck } from "lucide-react";
import { LOGO_ACQUISITIONS } from "@/professionalConstants";

export default function BuyerCriteriaPage() {
  const [visibleSections, setVisibleSections] = useState<number[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute("data-section") || "0");
            setVisibleSections((prev) => {
              if (!prev.includes(index)) {
                return [...prev, index].sort((a, b) => a - b);
              }
              return prev;
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "-50px",
      }
    );

    const sections = document.querySelectorAll(".animate-section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  const rateTiers = [
    { down: "25% down", rate: "8.5%" },
    { down: "20% down", rate: "8.9%" },
    { down: "15% down", rate: "9.5%" },
    { down: "Below 15%", rate: "9.9%" },
  ];

  const requiredDocs = [
    "Government-issued ID",
    "Last 2 months of bank statements",
    "Proof of income (W-2, 1099, or business statements)",
    "Proof of down payment funds",
    "Rental or mortgage history (if available)",
  ];

  const incomeExpectations = [
    "Stable income",
    "Payment-to-income ratio that supports long-term success",
    "Ability to cover taxes, insurance, and maintenance",
  ];

  const buyerReceives = [
    "Monthly statements",
    "Online payment portal",
    "Year-end tax documents",
  ];

  const buyerResponsibilities = [
    "Maintain the property",
    "Pay taxes and insurance",
    "Make payments on time",
    "Communicate proactively",
  ];

  const waveCrestProvides = [
    "Clean, organized documentation",
    "Transparent terms",
    "Professional servicing",
    "A structured, stable pathway to ownership",
  ];

  const waveCrestDoesNot = [
    "No rent-to-own",
    "No verbal agreements",
    "No handshake deals",
    "No unverified income",
    "No last-minute down payment changes",
  ];

  const readyChecklist = [
    "You have your down payment ready",
    "You can provide documentation",
    "You understand the monthly payment structure",
    "You are prepared to maintain the property",
    "You want a clear, structured path to ownership",
  ];

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

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 py-32 bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a]">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          <div>
            <Image
              src={LOGO_ACQUISITIONS}
              alt="Wave Crest Legacy Acquisitions"
              width={300}
              height={100}
              className="h-20 w-auto mx-auto mb-16"
              priority
            />
          </div>

          <div className="space-y-6">
            <h1 className="hero-title text-5xl md:text-7xl font-black text-[#f5f5f0] tracking-tight">
              Buyer Requirements & Owner-Finance Criteria
            </h1>
          </div>

          <p className="body-text text-sm uppercase tracking-[0.3em] text-amber-400 font-semibold">
            Clarity. Structure. Momentum.
          </p>

          <p className="text-xl md:text-2xl text-[#f5f5f0]/80 body-text max-w-3xl mx-auto leading-relaxed">
            Wave Crest uses a transparent, disciplined structure to ensure every buyer is set up for long-term success. Below are the requirements and expectations for all owner-finance transactions.
          </p>
        </div>
      </section>

      {/* Section 1 - Down Payment & Rate Structure */}
      <section
        data-section="0"
        className="animate-section relative py-24 px-6 bg-[#2E5090]"
        style={{
          opacity: visibleSections.includes(0) ? 1 : 0,
          transform: visibleSections.includes(0) ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <DollarSign className="w-12 h-12 text-amber-400" />
            </div>
            <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0] mb-4">
              1. Down Payment & Rate Structure
            </h2>
            <p className="body-text text-lg text-[#a8a29e]">
              Our tiered system aligns down payment strength with long-term stability.
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4 mb-8">
            {rateTiers.map((tier, index) => {
              const isVisible = visibleSections.includes(0);
              const delay = index * 100;

              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-6 bg-gradient-to-br from-[#3B6BB5] to-[#254680] border border-amber-500/20"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0)" : "translateX(-30px)",
                    transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
                  }}
                >
                  <span className="body-text text-lg text-[#f5f5f0] font-medium">
                    {tier.down}
                  </span>
                  <div className="flex-1 mx-6 border-b border-dotted border-amber-500/30" />
                  <span className="hero-title text-2xl font-bold text-amber-400">
                    {tier.rate}
                  </span>
                </div>
              );
            })}
          </div>

          <p className="text-center body-text text-[#a8a29e] italic">
            A stronger down payment reduces risk and improves affordability.
          </p>
        </div>
      </section>

      {/* Section 2 - Required Documentation */}
      <section
        data-section="1"
        className="animate-section relative py-24 px-6 bg-[#3B6BB5]"
        style={{
          opacity: visibleSections.includes(1) ? 1 : 0,
          transform: visibleSections.includes(1) ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <FileText className="w-12 h-12 text-amber-400" />
            </div>
            <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0] mb-4">
              2. Required Documentation
            </h2>
            <p className="body-text text-lg text-[#a8a29e]">
              To move forward, buyers must provide:
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {requiredDocs.map((doc, index) => {
              const isVisible = visibleSections.includes(1);
              const delay = index * 100;

              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-5 bg-gradient-to-br from-[#2E5090] to-[#254680] border border-amber-500/20"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                    transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
                  }}
                >
                  <CheckCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="body-text text-[#f5f5f0] text-lg">{doc}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 3 - Income & Affordability */}
      <section
        data-section="2"
        className="animate-section relative py-24 px-6 bg-[#2E5090]"
        style={{
          opacity: visibleSections.includes(2) ? 1 : 0,
          transform: visibleSections.includes(2) ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0] mb-4">
              3. Income & Affordability Expectations
            </h2>
            <p className="body-text text-lg text-[#a8a29e] mb-8">
              We look for:
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4 mb-8">
            {incomeExpectations.map((expectation, index) => {
              const isVisible = visibleSections.includes(2);
              const delay = index * 100;

              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-5 bg-gradient-to-br from-[#3B6BB5] to-[#254680] border border-amber-500/20"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "scale(1)" : "scale(0.95)",
                    transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
                  }}
                >
                  <div className="w-2 h-2 bg-amber-400 rounded-full flex-shrink-0 mt-2" />
                  <span className="body-text text-[#f5f5f0] text-lg">{expectation}</span>
                </div>
              );
            })}
          </div>

          <p className="text-center body-text text-xl text-amber-400 font-semibold">
            We do not require perfect credit — we require responsibility.
          </p>
        </div>
      </section>

      {/* Section 4 - Closing Timeline */}
      <section
        data-section="3"
        className="animate-section relative py-24 px-6 bg-[#3B6BB5]"
        style={{
          opacity: visibleSections.includes(3) ? 1 : 0,
          transform: visibleSections.includes(3) ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Calendar className="w-12 h-12 text-amber-400" />
          </div>
          <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0] mb-6">
            4. Closing Timeline
          </h2>
          <p className="body-text text-lg text-[#a8a29e] mb-4">
            Most transactions close within:
          </p>
          <p className="body-text text-2xl text-amber-400 font-bold mb-4">
            7–14 days after documentation is received
          </p>
          <p className="body-text text-[#f5f5f0]/80 italic">
            Faster closings available for fully prepared buyers
          </p>
        </div>
      </section>

      {/* Section 5 - Property Condition */}
      <section
        data-section="4"
        className="animate-section relative py-24 px-6 bg-[#2E5090]"
        style={{
          opacity: visibleSections.includes(4) ? 1 : 0,
          transform: visibleSections.includes(4) ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <Home className="w-12 h-12 text-amber-400" />
          </div>
          <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0] mb-6">
            5. Property Condition Expectations
          </h2>
          <p className="body-text text-lg text-[#a8a29e] mb-8">
            Owner-finance properties may require:
          </p>
          <div className="max-w-2xl mx-auto space-y-3 mb-8">
            {["Minor repairs", "Cosmetic updates", "Ongoing maintenance"].map((item, index) => (
              <div key={index} className="flex items-center justify-center gap-3">
                <div className="w-2 h-2 bg-amber-400 rounded-full" />
                <span className="body-text text-[#f5f5f0] text-lg">{item}</span>
              </div>
            ))}
          </div>
          <p className="body-text text-[#f5f5f0]/80 italic">
            Buyers should be prepared to maintain the property responsibly.
          </p>
        </div>
      </section>

      {/* Section 6 - Servicing & Payments */}
      <section
        data-section="5"
        className="animate-section relative py-24 px-6 bg-[#3B6BB5]"
        style={{
          opacity: visibleSections.includes(5) ? 1 : 0,
          transform: visibleSections.includes(5) ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <Shield className="w-12 h-12 text-amber-400" />
            </div>
            <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0] mb-4">
              6. Servicing & Monthly Payments
            </h2>
            <p className="body-text text-lg text-[#a8a29e] mb-8">
              All loans are serviced through a professional third-party servicer.
            </p>
            <p className="body-text text-lg text-[#f5f5f0] mb-6">
              Buyers receive:
            </p>
          </div>

          <div className="max-w-2xl mx-auto grid md:grid-cols-3 gap-6">
            {buyerReceives.map((item, index) => {
              const isVisible = visibleSections.includes(5);
              const delay = index * 100;

              return (
                <div
                  key={index}
                  className="p-6 bg-gradient-to-br from-[#2E5090] to-[#254680] border border-amber-500/20 text-center"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "scale(1)" : "scale(0.9)",
                    transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
                  }}
                >
                  <div className="w-2 h-2 bg-amber-400 rounded-full mx-auto mb-4" />
                  <p className="body-text text-[#f5f5f0]">{item}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 7 & 8 - Responsibilities & What Wave Crest Provides */}
      <section
        data-section="6"
        className="animate-section relative py-24 px-6 bg-[#2E5090]"
        style={{
          opacity: visibleSections.includes(6) ? 1 : 0,
          transform: visibleSections.includes(6) ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Buyer Responsibilities */}
            <div>
              <h2 className="hero-title text-3xl md:text-4xl font-black text-[#f5f5f0] mb-8 text-center">
                7. Buyer Responsibilities
              </h2>
              <div className="space-y-4">
                {buyerResponsibilities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-5 bg-gradient-to-br from-[#3B6BB5] to-[#254680] border border-amber-500/20"
                  >
                    <CheckCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="body-text text-[#f5f5f0]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What Wave Crest Provides */}
            <div>
              <h2 className="hero-title text-3xl md:text-4xl font-black text-[#f5f5f0] mb-8 text-center">
                8. What Wave Crest Provides
              </h2>
              <div className="space-y-4">
                {waveCrestProvides.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-5 bg-gradient-to-br from-[#3B6BB5] to-[#254680] border border-amber-500/20"
                  >
                    <Shield className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                    <span className="body-text text-[#f5f5f0]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 9 - What Wave Crest Does NOT Do */}
      <section
        data-section="7"
        className="animate-section relative py-24 px-6 bg-[#3B6BB5]"
        style={{
          opacity: visibleSections.includes(7) ? 1 : 0,
          transform: visibleSections.includes(7) ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0] mb-4">
              9. What Wave Crest Does NOT Do
            </h2>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {waveCrestDoesNot.map((item, index) => {
              const isVisible = visibleSections.includes(7);
              const delay = index * 100;

              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-5 bg-gradient-to-br from-[#2E5090] to-[#254680] border border-red-500/20"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                    transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
                  }}
                >
                  <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  <span className="body-text text-[#f5f5f0] text-lg">{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Section 10 - Ready Checklist */}
      <section
        data-section="8"
        className="animate-section relative py-24 px-6 bg-[#2E5090]"
        style={{
          opacity: visibleSections.includes(8) ? 1 : 0,
          transform: visibleSections.includes(8) ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 1s ease-out, transform 1s ease-out",
        }}
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <ClipboardCheck className="w-12 h-12 text-amber-400" />
            </div>
            <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0] mb-4">
              10. Are You Ready?
            </h2>
            <p className="body-text text-lg text-[#a8a29e]">
              You're ready to move forward if:
            </p>
          </div>

          <div className="max-w-2xl mx-auto space-y-4">
            {readyChecklist.map((item, index) => {
              const isVisible = visibleSections.includes(8);
              const delay = index * 100;

              return (
                <div
                  key={index}
                  className="flex items-start gap-4 p-5 bg-gradient-to-br from-[#3B6BB5] to-[#254680] border border-amber-500/20"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? "translateX(0)" : "translateX(-20px)",
                    transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
                  }}
                >
                  <CheckCircle className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" />
                  <span className="body-text text-[#f5f5f0] text-lg">{item}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 px-6 bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="hero-title text-4xl md:text-5xl font-black text-[#f5f5f0]">
            Start Your Owner-Finance Application
          </h2>
          <p className="body-text text-xl text-[#a8a29e] max-w-2xl mx-auto">
            Let's build your next chapter with clarity and structure.
          </p>
          <div className="pt-4">
            <a
              href="/contact"
              className="inline-block px-10 py-5 bg-gradient-to-r from-amber-500 to-amber-600 text-[#2E5090] font-bold body-text text-lg hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300"
            >
              Apply Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
