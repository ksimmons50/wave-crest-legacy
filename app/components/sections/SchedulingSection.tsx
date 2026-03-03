'use client';

import React from 'react';
import RealScheduling from '../RealScheduling';

export default function SchedulingSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-foreground mb-8">Book an Appointment</h2>
        <RealScheduling />
      </div>
    </section>
  );
}
