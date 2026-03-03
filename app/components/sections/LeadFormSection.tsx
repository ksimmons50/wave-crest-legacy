'use client';

import React from 'react';
import LeadForm from '../LeadForm';

export default function LeadFormSection() {
  return (
    <section className="py-16 bg-secondary">
      <div className="max-w-3xl mx-auto">
        <LeadForm
          title="Get Your Free Quote"
          subtitle="Fill out the form below and we'll contact you within 24 hours" />
      </div>
    </section>
  );
}
