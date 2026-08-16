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
      <body className="bg-zinc-950 text-zinc-50 antialiased font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}
