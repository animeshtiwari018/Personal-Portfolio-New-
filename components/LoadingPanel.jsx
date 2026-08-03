"use client";

import React, { useEffect, useState } from 'react';

export default function LoadingPanel({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing operational loading procedures...');

  const messages = [
    { threshold: 0, text: 'Loading Tactical Assets...' },
    { threshold: 18, text: 'Authenticating Identity...' },
    { threshold: 38, text: 'Synchronizing Secure Network...' },
    { threshold: 58, text: 'Establishing Satellite Link...' },
    { threshold: 78, text: 'Loading Operational Database...' },
    { threshold: 92, text: 'Preparing Interface...' }
  ];

  useEffect(() => {
    // Check if prefers-reduced-motion is active
    const prefersReduced = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setProgress(100);
      setStatusText('Preparing Interface...');
      const timeout = setTimeout(() => {
        onComplete && onComplete();
      }, 500);
      return () => clearTimeout(timeout);
    }

    let animationFrameId;
    let currentProgress = 0;
    
    // Custom non-linear easing function
    const tick = () => {
      // Create interesting speed changes
      let increment = 0;
      if (currentProgress < 20) {
        increment = 0.5 + Math.random() * 1.5; // Moderately fast
      } else if (currentProgress < 38) {
        increment = 0.2 + Math.random() * 0.6; // Slows down for identity auth
      } else if (currentProgress < 42) {
        increment = 0.05 + Math.random() * 0.1; // Hard pause simulating secure sync handshake
      } else if (currentProgress < 75) {
        increment = 1.0 + Math.random() * 2.5; // Fast burst for satellite link
      } else if (currentProgress < 92) {
        increment = 0.3 + Math.random() * 0.8; // Decelerating as database loads
      } else if (currentProgress < 100) {
        increment = 0.4 + Math.random() * 0.6; // Finalizing
      }

      currentProgress = Math.min(100, currentProgress + increment);
      setProgress(Math.floor(currentProgress));

      // Rotate messages based on current progress threshold
      const matchedMessage = [...messages]
        .reverse()
        .find(m => currentProgress >= m.threshold);
      if (matchedMessage) {
        setStatusText(matchedMessage.text);
      }

      if (currentProgress < 100) {
        // Control speed by adding a small delay in ticks
        setTimeout(() => {
          animationFrameId = requestAnimationFrame(tick);
        }, 16); // ~60fps ticks
      } else {
        setTimeout(() => {
          onComplete && onComplete();
        }, 400); // Hold 100% briefly before moving to scene 4
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Split progress bar into 20 segment blocks for retro-tactical look
  const totalBlocks = 20;
  const filledBlocks = Math.floor((progress / 100) * totalBlocks);

  return (
    <div className="w-full max-w-lg mx-auto p-6 font-mono border border-tactical-olive/20 bg-tactical-bg/85 backdrop-blur-md relative screen-glow shadow-lg rounded-sm">
      {/* Title */}
      <h2 className="text-center text-sm md:text-base font-bold font-display tracking-widest text-tactical-amber mb-5 blink-tactical flex items-center justify-center space-x-2">
        <span>&lt; MISSION INITIALIZING &gt;</span>
      </h2>

      {/* Progress Bar Container */}
      <div className="border border-tactical-olive/30 p-1.5 mb-4 bg-black/40 rounded-sm">
        <div className="flex space-x-[2px] h-4">
          {Array.from({ length: totalBlocks }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-full transition-all duration-150 ${
                i < filledBlocks
                  ? 'bg-tactical-olive shadow-[0_0_4px_#4d7c0f]'
                  : 'bg-tactical-olive/10'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Numerical Progress Indicator */}
      <div className="flex justify-between items-center text-[11px] text-tactical-olive/80 mb-6 font-mono">
        <span>SECURITY PROTOCOL // V2.8</span>
        <span className="text-tactical-green font-bold tracking-widest">
          {progress.toString().padStart(3, '0')}% LOADED
        </span>
      </div>

      {/* Rotating Message Box */}
      <div className="border-t border-dashed border-tactical-olive/20 pt-4 flex items-center space-x-2">
        <span className="text-tactical-green text-xs font-bold font-mono">&gt;</span>
        <span className="text-[12px] md:text-sm tracking-wide text-neutral-200 font-mono transition-all duration-300">
          {statusText}
        </span>
        <span className="w-1.5 h-3 bg-tactical-green/80 blink-cursor" />
      </div>

      {/* Mini data metrics */}
      <div className="mt-4 flex justify-between items-center text-[9px] text-tactical-olive/40 border-t border-tactical-olive/10 pt-2.5">
        <span>DATA_RATE: {progress < 100 ? (3.4 + Math.random()).toFixed(2) : '0.00'} MB/S</span>
        <span>PACKETS: {progress < 100 ? Math.floor(progress * 4.2) : 420}/420 SEC_SEC</span>
      </div>
    </div>
  );
}
