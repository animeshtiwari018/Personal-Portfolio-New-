"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Shield, Cpu, Lock, TerminalSquare } from 'lucide-react';
import { AudioEngine } from './AudioEngine';

export default function CovertShell({ onThemeChange, currentTheme }) {
  const [history, setHistory] = useState([
    { type: 'sys', text: 'COVERT HUD SECURE TERMINAL [Version 6.1.0]' },
    { type: 'sys', text: 'ESTABLISHING HANDSHAKE LINK... OK' },
    { type: 'sys', text: 'Type "help" or "?" to list active commands.' },
    { type: 'empty', text: '' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [decryptProgress, setDecryptProgress] = useState(0);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const decryptIntervalRef = useRef(null);

  // Auto-scroll to the bottom of the shell whenever history changes or decryption progresses
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isDecrypting, decryptProgress]);

  // Focus input on terminal click
  const handleTerminalClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Sound triggers on typing
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    AudioEngine.playTick();
  };

  // Perform decryption matrix scan simulation
  const startDecryption = () => {
    setIsDecrypting(true);
    setDecryptProgress(0);
    AudioEngine.playSweep(2.5);

    let progress = 0;
    decryptIntervalRef.current = setInterval(() => {
      progress += 4;
      setDecryptProgress(progress);
      if (progress % 12 === 0) {
        AudioEngine.playTick();
      }
      if (progress >= 100) {
        clearInterval(decryptIntervalRef.current);
        setIsDecrypting(false);
        AudioEngine.playAlarm(); // Security clearance sound
        setHistory(prev => [
          ...prev,
          { type: 'sys', text: '>> DECRYPT PROTOCOL COMPLETE' },
          { type: 'success', text: '>> STATUS: AES-256 SECTORS DECRYPTED - VERIFIED' },
          { type: 'success', text: '>> PAYLOAD: CLEARANCE_LEVEL_V GRANTED' },
          { type: 'empty', text: '' }
        ]);
      }
    }, 100);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      const trimmed = inputValue.trim();
      if (!trimmed) return;

      // Add to command history
      const newCmdHistory = [...commandHistory, trimmed];
      setCommandHistory(newCmdHistory);
      setHistoryIndex(newCmdHistory.length);

      // Execute command
      executeCommand(trimmed);
      setInputValue('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = Math.max(0, historyIndex - 1);
        setHistoryIndex(nextIdx);
        setInputValue(commandHistory[nextIdx]);
        AudioEngine.playHover();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInputValue(commandHistory[nextIdx]);
        } else {
          setHistoryIndex(commandHistory.length);
          setInputValue('');
        }
        AudioEngine.playHover();
      }
    }
  };

  const executeCommand = (cmdStr) => {
    AudioEngine.playClick();
    const parts = cmdStr.split(' ');
    const command = parts[0].toLowerCase();
    const arg = parts.slice(1).join(' ').toLowerCase();

    // Log the typed command
    const typedLog = { type: 'input', text: `guest@covert-hud:~$ ${cmdStr}` };

    let outputs = [];

    switch (command) {
      case 'help':
      case '?':
        outputs = [
          { type: 'info', text: 'AVAILABLE COVERT COMMANDS:' },
          { type: 'info', text: '  help, ?      - Display this command console guide' },
          { type: 'info', text: '  dossier      - View personnel profile files of Operator' },
          { type: 'info', text: '  ops          - List active global operational missions' },
          { type: 'info', text: '  sysinfo      - Fetch real-time hardware & satellite status' },
          { type: 'info', text: '  theme <name> - Change spectral HUD theme (emerald, amber, cyber, crimson)' },
          { type: 'info', text: '  neofetch     - Show visual operational neofetch specs' },
          { type: 'info', text: '  decrypt      - Run AES-256 decryption scanning protocol' },
          { type: 'info', text: '  satlink      - Fetch satellite uplink logs and decrypted signals' },
          { type: 'info', text: '  threats      - View active intrusion vectors risk status' },
          { type: 'info', text: '  defend       - Execute network containment countermeasures' },
          { type: 'info', text: '  clear        - Flush shell log outputs' }
        ];
        break;

      case 'dossier':
        outputs = [
          { type: 'info', text: 'ACCESSING PERSONNEL DOSSIER: OPERATOR A. TIWARI' },
          { type: 'text', text: '--------------------------------------------------' },
          { type: 'text', text: 'NAME:           ANIMESH TIWARI' },
          { type: 'text', text: 'DESIGNATION:    SYSTEMS INFRASTRUCTURE ARCHITECT / DEV' },
          { type: 'text', text: 'CALLSIGN:       GHOST_LEADER' },
          { type: 'text', text: 'UNIT:           PARA SF // DEPT UNIT VII' },
          { type: 'text', text: 'CLEARANCE:      LEVEL V APPROVED (AES-GCM CODE)' },
          { type: 'text', text: 'FOCUS:          ROBUST SCALABLE BACKENDS, MILITARY-GRADE FRONTENDS' },
          { type: 'text', text: 'STATUS:         DEPLOYABLE FOR ADVANCED MISSIONS' }
        ];
        break;

      case 'ops':
        outputs = [
          { type: 'info', text: 'ACTIVE OPERATIONS LOG:' },
          { type: 'text', text: '--------------------------------------------------' },
          { type: 'info', text: '1. OPERATION CLOUD SHRIKE' },
          { type: 'text', text: '   OBJ: High-throughput K8s microservices architecture' },
          { type: 'text', text: '   TECH: Go, Kubernetes, gRPC, AWS. STATUS: COMPLETED' },
          { type: 'info', text: '2. OPERATION NEURAL SHIELD' },
          { type: 'text', text: '   OBJ: AI-driven cyber threat detection' },
          { type: 'text', text: '   TECH: Python, TensorFlow, Kafka. STATUS: ACTIVE' },
          { type: 'info', text: '3. OPERATION GHOST PROTOCOL' },
          { type: 'text', text: '   OBJ: Double-ratchet WebRTC cover communication' },
          { type: 'text', text: '   TECH: TS, WebRTC, Rust. STATUS: ARCHIVED' }
        ];
        break;

      case 'sysinfo':
        outputs = [
          { type: 'info', text: 'SYSINFO RECON FEED:' },
          { type: 'text', text: '--------------------------------------------------' },
          { type: 'text', text: `HUD SPECTRAL MODE:  ${currentTheme.toUpperCase()}` },
          { type: 'text', text: 'CPU COMPILER CORES: 4 x ULTRA-VECTOR ENGINE' },
          { type: 'text', text: 'SATELLITE FREQ:     824.5 MHz (GSAT-7A RUKMINI UPLINK)' },
          { type: 'text', text: 'COVERT SHELL CORE:  HUDBEAM v6.1.0' },
          { type: 'text', text: 'DECRYPT ENGINE:     AES-GCM-256 HARDWARE-ACCELERATED' },
          { type: 'text', text: 'STATION GEOLOC:     30.3165° N, 78.0322° E' }
        ];
        break;

      case 'satlink':
        outputs = [
          { type: 'info', text: 'GSAT-7A [RUKMINI] SATELLITE UPLINK STATUS:' },
          { type: 'text', text: '--------------------------------------------------' },
          { type: 'success', text: '[UPLINK] ACTIVE FREQ: 824.5 MHz (BAND UHF_09)' },
          { type: 'success', text: '[CRYPTO] DECRYPTION KEY MATCH: AES-GCM-256 (LEVEL V)' },
          { type: 'info', text: 'SYS LOG #09A: SECURE TUNNEL ONLINE // DB CONNECTED' },
          { type: 'info', text: 'SYS LOG #09B: UAV DRONE TELEMETRY LOCKED ON GRID 43Q-ND' },
          { type: 'text', text: 'LAT: 30.3165° N / LONG: 78.0322° E / ALT: 2,230 M ASL' }
        ];
        break;

      case 'threats':
        outputs = [
          { type: 'info', text: 'ACTIVE INTRUSION VECTORS MATRIX:' },
          { type: 'text', text: '--------------------------------------------------' },
          { type: 'error', text: '[VEC_01] IP: 185.220.101.4 | PORT: 443  | ORIGIN: BEIJING, CN   | STATUS: CRITICAL' },
          { type: 'error', text: '[VEC_02] IP: 93.115.80.19  | PORT: 8080 | ORIGIN: ST. PETERSBURG| STATUS: ELEVATED' },
          { type: 'success', text: '[VEC_03] IP: 202.45.160.8  | PORT: 22   | ORIGIN: PROXY_NET_DE  | STATUS: LOW' }
        ];
        break;

      case 'defend':
        outputs = [
          { type: 'info', text: 'DEPLOYING SYSTEM INTEGRITY CONTAINMENT DEFENSES...' },
          { type: 'text', text: '--------------------------------------------------' },
          { type: 'success', text: '[CONTAINMENT] INITIALIZING SECURE PORTS ISOLATION... SUCCESS' },
          { type: 'success', text: '[COUNTERMEASURES] RESET SYSTEM THREAT TELEMETRY... COMPLETE' },
          { type: 'success', text: '>> ALL HOSTILE VECTOR ATTACKS DEPLOYED CONTAINMENT: SECURED' }
        ];
        break;

      case 'theme':
        if (['emerald', 'amber', 'cyber', 'crimson'].includes(arg)) {
          onThemeChange(arg);
          outputs = [
            { type: 'success', text: `>> THEME SPECTRUM SWITCHED TO: ${arg.toUpperCase()}` }
          ];
        } else {
          outputs = [
            { type: 'error', text: 'INVALID SPECTRAL MODE. Choose from: emerald, amber, cyber, crimson' },
            { type: 'info', text: 'Example: theme amber' }
          ];
        }
        break;

      case 'neofetch':
        outputs = [
          { type: 'raw', text: '      .' },
          { type: 'raw', text: '    .:|:.' },
          { type: 'raw', text: '  .:  |  :.' },
          { type: 'raw', text: '._____|_____.' },
          { type: 'raw', text: '  \':  |  :\'' },
          { type: 'raw', text: '    \':|:\'' },
          { type: 'raw', text: '      \'' },
          { type: 'text', text: '-------------------------------' },
          { type: 'text', text: 'OPERATOR:       A. TIWARI' },
          { type: 'text', text: 'DEPT:           PARA SPECIAL FORCES' },
          { type: 'text', text: 'CLEARANCE:      LEVEL V APPROVED' },
          { type: 'text', text: 'SHELL:          COVERT COMMAND SUITE' },
          { type: 'text', text: 'HUD THEME:      ' + currentTheme },
          { type: 'text', text: 'AES CODEC:      SECURE_ONLINE' },
          { type: 'text', text: 'LOCATION:       30.3165 N / 78.0322 E' },
          { type: 'text', text: '-------------------------------' }
        ];
        break;

      case 'decrypt':
        startDecryption();
        setHistory(prev => [...prev, typedLog]);
        return; // handle matrix separately

      case 'clear':
        setHistory([]);
        return;

      default:
        outputs = [
          { type: 'error', text: `ERROR: COMMAND "${command}" NOT RECOGNIZED` },
          { type: 'info', text: 'Type "help" or "?" to view available covert operations.' }
        ];
        break;
    }

    setHistory(prev => [...prev, typedLog, ...outputs, { type: 'empty', text: '' }]);
  };

  return (
    <div 
      className="flex-1 flex flex-col justify-between h-full min-h-[350px] relative font-mono text-[11px] select-text"
      onClick={handleTerminalClick}
    >
      {/* Shell header bar */}
      <div className="flex justify-between items-center border-b border-hud-dim/20 pb-2 mb-2 select-none">
        <div className="flex items-center space-x-1.5 text-hud-primary">
          <TerminalSquare className="w-3.5 h-3.5" />
          <span className="font-bold tracking-widest uppercase">TACTICAL COMMAND LINE INTERFACE</span>
        </div>
        <div className="flex items-center space-x-1 text-[8px] bg-hud-primary/10 border border-hud-dim/25 text-hud-primary px-1.5 py-0.5 rounded font-mono font-bold tracking-wider">
          <Lock className="w-2.5 h-2.5 mr-0.5" />
          SECURE_SESSION
        </div>
      </div>

      {/* Main Terminal Output Logs Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto pr-1 space-y-1 mb-3 scrollbar-hud bg-black/40 border border-hud-dim/10 rounded-sm p-3 max-h-[290px] xl:max-h-[330px]"
      >
        {isDecrypting ? (
          <div className="h-full flex flex-col justify-center items-center py-6 text-hud-primary select-none space-y-4">
            <div className="text-center font-bold tracking-widest text-[13px] animate-pulse">
              🛡️ AES-256 DECRYPT SEQUENCE IN PROGRESS...
            </div>
            
            {/* Decrypting Progress Scrambler */}
            <div className="font-mono text-[9px] w-full max-w-[240px] text-center text-hud-primary/60 border border-dashed border-hud-dim/20 py-2 rounded-sm bg-[#020603]/80">
              {Array.from({ length: 4 }).map((_, rIdx) => {
                const chars = "ABCDEF0123456789X$/@#";
                let str = "";
                for (let i = 0; i < 28; i++) {
                  str += chars[Math.floor(Math.random() * chars.length)];
                }
                return <div key={rIdx} className="truncate tracking-widest">{str}</div>;
              })}
            </div>

            {/* Visual Bar */}
            <div className="w-full max-w-[240px] h-2 bg-black/60 border border-hud-dim/35 rounded-sm p-[1px] overflow-hidden">
              <div 
                className="h-full bg-hud-primary shadow-hud-glow rounded-sm transition-all duration-100"
                style={{ width: `${decryptProgress}%` }}
              />
            </div>
            <div className="text-[10px] tracking-wider font-bold">
              {decryptProgress}% COMPLETING HANDSHAKE...
            </div>
          </div>
        ) : (
          history.map((log, idx) => {
            if (log.type === 'empty') {
              return <div key={idx} className="h-1" />;
            }
            if (log.type === 'input') {
              return (
                <div key={idx} className="text-neutral-200 font-bold">
                  {log.text}
                </div>
              );
            }
            if (log.type === 'info') {
              return (
                <div key={idx} className="text-hud-primary font-bold">
                  {log.text}
                </div>
              );
            }
            if (log.type === 'success') {
              return (
                <div key={idx} className="text-[#a8e6a3] font-bold">
                  {log.text}
                </div>
              );
            }
            if (log.type === 'error') {
              return (
                <div key={idx} className="text-[#ef4444] font-bold">
                  {log.text}
                </div>
              );
            }
            if (log.type === 'sys') {
              return (
                <div key={idx} className="text-hud-primary/60 italic font-mono">
                  {log.text}
                </div>
              );
            }
            if (log.type === 'raw') {
              return (
                <pre key={idx} className="text-hud-primary/90 font-bold leading-tight font-mono select-none">
                  {log.text}
                </pre>
              );
            }
            return (
              <div key={idx} className="text-neutral-300">
                {log.text}
              </div>
            );
          })
        )}
      </div>

      {/* Input Prompt Panel */}
      {!isDecrypting && (
        <div className="flex items-center space-x-1.5 border border-hud-dim/30 bg-black/60 p-2 rounded-sm select-none">
          <span className="text-hud-primary font-bold">guest@covert-hud:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            disabled={isDecrypting}
            placeholder="Type 'help' for tactical instructions..."
            className="flex-1 bg-transparent text-neutral-200 focus:outline-none border-none p-0 outline-none text-[11px] font-mono leading-none caret-hud-primary"
            autoFocus
          />
        </div>
      )}
    </div>
  );
}
