"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronRight } from "lucide-react";
import { FORMATS } from "@/config/formats";

const POPULAR_SLUGS = ["upsc", "neet", "ssc"];

const ALL_EXAMS = Object.entries(FORMATS)
  .filter(([, f]) => f.category === "exam")
  .map(([slug, f]) => ({ ...f, slug }))
  .sort((a, b) => a.title.localeCompare(b.title));

export default function ExamPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredExams = useMemo(() => {
    if (!searchQuery.trim()) return ALL_EXAMS;
    const q = searchQuery.toLowerCase();
    return ALL_EXAMS.filter(
      (f) =>
        f.title.toLowerCase().includes(q) ||
        f.slug.toLowerCase().includes(q),
    );
  }, [searchQuery]);

  const popularExams = ALL_EXAMS.filter((f) => POPULAR_SLUGS.includes(f.slug));

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-16 text-white sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl space-y-16">

        {/* ── Hero ── */}
        <header className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-300">
            <span aria-hidden>🎓</span> Exam Edition
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              Government Exam
            </span>
            <br />
            <span className="text-white">Photo Tools</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Pick your exam below. Instantly resize, crop, and compress your photo or
            signature to exact official specifications — 100% in your browser.
          </p>

          {/* Search bar */}
          <div className="mx-auto mt-8 max-w-xl">
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-4 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search exams — UPSC, NEET, SSC…"
                className="w-full rounded-2xl border border-slate-700 bg-slate-800/70 py-4 pl-12 pr-5 text-base text-white placeholder-slate-500 shadow-xl backdrop-blur-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>
          </div>
        </header>

        {/* ── Popular Section ── */}
        {!searchQuery.trim() && popularExams.length > 0 && (
          <section className="space-y-5">
            <h2 className="text-lg font-bold tracking-wide text-slate-200">
              🔥 Most Popular
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {popularExams.map((exam) => (
                <Link
                  key={exam.slug}
                  href={`/exam/${exam.slug}`}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-900/40 to-indigo-900/30 p-5 shadow-lg backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:border-blue-400/60 hover:shadow-xl hover:shadow-blue-500/20"
                >
                  <div className="space-y-1.5">
                    <span className="inline-block rounded-full bg-blue-500/20 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-blue-300">
                      Popular
                    </span>
                    <h3 className="text-base font-bold leading-snug text-white transition-colors group-hover:text-blue-300">
                      {exam.title}
                    </h3>
                    <p className="text-xs text-slate-400">
                      {exam.documents.map((d) => d.name).join(" • ")}
                    </p>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-400">
                    Open Tool
                    <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── All Exams Grid ── */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold tracking-wide text-slate-200">
              All Exams (A–Z)
            </h2>
            <span className="text-sm text-slate-500">
              {filteredExams.length} result{filteredExams.length !== 1 ? "s" : ""}
            </span>
          </div>

          {filteredExams.length === 0 ? (
            <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 py-16 text-center text-slate-400">
              <Search className="mx-auto mb-3 h-8 w-8 opacity-40" />
              <p className="text-sm">
                No exams found for &ldquo;{searchQuery}&rdquo;
              </p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {filteredExams.map((exam) => (
                <Link
                  key={exam.slug}
                  href={`/exam/${exam.slug}`}
                  className="group flex items-center justify-between gap-4 rounded-2xl border border-slate-700/60 bg-slate-800/40 p-5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-600 hover:bg-slate-800/70 hover:shadow-lg hover:shadow-black/20"
                >
                  <div className="min-w-0 space-y-1">
                    <h3 className="truncate text-sm font-semibold text-white transition-colors group-hover:text-blue-300">
                      {exam.title}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {exam.documents.map((d) => d.name).join(" • ")}
                    </p>
                  </div>
                  <ChevronRight className="h-4 w-4 shrink-0 text-slate-600 transition-all group-hover:translate-x-0.5 group-hover:text-blue-400" />
                </Link>
              ))}
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
