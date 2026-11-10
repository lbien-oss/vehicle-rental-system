
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { apiClient } from "@/lib/api";
import { setTokens } from "@/lib/auth";
import { CONFIG } from "@/lib/config";
import AuthShell from "@/components/auth/AuthShell";

const LOGIN_PATH = "/api/users/login";
const REMEMBER_KEY = "remembered_username";
const PINK = "#E08A8A";
const LIGHT_PINK = "#F4C6C6";

interface LoginResponse {
  access_token?: string;
  accessToken?: string;
  token?: string;
  refresh_token?: string;
  refreshToken?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: false });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(REMEMBER_KEY);
      if (saved) {
        setUsername(saved);
        setRemember(true);
      }
    } catch {}
  }, []);

  if (isChecking) return null;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await apiClient<LoginResponse>(LOGIN_PATH, {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      const accessToken =
        data.access_token ?? data.accessToken ?? data.token;

      const refreshToken =
        data.refresh_token ?? data.refreshToken;

      if (!accessToken) {
        throw new Error("Walang access token sa response ng server.");
      }

      try {
        if (remember) {
          localStorage.setItem(REMEMBER_KEY, username);
        } else {
          localStorage.removeItem(REMEMBER_KEY);
        }
      } catch {}

      setTokens(accessToken, refreshToken);
      router.push(CONFIG.ROUTES.DASHBOARD);

    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
      setShakeKey((k) => k + 1);

    } finally {
      setLoading(false);
    }
  };

  const fieldClass =
    "group flex items-center gap-2 rounded-md px-3 py-2 transition-all duration-200 focus-within:scale-[1.02] focus-within:shadow-[0_0_0_2px_#E08A8A] hover:brightness-95";

  const inputClass =
    "w-full bg-transparent text-sm text-[#7a3a3a] outline-none placeholder:text-white";

  return (
    <AuthShell>
      <form onSubmit={handleLogin}>
        <h2
          className="text-center text-2xl font-semibold tracking-wide"
          style={{ color: PINK }}
        >
          LOGIN
        </h2>

        <p className="mb-6 mt-1 text-center text-xs text-gray-500">
          Enter your credentials to access your account.
        </p>

        {error && (
          <div
            key={shakeKey}
            className="auth-shake mb-3 rounded-md border border-red-200 bg-red-50 p-2 text-xs text-red-500"
            role="alert"
          >
            {error}
          </div>
        )}

        <div className="space-y-3">
          {/* Username */}
          <label
            className={fieldClass}
            style={{ backgroundColor: LIGHT_PINK }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="white"
              aria-hidden="true"
            >
              <circle cx="12" cy="8" r="4.5" />
              <path d="M3 21c0-4.5 4-7 9-7s9 2.5 9 7z" />
            </svg>

            <input
              id="username"
              type="text"
              placeholder="Username"
              autoComplete="username"
              className={inputClass}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>

          {/* Password - No Eye Icon */}
          <label
            className={fieldClass}
            style={{ backgroundColor: LIGHT_PINK }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="white"
              aria-hidden="true"
            >
              <rect x="4" y="10" width="16" height="11" rx="2" />
              <path
                d="M8 10V7a4 4 0 0 1 8 0v3"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
              />
            </svg>

            <input
              id="password"
              type="password"
              placeholder="Password"
              autoComplete="current-password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>

        {/* Remember and Forgot Password */}
        <div
          className="mt-3 flex items-center justify-between text-[11px]"
          style={{ color: PINK }}
        >
          <label className="flex cursor-pointer select-none items-center gap-1.5">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />

            <span
              className="flex h-3.5 w-3.5 items-center justify-center rounded-full border transition-all duration-200 peer-checked:scale-110 peer-checked:bg-[#E08A8A]"
              style={{ borderColor: PINK }}
            >
              <svg
                width="9"
                height="9"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="4"
              >
                <path d="M5 12l5 5 9-10" />
              </svg>
            </span>

            Remember
          </label>

          <Link
            href="#"
            className="transition-opacity hover:underline hover:opacity-80"
          >
            Forgot password ?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-md py-2 text-xs font-semibold tracking-widest text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(224,138,138,0.55)] active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          style={{ backgroundColor: PINK }}
        >
          {loading && (
            <span className="auth-spinner inline-block h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent" />
          )}

          {loading ? "LOGGING IN..." : "LOGIN"}
        </button>

        {/* Create Account */}
        <p className="mt-3 text-center text-sm">
          <Link
            href={CONFIG.ROUTES.REGISTER}
            className="transition-all hover:underline hover:tracking-wide"
            style={{ color: PINK }}
          >
            Create account
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
