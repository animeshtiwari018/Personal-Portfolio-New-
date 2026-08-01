"use client";
import { useState, useEffect } from 'react';
import Landing from '../components/Landing';
import Mindset from '../components/Mindset';
import Foundation from '../components/Foundation';
import Capabilities from '../components/Capabilities';
import Execution from '../components/Execution';
import Evolution from '../components/Evolution';
import Connection from '../components/Connection';

export default function Home() {
  const [started, setStarted] = useState(false);
  const [activePhase, setActivePhase] = useState(0);

  const phases = [
    { id: 1, name: 'MINDSET', hash: '#phase-01' },
    { id: 2, name: 'FOUNDATION', hash: '#phase-02' },
    { id: 3, name: 'CAPABILITIES', hash: '#phase-03' },
    { id: 4, name: 'EXECUTION', hash: '#phase-04' },
    { id: 5, name: 'EVOLUTION', hash: '#phase-05' },
    { id: 6, name: 'CONNECTION', hash: '#phase-06' }
  ];

  useEffect(() => {
    if (!started) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      
      let current = 1;
      phases.forEach((p, index) => {
        const el = document.getElementById(p.hash.replace('#', ''));
        if (el && scrollPos >= el.offsetTop) {
          current = index + 1;
        }
      });
      setActivePhase(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [started]);

  const handleBegin = () => {
    setStarted(true);
    setTimeout(() => {
      const firstSection = document.getElementById('phase-01');
      if (firstSection) {
        firstSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh', position: 'relative' }}>
      {/* Progress Track Sidebar */}
      {started && (
        <div style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          width: '60px',
          backgroundColor: 'var(--bg-color)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 100,
          gap: '2rem'
        }}>
          <div style={{ width: '2px', position: 'absolute', top: 0, bottom: 0, left: '29px', backgroundColor: 'var(--border-color)', zIndex: -1 }}></div>
          {phases.map((p, index) => {
            const phaseNum = index + 1;
            let status = 'LOCKED';
            let dotColor = 'var(--border-color)';
            if (activePhase === phaseNum) {
              status = 'ACTIVE';
              dotColor = 'var(--accent-amber)';
            } else if (activePhase > phaseNum) {
              status = 'COMPLETE';
              dotColor = 'var(--accent-olive)';
            }

            return (
              <a 
                href={p.hash} 
                key={p.id} 
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', position: 'relative' }}
                title={`PHASE 0${phaseNum}: ${status}`}
              >
                <div style={{ 
                  width: '12px', 
                  height: '12px', 
                  backgroundColor: dotColor, 
                  borderRadius: '50%', 
                  transition: 'background-color 0.3s ease',
                  border: '2px solid var(--bg-color)'
                }}></div>
                <span className="text-mono" style={{ 
                  fontSize: '0.6rem', 
                  marginTop: '0.5rem', 
                  color: activePhase === phaseNum ? 'var(--accent-amber)' : 'var(--text-secondary)' 
                }}>
                  0{phaseNum}
                </span>
              </a>
            );
          })}
        </div>
      )}

      <div style={{ width: '100%' }}>
        {!started ? (
          <Landing onBegin={handleBegin} />
        ) : (
          <>
            <Mindset />
            <Foundation />
            <Capabilities />
            <Execution />
            <Evolution />
            <Connection />
          </>
        )}
      </div>
    </div>
  );
}
