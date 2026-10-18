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
    <main className="min-h-screen bg-ff-background text-ff-foreground pb-ff-12 px-4 pt-10 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-14">

        {/* ── Header ── */}
        <header className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-600">
            <span aria-hidden>⚡</span> Pro Workspace
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight text-ff-foreground sm:text-5xl lg:text-6xl">
            Pro Workspace:{" "}
            <span className="text-brand-500">Manual Pixel Control</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base text-ff-foreground-muted sm:text-lg">
            The{" "}
            <span className="font-semibold text-ff-foreground">
              most powerful free photo tool
            </span>{" "}
            on the web. Set exact pixel dimensions, target any file size down to
            the kilobyte, and apply aggressive JPEG compression — all in real
            time with{" "}
            <span className="font-semibold text-brand-600">zero lag</span>,{" "}
            <span className="font-semibold text-brand-500">zero uploads</span>,
            and{" "}
            <span className="font-semibold text-brand-600">
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
                className="inline-flex items-center gap-1.5 rounded-full border border-ff-border bg-ff-surface px-3 py-1 text-xs font-medium text-ff-foreground-muted"
              >
                <span aria-hidden>{icon}</span>
                {label}
              </span>
            ))}
          </div>
        </header>

        {/* ── Editor ── */}
        <ManualEditor />

        {/* ── Why Pro Workspace section ── */}
        <section className="space-y-6">
          <h2 className="text-center text-2xl font-bold tracking-tight text-ff-foreground sm:text-3xl">
            Why{" "}
            <span className="text-brand-500">Pro Workspace</span>{" "}
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
                className="bg-ff-surface border border-ff-border rounded-ff-lg shadow-ff-sm p-5 transition hover:shadow-ff-md hover:border-ff-border-strong"
              >
                <div className="mb-3 text-2xl" aria-hidden>
                  {icon}
                </div>
                <h3 className="mb-1.5 text-sm font-semibold text-ff-foreground">
                  {title}
                </h3>
                <p className="text-xs leading-relaxed text-ff-foreground-muted">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Footer note ── */}
        <p className="text-center text-xs text-ff-foreground-muted">
          FormFoto Pro Workspace · All processing is local · No data is
          collected or transmitted
        </p>
      </div>
    </main>
  );
}
