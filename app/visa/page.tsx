"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { visaCountries } from "@/config/visas";
import DirectoryHeader from "@/components/directory/DirectoryHeader";
import CountryStandardCard from "@/components/directory/CountryStandardCard";

// ---------------------------------------------------------------------------
// Popular Visas
// ---------------------------------------------------------------------------

const POPULAR_IDS = [
  "us-visa",
  "schengen-visa",
  "uk-visa",
  "canada-visa",
  "australia-visa",
  "japan-visa",
];

// ---------------------------------------------------------------------------
// Region mapping (country code / country name → broad region)
// ---------------------------------------------------------------------------

const REGION_MAP: Record<string, string> = {
  // North America
  US: "North America",
  CA: "North America",
  MX: "North America",
  // Europe
  GB: "Europe",
  DE: "Europe",
  FR: "Europe",
  IT: "Europe",
  ES: "Europe",
  PT: "Europe",
  NL: "Europe",
  BE: "Europe",
  AT: "Europe",
  CH: "Europe",
  SE: "Europe",
  NO: "Europe",
  DK: "Europe",
  FI: "Europe",
  PL: "Europe",
  IE: "Europe",
  EU: "Europe",
  // Asia
  IN: "Asia",
  CN: "Asia",
  JP: "Asia",
  KR: "Asia",
  PH: "Asia",
  TH: "Asia",
  MY: "Asia",
  SG: "Asia",
  ID: "Asia",
  BD: "Asia",
  PK: "Asia",
  NP: "Asia",
  LK: "Asia",
  IL: "Asia",
  // Oceania
  AU: "Oceania",
  NZ: "Oceania",
  // Middle East
  AE: "Middle East",
  SA: "Middle East",
  QA: "Middle East",
  OM: "Middle East",
  // Africa
  ZA: "Africa",
  // South America
  BR: "South America",
  // Eastern Europe / Central Asia
  RU: "Europe",
  TR: "Europe",
};

const COUNTRY_NAME_REGION_MAP: Record<string, string> = {
  "United States": "North America",
  Canada: "North America",
  Mexico: "North America",
  "United Kingdom": "Europe",
  Ireland: "Europe",
  "Schengen Area": "Europe",
  India: "Asia",
  China: "Asia",
  Japan: "Asia",
  "South Korea": "Asia",
  Singapore: "Asia",
  Israel: "Asia",
  Australia: "Oceania",
  "New Zealand": "Oceania",
  "United Arab Emirates": "Middle East",
  "Saudi Arabia": "Middle East",
  Qatar: "Middle East",
  Oman: "Middle East",
};

const REGIONS = [
  "North America",
  "Europe",
  "Asia",
  "Oceania",
  "Middle East",
  "Africa",
  "South America",
];

const FORMATS = ["Digital Upload", "Physical Print", "Both"];

function getCountryRegion(c: { country?: string; countryCode?: string }): string | undefined {
  if (c.countryCode && REGION_MAP[c.countryCode.toUpperCase()]) {
    return REGION_MAP[c.countryCode.toUpperCase()];
  }
  if (c.country && COUNTRY_NAME_REGION_MAP[c.country]) {
    return COUNTRY_NAME_REGION_MAP[c.country];
  }
  if (c.country && REGION_MAP[c.country]) {
    return REGION_MAP[c.country];
  }
  if (c.country?.toLowerCase().includes("schengen")) {
    return "Europe";
  }
  return undefined;
}

