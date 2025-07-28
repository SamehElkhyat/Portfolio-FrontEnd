import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Search, Filter, Grid, List, Star, ExternalLink, Github, TrendingUp, Award, Zap, Eye, Calendar, Code2, Sparkles } from 'lucide-react';

const ProjectCard = ({ project, index, onOpenModal, viewMode }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [isHovered, setIsHovered] = useState(false);

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
        delay: index * 0.1
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
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
        viewMode === 'list' ? 'flex gap-6' : 'flex flex-col'
      }`}
      onClick={() => onOpenModal(project)}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${project.title} project`}
    >
      <div className={`relative overflow-hidden bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500 ${
        viewMode === 'list' ? 'rounded-2xl p-6 flex-1' : 'rounded-2xl p-6 h-full'
      }`}>
        {/* Project Image/Preview */}
        <div className={`relative overflow-hidden rounded-xl mb-6 ${
          viewMode === 'list' ? 'w-48 h-32 flex-shrink-0' : 'w-full h-48'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20"></div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 opacity-80"
            animate={{ scale: isHovered ? 1.1 : 1 }}
            transition={{ duration: 0.3 }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ rotate: isHovered ? 360 : 0 }}
              transition={{ duration: 0.8 }}
              className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm"
            >
              <Code2 className="w-8 h-8 text-white" aria-hidden="true" />
            </motion.div>
          </div>
          
          {/* Performance Badge */}
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 backdrop-blur-sm rounded-full border border-green-500/30">
              <TrendingUp className="w-3 h-3 text-green-400" aria-hidden="true" />
              <span className="text-xs text-green-400 font-semibold" aria-label={`Performance: ${project.performance}`}>
                {project.performance}
              </span>
            </div>
          </div>

          {/* Complexity Rating */}
          <div className="absolute top-3 left-3">
            <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 backdrop-blur-sm rounded-full border border-yellow-500/30">
              <Zap className="w-3 h-3 text-yellow-400" aria-hidden="true" />
              <span className="text-xs text-yellow-400 font-semibold" aria-label={`Complexity rating: ${project.complexity} out of 5`}>
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
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <motion.h3
                className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300"
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {project.title}
              </motion.h3>
              <div className="flex items-center gap-2 mb-2">
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
            <div className="flex items-center gap-1" role="img" aria-label={`Rating: ${project.rating} out of 5 stars`}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < project.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                  }`}
                  aria-hidden="true"
                />
              ))}
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-lg font-bold text-white">{project.views}</div>
              <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                <Eye className="w-3 h-3" aria-hidden="true" />
                <span>Views</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">{project.impact}</div>
              <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                <Award className="w-3 h-3" aria-hidden="true" />
                <span>Impact</span>
              </div>
            </div>
            <div className="text-center">
              <div className="text-lg font-bold text-white">{project.completion}</div>
              <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" aria-hidden="true" />
                <span>Done</span>
              </div>
            </div>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
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
              : "transparent"
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

