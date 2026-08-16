import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata = {
  title: 'Portfolio',
  description: 'Personal portfolio website',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen bg-zinc-950 font-sans text-zinc-50 antialiased">
        {children}
      </body>
    </html>
  );
}
