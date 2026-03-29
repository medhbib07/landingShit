/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/userService.ts
import { identityFetch } from "./apiClient";

export const getUsers = async (enterpriseId?: string) => {
  const url = enterpriseId ? `/users?enterprise_id=${enterpriseId}` : "/users";
  return identityFetch(url, {
    method: "GET",
    credentials: "include",
  });
};

export interface CreateUserPayload {
  fullName: string;
  email: string;
  password?: string;
  role: string;
  privileges: string[];
}

export const createUser = async (
  data: CreateUserPayload,
  enterpriseId?: string,
) => {
  const url = enterpriseId ? `/users?enterprise_id=${enterpriseId}` : "/users";
  console.log(`[userService] Creating user on ${url}`, data);
  return identityFetch(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const deleteUser = async (userId: string) => {
  return identityFetch(`/users/${userId}`, {
    method: "DELETE",
    credentials: "include",
  });
};

interface LoginPayload {
  email: string;
  password: string;
  enterprise_id?: string;
}

interface LoginResponse {
  user: {
    _id?: string;
    id?: string;
    fullName: string;
    email: string;
    role: string;
    enterprise_id: string;
    first_login: boolean;
  };
  access_token: string;
  refresh_token?: string;
}

export async function loginUser(payload: LoginPayload): Promise<LoginResponse> {
  return identityFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "include",
  });
}

export async function refreshAccessToken(): Promise<LoginResponse> {
  return identityFetch("/auth/refresh", {
    method: "POST",
    credentials: "include",
  });
}

export const updateUser = async (userId: string, data: any) => {
  return identityFetch(`/users/${userId}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
};

export const activateUser = async (userId: string) => {
  return identityFetch(`/users/${userId}/activate`, {
    method: "PUT",
  });
};

export const deactivateUser = async (userId: string) => {
  return identityFetch(`/users/${userId}/deactivate`, {
    method: "PUT",
  });
};
