import type { Metadata } from "next";
import { SlidersHorizontal, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Pro Workspace: Manual Pixel Control | FormFoto",
  description:
    "Advanced manual controls for pixel-perfect photo resizing and JPEG compression. Set exact width, height, and file size without any preset constraints.",
};

export default function ManualPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-16 text-white sm:px-6 sm:py-24">
      <div className="mx-auto max-w-5xl space-y-14">
        {/* ── Header ── */}
        <header className="space-y-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-purple-300">
            <span aria-hidden>⚡</span> Pro Workspace
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-purple-400 to-pink-300 bg-clip-text text-transparent">
              Manual Pixel
            </span>
            <br />
            <span className="text-white">Control</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            For power users who need arbitrary width, height, and exact
            compression values — no presets, no constraints.
          </p>
        </header>

        {/* ── Placeholder editor shell ── */}
        <section className="flex min-h-[420px] w-full flex-col items-center justify-center gap-8 rounded-3xl border border-slate-700/70 bg-slate-800/30 p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-xl">
          {/* Icon */}
          <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-slate-700 bg-slate-900 shadow-inner">
            <SlidersHorizontal className="h-10 w-10 text-slate-500" />
          </div>

          {/* Copy */}
          <div className="max-w-md space-y-3">
            <h2 className="text-2xl font-bold text-white">
              Manual Mode — Coming Soon
            </h2>
            <p className="text-sm leading-relaxed text-slate-400">
              The arbitrary resizer engine is currently in development. It will
              let you dial in exact pixel dimensions and file size for any
              requirement — no preset needed.
            </p>
          </div>

          {/* Feature preview list */}
          <ul className="grid gap-3 text-left sm:grid-cols-2">
            {[
              "Custom width & height (px)",
              "Exact KB target (any range)",
              "Aspect ratio free or locked",
              "Batch resize (multiple files)",
              "Output format: JPG / PNG / WebP",
              "EXIF strip toggle",
            ].map((feat) => (
              <li
                key={feat}
                className="flex items-center gap-2 text-xs text-slate-400"
              >
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-purple-500/60" />
                {feat}
              </li>
            ))}
          </ul>

          {/* Locked CTA */}
          <button
            disabled
            className="flex cursor-not-allowed items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/60 px-6 py-3 text-sm font-semibold text-slate-500 opacity-70"
          >
            <Lock className="h-4 w-4" />
            Feature Locked — Check Back Soon
          </button>
        </section>
      </div>
    </main>
  );
}
