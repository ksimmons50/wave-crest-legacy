import React from 'react';
import { Settings } from 'lucide-react';
import type { CodingAgentPrompt } from './types';

interface PlaceholderProps {
  children: React.ReactNode;
  /** Instructions for the coding agent. Must start with "TODO(CODING_AGENT): " */
  agent_prompt: CodingAgentPrompt;
}

/**
 * Wraps content that should be customized by the coding agent.
 * Shows a loading overlay to indicate the section needs customization.
 *
 * - Children are rendered with a loading overlay
 * - agent_prompt prop tells the coding agent what to replace
 */
export default function Placeholder({ 
  children,
   
  agent_prompt,
}: PlaceholderProps) {
  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 bg-background/30 backdrop-blur-[2px] flex items-center justify-center z-10 rounded-lg">
        <div className="relative">
          <div 
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin"
          />
          <div className="bg-card/90 p-3 rounded-full shadow-lg">
            <Settings className="w-6 h-6 text-primary" />
          </div>
        </div>
      </div>
    </div>
  );
}
