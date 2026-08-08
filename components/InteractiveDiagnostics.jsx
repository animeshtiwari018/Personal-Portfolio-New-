"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Activity, ShieldAlert, Cpu, HardDrive, Wifi } from 'lucide-react';
import { AudioEngine } from './AudioEngine';

export default function InteractiveDiagnostics() {
  const [cpuCores, setCpuCores] = useState([24, 18, 35, 42]);
  const [ramLoad, setRamLoad] = useState(48.2);
  const [signalStrength, setSignalStrength] = useState(94.8);
  const [logFeeds, setLogFeeds] = useState([
    'SYS: LINK SECURE // VER 8A',
    'COMM: PORT 8080 OPENED',
    'GEOLOC: TARGET LOCKED ON SF_CENTRAL'
  ]);
  const [freqHz, setFreqHz] = useState(824.5);
  
  // Wave animation reference
  const pathRef = useRef(null);
  const animationRef = useRef(null);
  const phaseRef = useRef(0);

  // Update metrics periodically
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate CPU Core fluctuations
      setCpuCores(prev => prev.map(core => {
        const delta = Math.floor(Math.random() * 21) - 10;
        return Math.min(100, Math.max(5, core + delta));
      }));

      // Simulate RAM drift
      setRamLoad(prev => {
        const drift = (Math.random() * 0.4) - 0.2;
        return Math.min(95, Math.max(30, parseFloat((prev + drift).toFixed(1))));
      });

      // Simulate Signal drift
      setSignalStrength(prev => {
        const drift = (Math.random() * 0.8) - 0.4;
        return Math.min(100, Math.max(80, parseFloat((prev + drift).toFixed(1))));
      });

      // Simulate frequency shift
      setFreqHz(prev => {
        const shift = (Math.random() * 0.6) - 0.3;
        return parseFloat((prev + shift).toFixed(2));
      });
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  // System log simulation
  useEffect(() => {
    const sysLogs = [
      'COMM: SECURE DECRYPTION KEY CLEARED',
      'SYS: HARDWARE DECRYPTION ENGINE ON STANDBY',
      'GEOLOC: SAT UPLINK ESTABLISHED ON BEAM 04',
      'SYS: CACHE OPTIMIZATION RUNNING...',
      'NET: INCOMING PACKET STREAM DECRYPTED',
      'COMM: HEARTBEAT LOCK AT 4ms LATENCY',
      'SEC: SECURITY CLEARANCE VALIDATED (LVL 5)'
    ];

    const interval = setInterval(() => {
      const randomLog = sysLogs[Math.floor(Math.random() * sysLogs.length)];
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setLogFeeds(prev => {
        const updated = [...prev, `[${timestamp}] ${randomLog}`];
        if (updated.length > 5) updated.shift();
        return updated;
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  // Animate SVG frequency wave
  useEffect(() => {
    const animateWave = () => {
      phaseRef.current += 0.08;
      const width = 300;
      const height = 60;
      let points = [];

      for (let x = 0; x <= width; x += 5) {
        // Compose multiple sine waves for a complex, glitchy frequency feed
        const angle1 = (x / width) * Math.PI * 8 + phaseRef.current;
        const angle2 = (x / width) * Math.PI * 3 - phaseRef.current * 1.5;
        const y = (height / 2) + Math.sin(angle1) * 12 + Math.cos(angle2) * 5;
        points.push(`${x},${y}`);
      }

      if (pathRef.current) {
        pathRef.current.setAttribute('d', `M 0,${height/2} L ${points.join(' L ')} L ${width},${height/2}`);
      }

      animationRef.current = requestAnimationFrame(animateWave);
    };

    animationRef.current = requestAnimationFrame(animateWave);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  const handleInteractiveHover = () => {
    AudioEngine.playHover();
  };

  const handleInteractiveClick = () => {
    AudioEngine.playClick();
  };

  return (
    <div className="border border-hud-dim glass-panel rounded-sm p-4 relative z-10 transition-hud shadow-hud-glow">
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-hud-primary" />
      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-hud-primary" />
      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-hud-primary" />
      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-hud-primary" />

      {/* Widget Header */}
      <div className="flex justify-between items-center border-b border-hud-dim/20 pb-2 mb-3">
        <h4 className="text-[10px] font-bold tracking-widest text-hud-primary flex items-center space-x-1.5 font-display">
          <Activity className="w-3.5 h-3.5 blink-tactical" />
          <span>DIAGNOSTICS & TELEMETRY</span>
        </h4>
        <span className="text-[8px] font-mono text-hud-primary/60 tracking-wider">REALTIME_SUITE</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Hardware Status Block */}
        <div className="space-y-3.5">
          {/* CPU Cores display */}
          <div className="space-y-1.5">
            <span className="text-[9px] text-hud-primary/50 font-bold block tracking-wider uppercase flex items-center gap-1">
              <Cpu className="w-3 h-3" /> CPU PROCESSORS (MULTICORE)
            </span>
            <div className="grid grid-cols-4 gap-1.5">
              {cpuCores.map((load, index) => (
                <div 
                  key={index}
                  onMouseEnter={handleInteractiveHover}
                  className="bg-black/40 border border-hud-dim/20 p-1.5 text-center rounded-sm transition-all hover:border-hud-primary/50 relative overflow-hidden"
                >
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-hud-primary/5 transition-all duration-300 pointer-events-none"
                    style={{ height: `${load}%` }}
                  />
                  <div className="text-[8px] text-hud-primary/40 block font-bold">C0{index+1}</div>
                  <div className="text-xs font-bold text-hud-primary tracking-tighter">{load}%</div>
                </div>
              ))}
            </div>
          </div>

          {/* RAM Meter */}
          <div className="space-y-1">
            <div className="flex justify-between text-[9px] text-hud-primary/60 font-semibold tracking-wider">
              <span className="flex items-center gap-1"><HardDrive className="w-3 h-3" /> MEMORY SECTOR LOAD</span>
              <span className="text-hud-primary font-bold">{ramLoad}%</span>
            </div>
            <div className="h-1.5 w-full bg-black/40 border border-hud-dim/20 rounded-sm overflow-hidden p-[1px]">
              <div 
                className="h-full bg-hud-primary rounded-sm transition-all duration-500 shadow-[0_0_6px_var(--hud-primary)]" 
                style={{ width: `${ramLoad}%` }} 
              />
            </div>
          </div>

          {/* Network Link */}
          <div className="space-y-1">
            <div className="flex justify-between text-[9px] text-hud-primary/60 font-semibold tracking-wider">
              <span className="flex items-center gap-1"><Wifi className="w-3 h-3" /> SATELLITE SIGNAL LOCK</span>
              <span className="text-hud-primary font-bold">{signalStrength}%</span>
            </div>
            <div className="h-1.5 w-full bg-black/40 border border-hud-dim/20 rounded-sm overflow-hidden p-[1px]">
              <div 
                className="h-full bg-hud-primary rounded-sm transition-all duration-500 shadow-[0_0_6px_var(--hud-primary)]" 
                style={{ width: `${signalStrength}%` }} 
              />
            </div>
          </div>
        </div>

        {/* Telemetry Stream & Signal Wave Block */}
        <div className="flex flex-col justify-between space-y-3">
          
          {/* Signal wave scanner visualization */}
          <div className="border border-hud-dim/15 bg-black/35 rounded-sm p-2 flex flex-col justify-between relative overflow-hidden h-[85px]">
            <div className="flex justify-between items-center z-10">
              <span className="text-[8px] text-hud-primary/50 tracking-widest font-bold">UHF BAND FREQ</span>
              <span className="text-[10px] text-hud-primary font-bold font-mono tracking-wide">{freqHz} MHz</span>
            </div>
            
            {/* SVG Oscilloscope wave */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <svg width="100%" height="60" viewBox="0 0 300 60" preserveAspectRatio="none" className="w-full opacity-60">
                <path 
                  ref={pathRef}
                  fill="none" 
                  stroke="var(--hud-primary)" 
                  strokeWidth="1.5"
                  className="transition-all duration-100"
                />
              </svg>
            </div>
            
            {/* Center Grid overlay lines */}
            <div className="absolute top-1/2 left-0 right-0 border-t border-hud-dim/10 pointer-events-none" />
            <div className="absolute left-1/2 top-0 bottom-0 border-l border-hud-dim/10 pointer-events-none" />

            <div className="flex justify-between items-center text-[7px] text-hud-primary/40 z-10">
              <span>SCANNER: ACTIVE</span>
              <span>RATE: 2.4 MSPS</span>
            </div>
          </div>

          {/* Live system logs terminal stream */}
          <div className="border border-hud-dim/10 bg-black/50 p-2.5 rounded-sm font-mono text-[8px] text-hud-primary/75 h-[70px] overflow-hidden space-y-0.5 select-none">
            <div className="text-[8px] text-hud-primary/35 font-bold uppercase tracking-wider mb-1">Live Syslog Stream</div>
            {logFeeds.map((feed, idx) => (
              <div key={idx} className="truncate font-mono tracking-wide">
                <span className="text-hud-primary/40 mr-1">&gt;</span>{feed}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