const Projects = ({ onOpenModal }) => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTech, setSelectedTech] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');

  const projects = [
    {
      id: 1,
      title: "Enterprise E-Commerce Platform",
      category: "Full Stack",
      description: "Scalable e-commerce solution handling 100K+ daily transactions with advanced analytics, real-time inventory, AI-powered recommendations, and microservices architecture.",
      technologies: ["React", "Node.js", "MongoDB", "AWS", "Docker", "Redis"],
      demo: "https://demo.example.com",
      github: "https://github.com/example",
      year: "2024",
      rating: 5,
      complexity: 5,
      performance: "98%",
      views: "25.3K",
      impact: "High",
      completion: "100%"
    },
    {
      id: 2,
      title: "AI-Powered Analytics Dashboard",
      category: "Data Science",
      description: "Real-time business intelligence platform with machine learning insights, predictive analytics, custom reporting, and interactive data visualizations.",
      technologies: ["Python", "React", "TensorFlow", "D3.js", "PostgreSQL", "Kafka"],
      demo: "https://demo.example.com",
      github: "https://github.com/example",
      year: "2024",
      rating: 5,
      complexity: 5,
      performance: "95%",
      views: "18.7K",
      impact: "High",
      completion: "100%"
    },
    {
      id: 3,
      title: "Blockchain DeFi Protocol",
      category: "Web3",
      description: "Decentralized finance protocol with yield farming, liquidity mining, governance tokens, and advanced smart contract security features.",
      technologies: ["Solidity", "React", "Web3.js", "Ethereum", "IPFS", "The Graph"],
      demo: "https://demo.example.com",
      github: "https://github.com/example",
      year: "2024",
      rating: 5,
      complexity: 5,
      performance: "99%",
      views: "32.1K",
      impact: "High",
      completion: "95%"
    },
    {
      id: 4,
      title: "Real-time Collaboration Suite",
      category: "SaaS",
      description: "Enterprise collaboration platform with video conferencing, document sharing, project management, and real-time synchronization across devices.",
      technologies: ["React", "Socket.io", "WebRTC", "Node.js", "Redis", "AWS"],
      demo: "https://demo.example.com",
      github: "https://github.com/example",
      year: "2023",
      rating: 4,
      complexity: 4,
      performance: "96%",
      views: "15.2K",
      impact: "Medium",
      completion: "100%"
    },
    {
      id: 5,
      title: "Mobile Health Tracker",
      category: "Mobile",
      description: "Cross-platform health and fitness tracking app with IoT device integration, AI health insights, and social features for community support.",
      technologies: ["React Native", "Firebase", "HealthKit", "ML Kit", "Redux"],
      demo: "https://demo.example.com",
      github: "https://github.com/example",
      year: "2023",
      rating: 4,
      complexity: 3,
      performance: "94%",
      views: "22.8K",
      impact: "Medium",
      completion: "100%"
    },
    {
      id: 6,
      title: "DevOps Automation Platform",
      category: "DevOps",
      description: "Complete CI/CD pipeline automation with infrastructure as code, monitoring, alerting, and deployment orchestration across multi-cloud environments.",
      technologies: ["Docker", "Kubernetes", "Terraform", "Jenkins", "AWS", "Grafana"],
      demo: "https://demo.example.com",
      github: "https://github.com/example",
      year: "2023",
      rating: 5,
      complexity: 5,
      performance: "97%",
      views: "19.4K",
      impact: "High",
      completion: "90%"
    }
  ];

  const categories = ['All', 'Full Stack', 'Data Science', 'Web3', 'SaaS', 'Mobile', 'DevOps'];
  const technologies = ['All', ...new Set(projects.flatMap(p => p.technologies))];

  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesTech = selectedTech === 'All' || project.technologies.includes(selectedTech);
      
      return matchesSearch && matchesCategory && matchesTech;
    });

    // Sort projects
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => b.year.localeCompare(a.year));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'complexity':
        filtered.sort((a, b) => b.complexity - a.complexity);
        break;
      case 'views':
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
        staggerChildren: 0.1
      }
    }
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
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Enterprise-grade solutions that drive business growth and deliver measurable impact. 
            Each project showcases advanced technical expertise and innovative problem-solving.
          </p>
          
          {/* Project Stats */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">50+</div>
              <div className="text-sm text-gray-400">Projects Delivered</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">98%</div>
              <div className="text-sm text-gray-400">Client Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">$2M+</div>
              <div className="text-sm text-gray-400">Business Impact</div>
            </div>
          </div>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-8">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors"
              />
            </div>

            {/* View Mode */}
            <div className="flex items-center gap-2 bg-slate-800/50 rounded-xl p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-wrap gap-4 items-center justify-center lg:justify-between">
            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Technology Filter */}
            <select
              value={selectedTech}
              onChange={(e) => setSelectedTech(e.target.value)}
              className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              {technologies.slice(0, 10).map(tech => (
                <option key={tech} value={tech}>{tech}</option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="rating">Highest Rated</option>
              <option value="complexity">Most Complex</option>
              <option value="views">Most Viewed</option>
            </select>

            {/* Results Count */}
            <div className="text-gray-400 text-sm">
              {filteredProjects.length} projects found
            </div>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className={`${
            viewMode === 'grid' 
              ? 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8' 
              : 'space-y-6'
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
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Build Something Amazing?</h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Let's discuss your next project and create solutions that drive real business impact.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start a Project
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-white/20 rounded-full font-semibold text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
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