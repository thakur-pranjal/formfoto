import type { Metadata } from "next";
import PhotoEditor from "@/components/PhotoEditor";

export const metadata: Metadata = {
  title: "Government Exam Photo & Signature Resizer | UPSC, SSC, IBPS, JEE, NEET",
  description:
    "Free online tool to resize and compress photos and signatures for Indian government exams — UPSC, SSC CGL, IBPS, JEE, NEET, and more. Set exact KB size and pixel dimensions instantly, 100% client-side.",
  openGraph: {
    title: "Government Exam Photo Resizer",
    description:
      "Compress and resize exam photos and signatures to official specifications. Works entirely in your browser — nothing is uploaded.",
    type: "website",
  },
};

export default function ExamPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-16 text-white sm:px-6 sm:py-24">
      <div className="mx-auto max-w-5xl space-y-14">
        {/* ── Header ── */}
        <header className="space-y-5 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-300">
            <span aria-hidden>🎓</span> Exam Edition
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
              Exam Photo &amp; Signature
            </span>
            <br />
            <span className="text-white">Resizer</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Upload your photo or signature. Crop to the official frame, set the
            exact kilobyte target, and download — entirely in your browser with
            zero server uploads.
          </p>

          {/* Exam badges */}
          <div className="flex flex-wrap justify-center gap-2 pt-1">
            {["UPSC", "SSC CGL", "IBPS PO", "JEE", "NEET", "RRB NTPC"].map((exam) => (
              <span
                key={exam}
                className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs font-medium text-slate-300"
              >
                {exam}
              </span>
            ))}
          </div>
        </header>

        {/* ── Editor ── */}
        <section className="relative z-10">
          <PhotoEditor mode="exam" />
        </section>

        {/* ── How it works ── */}
        <section className="grid gap-6 sm:grid-cols-3">
          {[
            {
              step: "1",
              title: "Choose a preset",
              body: "Pick your exam from the dropdown — dimensions and KB limits are pre-loaded.",
              color: "blue",
            },
            {
              step: "2",
              title: "Upload & crop",
              body: "Drag your photo or signature. The aspect ratio locks automatically.",
              color: "cyan",
            },
            {
              step: "3",
              title: "Process & download",
              body: "Hit Process. We binary-search the ideal JPEG quality to hit your KB target.",
              color: "indigo",
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
