"use client";

import React from 'react';
import { Sparkles, Check, Wand2 } from 'lucide-react';
import HideChatWidget from '../HideChatWidget';

// Skeleton component - defined outside to avoid recreating on each render
function Skeleton() {
  return (
    <div className="space-y-8 opacity-40">
      <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-48 bg-gray-300 dark:bg-gray-700 rounded mx-auto mb-4" />
          <div className="h-4 w-72 bg-gray-300 dark:bg-gray-700 rounded mx-auto" />
        </div>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-2 gap-8">
        <div className="h-48 bg-gray-200 dark:bg-gray-800 rounded-lg" />
        <div className="space-y-3 py-4">
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 dark:bg-gray-800 rounded" />
        </div>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="text-center">
            <div className="w-24 h-24 bg-gray-200 dark:bg-gray-800 rounded-full mx-auto mb-3" />
            <div className="h-4 w-20 bg-gray-200 dark:bg-gray-800 rounded mx-auto" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Type for CSS properties with custom variables
interface CSSPropertiesWithVars extends React.CSSProperties {
  '--tx'?: string;
  '--ty'?: string;
  '--r'?: string;
}

// Pre-generated confetti positions (stable across renders)
const CONFETTI_COLORS = ['#8b5cf6', '#d946ef', '#06b6d4', '#22c55e', '#eab308', '#f43f5e'];
const CONFETTI_PARTICLES: Array<{
  id: number;
  color: string;
  tx: string;
  ty: string;
  r: string;
  delay: string;
}> = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  color: CONFETTI_COLORS[i % CONFETTI_COLORS.length] ?? '#8b5cf6',
  tx: `${(Math.random() - 0.5) * 300}px`,
  ty: `${(Math.random() - 0.5) * 300}px`,
  r: `${Math.random() * 720}deg`,
  delay: `${i * 0.05}s`,
}));

// Confetti component - defined outside
function Confetti() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {CONFETTI_PARTICLES.map((particle) => {
        const style: CSSPropertiesWithVars = {
          left: '50%',
          top: '50%',
          backgroundColor: particle.color,
          animationDelay: particle.delay,
          '--tx': particle.tx,
          '--ty': particle.ty,
          '--r': particle.r,
        };
        return (
          <div
            key={particle.id}
            className="absolute w-2 h-2 rounded-full animate-[confetti_1s_ease-out_forwards]"
            style={style}
          />
        );
      })}
    </div>
  );
}

// Orbiting dots component - defined outside
function OrbitingDots() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute w-full h-full animate-[spin_3s_linear_infinite]"
          style={{ animationDelay: `${i * -0.5}s` }}
        >
          <div
            className="absolute w-2 h-2 rounded-full bg-violet-400"
            style={{ left: '50%', top: 0, transform: 'translateX(-50%)' }}
          />
        </div>
      ))}
    </div>
  );
}

interface PagePlaceholderProps {
  pagePath: string;
}

