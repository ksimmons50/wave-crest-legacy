'use client';

import React from 'react';
import Testimonials from '../Testimonials';

export default function ReviewsSection() {
  return (
    <section className="py-16 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-foreground mb-8">What Our Customers Say</h2>
        <Testimonials showHeader={false} />
      </div>
    </section>
  );
}
