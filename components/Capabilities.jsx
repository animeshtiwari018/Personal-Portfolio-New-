export default function Capabilities() {
  const groups = [
    {
      name: "SYSTEM DESIGN",
      skills: ["Microservices", "Design Patterns", "Caching Architectures", "Security protocols"]
    },
    {
      name: "FRONTEND DEPLOYMENT",
      skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux"]
    },
    {
      name: "BACKEND CONTROL",
      skills: ["Node.js", "Express", "Python", "Django", "REST / GraphQL"]
    },
    {
      name: "DATA SYSTEMS",
      skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma ORM"]
    },
    {
      name: "TOOLS & PIPELINES",
      skills: ["Git", "Docker", "AWS", "CI/CD", "Linux"]
    }
  ];

  return (
    <section id="phase-03" className="phase-container">
      <div style={{ maxWidth: '1000px', width: '100%' }}>
        <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>PHASE 03 — CAPABILITIES</h2>
        <p className="text-mono" style={{ color: 'var(--accent-olive)', marginBottom: '3rem' }}>TECHNICAL RACK ASSESSMENT</p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {groups.map((g) => (
            <div key={g.name} className="selection-panel" style={{ display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem', alignItems: 'center' }}>
              <div className="text-mono" style={{ color: 'var(--accent-olive)', fontWeight: 'bold', fontSize: '1.1rem', borderRight: '1px solid var(--border-color)', height: '100%', display: 'flex', alignItems: 'center' }}>
                [{g.name}]
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                {g.skills.map((s) => (
                  <span key={s} style={{ 
                    border: '1px solid var(--border-color)', 
                    padding: '0.5rem 1rem', 
                    fontSize: '0.85rem', 
                    fontFamily: 'var(--font-mono)',
                    backgroundColor: 'var(--bg-color)' 
                  }}>
                    {s.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
