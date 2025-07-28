import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code, Play, Download, Share, Copy, Eye, EyeOff, RefreshCw } from 'lucide-react';

const LiveCodeEditor = () => {
  const [activeLanguage, setActiveLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [showPreview, setShowPreview] = useState(true);

  const codeExamples = {
    javascript: {
      name: 'JavaScript',
      code: `// Interactive Portfolio Demo
function createParticleEffect() {
  const particles = [];
  
  for (let i = 0; i < 50; i++) {
    particles.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      color: \`hsl(\${Math.random() * 360}, 70%, 60%)\`
    });
  }
  
  return particles;
}

// Animation function
function animateParticles(particles) {
  particles.forEach(particle => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    
    // Bounce off edges
    if (particle.x < 0 || particle.x > 400) particle.vx *= -1;
    if (particle.y < 0 || particle.y > 300) particle.vy *= -1;
  });
}

console.log("🎨 Particle system initialized!");
console.log("✨ " + createParticleEffect().length + " particles created");`,
      output: '🎨 Particle system initialized!\n✨ 50 particles created'
    },
    react: {
      name: 'React',
      code: `// React Component Example
function InteractiveCard({ title, description }) {
  const [isHovered, setIsHovered] = useState(false);
  const [clicks, setClicks] = useState(0);
  
  return (
    <div 
      className="card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setClicks(prev => prev + 1)}
      style={{
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        transition: 'transform 0.3s ease'
      }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
      <div>
        Clicked: {clicks} times
        {isHovered && " 🔥"}
      </div>
    </div>
  );
}

// Usage
<InteractiveCard 
  title="My Portfolio" 
  description="Built with React & creativity!"
/>`,
      output: 'React component rendered successfully!\nInteractive features: hover effects, click counter'
    },
    css: {
      name: 'CSS',
      code: `/* Modern CSS Animation */
.floating-element {
  animation: float 3s ease-in-out infinite;
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  border-radius: 20px;
  padding: 20px;
  color: white;
  box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
}

@keyframes float {
  0%, 100% { 
    transform: translateY(0px) rotate(0deg); 
  }
  50% { 
    transform: translateY(-20px) rotate(5deg); 
  }
}

.gradient-text {
  background: linear-gradient(
    45deg, 
    #3b82f6, 
    #8b5cf6, 
    #06b6d4
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  font-size: 2rem;
  font-weight: bold;
}

/* Glass morphism effect */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}`,
      output: 'CSS styles applied successfully!\nAnimations: floating effect, gradient text, glass morphism'
    },
    html: {
      name: 'HTML',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Interactive Portfolio</title>
  <style>
    .hero {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 60px 20px;
      text-align: center;
    }
    .skill-badge {
      display: inline-block;
      background: rgba(255,255,255,0.2);
      padding: 8px 16px;
      margin: 4px;
      border-radius: 20px;
      backdrop-filter: blur(10px);
    }
  </style>
</head>
<body>
  <section class="hero">
    <h1>Sameh Saleh El-khayat</h1>
    <p>Frontend Developer from Cairo, Egypt</p>
    <div>
      <span class="skill-badge">React.js</span>
      <span class="skill-badge">TypeScript</span>
      <span class="skill-badge">Node.js</span>
    </div>
  </section>
</body>
</html>`,
      output: 'HTML structure created successfully!\nElements: hero section, skill badges, responsive design'
    }
  };

  useEffect(() => {
    setCode(codeExamples[activeLanguage].code);
    setOutput(codeExamples[activeLanguage].output);
  }, [activeLanguage]);

  const runCode = async () => {
    setIsRunning(true);
    
    // Simulate code execution
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    let executionOutput = '';
    
    try {
      if (activeLanguage === 'javascript') {
        // Simulate JavaScript execution
        executionOutput = `✅ Code executed successfully!
📊 Performance: 98ms execution time
🎯 Memory usage: 2.4MB
🔧 No errors detected

Output:
${codeExamples[activeLanguage].output}

💡 Tip: Try modifying the particle count or colors!`;
      } else {
        executionOutput = `✅ ${codeExamples[activeLanguage].name} code processed!
${codeExamples[activeLanguage].output}
        
🚀 Ready for deployment!`;
      }
      
      setOutput(executionOutput);
    } catch (error) {
      setOutput(`❌ Error: ${error.message}`);
    } finally {
      setIsRunning(false);
    }
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    // Could add a toast notification here
  };

  const downloadCode = () => {
    const extension = {
      javascript: 'js',
      react: 'jsx',
      css: 'css',
      html: 'html'
    }[activeLanguage];
    
    const blob = new Blob([code], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-example.${extension}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const shareCode = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${codeExamples[activeLanguage].name} Code Example`,
          text: 'Check out this code example from Sameh\'s portfolio!',
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      copyCode();
      alert('Code copied to clipboard!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between bg-slate-800/50 px-6 py-4 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Code className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Live Code Editor</h3>
            <p className="text-gray-400 text-sm">Write, run, and share code</p>
          </div>
        </div>

        {/* Language Selector */}
        <div className="flex items-center gap-2">
          {Object.entries(codeExamples).map(([key, lang]) => (
            <button
              key={key}
              onClick={() => setActiveLanguage(key)}
              className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeLanguage === key
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-700/50 text-gray-300 hover:bg-slate-600/50'
              }`}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 h-96">
        {/* Code Editor */}
        <div className="relative">
          <div className="absolute top-3 right-3 flex gap-2 z-10">
            <motion.button
              onClick={copyCode}
              className="p-2 bg-slate-800/80 text-gray-400 hover:text-white rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Copy code"
            >
              <Copy className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={downloadCode}
              className="p-2 bg-slate-800/80 text-gray-400 hover:text-white rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Download code"
            >
              <Download className="w-4 h-4" />
            </motion.button>
            <motion.button
              onClick={shareCode}
              className="p-2 bg-slate-800/80 text-gray-400 hover:text-white rounded-lg transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              title="Share code"
            >
              <Share className="w-4 h-4" />
            </motion.button>
          </div>
          
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-full p-6 bg-slate-950/50 text-green-400 font-mono text-sm resize-none outline-none border-none"
            placeholder="Write your code here..."
            spellCheck="false"
          />
        </div>

        {/* Output/Preview Panel */}
        <div className="border-l border-slate-700/50 bg-slate-900/50">
          {/* Panel Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-800/30 border-b border-slate-700/50">
            <div className="flex items-center gap-2">
              <span className="text-white font-medium text-sm">Output</span>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 text-xs">Live</span>
              </div>
            </div>

            <div className="flex gap-2">
              <motion.button
                onClick={() => setShowPreview(!showPreview)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                title={showPreview ? "Hide preview" : "Show preview"}
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </motion.button>
              
              <motion.button
                onClick={runCode}
                disabled={isRunning}
                className="flex items-center gap-1 px-3 py-1 bg-green-500 hover:bg-green-600 disabled:bg-gray-600 text-white rounded-lg text-sm font-medium transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isRunning ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Play className="w-4 h-4" />
                )}
                {isRunning ? 'Running...' : 'Run'}
              </motion.button>
            </div>
          </div>

          {/* Output Content */}
          {showPreview && (
            <div className="p-4 h-full overflow-auto">
              <pre className="text-gray-300 text-sm whitespace-pre-wrap font-mono leading-relaxed">
                {output}
              </pre>
              
              {/* Visual Preview for CSS/HTML */}
              {(activeLanguage === 'css' || activeLanguage === 'html') && (
                <div className="mt-4 p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-lg border border-blue-500/20">
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                      Visual Preview
                    </div>
                    <div className="text-gray-400 text-sm">
                      Your {activeLanguage.toUpperCase()} would render beautifully! ✨
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-6 py-3 bg-slate-800/30 border-t border-slate-700/50">
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span>Language: {codeExamples[activeLanguage].name}</span>
          <span>Lines: {code.split('\n').length}</span>
          <span>Characters: {code.length}</span>
        </div>
        
        <div className="text-xs text-gray-500">
          Press Ctrl+Enter to run code
        </div>
      </div>
    </motion.div>
  );
};

export default LiveCodeEditor; 