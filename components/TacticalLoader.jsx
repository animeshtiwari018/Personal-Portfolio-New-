"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TacticalGrid from './TacticalGrid';
import TelemetryFeed from './TelemetryFeed';
import LoadingPanel from './LoadingPanel';
import IdentityVerification from './IdentityVerification';

export default function TacticalLoader({ onFinished }) {
  // Scene 0: Completely Black
  // Scene 1: SIGNAL ACQUIRED...
  // Scene 2: Telemetry acquisition
  // Scene 3: Loading panel (MISSION INITIALIZING)
  // Scene 4: IDENTITY VERIFIED / SPECIAL OPERATIONS READY
  // Scene 5: Fade-out transition
  const [scene, setScene] = useState(0);

  useEffect(() => {
    // Scene 0 -> 1: Show "SIGNAL ACQUIRED..." after 300ms
    const timer1 = setTimeout(() => {
      setScene(1);
    }, 300);

    // Scene 1 -> 2: Show Telemetry feed after 1200ms total
    const timer2 = setTimeout(() => {
      setScene(2);
    }, 1300);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const handleTelemetryComplete = () => {
    setScene(3);
  };

  const handleLoadingComplete = () => {
    setScene(4);
  };

  const handleVerificationComplete = () => {
    setScene(5);
    // Let the fade-out finish before completing
    setTimeout(() => {
      onFinished && onFinished();
    }, 600);
  };

  // Skip loader if the user prefers reduced motion
  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      // Instantly trigger finished callback to keep things accessible
      const instantTimer = setTimeout(() => {
        onFinished && onFinished();
      }, 100);
      return () => clearTimeout(instantTimer);
    }
  }, [onFinished]);

  return (
    <AnimatePresence>
      {scene < 5 && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 bg-[#050505] text-[#e5e7eb] z-[1000] flex flex-col items-center justify-center font-mono overflow-hidden select-none crt-flicker scanlines screen-glow"
        >
          {/* Tactical grid background environment, rendered for all scenes except Scene 0 */}
          {scene > 0 && <TacticalGrid />}

          {/* Core content wrapper */}
          <div className="w-full px-6 z-20 flex flex-col items-center justify-center">
            {/* Scene 1: SIGNAL ACQUIRED... */}
            {scene === 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="relative text-glitch py-4" data-text="SIGNAL ACQUIRED...">
                  <h1 className="text-xl md:text-2xl font-bold font-display tracking-[0.3em] text-tactical-olive">
                    SIGNAL ACQUIRED...
                  </h1>
                </div>
                <div className="text-[10px] text-tactical-olive/50 mt-1 uppercase tracking-widest blink-tactical">
                  Establishing classified link uplink
                </div>
              </motion.div>
            )}

            {/* Scene 2: TELEMETRY ACQUISITION */}
            {scene === 2 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full flex justify-center"
              >
                <TelemetryFeed onComplete={handleTelemetryComplete} />
              </motion.div>
            )}

            {/* Scene 3: MISSION INITIALIZING */}
            {scene === 3 && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="w-full flex justify-center"
              >
                <LoadingPanel onComplete={handleLoadingComplete} />
              </motion.div>
            )}

            {/* Scene 4: IDENTITY VERIFIED & READY */}
            {scene === 4 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="w-full flex justify-center"
              >
                <IdentityVerification onComplete={handleVerificationComplete} />
              </motion.div>
            )}
          </div>

          {/* Small operational watermark details in corner background */}
          {scene > 0 && (
            <div className="absolute bottom-6 left-6 font-mono text-[9px] text-tactical-olive/30 flex flex-col space-y-1">
              <span>STATUS: SECURITY_LVL_V</span>
              <span>OPS_UNIT: PARA_SF_COVERT</span>
            </div>
          )}
          {scene > 0 && (
            <div className="absolute bottom-6 right-6 font-mono text-[9px] text-tactical-olive/30 flex flex-col space-y-1 text-right">
              <span>SYS_MON: ACTIVE</span>
              <span>BAT_V: 14.2V // OK</span>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
