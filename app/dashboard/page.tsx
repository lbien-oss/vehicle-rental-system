"use client";

import { useRouter } from "next/navigation";
import { Fredoka, Open_Sans } from "next/font/google";
import { useAuthGuard } from "@/hooks/useAuthGuard";
import { clearTokens } from "@/lib/auth";
import { CONFIG } from "@/lib/config";
import { BRAND } from "@/components/auth/AuthShell";

const fredoka = Fredoka({ subsets: ["latin"], weight: ["500", "600", "700"] });
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "600", "700"] });

const PINK = "#E08A8A";
const LIGHT_PINK = "#F4C6C6";

// Mga susunod na seksyon ng vehicle rental mo (placeholder pa lang)
const TILES = [
  { title: "Vehicles", desc: "Manage your cars, vans and bikes.", icon: "M3 13l2-6h14l2 6v5h-2a2 2 0 0 1-4 0H9a2 2 0 0 1-4 0H3z" },
  { title: "Bookings", desc: "View and track rental reservations.", icon: "M6 3v3M18 3v3M4 8h16v12H4z" },
  { title: "Customers", desc: "See who is renting your vehicles.", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21c0-4 3.5-6 8-6s8 2 8 6z" },
];

export default function DashboardPage() {
  const router = useRouter();
  const { isChecking } = useAuthGuard({ requireAuth: true });

  if (isChecking) {
    return (
      <div className={`${openSans.className} flex min-h-screen items-center justify-center bg-white`}>
        <div className="flex items-center gap-3" style={{ color: PINK }}>
          <span
            className="dash-spinner inline-block h-5 w-5 rounded-full border-2"
            style={{ borderColor: PINK, borderTopColor: "transparent" }}
          />
          <p className="text-sm">Verifying session...</p>
        </div>
        <style>{`@keyframes dash-spin{to{transform:rotate(360deg)}} .dash-spinner{animation:dash-spin .8s linear infinite}`}</style>
      </div>
    );
  }

  const handleLogout = () => {
    clearTokens();
    router.push(CONFIG.ROUTES.LOGIN);
  };

  return (
    <div className={`${openSans.className} min-h-screen bg-white`}>
      <style>{`
        @keyframes dash-rise{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
        @keyframes dash-wave{0%,60%,100%{transform:rotate(0)}10%,30%{transform:rotate(14deg)}20%,40%{transform:rotate(-8deg)}50%{transform:rotate(10deg)}}
        .dash-rise{animation:dash-rise .6s cubic-bezier(.2,.8,.2,1) both}
        .dash-wave{display:inline-block;transform-origin:70% 70%;animation:dash-wave 2.2s ease-in-out infinite}
        @media (prefers-reduced-motion: reduce){ *{animation:none !important} }
      `}</style>

      <div className="h-2 w-full" style={{ backgroundColor: PINK }} />

      <div className="mx-auto max-w-4xl space-y-8 p-6 md:p-8">
        <header
          className="dash-rise flex items-center justify-between border-b-2 pb-4"
          style={{ borderColor: LIGHT_PINK }}
        >
          <div>
            <h1
              className={`${fredoka.className} text-3xl font-bold text-black`}
              style={{ letterSpacing: "0.25em" }}
            >
              {BRAND}
            </h1>
            <p className="mt-1 text-xs tracking-widest" style={{ color: PINK }}>
              DASHBOARD
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="rounded-md px-5 py-2 text-xs font-semibold tracking-widest text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_14px_rgba(224,138,138,0.55)] active:translate-y-0 active:scale-[0.97]"
            style={{ backgroundColor: PINK }}
          >
            LOGOUT
          </button>
        </header>

        <section
          className="dash-rise relative overflow-hidden rounded-xl p-6 shadow-sm"
          style={{ backgroundColor: PINK, animationDelay: "0.1s" }}
        >
          <svg
            className="absolute -right-6 -bottom-6 opacity-20"
            width="160"
            height="160"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <circle cx="24" cy="24" r="22" fill="#000" />
            <circle cx="24" cy="24" r="12" fill="none" stroke="#fff" strokeWidth="2" />
            <circle cx="24" cy="24" r="4" fill="#fff" />
          </svg>
          <h2 className="text-xl font-semibold text-white">
            Welcome back! <span className="dash-wave">👋</span>
          </h2>
          <p className="mt-2 max-w-md text-sm text-white/90">
            You are authenticated. Your active JWT session is stored in LocalStorage.
          </p>
        </section>

        <section className="grid gap-4 sm:grid-cols-3">
          {TILES.map((t, i) => (
            <div
              key={t.title}
              className="dash-rise group cursor-default rounded-xl border-2 p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_10px_24px_rgba(224,138,138,0.35)]"
              style={{ borderColor: LIGHT_PINK, animationDelay: `${0.2 + i * 0.1}s` }}
            >
              <div
                className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110"
                style={{ backgroundColor: LIGHT_PINK }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                >
                  <path d={t.icon} />
                </svg>
              </div>
              <h3 className="font-semibold" style={{ color: PINK }}>
                {t.title}
              </h3>
              <p className="mt-1 text-xs text-gray-500">{t.desc}</p>
              <span
                className="mt-3 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold text-white"
                style={{ backgroundColor: LIGHT_PINK }}
              >
                COMING SOON
              </span>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}