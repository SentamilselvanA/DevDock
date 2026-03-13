import Project from '../models/Project.js';
import axios from 'axios';

// Get all projects
export const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching projects',
      error: error.message,
    });
  }
};

// Get single project by ID
export const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.status(200).json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching project',
      error: error.message,
    });
  }
};

// Create new project
export const createProject = async (req, res) => {
  try {
    const { title, description, repoUrl, liveUrl, tags, status } = req.body;

    // Validate required fields
    if (!title || !repoUrl) {
      return res.status(400).json({
        success: false,
        message: 'Title and GitHub URL are required',
      });
    }

    const newProject = new Project({
      title,
      description,
      repoUrl,
      liveUrl,
      tags: tags || [],
      status: status || 'In Progress',
    });

    await newProject.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: newProject,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating project',
      error: error.message,
    });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, repoUrl, liveUrl, tags, status } = req.body;

    const project = await Project.findByIdAndUpdate(
      id,
      {
        title,
        description,
        repoUrl,
        liveUrl,
        tags,
        status,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project updated successfully',
      data: project,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating project',
      error: error.message,
    });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting project',
      error: error.message,
    });
  }
};

// Check health status of a single project
export const checkSingleProjectHealth = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
      });
    }

    if (!project.liveUrl) {
      return res.status(400).json({
        success: false,
        message: 'Project does not have a live URL',
      });
    }

    // Check health status
    try {
      await axios.get(project.liveUrl, { timeout: 5000 });
      project.healthStatus = 'Online';
    } catch (error) {
      project.healthStatus = 'Offline';
    }

    project.lastChecked = new Date();
    await project.save();

    res.status(200).json({
      success: true,
      message: 'Health check completed',
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking project health',
      error: error.message,
    });
  }
};

// Check health status of all projects
export const checkAllProjectsHealth = async (req, res) => {
  try {
    const projects = await Project.find();

    for (const project of projects) {
      if (project.liveUrl) {
        try {
          await axios.get(project.liveUrl, { timeout: 5000 });
          project.healthStatus = 'Online';
        } catch (error) {
          project.healthStatus = 'Offline';
        }
        project.lastChecked = new Date();
        await project.save();
      }
    }

    res.status(200).json({
      success: true,
      message: 'Health check completed for all projects',
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking projects health',
      error: error.message,
    });
  }
};
