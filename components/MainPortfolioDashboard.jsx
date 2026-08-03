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
  FileText, 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Menu, 
  X 
} from 'lucide-react';

export default function MainPortfolioDashboard() {
  const [activeTab, setActiveTab] = useState('dossier');
  const [currentTime, setCurrentTime] = useState('');
  const [commsForm, setCommsForm] = useState({ name: '', email: '', message: '' });
  const [transmitting, setTransmitting] = useState(false);
  const [transmitStatus, setTransmitStatus] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Set real-time clock
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

  const handleTransmit = (e) => {
    e.preventDefault();
    if (!commsForm.name || !commsForm.email || !commsForm.message) return;
    
    setTransmitting(true);
    setTransmitStatus('ENCRYPTING PAYLOAD...');

    setTimeout(() => {
      setTransmitStatus('ESTABLISHING SECURE CHANNEL...');
      setTimeout(() => {
        setTransmitStatus('TRANSMITTING...');
        setTimeout(() => {
          setTransmitting(false);
          setTransmitStatus('TRANSMISSION SUCCESSFUL');
          setCommsForm({ name: '', email: '', message: '' });
          setTimeout(() => setTransmitStatus(''), 4000);
        }, 1200);
      }, 1000);
    }, 800);
  };

  // Operational records (Projects)
  const operations = [
    {
      id: 'op-01',
      codename: 'OPERATION CLOUD SHRIKE',
      objective: 'High-throughput microservices backend',
      details: 'Designed and deployed a highly resilient cluster handling 25k+ requests/sec with auto-scaling orchestrators.',
      tech: ['Go', 'Kubernetes', 'gRPC', 'AWS'],
      status: 'COMPLETED // ARCHIVED'
    },
    {
      id: 'op-02',
      codename: 'OPERATION NEURAL SHIELD',
      objective: 'Real-time threat detection system',
      details: 'Built an AI-driven security monitor using deep learning algorithms to intercept intrusion patterns in sub-5ms.',
      tech: ['Python', 'TensorFlow', 'Apache Kafka', 'Docker'],
      status: 'ACTIVE // MONITORING'
    },
    {
      id: 'op-03',
      codename: 'OPERATION GHOST PROTOCOL',
      objective: 'Decentralized encrypted messaging network',
      details: 'Engineered a secure double-ratchet chat system using WebRTC and custom cryptography blocks for zero-knowledge privacy.',
      tech: ['TypeScript', 'React Native', 'WebRTC', 'Rust'],
      status: 'COMPLETED // SECURED'
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-[#e5e7eb] font-mono relative overflow-hidden select-none crt-flicker scanlines screen-glow flex flex-col p-4 md:p-8">
      {/* Background low-opacity tactical grid */}
      <div className="absolute inset-0 tactical-grid-bg opacity-25 pointer-events-none z-0" />

      {/* Header Panel */}
      <header className="border border-tactical-olive/20 bg-tactical-bg/90 backdrop-blur-md p-4 mb-6 z-10 flex flex-col md:flex-row justify-between items-start md:items-center relative rounded-sm shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 border border-tactical-olive/30 flex items-center justify-center bg-tactical-olive/5 relative">
            <Shield className="w-6 h-6 text-tactical-olive" />
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-tactical-olive" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-tactical-olive" />
          </div>
          <div>
            <h1 className="text-sm md:text-base font-bold font-display tracking-widest text-neutral-100 flex items-center space-x-2">
              <span>OPERATOR: A. TIWARI</span>
              <span className="text-[10px] bg-tactical-olive/25 border border-tactical-olive/40 text-tactical-green px-1.5 py-0.5 rounded font-mono font-normal">
                PARA SF // UNIT VII
              </span>
            </h1>
            <p className="text-[10px] text-tactical-olive/60 uppercase tracking-widest mt-0.5">
              SYS STATUS: SECURE LINK ACTIVE
            </p>
          </div>
        </div>

        {/* System parameters / Clock */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 items-center mt-3 md:mt-0 text-[11px] text-tactical-olive/75 border-t md:border-t-0 border-tactical-olive/10 pt-3 md:pt-0 w-full md:w-auto">
          <div className="flex items-center space-x-1.5">
            <Globe className="w-3.5 h-3.5" />
            <span>LOC: 30.3165°N, 78.0322°E</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <Activity className="w-3.5 h-3.5 text-tactical-green blink-tactical" />
            <span>FREQ: 824.5 MHz</span>
          </div>
          <div className="flex items-center space-x-1.5 border border-tactical-olive/20 px-2 py-0.5 bg-black/40 text-tactical-green font-bold">
            <span>TIME:</span>
            <span>{currentTime || '00:00:00 IST'}</span>
          </div>
        </div>
      </header>

      {/* Main Grid Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 z-10 min-h-0">
        
        {/* Navigation Sidebar - Tablet/Desktop */}
        <nav className="lg:col-span-3 border border-tactical-olive/20 bg-tactical-bg/90 backdrop-blur-md p-4 flex flex-col justify-between rounded-sm shadow-md h-fit lg:h-full">
          <div>
            <div className="text-[10px] text-tactical-olive/40 tracking-wider uppercase mb-3 pb-2 border-b border-tactical-olive/10">
              OPERATIONAL MENU
            </div>
            <div className="space-y-2">
              <button 
                onClick={() => { setActiveTab('dossier'); setMobileMenuOpen(false); }}
                className={`w-full text-left py-2 px-3 border transition-all text-xs font-bold tracking-widest flex items-center justify-between ${
                  activeTab === 'dossier' 
                    ? 'bg-tactical-olive/15 border-tactical-olive text-tactical-green shadow-[0_0_8px_rgba(77,124,15,0.2)]' 
                    : 'border-transparent text-neutral-400 hover:border-tactical-olive/35 hover:text-neutral-200'
                }`}
              >
                <span>[01_PERSONNEL_DOSSIER]</span>
                <span className="text-[10px] opacity-60">REF//01</span>
              </button>
              <button 
                onClick={() => { setActiveTab('operations'); setMobileMenuOpen(false); }}
                className={`w-full text-left py-2 px-3 border transition-all text-xs font-bold tracking-widest flex items-center justify-between ${
                  activeTab === 'operations' 
                    ? 'bg-tactical-olive/15 border-tactical-olive text-tactical-green shadow-[0_0_8px_rgba(77,124,15,0.2)]' 
                    : 'border-transparent text-neutral-400 hover:border-tactical-olive/35 hover:text-neutral-200'
                }`}
              >
                <span>[02_ACTIVE_OPERATIONS]</span>
                <span className="text-[10px] opacity-60">LOG//03</span>
              </button>
              <button 
                onClick={() => { setActiveTab('capabilities'); setMobileMenuOpen(false); }}
                className={`w-full text-left py-2 px-3 border transition-all text-xs font-bold tracking-widest flex items-center justify-between ${
                  activeTab === 'capabilities' 
                    ? 'bg-tactical-olive/15 border-tactical-olive text-tactical-green shadow-[0_0_8px_rgba(77,124,15,0.2)]' 
                    : 'border-transparent text-neutral-400 hover:border-tactical-olive/35 hover:text-neutral-200'
                }`}
              >
                <span>[03_TACTICAL_CAPS]</span>
                <span className="text-[10px] opacity-60">SKL//09</span>
              </button>
              <button 
                onClick={() => { setActiveTab('comms'); setMobileMenuOpen(false); }}
                className={`w-full text-left py-2 px-3 border transition-all text-xs font-bold tracking-widest flex items-center justify-between ${
                  activeTab === 'comms' 
                    ? 'bg-tactical-olive/15 border-tactical-olive text-tactical-green shadow-[0_0_8px_rgba(77,124,15,0.2)]' 
                    : 'border-transparent text-neutral-400 hover:border-tactical-olive/35 hover:text-neutral-200'
                }`}
              >
                <span>[04_SECURE_COMMS]</span>
                <span className="text-[10px] opacity-60">UPL//02</span>
              </button>
            </div>
          </div>

          <div className="mt-8 border-t border-tactical-olive/10 pt-4 hidden lg:block text-[9px] text-tactical-olive/45 space-y-1">
            <div>SECURE TRANSMISSION SYS</div>
            <div>VER: MIL-CORE-8A</div>
            <div className="flex items-center space-x-1 mt-2 text-tactical-green/60">
              <Lock className="w-2.5 h-2.5" />
              <span>AES-256 ENCRYPTED</span>
            </div>
          </div>
        </nav>

        {/* Content Console Panel */}
        <main className="lg:col-span-9 border border-tactical-olive/20 bg-tactical-bg/90 backdrop-blur-md p-6 rounded-sm shadow-md flex flex-col justify-between relative overflow-hidden">
          {/* Subtle corner crosshairs inside main console */}
          <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-tactical-olive/30" />
          <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-tactical-olive/30" />
          <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-tactical-olive/30" />
          <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-tactical-olive/30" />

          <AnimatePresence mode="wait">
            {activeTab === 'dossier' && (
              <motion.div
                key="dossier"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 flex-1"
              >
                <div className="flex justify-between items-center border-b border-tactical-olive/20 pb-3">
                  <h3 className="text-sm font-bold font-display tracking-widest text-tactical-amber">
                    SECURE FILE: PERSONNEL_DOSSIER.DAT
                  </h3>
                  <span className="text-[10px] text-tactical-olive/50">SEC_LEVEL_5</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left avatar column */}
                  <div className="md:col-span-1 flex flex-col items-center justify-center p-4 border border-tactical-olive/15 bg-black/40 rounded-sm relative group">
                    <div className="w-32 h-32 border border-tactical-olive/30 relative flex items-center justify-center bg-tactical-olive/5 p-2 overflow-hidden">
                      {/* Tactical Grid Overlay in Avatar */}
                      <div className="absolute inset-0 bg-gradient-to-t from-tactical-olive/15 to-transparent z-0" />
                      
                      {/* Wireframe representation of SF Dagger */}
                      <svg className="w-20 h-20 text-tactical-olive/70 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M5 12h14M8 7l4-5 4 5M12 2l-6 6h12l-6-6" />
                      </svg>
                      
                      {/* Avatar borders */}
                      <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-tactical-olive" />
                      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-tactical-olive" />
                      <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-tactical-olive" />
                      <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-tactical-olive" />
                    </div>
                    <span className="text-[10px] text-tactical-olive/60 tracking-widest font-bold mt-3">OPERATIONAL BADGE</span>
                  </div>

                  {/* Right bio/info columns */}
                  <div className="md:col-span-2 space-y-4">
                    <div className="space-y-1.5">
                      <span className="text-[10px] text-tactical-olive/50 font-bold uppercase block">OPERATIONAL BACKGROUND</span>
                      <p className="text-xs md:text-sm text-neutral-200 leading-relaxed">
                        Full-Stack Engineer with deep operational expertise in building military-grade web applications and high-throughput backend infrastructure. Driven by extreme engineering discipline, precision coding standards, and tactical architecture designs.
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 border-t border-tactical-olive/10 pt-4">
                      <div>
                        <span className="text-[9px] text-tactical-olive/50 font-bold block">SPECIALIZATION</span>
                        <span className="text-xs font-semibold text-neutral-200">SYSTEMS ARCHITECTURE</span>
                      </div>
                      <div>
                        <span className="text-[9px] text-tactical-olive/50 font-bold block">CODE STATUS</span>
                        <span className="text-xs font-semibold text-tactical-green blink-tactical font-mono">READY // DEPLOYABLE</span>
                      </div>
                    </div>

                    {/* Operational parameters bar */}
                    <div className="space-y-2.5 border-t border-tactical-olive/10 pt-4">
                      <span className="text-[9px] text-tactical-olive/50 font-bold uppercase block">PERFORMANCE METRICS</span>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] text-neutral-300">
                          <span>SYSTEM INTEGRATION RATIO</span>
                          <span className="text-tactical-green">98.4%</span>
                        </div>
                        <div className="h-1.5 w-full bg-tactical-olive/10 rounded-sm overflow-hidden">
                          <div className="h-full bg-tactical-green rounded-sm" style={{ width: '98%' }} />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] text-neutral-300">
                          <span>LATENCY TOLERANCE (API)</span>
                          <span className="text-tactical-green">92.1%</span>
                        </div>
                        <div className="h-1.5 w-full bg-tactical-olive/10 rounded-sm overflow-hidden">
                          <div className="h-full bg-tactical-olive rounded-sm" style={{ width: '92%' }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'operations' && (
              <motion.div
                key="operations"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5 flex-1"
              >
                <div className="flex justify-between items-center border-b border-tactical-olive/20 pb-3">
                  <h3 className="text-sm font-bold font-display tracking-widest text-tactical-amber">
                    CLASSIFIED ARCHIVE: MISSION_LOGS.DAT
                  </h3>
                  <span className="text-[10px] text-tactical-olive/50">SEC_LEVEL_4</span>
                </div>

                <div className="space-y-4">
                  {operations.map((op) => (
                    <div key={op.id} className="border border-tactical-olive/15 bg-black/35 p-4 rounded-sm hover:border-tactical-olive/35 transition-all">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2">
                        <span className="text-xs md:text-sm font-bold tracking-widest text-tactical-green flex items-center space-x-2">
                          <span className="w-1.5 h-1.5 bg-tactical-green rounded-full blink-tactical" />
                          <span>{op.codename}</span>
                        </span>
                        <span className="text-[10px] font-mono text-tactical-amber font-bold">
                          {op.status}
                        </span>
                      </div>
                      
                      <div className="text-[10px] text-tactical-olive/70 font-semibold mb-1 uppercase">
                        OBJECTIVE: {op.objective}
                      </div>
                      
                      <p className="text-xs text-neutral-300 leading-relaxed mb-3">
                        {op.details}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {op.tech.map((t, idx) => (
                          <span key={idx} className="text-[9px] bg-tactical-olive/10 border border-tactical-olive/20 text-neutral-300 px-2 py-0.5 rounded-sm">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'capabilities' && (
              <motion.div
                key="capabilities"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-6 flex-1"
              >
                <div className="flex justify-between items-center border-b border-tactical-olive/20 pb-3">
                  <h3 className="text-sm font-bold font-display tracking-widest text-tactical-amber">
                    SYSTEM SUITE: TACTICAL_CAPABILITIES.DAT
                  </h3>
                  <span className="text-[10px] text-tactical-olive/50">SEC_LEVEL_4</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Column 1 */}
                  <div className="border border-tactical-olive/15 bg-black/35 p-4 rounded-sm">
                    <div className="flex items-center space-x-2 border-b border-tactical-olive/20 pb-2 mb-3">
                      <Terminal className="w-4 h-4 text-tactical-green" />
                      <span className="text-xs font-bold font-display tracking-widest text-neutral-200">FRONTEND OPS</span>
                    </div>
                    <ul className="space-y-2 text-xs font-semibold text-neutral-300">
                      <li className="flex justify-between items-center">
                        <span>React / NextJS 16</span>
                        <span className="text-tactical-green text-[10px]">ELITE</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Tailwind CSS v4</span>
                        <span className="text-tactical-green text-[10px]">ELITE</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Framer Motion / GSAP</span>
                        <span className="text-tactical-green text-[10px]">EXPERT</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>TypeScript Core</span>
                        <span className="text-tactical-green text-[10px]">EXPERT</span>
                      </li>
                    </ul>
                  </div>

                  {/* Column 2 */}
                  <div className="border border-tactical-olive/15 bg-black/35 p-4 rounded-sm">
                    <div className="flex items-center space-x-2 border-b border-tactical-olive/20 pb-2 mb-3">
                      <Cpu className="w-4 h-4 text-tactical-green" />
                      <span className="text-xs font-bold font-display tracking-widest text-neutral-200">BACKEND LOGISTICS</span>
                    </div>
                    <ul className="space-y-2 text-xs font-semibold text-neutral-300">
                      <li className="flex justify-between items-center">
                        <span>NodeJS / Express</span>
                        <span className="text-tactical-green text-[10px]">ELITE</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Go (Golang)</span>
                        <span className="text-tactical-green text-[10px]">EXPERT</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>PostgreSQL / Redis</span>
                        <span className="text-tactical-green text-[10px]">EXPERT</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>GraphQL / WebSockets</span>
                        <span className="text-tactical-green text-[10px]">EXPERT</span>
                      </li>
                    </ul>
                  </div>

                  {/* Column 3 */}
                  <div className="border border-tactical-olive/15 bg-black/35 p-4 rounded-sm">
                    <div className="flex items-center space-x-2 border-b border-tactical-olive/20 pb-2 mb-3">
                      <Compass className="w-4 h-4 text-tactical-green" />
                      <span className="text-xs font-bold font-display tracking-widest text-neutral-200">CLOUD RECON</span>
                    </div>
                    <ul className="space-y-2 text-xs font-semibold text-neutral-300">
                      <li className="flex justify-between items-center">
                        <span>Docker / Containers</span>
                        <span className="text-tactical-green text-[10px]">ELITE</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>AWS (EC2, S3, RDS)</span>
                        <span className="text-tactical-green text-[10px]">EXPERT</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>Kubernetes Orchestration</span>
                        <span className="text-tactical-green text-[10px]">INTERMEDIATE</span>
                      </li>
                      <li className="flex justify-between items-center">
                        <span>CI/CD Pipelines</span>
                        <span className="text-tactical-green text-[10px]">EXPERT</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'comms' && (
              <motion.div
                key="comms"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="space-y-5 flex-1"
              >
                <div className="flex justify-between items-center border-b border-tactical-olive/20 pb-3">
                  <h3 className="text-sm font-bold font-display tracking-widest text-tactical-amber">
                    SECURE COMMUNICATIONS: COMMS_TRANSMITTER.DAT
                  </h3>
                  <span className="text-[10px] text-tactical-olive/50">SEC_LEVEL_5</span>
                </div>

                <form onSubmit={handleTransmit} className="space-y-4 max-w-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[9px] text-tactical-olive font-bold tracking-widest block uppercase">
                        SENDER IDENTIFIER:
                      </label>
                      <input 
                        type="text" 
                        required
                        disabled={transmitting}
                        value={commsForm.name}
                        onChange={(e) => setCommsForm({ ...commsForm, name: e.target.value })}
                        placeholder="ENTER CODENAME / NAME" 
                        className="w-full bg-black/60 border border-tactical-olive/35 text-xs text-white p-2.5 outline-none focus:border-tactical-green/60 focus:ring-1 focus:ring-tactical-green/30 font-mono uppercase"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] text-tactical-olive font-bold tracking-widest block uppercase">
                        RETRIEVAL ADDRESS (EMAIL):
                      </label>
                      <input 
                        type="email" 
                        required
                        disabled={transmitting}
                        value={commsForm.email}
                        onChange={(e) => setCommsForm({ ...commsForm, email: e.target.value })}
                        placeholder="ENTER SECURE EMAIL" 
                        className="w-full bg-black/60 border border-tactical-olive/35 text-xs text-white p-2.5 outline-none focus:border-tactical-green/60 focus:ring-1 focus:ring-tactical-green/30 font-mono"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-tactical-olive font-bold tracking-widest block uppercase">
                      COMMS SIGNAL BODY:
                    </label>
                    <textarea 
                      rows={4}
                      required
                      disabled={transmitting}
                      value={commsForm.message}
                      onChange={(e) => setCommsForm({ ...commsForm, message: e.target.value })}
                      placeholder="ENTER CLASSIFIED INSTRUCTIONS OR ENQUIRY MESSAGE..." 
                      className="w-full bg-black/60 border border-tactical-olive/35 text-xs text-white p-2.5 outline-none focus:border-tactical-green/60 focus:ring-1 focus:ring-tactical-green/30 font-mono uppercase"
                    />
                  </div>

                  <button 
                    type="submit" 
                    disabled={transmitting}
                    className="w-full py-2.5 bg-tactical-olive/15 hover:bg-tactical-olive/25 border border-tactical-olive/50 text-neutral-200 text-xs font-bold tracking-[0.2em] transition-all hover:text-tactical-green disabled:opacity-50 cursor-pointer flex items-center justify-center space-x-2"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>[ TRANSMIT SECURE SIGNAL ]</span>
                  </button>

                  {transmitStatus && (
                    <div className="mt-3 border border-tactical-green/20 bg-tactical-green/5 p-3 text-center rounded-sm">
                      <span className="text-[10px] text-tactical-green font-bold tracking-widest uppercase flex items-center justify-center space-x-2">
                        <CheckCircle2 className="w-4 h-4 animate-pulse" />
                        <span>{transmitStatus}</span>
                      </span>
                    </div>
                  )}
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Console footer data lines */}
          <div className="mt-6 border-t border-tactical-olive/10 pt-4 flex justify-between items-center text-[8px] md:text-[10px] text-tactical-olive/55 font-mono">
            <span>MEM: 2.14GB/16.0GB</span>
            <span>CH: UHF_SEC_901</span>
            <span>PORTFOLIO_CORE v4.0.0</span>
          </div>
        </main>
      </div>

      {/* Footer System Status Bar */}
      <footer className="mt-6 border border-tactical-olive/20 bg-tactical-bg/90 backdrop-blur-md p-3 text-center text-[10px] text-tactical-olive/50 flex flex-col sm:flex-row justify-between items-center rounded-sm shadow-md gap-2">
        <span>© {new Date().getFullYear()} ANIMESH TIWARI. COVERT TECHNICAL COMMAND SYS.</span>
        <span>SECURITY PROTOCOL: AES-GCM // LEVEL V AUTHORIZED</span>
      </footer>
    </div>
  );
}
