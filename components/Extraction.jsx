"use client";
import { useState } from 'react';

export default function Extraction() {
  const [transmitted, setTransmitted] = useState(false);

  const handleTransmit = (e) => {
    e.preventDefault();
    setTransmitted(true);
    setTimeout(() => {
      setTransmitted(false);
    }, 4000);
  };

  return (
    <section id="extraction" className="chamber container" style={{ borderBottom: 'none' }}>
      <div className="heading-section">
        <h2>EXTRACTION</h2>
        <span className="section-id">SEC-05</span>
      </div>
      
      <div className="steel-panel" style={{ padding: '4rem', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <h3 className="text-mono" style={{ color: 'var(--accent-amber)', marginBottom: '2rem', textAlign: 'center', fontSize: '1.5rem' }}>REQUEST SECURE CHANNEL</h3>
        
        {!transmitted ? (
          <form onSubmit={handleTransmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div>
              <label className="data-block-label" style={{ display: 'block', marginBottom: '0.75rem' }}>IDENTIFICATION (NAME)</label>
              <input 
                type="text" 
                required
                style={{ width: '100%', padding: '1.5rem', backgroundColor: 'var(--bg-primary)', border: '2px solid var(--border-color)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', outline: 'none' }} 
              />
            </div>
            
            <div>
              <label className="data-block-label" style={{ display: 'block', marginBottom: '0.75rem' }}>RETURN FREQUENCY (EMAIL)</label>
              <input 
                type="email" 
                required
                style={{ width: '100%', padding: '1.5rem', backgroundColor: 'var(--bg-primary)', border: '2px solid var(--border-color)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', outline: 'none' }} 
              />
            </div>
            
            <div>
              <label className="data-block-label" style={{ display: 'block', marginBottom: '0.75rem' }}>MESSAGE PAYLOAD</label>
              <textarea 
                rows="6" 
                required
                style={{ width: '100%', padding: '1.5rem', backgroundColor: 'var(--bg-primary)', border: '2px solid var(--border-color)', color: 'var(--text-primary)', fontFamily: 'var(--font-mono)', outline: 'none', resize: 'vertical' }}
              ></textarea>
            </div>
            
            <button type="submit" className="engraved-btn" style={{ width: '100%', padding: '1.5rem', fontSize: '1.2rem' }}>
              INITIATE CONTACT
            </button>
          </form>
        ) : (
          <div style={{ textAlign: 'center', padding: '4rem 0' }}>
            <div className="text-mono" style={{ color: 'var(--accent-military)', fontSize: '2rem', marginBottom: '2rem' }}>
              TRANSMISSION RECEIVED
            </div>
            <div className="text-mono" style={{ color: 'var(--text-dim)' }}>
              SECURE CHANNEL CLOSED.
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
