import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AddProjectModal({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    repoUrl: '',
    liveUrl: '',
    status: 'Beta',
    tags: [],
  });

  const [tagInput, setTagInput] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = () => {
    if (tagInput && !formData.tags.includes(tagInput)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && formData.repoUrl) {
      onAdd(formData);
      setFormData({ title: '', description: '', repoUrl: '', liveUrl: '', status: 'Beta', tags: [] });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="w-full max-w-2xl rounded-2xl border border-cyan-electric/30 bg-midnight/95 backdrop-blur-md p-8 shadow-2xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">Add Project</h2>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-cyan-electric mb-2">Project Title *</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="My Awesome Project"
                    className="w-full px-4 py-2 rounded-lg bg-midnight/40 border border-cyan-electric/30 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-electric transition-colors"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-cyan-electric mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="What does your project do?"
                    rows="3"
                    className="w-full px-4 py-2 rounded-lg bg-midnight/40 border border-cyan-electric/30 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-electric transition-colors resize-none"
                  />
                </div>

                {/* URLs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Repo URL */}
                  <div>
                    <label className="block text-sm font-medium text-cyan-electric mb-2">GitHub URL *</label>
                    <input
                      type="url"
                      name="repoUrl"
                      value={formData.repoUrl}
                      onChange={handleChange}
                      placeholder="https://github.com/..."
                      className="w-full px-4 py-2 rounded-lg bg-midnight/40 border border-cyan-electric/30 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-electric transition-colors"
                      required
                    />
                  </div>

                  {/* Live URL */}
                  <div>
                    <label className="block text-sm font-medium text-cyan-electric mb-2">Live URL</label>
                    <input
                      type="url"
                      name="liveUrl"
                      value={formData.liveUrl}
                      onChange={handleChange}
                      placeholder="https://myproject.com"
                      className="w-full px-4 py-2 rounded-lg bg-midnight/40 border border-cyan-electric/30 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-electric transition-colors"
                    />
                  </div>
                </div>

                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-cyan-electric mb-2">Status</label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg bg-midnight/40 border border-cyan-electric/30 text-white focus:outline-none focus:border-cyan-electric transition-colors"
                  >
                    <option value="Beta">Beta</option>
                    <option value="Production">Production</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-cyan-electric mb-2">Technologies</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                      placeholder="React, Node.js, etc."
                      className="flex-1 px-4 py-2 rounded-lg bg-midnight/40 border border-cyan-electric/30 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-electric transition-colors"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-2 rounded-lg bg-cyan-electric/20 text-cyan-electric font-medium hover:bg-cyan-electric/30 transition-colors"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-purple-cyber/20 text-purple-cyber border border-purple-cyber/30 flex items-center gap-2"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 hover:text-white transition-colors"
                        >
                          ✕
                        </button>
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 px-6 py-2 rounded-lg border border-cyan-electric/30 text-cyan-electric font-semibold hover:bg-cyan-electric/10 transition-colors"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="flex-1 px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-electric to-purple-cyber text-midnight font-semibold hover:shadow-glow-cyan transition-shadow"
                  >
                    Add Project
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
