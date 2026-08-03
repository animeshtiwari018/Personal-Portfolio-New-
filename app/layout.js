import './globals.css';
import { Share_Tech_Mono, Orbitron } from 'next/font/google';

const shareTechMono = Share_Tech_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-share-tech-mono',
  display: 'swap',
});

const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

export const metadata = {
  title: 'COVERT COMMAND TERMINAL | PARA SPECIAL FORCES',
  description: 'Secure operational tactical center interface. Authorized personnel only.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${shareTechMono.variable} ${orbitron.variable}`}>
      <body className="bg-tactical-bg text-gray-200 antialiased font-mono min-h-screen selection:bg-tactical-olive/40 selection:text-white">
        {children}
      </body>
    </html>
  );
}
