"use client";

import React, { useState } from "react";

export default function Operations({ id, playSound }) {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      code: "OP // OMEGA-COMMERCE PORTAL",
      stack: "NEXT.JS // NODE.JS // TAILWIND // POSTGRESQL",
      tag: "LIVE DEPLOYMENT",
      debriefing: "Formulated the architecture of a high-throughput logistical trading site. Integrated custom payment terminals, transaction validation buffers, and state controllers to preserve user carts under intensive load fluctuations.",
      link: "https://github.com/animeshtiwari018",
      ref: "OPS-932/OMEGA"
    },
    {
      code: "OP // VECTOR-COMMAND RADAR",
      stack: "REACT.JS // CHART.JS // TAILWIND // EXPRESS.JS",
      tag: "ACTIVE SENSOR",
      debriefing: "Assembled an analytical metrics cockpit for real-time sensor array signals. Displays live telemetry, charts database load spikes, and maps geographical telemetry points onto clean, readable vector graphics. Includes customized alert triggers.",
      link: "https://github.com/animeshtiwari018",
      ref: "OPS-804/VECTOR"
    },
    {
      code: "OP // ENCRYPTED SECURE-SIGNAL CHAT",
      stack: "WEBSOCKETS // REACT // MONGODB // NODE.JS",
      tag: "SECURE NODE",
      debriefing: "Engineered a secure communication line allowing end-to-end messaging synchronization. Features sub-50ms latency updates, custom encryption hashes, session tokens, and secure database staging procedures.",
      link: "https://github.com/animeshtiwari018",
      ref: "OPS-712/SIG-SEC"
    }
  ];

  const handleProjectSelect = (idx) => {
    playSound("paper");
    setActiveProject(idx);
  };

  return (
    <section 
      id={id} 
      className="relative w-full min-h-screen flex items-center justify-center p-4 md:p-8 overflow-hidden border-t-4 border-dashed border-[#2d3824]/30"
    >
      <div 
        className="w-full max-w-4xl bg-[#9c896d] rounded p-2 shadow-2xl relative border-2 border-stone-900/35 rotate-[0.5deg] hover:rotate-0 transition-transform duration-500"
        style={{
          filter: "drop-shadow(6px 12px 10px rgba(0,0,0,0.6))"
        }}
      >
        <div className="w-full min-h-[520px] bg-[#ede7d5] p-6 md:p-10 flex flex-col justify-between rounded-sm border border-stone-900/10 relative overflow-hidden">
          
          {/* Stamps */}
          <div className="absolute right-8 top-16 rotate-[-12deg] z-20 pointer-events-none opacity-85 select-none">
            <span className="rubber-stamp">DECLASSIFIED</span>
          </div>

          {/* Header */}
          <div className="flex justify-between items-end border-b-2 border-stone-900/30 pb-4 select-none">
            <div>
              <span className="text-[10px] font-mono text-stone-600 tracking-wider block font-bold">
                DIVISION 07 SYSTEM RECORD LOG // ACTIVE FIELD PROJECTS
              </span>
              <h3 className="font-bebas text-stone-950 text-4xl tracking-wider mt-1">
                SECTION III // OPERATION LOGS
              </h3>
            </div>
            <div className="text-right text-[8px] font-mono text-stone-500 leading-none">
              SER-LOG: OPS-LOG-04<br />
              DATE: 28-JUL-2026
            </div>
          </div>

          {/* Tabbed Operations Area */}
          <div className="my-8 flex flex-col md:flex-row gap-6 items-stretch flex-1">
            
            {/* Left side folder tabs */}
            <div className="w-full md:w-1/3 flex flex-col gap-2.5 select-none font-mono">
              <span className="text-[9px] font-bold text-stone-600 mb-1 border-b border-stone-900/10 pb-1 uppercase tracking-wider">
                SELECT OPERATION CODE
              </span>
              {projects.map((project, idx) => (
                <button
                  key={idx}
                  onClick={() => handleProjectSelect(idx)}
                  className={`w-full text-left p-3.5 border font-mono text-[11px] leading-tight transition-all rounded ${
                    activeProject === idx
                      ? "bg-stone-950 text-[#ede7d5] border-stone-950 shadow-md font-bold translate-x-1"
                      : "bg-stone-900/5 hover:bg-stone-900/10 text-stone-850 border-stone-900/20"
                  }`}
                  style={{
                    boxShadow: activeProject === idx ? "2px 2px 0px rgba(0,0,0,1)" : "none"
                  }}
                >
                  <span className="block text-[8px] opacity-70 mb-0.5">{project.ref}</span>
                  <span className="uppercase tracking-tight">{project.code.replace("OP // ", "")}</span>
                </button>
              ))}
            </div>

            {/* Right side expanded paper sheet */}
            <div className="flex-1 bg-stone-950/5 border border-stone-900/15 p-5 md:p-8 rounded typewriter-text text-[11px] md:text-xs relative flex flex-col justify-between">
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-stone-900/10 pb-2">
                  <h4 className="font-mono font-bold text-stone-950 text-sm tracking-wide">
                    {projects[activeProject].code}
                  </h4>
                  <span className="text-[8px] font-bold px-1.5 py-0.5 border border-red-700/60 text-red-800 bg-red-950/5 rotate-[3deg] uppercase">
                    {projects[activeProject].tag}
                  </span>
                </div>

                <div>
                  <span className="block text-[8.5px] text-stone-500 font-bold font-mono">ARMAMENTS LOADOUT (STACK)</span>
                  <p className="font-bold text-stone-900 tracking-wide font-mono mt-0.5 uppercase">
                    {projects[activeProject].stack}
                  </p>
                </div>

                <div className="pt-2">
                  <span className="block text-[8.5px] text-stone-500 font-bold font-mono">FIELD REPORT (DEBRIEFING)</span>
                  <p className="mt-1 text-stone-800 leading-relaxed font-mono whitespace-pre-line">
                    {projects[activeProject].debriefing}
                  </p>
                </div>
              </div>

              {/* Code link */}
              <div className="border-t border-stone-900/10 pt-4 mt-6 flex justify-between items-center font-mono text-[9px] font-bold select-none">
                <span>METADATA REF: {projects[activeProject].ref}</span>
                <a 
                  href={projects[activeProject].link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  onClick={() => playSound("click")}
                  className="px-3 py-1.5 bg-stone-950 text-[#ede7d5] hover:bg-stone-850 hover:text-white border-2 border-stone-950 transition-all uppercase tracking-wider"
                  style={{
                    boxShadow: "2px 2px 0px rgba(0,0,0,1)"
                  }}
                >
                  [ ACCESS SOURCE ARCHIVE ]
                </a>
              </div>

            </div>

          </div>

          {/* Footer sign-off */}
          <div className="border-t border-stone-900/20 pt-4 text-[9px] font-mono text-stone-600 flex justify-between select-none">
            <span>TACTICAL SERVICE ARCHIVE DEPT</span>
            <span>VERIFIED ON TERMINAL // SECURE LINK ACTIVE</span>
          </div>

        </div>
      </div>
    </section>
  );
}
