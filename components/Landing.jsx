"use client";
import { motion } from 'framer-motion';

export default function Landing({ onBegin }) {
  return (
    <section className="phase-container" style={{ alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingLeft: '2rem' }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <h1 style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', marginBottom: '1.5rem', color: 'var(--text-color)' }}>
          THE SELECTION HAS BEGUN
        </h1>
        <p className="text-mono" style={{ color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '1.2rem' }}>
          Only those who keep moving discover what lies ahead.
        </p>
        <button onClick={onBegin} className="btn-action">
          BEGIN
        </button>
      </motion.div>
    </section>
  );
}
