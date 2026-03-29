/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAuthStore } from "@/store/authStore";
import { identityFetch } from "./apiClient";

const getAuthHeaders = () => {
  const token = useAuthStore.getState().accessToken;

  return {
    Authorization: `Bearer ${token}`,
  };
};

// ===============================
// Apply preset (create + attach)
// ===============================
export const applyPreset = async (data: any) => {
  return identityFetch("/presets/apply", {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
};

// ===============================
// Get my preset
// ===============================
export const getMyPreset = async () => {
  try {
    return await identityFetch("/presets/me", {
      method: "GET",
      headers: getAuthHeaders(),
    });
  } catch (error: any) {
    // If 404, it means no preset exists yet, return null gracefully
    if (error.status === 404) {
      return null;
    }
    throw error;
  }
};

// ===============================
// Update my preset
// ===============================
export const updatePreset = async (data: any) => {
  return identityFetch("/presets/update", {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });
};

// ===============================
// Delete my preset (optional)
// ===============================
export const deletePreset = async () => {
  return identityFetch("/presets/delete", {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
};
