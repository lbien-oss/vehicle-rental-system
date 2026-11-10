
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { apiClient } from "@/lib/api";
import { CONFIG } from "@/lib/config";
import AuthShell from "@/components/auth/AuthShell";

const PINK = "#E08A8A";
const LIGHT_PINK = "#F4C6C6";

export default function RegisterPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: false });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  if (isChecking) return null;

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await apiClient("/api/users", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      setSuccess(true);
      setTimeout(() => router.push(CONFIG.ROUTES.LOGIN), 900);
    } catch (err: any) {
      console.error("REGISTER ERROR:", err);
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
      <form onSubmit={handleRegister}>
        <h2
          className="text-center text-2xl font-semibold tracking-wide"
          style={{ color: PINK }}
        >
          CREATE ACCOUNT
        </h2>

        <p className="mb-6 mt-1 text-center text-xs text-gray-500">
          Register a new account to get started.
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

        {success && (
          <div
            className="mb-3 rounded-md border border-green-200 bg-green-50 p-2 text-xs text-green-600"
            role="status"
          >
            Account created! Redirecting to login...
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

          {/* Password with Eye Icon */}
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
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              autoComplete="new-password"
              className={inputClass}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Eye / EyeOff Toggle Button */}
            <button
              type="button"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
              className="shrink-0 flex items-center justify-center text-[#965D5D] transition-opacity hover:opacity-70"
              aria-label={
                showPassword ? "Hide password" : "Show password"
              }
              title={
                showPassword ? "Hide password" : "Show password"
              }
            >
              {showPassword ? (
                /* Eye Off Icon */
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M3 3l18 18" />
                  <path d="M10.58 10.59a2 2 0 0 0 2.83 2.83" />
                  <path d="M9.88 5.09A10.8 10.8 0 0 1 12 4.87c5 0 8.27 4.11 9.5 7.13a1 1 0 0 1 0 .73 11.8 11.8 0 0 1-4.1 5.08" />
                  <path d="M6.61 6.61A12.5 12.5 0 0 0 2.5 12a1 1 0 0 0 0 .73C3.73 15.75 7 19.87 12 19.87c1.2 0 2.3-.25 3.3-.7" />
                </svg>
              ) : (
                /* Eye Icon */
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </label>
        </div>

        {/* Register Button */}
        <button
          type="submit"
          disabled={loading || success}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-md py-2 text-xs font-semibold tracking-widest text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(224,138,138,0.55)] active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          style={{ backgroundColor: PINK }}
        >
          {loading && (
            <span className="auth-spinner inline-block h-3.5 w-3.5 rounded-full border-2 border-white border-t-transparent" />
          )}

          {loading ? "REGISTERING..." : "REGISTER"}
        </button>

        {/* Login Link */}
        <p className="mt-3 text-center text-sm" style={{ color: PINK }}>
          Already have an account?{" "}
          <Link
            href={CONFIG.ROUTES.LOGIN}
            className="font-semibold transition-all hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
