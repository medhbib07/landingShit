// src/api/projectService.ts
import { manageFetch } from "./apiClient";

export interface ProjectListingParams {
  page?: number;
  limit?: number;
  entrepriseId?: string;
  status?: string;
  search?: string;
}

export const getProjects = async (params: ProjectListingParams = {}) => {
  const query = new URLSearchParams();
  if (params.page) query.append("page", params.page.toString());
  if (params.limit) query.append("limit", params.limit.toString());
  if (params.entrepriseId) query.append("entrepriseId", params.entrepriseId);
  if (params.status) query.append("status", params.status);
  if (params.search) query.append("search", params.search);

  const queryString = query.toString();
  const endpoint = queryString ? `/projects?${queryString}` : "/projects";

  return manageFetch(endpoint, { method: "GET" });
};

export const getProjectById = async (id: string) => {
  return manageFetch(`/projects/${id}`, { method: "GET" });
};

export const createProject = async (data: any) => {
  return manageFetch("/projects", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const updateProject = async (id: string, data: any) => {
  return manageFetch(`/projects/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
};

export const deleteProject = async (id: string) => {
  return manageFetch(`/projects/${id}`, { method: "DELETE" });
};

export const getProjectsSummary = async (entrepriseId?: string) => {
  const url = entrepriseId ? `/projects/summary?entrepriseId=${entrepriseId}` : '/projects/summary';
  return manageFetch(url, { method: "GET" });
};

export const getProjectAnalytics = async (id: string) => {
  return manageFetch(`/projects/${id}/analytics`, { method: "GET" });
};

export const getSiteStats = async (id: string) => {
  return manageFetch(`/sites/${id}/stats`, { method: "GET" });
};

export const getSiteAnalytics = async (id: string) => {
  return manageFetch(`/sites/${id}/analytics`, { method: "GET" });
};

export const getGlobalTasksAnalytics = async (entrepriseId?: string) => {
  const url = entrepriseId ? `/tasks/analytics/global?entrepriseId=${entrepriseId}` : '/tasks/analytics/global';
  return manageFetch(url, { method: "GET" });
};
