'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextProps {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

// Helper function to check if running in browser
const isBrowser = typeof window !== 'undefined';

export function ThemeProvider({ children }: ThemeProviderProps) {
  // Initialize state, defaulting to dark but will be updated by effect
  const [theme, setTheme] = useState<Theme>(() => {
    if (!isBrowser) return 'dark'; // Default for SSR
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return storedTheme || (prefersDark ? 'dark' : 'light');
  });

  // Effect to apply class AFTER component mounts
  useEffect(() => {
    console.log(`ThemeProvider Effect: Applying theme class: ${theme}`);
    const root = window.document.documentElement;
    const oldTheme = theme === 'light' ? 'dark' : 'light';
    root.classList.remove(oldTheme);
    root.classList.add(theme);
    console.log(`ThemeProvider Effect: Removed class ${oldTheme}, Added class ${theme} to <html>`);

    // Try setting local storage only in the effect
    try {
        localStorage.setItem('theme', theme);
        console.log(`ThemeProvider Effect: Set localStorage theme to ${theme}`);
    } catch (error) {
        console.error('ThemeProvider Effect: Failed to set localStorage', error);
    }

  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      console.log(`ThemeProvider: Toggling theme from ${prevTheme} to ${newTheme}`);
      return newTheme;
    });
  };

  // Add an effect to log when the provider mounts
  useEffect(() => {
    console.log('ThemeProvider: Mounted');
  }, []);

  console.log(`ThemeProvider: Rendering with theme: ${theme}`);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
} 