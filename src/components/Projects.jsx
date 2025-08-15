import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import quran1 from "../components/assests/quran1.png";
import quran2 from "../components/assests/quran2.png";
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  ExternalLink,
  Github,
  TrendingUp,
  Award,
  Zap,
  Eye,
  Calendar,
  Code2,
  Sparkles,
} from "lucide-react";

const ProjectCard = ({ project, index, onOpenModal, viewMode }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [isHovered, setIsHovered] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);

  // Normalize images array from project.img which might be array, object, string, or empty
  const images = useMemo(() => {
    const src = project.img;
    let list = [];
    if (Array.isArray(src)) {
      list = src.filter(Boolean);
    } else if (src && typeof src === 'object') {
      list = Object.values(src).filter(Boolean);
    } else if (typeof src === 'string' && src.trim() !== '') {
      list = [src];
    }
    return list;
  }, [project.img]);

  // Auto-play carousel when hovered
  useEffect(() => {
    if (!images.length) return;
    if (!isHovered) return;
    const id = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(id);
  }, [isHovered, images.length]);

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
        delay: index * 0.1,
      },
    },
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpenModal(project);
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={`group cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2 focus-within:ring-offset-slate-900 rounded-2xl ${
        viewMode === "list" ? "flex gap-6" : "flex flex-col"
      }`}
      onClick={() => onOpenModal(project)}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title} project`}
    >
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 ${
          viewMode === "list"
            ? "rounded-2xl p-6 flex-1"
            : "rounded-2xl p-6 h-full"
        }`}
      >
        {/* Project Image/Preview */}
        <div
          className={`relative overflow-hidden rounded-xl mb-4 sm:mb-6 ${
            viewMode === "list"
              ? "w-32 h-20 sm:w-40 sm:h-28 md:w-48 md:h-32 flex-shrink-0"
              : "w-full h-40 sm:h-48"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20"></div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-80"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          />
          {images.length > 0 ? (
            <>
              {/* Image Slides */}
              <div className="absolute inset-0">
                {images.map((src, i) => (
                  <motion.img
                    key={src + i}
                    src={src}
                    alt={`${project.title} preview ${i + 1}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: i === currentImage ? 1 : 0, scale: i === currentImage && isHovered ? 1.05 : 1.02 }}
                    transition={{ duration: 0.4 }}
                    style={{ pointerEvents: 'none' }}
                  />
                ))}
              </div>

              {/* Controls (visible on hover) */}
              <div className={`absolute inset-0 flex items-center justify-between px-2 sm:px-3 ${isHovered ? 'opacity-100' : 'opacity-0'} transition-opacity duration-200`}>
                <button
                  type="button"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 text-white grid place-items-center hover:bg-black/60"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
                  }}
                  aria-label="Previous image"
                >
                  &#8592;
                </button>
                <button
                  type="button"
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-black/40 text-white grid place-items-center hover:bg-black/60"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentImage((prev) => (prev + 1) % images.length);
                  }}
                  aria-label="Next image"
                >
                  &#8594;
                </button>
              </div>

              {/* Dots */}
              <div className="absolute bottom-2 left-0 right-0 flex items-center justify-center gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${i === currentImage ? 'bg-white' : 'bg-white/40'} hover:bg-white`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setCurrentImage(i);
                    }}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.8 }}
                className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm"
              >
                <Code2 className="w-8 h-8 text-white" aria-hidden="true" />
              </motion.div>
            </div>
          )}

          {/* Performance Badge */}
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/30">
              <TrendingUp
                className="w-3 h-3 text-green-400"
                aria-hidden="true"
              />
              <span
                className="text-xs text-green-400 font-semibold"
                aria-label={`Performance: ${project.performance}`}
              >
                {project.performance}
              </span>
            </div>
          </div>

          {/* Complexity Rating */}
          <div className="absolute top-3 left-3">
            <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 backdrop-blur-sm rounded-full border border-yellow-500/30">
              <Zap className="w-3 h-3 text-yellow-400" aria-hidden="true" />
              <span
                className="text-xs text-yellow-400 font-semibold"
                aria-label={`Complexity rating: ${project.complexity} out of 5`}
              >
                {project.complexity}/5
              </span>
            </div>
          </div>

          {/* Hover Overlay */}
          <motion.div
            className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              aria-label={`View live demo of ${project.title}`}
            >
              <ExternalLink className="w-5 h-5 text-white" aria-hidden="true" />
            </motion.a>
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              aria-label={`View source code for ${project.title} on GitHub`}
            >
              <Github className="w-5 h-5 text-white" aria-hidden="true" />
            </motion.a>
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-3 sm:mb-4 gap-2 sm:gap-0">
            <div className="flex-1 min-w-0">
              <motion.h3
                className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300 truncate"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {project.title}
              </motion.h3>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                  {project.category}
                </span>
                <div className="flex items-center gap-1 text-gray-400 text-xs">
                  <Calendar className="w-3 h-3" aria-hidden="true" />
                  <span>{project.year}</span>
                </div>
              </div>
            </div>

            {/* Star Rating */}
            <div
              className="flex items-center gap-1 self-start sm:self-auto"
              role="img"
              aria-label={`Rating: ${project.rating} out of 5 stars`}
            >
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 sm:w-4 sm:h-4 ${
                    i < project.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-600"
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4 sm:mb-6 line-clamp-3">
            {project.description}
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
            <div className="text-center">
              <div className="text-sm sm:text-lg font-bold text-white">
                {project.views}
              </div>
              <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                <Eye className="w-2 h-2 sm:w-3 sm:h-3" aria-hidden="true" />
                <span className="hidden sm:inline">Views</span>
                <span className="sm:hidden">V</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm sm:text-lg font-bold text-white">
                {project.impact}
              </div>
              <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                <Award className="w-2 h-2 sm:w-3 sm:h-3" aria-hidden="true" />
                <span className="hidden sm:inline">Impact</span>
                <span className="sm:hidden">I</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-sm sm:text-lg font-bold text-white">
                {project.completion}
              </div>
              <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                <Sparkles
                  className="w-2 h-2 sm:w-3 sm:h-3"
                  aria-hidden="true"
                />
                <span className="hidden sm:inline">Done</span>
                <span className="sm:hidden">D</span>
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div
            className="flex flex-wrap gap-2"
            role="list"
            aria-label="Technologies used"
          >
            {project.technologies.map((tech, techIndex) => (
              <motion.span
                key={techIndex}
                className="px-3 py-1 text-xs font-medium bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 rounded-full border border-purple-500/30 hover:border-purple-400/50 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                role="listitem"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Animated Border */}
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-blue-500/0 group-hover:border-blue-500/50 transition-all duration-500"
          animate={{
            background: isHovered
              ? "linear-gradient(45deg, rgba(59, 130, 246, 0.1), rgba(147, 51, 234, 0.1))"
              : "transparent",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

const Projects = ({ onOpenModal }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTech, setSelectedTech] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState("grid");

  const projects = [
    {
      id: 1,
      img: [''],
      title: "Khaleej-kwatroo",
      category: "Frontend",
      description:
        "A modern web application for managing and tracking various business operations with a clean and intuitive user interface.",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js"],
      demo: "https://khalej-kotro.vercel.app/", // Add actual demo link when available
      github: "https://github.com/SamehElkhyat/Khalej-kotro", // Add actual GitHub link when available
      year: "2024",
      rating: 5,
      complexity: 4,
      performance: "95%",
      views: "1.2K",
      impact: "Medium",
      completion: "100%",
    },
    {
      id: 2,
      img: [""],
      title: "Weather.io",
      category: "Frontend",
      description:
        "A weather application that provides real-time weather updates and forecasts with a beautiful and responsive design.",
      technologies: ["React", "CSS Modules", "OpenWeather API"],
      demo: "https://weather-sameh.vercel.app/", // Add actual demo link when available
      github: "https://github.com/SamehElkhyat/Weather-io", // Add actual GitHub link when available
      year: "2024",
      rating: 5,
      complexity: 3,
      performance: "98%",
      views: "2.1K",
      impact: "Medium",
      completion: "100%",
    },
    {
      id: 3,
      img: [""],
      title: "Movie Flex",
      category: "Frontend",
      description:
        "A movie streaming platform with a modern UI and real-time movie search functionality.",
      technologies: ["React", "Redux", "TMDB API"],
      demo: "https://movie-flex-sameh.vercel.app/", // Add actual demo link when available
      github: "https://github.com/SamehElkhyat/movie-flex", // Add actual GitHub link when available
      year: "2024",
      rating: 5,
      complexity: 4,
      performance: "97%",
      views: "1.8K",
      impact: "Medium",
      completion: "100%",
    },
    {
      id: 4,
      img: [""],
      title: "Yummy-Recipe",
      category: "Frontend",
      description:
        "A food recipe application with a beautiful UI and real-time recipe search functionality.",
      technologies: ["React", "CSS", "Spoonacular API"],
      demo: "https://yummy-recipe-sameh.vercel.app/", // Add actual demo link when available
      github: "https://github.com/SamehElkhyat/yummy-recipe", // Add actual GitHub link when available
      year: "2024",
      rating: 5,
      complexity: 3,
      performance: "96%",
      views: "1.5K",
      impact: "Medium",
      completion: "100%",
    },
    {
      id: 5,
      img: [quran1, quran2],
      title: "Quran",
      category: "Frontend",
      description:
        "A digital Quran application with beautiful UI and real-time search functionality.",
      technologies: ["React", "TypeScript", "Quran API"],
      demo: "https://quran-sameh.vercel.app/", // Add actual demo link when available
      github: "https://github.com/SamehElkhyat/quran", // Add actual GitHub link when available
      year: "2024",
      rating: 5,
      complexity: 4,
      performance: "99%",
      views: "2.3K",
      impact: "High",
      completion: "100%",
    },
    {
      id: 6,
      img: [""],
      title: "Portfolio",
      category: "Frontend",
      description:
        "A modern and responsive portfolio website showcasing my skills and projects.",
      technologies: ["React", "TypeScript", "Tailwind CSS"],
      demo: "https://portfolio-front-end-s5rv.vercel.app/", // Add actual demo link when available
      github: "https://github.com/SamehElkhyat/Portfolio-FrontEnd", // Add actual GitHub link when available
      year: "2024",
      rating: 5,
      complexity: 4,
      performance: "98%",
      views: "3.0K",
      impact: "High",
      completion: "100%",
    },
  ];

  const categories = [
    "All",
    "Full Stack",
    "Data Science",
    "Web3",
    "SaaS",
    "Mobile",
    "DevOps",
  ];
  const technologies = [
    "All",
    ...new Set(projects.flatMap((p) => p.technologies)),
  ];

  const filteredProjects = useMemo(() => {
    let filtered = projects.filter((project) => {
      const matchesSearch =
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All" || project.category === selectedCategory;
      const matchesTech =
        selectedTech === "All" || project.technologies.includes(selectedTech);

      return matchesSearch && matchesCategory && matchesTech;
    });

    // Sort projects
    switch (sortBy) {
      case "newest":
        filtered.sort((a, b) => b.year.localeCompare(a.year));
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "complexity":
        filtered.sort((a, b) => b.complexity - a.complexity);
        break;
      case "views":
        filtered.sort((a, b) => parseFloat(b.views) - parseFloat(a.views));
        break;
      default:
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedTech, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="projects" className="min-h-screen bg-slate-900 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-14 md:mb-16 px-4"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-4 sm:mb-6">
            Featured Projects
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-6 sm:mb-8">
            Enterprise-grade solutions that drive business growth and deliver
            measurable impact. Each project showcases advanced technical
            expertise and innovative problem-solving.
          </p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-10 md:mb-12">
            <div className="text-center min-w-0">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                50+
              </div>
              <div className="text-xs sm:text-sm text-gray-400">
                Projects Delivered
              </div>
            </div>
            <div className="text-center min-w-0">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                98%
              </div>
              <div className="text-xs sm:text-sm text-gray-400">
                Client Satisfaction
              </div>
            </div>
            <div className="text-center min-w-0">
              <div className="text-2xl sm:text-3xl font-bold text-white mb-1">
                $2M+
              </div>
              <div className="text-xs sm:text-sm text-gray-400">
                Business Impact
              </div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 sm:mb-10 md:mb-12 px-4"
        >
          <div className="flex flex-col gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Search and View Mode Row */}
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
              {/* Search */}
              <div className="relative flex-1 max-w-full sm:max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 sm:pl-10 pr-4 py-2.5 sm:py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors text-sm sm:text-base"
                />
              </div>

              {/* View Mode */}
              <div className="flex items-center gap-2 bg-slate-800/50 rounded-xl p-1 w-fit mx-auto sm:mx-0">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-blue-500 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                  aria-label="Grid view"
                >
                  <Grid className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-blue-500 text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                  aria-label="List view"
                >
                  <List className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Filter Controls */}
            <div className="flex flex-wrap gap-3 sm:gap-4 items-center justify-center sm:justify-start">
              {/* Category Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-white focus:border-blue-500 focus:outline-none text-sm sm:text-base min-w-0"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Technology Filter */}
              <select
                value={selectedTech}
                onChange={(e) => setSelectedTech(e.target.value)}
                className="bg-slate-800/50 border border-slate-700 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-white focus:border-blue-500 focus:outline-none text-sm sm:text-base min-w-0"
              >
                {technologies.slice(0, 10).map((tech) => (
                  <option key={tech} value={tech}>
                    {tech}
                  </option>
                ))}
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-800/50 border border-slate-700 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-white focus:border-blue-500 focus:outline-none text-sm sm:text-base min-w-0"
              >
                <option value="newest">Newest First</option>
                <option value="rating">Highest Rated</option>
                <option value="complexity">Most Complex</option>
                <option value="views">Most Viewed</option>
              </select>

              {/* Results Count */}
              <div className="text-gray-400 text-xs sm:text-sm whitespace-nowrap">
                {filteredProjects.length} projects found
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={`px-4 ${
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
              : "space-y-4 sm:space-y-6"
          }`}
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                onOpenModal={onOpenModal}
                viewMode={viewMode}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12 sm:mt-16 md:mt-20 px-4"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-6 sm:p-8 backdrop-blur-sm">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to Build Something Amazing?
            </h3>
            <p className="text-gray-400 mb-6 sm:mb-8 max-w-2xl mx-auto text-sm sm:text-base">
              Let's discuss your next project and create solutions that drive
              real business impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <motion.button
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Project
              </motion.button>
              <motion.button
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-white/20 rounded-full font-semibold text-white hover:bg-white hover:text-gray-900 transition-all duration-300 text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Consultation
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
