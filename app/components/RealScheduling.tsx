'use client';

import React, { useEffect, useState } from 'react';
import { BREEZY_PROFESSIONAL_TOKEN } from '../../professionalConstants';

interface RealSchedulingProps {
  className?: string;
  minHeight?: string;
}

export default function RealScheduling({
  className = '',
  minHeight = '700px'
}: RealSchedulingProps) {
  const [height, setHeight] = useState<string>(minHeight);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
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
        src={`https://app.getbreezy.app/schedule/${BREEZY_PROFESSIONAL_TOKEN}?from_site=true`}
        style={{
          width: '100%',
          border: 'none',
          height,
          minHeight
        }}
        title="Book an Appointment"
      />
    </div>
  );
}
