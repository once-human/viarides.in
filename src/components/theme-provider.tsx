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

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>('dark'); // Default to dark theme

  useEffect(() => {
    // Check local storage or system preference on initial load
    console.log('ThemeProvider: Checking initial theme...');
    const storedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    let initialTheme: Theme;
    if (storedTheme) {
      console.log('ThemeProvider: Found theme in localStorage:', storedTheme);
      initialTheme = storedTheme;
    } else {
      initialTheme = prefersDark ? 'dark' : 'light';
      console.log('ThemeProvider: Setting theme based on prefers-color-scheme:', initialTheme);
    }
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    // Apply theme class to root element and store preference
    console.log(`ThemeProvider: Applying theme: ${theme}`);
    const root = window.document.documentElement;
    const oldTheme = theme === 'light' ? 'dark' : 'light';
    root.classList.remove(oldTheme);
    root.classList.add(theme);
    console.log(`ThemeProvider: Removed class ${oldTheme}, Added class ${theme} to <html>`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      console.log(`ThemeProvider: Toggling theme from ${prevTheme} to ${newTheme}`);
      return newTheme;
    });
  };

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