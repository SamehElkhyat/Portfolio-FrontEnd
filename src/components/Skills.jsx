import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Code, Database, Cloud, Smartphone, Brain, Shield, 
  TrendingUp, Award, Users, Zap, Star, CheckCircle,
  Globe, Cpu, Settings, Palette, Layers, GitBranch,
  BarChart, Radar
} from 'lucide-react';
import SkillsRadar from './SkillsRadar';

const SkillBar = ({ skill, index, inView }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    if (inView) {
      const timer = setTimeout(() => {
        setAnimatedValue(skill.level);
      }, index * 100);
      return () => clearTimeout(timer);
    }
  }, [inView, skill.level, index]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="mb-6"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3">
          <skill.icon className="w-5 h-5 text-blue-400" aria-hidden="true" />
          <span className="text-white font-medium">{skill.name}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-sm" aria-label={`${animatedValue} percent proficiency`}>
            {animatedValue}%
          </span>
          <div className="flex items-center gap-1">
            {skill.years && (
              <span className="text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded">
                {skill.years}y exp
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="relative" role="progressbar" aria-valuenow={animatedValue} aria-valuemin="0" aria-valuemax="100" aria-label={`${skill.name} proficiency`}>
        <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
          <motion.div
            className={`h-full rounded-full bg-gradient-to-r ${skill.gradient}`}
            initial={{ width: 0 }}
            animate={{ width: inView ? `${animatedValue}%` : 0 }}
            transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
          />
        </div>
      </div>
      
      <p className="text-gray-400 text-sm mt-2 leading-relaxed">{skill.description}</p>
    </motion.div>
  );
};

