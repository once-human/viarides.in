'use client'; // Need client component for theme toggle and animations

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // Keep for button animation
import { useTheme } from '@/components/theme-provider';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'; // Example icons

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const glassMorphism = 'bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 dark:bg-opacity-20 border border-gray-200 dark:border-gray-700'; // Simplified blur/opacity

  if (!isMounted) {
    // Still needed to prevent hydration mismatch on theme toggle button
    return null;
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100 font-[family-name:var(--font-geist-sans)] transition-colors duration-500">

      {/* Theme Toggle Button (Simplified but kept animation) */}
      <motion.button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${glassMorphism}`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle theme"
      >
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'dark' ? (
            <motion.div
              key="sun"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <SunIcon className="h-6 w-6 text-yellow-400" />
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MoonIcon className="h-6 w-6 text-indigo-500" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Main Content (Simplified - removed motion wrappers for now) */}
      <main
        className={`relative z-10 flex flex-col items-center justify-center text-center p-8 rounded-lg shadow-xl ${glassMorphism}`}
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-sky-400 dark:via-cyan-400 dark:to-teal-400 bg-clip-text text-transparent">
          Via
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-2">
          Your next ride, simplified. Launching soon.
        </p>

        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8">
          A subscription based ride booking service.
        </p>

        <div className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          Planned launch: 2026
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          More details & website revamp planned for May 2025.
        </div>
      </main>

      {/* Footer */}
      <footer className="absolute bottom-5 text-xs text-gray-500 dark:text-gray-400 z-10">
        Built by the Via team.
      </footer>
    </div>
  );
}
