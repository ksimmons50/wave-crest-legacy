'use client';

import React from 'react';
import Image from 'next/image';
import { PROFESSIONAL_NAME, PROFESSIONAL_PHONE, PROFESSIONAL_IMAGES } from '../../../professionalConstants';
import { formatPhoneNumber } from '../../utils/phoneUtils';

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/80 via-primary/60 to-accent/40 text-foreground">
      <div className="absolute inset-0 bg-background/10"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {PROFESSIONAL_NAME}
            </h1>
            <p className="mb-8">Strategic real estate investments that build lasting wealth. Partner with us to grow your portfolio and secure your financial future.</p>
            <a
              href={`tel:${PROFESSIONAL_PHONE}`}
              target="_blank"
              className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:bg-primary/90 transition-colors text-center shadow-md">
              📞 Call {formatPhoneNumber(PROFESSIONAL_PHONE)}
            </a>
          </div>
          <div className="relative">
            {PROFESSIONAL_IMAGES[1] && (
              <Image
                src={PROFESSIONAL_IMAGES[1].url}
                alt={PROFESSIONAL_IMAGES[1].description}
                width={600}
                height={400}
                className="rounded-lg shadow-2xl" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