const TechCard = ({ tech, index, inView }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.9 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -5, scale: 1.05 }}
      className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-4 hover:border-blue-500/50 transition-all duration-300"
    >
      <div className="text-center">
        <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-br ${tech.gradient} flex items-center justify-center`}>
          <tech.icon className="w-6 h-6 text-white" />
        </div>
        <h4 className="text-white font-medium mb-1">{tech.name}</h4>
        <p className="text-gray-400 text-xs">{tech.category}</p>
        
        {/* Proficiency indicator */}
        <div className="flex justify-center mt-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i < tech.proficiency ? 'text-yellow-400 fill-current' : 'text-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        initial={false}
      />
    </motion.div>
  );
};

const Stats = ({ inView }) => {
  const stats = [
    { label: "Years Experience", value: "7+", icon: TrendingUp, color: "from-blue-500 to-cyan-500" },
    { label: "Projects Completed", value: "50+", icon: CheckCircle, color: "from-green-500 to-emerald-500" },
    { label: "Happy Clients", value: "25+", icon: Users, color: "from-purple-500 to-pink-500" },
    { label: "Certifications", value: "12+", icon: Award, color: "from-orange-500 to-red-500" }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="text-center bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300"
        >
          <div className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
            <stat.icon className="w-6 h-6 text-white" />
          </div>
          <motion.div
            className="text-3xl font-bold text-white mb-2"
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
          >
            {stat.value}
          </motion.div>
          <div className="text-gray-400 text-sm">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
};

const Skills = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeTab, setActiveTab] = useState('skills');
  const [skillsView, setSkillsView] = useState('bars'); // 'bars' or 'radar'

  const skillCategories = {
    skills: [
      {
        name: "React.js & Next.js",
        level: 95,
        years: 5,
        icon: Code,
        gradient: "from-blue-500 to-cyan-500",
        description: "Expert in building scalable React applications with advanced hooks, context, and performance optimization."
      },
      {
        name: "Node.js & Express",
        level: 92,
        years: 4,
        icon: Database,
        gradient: "from-green-500 to-emerald-500",
        description: "Backend development with microservices architecture, RESTful APIs, and real-time applications."
      },
      {
        name: "TypeScript",
        level: 90,
        years: 3,
        icon: Code,
        gradient: "from-blue-600 to-indigo-600",
        description: "Strong typing for large-scale applications with advanced patterns and type safety."
      },
      {
        name: "AWS Cloud Services",
        level: 88,
        years: 3,
        icon: Cloud,
        gradient: "from-orange-500 to-red-500",
        description: "Cloud architecture with EC2, Lambda, S3, RDS, and serverless computing solutions."
      },
      {
        name: "Python & AI/ML",
        level: 85,
        years: 4,
        icon: Brain,
        gradient: "from-purple-500 to-pink-500",
        description: "Machine learning with TensorFlow, data analysis, and AI-powered applications."
      },
      {
        name: "DevOps & Docker",
        level: 82,
        years: 2,
        icon: Settings,
        gradient: "from-gray-500 to-slate-600",
        description: "Containerization, CI/CD pipelines, Kubernetes orchestration, and infrastructure automation."
      }
    ]
  };

  const technologies = [
    { name: "React", icon: Code, category: "Frontend", proficiency: 5, gradient: "from-blue-500 to-cyan-500" },
    { name: "Node.js", icon: Database, category: "Backend", proficiency: 5, gradient: "from-green-500 to-emerald-500" },
    { name: "Docker", icon: Layers, category: "DevOps", proficiency: 4, gradient: "from-blue-600 to-indigo-600" },
    { name: "MongoDB", icon: Database, category: "Database", proficiency: 4, gradient: "from-green-600 to-teal-600" },
    { name: "React Native", icon: Smartphone, category: "Mobile", proficiency: 4, gradient: "from-cyan-500 to-blue-500" },
    { name: "Figma", icon: Palette, category: "Design", proficiency: 4, gradient: "from-pink-500 to-purple-500" }
  ];

  const tabs = [
    { id: 'skills', label: 'Core Skills', icon: Zap },
    { id: 'technologies', label: 'Technologies', icon: Cpu },
    { id: 'certifications', label: 'Certifications', icon: Award }
  ];

  return (
    <section className="min-h-screen bg-slate-900 py-20 px-4">
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
            Technical Expertise
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-12">
            Cutting-edge skills and technologies that power modern applications. 
            Continuous learning and adaptation to industry best practices.
          </p>
        </motion.div>

        {/* Stats */}
        <Stats inView={inView} />

        {/* Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mb-12"
        >
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-2 border border-slate-700/50">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'skills' && (
            <div className="space-y-8">
              {/* Skills View Toggle */}
              <div className="flex justify-center mb-8">
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-1 border border-slate-700/50">
                  <button
                    onClick={() => setSkillsView('bars')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      skillsView === 'bars'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <BarChart className="w-4 h-4" />
                    Progress Bars
                  </button>
                  <button
                    onClick={() => setSkillsView('radar')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                      skillsView === 'radar'
                        ? 'bg-blue-500 text-white'
                        : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                    }`}
                  >
                    <Radar className="w-4 h-4" />
                    Skills Radar
                  </button>
                </div>
              </div>

              {/* Skills Content */}
              {skillsView === 'bars' ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    {skillCategories.skills.slice(0, 3).map((skill, index) => (
                      <SkillBar key={skill.name} skill={skill} index={index} inView={inView} />
                    ))}
                  </div>
                  <div className="space-y-6">
                    {skillCategories.skills.slice(3, 6).map((skill, index) => (
                      <SkillBar key={skill.name} skill={skill} index={index + 3} inView={inView} />
                    ))}
                  </div>
                </div>
              ) : (
                <SkillsRadar />
              )}
            </div>
          )}

          {activeTab === 'technologies' && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {technologies.map((tech, index) => (
                <TechCard key={tech.name} tech={tech} index={index} inView={inView} />
              ))}
            </div>
          )}

          {activeTab === 'certifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "AWS Solutions Architect",
                  issuer: "Amazon Web Services",
                  date: "2023",
                  level: "Professional",
                  icon: Cloud,
                  gradient: "from-orange-500 to-red-500"
                },
                {
                  title: "Google Cloud Professional",
                  issuer: "Google Cloud",
                  date: "2023",
                  level: "Professional",
                  icon: Cloud,
                  gradient: "from-blue-500 to-indigo-500"
                },
                {
                  title: "Certified Kubernetes Admin",
                  issuer: "CNCF",
                  date: "2022",
                  level: "Professional",
                  icon: Settings,
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  title: "React Advanced Patterns",
                  issuer: "Meta",
                  date: "2023",
                  level: "Advanced",
                  icon: Code,
                  gradient: "from-blue-600 to-cyan-600"
                },
                {
                  title: "MongoDB Certified Developer",
                  issuer: "MongoDB Inc.",
                  date: "2022",
                  level: "Professional",
                  icon: Database,
                  gradient: "from-green-500 to-emerald-500"
                },
                {
                  title: "Machine Learning Specialist",
                  issuer: "TensorFlow",
                  date: "2023",
                  level: "Specialist",
                  icon: Brain,
                  gradient: "from-purple-600 to-indigo-600"
                }
              ].map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300"
                >
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${cert.gradient} flex items-center justify-center`}>
                    <cert.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2 text-center">{cert.title}</h3>
                  <p className="text-gray-400 text-center mb-2">{cert.issuer}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm bg-blue-500/20 text-blue-400 px-2 py-1 rounded">{cert.level}</span>
                    <span className="text-gray-500 text-sm">{cert.date}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 backdrop-blur-sm">
            <h3 className="text-3xl font-bold text-white mb-4">Let's Build Something Extraordinary</h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Ready to leverage these skills for your next project? Let's discuss how we can create solutions that exceed expectations.
            </p>
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Collaboration
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills; 