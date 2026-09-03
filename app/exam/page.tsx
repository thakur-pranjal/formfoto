"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { Search, ChevronRight, SlidersHorizontal, X, Check } from "lucide-react";
import { examStandards as FORMATS } from "@/config/exams";

// ── Filter Definitions ─────────────────────────────────────────────────────────

const FILTER_GROUPS = {
  Location: [
    "National",
    "Andhra Pradesh",
    "Bihar",
    "Delhi",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Odisha",
    "Rajasthan",
    "Tamil Nadu",
    "Telangana",
    "Uttar Pradesh",
    "West Bengal",
  ],
  Domain: [
    "Engineering",
    "Medical",
    "Civil Services",
    "Banking",
    "Railway",
    "Defence",
    "Police",
    "Teaching",
    "Law",
    "Management",
    "Design & Fashion",
    "Hospitality",
    "Government Jobs",
    "Research",
  ],
  Level: ["Undergraduate", "Postgraduate", "Other"],
} as const;

type FilterGroup = keyof typeof FILTER_GROUPS;

// ── Data Enrichment ────────────────────────────────────────────────────────────

/** IDs that will eventually carry isPopular: true in the config schema */
const POPULAR_IDS = new Set([
  "upsc_cse", "neet_ug", "jee_main", "ssc_cgl", "ibps_po",
  "jee_advanced", "neet_pg", "cat", "cuet_ug", "rrb_ntpc",
]);

/** State-level exam IDs → display location */
const STATE_MAP: Record<string, string> = {
  ap_eapcet: "Andhra Pradesh",
  ts_eamcet: "Telangana",
  mht_cet: "Maharashtra",
  mpsc: "Maharashtra",
  mppsc: "Madhya Pradesh",
  bpsc: "Bihar",
  bihar_stet: "Bihar",
  bihar_police_constable: "Bihar",
  kcet: "Karnataka",
  kpsc_kar: "Karnataka",
  kpsc_kerala: "Kerala",
  keam: "Kerala",
  ktet: "Kerala",
  gujcet: "Gujarat",
  tnpsc: "Tamil Nadu",
  uppsc: "Uttar Pradesh",
  uptet: "Uttar Pradesh",
  up_police_constable: "Uttar Pradesh",
  wbjee: "West Bengal",
  ojee: "Odisha",
  rpsc: "Rajasthan",
  reet: "Rajasthan",
  rajasthan_police: "Rajasthan",
  hpsc: "Himachal Pradesh",
  hp_police_constable: "Himachal Pradesh",
  htet: "Haryana",
  haryana_police_constable: "Haryana",
  maharashtra_police_bharti: "Maharashtra",
  mp_police_constable: "Madhya Pradesh",
  delhi_police_constable: "Delhi",
};

/** subCategory → broad Domain bucket */
function deriveDomain(sub: string): string {
  const s = sub.toLowerCase();
  if (s.includes("engineering") || s.includes("agriculture") || s.includes("pharmacy"))
    return "Engineering";
  if (s.includes("medical") || s.includes("postgraduate entrance") || s.includes("undergraduate entrance"))
    return "Medical";
  if (s.includes("civil service")) return "Civil Services";
  if (s.includes("banking")) return "Banking";
  if (s.includes("railway")) return "Railway";
  if (s.includes("defence / police") || s.includes("defence")) return "Defence";
  if (s.includes("police")) return "Police";
  if (s.includes("teaching") || s.includes("eligibility")) return "Teaching";
  if (s.includes("law")) return "Law";
  if (s.includes("management")) return "Management";
  if (s.includes("design") || s.includes("fashion")) return "Design & Fashion";
  if (s.includes("hospitality")) return "Hospitality";
  if (
    s.includes("government job") ||
    s.includes("state psc") ||
    s.includes("state public service")
  ) return "Government Jobs";
  if (s.includes("research") || s.includes("fellowship")) return "Research";
  return "Government Jobs";
}

