import React from "react";

export interface BiometricOverlayProps {
  isDragging: boolean;
  className?: string;
}

/**
 * BiometricOverlay — dynamic government biometric stencil overlay for photo crop canvas.
 * Fades to 20% opacity during dragging so user can see facial features clearly while cropping.
 */
export function BiometricOverlay({ isDragging, className = "" }: BiometricOverlayProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={`absolute inset-0 w-full h-full pointer-events-none z-20 transition-opacity duration-200 ${
        isDragging ? "opacity-20" : "opacity-100"
      } ${className}`.trim()}
      aria-hidden="true"
    >
      {/* ── 1. Head & Shoulder Silhouette / Oval ──────────────── */}
      {/* Shoulder contour stencil */}
      <path
        d="M 8 98 C 16 84, 30 78, 38 74 L 38 70 M 62 70 L 62 74 C 70 78, 84 84, 92 98"
        fill="none"
        strokeWidth="0.8"
        strokeDasharray="4 4"
        className="stroke-brand-500/70"
      />

      {/* Head oval stencil */}
      <ellipse
        cx="50"
        cy="44"
        rx="21"
        ry="28"
        fill="none"
        strokeWidth="0.8"
        strokeDasharray="4 4"
        className="stroke-brand-500/70"
      />

      {/* ── 2. Eye Line (Upper third horizontal dashed line) ─── */}
      <line
        x1="16"
        y1="38"
        x2="84"
        y2="38"
        strokeWidth="0.8"
        strokeDasharray="4 4"
        className="stroke-brand-500/70"
      />

      {/* Eye Line boundary ticks */}
      <path
        d="M 16 35 L 16 41 M 84 35 L 84 41"
        fill="none"
        strokeWidth="0.8"
        className="stroke-brand-500/70"
      />

      <text
        x="18"
        y="35"
        className="fill-brand-500/70 text-[2.6px] font-mono tracking-wider select-none uppercase font-semibold"
      >
        Eye Line
      </text>

      {/* ── 3. Chin Line (Bracket & line near bottom of oval) ── */}
      {/* Chin bracket */}
      <path
        d="M 40 69 L 40 72 L 60 72 L 60 69"
        fill="none"
        strokeWidth="0.8"
        className="stroke-brand-500/70"
      />

      {/* Chin horizontal line */}
      <line
        x1="32"
        y1="72"
        x2="68"
        y2="72"
        strokeWidth="0.8"
        strokeDasharray="4 4"
        className="stroke-brand-500/70"
      />

      <text
        x="50"
        y="76"
        textAnchor="middle"
        className="fill-brand-500/70 text-[2.6px] font-mono tracking-wider select-none uppercase font-semibold"
      >
        Chin Line
      </text>
    </svg>
  );
}

export default BiometricOverlay;
