import User from '../models/User.js';

// Get user profile
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select('-password');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching profile',
      error: error.message,
    });
  }
};

// Update user profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { fullName, bio, location, website, socialLinks, avatar } = req.body;

    // Validate input
    if (bio && bio.length > 500) {
      return res.status(400).json({
        success: false,
        message: 'Bio cannot exceed 500 characters',
      });
    }

    // Update user profile
    const user = await User.findByIdAndUpdate(
      userId,
      {
        'profile.fullName': fullName || '',
        'profile.bio': bio || '',
        'profile.location': location || '',
        'profile.website': website || '',
        'profile.avatar': avatar || '',
        'profile.socialLinks': socialLinks || {
          github: '',
          linkedin: '',
          twitter: '',
        },
      },
      {
        new: true,
        runValidators: true,
      }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating profile',
      error: error.message,
    });
  }
};

// Update user avatar (image)
export const updateAvatar = async (req, res) => {
  try {
    const userId = req.userId;
    const { avatar } = req.body;

    if (!avatar) {
      return res.status(400).json({
        success: false,
        message: 'Avatar image is required',
      });
    }

    // Check avatar size (limit to ~2MB base64)
    if (avatar.length > 2097152) {
      return res.status(400).json({
        success: false,
        message: 'Image is too large (max 2MB)',
      });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { 'profile.avatar': avatar },
      { new: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: 'Avatar updated successfully',
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating avatar',
      error: error.message,
    });
  }
};
