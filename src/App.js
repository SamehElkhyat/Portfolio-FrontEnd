import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Modal from './components/Modal';
import ThemeSwitcher from './components/ThemeSwitcher';
import ProjectTimeline from './components/ProjectTimeline';
import CreativeShowcase from './components/CreativeShowcase';
import HiddenEasterEggs from './components/HiddenEasterEggs';
import ParticleController from './components/SecretParticleSystem';
import './index.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="App">
      <Navigation />
      <ThemeSwitcher />
      
      {/* Hidden Features */}
      <HiddenEasterEggs />
      <ParticleController />
      
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="projects">
          <Projects onOpenModal={openModal} />
        </section>
        {/* Project Timeline Section */}
        <section id="timeline" className="py-20 px-4 bg-slate-900">
          <div className="max-w-7xl mx-auto">
            <ProjectTimeline />
          </div>
        </section>
        {/* Creative Showcase Section */}
        <section id="showcase">
          <CreativeShowcase />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal} 
        project={selectedProject} 
      />
    </div>
  );
}

export default App; 