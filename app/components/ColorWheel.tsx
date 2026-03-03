'use client';

import { useRef } from 'react';

interface ColorWheelProps {
  hue: number;
  saturation: number;
  onChange: (hue: number, saturation: number) => void;
  size?: number;
}

export default function ColorWheel({ hue, saturation, onChange, size = 180 }: ColorWheelProps) {
  const wheelRef = useRef<HTMLDivElement>(null);

  const handleInteraction = (clientX: number, clientY: number) => {
    if (!wheelRef.current) return;
    const rect = wheelRef.current.getBoundingClientRect();
    const x = clientX - rect.left - rect.width / 2;
    const y = clientY - rect.top - rect.height / 2;

    let deg = (Math.atan2(y, x) * 180) / Math.PI + 90;
    if (deg < 0) deg += 360;

    const dist = Math.min(Math.sqrt(x * x + y * y), rect.width / 2);
    onChange(Math.round(deg) % 360, Math.round((dist / (rect.width / 2)) * 100));
  };

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    handleInteraction(e.clientX, e.clientY);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.buttons > 0) {
      handleInteraction(e.clientX, e.clientY);
    }
  };

  const angle = ((hue - 90) * Math.PI) / 180;
  const radius = (saturation / 100) * (size / 2 - 12);
  const indicatorX = Math.cos(angle) * radius + size / 2;
  const indicatorY = Math.sin(angle) * radius + size / 2;

  return (
    <div
      ref={wheelRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      style={{
        width: size,
        height: size,
        position: 'relative',
        cursor: 'crosshair',
        touchAction: 'none',
        borderRadius: '50%',
        background: `
          radial-gradient(circle, white 0%, transparent 70%),
          conic-gradient(from 0deg, hsl(0,100%,50%), hsl(60,100%,50%), hsl(120,100%,50%), hsl(180,100%,50%), hsl(240,100%,50%), hsl(300,100%,50%), hsl(360,100%,50%))
        `,
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.1)',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: 24,
          height: 24,
          borderRadius: '50%',
          left: indicatorX - 12,
          top: indicatorY - 12,
          background: `hsl(${hue}, ${saturation}%, 50%)`,
          border: '3px solid white',
          boxShadow: '0 0 0 1px rgba(0,0,0,0.15), 0 2px 8px rgba(0,0,0,0.2)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
