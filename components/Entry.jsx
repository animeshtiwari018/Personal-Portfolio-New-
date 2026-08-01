"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Entry() {
  const [granted, setGranted] = useState(false);
  const [scan, setScan] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setScan(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="entry" style={{ position: 'relative', width: '100%', height: '100vh', backgroundColor: 'var(--bg-primary)', overflow: 'hidden' }}>
      <AnimatePresence>
        {!granted && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
            style={{ position: 'absolute', inset: 0, zIndex: 100, backgroundColor: 'var(--bg-primary)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
          >
            {/* Horizontal Scan Line */}
            {scan && (
              <motion.div 
                initial={{ top: '0%' }}
                animate={{ top: '100%' }}
                transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
                style={{ position: 'absolute', left: 0, right: 0, height: '2px', backgroundColor: 'var(--accent-amber)', boxShadow: '0 0 20px var(--accent-amber)', zIndex: 101, opacity: 0.5 }}
              />
            )}
            
            <div style={{ textAlign: 'center' }}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: scan ? 1 : 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="text-mono"
                style={{ color: 'var(--text-dim)', marginBottom: '1rem' }}
              >
                RESTRICTED ACCESS
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: scan ? 1 : 0 }}
                transition={{ duration: 1, delay: 1.5 }}
                className="text-mono"
                style={{ color: 'var(--accent-military)', fontSize: '1.5rem', marginBottom: '4rem', fontWeight: 'bold' }}
              >
                AUTHORIZATION ACCEPTED
              </motion.div>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: scan ? 1 : 0 }}
                transition={{ duration: 1, delay: 2.5 }}
                onClick={() => setGranted(true)}
                className="engraved-btn"
              >
                ENTER FACILITY
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Actual Hero Content behind the vault door */}
      <div className="container chamber" style={{ paddingTop: '10rem' }}>
        <div style={{ position: 'absolute', top: '12rem', right: '2rem' }} className="text-mono">
          <span style={{ color: 'var(--accent-amber)' }}>STATUS:</span> ACTIVE
        </div>
        
        <h1 className="heading-massive">
          ANIMESH <br /> TIWARI
        </h1>
        
        <div style={{ marginTop: '4rem', maxWidth: '600px' }}>
          <h2 style={{ color: 'var(--accent-military)', fontSize: '2rem', marginBottom: '1rem' }}>
            DISCIPLINE. <br />
            PRECISION. <br />
            EXECUTION.
          </h2>
          
          <div className="steel-panel" style={{ padding: '2rem', marginTop: '3rem' }}>
            <div className="text-mono" style={{ color: 'var(--text-dim)', marginBottom: '1rem' }}>CURRENT DEPLOYMENT</div>
            <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-mono)', fontWeight: 'bold' }}>FULL STACK ENGINEER</div>
          </div>
        </div>
      </div>
    </section>
  );
}