export default function PagePlaceholder({ pagePath }: PagePlaceholderProps) {
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'sent' | 'working'>('idle');

  // Ensure pagePath is always a string
  const pagePathStr = typeof pagePath === 'string' ? pagePath : String(pagePath);

  const handleWorkOnPage = React.useCallback(() => {
    if (status !== 'idle') return;
    
    setStatus('sending');
    
    const isInIframe = typeof window !== 'undefined' && window.parent !== window;
    if (isInIframe) {
      window.parent.postMessage({ 
        type: 'createCodingRequest', 
        payload: { query: `Generate the ${pagePathStr} page for this website.` } 
      }, '*');
    }
    
    // Sending → Sent (celebration) → Working (indefinite)
    setTimeout(() => {
      setStatus('sent');
      setTimeout(() => {
        setStatus('working');
      }, 1500);
    }, 1000);
  }, [pagePathStr, status]);

  return (
    <div className="min-h-screen" data-non-editable>
      <HideChatWidget />
      <div className="relative min-h-[80vh] p-8 bg-gray-50 dark:bg-gray-950 overflow-hidden">
        <Skeleton />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Morphing blob background - always visible but changes with state */}
            <div className={`absolute -inset-16 transition-all duration-1000 ${status === 'sent' ? 'scale-150' : status === 'working' ? 'scale-125' : ''}`}>
              <div 
                className={`absolute inset-0 blur-2xl animate-[morph_8s_ease-in-out_infinite] transition-colors duration-500 ${
                  status === 'sent' 
                    ? 'bg-gradient-to-br from-green-400 via-emerald-400 to-teal-400 opacity-60' 
                    : status === 'working'
                    ? 'bg-gradient-to-br from-violet-400 via-purple-400 to-indigo-400 opacity-50'
                    : 'bg-gradient-to-br from-violet-400 via-fuchsia-400 to-indigo-400 opacity-40'
                }`}
                style={{ borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' }} 
              />
            </div>
            <div className={`absolute -inset-12 transition-all duration-1000 ${status === 'sent' ? 'scale-150' : status === 'working' ? 'scale-125' : ''}`}>
              <div 
                className={`absolute inset-0 blur-xl animate-[morph_6s_ease-in-out_infinite_reverse] transition-colors duration-500 ${
                  status === 'sent'
                    ? 'bg-gradient-to-tr from-emerald-400 via-green-400 to-cyan-400 opacity-50'
                    : status === 'working'
                    ? 'bg-gradient-to-tr from-purple-400 via-violet-400 to-fuchsia-400 opacity-40'
                    : 'bg-gradient-to-tr from-purple-400 via-pink-400 to-violet-400 opacity-30'
                }`}
                style={{ borderRadius: '40% 60% 70% 30% / 40% 70% 30% 60%' }} 
              />
            </div>

            {/* Confetti explosion on sent */}
            {status === 'sent' && <Confetti />}

            {/* Orbiting dots while working */}
            {status === 'working' && (
              <div className="absolute -inset-12">
                <OrbitingDots />
              </div>
            )}

            {/* The button/display */}
            <div className={`relative transition-all duration-500 ${status === 'sending' ? 'scale-95' : status === 'sent' ? 'scale-110' : ''}`}>
              
              {/* IDLE STATE */}
              {status === 'idle' && (
                <button
                  onClick={handleWorkOnPage}
                  className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur text-violet-600 dark:text-violet-400 font-medium transition-all hover:scale-105 shadow-xl cursor-pointer"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Generate this page</span>
                </button>
              )}

              {/* SENDING STATE - pulsing, gathering energy */}
              {status === 'sending' && (
                <div className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur text-violet-600 dark:text-violet-400 font-medium shadow-xl animate-pulse">
                  <div className="relative">
                    <Wand2 className="w-5 h-5 animate-[wiggle_0.3s_ease-in-out_infinite]" />
                    <div className="absolute inset-0 animate-ping">
                      <Wand2 className="w-5 h-5 opacity-50" />
                    </div>
                  </div>
                  <span className="animate-[pulse_0.5s_ease-in-out_infinite]">Casting spell...</span>
                </div>
              )}

              {/* SENT STATE - celebration */}
              {status === 'sent' && (
                <div className="relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold shadow-2xl shadow-green-500/30 animate-[bounce_0.5s_ease-out]">
                  <div className="relative">
                    <Check className="w-6 h-6 animate-[scaleIn_0.3s_ease-out]" strokeWidth={3} />
                  </div>
                  <span className="text-lg">Sent!</span>
                  <span className="text-2xl animate-[wave_0.5s_ease-in-out_infinite]">🎉</span>
                </div>
              )}

              {/* WORKING STATE - calm, ongoing */}
              {status === 'working' && (
                <div className="relative inline-flex flex-col items-center gap-3 px-8 py-5 rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur shadow-xl">
                  {/* Animated icon */}
                  <div className="relative w-10 h-10">
                    <div className="absolute inset-0 rounded-full border-2 border-violet-200 dark:border-violet-800" />
                    <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-500 animate-spin" />
                    <div className="absolute inset-2 rounded-full border-2 border-transparent border-t-fuchsia-500 animate-[spin_1.5s_linear_infinite_reverse]" />
                    <Sparkles className="absolute inset-0 m-auto w-4 h-4 text-violet-500 animate-pulse" />
                  </div>
                  
                  <div className="text-center">
                    <p className="font-medium text-gray-900 dark:text-white">Working on it</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                      <span>Building your page</span>
                      <span className="inline-flex gap-0.5">
                        <span className="w-1 h-1 rounded-full bg-violet-500 animate-[bounce_1s_ease-in-out_infinite]" />
                        <span className="w-1 h-1 rounded-full bg-violet-500 animate-[bounce_1s_ease-in-out_0.2s_infinite]" />
                        <span className="w-1 h-1 rounded-full bg-violet-500 animate-[bounce_1s_ease-in-out_0.4s_infinite]" />
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes morph {
          0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: rotate(0deg) scale(1); }
          25% { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: rotate(90deg) scale(1.1); }
          50% { border-radius: 50% 60% 30% 60% / 30% 60% 70% 40%; transform: rotate(180deg) scale(1); }
          75% { border-radius: 60% 40% 60% 40% / 70% 30% 50% 60%; transform: rotate(270deg) scale(1.1); }
        }
        @keyframes confetti {
          0% { transform: translate(-50%, -50%) rotate(0deg); opacity: 1; }
          100% { transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) rotate(var(--r)); opacity: 0; }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-10deg); }
          50% { transform: rotate(10deg); }
        }
        @keyframes scaleIn {
          0% { transform: scale(0); }
          50% { transform: scale(1.3); }
          100% { transform: scale(1); }
        }
        @keyframes wave {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          75% { transform: rotate(-20deg); }
        }
      `}</style>
    </div>
  );
}
