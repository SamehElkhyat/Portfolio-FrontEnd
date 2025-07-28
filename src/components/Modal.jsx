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
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-secondary-dark border border-gray-800 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 w-10 h-10 flex items-center justify-center border border-text-secondary hover:border-accent-cyan text-text-secondary hover:text-accent-cyan transition-all duration-300 group"
            >
              <motion.div
                className="w-6 h-6 relative"
                whileHover={{ rotate: 90 }}
                transition={{ duration: 0.2 }}
              >
                <span className="absolute inset-0 flex items-center justify-center text-lg font-light">
                  ×
                </span>
              </motion.div>
            </button>

            {/* Content */}
            <div className="p-8 md:p-12">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="mb-8"
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                  <div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-montserrat font-bold text-text-primary mb-2">
                      {project.title}
                    </h2>
                    <p className="text-lg md:text-xl text-accent-cyan font-montserrat font-medium">
                      {project.category}
                    </p>
                  </div>
                </div>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {project.technologies.map((tech, index) => (
                    <motion.span
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                      className="px-3 py-1 text-sm font-montserrat font-medium text-accent-cyan border border-accent-cyan bg-accent-cyan bg-opacity-10"
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
                className="mb-8"
              >
                <div className="w-full h-64 md:h-96 bg-gradient-to-br from-secondary-dark to-primary-dark border border-gray-800 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 border-2 border-accent-cyan border-dashed rounded-full flex items-center justify-center">
                      <span className="text-2xl text-accent-cyan">🖼️</span>
                    </div>
                    <p className="text-text-secondary font-montserrat font-light">
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
                className="mb-8"
              >
                <h3 className="text-xl md:text-2xl font-montserrat font-bold text-text-primary mb-4">
                  Project Overview
                </h3>
                <p className="text-text-secondary font-montserrat font-light leading-relaxed text-base md:text-lg mb-6">
                  {project.description}
                </p>
                <p className="text-text-secondary font-montserrat font-light leading-relaxed text-base md:text-lg">
                  {project.details}
                </p>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-6 py-3 bg-accent-cyan text-primary-dark font-montserrat font-semibold hover:bg-accent-blue transition-all duration-300 transform hover:scale-105"
                >
                  <span className="mr-2">View Live Demo</span>
                  <span>↗</span>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-6 py-3 border-2 border-accent-cyan text-accent-cyan font-montserrat font-semibold hover:bg-accent-cyan hover:text-primary-dark transition-all duration-300 transform hover:scale-105"
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
                className="mt-12 pt-8 border-t border-gray-800"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div>
                    <h4 className="text-sm font-montserrat font-bold text-accent-cyan mb-2 uppercase tracking-wider">
                      Timeline
                    </h4>
                    <p className="text-text-secondary font-montserrat font-light">
                      3-4 months
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-montserrat font-bold text-accent-cyan mb-2 uppercase tracking-wider">
                      Role
                    </h4>
                    <p className="text-text-secondary font-montserrat font-light">
                      Full Stack Developer
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-montserrat font-bold text-accent-cyan mb-2 uppercase tracking-wider">
                      Status
                    </h4>
                    <p className="text-text-secondary font-montserrat font-light">
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
