"use client";

import { useState } from "react";
import Image from "next/image";
import { LOGO_LEGACY_GROUP } from "@/professionalConstants";

export default function BuyerIntakeFormPage() {
  const [formData, setFormData] = useState({
    // Section 1
    fullName: "",
    phone: "",
    email: "",
    address: "",

    // Section 2
    specificProperty: "",
    propertyAddress: "",
    propertyType: "",

    // Section 3
    downPaymentAmount: "",
    fundsReady: "",

    // Section 4
    employmentStatus: "",
    monthlyIncome: "",
    employerName: "",
    lengthOfEmployment: "",

    // Section 5
    documents: [] as string[],

    // Section 6
    paymentRange: "",

    // Section 7
    creditSituation: "",
    hadIssues: "",
    issuesExplanation: "",

    // Section 8
    comfortableWithRepairs: "",

    // Section 9
    timeline: "",

    // Section 10
    additionalNotes: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
    alert("Thank you! Your application has been submitted. We'll be in touch soon.");
  };

  const handleCheckboxChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      documents: prev.documents.includes(value)
        ? prev.documents.filter((doc) => doc !== value)
        : [...prev.documents, value],
    }));
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

        input[type="text"],
        input[type="email"],
        input[type="tel"],
        input[type="number"],
        select,
        textarea {
          background: #1a1f3a;
          border: 1px solid rgba(212, 175, 55, 0.2);
          color: #f5f5f0;
          padding: 0.75rem 1rem;
          width: 100%;
          transition: border-color 0.3s;
        }

        input[type="text"]:focus,
        input[type="email"]:focus,
        input[type="tel"]:focus,
        input[type="number"]:focus,
        select:focus,
        textarea:focus {
          outline: none;
          border-color: rgba(212, 175, 55, 0.6);
        }

        input[type="radio"],
        input[type="checkbox"] {
          accent-color: #d4af37;
          width: 1.25rem;
          height: 1.25rem;
          cursor: pointer;
        }

        label {
          cursor: pointer;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative py-24 px-6 bg-gradient-to-b from-[#0a0e27] to-[#1a1f3a]">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div>
            <Image
              src={LOGO_LEGACY_GROUP}
              alt="Wave Crest Legacy Group"
              width={300}
              height={100}
              className="h-20 w-auto mx-auto mb-12"
              priority
            />
          </div>

          <p className="body-text text-sm uppercase tracking-[0.3em] text-amber-400 font-semibold">
            Clarity. Structure. Momentum.
          </p>

          <h1 className="hero-title text-5xl md:text-7xl font-black text-[#f5f5f0] tracking-tight">
            Buyer Intake Form
          </h1>

          <p className="text-xl md:text-2xl text-[#f5f5f0]/80 body-text max-w-3xl mx-auto leading-relaxed">
            Start your owner-finance journey with a clear, structured process designed to support long-term success.
          </p>

          <p className="body-text text-lg text-[#a8a29e]">
            Please complete the form below so we can evaluate your readiness and match you with the right opportunity.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative py-16 px-6 bg-[#2E5090]">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-16">
            {/* Section 1 - Personal Information */}
            <div className="bg-gradient-to-br from-[#3B6BB5] to-[#254680] p-8 md:p-12 border border-amber-500/20">
              <h2 className="hero-title text-3xl md:text-4xl font-bold text-[#f5f5f0] mb-8 pb-4 border-b border-amber-500/20">
                Section 1 — Personal Information
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="body-text block text-[#f5f5f0] mb-2 font-medium">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="body-text block text-[#f5f5f0] mb-2 font-medium">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="body-text block text-[#f5f5f0] mb-2 font-medium">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="body-text block text-[#f5f5f0] mb-2 font-medium">Current Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Section 2 - Property Interest */}
            <div className="bg-gradient-to-br from-[#3B6BB5] to-[#254680] p-8 md:p-12 border border-amber-500/20">
              <h2 className="hero-title text-3xl md:text-4xl font-bold text-[#f5f5f0] mb-8 pb-4 border-b border-amber-500/20">
                Section 2 — Property Interest
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="body-text block text-[#f5f5f0] mb-4 font-medium">
                    Are you interested in a specific Wave Crest property? *
                  </label>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 body-text text-[#f5f5f0]">
                      <input
                        type="radio"
                        name="specificProperty"
                        value="yes"
                        required
                        onChange={(e) => setFormData({ ...formData, specificProperty: e.target.value })}
                      />
                      Yes
                    </label>
                    <label className="flex items-center gap-3 body-text text-[#f5f5f0]">
                      <input
                        type="radio"
                        name="specificProperty"
                        value="no"
                        onChange={(e) => setFormData({ ...formData, specificProperty: e.target.value })}
                      />
                      No
                    </label>
                  </div>
                </div>
                {formData.specificProperty === "yes" && (
                  <div>
                    <label className="body-text block text-[#f5f5f0] mb-2 font-medium">
                      Property Address / Description
                    </label>
                    <input
                      type="text"
                      value={formData.propertyAddress}
                      onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
                    />
                  </div>
                )}
                <div>
                  <label className="body-text block text-[#f5f5f0] mb-4 font-medium">
                    What type of property are you looking for? *
                  </label>
                  <div className="space-y-3">
                    {["Single-family", "Duplex", "Townhome", "Other"].map((type) => (
                      <label key={type} className="flex items-center gap-3 body-text text-[#f5f5f0]">
                        <input
                          type="radio"
                          name="propertyType"
                          value={type}
                          required
                          onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 - Down Payment Readiness */}
            <div className="bg-gradient-to-br from-[#3B6BB5] to-[#254680] p-8 md:p-12 border border-amber-500/20">
              <h2 className="hero-title text-3xl md:text-4xl font-bold text-[#f5f5f0] mb-8 pb-4 border-b border-amber-500/20">
                Section 3 — Down Payment Readiness
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="body-text block text-[#f5f5f0] mb-4 font-medium">
                    How much do you currently have available for a down payment? *
                  </label>
                  <div className="space-y-3">
                    {["25% or more", "20%", "15%", "10%", "Not sure"].map((amount) => (
                      <label key={amount} className="flex items-center gap-3 body-text text-[#f5f5f0]">
                        <input
                          type="radio"
                          name="downPaymentAmount"
                          value={amount}
                          required
                          onChange={(e) => setFormData({ ...formData, downPaymentAmount: e.target.value })}
                        />
                        {amount}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="body-text block text-[#f5f5f0] mb-4 font-medium">
                    Are your down payment funds ready today? *
                  </label>
                  <div className="space-y-3">
                    {["Yes", "Within 30 days", "Within 60 days", "Not ready"].map((status) => (
                      <label key={status} className="flex items-center gap-3 body-text text-[#f5f5f0]">
                        <input
                          type="radio"
                          name="fundsReady"
                          value={status}
                          required
                          onChange={(e) => setFormData({ ...formData, fundsReady: e.target.value })}
                        />
                        {status}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4 - Income & Employment */}
            <div className="bg-gradient-to-br from-[#3B6BB5] to-[#254680] p-8 md:p-12 border border-amber-500/20">
              <h2 className="hero-title text-3xl md:text-4xl font-bold text-[#f5f5f0] mb-8 pb-4 border-b border-amber-500/20">
                Section 4 — Income & Employment
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="body-text block text-[#f5f5f0] mb-4 font-medium">Employment Status *</label>
                  <div className="space-y-3">
                    {["W-2 Employee", "1099 / Contractor", "Self-Employed", "Retired", "Other"].map((status) => (
                      <label key={status} className="flex items-center gap-3 body-text text-[#f5f5f0]">
                        <input
                          type="radio"
                          name="employmentStatus"
                          value={status}
                          required
                          onChange={(e) => setFormData({ ...formData, employmentStatus: e.target.value })}
                        />
                        {status}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="body-text block text-[#f5f5f0] mb-2 font-medium">
                    Monthly Household Income (approx.) *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="$5,000"
                    value={formData.monthlyIncome}
                    onChange={(e) => setFormData({ ...formData, monthlyIncome: e.target.value })}
                  />
                </div>
                <div>
                  <label className="body-text block text-[#f5f5f0] mb-2 font-medium">
                    Employer or Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.employerName}
                    onChange={(e) => setFormData({ ...formData, employerName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="body-text block text-[#f5f5f0] mb-2 font-medium">
                    Length of Employment / Business Operation *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="2 years"
                    value={formData.lengthOfEmployment}
                    onChange={(e) => setFormData({ ...formData, lengthOfEmployment: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Section 5 - Financial Documentation */}
            <div className="bg-gradient-to-br from-[#3B6BB5] to-[#254680] p-8 md:p-12 border border-amber-500/20">
              <h2 className="hero-title text-3xl md:text-4xl font-bold text-[#f5f5f0] mb-8 pb-4 border-b border-amber-500/20">
                Section 5 — Financial Documentation
              </h2>
              <div className="space-y-4">
                <p className="body-text text-[#f5f5f0] mb-4 font-medium">
                  Can you provide the following documents? (Select all that apply) *
                </p>
                {[
                  "Government-issued ID",
                  "Last 2 months of bank statements",
                  "Proof of income (W-2, 1099, or business statements)",
                  "Proof of down payment funds",
                  "Rental or mortgage history",
                  "None of the above",
                ].map((doc) => (
                  <label key={doc} className="flex items-start gap-3 body-text text-[#f5f5f0]">
                    <input
                      type="checkbox"
                      value={doc}
                      checked={formData.documents.includes(doc)}
                      onChange={() => handleCheckboxChange(doc)}
                    />
                    <span className="mt-0.5">{doc}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Section 6 - Monthly Payment Comfort Zone */}
            <div className="bg-gradient-to-br from-[#3B6BB5] to-[#254680] p-8 md:p-12 border border-amber-500/20">
              <h2 className="hero-title text-3xl md:text-4xl font-bold text-[#f5f5f0] mb-8 pb-4 border-b border-amber-500/20">
                Section 6 — Monthly Payment Comfort Zone
              </h2>
              <div>
                <label className="body-text block text-[#f5f5f0] mb-4 font-medium">
                  What monthly payment range are you comfortable with? *
                </label>
                <div className="space-y-3">
                  {["$1,000–$1,500", "$1,500–$2,000", "$2,000–$2,500", "$2,500+"].map((range) => (
                    <label key={range} className="flex items-center gap-3 body-text text-[#f5f5f0]">
                      <input
                        type="radio"
                        name="paymentRange"
                        value={range}
                        required
                        onChange={(e) => setFormData({ ...formData, paymentRange: e.target.value })}
                      />
                      {range}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 7 - Credit & History */}
            <div className="bg-gradient-to-br from-[#3B6BB5] to-[#254680] p-8 md:p-12 border border-amber-500/20">
              <h2 className="hero-title text-3xl md:text-4xl font-bold text-[#f5f5f0] mb-8 pb-4 border-b border-amber-500/20">
                Section 7 — Credit & History
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="body-text block text-[#f5f5f0] mb-4 font-medium">
                    How would you describe your credit situation? *
                  </label>
                  <div className="space-y-3">
                    {["Good", "Fair", "Challenged", "Not sure"].map((credit) => (
                      <label key={credit} className="flex items-center gap-3 body-text text-[#f5f5f0]">
                        <input
                          type="radio"
                          name="creditSituation"
                          value={credit}
                          required
                          onChange={(e) => setFormData({ ...formData, creditSituation: e.target.value })}
                        />
                        {credit}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="body-text block text-[#f5f5f0] mb-4 font-medium">
                    Have you ever had a foreclosure, bankruptcy, or eviction? *
                  </label>
                  <div className="space-y-3">
                    {["Yes", "No"].map((answer) => (
                      <label key={answer} className="flex items-center gap-3 body-text text-[#f5f5f0]">
                        <input
                          type="radio"
                          name="hadIssues"
                          value={answer}
                          required
                          onChange={(e) => setFormData({ ...formData, hadIssues: e.target.value })}
                        />
                        {answer}
                      </label>
                    ))}
                  </div>
                </div>
                {formData.hadIssues === "Yes" && (
                  <div>
                    <label className="body-text block text-[#f5f5f0] mb-2 font-medium">
                      Please explain briefly:
                    </label>
                    <textarea
                      rows={4}
                      value={formData.issuesExplanation}
                      onChange={(e) => setFormData({ ...formData, issuesExplanation: e.target.value })}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Section 8 - Property Condition Expectations */}
            <div className="bg-gradient-to-br from-[#3B6BB5] to-[#254680] p-8 md:p-12 border border-amber-500/20">
              <h2 className="hero-title text-3xl md:text-4xl font-bold text-[#f5f5f0] mb-8 pb-4 border-b border-amber-500/20">
                Section 8 — Property Condition Expectations
              </h2>
              <div>
                <label className="body-text block text-[#f5f5f0] mb-4 font-medium">
                  Are you comfortable purchasing a property that may need minor repairs or updates? *
                </label>
                <div className="space-y-3">
                  {["Yes", "No", "Depends on the condition"].map((answer) => (
                    <label key={answer} className="flex items-center gap-3 body-text text-[#f5f5f0]">
                      <input
                        type="radio"
                        name="comfortableWithRepairs"
                        value={answer}
                        required
                        onChange={(e) => setFormData({ ...formData, comfortableWithRepairs: e.target.value })}
                      />
                      {answer}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 9 - Timeline */}
            <div className="bg-gradient-to-br from-[#3B6BB5] to-[#254680] p-8 md:p-12 border border-amber-500/20">
              <h2 className="hero-title text-3xl md:text-4xl font-bold text-[#f5f5f0] mb-8 pb-4 border-b border-amber-500/20">
                Section 9 — Timeline
              </h2>
              <div>
                <label className="body-text block text-[#f5f5f0] mb-4 font-medium">
                  How soon are you looking to purchase? *
                </label>
                <div className="space-y-3">
                  {["Immediately", "30 days", "60 days", "90+ days"].map((time) => (
                    <label key={time} className="flex items-center gap-3 body-text text-[#f5f5f0]">
                      <input
                        type="radio"
                        name="timeline"
                        value={time}
                        required
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                      />
                      {time}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Section 10 - Additional Notes */}
            <div className="bg-gradient-to-br from-[#3B6BB5] to-[#254680] p-8 md:p-12 border border-amber-500/20">
              <h2 className="hero-title text-3xl md:text-4xl font-bold text-[#f5f5f0] mb-8 pb-4 border-b border-amber-500/20">
                Section 10 — Additional Notes
              </h2>
              <div>
                <label className="body-text block text-[#f5f5f0] mb-2 font-medium">
                  Tell us anything else we should know about your situation or goals.
                </label>
                <textarea
                  rows={6}
                  placeholder="Share any additional information that would help us understand your needs..."
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center pt-8">
              <button
                type="submit"
                className="inline-block px-12 py-6 bg-gradient-to-r from-amber-500 to-amber-600 text-[#2E5090] font-bold body-text text-xl hover:shadow-2xl hover:shadow-amber-500/30 transition-all duration-300"
              >
                Submit Your Application
              </button>
              <p className="body-text text-[#a8a29e] mt-6">
                We'll review your information and contact you with next steps.
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
