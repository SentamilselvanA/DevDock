import React from 'react';
import { motion } from 'framer-motion';

export default function VaultCard({ project, index, onDelete }) {
  const statusColors = {
    'Production': 'text-neon-green shadow-glow-green',
    'Beta': 'text-amber-status',
    'Archived': 'text-ruby-red',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05, y: -10 }}
      className="group relative h-full"
    >
      <div className="h-full rounded-2xl border border-cyan-electric/30 bg-midnight/40 backdrop-blur-md p-6 hover:border-cyan-electric/60 transition-colors overflow-hidden">
        {/* Gradient Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-electric/5 to-purple-cyber/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />

        {/* Content */}
        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">{project.title}</h3>
              <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${statusColors[project.status]}`}>
                {project.status === 'Production' && <span className="animate-pulse">● </span>}
                {project.status}
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDelete(project._id)}
              className="ml-2 p-2 rounded-lg text-ruby-red hover:bg-ruby-red/20 transition-colors"
              title="Delete project"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
              </svg>
            </motion.button>
          </div>

          {/* Description */}
          <p className="text-gray-400 text-sm mb-4 line-clamp-2">{project.description}</p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="px-2 py-1 rounded text-xs font-medium bg-purple-cyber/20 text-purple-cyber border border-purple-cyber/30"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3 mb-4">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 px-4 py-2 rounded-lg border border-cyan-electric/50 text-cyan-electric text-sm font-medium hover:bg-cyan-electric/10 hover:shadow-glow-cyan transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Repo
            </motion.a>

            {project.liveUrl && (
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-cyan-electric to-purple-cyber text-midnight text-sm font-medium hover:shadow-glow-cyan transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
                </svg>
                Live
              </motion.a>
            )}
          </div>

          {/* Health Pulse */}
          {project.liveUrl && (
            <div className="flex items-center gap-2 text-xs text-neon-green">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green" />
              </span>
              Server Active
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
