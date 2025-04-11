'use client';

import { useEffect } from 'react'; // Keep useEffect for mouse listener
import { motion, useMotionValue, useSpring } from 'framer-motion'; // Removed AnimatePresence
// Removed useTheme import
// Removed Icon imports

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

  const glassMorphism = 'bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-30 border border-gray-700'; // Use dark variant directly

  // Removed isMounted check

  return (
    // Hardcoded dark background, removed theme-dependent classes
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-black text-gray-100 font-[family-name:var(--font-geist-sans)]">

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
        className={`relative z-10 flex flex-col items-center justify-center text-center p-8 rounded-lg shadow-xl ${glassMorphism} select-none`}
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

      {/* Keep Footer - use dark variant directly */}
      <footer className="absolute bottom-5 text-xs text-gray-400 z-10 select-none">
        Built by the Via team.
      </footer>
    </div>
  );
}
