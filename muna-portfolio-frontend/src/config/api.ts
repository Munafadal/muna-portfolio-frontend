// API configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:4000';
const HAS_EXPLICIT_BACKEND_URL = Boolean(import.meta.env.VITE_BACKEND_URL);

const stripTrailingSlash = (value: string): string => value.replace(/\/+$/, "");
const getBackendOrigin = (): string => {
  if (HAS_EXPLICIT_BACKEND_URL) {
    return stripTrailingSlash(BACKEND_URL);
  }

  if (API_BASE_URL.startsWith('http://') || API_BASE_URL.startsWith('https://')) {
    try {
      return new URL(API_BASE_URL).origin;
    } catch {
      return stripTrailingSlash(BACKEND_URL);
    }
  }

  // Dev/local fallback when API_BASE_URL is relative (e.g. "/api")
  return stripTrailingSlash(BACKEND_URL);
};

// Helper to get full API URL
export const getApiUrl = (path: string): string => {
  if (API_BASE_URL) {
    return `${API_BASE_URL}${path}`;
  }
  if (HAS_EXPLICIT_BACKEND_URL) {
    return `${stripTrailingSlash(BACKEND_URL)}${path}`;
  }
  return path; // Use relative path in production (Netlify will proxy)
};

// Helper to get full backend URL for file paths
export const getBackendUrl = (path: string): string => {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  if (!path) {
    return getBackendOrigin();
  }

  if (path.startsWith('/')) {
    return `${getBackendOrigin()}${path}`;
  }
  return path;
};
