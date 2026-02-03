// API configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';
export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://127.0.0.1:4000';

// Helper to get full API URL
export const getApiUrl = (path: string): string => {
  if (API_BASE_URL) {
    return `${API_BASE_URL}${path}`;
  }
  return path; // Use relative path in production (Netlify will proxy)
};

// Helper to get full backend URL for file paths
export const getBackendUrl = (path: string): string => {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  if (path.startsWith('/')) {
    return `${BACKEND_URL}${path}`;
  }
  return path;
};
