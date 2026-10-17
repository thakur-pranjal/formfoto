"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { visaCountries } from "@/config/visas";
import DirectoryHeader from "@/components/directory/DirectoryHeader";
import CountryStandardCard from "@/components/directory/CountryStandardCard";

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
        Try a different search term.
      </p>
      {onReset && query && (
        <button
          type="button"
          onClick={onReset}
          className="mt-4 inline-flex items-center rounded-ff-md border border-ff-border bg-ff-surface px-4 py-2 text-xs font-semibold text-brand-600 shadow-ff-sm hover:border-brand-300 hover:bg-ff-surface-subtle transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)]"
        >
          Reset search
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

  // Preserve existing search semantics exactly:
  // matches country name, country code, country id, and any profile title or applicableCategory.
  const filteredCountries = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return visaCountries;
    return visaCountries.filter((c) => {
      // Country-level fields
      if (
        c.country.toLowerCase().includes(q) ||
        c.countryCode.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q)
      )
        return true;
      // Profile-level fields
      return c.profiles.some(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.applicableCategories?.some((cat) => cat.toLowerCase().includes(q)),
      );
    });
  }, [searchQuery]);

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

        {/* ── Empty state ── */}
        {filteredCountries.length === 0 && (
          <EmptyState query={searchQuery} onReset={() => setSearchQuery("")} />
        )}

        {/* ── Grid ── */}
        {filteredCountries.length > 0 && (
          <section aria-label="Visa Destinations">
            {/* Section label row */}
            <div className="mb-5 flex items-center gap-3">
              <h2
                className="font-semibold text-ff-foreground"
                style={{ fontSize: "var(--ff-text-h4-size)" }}
              >
                All Visa Destinations
              </h2>
              {/* Count badge */}
              <span
                className={[
                  "inline-flex items-center rounded-ff-pill",
                  "border border-ff-border bg-ff-surface-subtle",
                  "px-2.5 py-0.5 font-semibold text-ff-foreground-secondary",
                ].join(" ")}
                style={{ fontSize: "var(--ff-text-caption-size)" }}
              >
                {filteredCountries.length}
              </span>
            </div>

            {/* Divider */}
            <div className="mb-5 h-px bg-ff-border" />

            {/* Card grid — 1 col mobile, 2 col sm, 3 col lg */}
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
        )}
      </div>
    </main>
  );
}
