import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Calendar, MapPin, ExternalLink, Github, Award, 
  Briefcase, GraduationCap, Code, Star, Clock,
  TrendingUp, Users, Zap
} from 'lucide-react';

const ProjectTimeline = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedItem, setSelectedItem] = useState(null);

  const timelineItems = [
    {
      id: 1,
      type: 'project',
      title: 'E-Commerce Platform Redesign',
      company: 'TechCorp Solutions',
      date: '2024',
      duration: '6 months',
      description: 'Led complete redesign of enterprise e-commerce platform serving 100K+ users',
      technologies: ['React', 'Node.js', 'AWS', 'MongoDB'],
      achievements: ['40% performance improvement', '25% conversion increase', '99.9% uptime'],
      links: {
        demo: 'https://demo.example.com',
        github: 'https://github.com/example'
      },
      color: '#3b82f6',
      icon: Code,
      featured: true
    },
    {
      id: 2,
      type: 'work',
      title: 'Senior Frontend Developer',
      company: 'Innovation Labs',
      date: '2023 - Present',
      duration: '1.5 years',
      description: 'Building scalable React applications and leading a team of 5 developers',
      technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind'],
      achievements: ['Team leadership', 'Architecture design', 'Mentoring junior developers'],
      color: '#8b5cf6',
      icon: Briefcase,
      featured: false
    },
    {
      id: 3,
      type: 'project',
      title: 'AI-Powered Analytics Dashboard',
      company: 'DataTech Inc',
      date: '2023',
      duration: '4 months',
      description: 'Real-time analytics platform with machine learning insights',
      technologies: ['Python', 'React', 'TensorFlow', 'D3.js'],
      achievements: ['Real-time processing', 'ML integration', 'Custom visualizations'],
      links: {
        demo: 'https://demo.example.com',
        github: 'https://github.com/example'
      },
      color: '#06b6d4',
      icon: TrendingUp,
      featured: true
    },
    {
      id: 4,
      type: 'education',
      title: 'Full Stack Web Development',
      company: 'Tech University',
      date: '2022',
      duration: '1 year',
      description: 'Comprehensive program covering modern web development technologies',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
      achievements: ['Graduated with honors', 'Capstone project award', '95% grade average'],
      color: '#f59e0b',
      icon: GraduationCap,
      featured: false
    },
    {
      id: 5,
      type: 'project',
      title: 'Mobile Health Tracker',
      company: 'HealthTech Solutions',
      date: '2022',
      duration: '3 months',
      description: 'Cross-platform mobile app for health monitoring and fitness tracking',
      technologies: ['React Native', 'Firebase', 'Redux', 'Charts.js'],
      achievements: ['Cross-platform compatibility', '10K+ downloads', '4.8 app store rating'],
      links: {
        demo: 'https://demo.example.com',
        github: 'https://github.com/example'
      },
      color: '#10b981',
      icon: Users,
      featured: true
    }
  ];

  const getItemIcon = (item) => {
    switch (item.type) {
      case 'work':
        return Briefcase;
      case 'education':
        return GraduationCap;
      case 'project':
        return item.icon || Code;
      default:
        return Code;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Calendar className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Career Timeline</h3>
            <p className="text-gray-400 text-sm">Professional journey and key projects</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{timelineItems.length} milestones</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4" />
            <span>{timelineItems.filter(item => item.featured).length} featured</span>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <motion.div
        className="relative"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 opacity-50"></div>

        {/* Timeline Items */}
        <div className="space-y-8">
          {timelineItems.map((item, index) => {
            const ItemIcon = getItemIcon(item);
            const isLeft = index % 2 === 0;
            
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                className="relative"
              >
                {/* Timeline Node */}
                <div className="absolute left-6 top-6 transform -translate-x-1/2">
                  <motion.div
                    className="w-4 h-4 rounded-full border-2 border-white"
                    style={{ backgroundColor: item.color }}
                    whileHover={{ scale: 1.2 }}
                    animate={{
                      boxShadow: item.featured 
                        ? `0 0 20px ${item.color}80` 
                        : `0 0 10px ${item.color}40`
                    }}
                  />
                </div>

                {/* Content Card */}
                <motion.div
                  className={`ml-16 cursor-pointer ${
                    selectedItem === item.id ? 'transform scale-105' : ''
                  }`}
                  onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className={`p-6 rounded-xl border transition-all duration-300 ${
                    selectedItem === item.id
                      ? 'bg-slate-800/80 border-blue-500/50'
                      : 'bg-slate-800/30 border-slate-700/50 hover:border-slate-600/50'
                  }`}>
                    {/* Header */}
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <div 
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                            style={{ backgroundColor: item.color + '20' }}
                          >
                            <ItemIcon 
                              className="w-4 h-4 sm:w-5 sm:h-5" 
                              style={{ color: item.color }}
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="text-white font-semibold text-base sm:text-lg truncate">{item.title}</h4>
                          </div>
                        </div>

                        {item.featured && (
                          <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full ml-2 flex-shrink-0">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-yellow-400 text-xs font-medium hidden sm:inline">Featured</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-400 ml-11 sm:ml-13">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span className="truncate">{item.company}</span>
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {item.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {item.duration}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-4 leading-relaxed">{item.description}</p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 text-xs font-medium bg-slate-700/50 text-gray-300 rounded-full border border-slate-600/50"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Achievements */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                      {item.achievements.map((achievement, achIndex) => (
                        <div 
                          key={achIndex}
                          className="flex items-center gap-2 p-2 bg-slate-700/30 rounded-lg"
                        >
                          <Award className="w-4 h-4 text-green-400 flex-shrink-0" />
                          <span className="text-gray-300 text-sm">{achievement}</span>
                        </div>
                      ))}
                    </div>

                    {/* Links */}
                    {item.links && (
                      <div className="flex gap-3">
                        {item.links.demo && (
                          <motion.a
                            href={item.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <ExternalLink className="w-4 h-4" />
                            Live Demo
                          </motion.a>
                        )}
                        {item.links.github && (
                          <motion.a
                            href={item.links.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded-lg text-sm font-medium transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Github className="w-4 h-4" />
                            Source Code
                          </motion.a>
                        )}
                      </div>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Summary Stats */}
      <div className="mt-8 pt-6 border-t border-slate-700/50">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">
              {timelineItems.filter(item => item.type === 'project').length}
            </div>
            <div className="text-sm text-gray-400">Projects Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">3+</div>
            <div className="text-sm text-gray-400">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white mb-1">15+</div>
            <div className="text-sm text-gray-400">Technologies Used</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectTimeline; 