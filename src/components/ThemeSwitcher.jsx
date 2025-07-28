import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor, Palette, Check } from 'lucide-react';

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTheme, setCurrentTheme] = useState('dark');
  const [systemTheme, setSystemTheme] = useState('dark');

  const themes = [
    {
      id: 'light',
      name: 'Light',
      icon: Sun,
      description: 'Clean and bright interface',
      colors: {
        primary: '#ffffff',
        secondary: '#f8fafc',
        text: '#1e293b',
        accent: '#3b82f6'
      }
    },
    {
      id: 'dark',
      name: 'Dark',
      icon: Moon,
      description: 'Easy on the eyes',
      colors: {
        primary: '#0f172a',
        secondary: '#1e293b',
        text: '#ffffff',
        accent: '#3b82f6'
      }
    },
    {
      id: 'system',
      name: 'System',
      icon: Monitor,
      description: 'Follows system preference',
      colors: {
        primary: 'auto',
        secondary: 'auto',
        text: 'auto',
        accent: '#3b82f6'
      }
    }
  ];

  useEffect(() => {
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
  }, [currentTheme, systemTheme]);

  const handleThemeChange = (themeId) => {
    setCurrentTheme(themeId);
    setIsOpen(false);
    
    // Add smooth transition effect
    document.body.style.transition = 'all 0.3s ease-in-out';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  };

  const getCurrentIcon = () => {
    if (currentTheme === 'system') {
      return systemTheme === 'dark' ? Moon : Sun;
    }
    const theme = themes.find(t => t.id === currentTheme);
    return theme?.icon || Moon;
  };

  const CurrentIcon = getCurrentIcon();

  return (
    <div className="relative">
      {/* Theme Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-20 right-6 z-50 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle theme selector"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentIcon className="w-5 h-5" />
        </motion.div>
      </motion.button>

      {/* Theme Selector Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Theme Panel */}
            <motion.div
              className="fixed top-20 right-20 z-50 bg-slate-900/95 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 min-w-80 shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Palette className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Theme Preferences</h3>
                  <p className="text-gray-400 text-sm">Choose your interface style</p>
                </div>
              </div>

              <div className="space-y-2">
                {themes.map((theme) => (
                  <motion.button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    className={`w-full p-4 rounded-xl border transition-all duration-300 text-left ${
                      currentTheme === theme.id
                        ? 'bg-blue-500/10 border-blue-500/50'
                        : 'bg-slate-800/30 border-slate-700/50 hover:border-slate-600/50 hover:bg-slate-800/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          currentTheme === theme.id
                            ? 'bg-blue-500/20'
                            : 'bg-slate-700/50'
                        }`}>
                          <theme.icon className={`w-5 h-5 ${
                            currentTheme === theme.id ? 'text-blue-400' : 'text-gray-400'
                          }`} />
                        </div>
                        <div>
                          <h4 className="text-white font-medium">{theme.name}</h4>
                          <p className="text-gray-400 text-sm">{theme.description}</p>
                        </div>
                      </div>
                      
                      {currentTheme === theme.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                        >
                          <Check className="w-5 h-5 text-blue-400" />
                        </motion.div>
                      )}
                    </div>

                    {/* Theme Preview */}
                    {theme.id !== 'system' && (
                      <div className="mt-3 flex gap-2">
                        <div 
                          className="w-6 h-6 rounded border-2 border-white/20"
                          style={{ backgroundColor: theme.colors.primary }}
                        />
                        <div 
                          className="w-6 h-6 rounded border-2 border-white/20"
                          style={{ backgroundColor: theme.colors.secondary }}
                        />
                        <div 
                          className="w-6 h-6 rounded border-2 border-white/20"
                          style={{ backgroundColor: theme.colors.accent }}
                        />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* System Theme Info */}
              {currentTheme === 'system' && (
                <motion.div
                  className="mt-4 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 text-sm">
                    <Monitor className="w-4 h-4 text-blue-400" />
                    <span className="text-gray-300">
                      Currently using: <span className="text-white font-medium capitalize">{systemTheme}</span> mode
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Footer */}
              <div className="mt-6 pt-4 border-t border-slate-700/50">
                <p className="text-gray-500 text-xs text-center">
                  Theme preference will be saved locally
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeSwitcher; 