"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Search, ChevronRight, X, Compass, Layers } from "lucide-react";
import { visaCountries } from "@/config/visas";
import type { CountryVisaConfig } from "@/config/visas/types";

// ── Helper: Unicode country flag ──────────────────────────────────────────────

function countryFlag(code: string): string {
  if (!code || code.length !== 2) return "🌐";
  const offset = 0x1f1e6 - 65;
  return String.fromCodePoint(
    code.toUpperCase().charCodeAt(0) + offset,
    code.toUpperCase().charCodeAt(1) + offset,
  );
}

// ── Sub-component: Country Destination Card ───────────────────────────────────

function CountryCard({ config }: { config: CountryVisaConfig }) {
  const profileCount = config.profiles.length;
  const defaultProfile = config.profiles.find(
    (p) => p.id === config.defaultProfileId,
  ) ?? config.profiles[0];
  const dimLabel = `${defaultProfile.physical.widthMm} × ${defaultProfile.physical.heightMm} mm`;

  // Collect all unique categories across every profile
  const allCategories = Array.from(
    new Set(config.profiles.flatMap((p) => p.applicableCategories ?? [])),
  );

  return (
    <Link
      href={`/visa/${config.id}`}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-700/60 bg-slate-800/40 p-5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-amber-500/50 hover:bg-slate-800/70 hover:shadow-lg hover:shadow-amber-900/20"
    >
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="text-xl" aria-hidden>
            {countryFlag(config.countryCode)}
          </span>
          <h3 className="truncate text-sm font-semibold leading-snug text-white transition-colors group-hover:text-amber-300">
            {config.country}
          </h3>
        </div>
        <p className="text-xs text-slate-500">{defaultProfile.title}</p>
      </div>

      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="flex flex-wrap gap-1">
          <span className="rounded-full border border-slate-700/60 bg-slate-800/60 px-2 py-0.5 text-[10px] text-slate-400">
            {dimLabel}
          </span>
          <span className="rounded-full border border-amber-700/40 bg-amber-900/20 px-2 py-0.5 text-[10px] font-medium text-amber-400 capitalize">
            {defaultProfile.channel.replace("_", " ")}
          </span>
          {profileCount > 1 && (
            <span className="inline-flex items-center gap-1 rounded-full border border-amber-600/30 bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold text-amber-300">
              <Layers className="h-2.5 w-2.5" />
              {profileCount} profiles
            </span>
          )}
          {allCategories.slice(0, 1).map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-slate-700/50 bg-slate-800/50 px-2 py-0.5 text-[10px] text-slate-500"
            >
              {cat}
            </span>
          ))}
        </div>
        <ChevronRight className="h-4 w-4 shrink-0 text-slate-600 transition-all group-hover:translate-x-0.5 group-hover:text-amber-400" />
      </div>
    </Link>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────

function EmptyState({ query }: { query: string }) {
  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 py-16 text-center text-slate-400">
      <Search className="mx-auto mb-3 h-8 w-8 opacity-40" />
      <p className="text-sm font-medium text-slate-300">No visa destinations found</p>
      {query && (
        <p className="mt-1 text-xs text-slate-500">No results for &ldquo;{query}&rdquo;</p>
      )}
      <p className="mt-2 text-xs text-slate-600">Try a different search term.</p>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function VisaHubPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCountries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return visaCountries;
    return visaCountries.filter((c) => {
      // Match on country-level fields
      if (
        c.country.toLowerCase().includes(q) ||
        c.countryCode.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
      )
        return true;
      // Match on any profile title or applicable subclass
      return c.profiles.some(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.applicableCategories?.some((cat) => cat.toLowerCase().includes(q)),
      );
    });
  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-16 text-white sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl space-y-10">

        {/* ── Hero ── */}
        <header className="space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-amber-300">
            <Compass className="h-3.5 w-3.5" aria-hidden /> Visa Edition
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            <span className="bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-400 bg-clip-text text-transparent">
              Visa Photo
            </span>
            <br />
            <span className="text-white">Standards</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Select your destination country. Instantly resize and compress your visa photo
            to the exact consular or e-Visa specification — 100&nbsp;% in your browser.
          </p>

          {/* Search */}
          <div className="mx-auto mt-6 w-full max-w-2xl">
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-4 h-5 w-5 text-slate-400" />
              <input
                id="visa-search"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by country, visa type, or subclass (e.g. F-1, H-1B)…"
                className="w-full rounded-2xl border border-slate-700 bg-slate-800/70 py-4 pl-12 pr-12 text-base text-white placeholder-slate-500 shadow-xl backdrop-blur-sm outline-none transition focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-4 rounded-full p-0.5 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </header>

        {/* ── Result count strip ── */}
        {searchQuery.trim() && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400">
              <span className="font-semibold text-white">{filteredCountries.length}</span>{" "}
              destination{filteredCountries.length !== 1 ? "s" : ""} found
            </span>
            <button
              onClick={() => setSearchQuery("")}
              className="text-xs text-amber-400 hover:text-amber-300 transition-colors"
            >
              Reset
            </button>
          </div>
        )}

        {/* ── Empty state ── */}
        {filteredCountries.length === 0 && <EmptyState query={searchQuery} />}

        {/* ── Grid ── */}
        {filteredCountries.length > 0 && (
          <section aria-label="Visa Destinations" className="space-y-5">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold tracking-wide text-slate-200">
                🛂 All Visa Destinations
              </h2>
              <span className="inline-flex items-center rounded-full border border-slate-600/60 bg-slate-700/50 px-2.5 py-0.5 text-xs font-semibold text-slate-300">
                {filteredCountries.length}
              </span>
            </div>
            <div className="h-px bg-gradient-to-r from-amber-500/40 via-slate-700/50 to-transparent" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filteredCountries.map((config) => (
                <CountryCard key={config.id} config={config} />
              ))}
            </div>
          </section>
        )}

      </div>
    </main>
  );
}
