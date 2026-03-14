import { useState } from "react";
import { API_BASE_URL, getAuthHeader } from "../config/api";

// Custom hook for projects API
export const useProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all projects
  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
      });
      if (!response.ok) throw new Error("Failed to fetch projects");
      const data = await response.json();
      setProjects(data.data || []);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching projects:", err);
    } finally {
      setLoading(false);
    }
  };

  // Create project
  const createProject = async (projectData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify({
          title: projectData.title,
          description: projectData.description,
          repoUrl: projectData.repoUrl,
          liveUrl: projectData.liveUrl,
          tags: projectData.tags,
          status: projectData.status || "In Progress",
        }),
      });

      if (!response.ok) throw new Error("Failed to create project");
      const data = await response.json();
      setProjects([...projects, data.data]);
      return data.data;
    } catch (err) {
      setError(err.message);
      console.error("Error creating project:", err);
    }
  };

  // Delete project
  const deleteProject = async (projectId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
      });

      if (!response.ok) throw new Error("Failed to delete project");
      setProjects(projects.filter((p) => p._id !== projectId));
    } catch (err) {
      setError(err.message);
      console.error("Error deleting project:", err);
    }
  };

  // Update project
  const updateProject = async (projectId, updates) => {
    try {
      const response = await fetch(`${API_BASE_URL}/projects/${projectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeader(),
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error("Failed to update project");
      const data = await response.json();
      setProjects(projects.map((p) => (p._id === projectId ? data.data : p)));
      return data.data;
    } catch (err) {
      setError(err.message);
      console.error("Error updating project:", err);
    }
  };

  // Check project health
  const checkProjectHealth = async (projectId) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/projects/${projectId}/health`,
        {
          headers: {
            "Content-Type": "application/json",
            ...getAuthHeader(),
          },
        },
      );
      if (!response.ok) throw new Error("Failed to check health");
      const data = await response.json();
      setProjects(projects.map((p) => (p._id === projectId ? data.data : p)));
      return data.data;
    } catch (err) {
      console.error("Error checking health:", err);
    }
  };

  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    deleteProject,
    updateProject,
    checkProjectHealth,
  };
};
