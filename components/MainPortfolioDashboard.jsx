"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Activity, 
  Terminal, 
  Cpu, 
  Globe, 
  Send, 
  Lock, 
  Compass, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  Settings, 
  Radio, 
  Eye, 
  AlertTriangle 
} from 'lucide-react';

import { AudioEngine } from './AudioEngine';
import TacticalRadarMap from './TacticalRadarMap';
import InteractiveDiagnostics from './InteractiveDiagnostics';
import CovertShell from './CovertShell';
import SatelliteIntercept from './SatelliteIntercept';

export default function MainPortfolioDashboard() {
  const [activeTab, setActiveTab] = useState('dossier');
  const [currentTime, setCurrentTime] = useState('');
  const [commsForm, setCommsForm] = useState({ name: '', email: '', message: '' });
  const [transmitting, setTransmitting] = useState(false);
  const [transmitStatus, setTransmitStatus] = useState('');
  const [transmitLogs, setTransmitLogs] = useState([]);
  
  // HUD Settings
  const [hudTheme, setHudTheme] = useState('emerald'); // emerald, amber, cyber, crimson
  const [isAudioMuted, setIsAudioMuted] = useState(true);
  const [enableCrt, setEnableCrt] = useState(true);
  const [enableScanlines, setEnableScanlines] = useState(true);
  const [selectedOpId, setSelectedOpId] = useState('op-01');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Set real-time clock (IST)
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { timeZone: 'Asia/Kolkata', hour12: false };
      const timeStr = now.toLocaleTimeString('en-IN', { ...options, hour: '2-digit', minute: '2-digit', second: '2-digit' });
      setCurrentTime(timeStr + ' IST');
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Update theme settings on Document Root
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-emerald', 'theme-amber', 'theme-cyber', 'theme-crimson');
    root.classList.add(`theme-${hudTheme}`);
  }, [hudTheme]);

  // Handle keypresses in contact form to play typing ticks
  const handleKeyPress = () => {
    AudioEngine.playTick();
  };

  const handleTransmit = (e) => {
    e.preventDefault();
    if (!commsForm.name || !commsForm.email || !commsForm.message) return;
    
    setTransmitting(true);
    setTransmitStatus('ENCRYPTING PAYLOAD...');
    setTransmitLogs(['[INIT] STARTING TRANSMISSION PROTOCOL', '[STATUS] INITIALIZING CRYPTO STREAM']);
    AudioEngine.playSweep(1.5);

    setTimeout(() => {
      setTransmitStatus('ESTABLISHING CHANNEL...');
      setTransmitLogs(prev => [...prev, '[CRYPTO] AES-GCM-256 HANDSHAKE OK', '[NET] ESTABLISHING COVERT SAT-LINK']);
      AudioEngine.playClick();
      
      setTimeout(() => {
        setTransmitStatus('TRANSMITTING SIGNAL...');
        setTransmitLogs(prev => [...prev, '[NET] SATELLITE BEAM LOCKED', '[COMM] TRANSMITTING ENCRYPTED PACKETS']);
        AudioEngine.playSweep(0.8);
        
        setTimeout(() => {
          setTransmitting(false);
          setTransmitStatus('TRANSMISSION SUCCESSFUL');
          setTransmitLogs(prev => [...prev, '[COMM] TRANSMISSION COMPLETE // STATUS: OK', '[SYS] DISCONNECTING PORT']);
          AudioEngine.playClick();
          setCommsForm({ name: '', email: '', message: '' });
          
          setTimeout(() => {
            setTransmitStatus('');
            setTransmitLogs([]);
          }, 6000);
        }, 1200);
      }, 1000);
    }, 800);
  };

  // Sound Engine wrappers
  const toggleMute = () => {
    const nextState = !isMutedState();
    setIsAudioMuted(nextState);
    AudioEngine.setMuted(nextState);
    if (!nextState) {
      AudioEngine.playClick();
    }
  };

  const isMutedState = () => {
    return isAudioMuted;
  };

  const handleThemeChange = (newTheme) => {
    setHudTheme(newTheme);
    if (newTheme === 'crimson') {
      AudioEngine.playAlarm();
    } else {
      AudioEngine.playClick();
    }
  };

  const handleInteractiveHover = () => {
    AudioEngine.playHover();
  };

  const handleInteractiveClick = () => {
    AudioEngine.playClick();
  };

  const handleSelectOp = (id) => {
    setSelectedOpId(id);
    setActiveTab('operations');
  };

  // Operational records (Projects)
  const operations = [
    {
      id: 'op-01',
      codename: 'OPERATION CLOUD SHRIKE',
      objective: 'High-throughput microservices backend',
      details: 'Designed and deployed a highly resilient cluster handling 25k+ requests/sec with auto-scaling orchestrators, zero-downtime replication, and low-latency API brokers.',
      tech: ['Go', 'Kubernetes', 'gRPC', 'AWS'],
      status: 'COMPLETED // ARCHIVED',
      threat: 'ELEVATED // ALPHA'
    },
    {
      id: 'op-02',
      codename: 'OPERATION NEURAL SHIELD',
      objective: 'Real-time threat detection system',
      details: 'Built an AI-driven security monitor using deep learning convolutional models to intercept intrusion patterns and isolate hostile vectors in sub-5ms.',
      tech: ['Python', 'TensorFlow', 'Apache Kafka', 'Docker'],
      status: 'ACTIVE // MONITORING',
      threat: 'CRITICAL // OMEGA'
    },
    {
      id: 'op-03',
      codename: 'OPERATION GHOST PROTOCOL',
      objective: 'Decentralized encrypted messaging network',
      details: 'Engineered a secure double-ratchet chat system using WebRTC and custom cryptography blocks for zero-knowledge privacy and verified biometric link handshake.',
      tech: ['TypeScript', 'React Native', 'WebRTC', 'Rust'],
      status: 'COMPLETED // SECURED',
      threat: 'LOW // EPSILON'
    }
  ];

  return (
    <div className={`min-h-screen bg-hud-bg text-neutral-200 font-mono relative overflow-hidden select-none flex flex-col p-3 md:p-6 transition-hud ${enableCrt ? 'crt-flicker' : ''} ${enableScanlines ? 'scanlines' : ''} screen-glow`}>
      {/* Background low-opacity tactical grid */}
      <div className="absolute inset-0 tactical-grid-bg opacity-[0.15] pointer-events-none z-0" />

      {/* Header Panel */}
      <header className="border border-hud-dim glass-panel p-4 mb-4 z-10 flex flex-col xl:flex-row justify-between items-start xl:items-center relative rounded-sm shadow-hud-glow transition-hud">
        {/* Operator Badge Info */}
        <div className="flex items-center space-x-3 w-full xl:w-auto">
          <div 
            onMouseEnter={handleInteractiveHover}
            onClick={toggleMute}
            className="w-10 h-10 border border-hud-dim flex items-center justify-center bg-hud-primary/5 relative cursor-pointer group transition-hud hover:border-hud-primary"
          >
            <Shield className="w-5 h-5 text-hud-primary transition-all group-hover:scale-110" />
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-hud-primary" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-hud-primary" />
          </div>
          <div>
            <h1 className="text-xs md:text-sm font-bold font-display tracking-[0.2em] text-neutral-100 flex items-center space-x-2">
              <span>OPERATOR: A. TIWARI</span>
              <span className="text-[9px] bg-hud-primary/15 border border-hud-dim text-hud-primary px-1.5 py-0.5 rounded font-mono font-bold tracking-widest transition-hud">
                PARA SF // UNIT VII
              </span>
            </h1>
            <p className="text-[9px] text-hud-primary/50 uppercase tracking-widest mt-0.5 font-bold transition-hud">
              SYS STATUS: SECURE TELEMETRY LINK ACTIVE
            </p>
          </div>
        </div>

        {/* System parameters / Clock / Audio Controls */}
        <div className="flex flex-wrap xl:flex-nowrap gap-4 xl:gap-6 items-center mt-3 xl:mt-0 text-[10px] text-hud-primary/75 border-t xl:border-t-0 border-hud-dim/15 pt-3 xl:pt-0 w-full xl:w-auto transition-hud">
          <div className="flex items-center space-x-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span className="font-mono">LOC: 30.3165°N, 78.0322°E</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Activity className="w-3.5 h-3.5 text-hud-primary blink-tactical" />
            <span>FREQ: 824.5 MHz</span>
          </div>
          
          {/* Audio Switcher */}
          <button 
            onClick={toggleMute}
            onMouseEnter={handleInteractiveHover}
            className={`flex items-center space-x-1.5 border px-2 py-0.5 rounded-sm cursor-pointer transition-all ${!isAudioMuted ? 'border-hud-primary bg-hud-primary/10 text-hud-primary font-bold shadow-hud-glow' : 'border-hud-dim/30 text-hud-primary/50 hover:border-hud-dim'}`}
          >
            {!isAudioMuted ? <Volume2 className="w-3 h-3 animate-pulse" /> : <VolumeX className="w-3 h-3" />}
            <span className="text-[9px] tracking-widest">{!isAudioMuted ? 'AUDIO_ON' : 'AUDIO_MUTED'}</span>
          </button>

          {/* Clock Display */}
          <div className="flex items-center space-x-1.5 border border-hud-primary/20 px-2 py-0.5 bg-black/50 text-hud-primary font-bold shadow-hud-glow transition-hud">
            <span>TIME:</span>
            <span>{currentTime || '00:00:00 IST'}</span>
          </div>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 z-10 min-h-0">
        
        {/* Navigation Sidebar & HUD Customizer */}
        <nav className="lg:col-span-3 flex flex-col gap-4">
          
          {/* Menu Panel */}
          <div className="border border-hud-dim glass-panel p-4 rounded-sm shadow-hud-glow transition-hud">
            <div className="text-[9px] text-hud-primary/45 tracking-widest font-bold uppercase mb-3 pb-2 border-b border-hud-dim/15 flex justify-between transition-hud">
              <span>OPERATIONAL MENU</span>
              <span>REF//MIL_CORE</span>
            </div>
            
            {/* Desktop Tabs list */}
            <div className="space-y-2">
              {[
                { id: 'dossier', label: 'PERSONNEL_DOSSIER', ref: '01' },
                { id: 'operations', label: 'ACTIVE_OPERATIONS', ref: '02' },
                { id: 'capabilities', label: 'TACTICAL_CAPS', ref: '03' },
                { id: 'sat_intercept', label: 'SAT_INTERCEPT', ref: '04' },
                { id: 'comms', label: 'SECURE_COMMS', ref: '05' },
                { id: 'covert_shell', label: 'COVERT_SHELL', ref: '06' }
              ].map(tab => (
                <button 
                  key={tab.id}
                  onMouseEnter={handleInteractiveHover}
                  onClick={() => { setActiveTab(tab.id); handleInteractiveClick(); }}
                  className={`w-full text-left py-2 px-3 border transition-all text-[11px] font-bold tracking-widest flex items-center justify-between cursor-pointer rounded-sm ${
                    activeTab === tab.id 
                      ? 'bg-hud-primary/10 border-hud-primary text-hud-primary shadow-hud-glow' 
                      : 'border-transparent text-neutral-400 hover:border-hud-dim/40 hover:text-neutral-200'
                  }`}
                >
                  <span>[{tab.ref}_{tab.label}]</span>
                  <span className={`text-[8px] transition-opacity ${activeTab === tab.id ? 'opacity-100 font-extrabold' : 'opacity-40'}`}>
                    LOG//{tab.ref}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* System Control Deck (Themes, Filter Toggles) */}
          <div className="border border-hud-dim glass-panel p-4 rounded-sm shadow-hud-glow transition-hud">
            <div className="text-[9px] text-hud-primary/45 tracking-widest font-bold uppercase mb-3 pb-2 border-b border-hud-dim/15 flex items-center space-x-1.5 transition-hud">
              <Settings className="w-3.5 h-3.5" />
              <span>HUD CONTROL DECK</span>
            </div>

            {/* Color Mode Switcher */}
            <div className="space-y-2 mb-4">
              <span className="text-[8px] text-hud-primary/40 tracking-wider font-bold block uppercase transition-hud">Select Spectral Theme</span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { id: 'emerald', label: 'EMERALD' },
                  { id: 'amber', label: 'AMBER' },
                  { id: 'cyber', label: 'CYBER' },
                  { id: 'crimson', label: 'CRIMSON' }
                ].map(themeItem => (
                  <button
                    key={themeItem.id}
                    onMouseEnter={handleInteractiveHover}
                    onClick={() => handleThemeChange(themeItem.id)}
                    className={`text-[9px] font-bold py-1 px-1.5 border text-center transition-all cursor-pointer rounded-sm ${
                      hudTheme === themeItem.id
                        ? 'bg-hud-primary/15 border-hud-primary text-hud-primary font-bold shadow-hud-glow'
                        : 'border-hud-dim/20 text-neutral-400 hover:border-hud-dim/40 hover:text-neutral-200'
                    }`}
                  >
                    {themeItem.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Filter toggles */}
            <div className="space-y-2">
              <span className="text-[8px] text-hud-primary/40 tracking-wider font-bold block uppercase transition-hud">Display Filters</span>
              <div className="flex flex-col gap-2">
                {/* CRT Toggle */}
                <label 
                  onMouseEnter={handleInteractiveHover}
                  className="flex items-center justify-between text-[10px] text-neutral-300 cursor-pointer select-none"
                >
                  <span className="tracking-widest">CRT MONITOR FILTER</span>
                  <input 
                    type="checkbox" 
                    checked={enableCrt} 
                    onChange={(e) => { setEnableCrt(e.target.checked); handleInteractiveClick(); }}
                    className="accent-hud-primary cursor-pointer w-3.5 h-3.5" 
                  />
                </label>

                {/* Scanline Toggle */}
                <label 
                  onMouseEnter={handleInteractiveHover}
                  className="flex items-center justify-between text-[10px] text-neutral-300 cursor-pointer select-none"
                >
                  <span className="tracking-widest">HORIZONTAL SCANLINES</span>
                  <input 
                    type="checkbox" 
                    checked={enableScanlines} 
                    onChange={(e) => { setEnableScanlines(e.target.checked); handleInteractiveClick(); }}
                    className="accent-hud-primary cursor-pointer w-3.5 h-3.5" 
                  />
                </label>
              </div>
            </div>

            <div className="mt-4 border-t border-hud-dim/10 pt-3 text-[8px] text-hud-primary/35 space-y-0.5 transition-hud">
              <div>TRANSMISSION CORE: COVERT-HUD</div>
              <div className="flex items-center space-x-1 mt-1 text-hud-primary/60">
                <Lock className="w-2.5 h-2.5" />
                <span>AES-GCM LEVEL V SECURE</span>
              </div>
            </div>
          </div>
        </nav>

        {/* Content Console Panel */}
        <main className="lg:col-span-5 border border-hud-dim glass-panel p-5 rounded-sm shadow-hud-glow flex flex-col justify-between relative overflow-hidden transition-hud">
          {/* Subtle corner crosshairs inside main console */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-hud-primary/20" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-hud-primary/20" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-hud-primary/20" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-hud-primary/20" />

          <AnimatePresence mode="wait">
            {activeTab === 'dossier' && (
              <motion.div
                key="dossier"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5 flex-1"
              >
                <div className="flex justify-between items-center border-b border-hud-dim/20 pb-2.5 transition-hud">
                  <h3 className="text-xs font-bold font-display tracking-widest text-hud-primary uppercase">
                    CLASSIFIED FILE: PERSONNEL_DOSSIER.DAT
                  </h3>
                  <span className="text-[9px] text-hud-primary/50 font-bold transition-hud">SEC_LEVEL_5</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                  {/* Avatar Scanner Box */}
                  <div className="sm:col-span-1 flex flex-col items-center justify-center p-3 border border-hud-dim/15 bg-black/40 rounded-sm relative group cursor-pointer">
                    <div className="w-28 h-28 border border-hud-dim/35 relative flex items-center justify-center bg-hud-primary/5 p-2 overflow-hidden transition-hud group-hover:border-hud-primary">
                      {/* Scanner sweep line */}
                      <div className="absolute inset-x-0 h-[1.5px] bg-hud-primary shadow-[0_0_6px_var(--hud-primary)] animate-[dossier-sweep_3s_infinite_linear] pointer-events-none" />
                      
                      {/* Wireframe representation of SF Dagger */}
                      <svg className="w-16 h-16 text-hud-primary/55 relative z-10 transition-hud group-hover:scale-105" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M5 12h14M8 7l4-5 4 5M12 2l-6 6h12l-6-6" />
                      </svg>
                      
                      {/* Avatar borders */}
                      <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-hud-primary" />
                      <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-hud-primary" />
                      <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-hud-primary" />
                      <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-hud-primary" />
                    </div>
                    <span className="text-[8px] text-hud-primary/60 tracking-widest font-bold mt-2.5 transition-hud">BIOMETRIC IDENT</span>
                  </div>

                  {/* Right bio/info columns */}
                  <div className="sm:col-span-2 space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-[9px] text-hud-primary/45 font-bold uppercase block tracking-wider transition-hud">OPERATIONAL BACKGROUND</span>
                      <p className="text-[11px] text-neutral-300 leading-relaxed font-mono">
                        Full-Stack Engineer with deep operational expertise in building military-grade web applications and high-throughput backend infrastructure. Driven by extreme engineering discipline, precision coding standards, and tactical architecture designs.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 border-t border-hud-dim/10 pt-3 transition-hud">
                      <div>
                        <span className="text-[8px] text-hud-primary/40 font-bold block transition-hud">SPECIALIZATION</span>
                        <span className="text-[10px] font-bold text-neutral-200 tracking-wider">SYSTEMS ARCHITECT</span>
                      </div>
                      <div>
                        <span className="text-[8px] text-hud-primary/40 font-bold block transition-hud">STATUS CODE</span>
                        <span className="text-[10px] font-bold text-hud-primary blink-tactical font-mono tracking-widest transition-hud">DEPLOYABLE</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Operational parameters bar */}
                <div className="space-y-3.5 border-t border-hud-dim/10 pt-4 transition-hud">
                  <span className="text-[9px] text-hud-primary/45 font-bold uppercase block tracking-wider transition-hud">PERFORMANCE TELEMETRY RATIOS</span>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[9px] text-neutral-300 font-bold">
                      <span>SYSTEM INTEGRATION EFFICIENCY</span>
                      <span className="text-hud-primary text-glow">98.4%</span>
                    </div>
                    <div className="h-1.5 w-full bg-black/40 border border-hud-dim/10 rounded-sm overflow-hidden p-[1px] transition-hud">
                      <div className="h-full bg-hud-primary rounded-sm shadow-[0_0_4px_var(--hud-primary)] transition-hud" style={{ width: '98%' }} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[9px] text-neutral-300 font-bold">
                      <span>API CONCURRENCY COMPILATION</span>
                      <span className="text-hud-primary text-glow">92.1%</span>
                    </div>
                    <div className="h-1.5 w-full bg-black/40 border border-hud-dim/10 rounded-sm overflow-hidden p-[1px] transition-hud">
                      <div className="h-full bg-hud-primary rounded-sm shadow-[0_0_4px_var(--hud-primary)] transition-hud animate-pulse" style={{ width: '92%' }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Active Operations Log Tab */}
            {activeTab === 'operations' && (
              <motion.div
                key="operations"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 flex-1"
              >
                <div className="flex justify-between items-center border-b border-hud-dim/20 pb-2.5 transition-hud">
                  <h3 className="text-xs font-bold font-display tracking-widest text-hud-primary uppercase">
                    CLASSIFIED LOGS: MISSION_DATA.DAT
                  </h3>
                  <span className="text-[9px] text-hud-primary/50 font-bold transition-hud">SEC_LEVEL_4</span>
                </div>

                <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
                  {operations.map((op) => (
                    <div 
                      key={op.id} 
                      onMouseEnter={handleInteractiveHover}
                      onClick={() => handleSelectOp(op.id)}
                      className={`border p-3 rounded-sm cursor-pointer transition-all ${
                        selectedOpId === op.id 
                          ? 'border-hud-primary bg-hud-primary/10 shadow-hud-glow' 
                          : 'border-hud-dim/15 bg-black/35 hover:border-hud-dim/35'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1.5 mb-1.5">
                        <span className="text-[11px] font-bold tracking-widest text-hud-primary flex items-center space-x-2 transition-hud">
                          <span className={`w-1.5 h-1.5 rounded-full ${selectedOpId === op.id ? 'bg-hud-primary blink-tactical' : 'bg-hud-primary/50'}`} />
                          <span>{op.codename}</span>
                        </span>
                        <span className="text-[8px] font-mono text-hud-primary/80 font-bold bg-hud-primary/10 px-1 rounded-sm border border-hud-dim/15 transition-hud">
                          {op.status}
                        </span>
                      </div>
                      
                      <div className="text-[8px] text-hud-primary/50 font-bold mb-1 uppercase tracking-widest transition-hud">
                        THREAT LEVEL: {op.threat}
                      </div>
                      
                      <p className="text-[10px] text-neutral-300 leading-relaxed font-mono mb-2">
                        {op.details}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {op.tech.map((t, idx) => (
                          <span key={idx} className="text-[8px] bg-black/50 border border-hud-dim/20 text-neutral-200 px-1.5 py-0.5 rounded-sm transition-hud">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tactical Capabilities Tab */}
            {activeTab === 'capabilities' && (
              <motion.div
                key="capabilities"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 flex-1"
              >
                <div className="flex justify-between items-center border-b border-hud-dim/20 pb-2.5 transition-hud">
                  <h3 className="text-xs font-bold font-display tracking-widest text-hud-primary uppercase">
                    SYSTEM CARGO: TACTICAL_SUITE.DAT
                  </h3>
                  <span className="text-[9px] text-hud-primary/50 font-bold transition-hud">SEC_LEVEL_4</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto pr-1">
                  {/* Column 1 */}
                  <div className="border border-hud-dim/15 bg-black/35 p-3 rounded-sm transition-hud">
                    <div className="flex items-center space-x-1.5 border-b border-hud-dim/20 pb-1.5 mb-2.5 transition-hud">
                      <Terminal className="w-3.5 h-3.5 text-hud-primary" />
                      <span className="text-[10px] font-bold font-display tracking-widest text-neutral-200">FRONTEND OPS</span>
                    </div>
                    <ul className="space-y-2 text-[10px] font-semibold text-neutral-300">
                      {[
                        { name: 'React / Next.js', rating: 'ELITE' },
                        { name: 'Tailwind CSS v4', rating: 'ELITE' },
                        { name: 'Framer Motion', rating: 'EXPERT' },
                        { name: 'TypeScript Core', rating: 'EXPERT' }
                      ].map((item, idx) => (
                        <li key={idx} className="flex justify-between items-center font-mono">
                          <span className="text-neutral-300">{item.name}</span>
                          <span className="text-hud-primary font-bold text-[8px] bg-hud-primary/5 border border-hud-dim/20 px-1 rounded-sm transition-hud">{item.rating}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 2 */}
                  <div className="border border-hud-dim/15 bg-black/35 p-3 rounded-sm transition-hud">
                    <div className="flex items-center space-x-1.5 border-b border-hud-dim/20 pb-1.5 mb-2.5 transition-hud">
                      <Cpu className="w-3.5 h-3.5 text-hud-primary" />
                      <span className="text-[10px] font-bold font-display tracking-widest text-neutral-200">BACKEND LOGISTICS</span>
                    </div>
                    <ul className="space-y-2 text-[10px] font-semibold text-neutral-300">
                      {[
                        { name: 'Node.js / Express', rating: 'ELITE' },
                        { name: 'Go (Golang)', rating: 'EXPERT' },
                        { name: 'PostgreSQL / Redis', rating: 'EXPERT' },
                        { name: 'GraphQL / WebSockets', rating: 'EXPERT' }
                      ].map((item, idx) => (
                        <li key={idx} className="flex justify-between items-center font-mono">
                          <span className="text-neutral-300">{item.name}</span>
                          <span className="text-hud-primary font-bold text-[8px] bg-hud-primary/5 border border-hud-dim/20 px-1 rounded-sm transition-hud">{item.rating}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 3 */}
                  <div className="border border-hud-dim/15 bg-black/35 p-3 rounded-sm col-span-1 sm:col-span-2 transition-hud">
                    <div className="flex items-center space-x-1.5 border-b border-hud-dim/20 pb-1.5 mb-2.5 transition-hud">
                      <Compass className="w-3.5 h-3.5 text-hud-primary" />
                      <span className="text-[10px] font-bold font-display tracking-widest text-neutral-200">INFRASTRUCTURE RECON</span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-[10px] font-semibold text-neutral-300">
                      {[
                        { name: 'Docker / Containers', rating: 'ELITE' },
                        { name: 'AWS Cloud Services', rating: 'EXPERT' },
                        { name: 'Kubernetes Orchestration', rating: 'MID' },
                        { name: 'CI/CD Pipelines (GitLab/GitHub)', rating: 'EXPERT' }
                      ].map((item, idx) => (
                        <li key={idx} className="flex justify-between items-center font-mono">
                          <span className="text-neutral-300">{item.name}</span>
                          <span className="text-hud-primary font-bold text-[8px] bg-hud-primary/5 border border-hud-dim/20 px-1 rounded-sm transition-hud">{item.rating}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Secure Comms Transmitter Tab */}
            {activeTab === 'comms' && (
              <motion.div
                key="comms"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4 flex-1"
              >
                <div className="flex justify-between items-center border-b border-hud-dim/20 pb-2.5 transition-hud">
                  <h3 className="text-xs font-bold font-display tracking-widest text-hud-primary uppercase">
                    SECURE COMMUNICATIONS: TRANSMITTER.DAT
                  </h3>
                  <span className="text-[9px] text-hud-primary/50 font-bold transition-hud">SEC_LEVEL_5</span>
                </div>

                <form onSubmit={handleTransmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-[8px] text-hud-primary font-bold tracking-widest block uppercase transition-hud">
                        SENDER CODENAME:
                      </label>
                      <input 
                        type="text" 
                        required
                        disabled={transmitting}
                        value={commsForm.name}
                        onKeyDown={handleKeyPress}
                        onChange={(e) => setCommsForm({ ...commsForm, name: e.target.value })}
                        placeholder="ENTER CALLSIGN" 
                        className="w-full bg-black/60 border border-hud-dim/35 text-[11px] text-white p-2 outline-none focus:border-hud-primary focus:ring-1 focus:ring-hud-primary/30 font-mono uppercase transition-all rounded-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[8px] text-hud-primary font-bold tracking-widest block uppercase transition-hud">
                        RETRIEVAL ADDRESS:
                      </label>
                      <input 
                        type="email" 
                        required
                        disabled={transmitting}
                        value={commsForm.email}
                        onKeyDown={handleKeyPress}
                        onChange={(e) => setCommsForm({ ...commsForm, email: e.target.value })}
                        placeholder="ENTER SECURE EMAIL" 
                        className="w-full bg-black/60 border border-hud-dim/35 text-[11px] text-white p-2 outline-none focus:border-hud-primary focus:ring-1 focus:ring-hud-primary/30 font-mono transition-all rounded-sm"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[8px] text-hud-primary font-bold tracking-widest block uppercase transition-hud">
                      COMMS SIGNAL BODY:
                    </label>
                    <textarea 
                      rows={3}
                      required
                      disabled={transmitting}
                      value={commsForm.message}
                      onKeyDown={handleKeyPress}
                      onChange={(e) => setCommsForm({ ...commsForm, message: e.target.value })}
                      placeholder="ENTER CLASSIFIED ENQUIRY DATA..." 
                      className="w-full bg-black/60 border border-hud-dim/35 text-[11px] text-white p-2 outline-none focus:border-hud-primary focus:ring-1 focus:ring-hud-primary/30 font-mono uppercase transition-all rounded-sm"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={transmitting}
                    onMouseEnter={handleInteractiveHover}
                    className="w-full py-2 bg-hud-primary/10 hover:bg-hud-primary/20 border border-hud-dim text-neutral-200 text-[10px] font-bold tracking-[0.2em] transition-all hover:text-hud-primary disabled:opacity-50 cursor-pointer flex items-center justify-center space-x-2 rounded-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>[ TRANSMIT SECURE SIGNAL ]</span>
                  </button>
                </form>

                {/* Animated Transmission Log streams */}
                {transmitLogs.length > 0 && (
                  <div className="border border-hud-primary/25 bg-hud-primary/5 p-2 rounded-sm font-mono text-[8px] text-hud-primary space-y-0.5 max-h-[75px] overflow-hidden select-none animate-[fade-in_0.3s_ease-out]">
                    <div className="font-bold flex items-center space-x-1.5 uppercase mb-1">
                      <Radio className="w-3 h-3 animate-pulse" />
                      <span>{transmitStatus}</span>
                    </div>
                    {transmitLogs.map((log, index) => (
                      <div key={index} className="truncate tracking-wide">&gt; {log}</div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
            {activeTab === 'sat_intercept' && (
              <motion.div
                key="sat_intercept"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1"
              >
                <SatelliteIntercept />
              </motion.div>
            )}
            {activeTab === 'covert_shell' && (
              <motion.div
                key="covert_shell"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="flex-1"
              >
                <CovertShell onThemeChange={handleThemeChange} currentTheme={hudTheme} />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Console footer data lines */}
          <div className="mt-5 border-t border-hud-dim/15 pt-3.5 flex justify-between items-center text-[9px] text-hud-primary/45 font-mono transition-hud">
            <span>RAM_SECT: 2.14GB / 16.0GB</span>
            <span>CH_LOCK: UHF_SEC_901</span>
            <span>PORTFOLIO_CORE v5.0.0</span>
          </div>
        </main>

        {/* Telemetry and Diagnostics Side Widget Panel (Tablet/Desktop) */}
        <aside className="lg:col-span-4 flex flex-col gap-4">
          {/* Tactical Radar Locator Map */}
          <TacticalRadarMap 
            operations={operations} 
            onSelectOperation={handleSelectOp} 
            selectedOpId={selectedOpId} 
          />
          
          {/* Hardware Diagnostics suite */}
          <InteractiveDiagnostics />
        </aside>

      </div>

      {/* Footer System Status Bar */}
      <footer className="mt-4 border border-hud-dim glass-panel p-3 text-center text-[9px] text-hud-primary/40 flex flex-col sm:flex-row justify-between items-center rounded-sm shadow-hud-glow gap-2 transition-hud">
        <span>© {new Date().getFullYear()} ANIMESH TIWARI. COVERT TACTICAL WEB SYSTEMS.</span>
        <span>SECURITY AUTHORIZED: Level V APPROVED // AES-GCM-256</span>
      </footer>

      {/* Styles for scanlines and loader sweeps */}
      <style jsx>{`
        @keyframes dossier-sweep {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
