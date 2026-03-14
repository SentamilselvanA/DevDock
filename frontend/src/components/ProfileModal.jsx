import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ProfileModal = ({ isOpen, onClose }) => {
  const [profileData, setProfileData] = useState({
    fullName: '',
    bio: '',
    location: '',
    website: '',
    avatar: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editMode, setEditMode] = useState(false);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ;

  useEffect(() => {
    if (isOpen) {
      fetchProfile();
    }
  }, [isOpen]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/profile`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch profile');
      const data = await response.json();
      setProfileData(data.data.profile);
    } catch (err) {
      console.error('Error fetching profile:', err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('social_')) {
      const socialKey = name.replace('social_', '');
      setProfileData(prev => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [socialKey]: value,
        },
      }));
    } else {
      setProfileData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
    setError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Check file size (max 2MB)
      if (file.size > 2097152) {
        setError('Image is too large (max 2MB)');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({
          ...prev,
          avatar: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE_URL}/profile`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      setSuccess('Profile updated successfully!');
      setEditMode(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-lg p-8 w-full max-w-2xl border border-purple-cyber/30 max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Profile Details</h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg mb-4"
              >
                {error}
              </motion.div>
            )}
            {success && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-lg mb-4"
              >
                {success}
              </motion.div>
            )}

            {/* Profile Content */}
            <div className="space-y-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center gap-4">
                <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-electric to-purple-cyber p-1 overflow-hidden">
                  {profileData.avatar ? (
                    <img src={profileData.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center">
                      <span className="text-cyan-electric text-4xl font-bold">
                        {profileData.fullName?.charAt(0) || '?'}
                      </span>
                    </div>
                  )}
                </div>
                {editMode && (
                  <label className="px-4 py-2 bg-gradient-to-r from-cyan-electric to-purple-cyber text-midnight font-semibold rounded-lg cursor-pointer hover:shadow-lg hover:shadow-cyan-electric/50 transition-shadow">
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    placeholder="Your full name"
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg focus:outline-none focus:border-cyan-electric disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    placeholder="Tell us about yourself (max 500 characters)"
                    maxLength="500"
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg focus:outline-none focus:border-cyan-electric disabled:opacity-50 min-h-[100px]"
                  />
                  <p className="text-gray-400 text-xs mt-1">
                    {profileData.bio.length}/500
                  </p>
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={profileData.location}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    placeholder="City, Country"
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg focus:outline-none focus:border-cyan-electric disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={profileData.website}
                    onChange={handleInputChange}
                    disabled={!editMode}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 text-white rounded-lg focus:outline-none focus:border-cyan-electric disabled:opacity-50"
                  />
                </div>

                {/* Social Links */}
                <div className="bg-slate-700/30 p-4 rounded-lg">
                  <h3 className="text-white font-semibold mb-3">Social Links</h3>
                  <div className="space-y-3">
                    <input
                      type="text"
                      name="social_github"
                      value={profileData.socialLinks?.github || ''}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      placeholder="GitHub username or URL"
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-cyan-electric disabled:opacity-50 text-sm"
                    />
                    <input
                      type="text"
                      name="social_linkedin"
                      value={profileData.socialLinks?.linkedin || ''}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      placeholder="LinkedIn URL or profile"
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-cyan-electric disabled:opacity-50 text-sm"
                    />
                    <input
                      type="text"
                      name="social_twitter"
                      value={profileData.socialLinks?.twitter || ''}
                      onChange={handleInputChange}
                      disabled={!editMode}
                      placeholder="Twitter handle or URL"
                      className="w-full px-3 py-2 bg-slate-800 border border-slate-600 text-white rounded-lg focus:outline-none focus:border-cyan-electric disabled:opacity-50 text-sm"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6">
                {!editMode ? (
                  <button
                    onClick={() => setEditMode(true)}
                    className="flex-1 px-6 py-2 rounded-lg bg-gradient-to-r from-cyan-electric to-purple-cyber text-midnight font-semibold hover:shadow-lg hover:shadow-cyan-electric/50 transition-all duration-300"
                  >
                    Edit Profile
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditMode(false);
                        fetchProfile(); // Reload original data
                      }}
                      className="flex-1 px-6 py-2 rounded-lg bg-slate-700 text-white font-semibold hover:bg-slate-600 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveProfile}
                      disabled={loading}
                      className="flex-1 px-6 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all duration-300 disabled:opacity-50"
                    >
                      {loading ? 'Saving...' : 'Save Profile'}
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ProfileModal;
