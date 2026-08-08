"use client";

import React, { useEffect, useState } from 'react';
import { ShieldCheck, Eye } from 'lucide-react';
import { AudioEngine } from './AudioEngine';

export default function IdentityVerification({ onComplete }) {
  const [showSub, setShowSub] = useState(false);
  const [glitching, setGlitching] = useState(false);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    // Play sweep sound during scanning sequence
    AudioEngine.playSweep(1.2);

    // Stage 1: Scanning completes in 1.4s
    const scanTimer = setTimeout(() => {
      setScanning(false);
      AudioEngine.playClick();
      setShowSub(true);
    }, 1300);

    // Stage 2: Glitch transition begins at 2s
    const glitchTimer = setTimeout(() => {
      setGlitching(true);
      AudioEngine.playAlarm(); // trigger two-tone alert sound on security clearance
    }, 1900);

    // Stage 3: Complete loading scene transition
    const completeTimer = setTimeout(() => {
      onComplete && onComplete();
    }, 2400);

    return () => {
      clearTimeout(scanTimer);
      clearTimeout(glitchTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`w-full max-w-md mx-auto text-center font-mono p-8 border border-hud-dim glass-panel relative overflow-hidden screen-glow shadow-hud-glow rounded-sm transition-hud ${glitching ? 'crt-flicker' : ''}`}>
      
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-hud-primary" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-hud-primary" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-hud-primary" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-hud-primary" />

      {/* Glitch Overlay Slice */}
      {glitching && (
        <div className="absolute inset-0 bg-hud-primary/10 z-[110] flex items-center justify-center pointer-events-none">
          <div className="w-full h-10 bg-hud-primary/20 absolute top-1/4 transform translate-y-1 crt-flicker" />
          <div className="w-full h-6 bg-hud-accent/30 absolute bottom-1/3 transform -translate-y-2 crt-flicker" />
        </div>
      )}

      {/* Dynamic scan graphic */}
      <div className="flex justify-center mb-6 relative">
        {/* Glow ring */}
        <div className="absolute w-24 h-24 bg-hud-primary/5 rounded-full blur-xl animate-pulse" />
        
        {/* Radar crosshairs scanner box */}
        <div className="w-24 h-24 text-hud-primary flex flex-col items-center justify-center border border-hud-dim/35 rounded-full p-4 bg-black/40 relative z-10 shadow-hud-glow">
          {scanning ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <Eye className="w-10 h-10 animate-pulse text-hud-primary/80" />
              {/* Scan sweep line */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-hud-primary shadow-[0_0_6px_var(--hud-primary)] animate-[laser-sweep_1.5s_infinite_linear]" />
              
              {/* Overlay ticks */}
              <div className="absolute inset-0 border border-dashed border-hud-primary/20 rounded-full animate-[radar-rotate_12s_linear_infinite]" />
            </div>
          ) : (
            <div className="relative w-full h-full flex items-center justify-center">
              <ShieldCheck className="w-12 h-12 text-hud-primary animate-[scale-up_0.3s_ease-out]" />
              <div className="absolute w-14 h-14 border border-hud-primary/60 rounded-full animate-ping" />
            </div>
          )}
        </div>
      </div>

      {/* Main Credentials */}
      <h2 className="text-xl md:text-2xl font-bold font-display tracking-[0.2em] text-hud-primary mb-3 uppercase text-glow text-glitch" data-text={scanning ? "BIOMETRIC SCANNING" : "IDENTITY VERIFIED"}>
        {scanning ? "BIOMETRIC SCANNING" : "IDENTITY VERIFIED"}
      </h2>

      {/* Sub-status label */}
      <div className="h-6 transition-all duration-300 transform">
        {showSub ? (
          <p className="text-[11px] font-bold tracking-[0.25em] text-neutral-300 uppercase animate-[fade-in_0.4s_ease-out]">
            ACCESS GRANTED // COMMAND UNIT
          </p>
        ) : (
          <p className="text-[10px] tracking-widest text-hud-primary/40 uppercase animate-pulse">
            SCANNING RETINAL PATTERN...
          </p>
        )}
      </div>

      {/* Access Code Log */}
      <div className="mt-6 border-t border-hud-dim/20 pt-4 flex flex-col space-y-1 text-[9px] text-hud-primary/60 font-mono">
        <div className="flex justify-between">
          <span>COMMS: SECURE_UPLINK</span>
          <span>UID: SF-9021-DEPR</span>
        </div>
        <div className="flex justify-between">
          <span>DECRYPT: AES_GCM_256</span>
          <span>TOKEN: CLEARANCE_LVL_V</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes laser-sweep {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes scale-up {
          0% { transform: scale(0.6); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(4px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
