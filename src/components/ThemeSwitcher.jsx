import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Monitor, Palette, Check } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const ThemeSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { currentTheme, systemTheme, setTheme } = useTheme();

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

  const handleThemeChange = (themeId) => {
    setTheme(themeId);
    setIsOpen(false);
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
        className="fixed top-16 sm:top-20 right-4 sm:right-6 z-50 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-theme-lg hover:shadow-theme-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-2"
        style={{ '--tw-ring-offset-color': 'var(--bg-primary)' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle theme selector"
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        </motion.div>
      </motion.button>

      {/* Theme Selector Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-40 backdrop-blur-sm"
              style={{ backgroundColor: 'var(--bg-overlay)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Theme Panel */}
            <motion.div
              className="fixed top-16 sm:top-20 right-4 sm:right-16 md:right-20 z-50 backdrop-blur-md border rounded-2xl p-4 sm:p-6 w-80 max-w-[calc(100vw-2rem)] shadow-theme-xl"
              style={{ 
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-primary)'
              }}
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Palette className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-base sm:text-lg" style={{ color: 'var(--text-primary)' }}>Theme Preferences</h3>
                  <p className="text-xs sm:text-sm" style={{ color: 'var(--text-muted)' }}>Choose your interface style</p>
                </div>
              </div>

              <div className="space-y-2">
                {themes.map((theme) => (
                  <motion.button
                    key={theme.id}
                    onClick={() => handleThemeChange(theme.id)}
                    className="w-full p-3 sm:p-4 rounded-xl border transition-all duration-300 text-left"
                    style={{
                      backgroundColor: currentTheme === theme.id ? 'rgba(59, 130, 246, 0.1)' : 'var(--bg-card-hover)',
                      borderColor: currentTheme === theme.id ? 'rgba(59, 130, 246, 0.5)' : 'var(--border-secondary)'
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center"
                          style={{
                            backgroundColor: currentTheme === theme.id ? 'rgba(59, 130, 246, 0.2)' : 'var(--bg-tertiary)'
                          }}
                        >
                          <theme.icon 
                            className="w-4 h-4 sm:w-5 sm:h-5"
                            style={{
                              color: currentTheme === theme.id ? '#60a5fa' : 'var(--text-muted)'
                            }}
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-medium text-sm sm:text-base" style={{ color: 'var(--text-primary)' }}>{theme.name}</h4>
                          <p className="text-xs sm:text-sm truncate" style={{ color: 'var(--text-muted)' }}>{theme.description}</p>
                        </div>
                      </div>
                      
                      {currentTheme === theme.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                          className="flex-shrink-0"
                        >
                          <Check className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                        </motion.div>
                      )}
                    </div>

                    {/* Theme Preview */}
                    {theme.id !== 'system' && (
                      <div className="mt-3 flex gap-2">
                        <div 
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded border-2"
                          style={{ 
                            backgroundColor: theme.colors.primary,
                            borderColor: 'var(--border-primary)'
                          }}
                        />
                        <div 
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded border-2"
                          style={{ 
                            backgroundColor: theme.colors.secondary,
                            borderColor: 'var(--border-primary)'
                          }}
                        />
                        <div 
                          className="w-5 h-5 sm:w-6 sm:h-6 rounded border-2"
                          style={{ 
                            backgroundColor: theme.colors.accent,
                            borderColor: 'var(--border-primary)'
                          }}
                        />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              {/* System Theme Info */}
              {currentTheme === 'system' && (
                <motion.div
                  className="mt-4 p-3 rounded-lg border"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-secondary)'
                  }}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Monitor className="w-4 h-4 text-blue-400" />
                    <span style={{ color: 'var(--text-secondary)' }}>
                      Currently using: <span className="font-medium capitalize" style={{ color: 'var(--text-primary)' }}>{systemTheme}</span> mode
                    </span>
                  </div>
                </motion.div>
              )}

              {/* Footer */}
              <div className="mt-4 sm:mt-6 pt-4 border-t" style={{ borderColor: 'var(--border-secondary)' }}>
                <p className="text-xs text-center" style={{ color: 'var(--text-muted)' }}>
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