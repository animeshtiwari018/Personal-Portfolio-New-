"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

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
    lat: '30.3165° N',       // Indian Army Special Forces Training School vicinity
    long: '78.0322° E',
    alt: '2,230 M ASL',      // High altitude ops
    encryption: 'MIL-SEC / AES-256',
    satLink: 'GSAT-7A [RUKMINI]'
  };

  useEffect(() => {
    let frameId;
    const startTime = Date.now();

    // Lock sequence delays (ms from start)
    const lockDelays = {
      lat: 500,
      long: 700,
      alt: 900,
      encryption: 1100,
      satLink: 1300
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
        } else {
          const randVal = (10 + Math.random() * 40).toFixed(4);
          next.lat = `${randVal}° N`;
        }

        // LONGITUDE
        if (elapsed >= lockDelays.long) {
          next.long = targetTelemetry.long;
          nextLocks.long = true;
        } else {
          const randVal = (70 + Math.random() * 20).toFixed(4);
          next.long = `${randVal}° E`;
        }

        // ALTITUDE
        if (elapsed >= lockDelays.alt) {
          next.alt = targetTelemetry.alt;
          nextLocks.alt = true;
        } else {
          const randVal = Math.floor(1000 + Math.random() * 4000);
          next.alt = `${randVal.toLocaleString()} M ASL`;
        }

        // ENCRYPTION
        if (elapsed >= lockDelays.encryption) {
          next.encryption = targetTelemetry.encryption;
          nextLocks.encryption = true;
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
        // Telemetry completely locked, trigger onComplete after brief pause
        setTimeout(() => {
          onComplete && onComplete();
        }, 300);
      }
    };

    frameId = requestAnimationFrame(updateFeed);

    return () => {
      cancelAnimationFrame(frameId);
    };
  }, []);

  const allLocked = Object.values(locks).every(Boolean);

  return (
    <div className="w-full max-w-lg mx-auto p-6 font-mono border border-tactical-olive/20 bg-tactical-bg/85 backdrop-blur-md relative overflow-hidden screen-glow shadow-lg rounded-sm">
      {/* HUD Header */}
      <div className="flex justify-between items-center border-b border-tactical-olive/30 pb-3 mb-4">
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full ${allLocked ? 'bg-tactical-green' : 'bg-tactical-amber animate-ping'}`} />
          <span className="text-xs uppercase tracking-widest text-neutral-300 font-display font-semibold">
            {allLocked ? 'SENSORS LOCKED' : 'ACQUIRING TELEMETRY'}
          </span>
        </div>
        <div className="text-[10px] text-tactical-olive/60">
          SYS_REF: SF_LOCATOR_v4.8
        </div>
      </div>

      {/* Telemetry rows */}
      <div className="space-y-3.5">
        {/* LATITUDE */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-tactical-olive font-bold tracking-wider">LATITUDE:</span>
          <span className={`transition-colors duration-200 ${locks.lat ? 'text-tactical-green font-bold glow-text' : 'text-tactical-amber font-medium'}`}>
            {telemetry.lat}
          </span>
        </div>

        {/* LONGITUDE */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-tactical-olive font-bold tracking-wider">LONGITUDE:</span>
          <span className={`transition-colors duration-200 ${locks.long ? 'text-tactical-green font-bold' : 'text-tactical-amber font-medium'}`}>
            {telemetry.long}
          </span>
        </div>

        {/* ALTITUDE */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-tactical-olive font-bold tracking-wider">ALTITUDE:</span>
          <span className={`transition-colors duration-200 ${locks.alt ? 'text-tactical-green font-bold' : 'text-tactical-amber font-medium'}`}>
            {telemetry.alt}
          </span>
        </div>

        {/* ENCRYPTION */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-tactical-olive font-bold tracking-wider">ENCRYPTION:</span>
          <span className={`transition-colors duration-200 truncate max-w-[200px] text-right ${locks.encryption ? 'text-tactical-green font-bold' : 'text-tactical-amber font-medium'}`}>
            {telemetry.encryption}
          </span>
        </div>

        {/* SATELLITE LINK */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-tactical-olive font-bold tracking-wider">SATELLITE LINK:</span>
          <span className={`transition-colors duration-200 ${locks.satLink ? 'text-tactical-green font-bold' : 'text-tactical-amber font-medium'}`}>
            {telemetry.satLink}
          </span>
        </div>
      </div>

      {/* Decorative grid pattern in panel background */}
      <div className="absolute right-4 bottom-2 opacity-10 flex space-x-1">
        <div className="w-1.5 h-1.5 bg-tactical-olive" />
        <div className="w-1.5 h-1.5 bg-tactical-olive" />
        <div className="w-1.5 h-1.5 bg-tactical-olive" />
      </div>
    </div>
  );
}
