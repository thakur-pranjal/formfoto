"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import { Search, SlidersHorizontal, X, Check } from "lucide-react";
import { examStandards as FORMATS } from "@/config/exams";
import DirectoryHeader from "@/components/directory/DirectoryHeader";
import ExamStandardCard from "@/components/directory/ExamStandardCard";

// ---------------------------------------------------------------------------
// Filter Definitions & Enrichment
// ---------------------------------------------------------------------------

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
    "University Entrance",
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

/** IDs that will carry isPopular: true */
const POPULAR_IDS = new Set([
  "upsc_cse",
  "neet_ug",
  "jee_main",
  "ssc_cgl",
  "ibps_po",
  "jee_advanced",
  "neet_pg",
  "cat",
  "cuet_ug",
  "rrb_ntpc",
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

/** subCategory + id → broad Domain bucket */
function deriveDomain(sub: string, id: string = ""): string {
  const s = sub.toLowerCase();
  const i = id.toLowerCase();
  if (
    s.includes("medical") ||
    s.includes("mbbs") ||
    s.includes("neet") ||
    s.includes("ini cet") ||
    s.includes("ini_cet") ||
    s.includes("afmc") ||
    s.includes("aiims") ||
    s.includes("dental") ||
    s.includes("nursing") ||
    i.includes("neet") ||
    i.includes("ini_cet") ||
    i.includes("afmc") ||
    i.includes("aiims")
  )
    return "Medical";
  if (
    s.includes("engineering") ||
    s.includes("agriculture") ||
    s.includes("pharmacy")
  )
    return "Engineering";
  if (
    s.includes("university entrance") ||
    s.includes("undergraduate entrance") ||
    s.includes("postgraduate entrance") ||
    s.includes("cuet") ||
    i.includes("cuet")
  )
    return "University Entrance";
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
  )
    return "Government Jobs";
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

// ---------------------------------------------------------------------------
// Base Data
// ---------------------------------------------------------------------------

type BaseExam = ReturnType<typeof FORMATS.filter>[number];

type Exam = BaseExam & {
  tags: string[];
  isPopular: boolean;
  location: string;
  domain: string;
  level: string;
};

const ALL_EXAMS: Exam[] = (
  FORMATS.filter((f) => f.category === "exam") as BaseExam[]
)
  .sort((a, b) => a.title.localeCompare(b.title))
  .map((f) => {
    const sub = ((f as any).subCategory ?? "General / Other").trim() as string;
    const location = STATE_MAP[f.id] ?? "National";
    const domain = deriveDomain(sub, f.id);
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

// ---------------------------------------------------------------------------
// Sub-components: Filter Chip, Filter Modal, Empty State
// ---------------------------------------------------------------------------

function FilterChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-ff-pill border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
      <span>{label}</span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label} filter`}
        className="rounded-full p-0.5 text-brand-500 hover:bg-brand-200/60 hover:text-brand-900 transition-colors outline-none focus-visible:ring-1 focus-visible:ring-[var(--ff-focus-color)]"
      >
        <X className="h-3 w-3" aria-hidden="true" />
      </button>
    </span>
  );
}

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
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap / initial focus
  useEffect(() => {
    closeButtonRef.current?.focus();
  }, []);

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  // Escape key to close
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const totalActive = Object.values(activeFilters).flat().length;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-xs p-0 sm:p-4">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Filter exams"
        className="flex max-h-[85dvh] w-full max-w-sm sm:max-w-lg flex-col overflow-hidden rounded-t-2xl sm:rounded-ff-xl border border-ff-border bg-ff-surface shadow-ff-lg"
      >
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-ff-border px-5 py-4">
          <div>
            <h2 className="text-base font-semibold text-ff-foreground">
              Filters
            </h2>
            {totalActive > 0 && (
              <p className="mt-0.5 text-xs text-ff-foreground-muted">
                {totalActive} active
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {totalActive > 0 && (
              <button
                type="button"
                onClick={onClear}
                className="rounded-ff-sm px-2 py-1 text-xs font-medium text-brand-600 hover:bg-brand-50 hover:text-brand-700 transition-colors"
              >
                Clear all
              </button>
            )}
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label="Close filters"
              className="rounded-full p-1.5 text-ff-foreground-muted hover:bg-ff-surface-subtle hover:text-ff-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Scrollable filter sections */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-6">
          {(Object.keys(FILTER_GROUPS) as FilterGroup[]).map((group) => (
            <div key={group}>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ff-foreground-muted">
                {group}
              </h3>
              <div className="flex flex-wrap gap-2">
                {(FILTER_GROUPS[group] as readonly string[]).map((option) => {
                  const isActive = activeFilters[group].includes(option);
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => onToggle(group, option)}
                      aria-pressed={isActive}
                      className={[
                        "inline-flex items-center gap-1.5 rounded-ff-pill border px-3 py-1.5 text-xs font-medium transition-all duration-150",
                        "outline-none focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)]",
                        isActive
                          ? "border-brand-500 bg-brand-50 text-brand-700 ring-1 ring-brand-500/30"
                          : "border-ff-border bg-ff-surface text-ff-foreground-secondary hover:border-ff-border-strong hover:bg-ff-surface-subtle hover:text-ff-foreground",
                      ].join(" ")}
                    >
                      {isActive && (
                        <Check
                          className="h-3 w-3 shrink-0 text-brand-600"
                          aria-hidden="true"
                        />
                      )}
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="shrink-0 border-t border-ff-border bg-ff-surface-subtle px-5 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-ff-lg bg-brand-500 py-2.5 text-sm font-semibold text-white shadow-ff-sm transition-colors hover:bg-brand-600 active:bg-brand-700 outline-none focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)] focus-visible:ring-offset-2"
          >
            Show Results
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  query,
  onReset,
}: {
  query: string;
  onReset?: () => void;
}) {
  return (
    <div
      className={[
        "rounded-ff-lg border border-ff-border bg-ff-surface-subtle",
        "py-16 text-center",
      ].join(" ")}
    >
      <Search
        aria-hidden="true"
        className="mx-auto mb-3 h-8 w-8 text-ff-foreground-muted opacity-50"
      />
      <p
        className="font-medium text-ff-foreground"
        style={{ fontSize: "var(--ff-text-body-size)" }}
      >
        No exams found
      </p>
      {query && (
        <p
          className="mt-1 text-ff-foreground-secondary"
          style={{ fontSize: "var(--ff-text-small-size)" }}
        >
          No results for &ldquo;{query}&rdquo;
        </p>
      )}
      <p
        className="mt-2 text-ff-foreground-muted"
        style={{ fontSize: "var(--ff-text-small-size)" }}
      >
        Try adjusting your filters or search term.
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-4 inline-flex items-center rounded-ff-md border border-ff-border bg-ff-surface px-4 py-2 text-xs font-semibold text-brand-600 shadow-ff-sm hover:border-brand-300 hover:bg-ff-surface-subtle transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)]"
        >
          Reset filters & search
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------

const INITIAL_FILTERS: Record<FilterGroup, string[]> = {
  Location: [],
  Domain: [],
  Level: [],
};

export default function ExamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] =
    useState<Record<FilterGroup, string[]>>(INITIAL_FILTERS);
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
          e.location.toLowerCase().includes(q) ||
          ((e as any).subCategory?.toLowerCase().includes(q) ?? false),
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

  const popularExams = useMemo(
    () => filteredExams.filter((e) => e.isPopular),
    [filteredExams],
  );
  const allExams = useMemo(
    () => filteredExams.filter((e) => !e.isPopular),
    [filteredExams],
  );

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

  const handleModalClose = useCallback(() => {
    setFilterOpen(false);
    // Return focus to filter trigger button
    const btn = document.getElementById("exam-filters-btn");
    if (btn) btn.focus();
  }, []);

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <>
      {filterOpen && (
        <FilterModal
          activeFilters={activeFilters}
          onToggle={toggleFilter}
          onClear={() => setActiveFilters(INITIAL_FILTERS)}
          onClose={handleModalClose}
        />
      )}

      <main className="min-h-screen bg-ff-background px-ff-page-gutter py-ff-12 sm:py-ff-16">
        <div
          className="mx-auto space-y-8"
          style={{ maxWidth: "var(--spacing-ff-content-max)" }}
        >
          {/* ── Directory header (title + search + result strip) ── */}
          <DirectoryHeader
            title="Government Exam Photo Tools"
            description="Pick your exam. Instantly resize, crop, and compress your photo or signature to exact official specifications — 100% in your browser."
            eyebrow="Exams"
            searchId="exam-search"
            searchLabel="Search exams by name, authority, domain, or state"
            searchPlaceholder="Search exams — UPSC, NEET, SSC, Banking…"
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            resultCount={filteredExams.length}
            resultNoun="exam"
          />

          {/* ── Filters Bar (Button + Active Chips) ── */}
          <div className="flex min-w-0 items-center gap-3">
            <button
              id="exam-filters-btn"
              type="button"
              onClick={() => setFilterOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={filterOpen}
              className={[
                "relative inline-flex shrink-0 items-center gap-2 rounded-ff-lg border px-3.5 py-2 text-sm font-medium shadow-ff-sm transition-colors",
                "outline-none focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)] focus-visible:ring-offset-1",
                totalActiveFilters > 0
                  ? "border-brand-300 bg-brand-50 text-brand-700 hover:border-brand-400 hover:bg-brand-100"
                  : "border-ff-border bg-ff-surface text-ff-foreground hover:border-ff-border-strong hover:bg-ff-surface-subtle",
              ].join(" ")}
            >
              <SlidersHorizontal className="h-4 w-4 shrink-0 text-current" />
              <span>Filters</span>
              {totalActiveFilters > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-brand-500 px-1.5 text-xs font-semibold text-white">
                  {totalActiveFilters}
                </span>
              )}
            </button>

            {/* Active filter chips */}
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
                  type="button"
                  onClick={() => setActiveFilters(INITIAL_FILTERS)}
                  className="shrink-0 text-xs font-medium text-brand-600 hover:text-brand-700 hover:underline transition-colors whitespace-nowrap outline-none focus-visible:ring-1 focus-visible:ring-[var(--ff-focus-color)] rounded-ff-sm px-1 py-0.5"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>

          {/* ── Filter-only result count strip (when filters active but search query empty) ── */}
          {totalActiveFilters > 0 && searchQuery.trim().length === 0 && (
            <div className="flex max-w-xl items-center justify-between">
              <p
                className="text-ff-foreground-secondary"
                style={{ fontSize: "var(--ff-text-small-size)" }}
              >
                <span className="font-semibold text-ff-foreground">
                  {filteredExams.length}
                </span>{" "}
                exam{filteredExams.length !== 1 ? "s" : ""} found
              </p>
              <button
                type="button"
                onClick={clearAllFilters}
                className={[
                  "text-brand-500 hover:text-brand-600",
                  "outline-none focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)] focus-visible:ring-offset-1 rounded-ff-sm",
                  "transition-colors duration-[var(--ff-duration-fast)]",
                ].join(" ")}
                style={{ fontSize: "var(--ff-text-small-size)" }}
              >
                Reset
              </button>
            </div>
          )}

          {/* ── Empty state ── */}
          {filteredExams.length === 0 && (
            <EmptyState query={searchQuery} onReset={clearAllFilters} />
          )}

          {/* ── Popular Exams ── */}
          {popularExams.length > 0 && (
            <section aria-label="Popular Exams">
              <div className="mb-5 flex items-center gap-3">
                <h2
                  className="font-semibold text-ff-foreground"
                  style={{ fontSize: "var(--ff-text-h4-size)" }}
                >
                  Popular Exams
                </h2>
                <span
                  className={[
                    "inline-flex items-center rounded-ff-pill",
                    "border border-ff-border bg-ff-surface-subtle",
                    "px-2.5 py-0.5 font-semibold text-ff-foreground-secondary",
                  ].join(" ")}
                  style={{ fontSize: "var(--ff-text-caption-size)" }}
                >
                  {popularExams.length}
                </span>
              </div>

              <div className="mb-5 h-px bg-ff-border" />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {popularExams.map((exam) => (
                  <ExamStandardCard key={exam.id} exam={exam} popular />
                ))}
              </div>
            </section>
          )}

          {/* ── All Exams ── */}
          {allExams.length > 0 && (
            <section aria-label="All Exams">
              <div className="mb-5 flex items-center gap-3">
                <h2
                  className="font-semibold text-ff-foreground"
                  style={{ fontSize: "var(--ff-text-h4-size)" }}
                >
                  All Exams
                </h2>
                <span
                  className={[
                    "inline-flex items-center rounded-ff-pill",
                    "border border-ff-border bg-ff-surface-subtle",
                    "px-2.5 py-0.5 font-semibold text-ff-foreground-secondary",
                  ].join(" ")}
                  style={{ fontSize: "var(--ff-text-caption-size)" }}
                >
                  {allExams.length}
                </span>
              </div>

              <div className="mb-5 h-px bg-ff-border" />

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {allExams.map((exam) => (
                  <ExamStandardCard key={exam.id} exam={exam} />
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}
