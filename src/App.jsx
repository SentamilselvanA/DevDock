import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Header from './components/Header';
import SearchFilter from './components/SearchFilter';
import VaultCard from './components/VaultCard';
import AddProjectModal from './components/AddProjectModal';
import EmptyState from './components/EmptyState';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: 'AI Chat Platform',
      description: 'Real-time chat application with AI-powered responses and natural language processing.',
      repoUrl: 'https://github.com/example/ai-chat',
      liveUrl: 'https://ai-chat-demo.vercel.app',
      status: 'Production',
      tags: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
    },
    {
      id: 2,
      title: 'DevVault Dashboard',
      description: 'High-end developer dashboard for managing and tracking coding projects.',
      repoUrl: 'https://github.com/example/devvault',
      liveUrl: 'https://devvault.dev',
      status: 'Production',
      tags: ['React', 'Tailwind', 'Framer Motion'],
    },
    {
      id: 3,
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce solution with payment integration and admin dashboard.',
      repoUrl: 'https://github.com/example/ecommerce',
      liveUrl: '',
      status: 'Beta',
      tags: ['MERN', 'Stripe', 'Redux'],
    },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter projects based on search and tags
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          project.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesTag = selectedTag === 'All' || 
                        project.tags.some(tag => tag.toLowerCase().includes(selectedTag.toLowerCase()));

      return matchesSearch && matchesTag;
    });
  }, [projects, searchQuery, selectedTag]);

  const handleAddProject = (newProject) => {
    const projectWithId = {
      ...newProject,
      id: projects.length + 1,
    };
    setProjects([...projects, projectWithId]);
    setIsModalOpen(false);
  };

  const handleDeleteProject = (projectId) => {
    setProjects(projects.filter(project => project.id !== projectId));
  };

  return (
    <div className="min-h-screen bg-midnight text-white">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-purple-cyber/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-cyan-electric/10 rounded-full blur-3xl animate-pulse" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Header onAddProject={() => setIsModalOpen(true)} />

        <main className="max-w-7xl mx-auto px-6 py-12">
          <SearchFilter
            onSearch={setSearchQuery}
            onFilterTag={setSelectedTag}
          />

          {filteredProjects.length === 0 ? (
            searchQuery || selectedTag !== 'All' ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-gray-400 text-lg">
                  No projects found matching your criteria.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedTag('All');
                  }}
                  className="mt-4 text-cyan-electric hover:text-cyan-electric/80 transition-colors"
                >
                  Clear filters
                </button>
              </motion.div>
            ) : (
              <EmptyState onAddProject={() => setIsModalOpen(true)} />
            )
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <VaultCard
                  key={project.id}
                  project={project}
                  index={index}
                  onDelete={handleDeleteProject}
                />
              ))}
            </motion.div>
          )}
        </main>

        <Footer />
      </div>

      {/* Modal */}
      <AddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddProject}
      />
    </div>
  );
}

export default App;
