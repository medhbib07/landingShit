// src/api/apiClient.ts

/**
 * Builds the base host for API calls.
 * - On plain localhost / 127.0.0.1  → use `batix.localhost`
 * - On any subdomain (e.g. private-lye0.batix.localhost) → keep the full hostname
 *   so that the CORS origin matches the actual service host.
 */
const getApiHost = (): string => {
  // Hard-coded overrides via env vars take priority
  if (import.meta.env.VITE_API_URL) {
    const url = import.meta.env.VITE_API_URL;
    return url.endsWith("/") ? url.slice(0, -1) : url;
  }

  const { protocol, hostname } = window.location;

  const host =
    hostname === "localhost" || hostname === "127.0.0.1"
      ? "batix.localhost"
      : hostname; // keeps subdomains intact (e.g. private-lye0.batix.localhost)

  return `${protocol}//${host}`;
};

const API_HOST = getApiHost();
console.log(`[apiClient] API host resolved to: ${API_HOST}`);

// ─── Base URLs ───────────────────────────────────────────────
// API Gateway → port 3000 (Central routing for all microservices)
// Note: Proxies are configured in the gateway at /<service-name>
export const IDENTITY_BASE_URL =
  import.meta.env.VITE_IDENTITY_BASE_URL ?? `${API_HOST}:3000/identity`;

export const MANAGEMENT_BASE_URL =
  import.meta.env.VITE_MANAGEMENT_BASE_URL ?? `${API_HOST}:3000/manage`;

// ─── Shared Response Handler ─────────────────────────────────
export const handleResponse = async (response: Response) => {
  let data;
  try {
    data = await response.json();
  } catch (e) {
    data = {};
  }

  if (!response.ok) {
    console.warn(
      `[apiClient] Request failed with status ${response.status}`,
      data,
    );
    const rawMessage = Array.isArray(data.message)
      ? data.message[0]
      : data.message;
    const error: any = new Error(
      rawMessage ||
      data.error ||
      `Error ${response.status}: ${response.statusText}`,
    );
    error.status = response.status;
    error.data = data;
    throw error;
  }
  return data;
};

// ─── Shared Fetch Logic (private) ────────────────────────────
const baseFetch = async (
  baseUrl: string,
  serviceName: string,
  endpoint: string,
  options: RequestInit = {},
) => {
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${baseUrl}${cleanEndpoint}`;

  console.log(
    `[apiClient] [${serviceName}] ${options.method || "GET"} -> ${url}`,
  );

  const headers = new Headers((options.headers as any) || {});

  // Attempt to get token from store
  try {
    const { useAuthStore } = await import("@/store/authStore");
    const state = useAuthStore.getState();
    const token = state.accessToken;

    if (token) {
      if (!headers.has("Authorization")) {
        headers.set("Authorization", `Bearer ${token}`);
      }
    } else if (state.isAuthenticated) {
      console.warn(
        `[apiClient] [${serviceName}] User IS authenticated but accessToken is MISSING in store for: ${url}`,
      );
    }
  } catch (e) {
    console.debug("[apiClient] Auth store not yet available or import failed");
  }

  if (!(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  try {
    const response = await fetch(url, {
      credentials: "include",
      ...options,
      headers,
    });
    return await handleResponse(response);
  } catch (error) {
    console.error(`[apiClient] Critical network error for ${url}:`, error);
    throw error;
  }
};

// ─── Identity API ────────────────────────────────────────────
// Auth, Users, Enterprises, Presets, Password Reset, etc.
export const identityFetch = (endpoint: string, options: RequestInit = {}) =>
  baseFetch(IDENTITY_BASE_URL, "identity", endpoint, options);

// ─── Management API ─────────────────────────────────────────
// Projects, Sites, and other management resources
export const manageFetch = (endpoint: string, options: RequestInit = {}) =>
  baseFetch(MANAGEMENT_BASE_URL, "manage", endpoint, options);

// ─── Legacy apiFetch (backward-compatible) ───────────────────
// @deprecated – Use identityFetch or manageFetch directly instead.
export const apiFetch = async (
  endpoint: string,
  options: RequestInit = {},
  service: string = "identity",
) => {
  if (service === "manage" || service === "project") {
    return manageFetch(endpoint, options);
  }
  return identityFetch(endpoint, options);
};
