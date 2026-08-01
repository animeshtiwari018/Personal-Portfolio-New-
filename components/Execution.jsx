export default function Execution() {
  const operations = [
    {
      name: "OP-VANGUARD",
      challenge: "Implement scalable high-throughput microservices architecture for a heavily loaded transaction flow.",
      approach: "Decouple services using isolated containers, orchestrate through lightweight systems, and cache critical endpoints.",
      execution: "Set up asynchronous task processors, integrated Redis caching, and refactored underlying database indices.",
      outcome: "Successfully achieved sub-100ms response times for 99% of transactions under 10k concurrent requests."
    },
    {
      name: "OP-PHANTOM",
      challenge: "Create a live analytics dashboard without rendering blocks or memory leaks during high-frequency updates.",
      approach: "Utilize WebSockets with localized state management and throttled DOM repaints.",
      execution: "Implemented custom stream throttles in React and optimized SVG chart updates.",
      outcome: "Zero client-side crashes reported during high-load operational periods."
    }
  ];

  return (
    <section id="phase-04" className="phase-container">
      <div style={{ maxWidth: '1000px', width: '100%' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>PHASE 04 — EXECUTION</h2>
        <p className="text-mono" style={{ color: 'var(--accent-olive)', marginBottom: '3rem' }}>COMPLETED OPERATIONS CHALLENGES</p>
        
        <div style={{ display: 'grid', gap: '3rem', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {operations.map((op) => (
            <div key={op.name} className="selection-panel">
              <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-mono)' }}>{op.name}</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div>
                  <div className="text-mono" style={{ color: 'var(--accent-olive)', fontSize: '0.8rem' }}>CHALLENGE</div>
                  <p style={{ fontSize: '0.95rem' }}>{op.challenge}</p>
                </div>
                
                <div>
                  <div className="text-mono" style={{ color: 'var(--accent-olive)', fontSize: '0.8rem' }}>APPROACH</div>
                  <p style={{ fontSize: '0.95rem' }}>{op.approach}</p>
                </div>
                
                <div>
                  <div className="text-mono" style={{ color: 'var(--accent-olive)', fontSize: '0.8rem' }}>EXECUTION</div>
                  <p style={{ fontSize: '0.95rem' }}>{op.execution}</p>
                </div>
                
                <div style={{ backgroundColor: 'var(--bg-color)', borderLeft: '4px solid var(--accent-olive)', padding: '1rem' }}>
                  <div className="text-mono" style={{ color: 'var(--accent-amber)', fontSize: '0.8rem' }}>OUTCOME</div>
                  <p style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>{op.outcome}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
