import type { Metadata } from "next";
import PhotoEditor from "@/components/PhotoEditor";

export const metadata: Metadata = {
  title: "Passport & Visa Photo Maker | Biometric ID Photo Cropper Online",
  description:
    "Create compliant passport and visa photos online in seconds. Supports US 2×2 in, Schengen 35×45 mm, Indian passport, and more. Crop, compress, and download — no uploads, fully client-side.",
  openGraph: {
    title: "Visa & Passport Photo Maker",
    description:
      "Generate biometric passport and visa photos to official specifications. Works entirely in your browser — nothing is uploaded.",
    type: "website",
  },
};

export default function PassportPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-16 text-white sm:px-6 sm:py-24">
      <div className="mx-auto max-w-5xl space-y-14">
        {/* ── Header ── */}
        <header className="space-y-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300">
            <span aria-hidden>✈️</span> Global Travel Edition
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
              Passport &amp; Visa
            </span>
            <br />
            <span className="text-white">Photo Creator</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Generate biometric-compliant passport and visa photos. Standardised
            cropping for all major international formats — processed locally,
            never uploaded.
          </p>

          {/* Country / format badges */}
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            {["US Visa (2×2 in)", "Schengen (35×45 mm)", "Indian Passport", "UK Passport", "OCI Card"].map(
              (format) => (
                <span
                  key={format}
                  className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs font-medium text-slate-300"
                >
                  {format}
                </span>
              )
            )}
          </div>
        </header>

        {/* ── Editor ── */}
        <section>
          <PhotoEditor mode="passport" />
        </section>

        {/* ── Requirements guide ── */}
        <section className="grid gap-6 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Select a format",
              body: "Choose the country or document type. Pixel dimensions and KB limits are pre-filled.",
              color: "emerald",
            },
            {
              step: "2",
              title: "Upload & align",
              body: "Drag in your photo. The square crop guide locks to the correct aspect ratio.",
              color: "teal",
            },
            {
              step: "3",
              title: "Download instantly",
              body: "We compress to the exact KB specification and prepare a ready-to-print JPEG.",
              color: "cyan",
            },
          ].map(({ step, title, body, color }) => (
            <div
              key={step}
              className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-6 backdrop-blur-sm"
            >
              <div
                className={`mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-${color}-500/20 text-sm font-bold text-${color}-300`}
              >
                {step}
              </div>
              <h3 className="mb-1 font-semibold text-white">{title}</h3>
              <p className="text-sm text-slate-400">{body}</p>
            </div>
          ))}
        </section>
      </div>
    </main>
  );
}
