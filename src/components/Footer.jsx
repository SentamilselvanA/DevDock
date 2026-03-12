import React from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-cyan-electric/20 bg-midnight/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-gray-400 text-lg">
            💻 Analyze your coding journey
          </p>
          <p className="text-cyan-electric/50 text-sm mt-4">
            Built with React, Tailwind CSS, and Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
