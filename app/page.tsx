'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import HeroSection from './components/sections/HeroSection';
import FullPagePlaceholder from './components/placeholders/FullPagePlaceholder';

// Lazy-load below-the-fold sections so they don't block initial render
const LeadFormSection = dynamic(() => import('./components/sections/LeadFormSection'));
const ReviewsSection = dynamic(() => import('./components/sections/ReviewsSection'));
const SchedulingSection = dynamic(() => import('./components/sections/SchedulingSection'));

// Section configuration - reorder this array to reorder sections
const sections = [
  { id: 'hero', name: 'Hero', Component: HeroSection },
  { id: 'lead-form', name: 'Get Your Free Quote', Component: LeadFormSection },
  { id: 'scheduling', name: 'Book an Appointment', Component: SchedulingSection },
  { id: 'reviews', name: 'Reviews', Component: ReviewsSection },
];

export default function Home() {
  return (
    <FullPagePlaceholder>
      <div className="min-h-screen bg-background">
        {sections.map(({ id, Component }) => (
          <Component key={id} />
        ))}
      </div>
    </FullPagePlaceholder>
  );
}
