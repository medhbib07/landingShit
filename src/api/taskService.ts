// src/api/taskService.ts
import { manageFetch } from "./apiClient";

export interface CreateTaskPayload {
  name: string;
  description?: string;
  start_date?: string;
  end_date?: string;
  estimated_duration?: number;
  assigned_budget?: number;
  siteId: string;
  dependencies?: string[];
  assigned_resources?: string[];
}

export const createTask = async (data: CreateTaskPayload) => {
  return manageFetch("/tasks", {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
  });
};

export const getTasks = async (siteId: string) => {
  return manageFetch(`/tasks?siteId=${siteId}`, {
    method: "GET",
    credentials: "include",
  });
};

export const updateTask = async (taskId: string, data: Partial<CreateTaskPayload>) => {
  return manageFetch(`/tasks/${taskId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    credentials: "include",
  });
};

export const deleteTask = async (taskId: string) => {
  return manageFetch(`/tasks/${taskId}`, {
    method: "DELETE",
    credentials: "include",
  });
};
