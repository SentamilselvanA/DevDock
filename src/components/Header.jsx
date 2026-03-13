import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Header({ onAddProject, onLogout, onProfileClick, isLoggedIn }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [userAvatar, setUserAvatar] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (isLoggedIn) {
      fetchUserProfile();
    }
  }, [isLoggedIn]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setUserAvatar(data.data.profile.avatar);
        setUserName(data.data.profile.fullName || data.data.username);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

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
          {isLoggedIn && (
            <>
              {/* User Profile Menu */}
              <div className="relative">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-electric to-purple-cyber p-0.5 hover:shadow-lg hover:shadow-cyan-electric/50 transition-shadow"
                >
                  <div className="w-full h-full rounded-full bg-midnight flex items-center justify-center overflow-hidden">
                    {userAvatar ? (
                      <img src={userAvatar} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-cyan-electric font-bold text-sm">
                        {userName?.charAt(0).toUpperCase() || 'U'}
                      </span>
                    )}
                  </div>
                </motion.button>

                {/* Dropdown Menu */}
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 bg-slate-800 border border-slate-700 rounded-lg shadow-xl"
                  >
                    <button
                      onClick={() => {
                        onProfileClick?.();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-3 text-gray-300 hover:bg-slate-700 hover:text-white transition-colors border-b border-slate-700"
                    >
                      👤 View Profile
                    </button>
                    <button
                      onClick={() => {
                        onLogout();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-3 text-gray-300 hover:bg-slate-700 rounded-b-lg hover:text-white transition-colors"
                    >
                      🚪 Logout
                    </button>
                  </motion.div>
                )}
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
            </>
          )}
        </motion.div>
      </div>
    </header>
  );
}
                
