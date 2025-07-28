import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SecretParticleSystem = ({ isActive, type = 'stars' }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);
  const [isVisible, setIsVisible] = useState(false);

  const particleTypes = {
    stars: {
      count: 100,
      color: '#fff',
      size: 2,
      speed: 1,
      glow: true
    },
    fireflies: {
      count: 30,
      color: '#ffeb3b',
      size: 4,
      speed: 0.5,
      glow: true,
      twinkle: true
    },
    snow: {
      count: 150,
      color: '#ffffff',
      size: 3,
      speed: 1.5,
      gravity: true
    },
    neon: {
      count: 50,
      color: '#00ff88',
      size: 3,
      speed: 2,
      glow: true,
      trails: true
    },
    rainbow: {
      count: 80,
      size: 3,
      speed: 1.2,
      multicolor: true
    }
  };

  const config = particleTypes[type] || particleTypes.stars;

  useEffect(() => {
    if (isActive) {
      setIsVisible(true);
      initParticles();
      startAnimation();
    } else {
      setIsVisible(false);
      stopAnimation();
    }

    return () => stopAnimation();
  }, [isActive, type]);

  const initParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particlesRef.current = Array.from({ length: config.count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * config.speed,
      vy: config.gravity ? Math.random() * config.speed : (Math.random() - 0.5) * config.speed,
      size: Math.random() * config.size + 1,
      alpha: Math.random() * 0.8 + 0.2,
      color: config.multicolor 
        ? `hsl(${Math.random() * 360}, 70%, 60%)`
        : config.color,
      life: 1,
      twinkle: config.twinkle ? Math.random() * Math.PI * 2 : 0,
      trail: []
    }));
  };

  const updateParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    particlesRef.current.forEach(particle => {
      // Store trail position
      if (config.trails) {
        particle.trail.push({ x: particle.x, y: particle.y });
        if (particle.trail.length > 10) {
          particle.trail.shift();
        }
      }

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Gravity effect
      if (config.gravity) {
        particle.vy += 0.02;
      }

      // Twinkle effect
      if (config.twinkle) {
        particle.twinkle += 0.1;
        particle.alpha = 0.5 + Math.sin(particle.twinkle) * 0.3;
      }

      // Wrap around screen
      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;

      // Random movement variation
      if (Math.random() < 0.01) {
        particle.vx += (Math.random() - 0.5) * 0.1;
        particle.vy += (Math.random() - 0.5) * 0.1;
      }
    });
  };

  const drawParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particlesRef.current.forEach(particle => {
      ctx.save();

      // Draw trail
      if (config.trails && particle.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
        particle.trail.forEach((point, index) => {
          const alpha = (index / particle.trail.length) * particle.alpha * 0.5;
          ctx.globalAlpha = alpha;
          ctx.lineTo(point.x, point.y);
        });
        ctx.strokeStyle = particle.color;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Set particle style
      ctx.globalAlpha = particle.alpha;
      
      if (config.glow) {
        ctx.shadowColor = particle.color;
        ctx.shadowBlur = particle.size * 2;
      }

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();

      // Add extra glow for special effects
      if (type === 'fireflies') {
        ctx.globalAlpha = particle.alpha * 0.3;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
      }

      ctx.restore();
    });
  };

  const startAnimation = () => {
    const animate = () => {
      updateParticles();
      drawParticles();
      animationRef.current = requestAnimationFrame(animate);
    };
    animate();
  };

  const stopAnimation = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (canvas && isActive) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isActive]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.canvas
          ref={canvasRef}
          className="fixed inset-0 pointer-events-none z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{
            background: type === 'stars' ? 'radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)' : 'transparent'
          }}
        />
      )}
    </AnimatePresence>
  );
};

// Particle System Controller
const ParticleController = () => {
  const [activeEffects, setActiveEffects] = useState({});
  const [sequence, setSequence] = useState([]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      // Secret particle combinations
      if (e.ctrlKey && e.altKey) {
        switch (e.code) {
          case 'KeyS':
            e.preventDefault();
            toggleEffect('stars');
            break;
          case 'KeyF':
            e.preventDefault();
            toggleEffect('fireflies');
            break;
          case 'KeyN':
            e.preventDefault();
            toggleEffect('snow');
            break;
          case 'KeyG':
            e.preventDefault();
            toggleEffect('neon');
            break;
          case 'KeyR':
            e.preventDefault();
            toggleEffect('rainbow');
            break;
          case 'KeyX':
            e.preventDefault();
            clearAllEffects();
            break;
        }
      }

      // Magic sequence: PARTICLE
      const magicSequence = ['KeyP', 'KeyA', 'KeyR', 'KeyT', 'KeyI', 'KeyC', 'KeyL', 'KeyE'];
      const newSequence = [...sequence, e.code].slice(-magicSequence.length);
      setSequence(newSequence);

      if (JSON.stringify(newSequence) === JSON.stringify(magicSequence)) {
        activateAllEffects();
        setSequence([]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [sequence]);

  const toggleEffect = (effectType) => {
    setActiveEffects(prev => ({
      ...prev,
      [effectType]: !prev[effectType]
    }));
  };

  const clearAllEffects = () => {
    setActiveEffects({});
  };

  const activateAllEffects = () => {
    setActiveEffects({
      stars: true,
      fireflies: true,
      rainbow: true
    });
    
    // Auto-clear after 10 seconds
    setTimeout(() => {
      clearAllEffects();
    }, 10000);
  };

  return (
    <>
      {Object.entries(activeEffects).map(([type, isActive]) => 
        isActive && (
          <SecretParticleSystem
            key={type}
            type={type}
            isActive={isActive}
          />
        )
      )}
      
      {/* Particle Instructions (only show if any effect is active) */}
      <AnimatePresence>
        {Object.values(activeEffects).some(Boolean) && (
          <motion.div
            className="fixed top-6 left-6 z-40 bg-black/80 backdrop-blur-sm border border-purple-500/50 rounded-lg p-3 text-purple-300 text-xs font-mono max-w-xs"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <div className="font-bold mb-2">🌟 Particle System Active</div>
            <div className="space-y-1 text-xs">
              <div>Ctrl+Alt+S - Stars</div>
              <div>Ctrl+Alt+F - Fireflies</div>
              <div>Ctrl+Alt+N - Snow</div>
              <div>Ctrl+Alt+G - Neon</div>
              <div>Ctrl+Alt+R - Rainbow</div>
              <div>Ctrl+Alt+X - Clear All</div>
              <div className="pt-2 text-yellow-300">Type "PARTICLE" for magic!</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ParticleController; 