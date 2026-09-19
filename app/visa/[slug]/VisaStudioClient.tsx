"use client";

import { useState, useMemo } from "react";
import { Search, X, Shield, ChevronDown } from "lucide-react";
import BiometricStudio from "@/components/BiometricStudio";
import type { CountryVisaConfig, VisaPassportConfig } from "@/config/visas/types";

// ── Helper: Unicode country flag ──────────────────────────────────────────────

function countryFlag(code: string): string {
  if (!code || code.length !== 2) return "🌐";
  const offset = 0x1f1e6 - 65;
  return String.fromCodePoint(
    code.toUpperCase().charCodeAt(0) + offset,
    code.toUpperCase().charCodeAt(1) + offset,
  );
}

// ── Multi-Profile Segmented Pill Bar ──────────────────────────────────────────

function ProfileTabs({
  profiles,
  activeId,
  onSelect,
}: {
  profiles: VisaPassportConfig[];
  activeId: string;
  onSelect: (id: string) => void;
}) {
  if (profiles.length <= 1) return null;

  return (
    <div className="flex items-center gap-1 rounded-full border border-slate-700/60 bg-slate-900/80 p-1 backdrop-blur-sm">
      {profiles.map((p) => {
        const isActive = p.id === activeId;
        return (
          <button
            key={p.id}
            onClick={() => onSelect(p.id)}
            className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-200 ${
              isActive
                ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent"
            }`}
          >
            {p.title}
          </button>
        );
      })}
    </div>
  );
}

// ── Subclass Selector with Search ─────────────────────────────────────────────

function SubclassSelector({
  categories,
  selected,
  onSelect,
}: {
  categories: string[];
  selected: string | null;
  onSelect: (cat: string | null) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) return categories;
    return categories.filter((c) => c.toLowerCase().includes(q));
  }, [categories, search]);

  if (categories.length === 0) return null;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-2 rounded-xl border border-slate-700/60 bg-slate-900/60 px-4 py-3 text-left backdrop-blur-sm transition hover:border-amber-500/40 hover:bg-slate-800/60"
      >
        <div className="min-w-0 flex-1">
          <span className="block text-[10px] font-semibold uppercase tracking-widest text-slate-500">
            Visa Subclass
          </span>
          <span className="block truncate text-sm font-medium text-white">
            {selected ?? "All categories"}
          </span>
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-30 mt-2 w-full overflow-hidden rounded-xl border border-slate-700/60 bg-slate-900 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {/* Search */}
          <div className="border-b border-slate-800 p-2">
            <div className="relative flex items-center">
              <Search className="pointer-events-none absolute left-3 h-3.5 w-3.5 text-slate-500" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search subclass…"
                className="w-full rounded-lg bg-slate-800/70 py-2 pl-9 pr-8 text-xs text-white placeholder-slate-500 outline-none transition focus:ring-1 focus:ring-amber-500/40"
                autoFocus
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-2.5 text-slate-500 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
          </div>

          {/* Options */}
          <div className="max-h-52 overflow-y-auto py-1">
            {/* "All" option */}
            <button
              onClick={() => {
                onSelect(null);
                setIsOpen(false);
                setSearch("");
              }}
              className={`flex w-full items-center gap-2 px-4 py-2 text-left text-xs transition hover:bg-slate-800/60 ${
                selected === null
                  ? "font-semibold text-amber-300"
                  : "text-slate-400"
              }`}
            >
              All categories
            </button>

            {filtered.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onSelect(cat);
                  setIsOpen(false);
                  setSearch("");
                }}
                className={`flex w-full items-center gap-2 px-4 py-2 text-left text-xs transition hover:bg-slate-800/60 ${
                  selected === cat
                    ? "font-semibold text-amber-300"
                    : "text-slate-400"
                }`}
              >
                {cat}
              </button>
            ))}

            {filtered.length === 0 && (
              <p className="px-4 py-3 text-center text-xs text-slate-600">
                No matching subclass
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── Main Client Component ─────────────────────────────────────────────────────

export default function VisaStudioClient({
  country,
}: {
  country: CountryVisaConfig;
}) {
  // ── Profile state ───────────────────────────────────────────────────────────
  const [activeProfileId, setActiveProfileId] = useState(
    country.defaultProfileId,
  );
  const activeProfile =
    country.profiles.find((p) => p.id === activeProfileId) ??
    country.profiles[0];

  // ── Subclass state ──────────────────────────────────────────────────────────
  const [selectedSubclass, setSelectedSubclass] = useState<string | null>(null);

  // When profile changes, reset subclass
  const handleProfileChange = (id: string) => {
    setActiveProfileId(id);
    setSelectedSubclass(null);
  };

  const categories = activeProfile.applicableCategories ?? [];

  return (
    <main className="min-h-screen bg-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* ── Header ────────────────────────────────────────── */}
        <div className="border-b border-slate-800 pb-6 space-y-4">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-400">
            <span>{countryFlag(country.countryCode)}</span>
            <span>{country.country}</span>
            <span>•</span>
            <span>Visa Photo</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-100">
            {activeProfile.title}
          </h1>
          <p className="text-sm text-slate-400">
            Official Size: {activeProfile.physical.widthMm} ×{" "}
            {activeProfile.physical.heightMm} mm (
            {activeProfile.physical.targetDpi} DPI) | Verified via{" "}
            {activeProfile.sourceVerification.authority}
          </p>

          {/* ── Multi-profile tabs ─────────────────────────── */}
          <ProfileTabs
            profiles={country.profiles}
            activeId={activeProfileId}
            onSelect={handleProfileChange}
          />

          {/* ── Subclass selector + HUD badge ──────────────── */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="w-full sm:max-w-xs">
              <SubclassSelector
                categories={categories}
                selected={selectedSubclass}
                onSelect={setSelectedSubclass}
              />
            </div>

            {selectedSubclass && (
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-xs font-semibold text-amber-300 backdrop-blur-sm">
                <Shield className="h-3.5 w-3.5" />
                Calibrated for: {selectedSubclass}
              </div>
            )}
          </div>
        </div>

        {/* ── BiometricStudio ──────────────────────────────── */}
        <div className="bg-slate-900/70 border border-slate-800 backdrop-blur-md rounded-2xl p-6 shadow-xl">
          <BiometricStudio
            key={activeProfile.id}
            mode="visa"
            config={activeProfile}
          />
        </div>
      </div>
    </main>
  );
}
