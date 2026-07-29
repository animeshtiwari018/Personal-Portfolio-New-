"use client";

import React, { useRef, useState } from "react";

export default function Armaments({ id }) {
  const containerRef = useRef(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlightPos({ x, y });
  };

  const skills = {
    languages: [
      { name: "JavaScript (ES6+)", level: 5 },
      { name: "TypeScript", level: 4 },
      { name: "Python", level: 4 },
      { name: "HTML5 / CSS3", level: 5 },
    ],
    frameworks: [
      { name: "React & Next.js", level: 5 },
      { name: "Node.js / Express", level: 4 },
      { name: "Tailwind CSS", level: 5 },
      { name: "Redux Toolkit", level: 4 },
    ],
    infrastructure: [
      { name: "PostgreSQL", level: 4 },
      { name: "MongoDB / Redis", level: 4 },
      { name: "Docker & Git", level: 5 },
      { name: "AWS & Cloud Deploy", level: 3 },
    ],
  };

  const renderStars = (level) => {
    return (
      <span className="font-mono text-emerald-400 font-bold select-none tracking-wider">
        {"★".repeat(level)}{"☆".repeat(5 - level)}
      </span>
    );
  };

  return (
    <section 
      id={id} 
      className="relative w-full min-h-screen flex items-center justify-center p-4 md:p-8 overflow-hidden border-t-4 border-dashed border-[#2d3824]/30"
    >
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="w-full max-w-4xl bg-[#1c2419] rounded p-6 md:p-12 shadow-2xl relative border-2 border-[#394a32] overflow-hidden group select-none transition-all duration-300 rotate-[-1deg] hover:rotate-0"
        style={{
          filter: "drop-shadow(6px 12px 10px rgba(0,0,0,0.65))"
        }}
      >
        {/* Flashlight Spotlight Overlay Mask */}
        <div 
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-10"
          style={{
            opacity: isHovered ? 0.95 : 0,
            background: `radial-gradient(circle 220px at ${spotlightPos.x}% ${spotlightPos.y}%, transparent 10%, rgba(20, 27, 18, 0.96) 80%)`
          }}
        />

        {/* Blueprint grids overlay */}
        <div className="absolute inset-0 blueprint-grid opacity-15 pointer-events-none"></div>

        {/* Header */}
        <div className="flex justify-between items-start border-b border-[#3e5236] pb-4 mb-8 relative z-20">
          <div>
            <span className="text-[10px] font-mono text-[#6c8661] tracking-widest block font-bold uppercase">
              TECHNICAL SPECIFICATIONS & HARDWARE MATRICES
            </span>
            <h3 className="font-bebas text-stone-100 text-4xl tracking-wider mt-1">
              SECTION II // SYSTEM ARMAMENTS INVENTORY
            </h3>
          </div>
          <div className="text-right text-[8px] font-mono text-[#6c8661] leading-none bg-[#283523] p-1.5 border border-[#3e5236] rounded">
            SPEC: ARCH-TACTICAL-2<br />
            STATUS: CERTIFIED
          </div>
        </div>

        {/* Grid of Skill Spec Sheets */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-20 font-mono text-xs md:text-sm">
          
          {/* Col 1: Languages */}
          <div className="border border-[#3e5236] bg-[#232d20]/60 p-5 rounded relative">
            <h4 className="font-bold text-stone-200 border-b border-[#3e5236] pb-2 mb-4 text-[11px] uppercase tracking-wider flex justify-between">
              <span>01 // KEY COMPILERS</span>
              <span className="text-[#6c8661]">[LANG]</span>
            </h4>
            <div className="space-y-4">
              {skills.languages.map((skill, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex justify-between text-[11px] text-stone-300">
                    <span>{skill.name}</span>
                    <span>{skill.level}/5</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    {renderStars(skill.level)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 2: Frameworks */}
          <div className="border border-[#3e5236] bg-[#232d20]/60 p-5 rounded relative">
            <h4 className="font-bold text-stone-200 border-b border-[#3e5236] pb-2 mb-4 text-[11px] uppercase tracking-wider flex justify-between">
              <span>02 // TACTICAL LIBRARIES</span>
              <span className="text-[#6c8661]">[LIB]</span>
            </h4>
            <div className="space-y-4">
              {skills.frameworks.map((skill, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex justify-between text-[11px] text-stone-300">
                    <span>{skill.name}</span>
                    <span>{skill.level}/5</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    {renderStars(skill.level)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Infrastructure */}
          <div className="border border-[#3e5236] bg-[#232d20]/60 p-5 rounded relative">
            <h4 className="font-bold text-stone-200 border-b border-[#3e5236] pb-2 mb-4 text-[11px] uppercase tracking-wider flex justify-between">
              <span>03 // DATA HOUSES & ORDNANCE</span>
              <span className="text-[#6c8661]">[OPS]</span>
            </h4>
            <div className="space-y-4">
              {skills.infrastructure.map((skill, idx) => (
                <div key={idx} className="flex flex-col gap-1">
                  <div className="flex justify-between text-[11px] text-stone-300">
                    <span>{skill.name}</span>
                    <span>{skill.level}/5</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    {renderStars(skill.level)}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Blueprint Footer notes */}
        <div className="border-t border-[#3e5236] mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 relative z-20 text-[10px] text-[#6c8661] font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>INVENTORY STATUS: FULLY DEPLOYED</span>
          </div>
          <span className="hidden sm:inline">COORDINATES: SEC-07 // TARGET-DEV</span>
          <span className="text-[9px] uppercase border border-[#3e5236] px-1 bg-[#232d20]">CLASS: DECLASSIFIED APPROVED</span>
        </div>

      </div>
    </section>
  );
}
