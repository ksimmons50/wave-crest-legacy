'use client';

import React, { useEffect } from 'react';
import { BREEZY_PROFESSIONAL_TOKEN } from '../../professionalConstants';

interface FloatingChatProps {
  className?: string;
  professional_token?: string;
}

export default function FloatingChat({ 
  className = "",
  professional_token = BREEZY_PROFESSIONAL_TOKEN
}: FloatingChatProps) {
  
  useEffect(() => {
    // Load the Breezy chat widget script
    const script = document.createElement('script');
    script.src = 'https://app.getbreezy.app/embeddable/chat-widget.js';
    script.setAttribute('data-token', professional_token);
    script.async = true;
    
    // Check if script is already loaded to avoid duplicates
    const existingScript = document.querySelector(`script[src="${script.src}"][data-token="${professional_token}"]`);
    if (!existingScript) {
      document.head.appendChild(script);
    }

    // Cleanup function to remove script when component unmounts
    return () => {
      const scriptToRemove = document.querySelector(`script[src="${script.src}"][data-token="${professional_token}"]`);
      if (scriptToRemove) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, [professional_token]);

  return (
    <div className={className}>
      {/* The Breezy chat widget will be automatically injected by the external script */}
    </div>
  );
}
