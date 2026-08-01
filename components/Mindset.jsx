import { motion } from 'framer-motion';

export default function Mindset() {
  return (
    <section id="phase-01" className="phase-container">
      <div style={{ maxWidth: '900px' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>PHASE 01 — MINDSET</h2>
        <p className="text-mono" style={{ color: 'var(--accent-olive)', marginBottom: '3rem' }}>IDENTITY ASSESSMENT</p>
        
        <div className="selection-panel">
          <div className="data-row">
            <span className="data-label">IDENTITY</span>
            <span className="data-value">ANIMESH TIWARI</span>
          </div>
          <div className="data-row">
            <span className="data-label">ROLE</span>
            <span className="data-value">FULL STACK SOFTWARE ENGINEER</span>
          </div>
          <div className="data-row">
            <span className="data-label">MISSION STATEMENT</span>
            <span className="data-value">BUILD SOFTWARE THAT PERFORMS UNDER PRESSURE.</span>
          </div>
          <div className="data-row">
            <span className="data-label">CORE PRINCIPLE</span>
            <span className="data-value">DISCIPLINE BEFORE MOTIVATION.</span>
          </div>
          <div className="data-row" style={{ borderBottom: 'none' }}>
            <span className="data-label">DEVELOPMENT ETHOS</span>
            <span className="data-value">MEASURE TWICE, CUT ONCE. ZERO REDUNDANCY.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
