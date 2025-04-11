'use client'; // Need client component for theme toggle and animations

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '@/components/theme-provider';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline'; // Example icons

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  // Mouse follower state and logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 300 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    setIsMounted(true);

    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only on mount

  const glassMorphism = 'bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-60 dark:bg-opacity-30 border border-gray-200 dark:border-gray-700';

  if (!isMounted) {
    // Avoid rendering theme toggle until mounted to prevent hydration mismatch
    return null;
  }

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-gray-100 to-gray-300 dark:from-gray-900 dark:to-black text-gray-900 dark:text-gray-100 font-[family-name:var(--font-geist-sans)] transition-colors duration-500 cursor-none">

      {/* Mouse Follower Effect */}
      <motion.div
        className="fixed top-0 left-0 w-64 h-64 rounded-full bg-gradient-radial from-purple-400/60 via-pink-400/40 to-sky-400/20 dark:from-purple-600/50 dark:via-pink-600/30 dark:to-sky-600/10 filter blur-[100px] pointer-events-none z-0"
        style={{
          translateX: smoothMouseX,
          translateY: smoothMouseY,
          // Offset to center the gradient roughly on the cursor
          x: '-50%',
          y: '-50%',
        }}
      />

      {/* Animated Background Blobs */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 bg-purple-400 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 dark:opacity-40 animate-blob"
          style={{ animationDelay: '0s' }}
        />
        <motion.div
          className="absolute -bottom-40 -right-20 w-80 h-80 bg-pink-400 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 dark:opacity-40 animate-blob"
          style={{ animationDelay: '2s' }}
        />
         <motion.div
          className="absolute top-20 right-40 w-72 h-72 bg-sky-400 dark:bg-sky-600 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 dark:opacity-40 animate-blob"
          style={{ animationDelay: '4s' }}
        />
      </div>

      {/* Theme Toggle Button */}
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

      {/* Main Content */}
      <motion.main
        className={`relative z-10 flex flex-col items-center justify-center text-center p-8 rounded-lg shadow-xl ${glassMorphism}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 dark:from-sky-400 dark:via-cyan-400 dark:to-teal-400 bg-clip-text text-transparent"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 100 }}
        >
          Via
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          Your next ride, simplified. Launching soon.
        </motion.p>

        {/* Added Description */}
        <motion.p
          className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          A subscription based ride booking service.
        </motion.p>

        {/* Optional: Add a subtle graphic or logo related to rides/transport */}
        {/* <motion.div ... > Logo/Graphic </motion.div> */}

        <motion.div
          className="text-xs text-gray-500 dark:text-gray-400 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          Planned launch: 2026
        </motion.div>

        {/* Added Revamp Info */}
        <motion.div
          className="text-xs text-gray-500 dark:text-gray-400 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          More details & website revamp planned for May 2025.
        </motion.div>
      </motion.main>

      {/* Footer/Attribution (optional) */}
      <footer className="absolute bottom-5 text-xs text-gray-500 dark:text-gray-400 z-10">
        Built by the Via team.
      </footer>
    </div>
  );
}
