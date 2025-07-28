import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [systemTheme, setSystemTheme] = useState('dark');

  useEffect(() => {
    // Load saved theme preference or default to dark (to match current design)
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setCurrentTheme(savedTheme);

    // Detect system theme preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setSystemTheme(mediaQuery.matches ? 'dark' : 'light');

    const handleChange = (e) => {
      setSystemTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // Apply theme to document
    const root = document.documentElement;
    
    if (currentTheme === 'system') {
      const effectiveTheme = systemTheme;
      root.setAttribute('data-theme', effectiveTheme);
    } else {
      root.setAttribute('data-theme', currentTheme);
    }

    // Save theme preference
    localStorage.setItem('theme', currentTheme);
  }, [currentTheme, systemTheme]);

  const setTheme = (theme) => {
    setCurrentTheme(theme);
    
    // Add smooth transition effect
    document.body.style.transition = 'all 0.3s ease-in-out';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  };

  const getEffectiveTheme = () => {
    return currentTheme === 'system' ? systemTheme : currentTheme;
  };

  const value = {
    currentTheme,
    systemTheme,
    effectiveTheme: getEffectiveTheme(),
    setTheme,
    isDark: getEffectiveTheme() === 'dark',
    isLight: getEffectiveTheme() === 'light',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}; 