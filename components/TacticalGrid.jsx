"use client";

import React from 'react';

export default function TacticalGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-10 select-none">
      {/* 1. Tactical Grid Pattern Background */}
      <div className="absolute inset-0 tactical-grid-bg opacity-35" />

      {/* 2. Concentric Radar Rings & Rotating Radar Sweeper (Subtle Background) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full border border-tactical-olive/5 flex items-center justify-center">
        {/* Radar Conic Gradient Sweeper */}
        <div className="absolute inset-0 rounded-full radar-sweep-effect opacity-25" />
        
        {/* Inner concentric dotted rings */}
        <div className="w-[80%] h-[80%] rounded-full border border-dashed border-tactical-olive/10" />
        <div className="w-[60%] h-[60%] rounded-full border border-dotted border-tactical-olive/15" />
        <div className="w-[40%] h-[40%] rounded-full border border-dashed border-tactical-olive/10" />
        <div className="w-[20%] h-[20%] rounded-full border border-solid border-tactical-olive/20" />
        
        {/* Crosshair Lines */}
        <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-tactical-olive/15 to-transparent" />
        <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-tactical-olive/15 to-transparent" />

        {/* Small blip target indicators */}
        <div className="absolute top-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-tactical-amber opacity-60 animate-ping" />
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 rounded-full bg-tactical-olive opacity-80 blink-tactical" />
      </div>

      {/* 3. Laser Scan Line sweeping vertically */}
      <div className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-tactical-green/45 to-transparent shadow-[0_0_10px_rgba(34,197,94,0.4)] laser-line" />

      {/* 4. Tactical Screen Border and Corners */}
      <div className="absolute inset-4 md:inset-8 border border-tactical-olive/10">
        {/* Top-Left Corner Bracket */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-tactical-olive/60" />
        {/* Top-Right Corner Bracket */}
        <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-tactical-olive/60" />
        {/* Bottom-Left Corner Bracket */}
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-tactical-olive/60" />
        {/* Bottom-Right Corner Bracket */}
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-tactical-olive/60" />

        {/* Corner Ticks & Coordinates labels in borders */}
        <div className="absolute top-2 left-3 text-[9px] text-tactical-olive/50 font-mono tracking-widest hidden sm:block">
          SYS.LOC // GRID: 43Q-ND
        </div>
        <div className="absolute top-2 right-3 text-[9px] text-tactical-olive/50 font-mono tracking-widest hidden sm:block">
          LINK STATUS: COVERT_SECURE
        </div>
        <div className="absolute bottom-2 left-3 text-[9px] text-tactical-olive/50 font-mono tracking-widest hidden sm:block">
          DEPT // PARA (SPECIAL FORCES)
        </div>
        <div className="absolute bottom-2 right-3 text-[9px] text-tactical-olive/50 font-mono tracking-widest hidden sm:block">
          SECURITY LEVEL: SECRET
        </div>
      </div>

      {/* 5. GPU-Accelerated Dynamic Digital Noise Filter Overlay */}
      <svg className="fixed inset-0 w-full h-full opacity-[0.035] pointer-events-none" xmlns="http://www.w3.org/2000/svg">
        <filter id="covertNoise">
          <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="matrix" values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.1 0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#covertNoise)" />
      </svg>
    </div>
  );
}
