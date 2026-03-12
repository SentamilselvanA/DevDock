import React from 'react';
import { motion } from 'framer-motion';

export default function SearchFilter({ onSearch, onFilterTag }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search projects by name or technology..."
            onChange={(e) => onSearch(e.target.value)}
            className="w-full px-6 py-3 rounded-lg bg-midnight/40 border border-cyan-electric/30 text-white placeholder-gray-400 focus:outline-none focus:border-cyan-electric transition-colors backdrop-blur-md"
          />
          <svg
            className="absolute right-4 top-3.5 w-5 h-5 text-cyan-electric/50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-3">
          {['All', 'React', 'Node.js', 'TypeScript', 'Tailwind', 'Python', 'Java', 'C++'].map((tag) => (
            <motion.button
              key={tag}
              whileHover={{ scale: 1.05 }}
              onClick={() => onFilterTag(tag)}
              className="px-4 py-2 rounded-full border border-cyan-electric/30 text-cyan-electric text-sm font-medium hover:bg-cyan-electric/10 hover:border-cyan-electric/60 transition-colors"
            >
              #{tag}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
