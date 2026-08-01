"use client";
import { useState } from 'react';

export default function Connection() {
  const [transmitted, setTransmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setTransmitted(true);
    setTimeout(() => {
      setTransmitted(false);
    }, 5000);
  };

  return (
    <section id="phase-06" className="phase-container" style={{ borderBottom: 'none' }}>
      <div style={{ maxWidth: '800px', width: '100%', margin: '0 auto' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem', textAlign: 'center' }}>FINAL PHASE</h2>
        <p className="text-mono" style={{ color: 'var(--accent-olive)', marginBottom: '3rem', textAlign: 'center' }}>CONNECTION INITIATION</p>
        
        <div className="selection-panel">
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', textAlign: 'center' }}>
            If you've reached this point, thank you for completing the journey.
          </p>
          
          {!transmitted ? (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div>
                <label className="text-mono" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-olive)' }}>IDENTIFICATION</label>
                <input 
                  type="text" 
                  required
                  style={{ width: '100%', padding: '1rem', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)', fontFamily: 'var(--font-mono)' }} 
                />
              </div>
              
              <div>
                <label className="text-mono" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-olive)' }}>TRANSMISSION (EMAIL)</label>
                <input 
                  type="email" 
                  required
                  style={{ width: '100%', padding: '1rem', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)', fontFamily: 'var(--font-mono)' }} 
                />
              </div>
              
              <div>
                <label className="text-mono" style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--accent-olive)' }}>MESSAGE PAYLOAD</label>
                <textarea 
                  rows="5" 
                  required
                  style={{ width: '100%', padding: '1rem', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', color: 'var(--text-color)', fontFamily: 'var(--font-mono)', resize: 'vertical' }}
                ></textarea>
              </div>
              
              <button type="submit" className="btn-action" style={{ width: '100%' }}>
                INITIATE CONTACT
              </button>
            </form>
          ) : (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <h3 style={{ color: 'var(--accent-amber)', fontSize: '2rem', marginBottom: '1rem' }}>SELECTION COMPLETE</h3>
              <p style={{ color: 'var(--text-secondary)' }}>You've seen the mindset, the growth, and the work. The next step is yours.</p>
              <div className="text-mono" style={{ color: 'var(--accent-olive)', marginTop: '2rem' }}>
                TRANSMISSION RECEIVED // SECURE CHANNEL CLOSED.
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
