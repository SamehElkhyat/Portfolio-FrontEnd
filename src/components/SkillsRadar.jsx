import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Radar, Target, TrendingUp, Award, Code, Palette, Database, Globe } from 'lucide-react';

const SkillsRadar = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [activeSkill, setActiveSkill] = useState(null);
  const [animationProgress, setAnimationProgress] = useState(0);
  const canvasRef = useRef(null);

  const skills = [
    { name: 'React.js', level: 95, color: '#61DAFB', icon: Code, category: 'Frontend' },
    { name: 'Node.js', level: 90, color: '#68A063', icon: Database, category: 'Backend' },
    { name: 'TypeScript', level: 88, color: '#3178C6', icon: Code, category: 'Language' },
    { name: 'UI/UX Design', level: 85, color: '#FF6B6B', icon: Palette, category: 'Design' },
    { name: 'MongoDB', level: 82, color: '#47A248', icon: Database, category: 'Database' },
    { name: 'AWS', level: 80, color: '#FF9900', icon: Globe, category: 'Cloud' },
    { name: 'Python', level: 78, color: '#3776AB', icon: Code, category: 'Language' },
    { name: 'Docker', level: 75, color: '#2496ED', icon: Globe, category: 'DevOps' }
  ];

  useEffect(() => {
    if (inView) {
      const timer = setInterval(() => {
        setAnimationProgress(prev => {
          if (prev >= 100) {
            clearInterval(timer);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(timer);
    }
  }, [inView]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 40;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw radar grid
    const gridLevels = 5;
    for (let i = 1; i <= gridLevels; i++) {
      const levelRadius = (radius * i) / gridLevels;
      ctx.beginPath();
      ctx.arc(centerX, centerY, levelRadius, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

    // Draw radar axes
    const angleStep = (2 * Math.PI) / skills.length;
    skills.forEach((_, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const endX = centerX + radius * Math.cos(angle);
      const endY = centerY + radius * Math.sin(angle);

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = 'rgba(100, 116, 139, 0.3)';
      ctx.lineWidth = 1;
      ctx.stroke();
    });

    // Draw skill polygon
    if (animationProgress > 0) {
      ctx.beginPath();
      skills.forEach((skill, index) => {
        const angle = index * angleStep - Math.PI / 2;
        const skillRadius = (radius * (skill.level / 100) * (animationProgress / 100));
        const x = centerX + skillRadius * Math.cos(angle);
        const y = centerY + skillRadius * Math.sin(angle);

        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      ctx.closePath();
      ctx.fillStyle = 'rgba(59, 130, 246, 0.2)';
      ctx.fill();
      ctx.strokeStyle = 'rgba(59, 130, 246, 0.8)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw skill points
      skills.forEach((skill, index) => {
        const angle = index * angleStep - Math.PI / 2;
        const skillRadius = (radius * (skill.level / 100) * (animationProgress / 100));
        const x = centerX + skillRadius * Math.cos(angle);
        const y = centerY + skillRadius * Math.sin(angle);

        ctx.beginPath();
        ctx.arc(x, y, activeSkill === index ? 8 : 5, 0, 2 * Math.PI);
        ctx.fillStyle = skill.color;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
    }
  }, [animationProgress, activeSkill, skills]);

  const getSkillPosition = (index) => {
    const angleStep = (2 * Math.PI) / skills.length;
    const angle = index * angleStep - Math.PI / 2;
    const radius = 140;
    return {
      x: 50 + radius * Math.cos(angle),
      y: 50 + radius * Math.sin(angle)
    };
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <Radar className="w-5 h-5 text-white" aria-hidden="true" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Skills Overview</h3>
            <p className="text-gray-400 text-sm">Interactive expertise radar</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Target className="w-4 h-4" />
          <span>{Math.round(animationProgress)}%</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Radar Chart */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={350}
            height={350}
            className="w-full h-auto"
            style={{ maxWidth: '350px', maxHeight: '350px' }}
          />
          
          {/* Skill Labels */}
          <div className="absolute inset-0">
            {skills.map((skill, index) => {
              const position = getSkillPosition(index);
              return (
                <motion.div
                  key={skill.name}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${
                    activeSkill === index ? 'z-10' : ''
                  }`}
                  style={{
                    left: `${(position.x / 350) * 100}%`,
                    top: `${(position.y / 350) * 100}%`
                  }}
                  onMouseEnter={() => setActiveSkill(index)}
                  onMouseLeave={() => setActiveSkill(null)}
                  whileHover={{ scale: 1.1 }}
                >
                  <div className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-300 ${
                    activeSkill === index
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/25'
                      : 'bg-slate-800/80 text-gray-300 hover:bg-slate-700/80'
                  }`}>
                    <div className="flex items-center gap-2 whitespace-nowrap">
                      <skill.icon className="w-3 h-3" />
                      <span>{skill.name}</span>
                      <span className="text-xs opacity-80">{skill.level}%</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Skills List */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold mb-4">Technical Expertise</h4>
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              className={`p-4 rounded-xl border transition-all duration-300 cursor-pointer ${
                activeSkill === index
                  ? 'bg-blue-500/10 border-blue-500/50'
                  : 'bg-slate-800/30 border-slate-700/50 hover:border-slate-600/50'
              }`}
              onMouseEnter={() => setActiveSkill(index)}
              onMouseLeave={() => setActiveSkill(null)}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, x: 20 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-8 h-8 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: skill.color + '20' }}
                  >
                    <skill.icon 
                      className="w-4 h-4" 
                      style={{ color: skill.color }}
                    />
                  </div>
                  <div>
                    <h5 className="text-white font-medium text-sm">{skill.name}</h5>
                    <p className="text-gray-400 text-xs">{skill.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-semibold text-sm">{skill.level}%</div>
                  {skill.level >= 90 && (
                    <Award className="w-3 h-3 text-yellow-400 ml-auto" />
                  )}
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-slate-700/50 rounded-full h-2">
                <motion.div
                  className="h-2 rounded-full"
                  style={{ backgroundColor: skill.color }}
                  initial={{ width: 0 }}
                  animate={{ 
                    width: inView ? `${skill.level * (animationProgress / 100)}%` : 0 
                  }}
                  transition={{ duration: 1.5, delay: index * 0.1 }}
                />
              </div>
            </motion.div>
          ))}
          
          {/* Summary Stats */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="text-center p-3 bg-slate-800/30 rounded-lg">
              <TrendingUp className="w-5 h-5 text-green-400 mx-auto mb-2" />
              <div className="text-white font-semibold text-sm">Avg. Level</div>
              <div className="text-gray-400 text-xs">
                {Math.round(skills.reduce((sum, skill) => sum + skill.level, 0) / skills.length)}%
              </div>
            </div>
            <div className="text-center p-3 bg-slate-800/30 rounded-lg">
              <Award className="w-5 h-5 text-yellow-400 mx-auto mb-2" />
              <div className="text-white font-semibold text-sm">Expert Level</div>
              <div className="text-gray-400 text-xs">
                {skills.filter(skill => skill.level >= 90).length} Skills
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsRadar; 