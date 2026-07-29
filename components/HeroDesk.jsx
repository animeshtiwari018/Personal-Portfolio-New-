"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function HeroDesk({ playSound, isMuted, isOpen, setIsOpen, onOpen }) {
  const [compassAngle, setCompassAngle] = useState(0);
  const [dogTagWobble, setDogTagWobble] = useState({ x: 0, y: 0 });

  // Track mouse movement to rotate compass needle and sway dog tags
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
    if (onOpen) {
      setTimeout(onOpen, 1000); // Trigger scroll down after opening animation completes
    }
  };

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center p-4 md:p-8 overflow-hidden">
      
      {/* ================= BACKGROUND DECORATIONS ================= */}

      {/* 1. Folded topographic map fragment */}
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
          {/* Map numbers */}
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

      {/* 2. Secondary stamped document */}
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

      {/* 3. Black pencil */}
      <div 
        className="absolute -right-24 md:-right-8 top-[320px] w-6 h-[250px] rotate-[130deg] z-40 transition-transform duration-300 pointer-events-none select-none"
        style={{
          filter: "drop-shadow(6px 12px 6px rgba(0,0,0,0.65))"
        }}
      >
        <div className="w-2.5 h-full bg-[#111111] rounded-full mx-auto relative flex flex-col justify-between">
          <div className="absolute inset-y-12 inset-x-0.5 flex items-center justify-center">
            <span className="text-[6px] font-mono text-yellow-600/80 font-bold uppercase rotate-90 tracking-widest whitespace-nowrap">
              HB FIELD MARKER
            </span>
          </div>
          <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[15px] border-b-[#cda87a] rotate-180 -mt-3.5 mx-auto"></div>
          <div className="w-0 h-0 border-l-[2px] border-l-transparent border-r-[2px] border-r-transparent border-b-[6px] border-b-black rotate-180 -mt-9.5 mx-auto"></div>
          <div className="w-full h-4 bg-[#7f8c8d] mt-auto relative rounded-b-sm">
            <div className="w-full h-1 bg-[#d35400] absolute bottom-0 rounded-b-sm"></div>
          </div>
        </div>
      </div>

      {/* 4. Interactive Military Compass */}
      <div 
        id="compass-container"
        className="absolute left-[-20px] md:left-8 bottom-[20px] w-32 md:w-40 h-32 md:h-40 rounded-full z-40 select-none hidden sm:block"
        style={{
          filter: "drop-shadow(4px 10px 8px rgba(0,0,0,0.7))"
        }}
      >
        <div className="w-full h-full rounded-full bg-gradient-to-br from-[#4e3c23] via-[#3a2e1d] to-[#1e170e] p-2 border-[4px] border-[#292013] relative flex items-center justify-center">
          <div className="w-full h-full rounded-full bg-[#ede6d0] border border-[#a89d81] relative p-1 flex items-center justify-center">
            <span className="absolute top-1 text-xs font-bold text-stone-800 font-serif">N</span>
            <span className="absolute right-1 text-xs font-bold text-stone-800 font-serif">E</span>
            <span className="absolute bottom-1 text-xs font-bold text-stone-800 font-serif">S</span>
            <span className="absolute left-1 text-xs font-bold text-stone-800 font-serif">W</span>
            <div className="absolute w-[90%] h-[90%] border border-dashed border-[#b8ae93]/80 rounded-full pointer-events-none"></div>
            <div 
              id="compass-dial"
              className="w-full h-full relative flex items-center justify-center transition-transform duration-75"
              style={{ transform: `rotate(${compassAngle}deg)` }}
            >
              <div className="w-1 h-[75%] relative flex flex-col justify-between items-center">
                <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[45px] border-b-[#9e2a2b]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#1e1a12] border border-[#d8c39b] z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow"></div>
                <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[45px] border-t-[#3a3327]"></div>
              </div>
            </div>
          </div>
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
        <div className="absolute top-0 left-12 w-10 h-10 flex flex-wrap gap-0.5 opacity-60">
          {Array.from({ length: 15 }).map((_, idx) => (
            <div key={idx} className="w-1.5 h-1.5 chain-link rounded-full"></div>
          ))}
        </div>
        
        {/* Tag 1 */}
        <div className="absolute left-6 top-6 w-28 h-16 rounded-xl bg-gradient-to-br from-stone-400 via-stone-500 to-stone-600 border border-stone-700 p-2 flex flex-col justify-between font-mono text-[7px] text-stone-900 tracking-wider shadow-inner font-bold select-none leading-none rotate-[-15deg]">
          <div className="w-full flex justify-between">
            <span>TIWARI, ANIMESH</span>
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

      {/* ================= MAIN INTERACTIVE DOSSIER COVER ================= */}
      
      <div 
        className={`w-full max-w-4xl transition-all duration-[900ms] ease-in-out relative z-10 ${
          isOpen ? "scale-100" : "scale-[0.98] rotate-[-1.5deg] hover:rotate-0"
        }`}
      >
        <div className="perspective-1000 w-full min-h-[580px] relative">
          
          {/* FOLDER CLOSED STATE (THE COVER PAGE) */}
          <div 
            className={`w-full absolute inset-0 transform-style-3d transition-transform duration-[850ms] z-20 ${
              isOpen ? "pointer-events-none opacity-0 translate-x-[-100%] rotate-y-[-140deg]" : "opacity-100"
            }`}
          >
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

                {/* Right section - Photo with Metal Paperclip */}
                <div className="flex justify-center relative md:justify-end pr-2">
                  <div className="relative rotate-[-3deg] hover:rotate-0 transition-transform duration-300">
                    
                    <svg viewBox="0 0 24 60" className="absolute w-6 h-14 -top-8 right-16 rotate-12 z-30 pointer-events-none" style={{ filter: "drop-shadow(1px 2px 2px rgba(0,0,0,0.5))" }}>
                      <path d="M12 2 C8 2 5 5 5 10 L5 48 C5 54 9 58 14 58 C19 58 23 54 23 48 L23 15 C23 11 20 8 16 8 C12 8 9 11 9 15 L9 42 C9 44 11 46 13 46 C15 46 17 44 17 42 L17 18" 
                            fill="none" stroke="#6b7280" strokeWidth="3" strokeLinecap="round"/>
                      <path d="M12 2 C8 2 5 5 5 10 L5 48 C5 54 9 58 14 58 C19 58 23 54 23 48 L23 15 C23 11 20 8 16 8 C12 8 9 11 9 15 L9 42 C9 44 11 46 13 46 C15 46 17 44 17 42 L17 18" 
                            fill="none" stroke="#d1d5db" strokeWidth="1" strokeLinecap="round"/>
                    </svg>

                    <div className="w-32 h-40 bg-stone-300 p-2 shadow-xl border border-stone-400/60 relative overflow-hidden flex flex-col justify-between">
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

              <div className="absolute bottom-16 left-12 select-none pointer-events-none opacity-85">
                <span className="handwritten-note text-sm text-slate-800 rotate-[-12deg] inline-block font-bold">
                  Cleared on: 28-JULY-2026<br />
                  File Clerk: <span className="underline">C. S. Roy</span>
                </span>
              </div>
            </div>
          </div>

          {/* FOLDER OPENED STATE (INSIDE PRINT OUT DEPLOYMENT SEQUENCE) */}
          <div 
            className={`w-full min-h-[580px] transition-all duration-[850ms] ${
              isOpen ? "opacity-100 translate-x-0 relative z-30 scale-100" : "pointer-events-none opacity-0 translate-x-[5%] absolute"
            }`}
          >
            <div className="w-full min-h-[580px] bg-[#968366] rounded-lg shadow-2xl p-8 flex flex-col justify-between border-2 border-stone-850/30 relative overflow-hidden select-none">
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5 mix-blend-multiply select-none">
                <div className="w-64 h-64 border-8 border-stone-900 rounded-full flex items-center justify-center text-4xl font-bebas text-stone-900 tracking-widest font-bold">
                  ARCHIVES
                </div>
              </div>

              <div className="border-b border-stone-900/30 pb-4">
                <span className="text-[10px] font-mono text-stone-900 tracking-widest block font-bold">
                  SYSTEM OVERVIEW DEPLOYMENT
                </span>
                <h3 className="font-bebas text-stone-950 text-3xl tracking-wider">
                  DECRYPTION COMPLETED // DOSSIER AT-001
                </h3>
              </div>

              <div className="my-8 flex-1 flex flex-col justify-center font-mono text-stone-950 leading-relaxed text-xs md:text-sm space-y-2 max-w-2xl">
                <div className="text-emerald-950 font-bold tracking-wider">// INITIATING TACTICAL PROTOCOL...</div>
                <div className="pl-4 text-stone-800">
                  [OK] ESTABLISHED DIRECT LINE TO PERSONNEL MEMORY BANKS.<br />
                  [OK] RETRIEVED SERVICE RECORD & QUALIFICATIONS.<br />
                  [OK] UNLOCKED OPERATION LOGS & LOGISTICS COMPILATION.<br />
                  [OK] COMMS ENCRYPTION KEYS ROTATED.
                </div>
                <div className="pt-4 text-red-950 font-bold animate-pulse">
                  &gt;&gt; ARCHIVE BLOCKS DEPLOYED ON TABLE. SCROLL DOWN TO INSPECT FILE SHEETS.
                </div>
              </div>

              <div className="border-t border-stone-900/30 pt-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <span className="text-[10px] font-mono text-stone-900/80">
                  REF: LOGISTICS-MAP-SEC4
                </span>
                <button
                  onClick={() => {
                    if (onOpen) onOpen();
                  }}
                  className="px-5 py-2 border-2 border-stone-950 bg-stone-950 hover:bg-stone-800 text-[#ede7d5] hover:text-white transition-all font-typewriter text-xs font-bold animate-bounce"
                >
                  [ SCROLL TO FILE SHEETS ↓ ]
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
