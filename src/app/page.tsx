'use client';

import { useEffect } from 'react'; // Keep useEffect for mouse listener
import { motion, useMotionValue, useSpring } from 'framer-motion'; // Removed AnimatePresence
import { ArrowTopRightOnSquareIcon, BeakerIcon } from '@heroicons/react/20/solid'; // Use solid icon for GitHub link and BeakerIcon
// Removed useTheme import
// Removed Icon imports

// Simple inline SVG component for GitHub logo
const GitHubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="currentColor"
    className="w-4 h-4"
    aria-hidden="true"
  >
    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.23-.66-.15-.23-.58-.55-1.02-.55-.4 0-.74.31-.74.73 0 .41.47.51.66.61.51.17.86.73.96 1.27.14 1.05.86 1.51 2.16 1.51.31 0 .59-.01.86-.06.01.22.01.47.01.67 0 .21-.15.46-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
  </svg>
);

export default function Home() {
  // Removed theme state and isMounted state

  // Keep Mouse follower state and logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 300 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // No need to set isMounted anymore
    const handleMouseMove = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Still run only on mount

  // Refined glassmorphism - slightly less blur, adjusted opacity/border
  const glassMorphism = 'bg-white/10 dark:bg-gray-900/10 backdrop-blur-lg border border-white/10 dark:border-gray-800/20 shadow-xl';

  // Removed isMounted check

  return (
    // Added overflow-x-hidden to prevent horizontal scroll issues from blobs
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden overflow-x-hidden bg-gradient-to-br from-gray-900 to-black text-gray-100 font-[family-name:var(--font-geist-sans)]">

      {/* Keep Mouse Follower Effect (use dark variants) */}
      <motion.div
        className="fixed top-0 left-0 w-64 h-64 rounded-full bg-gradient-radial from-purple-600/60 via-pink-600/40 to-sky-600/20 filter blur-[75px] pointer-events-none z-0"
        style={{ translateX: smoothMouseX, translateY: smoothMouseY, x: '-50%', y: '-50%' }}
      />

      {/* Keep Animated Background Blobs (use dark variants) */}
      <div className="absolute inset-0 z-[-1] overflow-hidden">
        <motion.div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-600 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '0s' }} />
        <motion.div className="absolute -bottom-40 -right-20 w-80 h-80 bg-pink-600 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '2s' }} />
        <motion.div className="absolute top-20 right-40 w-72 h-72 bg-sky-600 rounded-full mix-blend-screen filter blur-3xl opacity-40 animate-blob" style={{ animationDelay: '4s' }} />
      </div>

      {/* Removed Theme Toggle Button */}

      {/* Main Content (z-10) - use dark variants directly */}
      <motion.main
        className={`relative z-10 flex flex-col items-center justify-center text-center p-6 sm:p-8 rounded-2xl ${glassMorphism} select-none w-[90%] max-w-lg sm:max-w-xl md:max-w-2xl`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1 className="text-4xl sm:text-6xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 100 }}>
           Via
        </motion.h1>
        <motion.p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }}>
           Your next ride, simplified. Launching soon.
        </motion.p>
        <motion.p className="text-sm sm:text-base text-gray-400 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.5 }}>
           A subscription based ride booking service.
        </motion.p>
        <motion.div className="text-xs text-gray-400 mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.5 }}>
           Planned launch: 2026
        </motion.div>
        <motion.div className="text-xs text-gray-400 mt-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9, duration: 0.5 }}>
           More details & website revamp planned for May 2025.
        </motion.div>
      </motion.main>

      {/* Button Container */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mt-8">
        {/* GitHub Contribution Link */}
        <motion.a
          href="https://github.com/via-rides"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 ${glassMorphism}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5, ease: "easeOut" }}
          whileHover={{ scale: 1.05, boxShadow: '0px 0px 15px rgba(255, 255, 255, 0.1)' }}
          whileTap={{ scale: 0.95 }}
        >
          <GitHubIcon />
          Contribute
          <ArrowTopRightOnSquareIcon className="w-4 h-4" />
        </motion.a>

        {/* Test Builds Link */}
        <motion.a
          href="https://github.com/via-rides/via-commuter/releases"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300 ${glassMorphism}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }} // Slightly delayed entrance
          whileHover={{ scale: 1.05, boxShadow: '0px 0px 15px rgba(255, 255, 255, 0.1)' }}
          whileTap={{ scale: 0.95 }}
        >
          View Test Builds
          <BeakerIcon className="w-4 h-4" />
        </motion.a>
      </div>

      {/* Keep Footer - use dark variant directly */}
      <footer className="absolute bottom-5 text-xs text-gray-400 z-10 select-none">
        Built with ❤️ by the Via Rides team.
      </footer>
    </div>
  );
}
