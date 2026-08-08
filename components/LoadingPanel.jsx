"use client";

import React, { useEffect, useState } from 'react';
import { AudioEngine } from './AudioEngine';

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
    let lastProgressFloor = 0;
    
    // Custom non-linear easing function
    const tick = () => {
      let increment = 0;
      if (currentProgress < 20) {
        increment = 0.6 + Math.random() * 1.6;
      } else if (currentProgress < 38) {
        increment = 0.25 + Math.random() * 0.7;
      } else if (currentProgress < 42) {
        increment = 0.06 + Math.random() * 0.12; // Hard pause simulating secure sync handshake
      } else if (currentProgress < 75) {
        increment = 1.2 + Math.random() * 2.8;
      } else if (currentProgress < 92) {
        increment = 0.4 + Math.random() * 0.9;
      } else if (currentProgress < 100) {
        increment = 0.5 + Math.random() * 0.7;
      }

      currentProgress = Math.min(100, currentProgress + increment);
      const floorProgress = Math.floor(currentProgress);
      setProgress(floorProgress);

      // Play audio tick when progress increases
      if (floorProgress > lastProgressFloor) {
        // Only tick every few steps to make it sound nice
        if (floorProgress % 2 === 0) {
          AudioEngine.playTick();
        }
        lastProgressFloor = floorProgress;
      }

      // Rotate messages based on current progress threshold
      const matchedMessage = [...messages]
        .reverse()
        .find(m => currentProgress >= m.threshold);
      if (matchedMessage) {
        setStatusText(matchedMessage.text);
      }

      if (currentProgress < 100) {
        setTimeout(() => {
          animationFrameId = requestAnimationFrame(tick);
        }, 22);
      } else {
        setTimeout(() => {
          onComplete && onComplete();
        }, 500);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const totalBlocks = 24;
  const filledBlocks = Math.floor((progress / 100) * totalBlocks);

  return (
    <div className="w-full max-w-lg mx-auto p-6 border border-hud-dim glass-panel relative screen-glow shadow-hud-glow rounded-sm transition-hud">
      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-hud-primary" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-hud-primary" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-hud-primary" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-hud-primary" />

      {/* Title */}
      <h2 className="text-center text-xs md:text-sm font-bold font-display tracking-[0.2em] text-hud-primary mb-5 blink-tactical flex items-center justify-center space-x-2">
        <span>&lt; SYSTEM CORE INITIALIZING &gt;</span>
      </h2>

      {/* Progress Bar Container */}
      <div className="border border-hud-dim/20 p-1.5 mb-4 bg-black/45 rounded-sm">
        <div className="flex space-x-[2px] h-3.5">
          {Array.from({ length: totalBlocks }).map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-full transition-all duration-150 rounded-sm ${
                i < filledBlocks
                  ? 'bg-hud-primary shadow-[0_0_6px_var(--hud-primary)]'
                  : 'bg-hud-primary/5'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Numerical Progress Indicator */}
      <div className="flex justify-between items-center text-[10px] text-hud-primary/75 mb-6 font-mono">
        <span className="tracking-wider">SECURITY PROTOCOL // AES-256</span>
        <span className="text-hud-primary font-bold tracking-widest text-xs">
          {progress.toString().padStart(3, '0')}% LOADED
        </span>
      </div>

      {/* Rotating Message Box */}
      <div className="border-t border-dashed border-hud-dim/20 pt-4 flex items-center space-x-2 min-h-[40px]">
        <span className="text-hud-primary text-xs font-bold font-mono animate-pulse">&gt;</span>
        <span className="text-[11px] md:text-xs tracking-widest text-neutral-200 font-mono transition-all duration-300 uppercase">
          {statusText}
        </span>
        <span className="w-1.5 h-3.5 bg-hud-primary/80 blink-cursor" />
      </div>

      {/* Mini data metrics */}
      <div className="mt-4 flex justify-between items-center text-[8px] text-hud-primary/40 border-t border-hud-dim/10 pt-2.5">
        <span>DATA_RATE: {progress < 100 ? (3.4 + Math.random()).toFixed(2) : '0.00'} MB/S</span>
        <span>PACKETS: {progress < 100 ? Math.floor(progress * 4.2) : 420}/420 SEC_SEC</span>
      </div>
    </div>
  );
}
