export default function Foundation() {
  return (
    <section id="phase-02" className="phase-container">
      <div style={{ maxWidth: '900px' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>PHASE 02 — FOUNDATION</h2>
        <p className="text-mono" style={{ color: 'var(--accent-olive)', marginBottom: '3rem' }}>EDUCATION & TECH GROWTH</p>
        
        <div className="selection-panel" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h3 style={{ color: 'var(--accent-amber)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>COMPUTER SCIENCE FOUNDATIONS</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Rigorous theoretical grounding, algorithms analysis, data structures design, and clean architecture implementation.</p>
          </div>
          
          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <h3 style={{ color: 'var(--accent-amber)', fontSize: '1.5rem', marginBottom: '0.5rem' }}>SYSTEMS LEARNING JOURNEY</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Evolving technical capabilities from local execution frameworks to highly distributed cloud native systems designs.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
