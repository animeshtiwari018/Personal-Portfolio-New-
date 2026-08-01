import './globals.css';

export const metadata = {
  title: 'THE SELECTION COURSE',
  description: 'An elite technical evaluation experience.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div style={{ display: 'flex' }}>
          {children}
        </div>
      </body>
    </html>
  );
}