/** subCategory + id → Level */
function deriveLevel(sub: string, id: string): string {
  const s = sub.toLowerCase();
  if (s.includes("postgraduate") || id === "neet_pg" || id === "ini_cet")
    return "Postgraduate";
  if (
    s.includes("undergraduate") ||
    s.includes("entrance exam") ||
    s.includes("engineering") ||
    s.includes("medical") ||
    s.includes("law entrance") ||
    id === "neet_ug" ||
    id === "jee_main" ||
    id === "jee_advanced"
  )
    return "Undergraduate";
  return "Other";
}

// ── Base Data ──────────────────────────────────────────────────────────────────

type BaseExam = ReturnType<typeof FORMATS.filter>[number];

type Exam = BaseExam & {
  /** Forward-compatible with future schema field */
  tags: string[];
  /** Forward-compatible with future schema field */
  isPopular: boolean;
  location: string;
  domain: string;
  level: string;
};

const ALL_EXAMS: Exam[] = (FORMATS.filter((f) => f.category === "exam") as BaseExam[])
  .sort((a, b) => a.title.localeCompare(b.title))
  .map((f) => {
    const sub = ((f as any).subCategory ?? "General / Other").trim() as string;
    const location = STATE_MAP[f.id] ?? "National";
    const domain = deriveDomain(sub);
    const level = deriveLevel(sub, f.id);
    return {
      ...f,
      tags: [domain, location, level],
      isPopular: POPULAR_IDS.has(f.id),
      location,
      domain,
      level,
    };
  });

// ── Sub-component: Filter Chip ────────────────────────────────────────────────

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-blue-500/40 bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
      {label}
      <button
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="ml-0.5 rounded-full p-0.5 hover:bg-blue-500/20 transition-colors"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

// ── Sub-component: Filter Modal ───────────────────────────────────────────────

