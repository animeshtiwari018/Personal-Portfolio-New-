"use client";

import React from "react";

export default function ServiceRecord({ id }) {
  return (
    <section 
      id={id} 
      className="relative w-full min-h-screen flex items-center justify-center p-4 md:p-8 overflow-hidden border-t-4 border-dashed border-[#2d3824]/30"
    >
      {/* Decorative Clipboard backplate */}
      <div 
        className="w-full max-w-4xl bg-[#8c785c] rounded p-1.5 shadow-2xl relative border-2 border-stone-900/40 rotate-[1deg] hover:rotate-0 transition-transform duration-500"
        style={{
          filter: "drop-shadow(6px 12px 10px rgba(0,0,0,0.55))"
        }}
      >
        {/* Metal Clipboard binder clip at the top */}
        <div className="absolute top-[-25px] left-1/2 -translate-x-1/2 w-48 h-10 bg-gradient-to-b from-stone-400 via-stone-500 to-stone-600 border-2 border-stone-800 rounded shadow-md z-15 flex flex-col justify-center items-center">
          <div className="w-12 h-2.5 bg-stone-700/80 rounded-full border border-stone-900 mb-1"></div>
          <div className="w-32 h-1 bg-stone-850/60 rounded"></div>
        </div>

        {/* Paper Sheet content */}
        <div className="w-full min-h-[500px] inner-paper-texture p-6 md:p-12 flex flex-col justify-between rounded-sm border border-stone-900/10 relative overflow-hidden">
          
          {/* Coffee stain on clipboard */}
          <div className="coffee-stain w-28 h-28 bottom-12 right-12 opacity-40 rotate-[30deg]"></div>
          
          {/* Paper Header */}
          <div className="flex justify-between items-end border-b-2 border-stone-900/30 pb-4">
            <div>
              <span className="text-[10px] font-mono text-stone-600 tracking-wider block font-bold">
                DEPARTMENT OF SYSTEM LOGISTICS & TECHNOLOGY // DOSSIER FILE AT-001
              </span>
              <h3 className="font-bebas text-stone-950 text-4xl tracking-wider mt-1">
                SECTION I // SERVICE HISTORY RECORD
              </h3>
            </div>
            <div className="text-right text-[8px] font-mono text-stone-500 leading-none">
              REF: BIO-SH-01<br />
              CLASS: RESTRICTED
            </div>
          </div>

          {/* Main Biography Body */}
          <div className="my-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-start flex-1 typewriter-text text-[11px] md:text-xs">
            
            {/* Left/Center Area (General Overview & Experience) */}
            <div className="md:col-span-2 space-y-6">
              <div>
                <h4 className="font-mono font-bold text-stone-950 border-b border-stone-900/20 pb-0.5 uppercase tracking-wider text-[11px]">
                  SUBJECT BIOGRAPHY & EVALUATION
                </h4>
                <p className="mt-2 text-stone-800 leading-relaxed font-mono">
                  Subject presents exemplary aptitude in software engineering, architecture, and systems infrastructure. Initiated into active programming development pathways during early technical commissions. Exhibits high resilience in fast-moving engineering environments with clear focus on high-fidelity, polished final products.
                </p>
              </div>

              <div>
                <h4 className="font-mono font-bold text-stone-950 border-b border-stone-900/20 pb-0.5 uppercase tracking-wider text-[11px]">
                  RECORD CHRONOLOGY
                </h4>
                <div className="mt-4 space-y-4 font-mono text-stone-800 relative pl-4 border-l-2 border-dashed border-stone-900/20">
                  
                  {/* Timeline point 1 */}
                  <div className="relative">
                    {/* Hinge dot */}
                    <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-stone-950 border border-stone-600 shadow"></div>
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-stone-950 text-xs">LEAD ENGINEER // 2023 - PRESENT</span>
                      <span className="text-[9px] px-1.5 py-0.5 border border-emerald-900/40 text-emerald-800 font-bold bg-emerald-900/5 rotate-[-2deg]">ACTIVE</span>
                    </div>
                    <p className="text-[10px] text-stone-600 mt-1 pl-2">
                      Responsible for end-to-end full-stack portal delivery, cloud integration, and database operations. Led modernization of service infrastructure resulting in 40% reduction in response latency.
                    </p>
                  </div>

                  {/* Timeline point 2 */}
                  <div className="relative">
                    <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-stone-950 border border-stone-600 shadow"></div>
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-stone-950 text-xs">SYSTEMS SPECIALIST // 2021 - 2023</span>
                      <span className="text-[9px] px-1.5 py-0.5 border border-stone-400 text-stone-500 font-bold bg-stone-900/5">COMPLETED</span>
                    </div>
                    <p className="text-[10px] text-stone-600 mt-1 pl-2">
                      Worked in modular React interface design, state modeling, and REST server developments. Integrated various security layers and audit checkpoints for telemetry compliance.
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* Right Area (Specializations / Stamps) */}
            <div className="space-y-6 bg-stone-950/5 p-4 border border-stone-900/10 rounded">
              <div>
                <h4 className="font-mono font-bold text-stone-950 border-b border-stone-900/20 pb-0.5 uppercase tracking-wider text-[10px]">
                  SPECIALTIES
                </h4>
                <ul className="mt-2 space-y-1.5 font-mono list-inside list-disc text-stone-800 text-[10px]">
                  <li>Full-stack Web System Design</li>
                  <li>Reactive UI Frameworks</li>
                  <li>Database Architecture</li>
                  <li>API Construction & Integration</li>
                  <li>Deployment Pipelines</li>
                </ul>
              </div>

              <div className="border-t border-dashed border-stone-900/30 pt-4">
                <span className="block text-[8px] font-mono text-stone-500 mb-1">STAMP COMPLIANCE</span>
                <span className="rubber-stamp-green text-[10px] text-emerald-950 border-emerald-950/50 block text-center rotate-[-2deg]">
                  VERIFIED BY ARCHIVE OFFICE
                </span>
              </div>
            </div>

          </div>

          {/* Paper Footer with Signatures */}
          <div className="border-t border-stone-900/30 pt-6 flex flex-col sm:flex-row justify-between items-end gap-6 text-[10px] font-mono select-none">
            <div>
              <span className="text-stone-500 block">SECURITY CLEARANCE STATUS</span>
              <span className="text-stone-950 font-bold">LEVEL V (SECURE COMMISSIONS ONLY)</span>
            </div>
            
            {/* Signatures */}
            <div className="flex gap-8">
              <div className="text-center">
                <div className="font-handwritten text-lg text-slate-800 border-b border-stone-900/30 px-4 h-6 flex items-center justify-center rotate-[-3deg]">
                  C. S. Roy
                </div>
                <span className="text-[8px] text-stone-500 mt-1 block">RECORD CLERK SIGNATURE</span>
              </div>
              <div className="text-center">
                <div className="font-handwritten text-lg text-slate-800 border-b border-stone-900/30 px-4 h-6 flex items-center justify-center rotate-[2deg]">
                  A. Tiwari
                </div>
                <span className="text-[8px] text-stone-500 mt-1 block">SUBJECT SIGNATURE</span>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  );
}
