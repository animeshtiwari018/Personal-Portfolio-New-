"use client";

import React, { useState } from "react";

export default function RadioComms({ id, playSound }) {
  const [senderName, setSenderName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [senderMessage, setSenderMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [signalStrength, setSignalStrength] = useState("HIGH");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !senderMessage) return;

    playSound("ding");
    setFormSubmitted(true);

    setTimeout(() => {
      setSenderName("");
      setSenderEmail("");
      setSenderMessage("");
      setFormSubmitted(false);
    }, 4500);
  };

  const handleInputChange = (setter, val) => {
    setter(val);
    playSound("click");
  };

  return (
    <section 
      id={id} 
      className="relative w-full min-h-screen flex items-center justify-center p-4 md:p-8 overflow-hidden border-t-4 border-dashed border-[#2d3824]/30"
    >
      {/* Field Radio Steel Case */}
      <div 
        className="w-full max-w-3xl bg-gradient-to-br from-[#2f3d2a] via-[#1d2719] to-[#0f140c] rounded-lg p-6 md:p-10 shadow-2xl relative border-[4px] border-[#3f5238] select-none rotate-[-0.5deg] hover:rotate-0 transition-transform duration-500"
        style={{
          boxShadow: "0 10px 30px rgba(0,0,0,0.8), inset 0 2px 5px rgba(255,255,255,0.1)"
        }}
      >
        {/* Steel Grille panel details */}
        <div className="absolute top-4 left-4 flex gap-1.5 opacity-60">
          <div className="w-1.5 h-1.5 rounded-full bg-stone-900 border border-stone-700"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-stone-900 border border-stone-700"></div>
        </div>
        <div className="absolute top-4 right-4 flex gap-1.5 opacity-60">
          <div className="w-1.5 h-1.5 rounded-full bg-stone-900 border border-stone-700"></div>
          <div className="w-1.5 h-1.5 rounded-full bg-stone-900 border border-stone-700"></div>
        </div>

        {/* Radio Screen / Oscilloscope Interface */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
          
          {/* Left Radio Controls column */}
          <div className="md:col-span-1 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#3f5238]/40 pb-6 md:pb-0 md:pr-6 font-mono text-[10px] text-[#7da06d] space-y-6">
            
            {/* Status Dial LED */}
            <div className="space-y-2">
              <span className="block font-bold tracking-widest uppercase">COMMS STATUS</span>
              <div className="flex items-center gap-2 bg-black/40 p-2 border border-[#3f5238]/30 rounded">
                <div className={`w-3 h-3 rounded-full ${formSubmitted ? "bg-red-500 animate-ping" : "bg-emerald-500 animate-pulse"} border border-black`}></div>
                <span className="font-bold tracking-wider">{formSubmitted ? "TRANSMITTING" : "READY / LINKED"}</span>
              </div>
            </div>

            {/* Signal strength selector */}
            <div className="space-y-2">
              <span className="block font-bold tracking-widest uppercase">SIGNAL PROTOCOL</span>
              <div className="grid grid-cols-3 gap-1 bg-black/40 p-1 border border-[#3f5238]/30 rounded text-center">
                {["LOW", "MED", "HIGH"].map((sig) => (
                  <button
                    key={sig}
                    onClick={() => {
                      playSound("click");
                      setSignalStrength(sig);
                    }}
                    className={`py-1 rounded font-bold transition-all text-[8px] ${
                      signalStrength === sig 
                        ? "bg-[#7da06d] text-stone-950 shadow-inner" 
                        : "text-[#7da06d]/60 hover:text-[#7da06d]"
                    }`}
                  >
                    {sig}
                  </button>
                ))}
              </div>
            </div>

            {/* Dials / Knobs SVG representation */}
            <div className="flex justify-around items-center pt-2">
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-stone-900 border-2 border-stone-700 flex items-center justify-center cursor-pointer hover:border-[#7da06d] transition-all shadow-md">
                  <div className="w-1.5 h-4 bg-stone-500 rounded-sm transform origin-bottom -translate-y-1 rotate-[45deg]"></div>
                </div>
                <span className="block text-[8px] mt-1 tracking-tighter">FREQ TUNER</span>
              </div>
              <div className="text-center">
                <div className="w-8 h-8 rounded-full bg-stone-900 border-2 border-stone-700 flex items-center justify-center cursor-pointer hover:border-[#7da06d] transition-all shadow-md">
                  <div className="w-1.5 h-4 bg-stone-500 rounded-sm transform origin-bottom -translate-y-1 rotate-[-30deg]"></div>
                </div>
                <span className="block text-[8px] mt-1 tracking-tighter">BAND GAIN</span>
              </div>
            </div>

            <div className="text-[7.5px] opacity-50 select-none uppercase tracking-tight text-center md:text-left mt-auto">
              MODEL: RT-77/GRC<br />
              SERNO: A5081
            </div>

          </div>

          {/* Right Transmitter Form column */}
          <div className="md:col-span-3 flex flex-col justify-between">
            
            {/* Form Title */}
            <div className="border-b border-[#3f5238]/40 pb-3 mb-5 font-mono">
              <span className="text-[9px] text-[#7da06d] font-bold tracking-widest block uppercase">
                SECURE TELE-INTERFACE SIGNAL // ENCRYPTED
              </span>
              <h3 className="font-bebas text-stone-100 text-3xl tracking-wider mt-1">
                SECTION IV // RADIO TRANSMISSION GATEWAY
              </h3>
            </div>

            {/* Main Interactive Screen Area */}
            <div className="flex-1 min-h-[250px] flex flex-col justify-center">
              {formSubmitted ? (
                /* Successful Telegram Staging Screen */
                <div className="bg-black/60 border border-[#3f5238] rounded-md p-6 font-mono text-[#7da06d] text-[11px] leading-relaxed text-center space-y-4 shadow-inner">
                  <div className="border border-[#7da06d] border-double inline-block px-3 py-1 text-sm tracking-widest font-bold uppercase animate-pulse">
                    TRANSMISSION ENGAGED
                  </div>
                  <p className="font-bold tracking-wide mt-2">
                    // ENCRYPTION PROTOCOL: AES-256 LINKED.<br />
                    // BROADCAST FREQUENCY: {signalStrength === "HIGH" ? "14.2 MHz" : signalStrength === "MED" ? "7.1 MHz" : "3.5 MHz"}.<br />
                    // DEPLOYING TRANSCEIVER PACKETS... [OK].<br />
                    // MESSAGE DELIVERED TO PORTFOLIO ARCHIVES.
                  </p>
                  <div className="text-[8px] opacity-60">
                    SENDER IDENT: {senderName}<br />
                    SECURE RETURN ADDRESS: {senderEmail}
                  </div>
                </div>
              ) : (
                /* Interactive Form Screen */
                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-[11px] text-[#7da06d]">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Name */}
                    <div>
                      <label className="block font-bold tracking-wider uppercase mb-1">
                        SENDER IDENTIFIER (NAME)
                      </label>
                      <input
                        type="text"
                        required
                        value={senderName}
                        onChange={(e) => handleInputChange(setSenderName, e.target.value)}
                        placeholder="ENTER IDENT..."
                        className="w-full bg-black/50 border border-[#3f5238] p-2.5 text-[#eae3cd] placeholder-[#7da06d]/40 focus:border-[#7da06d] focus:outline-none rounded uppercase shadow-inner text-xs"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block font-bold tracking-wider uppercase mb-1">
                        RETURN COMM ADDR (EMAIL)
                      </label>
                      <input
                        type="email"
                        required
                        value={senderEmail}
                        onChange={(e) => handleInputChange(setSenderEmail, e.target.value)}
                        placeholder="ENTER EMAIL..."
                        className="w-full bg-black/50 border border-[#3f5238] p-2.5 text-[#eae3cd] placeholder-[#7da06d]/40 focus:border-[#7da06d] focus:outline-none rounded shadow-inner text-xs"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-bold tracking-wider uppercase mb-1">
                      MEMO DETAILS (MESSAGE)
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={senderMessage}
                      onChange={(e) => handleInputChange(setSenderMessage, e.target.value)}
                      placeholder="TYPE MEMO DEBRIEF HERE..."
                      className="w-full bg-black/50 border border-[#3f5238] p-2.5 text-[#eae3cd] placeholder-[#7da06d]/40 focus:border-[#7da06d] focus:outline-none rounded uppercase resize-none shadow-inner text-xs"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 bg-[#3f5238] hover:bg-[#526a49] text-stone-100 font-bold tracking-wider transition-all border border-[#7da06d]/45 cursor-pointer uppercase shadow-md flex items-center justify-center gap-2"
                    style={{
                      boxShadow: "3px 3px 0px rgba(0,0,0,0.6)"
                    }}
                  >
                    <span>[ SEND RADIO TRANSMISSION ]</span>
                  </button>

                </form>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
