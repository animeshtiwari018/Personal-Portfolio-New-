"use client";

import React, { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';

export default function IdentityVerification({ onComplete }) {
  const [showSub, setShowSub] = useState(false);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    // Stage 1: Play verified checkmark immediately, wait 600ms to show subtitle
    const subTimer = setTimeout(() => {
      setShowSub(true);
    }, 550);

    // Stage 2: Start glitch transition after 1400ms
    const glitchTimer = setTimeout(() => {
      setGlitching(true);
    }, 1350);

    // Stage 3: Complete transition after 1750ms
    const completeTimer = setTimeout(() => {
      onComplete && onComplete();
    }, 1750);

    return () => {
      clearTimeout(subTimer);
      clearTimeout(glitchTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`w-full max-w-md mx-auto text-center font-mono p-8 border border-tactical-green/30 bg-tactical-bg/90 backdrop-blur-md relative overflow-hidden screen-glow shadow-[0_0_25px_rgba(34,197,94,0.08)] rounded-sm ${glitching ? 'crt-flicker' : ''}`}>
      {/* Glitch Overlay Slice */}
      {glitching && (
        <div className="absolute inset-0 bg-tactical-green/10 z-[110] flex items-center justify-center pointer-events-none">
          <div className="w-full h-12 bg-tactical-amber/20 absolute top-1/3 transform translate-y-1 crt-flicker" />
          <div className="w-full h-8 bg-tactical-olive/30 absolute bottom-1/4 transform -translate-y-2 crt-flicker" />
        </div>
      )}

      {/* Glowing Verification Shield Check Icon */}
      <div className="flex justify-center mb-6 relative">
        {/* Glow rings */}
        <div className="absolute w-20 h-20 bg-tactical-green/10 rounded-full blur-xl animate-pulse" />
        
        {/* Animated shield logo using raw SVG for custom paths & drawing animation */}
        <div className="w-20 h-20 text-tactical-green flex items-center justify-center border border-tactical-green/30 rounded-full p-4 bg-black/40 relative z-10 shadow-[0_0_15px_rgba(34,197,94,0.25)]">
          <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            {/* Shield Outline */}
            <path 
              className="animate-[dash_1s_ease-in-out_forwards]"
              strokeDasharray="100" 
              strokeDashoffset="100"
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
            />
          </svg>
        </div>
      </div>

      {/* Main Credentials */}
      <h2 className="text-xl md:text-2xl font-bold font-display tracking-widest text-tactical-green mb-3 uppercase screen-glow text-glitch" data-text="IDENTITY VERIFIED">
        IDENTITY VERIFIED
      </h2>

      {/* Sub-status with slide-up and fade */}
      <div className={`h-8 transition-all duration-300 transform ${showSub ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
        {showSub && (
          <p className="text-xs md:text-sm font-semibold tracking-[0.25em] text-neutral-300 uppercase">
            SPECIAL OPERATIONS READY
          </p>
        )}
      </div>

      {/* Access Code Log */}
      <div className="mt-6 border-t border-tactical-green/10 pt-4 flex flex-col space-y-1 text-[9px] text-tactical-green/60">
        <div className="flex justify-between">
          <span>COMMS: ONLINE</span>
          <span>UID: SF-9021-DEPR</span>
        </div>
        <div className="flex justify-between">
          <span>PORT: 8080 // REDIRECT</span>
          <span>TOKEN: AUTH_SUCCESS_GR8</span>
        </div>
      </div>

      {/* Drawing keyframes inside style component to isolate custom animations */}
      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  );
}
