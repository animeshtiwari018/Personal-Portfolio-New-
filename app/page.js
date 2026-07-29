"use client";

import React, { useState, useRef } from "react";
import HeroDesk from "../components/HeroDesk";
import ServiceRecord from "../components/ServiceRecord";
import Armaments from "../components/Armaments";
import Operations from "../components/Operations";
import RadioComms from "../components/RadioComms";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
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

  const handleScrollToSection = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="military-desk min-h-screen w-full flex flex-col items-center select-none overflow-y-auto">
      {/* Comms Audio Toggle */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
        <button
          onClick={() => {
            setIsMuted(!isMuted);
            if (isMuted) {
              setTimeout(() => playSound("click"), 50);
            }
          }}
          className={`flex items-center gap-2 px-3 py-1.5 border border-dashed rounded text-xs font-mono tracking-widest transition-all ${
            isMuted 
              ? "border-[#4a5840] text-[#6b7b62] bg-[#141a12]/80 hover:border-[#839878] hover:text-[#90a984]" 
              : "border-[#b91c1c] text-[#ea580c] bg-red-950/40"
          }`}
          title={isMuted ? "Enable realistic physical sound effects" : "Mute sound effects"}
        >
          <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
          COMMS AUDIO: {isMuted ? "OFF" : "ON"}
        </button>
      </div>

      {/* Dust Overlay Filter */}
      <div className="fixed inset-0 pointer-events-none opacity-20 mix-blend-color-burn z-30">
        <svg className="w-full h-full">
          <filter id="dustFilter">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.18 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#dustFilter)" />
        </svg>
      </div>

      {/* Hero Section */}
      <HeroDesk 
        playSound={playSound} 
        isMuted={isMuted} 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onOpen={() => handleScrollToSection("service-record")} 
      />

      {/* Scrollable Dossier Sections (Rendered only when open or scrolling down is active) */}
      <div className={`w-full transition-all duration-1000 ${isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20 pointer-events-none"}`}>
        {isOpen && (
          <>
            <ServiceRecord id="service-record" />
            <Armaments id="armaments" />
            <Operations id="operations" playSound={playSound} />
            <RadioComms id="radio-comms" playSound={playSound} />
            
            {/* Quick Sticky Scroll Navigation */}
            <div className="fixed bottom-6 left-6 z-50 hidden md:flex flex-col gap-1.5 font-mono text-[8px] bg-[#141a12]/80 border border-[#3e5236] p-2.5 rounded shadow-lg">
              <span className="block font-bold text-[#6c8661] border-b border-[#3e5236] pb-1 mb-1.5 uppercase">SECTOR JUMP</span>
              <button onClick={() => handleScrollToSection("service-record")} className="text-left text-[#7da06d] hover:underline">[ 01 BIO ]</button>
              <button onClick={() => handleScrollToSection("armaments")} className="text-left text-[#7da06d] hover:underline">[ 02 SKILLS ]</button>
              <button onClick={() => handleScrollToSection("operations")} className="text-left text-[#7da06d] hover:underline">[ 03 PROJ ]</button>
              <button onClick={() => handleScrollToSection("radio-comms")} className="text-left text-[#7da06d] hover:underline">[ 04 COMM ]</button>
            </div>
          </>
        )}
      </div>

    </main>
  );
}
