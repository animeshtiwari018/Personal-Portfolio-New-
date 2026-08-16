"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

export default function TheLineWeHold() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Global parallax transforms
  const yHero = useTransform(scrollYProgress, [0, 0.1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.08], [1, 0]);
  
  return (
    <main ref={containerRef} className="relative bg-[#0a0a0a] text-zinc-300 min-h-screen font-sans selection:bg-red-900/50 selection:text-white">
      <div className="film-grain"></div>

      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden flex flex-col justify-between">
        <motion.div 
          style={{ y: yHero, scale: 1.05 }} 
          className="absolute inset-0 z-0"
        >
          <Image 
            src="/images/hero_bg_1786901890827.png" 
            alt="Soldier at the border" 
            fill 
            className="object-cover object-center" 
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0a0a0a] opacity-90"></div>
          <div className="absolute inset-0 bg-black/30"></div>
        </motion.div>

        <header className="relative z-10 w-full p-8 md:p-12 flex justify-between items-start">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-xs tracking-[0.3em] font-medium text-white/70"
          >
            THE LINE WE HOLD
          </motion.h2>
        </header>

        <motion.div 
          style={{ opacity: opacityHero }}
          className="relative z-10 w-full p-8 md:p-12 flex flex-col md:flex-row justify-between items-end pb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter text-white mb-4">
              Some borders <br /> are held in silence.
            </h1>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="hidden md:flex flex-col items-center gap-4"
          >
            <span className="text-xs tracking-widest rotate-90 mb-8 opacity-50">SCROLL</span>
            <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* 2. INTRO SECTION */}
      <section className="relative min-h-screen w-full flex items-center justify-center py-32 px-8 bg-[#0a0a0a]">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <motion.h2 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-100"
          >
            NOT EVERY BATTLE <br /> MAKES THE NEWS.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            Defence is not always about combat. Sometimes it is simply about watching, waiting, protecting, and being ready. The strongest defence is often the quietest one.
          </motion.p>
        </div>
      </section>

      {/* 3. THE BORDER SECTION (Topographic Map) */}
      <section className="relative h-[120vh] w-full bg-[#0d0f0c] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-radial-gradient(circle at 0 0, transparent 0, #0d0f0c 40px), repeating-linear-gradient(#252a2255, #252a2255)' }}>
           {/* Placeholder for SVG Topo lines */}
           <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <path d="M0,200 Q200,300 400,100 T800,200 T1200,100 T1600,300" fill="none" stroke="#3f4a38" strokeWidth="1" className="opacity-50" />
              <path d="M0,250 Q200,350 400,150 T800,250 T1200,150 T1600,350" fill="none" stroke="#3f4a38" strokeWidth="1" className="opacity-30" />
              <path d="M0,300 Q200,400 400,200 T800,300 T1200,200 T1600,400" fill="none" stroke="#3f4a38" strokeWidth="1" className="opacity-20" />
           </svg>
        </div>
        
        {/* Animated Map Line */}
        <motion.div 
          className="absolute h-[2px] bg-red-800/80 w-full top-1/2 shadow-[0_0_10px_rgba(153,27,27,0.8)]"
          initial={{ scaleX: 0, transformOrigin: "left" }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 3, ease: "easeInOut" }}
          viewport={{ once: true }}
        />

        <div className="relative z-10 p-12 w-full h-full flex flex-col justify-between pointer-events-none">
          <div className="text-zinc-500 font-mono text-xs flex justify-between w-full uppercase">
            <span>Sector 07</span>
            <span>Altitude 4,892M</span>
            <span>Time 04:37</span>
          </div>
          
          <div className="max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold text-zinc-200 mb-6 uppercase"
            >
              A line you can't see.
            </motion.h2>
          </div>

          <div className="text-zinc-500 font-mono text-xs flex justify-between w-full uppercase">
            <span>Visibility 62%</span>
            <span>Temp -07°C</span>
          </div>
        </div>
      </section>

      {/* 4. THE WATCH SECTION */}
      <section className="relative h-screen w-full flex items-center justify-start overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/watch_bg_1786901928024.png" 
            alt="Soldier standing watch before sunrise" 
            fill 
            className="object-cover object-left md:object-center opacity-80" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent"></div>
        </div>

        <div className="relative z-10 p-8 md:p-16 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tight">Hours before sunrise.</h2>
            <p className="text-xl text-zinc-300">The world is asleep. Someone isn't.</p>
            
            <div className="grid grid-cols-2 gap-4 pt-8 border-t border-zinc-800/50 mt-8 font-mono text-sm text-zinc-400">
              <div>
                <span className="block text-zinc-600 text-xs mb-1">TIME</span>
                04:37 AM
              </div>
              <div>
                <span className="block text-zinc-600 text-xs mb-1">TEMPERATURE</span>
                -07°C
              </div>
              <div>
                <span className="block text-zinc-600 text-xs mb-1">VISIBILITY</span>
                LOW
              </div>
              <div>
                <span className="block text-zinc-600 text-xs mb-1">WIND</span>
                18 KM/H
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 5. THE PEOPLE SECTION */}
      <section className="relative min-h-screen w-full bg-[#0a0a0a] py-32 px-8 flex flex-col md:flex-row items-center justify-center gap-16">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="relative w-full md:w-1/2 aspect-[4/5] rounded-sm overflow-hidden"
        >
          <Image 
            src="/images/people_bg_1786902030408.png" 
            alt="Soldier looking at a photograph" 
            fill 
            className="object-cover"
          />
          <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(10,10,10,0.8)]"></div>
        </motion.div>

        <div className="w-full md:w-1/2 max-w-xl space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-xs tracking-[0.2em] text-zinc-500 mb-4">BEHIND EVERY UNIFORM</h3>
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-200 uppercase leading-tight">
              Before they are soldiers, they are someone's son.
            </h2>
          </motion.div>

          <div className="space-y-8">
            {[
              { title: "THE SOLDIER", desc: "The person behind the uniform, carrying the weight of duty." },
              { title: "THE FAMILY", desc: "The silent strength of those who wait at home." },
              { title: "THE LETTER", desc: "Memories carried from home, read a hundred times." }
            ].map((card, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 + (i * 0.2) }}
                viewport={{ once: true }}
                className="border-l border-zinc-800 pl-6"
              >
                <h4 className="text-lg font-bold text-zinc-300 tracking-wide mb-2">{card.title}</h4>
                <p className="text-sm text-zinc-500">{card.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. THE TERRAIN SECTION */}
      <section className="relative py-32 bg-[#0a0a0a] overflow-hidden">
        <div className="px-8 mb-16">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-bold uppercase text-center text-zinc-200"
          >
            The Land Fights Back
          </motion.h2>
        </div>
        
        <div className="flex gap-4 px-8 overflow-x-auto hide-scrollbar pb-8 snap-x snap-mandatory">
          {[
            { name: "HIMALAYAS", img: "/images/terrain_himalayas_1786902052066.png" },
            { name: "DESERT", img: "/images/terrain_himalayas_1786902052066.png", filter: "hue-rotate(30deg) sepia(0.3)" }, // Re-using himalayas with CSS filter for placeholder
            { name: "FOREST", img: "/images/terrain_himalayas_1786902052066.png", filter: "hue-rotate(90deg) brightness(0.6)" },
            { name: "SNOW", img: "/images/terrain_himalayas_1786902052066.png", filter: "grayscale(0.8) brightness(1.2)" }
          ].map((terrain, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
              className="relative min-w-[80vw] md:min-w-[40vw] aspect-video rounded-sm overflow-hidden snap-center flex-shrink-0"
            >
              <Image 
                src={terrain.img} 
                alt={terrain.name} 
                fill 
                className="object-cover opacity-80"
                style={{ filter: terrain.filter }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-bold tracking-widest uppercase text-white">{terrain.name}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 7. THE TECHNOLOGY SECTION */}
      <section className="relative h-screen w-full flex items-center justify-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="/images/technology_bg_1786902074102.png" 
            alt="Command Center" 
            fill 
            className="object-cover opacity-60" 
          />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent"></div>
        </div>

        <div className="relative z-10 p-8 md:p-16 max-w-xl text-right">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="space-y-6"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white uppercase tracking-tight">The border changed. <br/> The watch didn't.</h2>
            <p className="text-lg text-zinc-400">Modern defence combines human discipline with advanced surveillance. But the duty remains the same.</p>
          </motion.div>
        </div>
      </section>

      {/* 8. THE SILENCE SECTION */}
      <section className="relative h-[80vh] w-full bg-black flex items-center justify-center">
        <div className="max-w-4xl px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 2 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white/90 uppercase"
          >
            {"Silence is not the absence of duty.".split(" ").map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1, delay: i * 0.4 }}
                viewport={{ once: true }}
                className="inline-block mr-[0.3em]"
              >
                {word}
              </motion.span>
            ))}
          </motion.h2>
        </div>
      </section>

      {/* 9. DAWN SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 3 }}
          viewport={{ once: true, margin: "-200px" }}
        >
          <Image 
            src="/images/dawn_bg_1786902218529.png" 
            alt="Sunrise at the border" 
            fill 
            className="object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
        </motion.div>

        <div className="relative z-10 pt-32 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 1 }}
            viewport={{ once: true }}
            className="text-2xl md:text-4xl font-bold tracking-[0.2em] text-white/80 uppercase drop-shadow-lg"
          >
            A New Day
          </motion.h2>
        </div>
      </section>

      {/* 10. FINAL SECTION & FOOTER */}
      <section className="relative bg-[#0a0a0a] flex flex-col items-center justify-center py-32 min-h-[60vh]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
          className="text-center space-y-6"
        >
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter uppercase text-white">
            The Line We Hold
          </h1>
          <p className="text-xl text-zinc-500 font-sans italic">
            Some borders are held in silence.
          </p>
          
          <div className="pt-16 pb-8 text-xs font-mono text-zinc-600 tracking-[0.2em]">
            INDIA &middot; DUTY &middot; 04:37 &rarr; 06:12
          </div>

          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-8 px-8 py-3 border border-zinc-800 text-zinc-400 text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-colors duration-500"
          >
            Explore Again
          </button>
        </motion.div>

        <footer className="absolute bottom-0 w-full p-8 flex flex-col md:flex-row justify-between items-center text-xs text-zinc-700 font-sans border-t border-zinc-900 mt-16">
          <span>&copy; 2026 &middot; THE LINE WE HOLD</span>
          <span className="mt-4 md:mt-0 text-center">A visual study of duty, silence and the people behind the uniform.</span>
          <span className="mt-4 md:mt-0">INDIA</span>
        </footer>
      </section>
    </main>
  );
}
