import React from 'react';
import { motion } from 'framer-motion';

export default function EmptyState({ onAddProject }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="flex flex-col items-center justify-center py-20"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="mb-8"
      >
        <div className="text-8xl">🔒</div>
      </motion.div>

      <h2 className="text-4xl font-bold text-white mb-4 text-center">Vault is Empty</h2>
      <p className="text-gray-400 text-lg mb-8 text-center max-w-md">
        Start building your collection! Add your first project to begin your coding journey.
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onAddProject}
        className="px-8 py-4 rounded-lg bg-gradient-to-r from-cyan-electric to-purple-cyber text-midnight font-bold text-lg hover:shadow-glow-cyan transition-shadow"
      >
        + Add Your First Project
      </motion.button>

      <motion.div
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mt-12 text-center"
      >
        <p className="text-cyan-electric/50">
          💡 Tip: Analyze your coding journey by organizing all your projects
        </p>
      </motion.div>
    </motion.div>
  );
}
