"use client";

import { Fredoka, Open_Sans } from "next/font/google";

const fredoka = Fredoka({ subsets: ["latin"], weight: ["500", "600", "700"] });
const openSans = Open_Sans({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const BRAND = "Vehicle Rental";

const PINK = "#E08A8A";

function Tire({ className = "", size = 44 }: { className?: string; size?: number }) {
  return (
    <svg
      className={`pointer-events-none absolute ${className}`}
      width={size}
      height={size}
      viewBox="0 0 48 48"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="22" fill="#111" />
      <circle cx="24" cy="24" r="12" fill="none" stroke="#fff" strokeWidth="2" opacity="0.9" />
      <circle cx="24" cy="24" r="4" fill="#fff" />
      <g stroke="#fff" strokeWidth="2" opacity="0.9">
        <line x1="24" y1="12" x2="24" y2="36" />
        <line x1="12" y1="24" x2="36" y2="24" />
      </g>
    </svg>
  );
}

function CarIllustration() {
  return (
    <svg viewBox="0 0 300 200" className="auth-float w-full max-w-[300px]" aria-hidden="true">
      <path
        d="M18 138 Q18 112 52 107 L86 62 Q96 48 118 48 L190 48 Q210 48 223 63 L250 102 Q287 106 287 138 L287 152 L18 152 Z"
        fill="#000"
      />
      <path d="M96 100 L113 63 L152 63 L152 100 Z" fill={PINK} />
      <path d="M162 100 L162 63 L192 63 L216 100 Z" fill={PINK} />
      <circle cx="272" cy="122" r="7" fill="#fff" />
      <circle cx="32" cy="122" r="5" fill={PINK} />
      <line x1="156" y1="66" x2="156" y2="146" stroke={PINK} strokeWidth="2" opacity="0.5" />
      {[80, 224].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="152" r="28" fill="#000" stroke={PINK} strokeWidth="4" />
          <g className="auth-wheel" style={{ transformOrigin: `${cx}px 152px` }}>
            <circle cx={cx} cy="152" r="15" fill="#fff" />
            <circle cx={cx} cy="152" r="5" fill="#000" />
            <line x1={cx} y1="139" x2={cx} y2="165" stroke="#000" strokeWidth="2.5" />
            <line x1={cx - 13} y1="152" x2={cx + 13} y2="152" stroke="#000" strokeWidth="2.5" />
          </g>
        </g>
      ))}
      <line x1="0" y1="184" x2="300" y2="184" stroke="#000" strokeWidth="3" strokeLinecap="round" strokeDasharray="22 16" className="auth-road" />
    </svg>
  );
}

export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${openSans.className} relative flex min-h-screen items-center justify-center overflow-hidden p-4`}
      style={{ background: "linear-gradient(90deg,#8a5a5c 0%,#8a5a5c 50%,#bdbdbd 50%,#d9d9d9 100%)" }}
    >
      <style>{`
        @keyframes auth-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes auth-spin { to { transform: rotate(360deg) } }
        @keyframes auth-road { to { stroke-dashoffset: -76 } }
        @keyframes auth-rise { from{opacity:0;transform:translateY(24px) scale(.98)} to{opacity:1;transform:none} }
        @keyframes auth-fade { from{opacity:0;transform:translateX(16px)} to{opacity:1;transform:none} }
        @keyframes auth-shake { 0%,100%{transform:translateX(0)} 20%,60%{transform:translateX(-8px)} 40%,80%{transform:translateX(8px)} }
        @keyframes auth-drift { 0%,100%{transform:translateY(0) rotate(0)} 50%{transform:translateY(-14px) rotate(12deg)} }
        .auth-float{animation:auth-float 3.2s ease-in-out infinite}
        .auth-wheel{animation:auth-spin 1.4s linear infinite}
        .auth-road{animation:auth-road 1s linear infinite}
        .auth-card{animation:auth-rise .7s cubic-bezier(.2,.8,.2,1) both}
        .auth-form{animation:auth-fade .8s .25s cubic-bezier(.2,.8,.2,1) both}
        .auth-shake{animation:auth-shake .45s ease}
        .auth-drift{animation:auth-drift 5s ease-in-out infinite}
        .auth-spinner{animation:auth-spin .8s linear infinite}
        @media (prefers-reduced-motion: reduce){ *{animation:none !important} }
      `}</style>

      <Tire className="auth-drift left-[22%] top-4 hidden sm:block" size={46} />
      <Tire className="auth-drift right-[6%] top-6" size={52} />
      <Tire className="auth-drift left-[3%] top-[38%] hidden sm:block" size={50} />
      <Tire className="auth-drift bottom-4 left-[10%]" size={56} />
      <Tire className="auth-drift bottom-4 right-[8%]" size={54} />

      <div className="auth-card relative z-10 grid w-full max-w-[920px] overflow-hidden bg-white shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:grid-cols-2">
        <div
          className="relative flex min-h-[260px] flex-col items-center justify-center gap-6 px-6 py-8 md:min-h-[460px]"
          style={{ backgroundColor: PINK }}
        >
          <CarIllustration />
          <h1
            className={`${fredoka.className} text-4xl font-bold text-black md:text-5xl`}
            style={{ letterSpacing: "0.35em" }}
          >
            {BRAND}
          </h1>
        </div>

        <div className="auth-form relative flex items-center justify-center px-8 py-10">
          <Tire className="auth-drift right-3 top-3" size={42} />
          <Tire className="auth-drift bottom-3 left-3" size={42} />
          <div className="w-full max-w-[300px]">{children}</div>
        </div>
      </div>
    </div>
  );
}