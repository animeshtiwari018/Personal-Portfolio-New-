export default function Armory() {
  const capabilities = [
    {
      group: "FRONTEND",
      skills: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Framer Motion"]
    },
    {
      group: "BACKEND",
      skills: ["Node.js", "Express", "Python", "Django", "REST APIs", "GraphQL"]
    },
    {
      group: "DATABASE",
      skills: ["PostgreSQL", "MongoDB", "Redis", "Prisma ORM", "Mongoose"]
    },
    {
      group: "TOOLS",
      skills: ["Git", "Docker", "AWS", "Vercel", "CI/CD", "Linux"]
    },
    {
      group: "SYSTEM DESIGN",
      skills: ["Microservices", "Architecture", "Performance", "Security"]
    }
  ];

  return (
    <section id="armory" className="chamber container">
      <div className="heading-section">
        <h2>ARMORY</h2>
        <span className="section-id">SEC-04</span>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        {capabilities.map((cap) => (
          <div key={cap.group} className="steel-panel" style={{ padding: '2rem', display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem', alignItems: 'center' }}>
            <div className="text-mono" style={{ color: 'var(--accent-military)', fontSize: '1.2rem', fontWeight: 'bold', borderRight: '2px solid var(--border-color)', height: '100%', display: 'flex', alignItems: 'center' }}>
              [{cap.group}]
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {cap.skills.map((skill) => (
                <div key={skill} style={{ 
                  backgroundColor: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)', 
                  padding: '0.75rem 1.5rem', 
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.05em',
                  boxShadow: 'inset 0 0 10px rgba(0,0,0,0.5)'
                }}>
                  {skill.toUpperCase()}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
