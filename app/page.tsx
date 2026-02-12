import PhotoEditor from "@/components/PhotoEditor";
import { ShieldCheck, Zap, Download } from "lucide-react";

const FEATURES = [
  {
    icon: ShieldCheck,
    title: "Private by Design",
    copy: "All processing stays client-side with zero uploads or storage.",
  },
  {
    icon: Zap,
    title: "Lightning Workflow",
    copy: "Presets, cropping, and compression tuned for 2026 exams.",
  },
  {
    icon: Download,
    title: "Instant Delivery",
    copy: "Download exam-ready JPEGs in one secure tap.",
  },
];

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(59,130,246,0.35),_rgba(15,23,42,0)_55%)]" />

      <header className="fixed inset-x-0 top-0 z-20 px-6 py-6">
        <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium uppercase tracking-[0.2em] text-white/80 shadow-xl shadow-blue-900/40 backdrop-blur-md">
          <span>FormFoto</span>
          <span className="text-white/60">Docs • Exams • Identity</span>
        </div>
      </header>

      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pb-24 pt-40">
        <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-12 text-center">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white/70 shadow-lg shadow-blue-900/30">
              <span className="h-2 w-2 rounded-full bg-emerald-400" /> Version 2.0
            </span>
            <h1 className="text-4xl font-semibold leading-tight text-transparent sm:text-5xl md:text-6xl bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400 bg-clip-text">
              Modern identity photos engineered for precision exams
            </h1>
            <p className="text-base text-white/70 sm:text-lg">
              Compress, crop, and deliver pixel-perfect exam photos in a private, on-device workspace built for 2026 SaaS agility.
            </p>
          </div>

          <div className="w-full rounded-[2.75rem] border border-white/10 bg-white/5 p-0.5 shadow-2xl shadow-blue-900/40 backdrop-blur-2xl">
            <div className="rounded-[2.25rem] bg-slate-950/60 p-4 sm:p-8">
              <PhotoEditor />
            </div>
          </div>

          <div className="grid w-full gap-5 md:grid-cols-3">
            {FEATURES.map(({ icon: Icon, title, copy }) => (
              <div
                key={title}
                className="group flex flex-col gap-3 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/5 p-6 text-left shadow-xl shadow-black/30 transition hover:border-white/30"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-cyan-300 shadow-inner shadow-cyan-500/20">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-white">{title}</p>
                  <p className="text-sm text-white/70">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/5 bg-slate-950/40 py-6 text-center text-xs uppercase tracking-[0.3em] text-white/40 backdrop-blur">
        © 2026 FormFoto • Built in India
      </footer>
    </main>
  );
}
