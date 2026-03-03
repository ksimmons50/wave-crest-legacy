'use client';

import React from 'react';
import { Settings } from 'lucide-react';
import HideChatWidget from '../HideChatWidget';

/**
 * Full-page placeholder overlay that covers the entire viewport.
 * Shows a loading overlay to indicate the page is being customized.
 * Automatically hides the chat widget while active.
 */
export default function FullPagePlaceholder({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative" data-non-editable>
      <HideChatWidget />
      {children}
      <div className="fixed inset-0 bg-background/50 backdrop-blur-md flex items-center justify-center z-[9999]">
        <div className="relative">
          <div 
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"
          />
          <div className="bg-card/90 p-8 rounded-full shadow-2xl">
            <Settings className="w-16 h-16 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
