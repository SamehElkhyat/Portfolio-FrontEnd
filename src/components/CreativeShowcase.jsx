import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Zap, Code, QrCode, Cloud, Terminal, Play, 
  Sparkles, Rocket, Star, Eye, ArrowRight, Edit
} from 'lucide-react';
import Interactive3DScene from './Interactive3DScene';
import InteractiveTerminal from './InteractiveTerminal';
import QRContactCard from './QRContactCard';
import WeatherWidget from './WeatherWidget';
import LiveCodeEditor from './LiveCodeEditor';

const CreativeShowcase = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [selectedTool, setSelectedTool] = useState('3d-scene');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'featured'

  const creativeTools = [
    {
      id: '3d-scene',
      name: 'Interactive 3D Scene',
      description: 'Immersive 3D environment with floating tech icons and interactive particles built with Three.js',
      icon: Zap,
      component: Interactive3DScene,
      tags: ['Three.js', 'WebGL', '3D Graphics', 'Interactive'],
      color: 'from-blue-500 to-cyan-500',
      stats: { views: '2.1K', interactions: '450+', tech: 'Three.js' }
    },
    {
      id: 'terminal',
      name: 'Interactive Terminal',
      description: 'Fully functional command-line interface for exploring portfolio information',
      icon: Terminal,
      component: InteractiveTerminal,
      tags: ['CLI', 'Interactive', 'Commands', 'Portfolio'],
      color: 'from-green-500 to-emerald-500',
      stats: { views: '1.8K', interactions: '320+', tech: 'React' }
    },
    {
      id: 'code-editor',
      name: 'Live Code Editor',
      description: 'Real-time code editor with syntax highlighting and live preview capabilities',
      icon: Edit,
      component: LiveCodeEditor,
      tags: ['Code Editor', 'Live Preview', 'Multi-language', 'Interactive'],
      color: 'from-indigo-500 to-purple-500',
      stats: { views: '1.6K', interactions: '340+', tech: 'Monaco' }
    },
    {
      id: 'qr-generator',
      name: 'QR Contact Generator',
      description: 'Dynamic QR code generator for instant contact sharing and portfolio links',
      icon: QrCode,
      component: QRContactCard,
      tags: ['QR Codes', 'Contact', 'vCard', 'Sharing'],
      color: 'from-purple-500 to-pink-500',
      stats: { views: '1.5K', interactions: '280+', tech: 'QR API' }
    },
    {
      id: 'weather',
      name: 'Real-time Weather',
      description: 'Beautiful weather widget showing current conditions and forecasts for Cairo',
      icon: Cloud,
      component: WeatherWidget,
      tags: ['Weather API', 'Real-time', 'Location', 'Forecast'],
      color: 'from-orange-500 to-red-500',
      stats: { views: '1.2K', interactions: '190+', tech: 'Weather API' }
    }
  ];

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const selectedToolData = creativeTools.find(tool => tool.id === selectedTool);
  const SelectedComponent = selectedToolData?.component;

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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full border border-blue-500/20 mb-6">
            <Sparkles className="w-5 h-5 text-blue-400" />
            <span className="text-blue-400 font-medium">Interactive Experience</span>
          </div>
          
          <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-6">
            Creative Showcase
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Cutting-edge interactive tools and features that demonstrate modern web technologies 
            and creative problem-solving approaches.
          </p>

          {/* View Mode Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-1 border border-slate-700/50">
              <button
                onClick={() => setViewMode('grid')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  viewMode === 'grid'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                Grid View
              </button>
              <button
                onClick={() => setViewMode('featured')}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  viewMode === 'featured'
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                Featured View
              </button>
            </div>
          </div>
        </motion.div>

        {viewMode === 'grid' ? (
          /* Grid Layout */
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {creativeTools.map((tool, index) => {
              const ToolComponent = tool.component;
              return (
                <motion.div
                  key={tool.id}
                  variants={itemVariants}
                  className="space-y-6"
                >
                  {/* Tool Info Card */}
                  <motion.div
                    className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 hover:border-blue-500/50 transition-all duration-300"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-xl flex items-center justify-center`}>
                          <tool.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-bold text-lg">{tool.name}</h3>
                          <p className="text-gray-400 text-sm">{tool.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-full">
                        <Star className="w-3 h-3 text-green-400 fill-current" />
                        <span className="text-green-400 text-xs font-medium">Live</span>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-white font-semibold text-sm">{tool.stats.views}</div>
                        <div className="text-gray-400 text-xs flex items-center justify-center gap-1">
                          <Eye className="w-3 h-3" />
                          Views
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-semibold text-sm">{tool.stats.interactions}</div>
                        <div className="text-gray-400 text-xs flex items-center justify-center gap-1">
                          <Play className="w-3 h-3" />
                          Interactions
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-white font-semibold text-sm">{tool.stats.tech}</div>
                        <div className="text-gray-400 text-xs flex items-center justify-center gap-1">
                          <Code className="w-3 h-3" />
                          Tech
                        </div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {tool.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 text-xs font-medium bg-slate-700/50 text-gray-300 rounded-full border border-slate-600/50"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>

                  {/* Tool Component */}
                  <ToolComponent />
                </motion.div>
              );
            })}
          </motion.div>
        ) : (
          /* Featured Layout */
          <div className="space-y-8">
            {/* Tool Selector */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8"
            >
              {creativeTools.map((tool) => (
                <motion.button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`p-4 rounded-xl border transition-all duration-300 text-left ${
                    selectedTool === tool.id
                      ? 'bg-blue-500/10 border-blue-500/50'
                      : 'bg-slate-800/30 border-slate-700/50 hover:border-slate-600/50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className={`w-8 h-8 bg-gradient-to-r ${tool.color} rounded-lg flex items-center justify-center mb-3`}>
                    <tool.icon className="w-4 h-4 text-white" />
                  </div>
                  <h4 className="text-white font-medium text-sm mb-1">{tool.name}</h4>
                  <p className="text-gray-400 text-xs line-clamp-2">{tool.description}</p>
                </motion.button>
              ))}
            </motion.div>

            {/* Featured Tool Display */}
            <motion.div
              key={selectedTool}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Tool Header */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-r ${selectedToolData.color} rounded-2xl flex items-center justify-center`}>
                      <selectedToolData.icon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold text-2xl mb-1">{selectedToolData.name}</h3>
                      <p className="text-gray-400 mb-3">{selectedToolData.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {selectedToolData.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 text-xs font-medium bg-slate-700/50 text-gray-300 rounded-full border border-slate-600/50"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-2 text-green-400 mb-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Live Demo</span>
                    </div>
                    <div className="text-gray-400 text-sm">
                      {selectedToolData.stats.views} views • {selectedToolData.stats.interactions} interactions
                    </div>
                  </div>
                </div>
              </div>

              {/* Featured Component */}
              {SelectedComponent && <SelectedComponent />}
            </motion.div>
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-12 backdrop-blur-sm">
            <Rocket className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <h3 className="text-3xl font-bold text-white mb-4">Ready to Build Something Amazing?</h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg">
              These interactive tools showcase the possibilities of modern web development. 
              Let's create something extraordinary for your next project!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Start Collaboration</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              <motion.button
                className="px-8 py-4 border-2 border-white/20 rounded-full font-semibold text-white hover:bg-white hover:text-gray-900 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore More Tools
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CreativeShowcase; 