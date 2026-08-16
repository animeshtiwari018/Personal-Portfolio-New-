export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-zinc-950 text-zinc-50 font-sans">
      <div className="max-w-md text-center space-y-4 animate-fade-in">
        <h1 className="text-3xl font-bold tracking-tight">Portfolio Project</h1>
        <p className="text-zinc-400 text-sm">
          A clean slate. Start building your new portfolio by modifying <code className="px-1.5 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-xs">app/page.js</code>.
        </p>
      </div>
    </div>
  );
}
