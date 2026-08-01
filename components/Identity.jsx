export default function Identity() {
  return (
    <section id="identity" className="chamber container">
      <div className="heading-section">
        <h2>IDENTITY</h2>
        <span className="section-id">SEC-01</span>
      </div>
      
      <div className="steel-panel" style={{ padding: '3rem', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ position: 'absolute', top: '-1px', left: '10%', width: '80%', height: '2px', backgroundColor: 'var(--accent-amber)' }}></div>
        
        <div className="data-block">
          <div className="data-block-label">NAME</div>
          <div className="data-block-value">ANIMESH TIWARI</div>
        </div>
        
        <div className="data-block">
          <div className="data-block-label">ROLE</div>
          <div className="data-block-value">FULL STACK ENGINEER</div>
        </div>
        
        <div className="data-block">
          <div className="data-block-label">LOCATION</div>
          <div className="data-block-value">CLASSIFIED (INDIA)</div>
        </div>
        
        <div className="data-block">
          <div className="data-block-label">SPECIALIZATION</div>
          <div className="data-block-value">HIGH-PERFORMANCE ARCHITECTURE & SECURE SYSTEMS</div>
        </div>
        
        <div className="data-block">
          <div className="data-block-label">MISSION</div>
          <div className="data-block-value">Build software that performs under pressure. Eliminate redundancy.</div>
        </div>
        
        <div className="data-block">
          <div className="data-block-label">MENTALITY</div>
          <div className="data-block-value">Discipline before motivation.</div>
        </div>
        
        <div className="data-block" style={{ borderBottom: 'none' }}>
          <div className="data-block-label">OBJECTIVE</div>
          <div className="data-block-value">Create systems that outlast trends and establish new engineering benchmarks.</div>
        </div>
      </div>
    </section>
  );
}
