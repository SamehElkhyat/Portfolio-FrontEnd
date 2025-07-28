import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { 
      icon: Github, 
      href: "https://github.com", 
      label: "GitHub",
      color: "hover:text-gray-300"
    },
    { 
      icon: Linkedin, 
      href: "https://linkedin.com", 
      label: "LinkedIn",
      color: "hover:text-blue-400"
    },
    { 
      icon: Mail, 
      href: "mailto:sameh@example.com", 
      label: "Email",
      color: "hover:text-green-400"
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-slate-800/50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8">
          {/* Logo and Name */}
          <motion.div 
            className="flex items-center gap-3 mb-6 md:mb-0"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg">Sameh Saleh El-khayat</h3>
              <p className="text-gray-400 text-sm">Frontend Developer</p>
            </div>
          </motion.div>

          {/* Social Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`text-gray-400 ${social.color} transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded`}
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                aria-label={`Visit my ${social.label} profile`}
              >
                <social.icon className="w-6 h-6" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800/50 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            {/* Copyright */}
            <p className="text-gray-400 text-sm mb-4 md:mb-0 text-center md:text-left">
              © {currentYear} Sameh Saleh El-khayat. Made with{' '}
              <motion.span
                className="inline-flex items-center gap-1 text-red-400"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}
              >
                <Heart className="w-4 h-4 fill-current" aria-hidden="true" />
              </motion.span>
              {' '}in Cairo
            </p>

            {/* Back to top */}
            <motion.button
              onClick={scrollToTop}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg px-3 py-2"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll to top"
            >
              <span className="text-sm">Back to top</span>
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </motion.button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 