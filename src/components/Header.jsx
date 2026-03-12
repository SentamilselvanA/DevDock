import React from 'react';
import { motion } from 'framer-motion';

export default function Header({ onAddProject }) {
  return (
    <header className="sticky top-0 z-50 border-b border-cyan-electric/20 bg-midnight/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="flex gap-1">
            <span className="text-cyan-electric text-2xl font-bold">&lt;</span>
            <span className="text-purple-cyber text-2xl font-bold">Dev</span>
            <span className="text-cyan-electric text-2xl font-bold">/&gt;</span>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-electric to-purple-cyber bg-clip-text text-transparent">
            Vault
          </h1>
        </motion.div>

        {/* Right Actions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-4"
        >
          {/* User Profile Placeholder */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-electric to-purple-cyber p-0.5">
            <div className="w-full h-full rounded-full bg-midnight flex items-center justify-center">
              <span className="text-cyan-electric font-bold">D</span>
            </div>
          </div>

          {/* Add Project Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddProject}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-electric to-purple-cyber text-midnight font-semibold hover:shadow-glow-cyan transition-shadow"
          >
            + Add Project
          </motion.button>
        </motion.div>
      </div>
    </header>
  );
}