function FilterModal({
  activeFilters,
  onToggle,
  onClear,
  onClose,
}: {
  activeFilters: Record<FilterGroup, string[]>;
  onToggle: (group: FilterGroup, value: string) => void;
  onClear: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  useEffect(() => {
    function handler(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  const totalActive = Object.values(activeFilters).flat().length;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm">
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Filter exams"
        className="w-full max-w-sm sm:max-w-md mx-auto bg-slate-900 border border-slate-700/80 rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85dvh]"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-slate-700/60 shrink-0">
          <div>
            <h2 className="text-base font-bold text-white">Filters</h2>
            {totalActive > 0 && (
              <p className="text-xs text-slate-400 mt-0.5">{totalActive} active</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {totalActive > 0 && (
              <button
                onClick={onClear}
                className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors px-2 py-1 rounded-lg hover:bg-blue-500/10"
              >
                Clear all
              </button>
            )}
            <button
              onClick={onClose}
              aria-label="Close filters"
              className="rounded-full p-1.5 text-slate-400 hover:text-white hover:bg-slate-700/60 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Scrollable body */}
        <div className="overflow-y-auto overscroll-contain flex-1 px-5 py-4 space-y-6">
          {(Object.keys(FILTER_GROUPS) as FilterGroup[]).map((group) => (
            <div key={group}>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                {group}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(FILTER_GROUPS[group] as readonly string[]).map((option) => {
                  const isActive = activeFilters[group].includes(option);
                  return (
                    <button
                      key={option}
                      onClick={() => onToggle(group, option)}
                      aria-pressed={isActive}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition-all duration-150 ${isActive
                        ? "border-blue-500 bg-blue-500/20 text-blue-300 shadow-[0_0_0_1px_rgba(59,130,246,0.4)]"
                        : "border-slate-700 bg-slate-800/60 text-slate-400 hover:border-slate-500 hover:text-slate-200"
                        }`}
                    >
                      {isActive && <Check className="h-3 w-3 shrink-0" />}
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-4 border-t border-slate-700/60 shrink-0">
          <button
            onClick={onClose}
            className="w-full rounded-2xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 py-3 text-sm font-bold text-white transition-colors shadow-lg shadow-blue-900/40"
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Sub-component: Exam Card ──────────────────────────────────────────────────

function ExamCard({ exam, popular }: { exam: Exam; popular?: boolean }) {
  return (
    <Link
      href={`/exam/${exam.id}`}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border p-5 backdrop-blur-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${popular
        ? "border-blue-500/30 bg-gradient-to-br from-blue-900/40 to-indigo-900/30 hover:border-blue-400/60 hover:shadow-blue-500/20"
        : "border-slate-700/60 bg-slate-800/40 hover:border-slate-600 hover:bg-slate-800/70 hover:shadow-black/20"
        }`}
    >
      <div className="space-y-1.5">
        {popular && (
          <span className="inline-block rounded-full bg-blue-500/20 px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide text-blue-300">
            Popular
          </span>
        )}
        <h3 className="truncate text-sm font-semibold leading-snug text-white transition-colors group-hover:text-blue-300">
          {exam.title}
        </h3>
        <p className="truncate text-xs text-slate-500">
          {exam.documents.map((d) => d.name).join(" \u2022 ")}
        </p>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-wrap gap-1">
          <span className="rounded-full border border-slate-700/60 bg-slate-800/60 px-2 py-0.5 text-[10px] text-slate-500">
            {exam.domain}
          </span>
          {exam.location !== "National" && (
            <span className="rounded-full border border-slate-700/60 bg-slate-800/60 px-2 py-0.5 text-[10px] text-slate-500">
              {exam.location}
            </span>
          )}
        </div>
        <ChevronRight
          className={`h-4 w-4 shrink-0 transition-all group-hover:translate-x-0.5 ${popular ? "text-blue-400" : "text-slate-600 group-hover:text-blue-400"
            }`}
        />
      </div>
    </Link>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────

function EmptyState({ query }: { query: string }) {
  return (
    <div className="rounded-2xl border border-slate-700/50 bg-slate-800/30 py-16 text-center text-slate-400">
      <Search className="mx-auto mb-3 h-8 w-8 opacity-40" />
      <p className="text-sm font-medium text-slate-300">No exams found</p>
      {query && (
        <p className="mt-1 text-xs text-slate-500">
          No results for &ldquo;{query}&rdquo;
        </p>
      )}
      <p className="mt-2 text-xs text-slate-600">Try adjusting your filters or search term.</p>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

const INITIAL_FILTERS: Record<FilterGroup, string[]> = {
  Location: [],
  Domain: [],
  Level: [],
};

export default function ExamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<FilterGroup, string[]>>(INITIAL_FILTERS);
  const [filterOpen, setFilterOpen] = useState(false);

  // ── Derived ──────────────────────────────────────────────────────────────────

  const totalActiveFilters = useMemo(
    () => Object.values(activeFilters).flat().length,
    [activeFilters],
  );

  const filteredExams = useMemo(() => {
    let result = ALL_EXAMS;

    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.id.toLowerCase().includes(q) ||
          e.domain.toLowerCase().includes(q) ||
          e.location.toLowerCase().includes(q),
      );
    }

    for (const group of Object.keys(activeFilters) as FilterGroup[]) {
      if (activeFilters[group].length === 0) continue;
      const selected = activeFilters[group];
      result = result.filter((e) => {
        if (group === "Location") return selected.includes(e.location);
        if (group === "Domain") return selected.includes(e.domain);
        if (group === "Level") return selected.includes(e.level);
        return true;
      });
    }

    return result;
  }, [searchQuery, activeFilters]);

  const popularExams = useMemo(() => filteredExams.filter((e) => e.isPopular), [filteredExams]);
  const allExams = useMemo(() => filteredExams.filter((e) => !e.isPopular), [filteredExams]);
  const isFiltering = searchQuery.trim().length > 0 || totalActiveFilters > 0;

  // ── Handlers ─────────────────────────────────────────────────────────────────

  const toggleFilter = useCallback((group: FilterGroup, value: string) => {
    setActiveFilters((prev) => {
      const current = prev[group];
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [group]: next };
    });
  }, []);

  const removeFilter = useCallback((group: FilterGroup, value: string) => {
    setActiveFilters((prev) => ({
      ...prev,
      [group]: prev[group].filter((v) => v !== value),
    }));
  }, []);

  const clearAllFilters = useCallback(() => {
    setActiveFilters(INITIAL_FILTERS);
    setSearchQuery("");
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <>
      {filterOpen && (
        <FilterModal
          activeFilters={activeFilters}
          onToggle={toggleFilter}
          onClear={() => setActiveFilters(INITIAL_FILTERS)}
          onClose={() => setFilterOpen(false)}
        />
      )}

      <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-16 text-white sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl space-y-10">

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
              Pick your exam. Instantly resize, crop, and compress your photo or
              signature to exact official specifications — 100% in your browser.
            </p>

            {/* Full-width Search */}
            <div className="mx-auto mt-6 w-full max-w-2xl">
              <div className="relative flex items-center">
                <Search className="pointer-events-none absolute left-4 h-5 w-5 text-slate-400" />
                <input
                  id="exam-search"
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search exams — UPSC, NEET, SSC, Banking…"
                  className="w-full rounded-2xl border border-slate-700 bg-slate-800/70 py-4 pl-12 pr-12 text-base text-white placeholder-slate-500 shadow-xl backdrop-blur-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
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

          {/* ── Filters Row ── */}
          <div className="flex min-w-0 items-start gap-3">
            {/* Filters button */}
            <button
              id="exam-filters-btn"
              onClick={() => setFilterOpen(true)}
              className={`relative shrink-0 inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-150 ${totalActiveFilters > 0
                ? "border-blue-500 bg-blue-500/15 text-blue-300 shadow-[0_0_0_1px_rgba(59,130,246,0.4)]"
                : "border-slate-700 bg-slate-800/60 text-slate-300 hover:border-slate-600 hover:text-white"
                }`}
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {totalActiveFilters > 0 && (
                <span className="ml-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white">
                  {totalActiveFilters}
                </span>
              )}
            </button>

            {/* Horizontally scrollable active filter chips */}
            {totalActiveFilters > 0 && (
              <div className="flex min-w-0 flex-1 items-center gap-2 overflow-x-auto pb-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                {(Object.keys(activeFilters) as FilterGroup[]).flatMap((group) =>
                  activeFilters[group].map((value) => (
                    <FilterChip
                      key={`${group}:${value}`}
                      label={value}
                      onRemove={() => removeFilter(group, value)}
                    />
                  )),
                )}
                <button
                  onClick={() => setActiveFilters(INITIAL_FILTERS)}
                  className="shrink-0 text-xs text-slate-500 hover:text-slate-300 transition-colors whitespace-nowrap"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* ── Result count strip ── */}
          {isFiltering && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">
                <span className="font-semibold text-white">{filteredExams.length}</span>{" "}
                exam{filteredExams.length !== 1 ? "s" : ""} found
              </span>
              <button
                onClick={clearAllFilters}
                className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
              >
                Reset
              </button>
            </div>
          )}

          {/* ── No results ── */}
          {filteredExams.length === 0 && <EmptyState query={searchQuery} />}

          {/* ── 🔥 Popular Exams ── */}
          {popularExams.length > 0 && (
            <section aria-label="Popular Exams" className="space-y-5">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold tracking-wide text-slate-200">
                  🔥 Popular Exams
                </h2>
                <span className="inline-flex items-center rounded-full border border-slate-600/60 bg-slate-700/50 px-2.5 py-0.5 text-xs font-semibold text-slate-300">
                  {popularExams.length}
                </span>
              </div>
              <div className="h-px bg-gradient-to-r from-orange-500/40 via-slate-700/50 to-transparent" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {popularExams.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} popular />
                ))}
              </div>
            </section>
          )}

          {/* ── 📚 All Exams ── */}
          {allExams.length > 0 && (
            <section aria-label="All Exams" className="space-y-5">
              <div className="flex items-center gap-3">
                <h2 className="text-lg font-bold tracking-wide text-slate-200">
                  📚 All Exams
                </h2>
                <span className="inline-flex items-center rounded-full border border-slate-600/60 bg-slate-700/50 px-2.5 py-0.5 text-xs font-semibold text-slate-300">
                  {allExams.length}
                </span>
              </div>
              <div className="h-px bg-gradient-to-r from-slate-700 via-slate-700/50 to-transparent" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {allExams.map((exam) => (
                  <ExamCard key={exam.id} exam={exam} />
                ))}
              </div>
            </section>
          )}

        </div>
      </main>
    </>
  );
}
