"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Lock, ShieldAlert, Radio, Database, Cpu, Wifi, KeyRound, AlertTriangle, Eye, CheckCircle2 } from 'lucide-react';
import { AudioEngine } from './AudioEngine';

export default function SatelliteIntercept() {
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [decryptProgress, setDecryptProgress] = useState(0);
  const [isDecrypted, setIsDecrypted] = useState(false);
  const [activeLogId, setActiveLogId] = useState(null);
  
  // Dynamic orbital coordinates state
  const [satCoords, setSatCoords] = useState({ lat: '30.3165° N', long: '78.0322° E', alt: '36,786 KM' });
  const [scrambleKey, setScrambleKey] = useState("U2FsdGVkX1+vGv...");

  // Interval references
  const coordIntervalRef = useRef(null);
  const scrambleIntervalRef = useRef(null);
  const decryptIntervalRef = useRef(null);

  // Simulated Encrypted & Decrypted Packets
  const packets = [
    {
      id: 'pkt-01',
      source: 'SAT-NET-A9',
      channel: 'UHF_CH_091',
      encryptedText: 'ZjkzMGJkY2MxN2FhZTlhZjhjMjE4ZjY5OGE3Y2E3MmVlMGZhOGU5ZWY2YmQ2ZTgx',
      decryptedTitle: 'SECURE_SAT_LINK_ESTABLISHED',
      decryptedPayload: 'Established secure tunnel to primary para operations database via GSAT-7A [RUKMINI]. Port handshake: OK. Dynamic frequency hopping enabled (824.5 MHz). Integrity checksum verified (SHA-256). All systems operational.',
      severity: 'LOW // SECURED'
    },
    {
      id: 'pkt-02',
      source: 'COMMAND-HQ',
      channel: 'MIL_FREQ_82',
      encryptedText: 'M2M3ZjczODFjNzNmODY0ZjM3NGE4ZTJiZGI3OGYxNDZiM2I0YTVzZGY4YTkxMmRhZA==',
      decryptedTitle: 'BACKEND_TELEMETRY_DUMP',
      decryptedPayload: 'Decrypted backend systems telemetry. Core microservices responding within normal bounds: API response latency averages 4.2ms. Go-based cluster orchestrators running at 98.4% capacity. Kubernetes replication pool active with zero alerts.',
      severity: 'ELEVATED // VERIFIED'
    },
    {
      id: 'pkt-03',
      source: 'DRONE-RECON',
      channel: 'VHF_UPLINK',
      encryptedText: 'OTU1MmFmOTIwOTFiYTkyZjI0M2RuMjM5MDQ5MGVmMzU2MmZmOGRhODlhZmNmMTc4',
      decryptedTitle: 'TACTICAL_TARGET_LOCKED',
      decryptedPayload: 'UAV Reconnaissance feeds verified. Crosshair target tracking coordinates locked on grid point 43Q-ND (Lat: 30.3165° N, Long: 78.0322° E, Alt: 2,230 M ASL). Radar sweeps confirm target path vector aligned at Speed 14 KM/H.',
      severity: 'CRITICAL // LOCK'
    }
  ];

  // 1. Telemetry and scramble update loops
  useEffect(() => {
    // Coordinate fluctuations
    coordIntervalRef.current = setInterval(() => {
      const minutesLat = Math.floor(Math.random() * 60).toString().padStart(2, '0');
      const secondsLat = Math.floor(Math.random() * 60).toString().padStart(2, '0');
      const minutesLong = Math.floor(Math.random() * 60).toString().padStart(2, '0');
      const secondsLong = Math.floor(Math.random() * 60).toString().padStart(2, '0');
      setSatCoords({
        lat: `30°${minutesLat}'${secondsLat}" N`,
        long: `78°${minutesLong}'${secondsLong}" E`,
        alt: `${(36780 + Math.random() * 12).toFixed(1)} KM`
      });
    }, 1500);

    // Dynamic scramble text simulation
    scrambleIntervalRef.current = setInterval(() => {
      if (!isDecrypting && !isDecrypted) {
        const hex = '0123456789ABCDEF!@#$%&*?';
        let key = '';
        for (let i = 0; i < 18; i++) {
          key += hex[Math.floor(Math.random() * hex.length)];
        }
        setScrambleKey(key);
      }
    }, 200);

    return () => {
      clearInterval(coordIntervalRef.current);
      clearInterval(scrambleIntervalRef.current);
      clearInterval(decryptIntervalRef.current);
    };
  }, [isDecrypting, isDecrypted]);

  const handleStartDecryption = () => {
    if (isDecrypting || isDecrypted) return;
    
    setIsDecrypting(true);
    setDecryptProgress(0);
    AudioEngine.playSweep(3.0); // Sweep audio cue

    let progress = 0;
    decryptIntervalRef.current = setInterval(() => {
      progress += 2;
      setDecryptProgress(progress);
      
      // Multi-tonal clicks as scanning progresses
      if (progress % 10 === 0) {
        AudioEngine.playTick();
      }

      if (progress >= 100) {
        clearInterval(decryptIntervalRef.current);
        setIsDecrypting(false);
        setIsDecrypted(true);
        setActiveLogId('pkt-01'); // Select first packet by default
        AudioEngine.playAlarm(); // Verification sound
      }
    }, 60);
  };

  const handleSelectPacket = (id) => {
    setActiveLogId(id);
    AudioEngine.playClick();
  };

  const handleInteractiveHover = () => {
    AudioEngine.playHover();
  };

  const activePacket = packets.find(p => p.id === activeLogId);

  return (
    <div className="space-y-4 flex-1 flex flex-col justify-between">
      {/* HUD Header */}
      <div className="flex justify-between items-center border-b border-hud-dim/20 pb-2.5">
        <h3 className="text-xs font-bold font-display tracking-widest text-hud-primary uppercase flex items-center space-x-1.5">
          <Radio className="w-3.5 h-3.5 blink-tactical" />
          <span>SAT-LINK INTERCEPT PROTOCOL</span>
        </h3>
        <span className="text-[9px] text-hud-primary/50 font-bold">SEC_LEVEL_5_DECODE</span>
      </div>

      {/* Main interactive area split into top console grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 flex-1 items-stretch min-h-0">
        
        {/* Left Side: Decryption Controls & Real-time Feeds */}
        <div className="md:col-span-5 flex flex-col justify-between border border-hud-dim/15 bg-black/30 p-3 rounded-sm relative">
          {/* Subtle panel bracket ticks */}
          <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-hud-primary/30" />
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-hud-primary/30" />

          <div className="space-y-3">
            <div className="text-[9px] text-hud-primary/45 tracking-wider font-bold block uppercase border-b border-hud-dim/10 pb-1">
              SATELLITE POSITION UPLINK
            </div>
            
            {/* Coordinates widget */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
              <div className="border border-hud-dim/10 bg-black/50 p-2 rounded-sm">
                <span className="text-[8px] text-hud-primary/40 block">SAT GEOPOSITION</span>
                <span className="text-neutral-200 font-bold block truncate">{satCoords.lat}</span>
                <span className="text-neutral-200 font-bold block truncate">{satCoords.long}</span>
              </div>
              <div className="border border-hud-dim/10 bg-black/50 p-2 rounded-sm">
                <span className="text-[8px] text-hud-primary/40 block">APOGEE ALTITUDE</span>
                <span className="text-neutral-200 font-bold block">{satCoords.alt}</span>
                <span className="text-[8px] text-hud-primary/40 block mt-1">LINK: 824.5 MHz</span>
              </div>
            </div>

            {/* Cryptographic stream indicator */}
            <div className="border border-hud-dim/15 bg-black/55 p-3 rounded-sm space-y-2">
              <div className="flex justify-between items-center text-[9px] font-bold">
                <span className="text-hud-primary flex items-center space-x-1">
                  <Lock className="w-3 h-3" />
                  <span>CIPHER: AES-GCM-256</span>
                </span>
                <span className="text-hud-primary/50">SEC_LEVEL_5</span>
              </div>
              
              <div className="font-mono text-[9px] tracking-wider text-center text-hud-primary/60 border border-dashed border-hud-dim/20 py-2 rounded bg-hud-bg/80 min-h-[38px] flex items-center justify-center">
                {!isDecrypting && !isDecrypted ? (
                  <span className="animate-pulse">{scrambleKey}</span>
                ) : isDecrypting ? (
                  <span className="tracking-widest">
                    {Array.from({ length: 14 }).map(() => "0123456789ABCDEF"[Math.floor(Math.random() * 16)]).join("")}
                  </span>
                ) : (
                  <span className="text-glow text-[#a8e6a3] font-bold flex items-center space-x-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>SYMMETRIC KEY UNLOCKED</span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Interactive Decrypt Action */}
          <div className="mt-4 pt-3 border-t border-hud-dim/10">
            {!isDecrypted && !isDecrypting ? (
              <button
                onClick={handleStartDecryption}
                onMouseEnter={handleInteractiveHover}
                className="w-full py-2.5 bg-hud-primary/10 hover:bg-hud-primary/20 border border-hud-primary/40 text-neutral-200 hover:text-hud-primary text-[10px] font-bold tracking-[0.2em] transition-all cursor-pointer flex items-center justify-center space-x-2 rounded-sm shadow-hud-glow"
              >
                <KeyRound className="w-4 h-4 animate-[spin_4s_linear_infinite]" />
                <span>[ DECRYPT SAT-LINK STREAM ]</span>
              </button>
            ) : isDecrypting ? (
              <div className="space-y-2">
                <div className="flex justify-between items-center text-[9px] font-bold text-hud-primary select-none">
                  <span>RUNNING DYNAMIC DECRYPTION MATRIX...</span>
                  <span>{decryptProgress}%</span>
                </div>
                <div className="h-2 w-full bg-black/60 border border-hud-dim/35 p-[1px] rounded-sm overflow-hidden">
                  <div 
                    className="h-full bg-hud-primary rounded-sm shadow-[0_0_8px_var(--hud-primary)] transition-all duration-100" 
                    style={{ width: `${decryptProgress}%` }} 
                  />
                </div>
              </div>
            ) : (
              <div className="border border-hud-primary/25 bg-hud-primary/5 p-2 rounded-sm text-[9px] text-hud-primary font-bold text-center flex items-center justify-center space-x-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>UPLINK DECRYPTION INTERCEPT TERMINATED // OK</span>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Intercepted Packets Grid & Log Viewer */}
        <div className="md:col-span-7 flex flex-col justify-between border border-hud-dim/15 bg-black/30 p-3 rounded-sm relative">
          <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-hud-primary/30" />
          <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-hud-primary/30" />

          {/* Packet Selector Tab List */}
          <div className="space-y-2.5 flex-1 min-h-0 overflow-y-auto max-h-[175px] pr-1">
            <div className="text-[9px] text-hud-primary/45 tracking-wider font-bold block uppercase border-b border-hud-dim/10 pb-1">
              INTERCEPTED COMMUNICATION PACKETS
            </div>

            <div className="space-y-2">
              {packets.map((pkt) => (
                <div
                  key={pkt.id}
                  onMouseEnter={handleInteractiveHover}
                  onClick={() => isDecrypted && handleSelectPacket(pkt.id)}
                  className={`border p-2.5 rounded-sm flex flex-col sm:flex-row justify-between sm:items-center gap-2 cursor-pointer transition-all ${
                    !isDecrypted 
                      ? 'border-hud-dim/10 opacity-45 cursor-not-allowed bg-black/15'
                      : activeLogId === pkt.id
                        ? 'border-hud-primary bg-hud-primary/10 shadow-hud-glow'
                        : 'border-hud-dim/20 bg-black/35 hover:border-hud-dim/40'
                  }`}
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    <div className={`w-1.5 h-1.5 rounded-full ${isDecrypted && activeLogId === pkt.id ? 'bg-hud-primary blink-tactical' : 'bg-hud-primary/40'}`} />
                    <div className="font-mono text-[10px] font-bold text-neutral-200 truncate">
                      {isDecrypted ? pkt.decryptedTitle : `ENCR_PKG_${pkt.id.toUpperCase()}`}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 text-[8px] font-mono font-bold shrink-0">
                    <span className="text-hud-primary/50 uppercase">{pkt.source}</span>
                    <span className="border border-hud-dim/20 px-1 py-0.5 rounded bg-black/40 text-hud-primary/80">
                      {isDecrypted ? pkt.severity : 'ENCRYPTED'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Packet Log Viewer */}
          <div className="mt-4 pt-3.5 border-t border-hud-dim/15 min-h-[95px] flex flex-col justify-between">
            <AnimatePresence mode="wait">
              {!isDecrypted ? (
                <motion.div
                  key="locked"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center text-center text-hud-primary/40 py-4 select-none space-y-1.5 flex-1"
                >
                  <ShieldAlert className="w-7 h-7" />
                  <span className="text-[9px] font-bold tracking-widest uppercase">
                    INTERCEPT LOG LOCK ACTIVE. ESTABLISH DECRYPTION HANDSHAKE.
                  </span>
                </motion.div>
              ) : activePacket ? (
                <motion.div
                  key={activePacket.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="space-y-1.5 flex-1 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-center text-[8px] text-hud-primary/55 font-bold uppercase border-b border-dashed border-hud-dim/15 pb-1 mb-1">
                      <span>ORIGIN: {activePacket.source} // ROUTE: {activePacket.channel}</span>
                      <span className="text-glow text-hud-highlight">LOCK VALIDATED</span>
                    </div>
                    <p className="text-[10px] text-neutral-300 leading-normal font-mono text-left font-semibold">
                      {activePacket.decryptedPayload}
                    </p>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>

      </div>

      {/* Grid footer metrics */}
      <div className="border-t border-hud-dim/15 pt-2 flex justify-between items-center text-[9px] text-hud-primary/45 font-mono select-none">
        <span>INTERCEPT STATS: UHF CORE ACTIVE</span>
        <span>CHANNEL DECRYPTION KEY: AES-GCM-256</span>
        <span>SYS LOG STREAM READY</span>
      </div>
    </div>
  );
}
