export default function Evolution() {
  const objectives = [
    {
      year: "2026",
      action: "CURRENT OBJECTIVE",
      detail: "Building highly resilient edge computing nodes and optimizing web-assembly integrations.",
      status: "ACTIVE"
    },
    {
      year: "2024",
      action: "SYSTEM UPGRADE",
      detail: "Deployed complex client projects and structured automated CI/CD configurations.",
      status: "COMPLETED"
    },
    {
      year: "2022",
      action: "FIRST DEPLOYMENT",
      detail: "Assumed role of backend engineer, managing infrastructure scalability pipelines.",
      status: "COMPLETED"
    },
    {
      year: "2020",
      action: "MISSION INITIALIZED",
      detail: "Began deep research and academic training in computing science and engineering.",
      status: "COMPLETED"
    }
  ];

  return (
    <section id="phase-05" className="phase-container">
      <div style={{ maxWidth: '900px', width: '100%' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>PHASE 05 — EVOLUTION</h2>
        <p className="text-mono" style={{ color: 'var(--accent-olive)', marginBottom: '3rem' }}>CHRONOLOGICAL REINFORCEMENT LOG</p>
        
        <div style={{ position: 'relative', paddingLeft: '3rem' }}>
          <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', backgroundColor: 'var(--border-color)' }}></div>
          
          {objectives.map((o) => (
            <div key={o.year} className="selection-panel" style={{ marginBottom: '2.5rem', position: 'relative' }}>
              <div style={{ 
                position: 'absolute', 
                left: '-3.7rem', 
                top: '50%', 
                transform: 'translateY(-50%)',
                width: '18px', 
                height: '18px', 
                backgroundColor: o.status === 'ACTIVE' ? 'var(--accent-amber)' : 'var(--bg-color)', 
                border: '3px solid var(--border-color)',
                borderRadius: '50%'
              }}></div>
              
              <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <span className="text-mono" style={{ fontSize: '1.2rem', color: 'var(--accent-amber)', fontWeight: 'bold' }}>[{o.year}]</span>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '0.25rem' }}>{o.action}</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>{o.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
