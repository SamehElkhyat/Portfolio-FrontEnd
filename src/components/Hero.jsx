import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { useInView } from "react-intersection-observer";
import MessengerChat from "./MessengerChat";
import {
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Download,
  Code,
  Palette,
  Zap,
} from "lucide-react";

const Hero = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

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

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Simulate component loading
    const timer = setTimeout(() => setIsLoaded(true), 100);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [-20, 20, -20],
      rotate: [0, 360],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const skillIcons = [
    { icon: Code, label: "Development", delay: 0 },
    { icon: Palette, label: "Design", delay: 0.5 },
    { icon: Zap, label: "Performance", delay: 1 },
  ];

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/SamehElkhyat",
      label: "GitHub",
      ariaLabel: "Visit my GitHub profile",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/sameh-salih-02179b271/",
      label: "LinkedIn",
      ariaLabel: "Connect with me on LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:ssalih292@gmail.com",
      label: "Email",
      ariaLabel: "Send me an email",
    },
  ];

  const handleCollaborate = () => {
    // Smooth scroll to contact section
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Animated Grid */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>

        <MessengerChat />
        {/* Mouse Follower Gradient */}
        {isLoaded && (
          <motion.div
            className="absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-3xl"
            animate={{
              x: mousePosition.x - 192,
              y: mousePosition.y - 192,
            }}
            transition={{ type: "spring", mass: 3, stiffness: 50, damping: 50 }}
          />
        )}

        {/* Floating Orbs */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-4 h-4 rounded-full ${
              i % 2 === 0 ? "bg-blue-500" : "bg-purple-500"
            } opacity-30`}
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + i * 10}%`,
            }}
            variants={floatingVariants}
            animate="animate"
            transition={{ delay: i * 0.5 }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          ref={ref}
          className="text-center max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* availability badge removed */}

          {/* Name with Typewriter */}
          <motion.div  variants={itemVariants} className=" flex flex-col items-center mt-[42px]">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4 leading-tight">
              Sameh Saleh El-khayat
            </h1>
            <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-gray-300 h-16 sm:h-18 md:h-20">
              <Typewriter
                options={{
                  strings: [
                    "Frontend Developer",
                    "React.js / Next.js Developer",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 100,
                  deleteSpeed: 50,
                  pauseFor: 1500,
                }}
              />
            </div>
          </motion.div>

          {/* Professional Description */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl lg:text-2xl text-gray-400 max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed px-4 sm:px-0"
          >
            Crafting{" "}
            <span className="text-blue-400 font-semibold">
              exceptional digital experiences
            </span>{" "}
            with cutting-edge technologies. Specialized in building scalable
            applications that drive business growth and deliver{" "}
            <span className="text-purple-400 font-semibold">
              measurable results
            </span>
            .
          </motion.p>

          {/* Skill Icons */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12 px-4"
            role="list"
            aria-label="Core competencies"
          >
            {skillIcons.map(({ icon: Icon, label, delay }, index) => (
              <motion.div
                key={label}
                className="flex flex-col items-center group cursor-pointer"
                whileHover={{ scale: 1.1, y: -5 }}
                transition={{ type: "spring", bounce: 0.4 }}
                role="listitem"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-2 sm:mb-3 group-hover:shadow-2xl group-hover:shadow-blue-500/25 transition-all duration-300">
                  <Icon
                    className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white"
                    aria-hidden="true"
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-400 group-hover:text-white transition-colors text-center">
                  {label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-8 sm:mb-10 md:mb-12 px-4"
          >
            <motion.button
              onClick={handleDownloadResume}
              className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Download my resume"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Download
                  className="w-4 h-4 sm:w-5 sm:h-5"
                  aria-hidden="true"
                />
                Download Resume
              </span>
            </motion.button>

            <motion.button
              onClick={handleCollaborate}
              className="group px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/20 rounded-full font-semibold text-white hover:bg-white hover:text-gray-900 transition-all duration-300 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900 text-sm sm:text-base"
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.1)",
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Get in touch for collaboration"
            >
              <span className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                Let's Collaborate
              </span>
            </motion.button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center gap-4 sm:gap-6 mb-8 sm:mb-10 md:mb-12 px-4"
            role="list"
            aria-label="Social media links"
          >
            {socialLinks.map(({ icon: Icon, href, label, ariaLabel }) => (
              <motion.a
                key={label}
                href={href}
                className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                aria-label={ariaLabel}
                role="listitem"
              >
                <Icon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <span className="text-gray-400 text-sm mb-4">
              Scroll to explore
            </span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center cursor-pointer"
              onClick={() =>
                document
                  .getElementById("skills")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              role="button"
              aria-label="Scroll to next section"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  document
                    .getElementById("skills")
                    ?.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-1 h-3 bg-white rounded-full mt-2"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Performance Stats Overlay */}
      <motion.div
        className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-8 md:right-8 bg-black/20 backdrop-blur-sm rounded-xl p-3 sm:p-4 border border-white/10 hidden sm:block"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        role="complementary"
        aria-label="Portfolio statistics"
      >
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-white">98%</div>
          <div className="text-xs text-gray-400">Client Satisfaction</div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
