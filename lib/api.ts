import { CONFIG } from "./config";
import { getAccessToken } from "./auth";
 
interface FetchOptions extends RequestInit {
  requiresAuth?: boolean;
}
 
export async function apiClient<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const { requiresAuth = false, headers, ...restOptions } = options;
 
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
  };
 
  if (requiresAuth) {
    const token = getAccessToken();
    if (token) {
      defaultHeaders["Authorization"] = `Bearer ${token}`;
    }
  }
 
  const url = `${CONFIG.API_BASE_URL}${endpoint}`;
 
  let response: Response;
  try {
    response = await fetch(url, {
      ...restOptions,
      headers: {
        ...defaultHeaders,
        ...headers,
      },
    });
  } catch (err) {
    console.error("NETWORK ERROR:", url, err);
    throw new Error(
      `Cannot reach the server at ${url}. Check that the backend is running and the API URL is correct.`
    );
  }
 
  const text = await response.text();
  let data: any = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = null;
  }
 
  console.log("API:", response.status, url, text);
 
  if (!response.ok) {
    const raw = data?.message ?? data?.detail ?? data?.error;
 
    let errorMessage: string | undefined;
    if (Array.isArray(raw)) {
      errorMessage = raw.map((d: any) => d?.msg ?? d).join(", ");
    } else if (typeof raw === "string") {
      errorMessage = raw;
    }
 
    throw new Error(errorMessage || `Request failed (${response.status})`);
  }
 
  return data as T;
}