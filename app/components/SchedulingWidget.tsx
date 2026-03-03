'use client';

import React from 'react';
import { BREEZY_PROFESSIONAL_TOKEN } from '../../professionalConstants';

export default function SchedulingWidget() {
  const iframeUrl = `https://app.getbreezy.app/schedule/${BREEZY_PROFESSIONAL_TOKEN}`;

  return (
    <div className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-xl border border-gray-200/50 overflow-hidden">
      <div className="rounded-xl overflow-hidden bg-white">
        <iframe
          src={iframeUrl}
          className="w-full"
          style={{ minHeight: '700px', border: 'none' }}
          title="Scheduling Widget"
          allow="camera; microphone"
        />
      </div>
    </div>
  );
}

