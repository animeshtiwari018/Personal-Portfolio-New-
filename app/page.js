"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TacticalLoader from '@/components/TacticalLoader';
import MainPortfolioDashboard from '@/components/MainPortfolioDashboard';

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <main className="min-h-screen w-full bg-[#050505] text-[#e5e7eb] relative">
      <AnimatePresence mode="wait">
        {!isLoaded ? (
          <TacticalLoader key="loader" onFinished={() => setIsLoaded(true)} />
        ) : (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="w-full min-h-screen"
          >
            <MainPortfolioDashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
