'use client';

/**
 * Hides the Breezy chat widget when rendered.
 * Use this component to hide the floating chat widget in specific contexts.
 */
export default function HideChatWidget() {
  return (
    <style>{`
      #breezy-chat-widget-container {
        display: none !important;
      }
    `}</style>
  );
}
