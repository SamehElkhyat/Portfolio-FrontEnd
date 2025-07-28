import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Modal = ({ isOpen, onClose, project }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Backdrop */}
          <div className="absolute inset-0 bg-primary-dark bg-opacity-95 backdrop-blur-sm" />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 50 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-xs sm:max-w-sm md:max-w-2xl lg:max-w-4xl max-h-[90vh] overflow-y-auto bg-secondary-dark border border-gray-800 shadow-2xl rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 sm:top-4 sm:right-4 md:top-6 md:right-6 z-10 w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex items-center justify-center border border-text-secondary hover:border-accent-cyan text-text-secondary hover:text-accent-cyan transition-all duration-300 group rounded"
            >
              <motion.div
                className="w-5 h-5 sm:w-6 sm:h-6 relative"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <span className="absolute inset-0 flex items-center justify-center text-base sm:text-lg font-light">
                  ×
                </span>
              </motion.div>
            </button>

            {/* Content */}
            <div className="p-4 sm:p-6 md:p-8 lg:p-12">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-6 sm:mb-8"
              >
                <div className="flex flex-col mb-4">
                  <div>
                    <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-montserrat font-bold text-text-primary mb-2 pr-8 sm:pr-12 md:pr-16">
                      {project.title}
                    </h2>
                    <p className="text-base sm:text-lg md:text-xl text-accent-cyan font-montserrat font-medium">
                      {project.category}
                    </p>
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mt-4 sm:mt-6">
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      className="px-2 sm:px-3 py-1 text-xs sm:text-sm font-montserrat font-medium text-accent-cyan border border-accent-cyan bg-accent-cyan bg-opacity-10 rounded"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Project Image Placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-6 sm:mb-8"
              >
                <div className="w-full h-48 sm:h-64 md:h-80 lg:h-96 bg-gradient-to-br from-secondary-dark to-primary-dark border border-gray-800 flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 border-2 border-accent-cyan border-dashed rounded-full flex items-center justify-center">
                      <span className="text-xl sm:text-2xl text-accent-cyan">🖼️</span>
                    </div>
                    <p className="text-text-secondary font-montserrat font-light text-sm sm:text-base">
                      Project Screenshot
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-6 sm:mb-8"
              >
                <h3 className="text-lg sm:text-xl md:text-2xl font-montserrat font-bold text-text-primary mb-3 sm:mb-4">
                  Project Overview
                </h3>
                <p className="text-text-secondary font-montserrat font-light leading-relaxed text-sm sm:text-base md:text-lg mb-4 sm:mb-6">
                  {project.description}
                </p>
                <p className="text-text-secondary font-montserrat font-light leading-relaxed text-sm sm:text-base md:text-lg">
                  {project.details}
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4"
              >
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 bg-accent-cyan text-primary-dark font-montserrat font-semibold hover:bg-accent-blue transition-all duration-300 transform hover:scale-105 text-sm sm:text-base rounded"
                >
                  <span className="mr-2">View Live Demo</span>
                  <span>↗</span>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 border-2 border-accent-cyan text-accent-cyan font-montserrat font-semibold hover:bg-accent-cyan hover:text-primary-dark transition-all duration-300 transform hover:scale-105 text-sm sm:text-base rounded"
                >
                  <span className="mr-2">View Source Code</span>
                  <span>→</span>
                </a>
              </motion.div>

              {/* Additional Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 sm:mt-10 md:mt-12 pt-6 sm:pt-8 border-t border-gray-800"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
                  <div>
                    <h4 className="text-xs sm:text-sm font-montserrat font-bold text-accent-cyan mb-1 sm:mb-2 uppercase tracking-wider">
                      Timeline
                    </h4>
                    <p className="text-text-secondary font-montserrat font-light text-sm sm:text-base">
                      3-4 months
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-montserrat font-bold text-accent-cyan mb-1 sm:mb-2 uppercase tracking-wider">
                      Role
                    </h4>
                    <p className="text-text-secondary font-montserrat font-light text-sm sm:text-base">
                      Full Stack Developer
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-montserrat font-bold text-accent-cyan mb-1 sm:mb-2 uppercase tracking-wider">
                      Status
                    </h4>
                    <p className="text-text-secondary font-montserrat font-light text-sm sm:text-base">
                      Completed
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
