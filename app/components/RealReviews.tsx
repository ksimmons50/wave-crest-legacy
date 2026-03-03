'use client';

import React, { useEffect, useState } from 'react';
import { BREEZY_PROFESSIONAL_TOKEN } from '../../professionalConstants';

interface RealReviewsProps {
  className?: string;
  minHeight?: string;
}

export default function RealReviews({
  className = '',
  minHeight = '600px'
}: RealReviewsProps) {
  const [height, setHeight] = useState<string>(minHeight);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from the Breezy embed
      if (event.origin !== 'https://app.getbreezy.app') return;

      if (event.data?.type === 'RESIZE_IFRAME') {
        const newHeight = Number(event.data.height);
        if (!isNaN(newHeight) && newHeight > 0) {
          setHeight(`${newHeight}px`);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  return (
    <div className={className}>
      <iframe
        src={`https://app.getbreezy.app/embed/review-widget?professional_token=${BREEZY_PROFESSIONAL_TOKEN}`}
        style={{
          width: '100%',
          border: 'none',
          height,
          minHeight
        }}
        title="Real Reviews"
      />
    </div>
  );
}
