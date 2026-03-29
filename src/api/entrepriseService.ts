/* eslint-disable @typescript-eslint/no-explicit-any */
// src/api/entrepriseService.ts
import { identityFetch } from "./apiClient";

export const registerEnterprise = async (data: any) => {
  const body = data instanceof FormData ? data : JSON.stringify(data);
  return identityFetch("/enterprises/register", {
    method: "POST",
    body,
  });
};

export const getEnterprises = async () => {
  return identityFetch("/enterprises", {
    method: "GET",
  });
};

export const approveEnterprise = async (id: string) => {
  return identityFetch(`/enterprises/${id}/approve`, {
    method: "PUT",
  });
};

export const rejectEnterprise = async (id: string) => {
  return identityFetch(`/enterprises/${id}/reject`, {
    method: "PUT",
  });
};

export const getEnterpriseById = async (id: string) => {
  return identityFetch(`/enterprises/${id}`, {
    method: "GET",
  });
};
