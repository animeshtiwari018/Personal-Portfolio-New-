export default function Operations() {
  const operations = [
    {
      code: "OP-VANGUARD",
      status: "COMPLETED",
      objective: "Architect a scalable e-commerce microservices backend.",
      tech: "Node.js // Docker // Kubernetes // PostgreSQL",
      execution: "Deployed a cluster of resilient microservices handling 10k+ concurrent requests. Optimized database queries reducing latency by 45%.",
      outcome: "MISSION SUCCESS. System is highly available and performant."
    },
    {
      code: "OP-PHANTOM",
      status: "COMPLETED",
      objective: "Develop a real-time classified data analytics dashboard.",
      tech: "React // WebSockets // D3.js // Redis",
      execution: "Engineered a high-frequency trading analytics dashboard processing millions of data points per second with zero UI blockages.",
      outcome: "MISSION SUCCESS. Deployed to production with 100% uptime."
    }
  ];

  return (
    <section id="operations" className="chamber container">
      <div className="heading-section">
        <h2>OPERATIONS</h2>
        <span className="section-id">SEC-03</span>
      </div>
      
      <div style={{ display: 'grid', gap: '4rem', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
        {operations.map((op) => (
          <div key={op.code} className="archive-drawer">
            <div className="archive-drawer-header">
              <h3 style={{ margin: 0, fontFamily: 'var(--font-mono)', letterSpacing: '0.1em' }}>{op.code}</h3>
              <div className="text-mono" style={{ color: 'var(--accent-amber)', fontSize: '0.75rem', border: '1px solid var(--accent-amber)', padding: '0.25rem 0.5rem' }}>
                {op.status}
              </div>
            </div>
            
            <div className="archive-drawer-content">
              <div style={{ marginBottom: '2rem' }}>
                <div className="data-block-label" style={{ marginBottom: '0.5rem' }}>OBJECTIVE</div>
                <div style={{ fontFamily: 'var(--font-body)' }}>{op.objective}</div>
              </div>
              
              <div style={{ marginBottom: '2rem' }}>
                <div className="data-block-label" style={{ marginBottom: '0.5rem' }}>TECHNOLOGY STACK</div>
                <div className="text-mono" style={{ color: 'var(--text-primary)' }}>{op.tech}</div>
              </div>
              
              <div style={{ marginBottom: '2rem' }}>
                <div className="data-block-label" style={{ marginBottom: '0.5rem' }}>EXECUTION NOTES</div>
                <div style={{ fontFamily: 'var(--font-body)', color: 'var(--text-dim)' }}>{op.execution}</div>
              </div>
              
              <div style={{ marginBottom: '2rem', padding: '1rem', backgroundColor: 'var(--bg-primary)', borderLeft: '4px solid var(--accent-military)' }}>
                <div className="data-block-label" style={{ marginBottom: '0.25rem' }}>OUTCOME</div>
                <div style={{ fontFamily: 'var(--font-body)', fontWeight: 'bold' }}>{op.outcome}</div>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', marginTop: '3rem' }}>
                <button className="engraved-btn" style={{ flex: 1, padding: '1rem' }}>SOURCE CODE</button>
                <button className="engraved-btn" style={{ flex: 1, padding: '1rem', borderColor: 'var(--accent-military)' }}>DEPLOYMENT</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
