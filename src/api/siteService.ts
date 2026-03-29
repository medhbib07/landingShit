// src/api/siteService.ts
import { manageFetch } from "./apiClient";

export const getSites = async (projectId?: string, page = 1, limit = 50) => {
  const query = new URLSearchParams();
  if (projectId) query.append("projectId", projectId);
  query.append("page", page.toString());
  query.append("limit", limit.toString());

  return manageFetch(`/sites?${query.toString()}`, { method: "GET" });
};

/** Alias: fetch all sites belonging to a given project */
export const getSitesByProject = (projectId: string) =>
  getSites(projectId, 1, 50);

export const getSiteById = async (id: string) => {
  return manageFetch(`/sites/${id}`, { method: "GET" });
};

export const createSite = async (data: any) => {
  return manageFetch("/sites", {
    method: "POST",
    body: JSON.stringify(data),
  });
};
