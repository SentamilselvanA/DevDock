import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import projectRoutes from './routes/projects.js';
import Project from './models/Project.js';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use(
  cors({
    origin: process.env.FRONTEND_URL || ['http://localhost:5173', 'http://localhost:5174'],
    credentials: true,
  })
);

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/projects', projectRoutes);

// Health check endpoint for the server
app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'DevVault Backend is running',
    timestamp: new Date().toISOString(),
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to DevVault API',
    version: '1.0.0',
    endpoints: {
      projects: '/api/projects',
      health: '/api/health',
    },
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
  });
});

// Function to check health of all projects
const checkProjectsHealth = async () => {
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

    console.log(`✅ Health check completed for ${projects.length} projects`);
  } catch (error) {
    console.error('❌ Error during health check:', error.message);
  }
};

// Schedule health checks every 30 minutes
setInterval(checkProjectsHealth, 30 * 60 * 1000);

// Also run health check on server startup
setTimeout(checkProjectsHealth, 5000);

// Start server
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🚀 DevVault Backend Server Started   ║
║   Listening on: http://localhost:${PORT}   ║
║   Environment: ${process.env.NODE_ENV || 'development'}              ║
╚════════════════════════════════════════╝
  `);
});
