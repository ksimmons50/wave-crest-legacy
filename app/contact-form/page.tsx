"use client";

import { useEffect } from "react";

export default function ContactFormPage() {
  useEffect(() => {
    // Load the Breezy form script
    const script = document.createElement('script');
    script.src = 'https://app.getbreezy.app/embeddable/lead-form-direct.js';
    script.setAttribute('data-token', 'caf098fe22e8bbcbee5cfd56e06f4978f9d72fe18807cdff77cfb925fb50');
    script.setAttribute('data-button-text', 'Submit');
    script.setAttribute('data-button-color', '#d4af37');
    script.setAttribute('data-fields', 'name,email,phone,type,message');
    script.setAttribute('data-required', 'name,email,type,message');
    script.setAttribute('data-type-options', 'Acquisition Opportunity,Owner-Finance Inquiry,Partnership Discussion,General Question');
    script.setAttribute('data-success-message', "Thank you! We'll be in touch soon.");
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f0]">
      {/* Form Section */}
      <section className="relative pt-24 pb-12 px-6">
        <div className="max-w-3xl mx-auto">
          <div id="breezy-form-container"></div>
        </div>
      </section>
    </div>
  );
}
