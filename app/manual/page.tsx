import type { Metadata } from "next";
import ManualEditor from "@/components/ManualEditor";

export const metadata: Metadata = {
  title: "Pro Workspace: Manual Pixel Control | FormFoto",
  description:
    "Advanced manual controls for pixel-perfect photo resizing and JPEG compression. Set exact width, height, and file size without any preset constraints.",
  openGraph: {
    title: "Pro Workspace: Manual Pixel Control | FormFoto",
    description:
      "Free pro-level tool for custom aspect ratios, exact pixel targeting, and aggressive KB compression. Works entirely in your browser — nothing is uploaded.",
    type: "website",
  },
};

export default function ManualPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-16 text-white sm:px-6 sm:py-24">
      <div className="mx-auto max-w-5xl space-y-14">

        {/* ── Header ── */}
        <header className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-300">
            <span aria-hidden>⚡</span> Pro Workspace
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Pro Workspace:
            </span>
            <br />
            <span className="text-white">Manual Pixel Control</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base text-slate-400 sm:text-lg">
            The{" "}
            <span className="font-semibold text-white">
              most powerful free photo tool
            </span>{" "}
            on the web. Set exact pixel dimensions, target any file size down to
            the kilobyte, and apply aggressive JPEG compression — all in real
            time with{" "}
            <span className="font-semibold text-cyan-300">zero lag</span>,{" "}
            <span className="font-semibold text-purple-300">
              zero uploads
            </span>
            , and{" "}
            <span className="font-semibold text-pink-300">
              zero restrictions
            </span>
            .
          </p>

          {/* Feature chips */}
          <div className="flex flex-wrap justify-center gap-3 pt-2">
            {[
              { icon: "🎯", label: "Exact KB Targeting" },
              { icon: "📐", label: "Custom Aspect Ratios" },
              { icon: "🖼️", label: "Pixel-Perfect Cropping" },
              { icon: "🔒", label: "100% Client-Side" },
              { icon: "⚡", label: "Zero Lag Processing" },
              { icon: "💎", label: "Completely Free" },
            ].map(({ icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-700/60 bg-slate-800/60 px-3 py-1 text-xs font-medium text-slate-300 backdrop-blur-sm"
              >
                <span aria-hidden>{icon}</span>
                {label}
              </span>
            ))}
          </div>
        </header>

        {/* ── Glassmorphism Editor Container ── */}
        <div className="relative overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/50 shadow-2xl backdrop-blur-sm">
          {/* Subtle top gradient accent */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
          />
          {/* Ambient glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_50%_0%,_rgba(59,130,246,0.15),_rgba(15,23,42,0)_60%)]"
          />

          <div className="relative p-4 sm:p-6 lg:p-8">
            <ManualEditor />
          </div>

          {/* Subtle bottom gradient accent */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
          />
        </div>

        {/* ── Why Pro Workspace section ── */}
        <section className="space-y-6">
          <h2 className="text-center text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Why{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Pro Workspace
            </span>{" "}
            destroys the competition
          </h2>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "🎯",
                title: "Surgical KB Compression",
                description:
                  "Binary-search compression engine hits your exact file-size target every time. No guessing, no bloat.",
              },
              {
                icon: "📐",
                title: "Unconstrained Dimensions",
                description:
                  "No preset lock-in. Enter any width, height, or aspect ratio for every edge case your workflow demands.",
              },
              {
                icon: "⚡",
                title: "Real-Time Preview",
                description:
                  "Debounced live estimation so you always know the output size before you even click download.",
              },
              {
                icon: "🔒",
                title: "Privacy First",
                description:
                  "All processing happens in your browser via the Canvas API. Your photos never leave your device.",
              },
              {
                icon: "🖥️",
                title: "No Sign-Up Required",
                description:
                  "Open the page, drop your image, edit, download. That's it. No accounts, no paywalls, no nonsense.",
              },
              {
                icon: "💎",
                title: "Forever Free",
                description:
                  "Pro-grade tooling available to everyone — students, developers, designers, and power users alike.",
              },
            ].map(({ icon, title, description }) => (
              <div
                key={title}
                className="rounded-xl border border-slate-700/50 bg-slate-800/40 p-5 backdrop-blur-sm transition hover:border-slate-600/60 hover:bg-slate-800/60"
              >
                <div className="mb-3 text-2xl" aria-hidden>
                  {icon}
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-white">
                  {title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-400">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer note ── */}
        <p className="text-center text-xs text-slate-600">
          FormFoto Pro Workspace · All processing is local · No data is
          collected or transmitted
        </p>
      </div>
    </main>
  );
}
