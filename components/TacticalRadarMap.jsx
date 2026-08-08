"use client";

import React, { useRef, useEffect, useState } from 'react';
import { Compass } from 'lucide-react';
import { AudioEngine } from './AudioEngine';

export default function TacticalRadarMap({ operations = [], onSelectOperation, selectedOpId }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 300, height: 300 });
  const [hoveredBlip, setHoveredBlip] = useState(null);
  
  // Angle for radar sweep line (in radians)
  const sweepAngleRef = useRef(0);
  // Store blip screen coordinates for hover/click detection
  const blipsCoordsRef = useRef([]);

  // Mock radar blips representing operation coordinates
  // OP-01 Cloud Shrike (Go/K8s/gRPC/AWS), OP-02 Neural Shield (Python/TensorFlow/Kafka), OP-03 Ghost Protocol (TS/Native/WebRTC/Rust)
  const blipConfig = [
    { id: 'op-01', r: 0.45, theta: 1.1, label: 'CLD_SRK' }, // radius factor, angle in rad
    { id: 'op-02', r: 0.65, theta: 2.8, label: 'NRL_SHD' },
    { id: 'op-03', r: 0.82, theta: 4.9, label: 'GST_PRT' }
  ];

  // Set canvas dimension based on parent size
  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        // Make it square based on width
        const size = Math.min(400, Math.max(260, width));
        setDimensions({ width: size, height: size });
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, []);

  // Main canvas animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animFrameId;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = dimensions.width * dpr;
    canvas.height = dimensions.height * dpr;
    ctx.scale(dpr, dpr);

    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    const maxRadius = (dimensions.width / 2) - 15;

    // Get color theme values from CSS variables
    const getStyleColor = (varName, fallback) => {
      if (typeof window === 'undefined') return fallback;
      return getComputedStyle(document.documentElement).getPropertyValue(varName).trim() || fallback;
    };

    const runAnimation = () => {
      // Clear canvas
      ctx.clearRect(0, 0, dimensions.width, dimensions.height);

      // Color palette from current CSS HUD variables
      const primaryColor = getStyleColor('--hud-primary', '#22c55e');
      const accentColor = getStyleColor('--hud-accent', '#15803d');
      const glowColor = getStyleColor('--hud-glow', 'rgba(34, 197, 94, 0.12)');

      // Increment sweep angle
      sweepAngleRef.current = (sweepAngleRef.current + 0.015) % (Math.PI * 2);

      // 1. Draw Concentric Grid Rings
      ctx.strokeStyle = accentColor;
      ctx.lineWidth = 0.5;
      
      const rings = [0.25, 0.5, 0.75, 1.0];
      rings.forEach(ring => {
        ctx.beginPath();
        ctx.arc(centerX, centerY, maxRadius * ring, 0, Math.PI * 2);
        ctx.strokeStyle = ring === 1.0 ? primaryColor : `${accentColor}35`; // 35 opacity for inner rings
        ctx.stroke();
      });

      // 2. Draw Crosshair lines
      ctx.strokeStyle = `${accentColor}30`;
      ctx.beginPath();
      // Horizontal
      ctx.moveTo(10, centerY);
      ctx.lineTo(dimensions.width - 10, centerY);
      // Vertical
      ctx.moveTo(centerX, 10);
      ctx.lineTo(centerX, dimensions.height - 10);
      ctx.stroke();

      // Small angle ticks
      ctx.strokeStyle = `${accentColor}40`;
      for (let a = 0; a < Math.PI * 2; a += Math.PI / 4) {
        ctx.beginPath();
        const startX = centerX + Math.cos(a) * (maxRadius - 5);
        const startY = centerY + Math.sin(a) * (maxRadius - 5);
        const endX = centerX + Math.cos(a) * maxRadius;
        const endY = centerY + Math.sin(a) * maxRadius;
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // 3. Draw Radar Rotating Sweep
      const sweepGradient = ctx.createConicGradient(sweepAngleRef.current, centerX, centerY);
      sweepGradient.addColorStop(0, `${primaryColor}40`);   // bright sweep leading edge
      sweepGradient.addColorStop(0.1, `${primaryColor}15`); // fade
      sweepGradient.addColorStop(0.4, `${primaryColor}00`); // transparent trailing edge
      
      ctx.fillStyle = sweepGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius, 0, Math.PI * 2);
      ctx.fill();

      // Leading sweep line
      const sweepX = centerX + Math.cos(sweepAngleRef.current) * maxRadius;
      const sweepY = centerY + Math.sin(sweepAngleRef.current) * maxRadius;
      ctx.strokeStyle = `${primaryColor}80`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(sweepX, sweepY);
      ctx.stroke();

      // 4. Calculate, Draw and Store Blips coords
      const calculatedCoords = [];
      
      blipConfig.forEach(cfg => {
        const blipRadius = maxRadius * cfg.r;
        const bx = centerX + Math.cos(cfg.theta) * blipRadius;
        const by = centerY + Math.sin(cfg.theta) * blipRadius;
        
        calculatedCoords.push({
          id: cfg.id,
          x: bx,
          y: by,
          label: cfg.label
        });

        // Determine if blip is highlighted (either hovered or active via tab selections)
        const isHovered = hoveredBlip === cfg.id;
        const isSelected = selectedOpId === cfg.id;
        
        // Draw blip target rings
        if (isSelected || isHovered) {
          ctx.strokeStyle = primaryColor;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(bx, by, isSelected ? 12 : 8, 0, Math.PI * 2);
          ctx.stroke();

          // Outer pulsing ring
          if (isSelected) {
            const pulse = 12 + Math.sin(Date.now() / 150) * 4;
            ctx.strokeStyle = `${primaryColor}35`;
            ctx.beginPath();
            ctx.arc(bx, by, pulse, 0, Math.PI * 2);
            ctx.stroke();
          }
        }

        // Draw the core glowing blip dot
        ctx.fillStyle = isSelected || isHovered ? primaryColor : `${primaryColor}cc`;
        ctx.shadowColor = primaryColor;
        ctx.shadowBlur = isSelected || isHovered ? 12 : 4;
        ctx.beginPath();
        ctx.arc(bx, by, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0; // reset

        // Label text next to blip
        ctx.fillStyle = isSelected || isHovered ? primaryColor : `${primaryColor}80`;
        ctx.font = 'bold 8px monospace';
        ctx.fillText(cfg.label, bx + 8, by - 4);
      });

      blipsCoordsRef.current = calculatedCoords;

      // 5. Draw Compass markings (N, E, S, W)
      ctx.fillStyle = `${primaryColor}95`;
      ctx.font = 'bold 9px var(--font-display)';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('N', centerX, centerY - maxRadius - 8);
      ctx.fillText('S', centerX, centerY + maxRadius + 8);
      ctx.fillText('E', centerX + maxRadius + 8, centerY);
      ctx.fillText('W', centerX - maxRadius - 8, centerY);

      // Radar watermark data
      ctx.fillStyle = `${primaryColor}40`;
      ctx.font = '7px monospace';
      ctx.textAlign = 'left';
      ctx.fillText(`SWEEP_HZ: ${(1.5).toFixed(2)}`, 12, dimensions.height - 10);
      ctx.textAlign = 'right';
      ctx.fillText(`BLIPS: ${operations.length}`, dimensions.width - 12, dimensions.height - 10);

      animFrameId = requestAnimationFrame(runAnimation);
    };

    animFrameId = requestAnimationFrame(runAnimation);
    return () => cancelAnimationFrame(animFrameId);
  }, [dimensions, operations, hoveredBlip, selectedOpId]);

  // Event handlers
  const handleMouseMove = (e) => {
    if (!canvasRef.current) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Detect if mouse cursor is within 15px range of any stored blip coords
    let foundId = null;
    for (let blip of blipsCoordsRef.current) {
      const distance = Math.hypot(blip.x - x, blip.y - y);
      if (distance < 16) {
        foundId = blip.id;
        break;
      }
    }

    if (foundId !== hoveredBlip) {
      setHoveredBlip(foundId);
      if (foundId) {
        AudioEngine.playHover();
      }
    }
  };

  const handleMouseLeave = () => {
    setHoveredBlip(null);
  };

  const handleCanvasClick = () => {
    if (hoveredBlip) {
      AudioEngine.playClick();
      if (onSelectOperation) {
        onSelectOperation(hoveredBlip);
      }
    }
  };

  // Find operations data associated with hovered blip
  const activeOp = operations.find(op => op.id === (hoveredBlip || selectedOpId));

  return (
    <div 
      ref={containerRef} 
      className="border border-hud-dim glass-panel p-4 rounded-sm flex flex-col items-center justify-between relative shadow-hud-glow select-none"
    >
      {/* Corner Brackets */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-hud-primary" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-hud-primary" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-hud-primary" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-hud-primary" />

      {/* Header */}
      <div className="w-full flex justify-between items-center border-b border-hud-dim/15 pb-2 mb-2">
        <h4 className="text-[10px] font-bold tracking-widest text-hud-primary flex items-center space-x-1.5 font-display">
          <Compass className="w-3.5 h-3.5 blink-tactical" />
          <span>COORDINATES SCANNER</span>
        </h4>
        <span className="text-[8px] font-mono text-hud-primary/60">ACTIVE_THEATER</span>
      </div>

      {/* Canvas Radar */}
      <div className="relative cursor-crosshair">
        <canvas 
          ref={canvasRef} 
          style={{ width: `${dimensions.width}px`, height: `${dimensions.height}px` }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleCanvasClick}
          className="block z-10 relative"
        />
        
        {/* Absolute center ring decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full border border-hud-primary/30 pointer-events-none" />
      </div>

      {/* Radar Target Overlay Card */}
      <div className="w-full mt-3 border border-hud-dim/10 bg-black/45 p-2 rounded-sm min-h-[48px] flex flex-col justify-center">
        {activeOp ? (
          <div>
            <div className="flex justify-between items-center">
              <span className="text-[9px] font-bold tracking-widest text-hud-primary flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-hud-primary blink-tactical" />
                <span>{activeOp.codename}</span>
              </span>
              <span className="text-[8px] text-hud-primary/80 font-bold bg-hud-primary/10 border border-hud-primary/20 px-1.5 py-0.5 rounded-sm">
                TARGET FOUND
              </span>
            </div>
            <div className="text-[8px] text-hud-primary/60 mt-1 uppercase font-mono tracking-wider truncate">
              OBJ: {activeOp.objective}
            </div>
          </div>
        ) : (
          <div className="text-center">
            <span className="text-[9px] text-hud-primary/40 uppercase tracking-widest font-mono blink-tactical">
              Waiting for target selection...
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
