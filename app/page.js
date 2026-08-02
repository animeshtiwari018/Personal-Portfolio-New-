"use client";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-neutral-950 text-neutral-100 p-8">
      <div className="max-w-md text-center space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl text-neutral-50">
          Clean Slate Initialized
        </h1>
        <p className="text-neutral-400 text-sm">
          All components have been deleted, and <code>globals.css</code> has been reset to Tailwind v4. The project is ready for your redesign.
        </p>
      </div>
    </main>
  );
}
