const rawBackendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

export const VITE_BACKEND_URL = rawBackendUrl.trim().replace(/;$/, "");
