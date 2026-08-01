export default function MissionLog() {
  const milestones = [
    {
      id: "LOG-04",
      title: "CURRENT OBJECTIVE",
      desc: "Architecting decentralized, highly resilient web applications.",
      status: "ACTIVE"
    },
    {
      id: "LOG-03",
      title: "SYSTEM UPGRADE",
      desc: "Promoted to Senior Operations Lead. Supervised infrastructure overhauls and deployment pipelines.",
      status: "ARCHIVED"
    },
    {
      id: "LOG-02",
      title: "FIRST DEPLOYMENT",
      desc: "Entered active duty as a full-stack engineer. Executed multiple successful client projects.",
      status: "ARCHIVED"
    },
    {
      id: "LOG-01",
      title: "MISSION INITIALIZED",
      desc: "Began rigorous technical training in computer science and software development.",
      status: "ARCHIVED"
    }
  ];

  return (
    <section id="mission-log" className="chamber container">
      <div className="heading-section">
        <h2>MISSION LOG</h2>
        <span className="section-id">SEC-02</span>
      </div>
      
      <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', paddingLeft: '3rem' }}>
        <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '4px', backgroundColor: 'var(--border-color)' }}></div>
        
        {milestones.map((m) => (
          <div key={m.id} className="steel-panel" style={{ padding: '2rem', marginBottom: '3rem', position: 'relative' }}>
            <div style={{ 
              position: 'absolute', 
              left: '-3.75rem', 
              top: '50%', 
              transform: 'translateY(-50%)',
              width: '24px', 
              height: '24px', 
              backgroundColor: m.status === 'ACTIVE' ? 'var(--accent-military)' : 'var(--bg-secondary)', 
              border: '4px solid var(--border-color)',
              borderRadius: '50%',
              boxShadow: m.status === 'ACTIVE' ? '0 0 15px rgba(91, 102, 64, 0.8)' : 'none'
            }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.5rem', color: m.status === 'ACTIVE' ? 'var(--text-primary)' : 'var(--text-dim)' }}>
                {m.title}
              </h3>
              <span className="text-mono" style={{ color: 'var(--accent-amber)', fontSize: '0.75rem' }}>{m.id}</span>
            </div>
            
            <p style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>{m.desc}</p>
            
            <div style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', display: 'flex', alignItems: 'center' }}>
              <span className={`status-dot ${m.status === 'ARCHIVED' ? 'inactive' : ''}`}></span>
              <span className="text-mono" style={{ color: 'var(--text-dim)' }}>STATUS: {m.status}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
