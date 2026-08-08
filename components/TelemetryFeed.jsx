"use client";

import React, { useEffect, useState } from 'react';
import { AudioEngine } from './AudioEngine';

export default function TelemetryFeed({ onComplete }) {
  const [telemetry, setTelemetry] = useState({
    lat: '00.0000° N',
    long: '00.0000° E',
    alt: '0000 M',
    encryption: 'SEARCHING...',
    satLink: 'ESTABLISHING...'
  });

  const [locks, setLocks] = useState({
    lat: false,
    long: false,
    alt: false,
    encryption: false,
    satLink: false
  });

  const targetTelemetry = {
    lat: '30.3165° N',
    long: '78.0322° E',
    alt: '2,230 M ASL',
    encryption: 'MIL-SEC / AES-256',
    satLink: 'GSAT-7A [RUKMINI]'
  };

  useEffect(() => {
    let frameId;
    const startTime = Date.now();

    const lockDelays = {
      lat: 500,
      long: 700,
      alt: 900,
      encryption: 1100,
      satLink: 1300
    };

    // Keep track of which locks have played their sound effect
    const soundPlayed = {
      lat: false,
      long: false,
      alt: false,
      encryption: false,
      satLink: false
    };

    const updateFeed = () => {
      const elapsed = Date.now() - startTime;

      setTelemetry(prev => {
        const next = { ...prev };
        const nextLocks = { ...locks };

        // LATITUDE
        if (elapsed >= lockDelays.lat) {
          next.lat = targetTelemetry.lat;
          nextLocks.lat = true;
          if (!soundPlayed.lat) {
            AudioEngine.playHover();
            soundPlayed.lat = true;
          }
        } else {
          const randVal = (10 + Math.random() * 40).toFixed(4);
          next.lat = `${randVal}° N`;
        }

        // LONGITUDE
        if (elapsed >= lockDelays.long) {
          next.long = targetTelemetry.long;
          nextLocks.long = true;
          if (!soundPlayed.long) {
            AudioEngine.playHover();
            soundPlayed.long = true;
          }
        } else {
          const randVal = (70 + Math.random() * 20).toFixed(4);
          next.long = `${randVal}° E`;
        }

        // ALTITUDE
        if (elapsed >= lockDelays.alt) {
          next.alt = targetTelemetry.alt;
          nextLocks.alt = true;
          if (!soundPlayed.alt) {
            AudioEngine.playHover();
            soundPlayed.alt = true;
          }
        } else {
          const randVal = Math.floor(1000 + Math.random() * 4000);
          next.alt = `${randVal.toLocaleString()} M ASL`;
        }

        // ENCRYPTION
        if (elapsed >= lockDelays.encryption) {
          next.encryption = targetTelemetry.encryption;
          nextLocks.encryption = true;
          if (!soundPlayed.encryption) {
            AudioEngine.playHover();
            soundPlayed.encryption = true;
          }
        } else {
          const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/@$';
          let scramble = '';
          for (let i = 0; i < 15; i++) {
            scramble += chars[Math.floor(Math.random() * chars.length)];
          }
          next.encryption = scramble;
        }

        // SATELLITE LINK
        if (elapsed >= lockDelays.satLink) {
          next.satLink = targetTelemetry.satLink;
          nextLocks.satLink = true;
          if (!soundPlayed.satLink) {
            AudioEngine.playClick(); // play click on final lock
            soundPlayed.satLink = true;
          }
        } else {
          const satNames = ['INSAT-3DR', 'CARTOSAT-3', 'GSAT-7', 'RISAT-2B', 'EMISAT'];
          next.satLink = `${satNames[Math.floor(Math.random() * satNames.length)]} [HANDSHAKE]`;
        }

        setLocks(nextLocks);
        return next;
      });

      if (elapsed < lockDelays.satLink + 400) {
        frameId = requestAnimationFrame(updateFeed);
      } else {
        setTimeout(() => {
          onComplete && onComplete();
        }, 400);
      }
    };

    frameId = requestAnimationFrame(updateFeed);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  const allLocked = Object.values(locks).every(Boolean);

  return (
    <div className="w-full max-w-lg mx-auto p-6 border border-hud-dim glass-panel relative overflow-hidden screen-glow shadow-hud-glow rounded-sm transition-hud">
      {/* HUD Header */}
      <div className="flex justify-between items-center border-b border-hud-dim/30 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${allLocked ? 'bg-hud-primary shadow-[0_0_6px_var(--hud-primary)]' : 'bg-hud-accent animate-ping'}`} />
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-200 font-display font-semibold transition-hud">
            {allLocked ? 'SENSORS LOCKED' : 'ACQUIRING TELEMETRY'}
          </span>
        </div>
        <div className="text-[9px] text-hud-primary/60 font-mono">
          SYS_REF: SF_LOCATOR_v5.0
        </div>
      </div>

      {/* Telemetry rows */}
      <div className="space-y-3.5">
        {/* LATITUDE */}
        <div className="flex justify-between items-center text-xs md:text-sm">
          <span className="text-hud-primary/70 font-bold tracking-widest uppercase">LATITUDE:</span>
          <span className={`transition-colors duration-200 font-mono tracking-wide ${locks.lat ? 'text-hud-primary font-bold text-glow' : 'text-hud-primary/50'}`}>
            {telemetry.lat}
          </span>
        </div>

        {/* LONGITUDE */}
        <div className="flex justify-between items-center text-xs md:text-sm">
          <span className="text-hud-primary/70 font-bold tracking-widest uppercase">LONGITUDE:</span>
          <span className={`transition-colors duration-200 font-mono tracking-wide ${locks.long ? 'text-hud-primary font-bold text-glow' : 'text-hud-primary/50'}`}>
            {telemetry.long}
          </span>
        </div>

        {/* ALTITUDE */}
        <div className="flex justify-between items-center text-xs md:text-sm">
          <span className="text-hud-primary/70 font-bold tracking-widest uppercase">ALTITUDE:</span>
          <span className={`transition-colors duration-200 font-mono tracking-wide ${locks.alt ? 'text-hud-primary font-bold text-glow' : 'text-hud-primary/50'}`}>
            {telemetry.alt}
          </span>
        </div>

        {/* ENCRYPTION */}
        <div className="flex justify-between items-center text-xs md:text-sm">
          <span className="text-hud-primary/70 font-bold tracking-widest uppercase">ENCRYPTION:</span>
          <span className={`transition-colors duration-200 truncate max-w-[200px] text-right font-mono tracking-wide ${locks.encryption ? 'text-hud-primary font-bold text-glow' : 'text-hud-primary/50'}`}>
            {telemetry.encryption}
          </span>
        </div>

        {/* SATELLITE LINK */}
        <div className="flex justify-between items-center text-xs md:text-sm">
          <span className="text-hud-primary/70 font-bold tracking-widest uppercase">SATELLITE LINK:</span>
          <span className={`transition-colors duration-200 font-mono tracking-wide ${locks.satLink ? 'text-hud-primary font-bold text-glow' : 'text-hud-primary/50'}`}>
            {telemetry.satLink}
          </span>
        </div>
      </div>

      {/* Decorative grid pattern in panel background */}
      <div className="absolute right-4 bottom-2 opacity-15 flex space-x-1">
        <div className="w-1.5 h-1.5 bg-hud-primary" />
        <div className="w-1.5 h-1.5 bg-hud-primary" />
        <div className="w-1.5 h-1.5 bg-hud-primary" />
      </div>
    </div>
  );
}
