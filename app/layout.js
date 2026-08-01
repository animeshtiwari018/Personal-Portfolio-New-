import './globals.css';
import Link from 'next/link';

export const metadata = {
  title: 'BLACK SITE // THE VAULT',
  description: 'Restricted underground facility.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="bg-blueprint-grid"></div>
        
        <div className="layout-wrapper" style={{ position: 'relative', zIndex: 10 }}>
          {/* Facility Borders */}
          <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '4px', backgroundColor: 'var(--border-color)', zIndex: 100 }}></div>
          <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: '4px', backgroundColor: 'var(--border-color)', zIndex: 100 }}></div>
          <div style={{ position: 'fixed', top: 0, bottom: 0, left: 0, width: '4px', backgroundColor: 'var(--border-color)', zIndex: 100 }}></div>
          <div style={{ position: 'fixed', top: 0, bottom: 0, right: 0, width: '4px', backgroundColor: 'var(--border-color)', zIndex: 100 }}></div>
          
          <nav className="nav-container steel-panel">
            <div className="text-mono" style={{ color: 'var(--accent-amber)' }}>
              FACILITY_ID: VAULT-77
            </div>
            <ul className="nav-links text-mono">
              <li><Link href="#entry">ENTRY</Link></li>
              <li><Link href="#identity">IDENTITY</Link></li>
              <li><Link href="#mission-log">MISSION LOG</Link></li>
              <li><Link href="#operations">OPERATIONS</Link></li>
              <li><Link href="#armory">ARMORY</Link></li>
              <li><Link href="#extraction">EXTRACTION</Link></li>
            </ul>
          </nav>
          
          <main>
            {children}
          </main>
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          .nav-container {
            position: fixed;
            top: 2rem;
            left: 2rem;
            right: 2rem;
            z-index: 50;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1.5rem 2rem;
            background-color: rgba(28, 28, 28, 0.95);
            backdrop-filter: blur(10px);
          }
          
          .nav-links {
            display: flex;
            gap: 3rem;
            list-style: none;
          }
          
          .nav-links a {
            transition: color 0.2s ease;
          }
          
          .nav-links a:hover {
            color: var(--accent-amber);
          }

          @media (max-width: 1024px) {
            .nav-container {
              flex-direction: column;
              gap: 1rem;
              padding: 1rem;
            }
            .nav-links {
              gap: 1.5rem;
              flex-wrap: wrap;
              justify-content: center;
            }
          }
        `}} />
      </body>
    </html>
  );
}
