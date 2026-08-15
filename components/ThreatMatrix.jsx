"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, AlertTriangle, Play, CheckCircle2, RefreshCw, Server, ShieldCheck, Terminal, Cpu } from 'lucide-react';
import { AudioEngine } from './AudioEngine';

export default function ThreatMatrix() {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployProgress, setDeployProgress] = useState(0);
  const [isSecured, setIsSecured] = useState(false);
  
  // Hostile vectors state
  const [vectors, setVectors] = useState([
    { id: 'vec-01', ip: '185.220.101.4', loc: 'BEIJING, CN', port: '443', level: 'CRITICAL // OMEGA', load: 82 },
    { id: 'vec-02', ip: '93.115.80.19', loc: 'ST. PETERSBURG, RU', port: '8080', level: 'ELEVATED // ALPHA', load: 54 },
    { id: 'vec-03', ip: '202.45.160.8', loc: 'PROXY_NET_DE', port: '22', level: 'LOW // EPSILON', load: 18 }
  ]);

  const progressIntervalRef = useRef(null);
  const fluctuationIntervalRef = useRef(null);

  // Live vector percentage fluctuations
  useEffect(() => {
    fluctuationIntervalRef.current = setInterval(() => {
      if (!isDeploying && !isSecured) {
        setVectors(prev => prev.map(v => {
          const delta = Math.floor(Math.random() * 7) - 3;
          return {
            ...v,
            load: Math.min(99, Math.max(5, v.load + delta))
          };
        }));
      }
    }, 1200);

    return () => {
      clearInterval(progressIntervalRef.current);
      clearInterval(fluctuationIntervalRef.current);
    };
  }, [isDeploying, isSecured]);

  const handleDeployShield = () => {
    if (isDeploying || isSecured) return;

    setIsDeploying(true);
    setDeployProgress(0);
    AudioEngine.playAlarm(); // Trigger alarms during alert state

    let progress = 0;
    progressIntervalRef.current = setInterval(() => {
      progress += 4;
      setDeployProgress(progress);

      // Play tick sounds as containment builds up
      if (progress % 12 === 0) {
        AudioEngine.playTick();
      }

      if (progress >= 100) {
        clearInterval(progressIntervalRef.current);
        setIsDeploying(false);
        setIsSecured(true);
        AudioEngine.playSweep(1.5); // Secured sweep sounds
        // Suppress intrusion vectors load to 0
        setVectors(prev => prev.map(v => ({ ...v, load: 0, level: 'CONTAINED' })));
      }
    }, 80);
  };

  const handleResetSystem = () => {
    setIsSecured(false);
    setVectors([
      { id: 'vec-01', ip: '185.220.101.4', loc: 'BEIJING, CN', port: '443', level: 'CRITICAL // OMEGA', load: 82 },
      { id: 'vec-02', ip: '93.115.80.19', loc: 'ST. PETERSBURG, RU', port: '8080', level: 'ELEVATED // ALPHA', load: 54 },
      { id: 'vec-03', ip: '202.45.160.8', loc: 'PROXY_NET_DE', port: '22', level: 'LOW // EPSILON', load: 18 }
    ]);
    AudioEngine.playClick();
  };

  const handleInteractiveHover = () => {
    AudioEngine.playHover();
  };

  return (
    <div className="space-y-4 flex-1 flex flex-col justify-between">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-hud-dim/20 pb-2.5">
        <h3 className="text-xs font-bold font-display tracking-widest text-hud-primary uppercase flex items-center space-x-1.5">
          <ShieldAlert className={`w-3.5 h-3.5 ${!isSecured ? 'blink-tactical text-hud-primary' : 'text-hud-primary'}`} />
          <span>THREAT MATRIX // NETWORK CONTAINMENT</span>
        </h3>
        <span className={`text-[9px] font-bold px-1.5 py-0.5 border rounded-sm ${!isSecured ? 'text-hud-primary border-hud-dim/35 bg-hud-primary/10 animate-pulse' : 'text-[#a8e6a3] border-[#a8e6a3]/30 bg-green-950/15'}`}>
          {!isSecured ? 'WARNING: ACTIVE HOSTILE ATTEMPTS' : 'STATUS: CONTAINED'}
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1 items-stretch min-h-0">
        
        {/* Left Grid: Hostile Vector Records */}
        <div className="md:col-span-7 border border-hud-dim/15 bg-black/30 p-3 rounded-sm relative flex flex-col justify-between">
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-hud-primary/30" />
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-hud-primary/30" />

          <div className="space-y-2.5 flex-1 min-h-0 overflow-y-auto max-h-[220px] pr-1">
            <div className="text-[9px] text-hud-primary/45 tracking-wider font-bold block uppercase border-b border-hud-dim/10 pb-1">
              INTRUSION VECTOR TELEMETRY
            </div>

            <div className="space-y-2">
              {vectors.map((vec) => (
                <div
                  key={vec.id}
                  className={`border p-2.5 rounded-sm flex flex-col sm:flex-row justify-between sm:items-center gap-2 bg-black/35 ${
                    isSecured 
                      ? 'border-hud-dim/10 opacity-60' 
                      : vec.level.includes('CRITICAL') 
                        ? 'border-hud-primary/50 shadow-[inset_0_0_8px_rgba(239,68,68,0.05)]' 
                        : 'border-hud-dim/20'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="font-mono text-[10px] font-bold text-neutral-200 flex items-center space-x-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${isSecured ? 'bg-hud-primary/50' : vec.load > 70 ? 'bg-hud-primary animate-ping' : 'bg-hud-primary'}`} />
                      <span>{vec.ip}</span>
                    </div>
                    <div className="text-[8px] text-hud-primary/45 font-mono">
                      ORIGIN: {vec.loc} // DEST_PORT: {vec.port}
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-start sm:items-end justify-between gap-1 shrink-0">
                    <span className="text-[8px] font-bold border border-hud-dim/20 px-1 py-0.5 rounded-sm bg-black/40 text-hud-primary">
                      {vec.level}
                    </span>
                    <div className="flex items-center space-x-1.5 mt-0.5">
                      <span className="text-[8px] text-hud-primary/55 font-bold">LOAD:</span>
                      <span className={`text-[10px] font-mono font-bold ${vec.load > 70 && !isSecured ? 'text-hud-primary text-glow' : 'text-neutral-200'}`}>
                        {vec.load}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 border-t border-hud-dim/15 pt-2 text-[8px] text-hud-primary/40 font-mono select-none">
            IP INTERCEPT FREQ: UHF_LINK_SEC_88
          </div>
        </div>

        {/* Right Grid: Tactical Containment Deck */}
        <div className="md:col-span-5 border border-hud-dim/15 bg-black/30 p-3 rounded-sm relative flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-hud-primary/30" />
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-hud-primary/30" />

          <div className="space-y-3.5">
            <div className="text-[9px] text-hud-primary/45 tracking-wider font-bold block uppercase border-b border-hud-dim/10 pb-1">
              SHIELD CONTROL MATRIX
            </div>

            {/* Pulse monitor visual */}
            <div className="h-[90px] border border-hud-dim/15 bg-black/55 rounded-sm relative overflow-hidden flex flex-col justify-between p-2">
              <div className="flex justify-between items-center text-[8px] text-hud-primary/50 z-10 select-none">
                <span>VECTOR OSCILLATION</span>
                <span>STATE: {isSecured ? 'SECURE' : 'ALERT'}</span>
              </div>
              
              {/* Animated threat waves inside canvas-like SVG */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
                <svg width="100%" height="50" viewBox="0 0 200 50" preserveAspectRatio="none" className="w-full">
                  <path 
                    d={isSecured 
                      ? "M 0,25 L 200,25" 
                      : "M 0,25 Q 25,5 50,25 T 100,25 T 150,25 T 200,25"
                    }
                    fill="none" 
                    stroke="var(--hud-primary)" 
                    strokeWidth="1.5"
                    className={`transition-all duration-300 ${!isSecured ? 'animate-pulse' : ''}`}
                  />
                </svg>
              </div>

              {/* Secure banner */}
              <div className="flex justify-between items-center text-[7px] text-hud-primary/40 z-10 select-none">
                <span>CONTAINMENT BLOCKER ACTIVE</span>
                <span>GSAT-7A UPLINK</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-[9.5px] text-neutral-300 leading-normal font-mono text-left">
              {!isSecured 
                ? 'Hostile actors are probing systems ports. Deploying containment firewall suppresses network loading and containment locks active intruders.' 
                : 'Firewall blocks deployed successfully. Intercept vectors contained and intruder connections isolated. System integrity restored.'
              }
            </p>
          </div>

          <div className="mt-4 pt-3.5 border-t border-hud-dim/10">
            {!isSecured && !isDeploying ? (
              <button
                onClick={handleDeployShield}
                onMouseEnter={handleInteractiveHover}
                className="w-full py-2.5 bg-hud-primary/10 hover:bg-hud-primary/20 border border-hud-primary/40 text-neutral-200 hover:text-hud-primary text-[10px] font-bold tracking-[0.2em] transition-all cursor-pointer flex items-center justify-center space-x-2 rounded-sm shadow-hud-glow"
              >
                <Play className="w-3.5 h-3.5" />
                <span>[ DEPLOY CONTAINER SHIELD ]</span>
              </button>
            ) : isDeploying ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[9px] font-bold text-hud-primary select-none">
                  <span>ISOLATING PORT VECTOR PATHS...</span>
                  <span>{deployProgress}%</span>
                </div>
                <div className="h-2 w-full bg-black/60 border border-hud-dim/35 p-[1px] rounded-sm overflow-hidden">
                  <div 
                    className="h-full bg-hud-primary rounded-sm shadow-[0_0_8px_var(--hud-primary)] transition-all duration-100" 
                    style={{ width: `${deployProgress}%` }} 
                  />
                </div>
              </div>
            ) : (
              <button
                onClick={handleResetSystem}
                onMouseEnter={handleInteractiveHover}
                className="w-full py-2.5 bg-[#a8e6a3]/10 hover:bg-[#a8e6a3]/20 border border-[#a8e6a3]/40 text-[#a8e6a3] text-[10px] font-bold tracking-[0.2em] transition-all cursor-pointer flex items-center justify-center space-x-2 rounded-sm"
              >
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>[ RESET MATRIX TELEMETRY ]</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* Footer info */}
      <div className="border-t border-hud-dim/15 pt-2 flex justify-between items-center text-[9px] text-hud-primary/45 font-mono select-none">
        <span>INTEGRITY STATUS: SECURE</span>
        <span>SHIELD ENFORCEMENT: GSAT-MIL</span>
        <span>COUNTERMEASURE ENGINE READY</span>
      </div>
    </div>
  );
}
