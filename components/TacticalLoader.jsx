"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import { AudioEngine } from './AudioEngine';

export default function TacticalLoader({ onFinished }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [muted, setMuted] = useState(true);
  const [stage, setStage] = useState(0);
  const [isVisited, setIsVisited] = useState(false);
  const [typingText, setTypingText] = useState('');
  const [coords, setCoords] = useState({ lat: 'N 28°36\' 12"', long: 'E 77°12\' 44"' });

  // Refs for tracking position and loop variables
  const crosshairPos = useRef({ x: 0, y: 0 });
  const lastPlayedStage = useRef(-1);
  const lastPlayedDiagIdx = useRef(-1);
  const dustParticles = useRef([]);
  const noiseCanvasRef = useRef(null);

  // Define timelines
  const timingsFull = {
    darkness: 0,
    boot: 400,
    activation: 900,
    scan: 1400,
    tracking: 2000,
    diagnostics: 2600,
    verification: 3200,
    reveal: 3700,
    shutdown: 4200,
    end: 4700
  };

  const timingsShort = {
    darkness: 0,
    verification: 200,
    reveal: 600,
    shutdown: 1100,
    end: 1500
  };

  // 1. Establish session state and dimensions on mount
  useEffect(() => {
    const visited = sessionStorage.getItem('nv_recon_visited') === 'true';
    setIsVisited(visited);

    const handleResize = () => {
      setDims({
        w: window.innerWidth,
        h: window.innerHeight
      });
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    // Generate offscreen green night-vision noise pattern once (optimized)
    const noiseCanvas = document.createElement('canvas');
    noiseCanvas.width = 128;
    noiseCanvas.height = 128;
    const nCtx = noiseCanvas.getContext('2d');
    const imgData = nCtx.createImageData(128, 128);
    for (let i = 0; i < imgData.data.length; i += 4) {
      const val = Math.floor(Math.random() * 20) + 12; // low green signal
      imgData.data[i] = 10;     // Red
      imgData.data[i+1] = val;  // Green (phosphor spike)
      imgData.data[i+2] = 10;   // Blue
      imgData.data[i+3] = 16;   // Alpha transparency
    }
    nCtx.putImageData(imgData, 0, 0);
    noiseCanvasRef.current = noiseCanvas;

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 2. Continuous Coordinate Telemetry updates
  useEffect(() => {
    const coordInterval = setInterval(() => {
      const secondsLat = Math.floor(10 + Math.random() * 50);
      const secondsLong = Math.floor(10 + Math.random() * 50);
      setCoords({
        lat: `N 28°36' ${secondsLat}"`,
        long: `E 77°12' ${secondsLong}"`
      });
    }, 300);
    return () => clearInterval(coordInterval);
  }, []);

  // 3. Typist boot effect
  useEffect(() => {
    if (stage === 1 && !isVisited) {
      const fullText = 'INITIALIZING OPTICAL SYSTEM...';
      let index = 0;
      const interval = setInterval(() => {
        setTypingText(fullText.slice(0, index + 1));
        if (!muted) {
          AudioEngine.playTick();
        }
        index++;
        if (index >= fullText.length) {
          clearInterval(interval);
        }
      }, 15);
      return () => clearInterval(interval);
    }
  }, [stage, isVisited, muted]);

  // 4. Main Timer & Canvas Animation Loop
  useEffect(() => {
    if (dims.w === 0 || dims.h === 0) return;

    const timings = isVisited ? timingsShort : timingsFull;
    const totalDuration = isVisited ? timingsShort.end : timingsFull.end;
    const startTime = performance.now();
    let animFrameId;

    // Set initial crosshair pos
    crosshairPos.current = { x: dims.w / 2, y: dims.h / 2 };

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1.0, elapsed / totalDuration);

      // Determine active stage
      let currentStage = 0;
      if (isVisited) {
        if (elapsed < timings.verification) currentStage = 0; // darkness
        else if (elapsed < timings.reveal) currentStage = 6;  // verification
        else if (elapsed < timings.shutdown) currentStage = 7; // identity reveal
        else if (elapsed < timings.end) currentStage = 8;     // CRT shutdown
        else currentStage = 9;
      } else {
        if (elapsed < timings.boot) currentStage = 0;
        else if (elapsed < timings.activation) currentStage = 1;
        else if (elapsed < timings.scan) currentStage = 2;
        else if (elapsed < timings.tracking) currentStage = 3;
        else if (elapsed < timings.diagnostics) currentStage = 4;
        else if (elapsed < timings.verification) currentStage = 5;
        else if (elapsed < timings.reveal) currentStage = 6;
        else if (elapsed < timings.shutdown) currentStage = 7;
        else if (elapsed < timings.end) currentStage = 8;
        else currentStage = 9;
      }

      setStage(currentStage);

      // 5. Sound trigger scheduler sync'd to stages
      if (currentStage !== lastPlayedStage.current) {
        lastPlayedStage.current = currentStage;
        if (!muted) {
          if (currentStage === 2) AudioEngine.playSweep(1.2);
          else if (currentStage === 3) AudioEngine.playSweep(0.8);
          else if (currentStage === 4) AudioEngine.playAlarm(); // Target vehicle warning beep
          else if (currentStage === 6) AudioEngine.playAlarm(); // Access granted alert
          else if (currentStage === 8) AudioEngine.playClick(); // mechanical power click
        }
      }

      // Finish loader when timer expires
      if (progress >= 1.0 || currentStage === 9) {
        sessionStorage.setItem('nv_recon_visited', 'true');
        onFinished && onFinished();
        return;
      }

      // Canvas Rendering Pipeline
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const dpr = window.devicePixelRatio || 1;
          canvas.width = dims.w * dpr;
          canvas.height = dims.h * dpr;
          ctx.scale(dpr, dpr);

          const w = dims.w;
          const h = dims.h;

          // Clear background (Pitch black or very dark green)
          ctx.fillStyle = currentStage === 0 ? '#000000' : '#020603';
          ctx.fillRect(0, 0, w, h);

          // Generate procedural film grain
          if (currentStage > 0 && noiseCanvasRef.current) {
            const pattern = ctx.createPattern(noiseCanvasRef.current, 'repeat');
            ctx.fillStyle = pattern;
            ctx.save();
            ctx.translate(Math.random() * 128, Math.random() * 128);
            ctx.fillRect(-128, -128, w + 256, h + 256);
            ctx.restore();
          }

          // Draw mountains/terrain silhouettes (Visible only when night vision activates)
          let scanY = null;
          if (currentStage >= 3 && currentStage <= 8 && !isVisited) {
            // Scanner sweeps down the viewport
            const scanProg = (elapsed - timings.scan) / (timings.tracking - timings.scan);
            scanY = Math.min(h, h * scanProg * 1.15); // sweep down
          }

          if (currentStage >= 2 && currentStage <= 8) {
            drawTerrain(ctx, w, h, scanY, currentStage);
          }

          // Target vehicle motion
          let vehicleX = 0;
          let vehicleY = 0;
          if (currentStage === 4 && !isVisited) {
            const trackProg = (elapsed - timings.tracking) / (timings.diagnostics - timings.tracking); // 0 to 1
            vehicleX = w * (0.2 + 0.6 * trackProg);
            // Get terrain height for vehicle alignment
            vehicleY = h * 0.74 + Math.sin(vehicleX * 0.003 - 1) * 20 + Math.cos(vehicleX * 0.008) * 8;
            
            // Render vehicle silhouette
            drawVehicle(ctx, vehicleX, vehicleY);
            
            // Add dust particles
            if (Math.random() < 0.45) {
              dustParticles.current.push({
                x: vehicleX - 12,
                y: vehicleY - 2,
                vx: -1.2 - Math.random() * 1.8,
                vy: -0.6 - Math.random() * 1.2,
                alpha: 1.0,
                size: 1 + Math.random() * 2.5
              });
            }
          }

          // Update/draw vehicle dust particles
          if (dustParticles.current.length > 0) {
            ctx.fillStyle = '#5FAF6B';
            for (let i = dustParticles.current.length - 1; i >= 0; i--) {
              const p = dustParticles.current[i];
              p.x += p.vx;
              p.y += p.vy;
              p.alpha -= 0.035;
              if (p.alpha <= 0) {
                dustParticles.current.splice(i, 1);
              } else {
                ctx.globalAlpha = p.alpha * 0.35;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
              }
            }
            ctx.globalAlpha = 1.0; // reset
          }

          // Scanning sweep beam line
          if (currentStage === 3 && scanY !== null && !isVisited) {
            ctx.strokeStyle = 'rgba(168, 230, 163, 0.75)';
            ctx.lineWidth = 1;
            ctx.shadowColor = '#A8E6A3';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.moveTo(0, scanY);
            ctx.lineTo(w, scanY);
            ctx.stroke();
            ctx.shadowBlur = 0; // reset

            ctx.fillStyle = '#A8E6A3';
            ctx.font = 'bold 8px monospace';
            ctx.fillText('SCAN_SWEEP_ACTIVE // BEAM_04', 24, scanY - 6);
          }

          // Crosshairs target lock logic
          let targetX = w / 2;
          let targetY = h / 2;

          if (currentStage === 4 && !isVisited) {
            // Lock on target vehicle coordinates
            targetX = vehicleX;
            targetY = vehicleY - 5;
          } else if (currentStage >= 5 && currentStage <= 7) {
            // Return to center
            targetX = w / 2;
            targetY = h / 2;
          } else {
            // Idle circular camera drift
            const ms = Date.now();
            targetX = w / 2 + Math.sin(ms * 0.002) * 12;
            targetY = h / 2 + Math.cos(ms * 0.0016) * 12;
          }

          // Smooth lerp crosshairs movement
          crosshairPos.current.x += (targetX - crosshairPos.current.x) * 0.09;
          crosshairPos.current.y += (targetY - crosshairPos.current.y) * 0.09;

          if (currentStage >= 2 && currentStage <= 7) {
            drawCrosshair(ctx, crosshairPos.current.x, crosshairPos.current.y, currentStage);
          }

          // Sequential checkmark audio ticks inside diagnostics state
          if (currentStage === 5 && !isVisited) {
            const diagProg = (elapsed - timings.diagnostics) / (timings.verification - timings.diagnostics);
            const activeDiagCount = Math.min(5, Math.floor(diagProg * 6));
            if (activeDiagCount > lastPlayedDiagIdx.current && activeDiagCount > 0) {
              if (!muted) {
                AudioEngine.playTick();
              }
              lastPlayedDiagIdx.current = activeDiagCount;
            }
          }

          // CRT Shut-off animation sequence (Phase 8)
          if (currentStage === 8) {
            const shutdownProg = (elapsed - timings.shutdown) / (timings.end - timings.shutdown);
            ctx.fillStyle = '#A8E6A3';
            if (shutdownProg < 0.6) {
              // collapse vertical dimension into a green scan line
              const scaleY = 1 - (shutdownProg / 0.6);
              ctx.save();
              ctx.translate(w / 2, h / 2);
              ctx.scale(1, scaleY);
              ctx.fillRect(-w / 2, -1.5, w, 3);
              ctx.restore();
            } else {
              // collapse horizontally into a central phosphor dot
              const scaleX = 1 - ((shutdownProg - 0.6) / 0.4);
              ctx.save();
              ctx.translate(w / 2, h / 2);
              ctx.beginPath();
              ctx.arc(0, 0, Math.max(0.1, scaleX * 10), 0, Math.PI * 2);
              ctx.fill();
              ctx.restore();
            }
          }
        }
      }

      animFrameId = requestAnimationFrame(tick);
    };

    animFrameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animFrameId);
  }, [dims, isVisited, muted]);

  // 6. Terrain outline drawing helper
  const drawTerrain = (ctx, w, h, scanY, currentStage) => {
    const curves = [
      {
        hFactor: 0.55,
        freqX1: 0.002,
        freqX2: 0.007,
        amp1: 45,
        amp2: 12,
        color: '#030804', // shadow background layer
        colorHighlight: '#061308',
        stroke: 'rgba(95, 175, 107, 0.08)'
      },
      {
        hFactor: 0.64,
        freqX1: 0.005,
        freqX2: 0.01,
        amp1: 30,
        amp2: 10,
        color: '#051107', // midground hills
        colorHighlight: '#0e3015',
        stroke: 'rgba(95, 175, 107, 0.2)'
      },
      {
        hFactor: 0.74,
        freqX1: 0.003,
        freqX2: 0.008,
        amp1: 20,
        amp2: 7,
        color: '#07150B', // foreground road/hills
        colorHighlight: '#194d21',
        stroke: 'rgba(95, 175, 107, 0.45)'
      }
    ];

    curves.forEach((c) => {
      const getCurveY = (x) => {
        return h * c.hFactor + Math.sin(x * c.freqX1) * c.amp1 + Math.cos(x * c.freqX2) * c.amp2;
      };

      // Base terrain drawing
      ctx.fillStyle = c.color;
      ctx.strokeStyle = c.stroke;
      ctx.lineWidth = 1;

      ctx.beginPath();
      ctx.moveTo(0, h);
      for (let x = 0; x <= w; x += 10) {
        ctx.lineTo(x, getCurveY(x));
      }
      ctx.lineTo(w, h);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Bright sweep highlight clipped around scan sweep line
      if (currentStage === 3 && scanY !== null) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, scanY - 55, w, 110);
        ctx.clip();

        ctx.fillStyle = c.colorHighlight;
        ctx.strokeStyle = '#A8E6A3';
        ctx.lineWidth = 1.2;

        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 10) {
          ctx.lineTo(x, getCurveY(x));
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.restore();
      }
    });
  };

  // 7. Tactical target vehicle design
  const drawVehicle = (ctx, x, y) => {
    ctx.save();
    ctx.translate(x, y - 5);

    ctx.fillStyle = '#030804';
    ctx.strokeStyle = '#5FAF6B';
    ctx.lineWidth = 1;

    // Rover body frame
    ctx.beginPath();
    ctx.rect(-12, -3, 24, 6);
    ctx.fill();
    ctx.stroke();

    // Cabin shell
    ctx.beginPath();
    ctx.moveTo(-8, -3);
    ctx.lineTo(-5, -8);
    ctx.lineTo(6, -8);
    ctx.lineTo(9, -3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Antenna vector
    ctx.beginPath();
    ctx.moveTo(-6, -8);
    ctx.lineTo(-9, -15);
    ctx.stroke();

    // Wheels
    ctx.fillStyle = '#020603';
    ctx.beginPath();
    ctx.arc(-7, 3, 3, 0, Math.PI * 2);
    ctx.arc(7, 3, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Blinking IR tracking beacon
    const blink = Math.floor(Date.now() / 200) % 2 === 0;
    ctx.fillStyle = blink ? '#A8E6A3' : '#07150B';
    ctx.beginPath();
    ctx.arc(3, -8, 1.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  };

  // 8. Custom surveillance HUD crosshair overlay
  const drawCrosshair = (ctx, cx, cy, currentStage) => {
    ctx.save();
    ctx.strokeStyle = '#5FAF6B';
    ctx.lineWidth = 1;

    // Small interior index marks
    ctx.beginPath();
    ctx.moveTo(cx - 12, cy); ctx.lineTo(cx - 4, cy);
    ctx.moveTo(cx + 4, cy); ctx.lineTo(cx + 12, cy);
    ctx.moveTo(cx, cy - 12); ctx.lineTo(cx, cy - 4);
    ctx.moveTo(cx, cy + 4); ctx.lineTo(cx, cy + 12);
    ctx.stroke();

    // Sleek brackets
    const size = 26;
    ctx.beginPath();
    // Top Left
    ctx.moveTo(cx - size, cy - size + 6); ctx.lineTo(cx - size, cy - size); ctx.lineTo(cx - size + 6, cy - size);
    // Top Right
    ctx.moveTo(cx + size, cy - size + 6); ctx.lineTo(cx + size, cy - size); ctx.lineTo(cx + size - 6, cy - size);
    // Bottom Left
    ctx.moveTo(cx - size, cy + size - 6); ctx.lineTo(cx - size, cy + size); ctx.lineTo(cx - size + 6, cy + size);
    // Bottom Right
    ctx.moveTo(cx + size, cy + size - 6); ctx.lineTo(cx + size, cy + size); ctx.lineTo(cx + size - 6, cy + size);
    ctx.stroke();

    // Double target locking dashes
    if (currentStage === 4) {
      ctx.strokeStyle = '#A8E6A3';
      ctx.lineWidth = 0.5;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.rect(cx - 20, cy - 16, 40, 26);
      ctx.stroke();
      ctx.setLineDash([]); // clear dash

      ctx.fillStyle = '#A8E6A3';
      ctx.font = 'bold 8px monospace';
      ctx.fillText('TARGET LOCK // TRCK_01', cx + 28, cy - 10);
      ctx.fillText('SPEED: 14 KM/H', cx + 28, cy);
    }

    ctx.restore();
  };

  const toggleMute = () => {
    const nextMute = !muted;
    setMuted(nextMute);
    AudioEngine.setMuted(nextMute);
    if (!nextMute) {
      AudioEngine.playClick();
    }
  };

  // Diagnostics check list sequence logic
  const diagnosticsList = [
    'OPTICAL SYSTEM ONLINE',
    'TERRAIN SCAN COMPLETE',
    'NAVIGATION ONLINE',
    'SIGNAL SECURE',
    'PORTFOLIO CORE READY'
  ];

  const getDiagnosticsToShow = () => {
    if (isVisited) return diagnosticsList;
    if (stage < 5) return [];
    if (stage > 5) return diagnosticsList;
    
    // stage === 5: animate checkmarks sequentially
    const timings = timingsFull;
    const elapsed = performance.now() - (window.performance.timeOrigin || Date.now()); // fallback elapsed approximation
    const activeTime = timings.verification - timings.diagnostics;
    
    // We can also approximate progress using ref timings inside animation frame
    return diagnosticsList.slice(0, lastPlayedDiagIdx.current);
  };

  const activeDiagnostics = getDiagnosticsToShow();

  // Reduced motion bypass hook
  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      onFinished && onFinished();
    }
  }, [onFinished]);

  return (
    <AnimatePresence>
      {stage < 9 && (
        <motion.div
          ref={containerRef}
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="fixed inset-0 bg-[#020603] text-neutral-200 z-[1000] flex flex-col items-center justify-center font-mono overflow-hidden select-none crt-flicker screen-glow transition-hud nv-scanlines"
        >
          {/* Main Night-Vision Canvas Grid */}
          <canvas
            ref={canvasRef}
            style={{ width: '100vw', height: '100vh' }}
            className="absolute inset-0 z-10"
          />

          {/* Radial darkness vignette mask */}
          {stage >= 2 && <div className="nv-vignette" />}

          {/* HUD Mute/Unmute sound controls */}
          <button
            onClick={toggleMute}
            className="absolute top-6 right-6 border border-hud-dim bg-black/60 text-hud-primary px-3 py-1.5 rounded-sm flex items-center space-x-2 text-[10px] uppercase font-bold tracking-widest cursor-pointer hover:bg-hud-primary/10 transition-all z-40"
          >
            {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 animate-pulse" />}
            <span>{muted ? "AUDIO_OFF" : "AUDIO_ON"}</span>
          </button>

          {/* Float dynamic coordinates block floating near target tracker */}
          {stage === 4 && !isVisited && (
            <div
              style={{
                left: `${crosshairPos.current.x + 28}px`,
                top: `${crosshairPos.current.y + 12}px`
              }}
              className="absolute text-[8px] font-mono text-hud-primary/75 tracking-wider hidden md:block select-none pointer-events-none z-30"
            >
              <div>SYS.GRID: 43Q-ND</div>
              <div>LAT: {coords.lat}</div>
              <div>LNG: {coords.long}</div>
            </div>
          )}

          {/* HUD Top Left corner mark */}
          {stage >= 2 && stage <= 7 && (
            <div className="absolute top-6 left-6 text-[10px] text-hud-primary/65 flex flex-col z-30 leading-normal">
              <span className="font-bold tracking-[0.2em] font-display">NV-07 OPTICAL SYSTEM</span>
              <span className="text-[8px] opacity-50 tracking-[0.1em] mt-0.5">SECURE RECONNAISSANCE BEAM</span>
            </div>
          )}

          {/* HUD Top Center target alarm info */}
          {stage === 4 && !isVisited && (
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-hud-primary/10 border border-hud-primary/30 px-3 py-1.5 rounded-sm text-[10px] font-bold text-hud-highlight tracking-[0.2em] animate-pulse z-30 text-center">
              ⚠️ MOVEMENT DETECTED // OPTICAL TARGET ACQUIRED
            </div>
          )}

          {/* HUD Bottom Left operational marks */}
          {stage >= 2 && stage <= 7 && (
            <div className="absolute bottom-6 left-6 text-[9px] text-hud-primary/55 font-mono flex flex-col space-y-0.5 z-30 select-none">
              <span>OPTICAL SCANNER: ONLINE</span>
              <span>TERRAIN MAPPING: ACTIVE</span>
              <span>UHF NAVIGATION: ONLINE</span>
            </div>
          )}

          {/* HUD Bottom Right stats block */}
          {stage >= 2 && stage <= 7 && (
            <div className="absolute bottom-6 right-6 text-[9px] text-hud-primary/55 text-right font-mono flex flex-col space-y-0.5 z-30 select-none">
              <span>SIGNAL LOCK: █████████░ 92%</span>
              <span>SYS POWER: LITH-V // 14.4V</span>
              <span>COVERT HUDBEAM v6.1.0</span>
            </div>
          )}

          {/* Phase 1: Typing text boot message (Optical initialization) */}
          {stage === 1 && !isVisited && (
            <div className="absolute bottom-12 left-10 text-[11px] font-mono text-hud-primary tracking-widest uppercase select-none pointer-events-none z-30">
              <span>{typingText}</span>
              <span className="w-1.5 h-3.5 bg-hud-primary inline-block ml-1 blink-cursor align-middle" />
            </div>
          )}

          {/* Phase 5: Sequential Diagnostics checks */}
          {stage === 5 && !isVisited && (
            <div className="absolute top-[32%] left-6 z-30 flex flex-col space-y-2 border border-hud-dim/20 bg-[#020603]/85 p-4 rounded-sm min-w-[240px] shadow-[0_0_12px_rgba(0,0,0,0.8)]">
              <div className="text-[9px] text-hud-primary/45 font-bold uppercase tracking-widest mb-1.5 border-b border-hud-dim/15 pb-1">
                SYSTEM DIAGNOSTIC RUN
              </div>
              {diagnosticsList.map((diag, index) => {
                const isPassed = activeDiagnostics.includes(diag);
                return (
                  <div
                    key={index}
                    className={`flex items-center space-x-2 text-[10px] font-bold tracking-widest font-mono transition-opacity duration-200 ${isPassed ? 'text-hud-primary' : 'text-hud-primary/30'}`}
                  >
                    <span>{isPassed ? '[✓]' : '[ ]'}</span>
                    <span>{diag}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Phase 6 & 7: Target Identification & Verification card */}
          {stage >= 6 && stage <= 7 && (
            <div className="absolute top-[35%] left-1/2 -translate-x-1/2 text-center font-mono z-30 w-[90%] max-w-sm bg-[#020603]/90 border border-hud-dim p-6 rounded-sm shadow-[0_0_20px_rgba(2,6,3,0.95)]">
              {/* Top border brackets decorations */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-hud-primary" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-hud-primary" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-hud-primary" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-hud-primary" />

              <div className="text-[9px] text-hud-primary/50 font-bold uppercase tracking-widest mb-2">
                VERIFICATION TELEMETRY
              </div>

              {stage === 6 ? (
                <div className="space-y-1">
                  <h2 className="text-sm md:text-md font-bold tracking-[0.25em] text-hud-highlight uppercase animate-pulse">
                    IDENTITY VERIFIED
                  </h2>
                  <p className="text-[9px] tracking-widest text-hud-primary/40 uppercase">
                    SYS ACCESS CLEARANCE: LEVEL V APPROVED
                  </p>
                </div>
              ) : (
                <div className="space-y-2 animate-[fade-in_0.35s_ease-out]">
                  <h2 className="text-xl md:text-2xl font-bold tracking-[0.25em] text-hud-highlight font-display uppercase text-glow">
                    ANIMESH TIWARI
                  </h2>
                  <p className="text-[10px] tracking-[0.3em] text-neutral-300 font-mono font-bold uppercase">
                    FULL-STACK DEVELOPER
                  </p>
                  <div className="text-[9px] text-hud-primary/75 mt-4 tracking-widest border-t border-dashed border-hud-dim/25 pt-2 font-mono">
                    SEC_UPLINK: SYSTEM ONLINE
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
