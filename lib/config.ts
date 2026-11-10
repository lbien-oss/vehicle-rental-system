export const CONFIG = {
  API_BASE_URL:
    process.env.NEXT_PUBLIC_API_URL ||
    "http://localhost:4000",

  STORAGE_KEYS: {
    ACCESS_TOKEN: "accessToken",
    REFRESH_TOKEN: "refreshToken",
  },

  ROUTES: {
    HOME: "/",
    LOGIN: "/login",
    REGISTER: "/register",
    DASHBOARD: "/dashboard",
  },
} as const;