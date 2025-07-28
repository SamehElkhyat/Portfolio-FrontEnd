import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Home,
  User,
  Code,
  Briefcase,
  Mail,
  Download,
  Clock,
  Sparkles,
} from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrollProgress, setScrollProgress] = useState(0);

  const navItems = [
    { id: "home", label: "Home", icon: Home, href: "#home" },
    { id: "skills", label: "Skills", icon: Code, href: "#skills" },
    { id: "projects", label: "Projects", icon: Briefcase, href: "#projects" },
    { id: "timeline", label: "Timeline", icon: Clock, href: "#timeline" },
    { id: "showcase", label: "Showcase", icon: Sparkles, href: "#showcase" },
    { id: "contact", label: "Contact", icon: Mail, href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min(scrollPosition / maxScroll, 1);

      setScrolled(scrollPosition > 50);
      setScrollProgress(progress);

      // Update active section based on scroll position with improved detection
      const sections = [
        "home",
        "skills",
        "projects",
        "timeline",
        "showcase",
        "contact",
      ];
      const sectionOffsets = sections.map((section) => {
        const element = document.getElementById(
          section === "home" ? "hero" : section
        );
        return element ? element.offsetTop - 150 : 0;
      });

      // Find the current section based on scroll position
      let currentSection = "home";
      for (let i = sections.length - 1; i >= 0; i--) {
        if (scrollPosition >= sectionOffsets[i]) {
          currentSection = sections[i];
          break;
        }
      }
      setActiveSection(currentSection);
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleKeyDown);

    // Call once to set initial state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const scrollToSection = (sectionId) => {
    const targetId = sectionId === "home" ? "hero" : sectionId;
    const element = document.getElementById(targetId);
    if (element) {
      const yOffset = -80; // Account for fixed navigation
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
    setIsOpen(false);
  };

      const handleDownloadResume = () => {
      // Create download link for the CV
      // Note: Make sure to place your actual CV file as 'cv.pdf' in the public folder
      const link = document.createElement("a");
      link.href = "/cv.pdf"; // Path to your CV file in the public folder
      link.download = "Sameh_Saleh_El-khayat_CV.pdf"; // Name for the downloaded file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-slate-900/95 backdrop-blur-md border-b border-slate-800/50 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.button
              onClick={() => scrollToSection("home")}
              className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Go to homepage"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-white font-bold text-xl hidden sm:block">
                Sameh
              </span>
            </motion.button>

            {/* Desktop Menu */}
            <div
              className="hidden md:flex items-center space-x-1"
              role="menubar"
            >
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                      : "text-gray-300 hover:text-white hover:bg-slate-800/50"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  role="menuitem"
                  aria-current={activeSection === item.id ? "page" : undefined}
                >
                  <item.icon className="w-4 h-4" aria-hidden="true" />
                  {item.label}
                </motion.button>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center gap-4">
              <motion.button
                onClick={handleDownloadResume}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white hover:shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Download resume"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Resume
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
              whileTap={{ scale: 0.95 }}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <motion.div
          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left"
          style={{ scaleX: scrollProgress }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: scrollProgress }}
          transition={{ duration: 0.1 }}
        />
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="md:hidden fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />

            {/* Mobile Menu Panel */}
            <motion.div
              id="mobile-menu"
              className="md:hidden fixed inset-y-0 right-0 z-50 w-80 bg-slate-900/95 backdrop-blur-md border-l border-slate-800/50"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation menu"
            >
              <div className="flex flex-col h-full p-6">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold">S</span>
                    </div>
                    <span className="text-white font-bold text-lg">Sameh</span>
                  </div>
                  <motion.button
                    onClick={() => setIsOpen(false)}
                    className="p-2 text-white hover:bg-slate-800/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    whileTap={{ scale: 0.95 }}
                    aria-label="Close menu"
                  >
                    <X className="w-6 h-6" />
                  </motion.button>
                </div>

                {/* Mobile Navigation Items */}
                <nav className="flex flex-col space-y-4 mb-8" role="list">
                  {navItems.map((item, index) => (
                    <motion.button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-lg transition-all duration-300 text-left ${
                        activeSection === item.id
                          ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-xl"
                          : "text-gray-300 hover:text-white hover:bg-slate-800/50"
                      }`}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      role="listitem"
                      aria-current={
                        activeSection === item.id ? "page" : undefined
                      }
                    >
                      <item.icon className="w-5 h-5" aria-hidden="true" />
                      {item.label}
                    </motion.button>
                  ))}
                </nav>

                {/* Mobile Resume Button */}
                <motion.button
                  onClick={handleDownloadResume}
                  className="flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl font-semibold text-lg text-white shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Download resume"
                >
                  <Download className="w-5 h-5" aria-hidden="true" />
                  Download Resume
                </motion.button>

                {/* Mobile Footer */}
                <div className="mt-auto pt-6 border-t border-slate-800/50">
                  <p className="text-gray-400 text-sm text-center">
                    Sameh Saleh El-khayat
                    <br />
                    <span className="text-blue-400">Frontend Developer</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Enhanced Floating Action Button */}
      <motion.div
        className="fixed bottom-8 right-8 z-50"
        initial={{ scale: 0, rotate: 180 }}
        animate={{ scale: scrolled ? 1 : 0, rotate: 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.button
          className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          whileHover={{ scale: 1.1, rotate: 15 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => scrollToSection("home")}
          aria-label="Scroll to top"
        >
          <Home className="w-6 h-6" aria-hidden="true" />
        </motion.button>
      </motion.div>
    </>
  );
};

export default Navigation;