// ---------------------------------------------------------------------------
// Empty state
// ---------------------------------------------------------------------------

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
        No visa destinations found
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
        Try a different search term or clearing filters.
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-4 inline-flex items-center rounded-ff-md border border-ff-border bg-ff-surface px-4 py-2 text-xs font-semibold text-brand-600 shadow-ff-sm hover:border-brand-300 hover:bg-ff-surface-subtle transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)]"
        >
          Reset all filters
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function VisaHubPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);

  // Draft state inside modal (applied on "Show Results")
  const [draftRegions, setDraftRegions] = useState<string[]>([]);
  const [draftFormats, setDraftFormats] = useState<string[]>([]);

  // Keep draft state in sync when modal opens
  useEffect(() => {
    if (isFilterOpen) {
      setDraftRegions(selectedRegions);
      setDraftFormats(selectedFormats);
    }
  }, [isFilterOpen, selectedRegions, selectedFormats]);

  const activeFilterCount = selectedRegions.length + selectedFormats.length;

  function applyFilters() {
    setSelectedRegions(draftRegions);
    setSelectedFormats(draftFormats);
    setIsFilterOpen(false);
  }

  function clearAllFilters() {
    setSelectedRegions([]);
    setSelectedFormats([]);
    setDraftRegions([]);
    setDraftFormats([]);
    setSearchQuery("");
  }

  function toggleDraftRegion(region: string) {
    setDraftRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  }

  function toggleDraftFormat(format: string) {
    setDraftFormats((prev) =>
      prev.includes(format) ? prev.filter((f) => f !== format) : [...prev, format]
    );
  }

  // Base filtered list:
  // 1. Region filter
  // 2. Format filter (profile channel check)
  // 3. Search query
  const filteredCountries = useMemo(() => {
    let list = visaCountries;

    // Region filter
    if (selectedRegions.length > 0) {
      list = list.filter((c) => {
        const region = getCountryRegion(c);
        return region ? selectedRegions.includes(region) : false;
      });
    }

    // Format filter
    if (selectedFormats.length > 0) {
      list = list.filter((c) => {
        return selectedFormats.some((format) => {
          if (format === "Digital Upload") {
            return c.profiles.some(
              (p) => p.channel === "digital_upload" || p.channel === "both"
            );
          }
          if (format === "Physical Print") {
            return c.profiles.some(
              (p) => p.channel === "physical_print" || p.channel === "both"
            );
          }
          if (format === "Both") {
            return c.profiles.some((p) => p.channel === "both");
          }
          return false;
        });
      });
    }

    // Search query
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter((c) => {
        // Country-level fields
        if (
          c.country.toLowerCase().includes(q) ||
          c.countryCode.toLowerCase().includes(q) ||
          c.id.toLowerCase().includes(q)
        ) {
          return true;
        }
        // Profile-level fields
        return c.profiles.some(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.applicableCategories?.some((cat) => cat.toLowerCase().includes(q))
        );
      });
    }

    return list;
  }, [searchQuery, selectedRegions, selectedFormats]);

  const popularVisas = useMemo(() => {
    return filteredCountries
      .filter((c) => POPULAR_IDS.includes(c.id))
      .sort((a, b) => POPULAR_IDS.indexOf(a.id) - POPULAR_IDS.indexOf(b.id));
  }, [filteredCountries]);

  const allVisas = useMemo(() => {
    return filteredCountries.filter((c) => !POPULAR_IDS.includes(c.id));
  }, [filteredCountries]);

  const isSearching = searchQuery.trim().length > 0;
  const isFiltering = activeFilterCount > 0;
  const showPopularSplit = !isSearching && !isFiltering;

  return (
    <main className="min-h-screen bg-ff-background px-ff-page-gutter py-ff-12 sm:py-ff-16">
      <div
        className="mx-auto space-y-10"
        style={{ maxWidth: "var(--spacing-ff-content-max)" }}
      >
        {/* ── Directory header (title + search + result strip) ── */}
        <DirectoryHeader
          title="Visa Photo Standards"
          description="Select your destination country. Instantly resize and compress your visa photo to the exact consular or e-Visa specification — 100% in your browser."
          eyebrow="Visas"
          searchId="visa-search"
          searchLabel="Search visa destinations by country, visa type, or subclass"
          searchPlaceholder="Search by country, visa type, or subclass (e.g. F-1, H-1B)…"
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          resultCount={filteredCountries.length}
          resultNoun="destination"
        />

        {/* ── Filter button bar ── */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsFilterOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-ff-surface border border-ff-border rounded-lg text-sm font-medium text-ff-foreground hover:bg-ff-surface-subtle transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            Filters{" "}
            {selectedRegions.length + selectedFormats.length > 0 && (
              <span className="ml-1 bg-brand-100 text-brand-700 py-0.5 px-2 rounded-full text-xs">
                {selectedRegions.length + selectedFormats.length}
              </span>
            )}
          </button>
          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-sm text-ff-foreground-muted hover:text-ff-foreground transition-colors"
            >
              Clear all
            </button>
          )}
        </div>

        {/* ── Empty state ── */}
        {filteredCountries.length === 0 && (
          <EmptyState query={searchQuery} onReset={clearAllFilters} />
        )}

        {/* ── Grid ── */}
        {filteredCountries.length > 0 && (
          showPopularSplit ? (
            <div className="space-y-10">
              {/* ── Popular Visas ── */}
              {popularVisas.length > 0 && (
                <section aria-label="Popular Visas">
                  <h2 className="text-xl font-semibold text-ff-foreground mb-ff-4">
                    Popular Visas
                  </h2>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {popularVisas.map((config) => (
                      <CountryStandardCard
                        key={config.id}
                        variant="visa"
                        config={config}
                        href={`/visa/${config.id}`}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* ── All Visas ── */}
              {allVisas.length > 0 && (
                <section aria-label="All Visas">
                  <h2 className="text-xl font-semibold text-ff-foreground mb-ff-4">
                    All Visas
                  </h2>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {allVisas.map((config) => (
                      <CountryStandardCard
                        key={config.id}
                        variant="visa"
                        config={config}
                        href={`/visa/${config.id}`}
                      />
                    ))}
                  </div>
                </section>
              )}
            </div>
          ) : (
            <section aria-label="Visa Results">
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filteredCountries.map((config) => (
                  <CountryStandardCard
                    key={config.id}
                    variant="visa"
                    config={config}
                    href={`/visa/${config.id}`}
                  />
                ))}
              </div>
            </section>
          )
        )}
      </div>

      {/* ── Filter Modal ── */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setIsFilterOpen(false)}
          />

          {/* Modal Card */}
          <div className="relative w-full max-w-lg bg-ff-surface rounded-xl shadow-ff-lg flex flex-col max-h-[90vh]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-ff-border">
              <h2 className="text-base font-semibold text-ff-foreground">Filters</h2>
              <button
                type="button"
                onClick={() => setIsFilterOpen(false)}
                className="p-1.5 rounded-lg text-ff-foreground-muted hover:text-ff-foreground hover:bg-ff-surface-subtle transition-colors"
                aria-label="Close filters"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="overflow-y-auto p-6 space-y-8">
              {/* Region section */}
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-ff-foreground-muted mb-3">
                  Region
                </p>
                <div className="flex flex-wrap gap-2">
                  {REGIONS.map((region) => {
                    const selected = draftRegions.includes(region);
                    return (
                      <button
                        key={region}
                        type="button"
                        onClick={() => toggleDraftRegion(region)}
                        className={[
                          "px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors",
                          selected
                            ? "bg-brand-50 border-brand-200 text-brand-700"
                            : "border border-ff-border text-ff-foreground-secondary hover:border-brand-300 bg-ff-surface",
                        ].join(" ")}
                      >
                        {region}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Format section */}
              <div>
                <p className="text-xs font-semibold tracking-widest uppercase text-ff-foreground-muted mb-3">
                  Format
                </p>
                <div className="flex flex-wrap gap-2">
                  {FORMATS.map((format) => {
                    const selected = draftFormats.includes(format);
                    return (
                      <button
                        key={format}
                        type="button"
                        onClick={() => toggleDraftFormat(format)}
                        className={[
                          "px-3 py-1.5 rounded-lg border text-sm font-medium transition-colors",
                          selected
                            ? "bg-brand-50 border-brand-200 text-brand-700"
                            : "border border-ff-border text-ff-foreground-secondary hover:border-brand-300 bg-ff-surface",
                        ].join(" ")}
                      >
                        {format}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-ff-border bg-ff-background rounded-b-xl flex items-center gap-3">
              {(draftRegions.length > 0 || draftFormats.length > 0) && (
                <button
                  type="button"
                  onClick={() => {
                    setDraftRegions([]);
                    setDraftFormats([]);
                  }}
                  className="text-sm text-ff-foreground-muted hover:text-ff-foreground transition-colors"
                >
                  Clear
                </button>
              )}
              <button
                type="button"
                onClick={applyFilters}
                className="flex-1 bg-brand-500 text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-600 transition-colors"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
