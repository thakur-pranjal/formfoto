import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, Plane, SlidersHorizontal, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "FormFoto — Photo Resizer for Exams, Passports & Visas",
  description:
    "Free, instant, client-side photo resizer for government exams (UPSC, SSC, NEET), passport photos, and visa applications. No uploads. No server. Just results.",
  openGraph: {
    title: "FormFoto — Photo Resizer Suite",
    description:
      "Resize and compress photos for UPSC, SSC, NEET, passport, or visa — entirely in your browser.",
    type: "website",
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(59,130,246,0.15),_rgba(15,23,42,0)_60%)]" />

      <div className="relative mx-auto flex max-w-6xl min-h-screen flex-col items-center justify-center px-6 py-20">

        {/* Hero Section */}
        <div className="mb-16 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/60 backdrop-blur-md">
            <span>FormFoto • Suite v2.0</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            What do you need <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              to resize today?
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/50">
            Secure client-side processing for every official requirement. No uploads, no storage, just results.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid w-full gap-6 md:grid-cols-3">

          {/* Exam Card */}
          <Link
            href="/exam"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 transition-all hover:border-blue-500/50 hover:bg-blue-900/10 hover:shadow-2xl hover:shadow-blue-900/20"
          >
            <div className="mb-8 space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-300 shadow-inner transition-transform duration-300 group-hover:scale-110">
                <GraduationCap className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold text-white transition-colors group-hover:text-blue-300">
                Exams &amp; Govt
              </h2>
              <p className="text-sm leading-relaxed text-white/60">
                Tailored for UPSC, SSC, NEET, and IBPS. Includes signature compressor and date stamping tools.
              </p>
            </div>
            <div className="flex items-center text-sm font-semibold text-blue-400 transition-all group-hover:gap-2">
              Launch Tool <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </Link>

          {/* Passport Card */}
          <Link
            href="/passport"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 transition-all hover:border-emerald-500/50 hover:bg-emerald-900/10 hover:shadow-2xl hover:shadow-emerald-900/20"
          >
            <div className="mb-8 space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-300 shadow-inner transition-transform duration-300 group-hover:scale-110">
                <Plane className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold text-white transition-colors group-hover:text-emerald-300">
                Visa &amp; Passport
              </h2>
              <p className="text-sm leading-relaxed text-white/60">
                US Visa (2×2), Schengen, and Global Passport standards. Background removal included.
              </p>
            </div>
            <div className="flex items-center text-sm font-semibold text-emerald-400 transition-all group-hover:gap-2">
              Launch Tool <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </Link>

          {/* Manual Card */}
          <Link
            href="/manual"
            className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 transition-all hover:border-purple-500/50 hover:bg-purple-900/10 hover:shadow-2xl hover:shadow-purple-900/20"
          >
            <div className="mb-8 space-y-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-500/20 text-purple-300 shadow-inner transition-transform duration-300 group-hover:scale-110">
                <SlidersHorizontal className="h-7 w-7" />
              </div>
              <h2 className="text-2xl font-bold text-white transition-colors group-hover:text-purple-300">
                Pro Manual
              </h2>
              <p className="text-sm leading-relaxed text-white/60">
                Complete control over pixels, aspect ratio, and KB compression. For custom requirements.
              </p>
            </div>
            <div className="flex items-center text-sm font-semibold text-purple-400 transition-all group-hover:gap-2">
              Open Workspace <ArrowRight className="ml-2 h-4 w-4" />
            </div>
          </Link>

        </div>

        <footer className="absolute bottom-6 text-center text-xs uppercase tracking-widest text-white/20">
          FormFoto SaaS • Privacy First
        </footer>
      </div>
    </main>
  );
}
