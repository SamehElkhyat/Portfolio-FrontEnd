import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Send, RefreshCw, Download, User, Coffee } from 'lucide-react';

const InteractiveTerminal = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const commands = {
    help: {
      description: 'Show available commands',
      execute: () => {
        const commandList = Object.keys(commands).map(cmd => 
          `  ${cmd.padEnd(12)} - ${commands[cmd].description}`
        ).join('\n');
        return `Available commands:\n${commandList}\n\nTip: Use 'clear' to clear the terminal!`;
      }
    },
    about: {
      description: 'Learn about Sameh',
      execute: () => `👨‍💻 Sameh Saleh El-khayat
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🌍 Location: Cairo, Egypt
💼 Role: Frontend Developer
🚀 Experience: 3+ years
💡 Passion: Creating amazing web experiences

Skills: React.js, TypeScript, Node.js, AWS
Current Focus: Building scalable applications`
    },
    skills: {
      description: 'Display technical skills',
      execute: () => `🛠️ Technical Skills
━━━━━━━━━━━━━━━━━━━━━━━━
Frontend:
  ⚛️  React.js         ████████████ 95%
  📘 TypeScript       ███████████  90%
  🎨 CSS/Tailwind     ████████████ 92%

Backend:
  🟢 Node.js          ███████████  88%
  🐍 Python           ██████████   85%
  🗄️  MongoDB         ███████████  82%

Tools:
  ☁️  AWS              █████████    80%
  🐳 Docker           ████████     78%
  📊 Git              ████████████ 95%`
    },
    projects: {
      description: 'List featured projects',
      execute: () => `🚀 Featured Projects
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. E-Commerce Platform
   Tech: React, Node.js, AWS
   Impact: 100K+ users, 40% performance boost

2. AI Analytics Dashboard
   Tech: Python, React, TensorFlow
   Features: Real-time ML insights

3. Mobile Health Tracker
   Tech: React Native, Firebase
   Downloads: 10K+, 4.8⭐ rating

Type 'demo <project-name>' for more details!`
    },
    contact: {
      description: 'Get contact information',
      execute: () => `📧 Contact Information
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Email: sameh@example.com
Phone: +20 (10) 123-4567
LinkedIn: linkedin.com/in/sameh
GitHub: github.com/sameh

🌍 Available for remote work worldwide
⏰ Timezone: EET (UTC+2)
📅 Available: Sun-Thu 9AM-6PM

Ready to collaborate on your next project! 🚀`
    },
    resume: {
      description: 'Download resume',
      execute: () => {
        // Simulate resume download
        return `📄 Resume Download
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Resume.pdf downloading...
📊 File size: 2.3 MB
🎯 Updated: December 2024

Check your downloads folder! 📁`;
      }
    },
    joke: {
      description: 'Get a programming joke',
      execute: () => {
        const jokes = [
          "Why do programmers prefer dark mode?\nBecause light attracts bugs! 🐛",
          "How many programmers does it take to change a light bulb?\nNone. That's a hardware problem! 💡",
          "Why did the programmer quit their job?\nThey didn't get arrays! 📊",
          "What's a programmer's favorite hangout place?\nFoo Bar! 🍺",
          "Why do Java developers wear glasses?\nBecause they can't C#! 👓"
        ];
        return jokes[Math.floor(Math.random() * jokes.length)];
      }
    },
    clear: {
      description: 'Clear terminal screen',
      execute: () => {
        setHistory([]);
        return null;
      }
    },
    date: {
      description: 'Show current date and time',
      execute: () => new Date().toString()
    },
    whoami: {
      description: 'Display current user',
      execute: () => 'visitor@sameh-portfolio:~$ You are viewing Sameh\'s interactive portfolio! 👋'
    },
    ls: {
      description: 'List portfolio sections',
      execute: () => `📁 Portfolio Sections
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
drwxr-xr-x  hero/           Landing page & introduction
drwxr-xr-x  skills/         Technical expertise
drwxr-xr-x  projects/       Featured work & demos
drwxr-xr-x  timeline/       Career progression
drwxr-xr-x  contact/        Get in touch

Use navigation menu to explore! 🧭`
    }
  };

  useEffect(() => {
    // Initial welcome message
    typeMessage(`🌟 Welcome to Sameh's Interactive Terminal! 
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Type 'help' to see available commands.
Type 'about' to learn more about me.

Ready to explore? Let's get started! 🚀`, 'system');
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const typeMessage = async (message, type = 'output', delay = 30) => {
    if (!message) return;
    
    setIsTyping(true);
    const chars = message.split('');
    let currentMessage = '';
    
    for (let i = 0; i < chars.length; i++) {
      currentMessage += chars[i];
      setHistory(prev => {
        const newHistory = [...prev];
        const lastEntry = newHistory[newHistory.length - 1];
        
        if (lastEntry && lastEntry.type === type && lastEntry.isTyping) {
          newHistory[newHistory.length - 1] = {
            ...lastEntry,
            content: currentMessage
          };
        } else {
          newHistory.push({
            type,
            content: currentMessage,
            timestamp: Date.now(),
            isTyping: true
          });
        }
        return newHistory;
      });
      
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    setHistory(prev => {
      const newHistory = [...prev];
      const lastEntry = newHistory[newHistory.length - 1];
      if (lastEntry && lastEntry.isTyping) {
        newHistory[newHistory.length - 1] = {
          ...lastEntry,
          isTyping: false
        };
      }
      return newHistory;
    });
    
    setIsTyping(false);
  };

  const executeCommand = async (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    // Add command to history
    setHistory(prev => [...prev, {
      type: 'command',
      content: `$ ${cmd}`,
      timestamp: Date.now()
    }]);

    // Update command history
    setCommandHistory(prev => [...prev, cmd]);
    setHistoryIndex(-1);

    if (trimmedCmd === '') return;

    if (commands[trimmedCmd]) {
      const result = commands[trimmedCmd].execute();
      if (result) {
        await typeMessage(result, 'output');
      }
    } else {
      await typeMessage(`Command not found: ${trimmedCmd}
Type 'help' to see available commands.`, 'error');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && !isTyping) {
      executeCommand(input);
      setInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const clearTerminal = () => {
    setHistory([]);
    typeMessage('Terminal cleared! 🧹', 'system');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-gradient-to-br from-slate-900/90 to-black/90 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-green-500/50 transition-all duration-300"
    >
      {/* Terminal Header */}
      <div className="flex items-center justify-between bg-slate-800/50 px-4 py-3 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-green-400" />
            <span className="text-green-400 font-mono text-sm">sameh@portfolio:~$</span>
          </div>
        </div>

        <div className="flex gap-2">
          <motion.button
            onClick={clearTerminal}
            className="p-1 text-gray-400 hover:text-white transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            title="Clear terminal"
          >
            <RefreshCw className="w-4 h-4" />
          </motion.button>
        </div>
      </div>

      {/* Terminal Content */}
      <div
        ref={terminalRef}
        className="h-96 overflow-y-auto p-4 bg-slate-950/50 font-mono text-sm"
        onClick={() => inputRef.current?.focus()}
      >
        <AnimatePresence>
          {history.map((entry, index) => (
            <motion.div
              key={entry.timestamp + index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`mb-2 ${
                entry.type === 'command' 
                  ? 'text-green-400' 
                  : entry.type === 'error' 
                  ? 'text-red-400'
                  : entry.type === 'system'
                  ? 'text-blue-400'
                  : 'text-gray-300'
              }`}
            >
              <pre className="whitespace-pre-wrap">{entry.content}</pre>
              {entry.isTyping && (
                <span className="animate-pulse text-green-400">|</span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Input Line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <span className="text-green-400">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent text-green-400 outline-none font-mono"
            placeholder={isTyping ? "Please wait..." : "Type a command..."}
            disabled={isTyping}
            autoFocus
          />
          <motion.button
            type="submit"
            disabled={isTyping || !input.trim()}
            className="p-1 text-green-400 hover:text-green-300 disabled:opacity-50 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Send className="w-4 h-4" />
          </motion.button>
        </form>
      </div>

      {/* Quick Commands */}
      <div className="bg-slate-800/30 px-4 py-3 border-t border-slate-700/50">
        <div className="flex flex-wrap gap-2">
          {['help', 'about', 'skills', 'projects', 'contact'].map((cmd) => (
            <motion.button
              key={cmd}
              onClick={() => {
                setInput(cmd);
                inputRef.current?.focus();
              }}
              className="px-2 py-1 text-xs bg-slate-700/50 text-gray-300 rounded hover:bg-slate-600/50 transition-colors font-mono"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cmd}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveTerminal; 