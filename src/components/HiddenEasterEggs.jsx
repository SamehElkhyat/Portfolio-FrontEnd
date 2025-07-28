import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code, Zap, Star, Heart, Rocket, Coffee, GamepadIcon,
  Eye, EyeOff, Volume2, VolumeX, Sparkles, Crown, 
  Gift, Lock, Unlock, Cpu, Activity
} from 'lucide-react';

const HiddenEasterEggs = () => {
  const [isDevMode, setIsDevMode] = useState(false);
  const [konamiCode, setKonamiCode] = useState([]);
  const [showSecretPanel, setShowSecretPanel] = useState(false);
  const [matrixMode, setMatrixMode] = useState(false);
  const [heartRain, setHeartRain] = useState(false);
  const [secretAchievements, setSecretAchievements] = useState([]);
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [showStats, setShowStats] = useState(false);
  const [secretMessage, setSecretMessage] = useState('');

  // Konami Code: ↑↑↓↓←→←→BA
  const konamiSequence = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];

  const achievements = [
    { id: 'konami', name: 'Code Master', description: 'Discovered the Konami Code!', icon: GamepadIcon },
    { id: 'dev-mode', name: 'Developer Mode', description: 'Activated secret developer mode', icon: Code },
    { id: 'matrix', name: 'Digital Rain', description: 'Entered the Matrix', icon: Cpu },
    { id: 'hearts', name: 'Love is in the Air', description: 'Made hearts rain from the sky', icon: Heart },
    { id: 'speed-clicker', name: 'Speed Demon', description: 'Clicked 10 times in 2 seconds', icon: Zap },
    { id: 'secret-panel', name: 'Hidden Explorer', description: 'Found the secret control panel', icon: Eye },
    { id: 'coffee-break', name: 'Coffee Lover', description: 'Triggered the coffee break mode', icon: Coffee }
  ];

  const unlockAchievement = useCallback((achievementId) => {
    if (!secretAchievements.includes(achievementId)) {
      setSecretAchievements(prev => [...prev, achievementId]);
      const achievement = achievements.find(a => a.id === achievementId);
      setSecretMessage(`🏆 Achievement Unlocked: ${achievement.name}!`);
      setTimeout(() => setSecretMessage(''), 3000);
    }
  }, [secretAchievements, achievements]);

  // Konami Code Detection
  useEffect(() => {
    const handleKeyPress = (e) => {
      const newSequence = [...konamiCode, e.code].slice(-konamiSequence.length);
      setKonamiCode(newSequence);

      // Check if konami code is complete
      if (JSON.stringify(newSequence) === JSON.stringify(konamiSequence)) {
        setShowSecretPanel(true);
        unlockAchievement('konami');
        setKonamiCode([]);
      }

      // Secret key combinations
      if (e.ctrlKey && e.shiftKey && e.code === 'KeyD') {
        e.preventDefault();
        setIsDevMode(!isDevMode);
        unlockAchievement('dev-mode');
      }

      if (e.ctrlKey && e.altKey && e.code === 'KeyM') {
        e.preventDefault();
        setMatrixMode(!matrixMode);
        unlockAchievement('matrix');
      }

      if (e.ctrlKey && e.shiftKey && e.code === 'KeyH') {
        e.preventDefault();
        setHeartRain(!heartRain);
        unlockAchievement('hearts');
      }

      if (e.ctrlKey && e.shiftKey && e.code === 'KeyC') {
        e.preventDefault();
        unlockAchievement('coffee-break');
        showCoffeeBreak();
      }

      if (e.ctrlKey && e.shiftKey && e.code === 'KeyS') {
        e.preventDefault();
        setShowStats(!showStats);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [konamiCode, isDevMode, matrixMode, heartRain, showStats, unlockAchievement]);

  // Speed clicking detection
  const handleSecretClick = () => {
    const now = Date.now();
    setClickCount(prev => prev + 1);
    
    if (now - lastClickTime < 200) { // Fast clicking
      if (clickCount >= 9) { // 10 clicks total
        unlockAchievement('speed-clicker');
        setClickCount(0);
      }
    } else {
      setClickCount(1);
    }
    setLastClickTime(now);
  };

  const showCoffeeBreak = () => {
    document.body.style.filter = 'sepia(100%) hue-rotate(20deg)';
    setTimeout(() => {
      document.body.style.filter = 'none';
    }, 3000);
  };

  // Matrix Rain Effect
  useEffect(() => {
    if (!matrixMode) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    canvas.style.background = 'rgba(0, 0, 0, 0.1)';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*()';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array.from({ length: columns }, () => 1);

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0f0';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 33);

    return () => {
      clearInterval(interval);
      document.body.removeChild(canvas);
    };
  }, [matrixMode]);

  return (
    <>
      {/* Secret Achievement Notification */}
      <AnimatePresence>
        {secretMessage && (
          <motion.div
            className="fixed top-24 right-6 z-50 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-lg shadow-lg"
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          >
            <div className="flex items-center gap-3">
              <Crown className="w-5 h-5" />
              <span className="font-medium">{secretMessage}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Heart Rain Effect */}
      <AnimatePresence>
        {heartRain && (
          <div className="fixed inset-0 pointer-events-none z-40">
            {Array.from({ length: 50 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-red-500 text-2xl"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: -50,
                  rotate: 0,
                  scale: Math.random() * 0.5 + 0.5
                }}
                animate={{
                  y: window.innerHeight + 50,
                  rotate: 360,
                  x: Math.random() * window.innerWidth
                }}
                transition={{
                  duration: Math.random() * 3 + 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              >
                ❤️
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Secret Control Panel */}
      <AnimatePresence>
        {showSecretPanel && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSecretPanel(false)}
            />

            {/* Secret Panel */}
            <motion.div
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gradient-to-br from-gray-900 to-black border border-green-500/50 rounded-2xl p-8 min-w-96 shadow-2xl"
              initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
              animate={{ opacity: 1, scale: 1, rotateY: 0 }}
              exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-green-400 mb-2">🎭 SECRET CONTROL PANEL</h2>
                <p className="text-gray-300 text-sm">You've discovered the hidden developer console!</p>
              </div>

              {/* Secret Controls */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <motion.button
                    onClick={() => setMatrixMode(!matrixMode)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      matrixMode 
                        ? 'bg-green-500/20 border-green-500/50 text-green-400' 
                        : 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Cpu className="w-5 h-5 mb-2" />
                    <div className="text-sm font-medium">Matrix Mode</div>
                    <div className="text-xs opacity-75">Digital rain effect</div>
                  </motion.button>

                  <motion.button
                    onClick={() => setHeartRain(!heartRain)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      heartRain 
                        ? 'bg-red-500/20 border-red-500/50 text-red-400' 
                        : 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Heart className="w-5 h-5 mb-2" />
                    <div className="text-sm font-medium">Heart Rain</div>
                    <div className="text-xs opacity-75">Love is in the air</div>
                  </motion.button>

                  <motion.button
                    onClick={() => setIsDevMode(!isDevMode)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      isDevMode 
                        ? 'bg-blue-500/20 border-blue-500/50 text-blue-400' 
                        : 'bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600/50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Code className="w-5 h-5 mb-2" />
                    <div className="text-sm font-medium">Dev Mode</div>
                    <div className="text-xs opacity-75">Show debug info</div>
                  </motion.button>

                  <motion.button
                    onClick={showCoffeeBreak}
                    className="p-3 rounded-lg border bg-gray-800/50 border-gray-700/50 text-gray-300 hover:border-gray-600/50 text-left transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Coffee className="w-5 h-5 mb-2" />
                    <div className="text-sm font-medium">Coffee Break</div>
                    <div className="text-xs opacity-75">Warm sepia filter</div>
                  </motion.button>
                </div>
              </div>

              {/* Achievements */}
              <div className="mb-6">
                <h3 className="text-white font-medium mb-3 flex items-center gap-2">
                  <Crown className="w-4 h-4 text-yellow-400" />
                  Secret Achievements ({secretAchievements.length}/{achievements.length})
                </h3>
                <div className="grid grid-cols-2 gap-2 max-h-32 overflow-y-auto">
                  {achievements.map((achievement) => {
                    const isUnlocked = secretAchievements.includes(achievement.id);
                    return (
                      <div
                        key={achievement.id}
                        className={`p-2 rounded border text-xs transition-all ${
                          isUnlocked
                            ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300'
                            : 'bg-gray-800/30 border-gray-700/30 text-gray-500'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <achievement.icon className="w-3 h-3" />
                          <span className="font-medium">{achievement.name}</span>
                        </div>
                        <div className="opacity-75">{achievement.description}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Secret Shortcuts */}
              <div className="text-xs text-gray-400 mb-6">
                <h4 className="font-medium text-gray-300 mb-2">🔑 Secret Shortcuts:</h4>
                <div className="space-y-1">
                  <div>Ctrl+Shift+D - Toggle Dev Mode</div>
                  <div>Ctrl+Alt+M - Matrix Mode</div>
                  <div>Ctrl+Shift+H - Heart Rain</div>
                  <div>Ctrl+Shift+C - Coffee Break</div>
                  <div>↑↑↓↓←→←→BA - Konami Code</div>
                </div>
              </div>

              <motion.button
                onClick={() => setShowSecretPanel(false)}
                className="w-full px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-lg hover:from-gray-500 hover:to-gray-600 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Close Secret Panel
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Dev Mode Stats */}
      <AnimatePresence>
        {(isDevMode || showStats) && (
          <motion.div
            className="fixed bottom-6 left-6 z-40 bg-black/90 backdrop-blur-sm border border-green-500/50 rounded-lg p-4 font-mono text-xs text-green-400"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4" />
              <span className="font-bold">DEV MODE</span>
            </div>
            <div className="space-y-1">
              <div>🖱️ Clicks: {clickCount}</div>
              <div>🏆 Achievements: {secretAchievements.length}/{achievements.length}</div>
              <div>🎮 Matrix: {matrixMode ? 'ON' : 'OFF'}</div>
              <div>❤️ Hearts: {heartRain ? 'ON' : 'OFF'}</div>
              <div>🕒 {new Date().toLocaleTimeString()}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden Click Area */}
      <div
        className="fixed bottom-0 right-0 w-20 h-20 opacity-0 cursor-pointer z-30"
        onClick={handleSecretClick}
        title="Secret click area"
      />

      {/* Konami Code Progress */}
      <AnimatePresence>
        {konamiCode.length > 0 && (
          <motion.div
            className="fixed bottom-6 right-6 z-40 bg-purple-900/90 backdrop-blur-sm border border-purple-500/50 rounded-lg p-3 text-purple-300 text-xs font-mono"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-1">
              <GamepadIcon className="w-3 h-3" />
              <span>Konami Progress</span>
            </div>
            <div className="text-xs">
              {konamiCode.length}/{konamiSequence.length} keys
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HiddenEasterEggs; 