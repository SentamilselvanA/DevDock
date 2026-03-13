import express from 'express';
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  checkSingleProjectHealth,
  checkAllProjectsHealth,
} from '../controllers/projectController.js';

const router = express.Router();

// CRUD Routes
router.get('/', getAllProjects);
router.get('/:id', getProjectById);
router.post('/', createProject);
router.patch('/:id', updateProject);
router.delete('/:id', deleteProject);

// Health Check Routes
router.get('/:id/health', checkSingleProjectHealth);
router.post('/health/check-all', checkAllProjectsHealth);

export default router;
