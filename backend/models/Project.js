import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
      maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters'],
    },
    repoUrl: {
      type: String,
      required: [true, 'GitHub URL is required'],
      match: [
        /^https?:\/\/[^\s]+$/,
        'Please provide a valid URL',
      ],
    },
    liveUrl: {
      type: String,
      match: [
        /^https?:\/\/[^\s]*$/,
        'Please provide a valid URL',
      ],
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: ['Production', 'Beta', 'In Progress', 'Archived'],
      default: 'In Progress',
    },
    healthStatus: {
      type: String,
      enum: ['Online', 'Offline'],
      default: 'Online',
    },
    lastChecked: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model('Project', projectSchema);

export default Project;
