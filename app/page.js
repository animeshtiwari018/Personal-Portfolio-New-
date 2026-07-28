"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("particulars");
  const [isMuted, setIsMuted] = useState(true);
  const [compassAngle, setCompassAngle] = useState(0);
  const [dogTagWobble, setDogTagWobble] = useState({ x: 0, y: 0 });
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderMessage, setSenderMessage] = useState("");

  const audioCtxRef = useRef(null);

  // Play synthesized Web Audio sounds
  const playSound = (type) => {
    if (isMuted) return;
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      if (type === "click") {
        // Synthesize typewriter keypress click
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(800 + Math.random() * 200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(120, ctx.currentTime + 0.04);
        
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.04);
      } else if (type === "paper") {
        // Synthesize paper rustle
        const bufferSize = ctx.sampleRate * 0.35;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        
        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(1200, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(1800, ctx.currentTime + 0.3);
        filter.Q.value = 1.2;
        
        const gain = ctx.createGain();
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
        
        noise.connect(filter);
        filter.connect(gain);
        gain.connect(ctx.destination);
        noise.start();
        noise.stop(ctx.currentTime + 0.3);
      } else if (type === "ding") {
        // Synthesize retro typewriter carriage return bell (ding)
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(1600, ctx.currentTime);
        
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch (err) {
      console.warn("Audio Context failed to initialize: ", err);
    }
  };

  // Track mouse movement to rotate compass needle towards cursor
  useEffect(() => {
    const handleMouseMove = (e) => {
      const compassEl = document.getElementById("compass-dial");
      if (compassEl) {
        const rect = compassEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);
        setCompassAngle(angle);
      }

      // Add a slight movement/sway to dog tags
      const width = window.innerWidth;
      const height = window.innerHeight;
      const moveX = (e.clientX - width / 2) / 35;
      const moveY = (e.clientY - height / 2) / 35;
      setDogTagWobble({ x: moveX, y: moveY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const handleOpenFolder = () => {
    playSound("paper");
    setIsOpen(true);
  };

  const handleCloseFolder = () => {
    playSound("paper");
    setIsOpen(false);
  };

  const handleTabChange = (tab) => {
    playSound("paper");
    setActiveTab(tab);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !senderMessage) return;
    
    // Simulate transmission submission
    setFormSubmitted(true);
    playSound("ding");
    
    // Reset form after timer
    setTimeout(() => {
      setSenderName("");
      setSenderEmail("");
      setSenderMessage("");
      setFormSubmitted(false);
    }, 4000);
  };

  return (
    <main className="military-desk min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 select-none overflow-y-auto">
      {/* Muted Ambient Sound FX Toggle */}
      <div className="absolute top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={() => {
            setIsMuted(!isMuted);
            // Play a click as soon as it's unmuted
            if (isMuted) {
              setTimeout(() => playSound("click"), 50);
            }
          }}
          className={`flex items-center gap-2 px-3 py-1.5 border border-dashed rounded text-xs font-mono tracking-widest transition-all ${
            isMuted 
              ? "border-[#4a5840] text-[#6b7b62] hover:border-[#839878] hover:text-[#90a984]" 
              : "border-[#b91c1c] text-[#ea580c] bg-red-950/20"
          }`}
          title={isMuted ? "Enable realistic physical sound effects" : "Mute sound effects"}
        >
          <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
          COMMS AUDIO: {isMuted ? "OFF" : "ON"}
        </button>
      </div>

      {/* Screen/Dust Overlay Filter */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-color-burn z-30">
        <svg className="w-full h-full">
          <filter id="dustFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.18 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#dustFilter)" />
        </svg>
      </div>

      {/* Top-down physical environment */}
      <div className="w-full max-w-6xl mx-auto flex flex-col justify-center items-center relative py-12 md:py-16">
        
        {/* ================= BACKGROUND OBJECTS ================= */}

        {/* 1. Folded topographic map fragment (partially underneath folder) */}
        <div className="absolute -left-12 -top-6 w-[340px] md:w-[480px] h-[280px] md:h-[400px] pointer-events-none rotate-[-6deg] opacity-45 z-0 transition-transform duration-700 select-none">
          <svg viewBox="0 0 500 400" className="w-full h-full fill-none stroke-[#4c5942] stroke-1">
            {/* Aged paper background */}
            <path d="M 10 10 L 490 20 L 480 380 L 15 390 Z" fill="#2d3824" stroke="#425037" strokeWidth="2" className="shadow-2xl" />
            {/* Grid lines */}
            <path d="M 50 10 L 50 390 M 100 10 L 100 390 M 150 10 L 150 390 M 200 10 L 200 390 M 250 10 L 250 390 M 300 10 L 300 390 M 350 10 L 350 390 M 400 10 L 400 390 M 450 10 L 450 390" strokeWidth="0.5" strokeDasharray="4,8" opacity="0.3" />
            <path d="M 15 50 L 490 50 M 15 100 L 490 100 M 15 150 L 490 150 M 15 200 L 490 200 M 15 250 L 490 250 M 15 300 L 490 300 M 15 350 L 490 350" strokeWidth="0.5" strokeDasharray="4,8" opacity="0.3" />
            {/* Topographic Contour lines */}
            <path d="M -50 100 Q 120 80 200 180 T 450 120 Q 480 250 520 280" opacity="0.5" />
            <path d="M -50 130 Q 110 110 180 200 T 440 150 Q 470 270 520 300" opacity="0.5" />
            <path d="M -50 160 Q 100 140 160 220 T 430 180 Q 460 290 520 320" opacity="0.5" />
            <path d="M -50 190 Q 90 170 140 240 T 420 210 Q 450 310 520 340" opacity="0.5" />
            <path d="M 100 300 Q 180 340 280 250 T 480 320" opacity="0.4" />
            <path d="M 110 320 Q 190 355 270 270 T 490 340" opacity="0.4" />
            <path d="M 220 180 Q 250 150 280 180 T 320 210" opacity="0.6" />
            {/* Map numbers & markings */}
            <text x="70" y="80" fill="#4c5942" className="text-[10px] font-mono select-none" opacity="0.5">2400</text>
            <text x="140" y="130" fill="#4c5942" className="text-[10px] font-mono select-none" opacity="0.5">2600</text>
            <text x="250" y="170" fill="#4c5942" className="text-[9px] font-mono select-none" opacity="0.5">2850m</text>
            <text x="320" y="340" fill="#4c5942" className="text-[10px] font-mono select-none" opacity="0.5">ZONE SECTOR D-9</text>
            {/* Red tactical line */}
            <path d="M 60 80 L 140 130 L 250 170 L 290 180 L 350 280" stroke="#8a2e2e" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.7" />
            <circle cx="60" cy="80" r="3" fill="#8a2e2e" opacity="0.8" />
            <circle cx="350" cy="280" r="4" fill="#8a2e2e" opacity="0.8" />
            <text x="360" y="285" fill="#8a2e2e" className="text-[9px] font-mono select-none font-bold" opacity="0.8">OBJ RED</text>
          </svg>
        </div>

        {/* 2. Secondary stamped document partially underneath the folder */}
        <div className="absolute right-[-40px] -top-10 w-[240px] md:w-[320px] h-[180px] md:h-[240px] pointer-events-none rotate-[10deg] opacity-50 z-0 select-none">
          <div className="w-full h-full inner-paper-texture p-4 flex flex-col justify-between border-l border-t border-black/10 shadow-lg text-[9px] text-stone-800 font-mono">
            <div>
              <div className="border-b border-stone-400 pb-1 flex justify-between font-bold">
                <span>IMMEDIATE ORDER</span>
                <span>CODE: SH-74</span>
              </div>
              <p className="mt-2 text-stone-700 leading-tight">
                FROM: GENERAL HQ // ARCHIVES DIVISION<br />
                TO: COMMANDING OFFICER, SEC-5<br />
                SUBJECT: QUALIFICATION MATRIX FOR LEAD DEVELOPER DEPLOYMENT.<br />
                STATUS: APPROVED FOR IMMEDIATE COMMENCE.
              </p>
              <div className="mt-4 font-bold border-l-2 border-red-700 pl-1 text-[8px] text-red-800">
                // COMMAND INSTRUCTION EXTRACTION APPROVED.<br />
                // ALL SYSTEM LOGS CLEAR.
              </div>
            </div>
            <div className="flex justify-between items-end">
              <span className="rubber-stamp-green border-emerald-950/40 text-emerald-800/60 text-[9px] p-0.5 tracking-tight rotate-[-4deg]">
                VERIFIED BY RECORD DEPOT
              </span>
              <span className="text-[8px] text-stone-500">REF: IN/938/DEV</span>
            </div>
          </div>
        </div>

        {/* 3. Black pencil lying at the side */}
        <div 
          className="absolute -right-24 md:-right-8 top-[320px] w-6 h-[250px] rotate-[130deg] z-40 transition-transform duration-300 pointer-events-none select-none"
          style={{
            filter: "drop-shadow(6px 12px 6px rgba(0,0,0,0.65))"
          }}
        >
          {/* Pencil Body */}
          <div className="w-2.5 h-full bg-[#111111] rounded-full mx-auto relative flex flex-col justify-between">
            {/* Gold stamp text on pencil */}
            <div className="absolute inset-y-12 inset-x-0.5 flex items-center justify-center">
              <span className="text-[6px] font-mono text-yellow-600/80 font-bold uppercase rotate-90 tracking-widest whitespace-nowrap">
                HB FIELD MARKER
              </span>
            </div>
            {/* Sharpened wood tip */}
            <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[15px] border-b-[#cda87a] rotate-180 -mt-3.5 mx-auto"></div>
            {/* Graphite point */}
            <div className="w-0 h-0 border-l-[2px] border-l-transparent border-r-[2px] border-r-transparent border-b-[6px] border-b-black rotate-180 -mt-9.5 mx-auto"></div>
            {/* Metal collar + pink eraser eraser at bottom */}
            <div className="w-full h-4 bg-[#7f8c8d] mt-auto relative rounded-b-sm">
              <div className="w-full h-1 bg-[#d35400] absolute bottom-0 rounded-b-sm"></div>
            </div>
          </div>
        </div>

        {/* 4. Interactive Military Compass (Needle rotates toward cursor!) */}
        <div 
          id="compass-container"
          className="absolute left-[-20px] md:left-8 bottom-[20px] w-32 md:w-40 h-32 md:h-40 rounded-full z-40 select-none hidden sm:block"
          style={{
            filter: "drop-shadow(4px 10px 8px rgba(0,0,0,0.7))"
          }}
        >
          {/* Brass outer casing */}
          <div className="w-full h-full rounded-full bg-gradient-to-br from-[#4e3c23] via-[#3a2e1d] to-[#1e170e] p-2 border-[4px] border-[#292013] relative flex items-center justify-center">
            {/* Inner dial */}
            <div className="w-full h-full rounded-full bg-[#ede6d0] border border-[#a89d81] relative p-1 flex items-center justify-center">
              {/* Dial text */}
              <span className="absolute top-1 text-xs font-bold text-stone-800 font-serif">N</span>
              <span className="absolute right-1 text-xs font-bold text-stone-800 font-serif">E</span>
              <span className="absolute bottom-1 text-xs font-bold text-stone-800 font-serif">S</span>
              <span className="absolute left-1 text-xs font-bold text-stone-800 font-serif">W</span>
              
              {/* Compass markings */}
              <div className="absolute w-[90%] h-[90%] border border-dashed border-[#b8ae93]/80 rounded-full pointer-events-none"></div>
              
              {/* Spinning Needle */}
              <div 
                id="compass-dial"
                className="w-full h-full relative flex items-center justify-center transition-transform duration-75"
                style={{ transform: `rotate(${compassAngle}deg)` }}
              >
                {/* Pointer graphic */}
                <div className="w-1 h-[75%] relative flex flex-col justify-between items-center">
                  {/* North Needle (Red) */}
                  <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[45px] border-b-[#9e2a2b]"></div>
                  {/* Center hinge */}
                  <div className="w-2.5 h-2.5 rounded-full bg-[#1e1a12] border border-[#d8c39b] z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow"></div>
                  {/* South Needle (Silver/Black) */}
                  <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[45px] border-t-[#3a3327]"></div>
                </div>
              </div>
            </div>
            {/* Casing loop connector */}
            <div className="absolute -top-3 w-6 h-6 border-[3px] border-[#3a2e1d] rounded-full -z-10"></div>
          </div>
        </div>

        {/* 5. Authentic Metal Dog Tags */}
        <div 
          className="absolute right-6 md:right-20 -bottom-6 w-36 h-28 z-40 hidden md:block"
          style={{
            transform: `translate(${dogTagWobble.x}px, ${dogTagWobble.y}px)`,
            transition: "transform 0.1s ease-out",
            filter: "drop-shadow(4px 8px 5px rgba(0,0,0,0.65))"
          }}
        >
          {/* Steel ball chain representation */}
          <div className="absolute top-0 left-12 w-10 h-10 flex flex-wrap gap-0.5 opacity-60">
            {Array.from({ length: 15 }).map((_, idx) => (
              <div key={idx} className="w-1.5 h-1.5 chain-link rounded-full"></div>
            ))}
          </div>
          
          {/* Tag 1 */}
          <div className="absolute left-6 top-6 w-28 h-16 rounded-xl bg-gradient-to-br from-stone-400 via-stone-500 to-stone-600 border border-stone-700 p-2 flex flex-col justify-between font-mono text-[7px] text-stone-900 tracking-wider shadow-inner font-bold select-none leading-none rotate-[-15deg]">
            <div className="w-full flex justify-between">
              <span>TIWARI, ANIMESH</span>
              {/* Hole cover black rubber silencer edge */}
              <span className="w-2 h-2 rounded-full bg-stone-950 mr-1 border border-stone-800"></span>
            </div>
            <div>SER: AT-001</div>
            <div>BLOOD G: A+</div>
            <div className="text-[6px] text-stone-800">CLASS: LEVEL V CLEAR</div>
          </div>

          {/* Tag 2 (underneath) */}
          <div className="absolute left-10 top-10 w-28 h-16 rounded-xl bg-gradient-to-br from-stone-400 via-stone-500 to-stone-600 border border-stone-700 p-2 flex flex-col justify-between font-mono text-[7px] text-stone-900 tracking-wider shadow-inner font-bold select-none leading-none rotate-[8deg]">
            <div className="w-full flex justify-between">
              <span>AT // DEVELOPER</span>
              <span className="w-2 h-2 rounded-full bg-stone-950 mr-1 border border-stone-800"></span>
            </div>
            <div>DEPT: FULL STACK</div>
            <div>POST: INDIAN CORPS</div>
            <div className="text-[6px] text-stone-800">SYS: NEXT.JS NODE.JS</div>
          </div>
        </div>

        {/* ================= MAIN INTERACTIVE FILE DOSSIER ================= */}
        
        <div 
          className={`w-full max-w-4xl transition-all duration-[900ms] ease-in-out relative z-10 ${
            isOpen ? "scale-100" : "scale-[0.98] rotate-[-1.5deg] hover:rotate-0"
          }`}
        >
          {/* 3D Envelope/Folder Container */}
          <div className="perspective-1000 w-full min-h-[580px] relative">
            
            {/* ======================================================= */}
            {/* A: FOLDER CLOSED STATE (THE COVER PAGE)                 */}
            {/* ======================================================= */}
            
            <div 
              className={`w-full absolute inset-0 transform-style-3d transition-transform duration-[850ms] z-20 ${
                isOpen ? "pointer-events-none opacity-0 translate-x-[-100%] rotate-y-[-140deg]" : "opacity-100"
              }`}
            >
              {/* Outer folder paper background */}
              <div 
                className="w-full min-h-[580px] folder-cover-texture rounded p-6 md:p-12 flex flex-col justify-between border-2 border-stone-900/20 shadow-2xl relative overflow-hidden"
              >
                {/* Vintage details - Coffee stain */}
                <div className="coffee-stain w-32 h-32 -top-6 right-36 opacity-75"></div>
                
                {/* Diagonal stamp classified */}
                <div className="absolute right-12 top-24 rotate-[25deg] pointer-events-none select-none z-20">
                  <div className="rubber-stamp">RESTRICTED</div>
                </div>

                {/* Folder Header */}
                <div className="flex justify-between items-start border-b-4 border-stone-900/70 pb-6">
                  <div>
                    <span className="text-stone-900 font-bold text-xs uppercase tracking-[0.25em] font-mono block">
                      INDIAN MILITARY COMMAND
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bebas text-stone-950 tracking-wider mt-1">
                      PERSONNEL RECORD
                    </h2>
                    <span className="text-[10px] md:text-xs font-mono font-bold text-stone-800 tracking-wider">
                      DEPARTMENT OF SYSTEM LOGISTICS & TECHNOLOGY // DIVISION 07
                    </span>
                  </div>
                  <div className="text-right font-mono text-[10px] md:text-xs text-stone-800 font-bold leading-none bg-stone-950/10 p-2 border border-stone-950/20 rounded">
                    FILE // AT-001<br />
                    CAT: SECURE
                  </div>
                </div>

                {/* Cover Middle Body Area (Name and clearances) */}
                <div className="my-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center relative z-10">
                  
                  {/* Left & Mid section - Main Titles */}
                  <div className="md:col-span-2 space-y-4">
                    <div>
                      <span className="text-[9px] font-mono text-stone-800 uppercase tracking-widest block font-bold">
                        IDENTIFICATION // SURNAME, GIVEN
                      </span>
                      <h1 className="text-4xl md:text-6xl font-bebas text-stone-950 leading-none tracking-wide">
                        TIWARI, ANIMESH
                      </h1>
                    </div>

                    <div>
                      <span className="text-[9px] font-mono text-stone-800 uppercase tracking-widest block font-bold">
                        ASSIGNED OPERATIONAL CLEARANCE
                      </span>
                      <p className="text-xl md:text-2xl font-typewriter text-stone-900 font-bold uppercase tracking-tight">
                        FULL STACK DEVELOPER
                      </p>
                    </div>

                    <div className="flex gap-6 items-center">
                      <div>
                        <span className="text-[9px] font-mono text-stone-800 uppercase tracking-widest block font-bold">
                          STATUS ASSIGNMENT
                        </span>
                        <span className="rubber-stamp-green mt-1 text-emerald-900 border-emerald-900/60 rotate-0">
                          STATUS: ACTIVE
                        </span>
                      </div>
                      
                      <div className="font-handwritten text-lg text-slate-800 mt-2 rotate-[-5deg]">
                        Approved for deployment.
                      </div>
                    </div>
                  </div>

                  {/* Right section - Monochrome Photo attached via Metal Paperclip */}
                  <div className="flex justify-center relative md:justify-end pr-2">
                    <div className="relative rotate-[-3deg] hover:rotate-0 transition-transform duration-300">
                      
                      {/* Realistic metal paperclip SVG */}
                      <svg viewBox="0 0 24 60" className="absolute w-6 h-14 -top-8 right-16 rotate-12 z-30 pointer-events-none" style={{ filter: "drop-shadow(1px 2px 2px rgba(0,0,0,0.5))" }}>
                        <path d="M12 2 C8 2 5 5 5 10 L5 48 C5 54 9 58 14 58 C19 58 23 54 23 48 L23 15 C23 11 20 8 16 8 C12 8 9 11 9 15 L9 42 C9 44 11 46 13 46 C15 46 17 44 17 42 L17 18" 
                              fill="none" stroke="#6b7280" strokeWidth="3" strokeLinecap="round"/>
                        <path d="M12 2 C8 2 5 5 5 10 L5 48 C5 54 9 58 14 58 C19 58 23 54 23 48 L23 15 C23 11 20 8 16 8 C12 8 9 11 9 15 L9 42 C9 44 11 46 13 46 C15 46 17 44 17 42 L17 18" 
                              fill="none" stroke="#d1d5db" strokeWidth="1" strokeLinecap="round"/>
                      </svg>

                      {/* Photo Container */}
                      <div className="w-32 h-40 bg-stone-300 p-2 shadow-xl border border-stone-400/60 relative overflow-hidden flex flex-col justify-between">
                        {/* Actual Photo */}
                        <div className="w-full h-[82%] relative bg-stone-500 overflow-hidden border border-stone-400">
                          <Image
                            src="/personnel_photo.png"
                            alt="Animesh Tiwari Monochrome Profile"
                            fill
                            sizes="(max-width: 128px) 100vw"
                            priority
                            className="object-cover grayscale contrast-125"
                          />
                        </div>
                        {/* Sub-photo tag label */}
                        <div className="text-[7px] font-mono text-stone-700 text-center font-bold">
                          REF: IND-85093-AT
                        </div>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Folder Footer */}
                <div className="border-t-2 border-stone-900/30 pt-6 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
                  <div className="text-center md:text-left">
                    <span className="text-[9px] font-mono text-stone-800 uppercase tracking-widest block font-bold">
                      SECURITY COMPLIANCE
                    </span>
                    <span className="text-xs font-mono text-stone-900 font-bold">
                      CLASSIFIED RECORD // AUTHORIZED ACCESS ONLY
                    </span>
                  </div>

                  {/* Open Folder Button - Styled like typed tab */}
                  <button
                    onClick={handleOpenFolder}
                    className="relative cursor-pointer group flex items-center gap-3 px-6 py-3 border-2 border-stone-950 bg-stone-950 text-[#ede7d5] hover:bg-[#8e7e62] hover:text-stone-950 hover:border-stone-950 transition-all font-typewriter font-bold text-sm tracking-wider"
                    style={{
                      boxShadow: "2px 2px 0px rgba(0,0,0,1)"
                    }}
                  >
                    <span>[ OPEN PERSONNEL FILE → ]</span>
                  </button>
                </div>

                {/* Scribbles & Redactions */}
                <div className="absolute bottom-16 left-12 select-none pointer-events-none opacity-85">
                  <span className="handwritten-note text-sm text-slate-800 rotate-[-12deg] inline-block font-bold">
                    Cleared on: 28-JULY-2026<br />
                    File Clerk: <span className="underline">C. S. Roy</span>
                  </span>
                </div>
                <div className="absolute top-36 left-48 select-none pointer-events-none opacity-40">
                  <span className="font-mono text-[8px] bg-stone-950 text-stone-950 select-none">SECRET ENVELOPE</span>
                </div>

              </div>
            </div>

            {/* ======================================================= */}
            {/* B: FOLDER OPENED STATE (THE INNER CONTENTS)             */}
            {/* ======================================================= */}
            
            <div 
              className={`w-full min-h-[580px] transition-all duration-[850ms] ${
                isOpen ? "opacity-100 translate-x-0 relative z-30 scale-100" : "pointer-events-none opacity-0 translate-x-[5%] absolute"
              }`}
            >
              <div className="w-full min-h-[580px] bg-[#968366] rounded-lg shadow-2xl flex flex-col md:flex-row relative border-2 border-stone-850/30 overflow-hidden">
                
                {/* Folder Crease/Spine Shadow representation inside */}
                <div className="absolute left-0 md:left-[240px] top-0 bottom-0 w-4 bg-gradient-to-r from-black/25 to-transparent z-20 pointer-events-none"></div>
                <div className="absolute left-0 md:left-[236px] top-0 bottom-0 w-1 bg-black/15 z-20 pointer-events-none"></div>

                {/* Left Profile Sidebar (Physical side folder tab) */}
                <div className="w-full md:w-[240px] bg-[#89775b] p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-stone-950/15 relative z-10 shrink-0 select-none">
                  
                  <div>
                    {/* Retro Folder stamp at top */}
                    <div className="border border-stone-900/30 p-2 rounded text-stone-950 font-mono text-[10px] text-center font-bold mb-6 bg-stone-950/5">
                      ARCHIVE COMMAND SEC-4<br />
                      DOSSIER: AT-001
                    </div>

                    {/* Small Miniature version of photo */}
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-28 bg-stone-300 p-1.5 shadow border border-stone-400 relative">
                        <div className="w-full h-full relative bg-stone-500 overflow-hidden">
                          <Image
                            src="/personnel_photo.png"
                            alt="Monochrome profile"
                            fill
                            sizes="(max-width: 96px) 100vw"
                            className="object-cover grayscale contrast-125"
                          />
                        </div>
                      </div>
                      <span className="text-[8px] font-mono font-bold text-stone-900 mt-2">
                        RECORD ID: IND-85093-AT
                      </span>
                    </div>

                    {/* Dossier Particulars Checklist */}
                    <div className="mt-6 space-y-2 font-mono text-[9px] text-stone-950 font-bold border-t border-dashed border-stone-900/30 pt-4">
                      <div><span className="text-stone-900/60 font-normal">NAME:</span> TIWARI, A.</div>
                      <div><span className="text-stone-900/60 font-normal">ROLE:</span> FULL-STACK DEV</div>
                      <div><span className="text-stone-900/60 font-normal">RANK:</span> TECHNICAL LEADING OFFICER</div>
                      <div><span className="text-stone-900/60 font-normal">CLEARANCE:</span> LEVEL V (SECURE)</div>
                      <div><span className="text-stone-900/60 font-normal">BLOOD GROUP:</span> A+</div>
                      <div><span className="text-stone-900/60 font-normal">STATUS:</span> <span className="text-emerald-950">ACTIVE SERVICE</span></div>
                    </div>
                  </div>

                  <div className="mt-6 md:mt-0 pt-4 md:pt-0">
                    {/* Return back button */}
                    <button
                      onClick={handleCloseFolder}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 border-2 border-stone-950 bg-stone-950 hover:bg-stone-800 text-[#ede7d5] hover:text-white transition-all font-typewriter text-xs font-bold"
                    >
                      ← CLOSE RECORDS
                    </button>
                  </div>
                </div>

                {/* Right Document Area (Tabbed Paper pages) */}
                <div className="flex-1 flex flex-col bg-[#ede7d5] relative min-h-[500px]">
                  
                  {/* File/Paper Page Header */}
                  <div className="px-6 md:px-8 pt-6 pb-2 border-b border-stone-900/10 flex justify-between items-end relative select-none shrink-0">
                    <div>
                      <h3 className="font-bebas text-stone-950 text-3xl tracking-wider leading-none">
                        PERSONNEL dossier FILE
                      </h3>
                      <span className="text-[9px] font-mono text-stone-600 font-bold">
                        RECORD CATEGORY: STACK OVERVIEW & DEPLOYMENTS
                      </span>
                    </div>
                    <div className="text-[8px] font-mono text-right text-stone-600">
                      SEC-LEVEL: <span className="redacted font-bold select-none text-stone-950">TOP SECRET</span><br />
                      DATE: 28-JUL-2026
                    </div>
                  </div>

                  {/* Active Page Sheet Body */}
                  <div className="flex-1 p-6 md:p-8 overflow-y-auto max-h-[460px] dossier-scroll relative">
                    
                    {/* Background faint watermark seal */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 mix-blend-multiply select-none">
                      <div className="w-64 h-64 border-8 border-stone-900 rounded-full flex items-center justify-center text-4xl font-bebas text-stone-900 tracking-widest font-bold">
                        RECORD OFFICE
                      </div>
                    </div>

                    {/* ================= TAB CONTENT 1: PARTICULARS ================= */}
                    {activeTab === "particulars" && (
                      <div className="space-y-6 typewriter-text typewriter-ink-bleed text-[11px] md:text-xs">
                        <div>
                          <h4 className="font-mono font-bold text-stone-950 border-b border-stone-900/20 pb-1 uppercase tracking-wider text-xs flex justify-between">
                            <span>SECTION I // GENERAL OVERVIEW</span>
                            <span className="text-stone-500 font-normal">REF: BIO-01</span>
                          </h4>
                          <p className="mt-3 text-stone-800 leading-relaxed font-mono">
                            Subject presents exemplary aptitude in software engineering, architecture, and systems infrastructure. Initiated into active programming development pathways during early technical commissions. Exhibits high resilience in fast-moving engineering environments with clear focus on high-fidelity, polished final products.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h5 className="font-mono font-bold text-stone-950 border-b border-stone-900/10 pb-0.5 uppercase tracking-wide text-[10px]">
                              FIELD SPECIALIZATIONS
                            </h5>
                            <ul className="mt-2 space-y-1 font-mono list-inside list-disc text-stone-800">
                              <li>Full-stack Web System Design</li>
                              <li>Reactive Interactive UI Frameworks</li>
                              <li>Database Architecture & Optimization</li>
                              <li>API Construction & Integration</li>
                              <li>Deployment Pipelines & Automation</li>
                            </ul>
                          </div>

                          <div>
                            <h5 className="font-mono font-bold text-stone-950 border-b border-stone-900/10 pb-0.5 uppercase tracking-wide text-[10px]">
                              RECORD CHRONOLOGY
                            </h5>
                            <div className="mt-2 space-y-2 font-mono text-stone-800">
                              <div>
                                <span className="font-bold text-stone-950">2023 - PRESENT // LEAD ENGINEER</span>
                                <p className="text-[10px] text-stone-600 pl-2">Responsible for end-to-end full-stack portal delivery, cloud integration, and database operations.</p>
                              </div>
                              <div>
                                <span className="font-bold text-stone-950">2021 - 2023 // SYSTEMS SPECIALIST</span>
                                <p className="text-[10px] text-stone-600 pl-2">Worked in modular React interface design, state modeling, and REST server developments.</p>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-mono font-bold text-stone-950 border-b border-stone-900/20 pb-1 uppercase tracking-wider text-xs">
                            SECTION II // GENERAL EVALUATION RECORD
                          </h4>
                          <p className="mt-2 text-stone-800 font-mono leading-relaxed">
                            Subject remains alert under production deployment conditions. Capable of troubleshooting live errors under time pressure. Code architecture reports suggest a high level of structural sanity and documentation compliance. Clear communication channels with surrounding engineering teams.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* ================= TAB CONTENT 2: CAPABILITIES ================= */}
                    {activeTab === "capabilities" && (
                      <div className="space-y-6 typewriter-text typewriter-ink-bleed text-[11px] md:text-xs">
                        <div>
                          <h4 className="font-mono font-bold text-stone-950 border-b border-stone-900/20 pb-1 uppercase tracking-wider text-xs flex justify-between">
                            <span>SECTION III // TECHNICAL QUALIFICATIONS & ARMAMENTS</span>
                            <span className="text-stone-500 font-normal">REF: TECH-SPEC-02</span>
                          </h4>
                          <p className="mt-2 font-mono text-stone-800">
                            The following systems, platforms, and utilities have been thoroughly cataloged under verified active operations. Clear clearances have been awarded to subject.
                          </p>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h5 className="font-mono font-bold text-stone-950 border-b border-stone-900/10 pb-0.5 uppercase tracking-wide text-[10px]">
                              PRIMARY COMPILER SYSTEMS & LANGUAGES
                            </h5>
                            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-800">
                              <div className="flex justify-between items-center bg-stone-900/5 p-1 px-2 border border-stone-900/10">
                                <span>JavaScript (ES6+)</span>
                                <span className="text-stone-900 font-bold">[X] [X] [X] [X] [X]</span>
                              </div>
                              <div className="flex justify-between items-center bg-stone-900/5 p-1 px-2 border border-stone-900/10">
                                <span>TypeScript</span>
                                <span className="text-stone-900 font-bold">[X] [X] [X] [X] [ ]</span>
                              </div>
                              <div className="flex justify-between items-center bg-stone-900/5 p-1 px-2 border border-stone-900/10">
                                <span>Python</span>
                                <span className="text-stone-900 font-bold">[X] [X] [X] [X] [ ]</span>
                              </div>
                              <div className="flex justify-between items-center bg-stone-900/5 p-1 px-2 border border-stone-900/10">
                                <span>HTML5 / CSS3</span>
                                <span className="text-stone-900 font-bold">[X] [X] [X] [X] [X]</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h5 className="font-mono font-bold text-stone-950 border-b border-stone-900/10 pb-0.5 uppercase tracking-wide text-[10px]">
                              TACTICAL FRAMEWORKS & LIBRARIES
                            </h5>
                            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-800">
                              <div className="flex justify-between items-center bg-stone-900/5 p-1 px-2 border border-stone-900/10">
                                <span>React & Next.js</span>
                                <span className="text-stone-900 font-bold">[X] [X] [X] [X] [X]</span>
                              </div>
                              <div className="flex justify-between items-center bg-stone-900/5 p-1 px-2 border border-stone-900/10">
                                <span>Node.js / Express</span>
                                <span className="text-stone-900 font-bold">[X] [X] [X] [X] [ ]</span>
                              </div>
                              <div className="flex justify-between items-center bg-stone-900/5 p-1 px-2 border border-stone-900/10">
                                <span>Tailwind CSS</span>
                                <span className="text-stone-900 font-bold">[X] [X] [X] [X] [X]</span>
                              </div>
                              <div className="flex justify-between items-center bg-stone-900/5 p-1 px-2 border border-stone-900/10">
                                <span>Redux Toolkit</span>
                                <span className="text-stone-900 font-bold">[X] [X] [X] [X] [ ]</span>
                              </div>
                            </div>
                          </div>

                          <div>
                            <h5 className="font-mono font-bold text-stone-950 border-b border-stone-900/10 pb-0.5 uppercase tracking-wide text-[10px]">
                              DEPLOYMENT, ORDNANCE & DATA HOUSES
                            </h5>
                            <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-stone-800">
                              <div className="flex justify-between items-center bg-stone-900/5 p-1 px-2 border border-stone-900/10">
                                <span>PostgreSQL</span>
                                <span className="text-stone-900 font-bold">[X] [X] [X] [X] [ ]</span>
                              </div>
                              <div className="flex justify-between items-center bg-stone-900/5 p-1 px-2 border border-stone-900/10">
                                <span>MongoDB / Redis</span>
                                <span className="text-stone-900 font-bold">[X] [X] [X] [X] [ ]</span>
                              </div>
                              <div className="flex justify-between items-center bg-stone-900/5 p-1 px-2 border border-stone-900/10">
                                <span>Docker / Git</span>
                                <span className="text-stone-900 font-bold">[X] [X] [X] [X] [X]</span>
                              </div>
                              <div className="flex justify-between items-center bg-stone-900/5 p-1 px-2 border border-stone-900/10">
                                <span>AWS / Cloud Deployment</span>
                                <span className="text-stone-900 font-bold">[X] [X] [X] [ ] [ ]</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ================= TAB CONTENT 3: DEPLOYMENTS ================= */}
                    {activeTab === "deployments" && (
                      <div className="space-y-6 typewriter-text typewriter-ink-bleed text-[11px] md:text-xs">
                        <div>
                          <h4 className="font-mono font-bold text-stone-950 border-b border-stone-900/20 pb-1 uppercase tracking-wider text-xs flex justify-between">
                            <span>SECTION IV // FIELDMISSION DEPLOYMENTS</span>
                            <span className="text-stone-500 font-normal">REF: OPS-LOG-04</span>
                          </h4>
                          <p className="mt-2 font-mono text-stone-800 leading-normal">
                            Log logs of projects successfully compiled, deployed, and currently active in live sectors.
                          </p>
                        </div>

                        <div className="space-y-6">
                          {/* Project 1 */}
                          <div className="border border-stone-900/15 p-4 rounded bg-stone-900/5 relative overflow-hidden">
                            <span className="absolute top-2 right-2 border border-red-700/50 text-red-800 text-[8px] font-bold px-1 rotate-[4deg]">
                              LIVE DEPLOYMENT
                            </span>
                            <h5 className="font-mono font-bold text-stone-950 text-[11px]">
                              OP // OMEGA-COMMERCE PORTAL
                            </h5>
                            <span className="text-[9px] font-mono text-stone-600 block">STACK: Next.js // Node // Tailwind // PostgreSQL</span>
                            
                            <p className="mt-2 text-stone-800 font-mono leading-tight">
                              DEBRIEFING: Designed and launched a highly responsive online store architecture. Integrated Stripe secure transactions API, multi-stage filtration engines, and a custom content management platform. Verified performance scales under high traffic rates.
                            </p>
                            <div className="mt-3 flex gap-4 text-[9px] font-mono font-bold">
                              <a href="https://github.com/animeshtiwari018" target="_blank" rel="noopener noreferrer" className="text-stone-950 hover:underline">
                                [ SOURCE CODE CODEBASE ]
                              </a>
                              <a href="https://github.com/animeshtiwari018" target="_blank" rel="noopener noreferrer" className="text-[#8a2e2e] hover:underline">
                                [ SECURE SIGNAL LIVE DEMO ]
                              </a>
                            </div>
                          </div>

                          {/* Project 2 */}
                          <div className="border border-stone-900/15 p-4 rounded bg-stone-900/5 relative overflow-hidden">
                            <span className="absolute top-2 right-2 border border-stone-600/50 text-stone-700 text-[8px] font-bold px-1 rotate-[-2deg]">
                              STANDBY STATUS
                            </span>
                            <h5 className="font-mono font-bold text-stone-950 text-[11px]">
                              OP // VECTOR-COMMAND RADAR
                            </h5>
                            <span className="text-[9px] font-mono text-stone-600 block">STACK: React // Chart.js // Tailwind // Express</span>
                            
                            <p className="mt-2 text-stone-800 font-mono leading-tight">
                              DEBRIEFING: Assembled an analytical metrics cockpit for real-time sensor array signals. Displays live telemetry, charts database load spikes, and maps geographical telemetry points onto clean, readable graphics. Includes fully customizable alerts.
                            </p>
                            <div className="mt-3 flex gap-4 text-[9px] font-mono font-bold">
                              <a href="https://github.com/animeshtiwari018" target="_blank" rel="noopener noreferrer" className="text-stone-950 hover:underline">
                                [ CODEBASE FILE ]
                              </a>
                            </div>
                          </div>

                          {/* Project 3 */}
                          <div className="border border-stone-900/15 p-4 rounded bg-stone-900/5 relative overflow-hidden">
                            <span className="absolute top-2 right-2 border border-red-700/50 text-red-800 text-[8px] font-bold px-1 rotate-[3deg]">
                              ACTIVE LOG
                            </span>
                            <h5 className="font-mono font-bold text-stone-950 text-[11px]">
                              OP // ENCRYPTED SECURE-SIGNAL CHAT
                            </h5>
                            <span className="text-[9px] font-mono text-stone-600 block">STACK: WebSockets // React // MongoDB // Node.js</span>
                            
                            <p className="mt-2 text-stone-800 font-mono leading-tight">
                              DEBRIEFING: Engineered a secure communication line allowing end-to-end messaging synchronization. Low latency updates, custom session creation codes, and client-side encryption modules are applied before data store.
                            </p>
                            <div className="mt-3 flex gap-4 text-[9px] font-mono font-bold">
                              <a href="https://github.com/animeshtiwari018" target="_blank" rel="noopener noreferrer" className="text-stone-950 hover:underline">
                                [ CODEBASE FILE ]
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* ================= TAB CONTENT 4: TRANSMISSIONS ================= */}
                    {activeTab === "transmissions" && (
                      <div className="space-y-6 typewriter-text typewriter-ink-bleed text-[11px] md:text-xs">
                        <div>
                          <h4 className="font-mono font-bold text-stone-950 border-b border-stone-900/20 pb-1 uppercase tracking-wider text-xs flex justify-between">
                            <span>SECTION V // SECURE TRANSMISSIONS UNIT</span>
                            <span className="text-stone-500 font-normal">REF: COMMS-99</span>
                          </h4>
                          <p className="mt-2 font-mono text-stone-800">
                            Establish a direct link to the developer. Fill out the record variables below to launch transmission.
                          </p>
                        </div>

                        {formSubmitted ? (
                          <div className="border-2 border-emerald-800/60 bg-emerald-900/10 p-6 text-center space-y-3 rounded select-none">
                            <span className="rubber-stamp-green border-emerald-950 text-emerald-950 text-lg uppercase tracking-widest font-bold">
                              TRANSMISSION SENT
                            </span>
                            <p className="text-stone-800 font-mono font-bold mt-2 animate-pulse">
                              // ENCRYPTED PROTOCOL INITIATED.<br />
                              // DEPLOYING PACKETS TO DEV TERMINAL.<br />
                              // ACKNOWLEDGEMENT SENT.
                            </p>
                          </div>
                        ) : (
                          <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                            <div>
                              <label className="block text-[10px] font-mono font-bold text-stone-950 uppercase tracking-wider mb-1">
                                SENDER IDENTIFIER (NAME)
                              </label>
                              <input
                                type="text"
                                required
                                value={senderName}
                                onChange={(e) => {
                                  setSenderName(e.target.value);
                                  playSound("click");
                                }}
                                placeholder="ENTER NAME..."
                                className="w-full bg-stone-900/5 border border-stone-900/30 p-2 text-stone-950 font-mono text-xs focus:bg-stone-900/10 focus:outline-none placeholder-stone-500 uppercase rounded"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-mono font-bold text-stone-950 uppercase tracking-wider mb-1">
                                SECURE RETURN ADDRESS (EMAIL)
                              </label>
                              <input
                                type="email"
                                required
                                value={senderEmail}
                                onChange={(e) => {
                                  setSenderEmail(e.target.value);
                                  playSound("click");
                                }}
                                placeholder="ENTER EMAIL ADDRESS..."
                                className="w-full bg-stone-900/5 border border-stone-900/30 p-2 text-stone-950 font-mono text-xs focus:bg-stone-900/10 focus:outline-none placeholder-stone-500 rounded"
                              />
                            </div>

                            <div>
                              <label className="block text-[10px] font-mono font-bold text-stone-950 uppercase tracking-wider mb-1">
                                SECURE TRANSMISSION MEMO (MESSAGE)
                              </label>
                              <textarea
                                rows={4}
                                required
                                value={senderMessage}
                                onChange={(e) => {
                                  setSenderMessage(e.target.value);
                                  playSound("click");
                                }}
                                placeholder="TYPE MESSAGE DETAIL HERE..."
                                className="w-full bg-stone-900/5 border border-stone-900/30 p-2 text-stone-950 font-mono text-xs focus:bg-stone-900/10 focus:outline-none placeholder-stone-500 uppercase rounded resize-none"
                              />
                            </div>

                            <button
                              type="submit"
                              className="px-5 py-2.5 bg-stone-950 hover:bg-stone-850 border-2 border-stone-950 text-[#ede7d5] hover:text-white font-typewriter font-bold text-xs tracking-wider transition-all"
                              style={{
                                boxShadow: "2px 2px 0px rgba(0,0,0,1)"
                              }}
                            >
                              [ INITIATE SECURE TRANSMISSION → ]
                            </button>
                          </form>
                        )}
                      </div>
                    )}

                  </div>

                  {/* Physical Folder Divider Tabs */}
                  <div className="absolute right-[-44px] md:right-[-48px] top-12 flex flex-col gap-2 z-10 select-none">
                    <button
                      onClick={() => handleTabChange("particulars")}
                      className={`w-12 h-14 rounded-r flex items-center justify-center font-bebas text-sm tracking-wider text-left pl-2.5 transition-all rotate-y-12 ${
                        activeTab === "particulars"
                          ? "bg-[#ede7d5] text-stone-950 font-bold border-t border-r border-b border-stone-900/20 shadow-md translate-x-1"
                          : "bg-[#cfc6b0] hover:bg-[#ded7c3] text-stone-800 border-t border-r border-b border-stone-900/30"
                      }`}
                    >
                      <span className="vertical-tab-text uppercase font-bold rotate-90 whitespace-nowrap">
                        PARTICULARS
                      </span>
                    </button>

                    <button
                      onClick={() => handleTabChange("capabilities")}
                      className={`w-12 h-14 rounded-r flex items-center justify-center font-bebas text-sm tracking-wider text-left pl-2.5 transition-all rotate-y-12 ${
                        activeTab === "capabilities"
                          ? "bg-[#ede7d5] text-stone-950 font-bold border-t border-r border-b border-stone-900/20 shadow-md translate-x-1"
                          : "bg-[#cfc6b0] hover:bg-[#ded7c3] text-stone-800 border-t border-r border-b border-stone-900/30"
                      }`}
                    >
                      <span className="vertical-tab-text uppercase font-bold rotate-90 whitespace-nowrap">
                        CAPABILITIES
                      </span>
                    </button>

                    <button
                      onClick={() => handleTabChange("deployments")}
                      className={`w-12 h-14 rounded-r flex items-center justify-center font-bebas text-sm tracking-wider text-left pl-2.5 transition-all rotate-y-12 ${
                        activeTab === "deployments"
                          ? "bg-[#ede7d5] text-stone-950 font-bold border-t border-r border-b border-stone-900/20 shadow-md translate-x-1"
                          : "bg-[#cfc6b0] hover:bg-[#ded7c3] text-stone-800 border-t border-r border-b border-stone-900/30"
                      }`}
                    >
                      <span className="vertical-tab-text uppercase font-bold rotate-90 whitespace-nowrap">
                        OPS LOG
                      </span>
                    </button>

                    <button
                      onClick={() => handleTabChange("transmissions")}
                      className={`w-12 h-14 rounded-r flex items-center justify-center font-bebas text-sm tracking-wider text-left pl-2.5 transition-all rotate-y-12 ${
                        activeTab === "transmissions"
                          ? "bg-[#ede7d5] text-stone-950 font-bold border-t border-r border-b border-stone-900/20 shadow-md translate-x-1"
                          : "bg-[#cfc6b0] hover:bg-[#ded7c3] text-stone-800 border-t border-r border-b border-stone-900/30"
                      }`}
                    >
                      <span className="vertical-tab-text uppercase font-bold rotate-90 whitespace-nowrap">
                        COMMS
                      </span>
                    </button>
                  </div>

                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
