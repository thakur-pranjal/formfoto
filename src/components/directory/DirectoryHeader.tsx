"use client";

import { useRef, useEffect } from "react";
import { Search, X } from "lucide-react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface DirectoryHeaderProps {
  /** Primary page heading — rendered as <h1>. */
  title: string;

  /** Short supporting paragraph shown below the title. */
  description: string;

  /**
   * Optional eyebrow label shown above the title.
   * Accepts a ReactNode so the parent can include an icon or badge.
   */
  eyebrow?: React.ReactNode;

  // ── Controlled search ──────────────────────────────────────────────────────

  /** Unique HTML id applied to the <input> element. Required for aria-label association. */
  searchId: string;

  /** Accessible label for the search input (used for aria-label). */
  searchLabel: string;

  /** Placeholder text shown inside the search input. */
  searchPlaceholder?: string;

  /** Current search value — controlled by the parent. */
  searchValue: string;

  /** Called whenever the input value changes. */
  onSearchChange: (value: string) => void;

  // ── Optional result summary ────────────────────────────────────────────────

  /**
   * When provided and the search input is non-empty, a result count strip
   * is rendered below the search bar. The parent calculates and supplies this.
   * Pass undefined (or omit) to suppress the strip entirely.
   */
  resultCount?: number;

  /** Noun to use in the result strip, e.g. "result" → "3 results found". */
  resultNoun?: string;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export default function DirectoryHeader({
  title,
  description,
  eyebrow,
  searchId,
  searchLabel,
  searchPlaceholder = "Search…",
  searchValue,
  onSearchChange,
  resultCount,
  resultNoun = "result",
}: DirectoryHeaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const isSearchActive = searchValue.trim().length > 0;
  const showResultStrip = isSearchActive && resultCount !== undefined;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const target = e.target as HTMLElement | null;
        const tagName = target?.tagName;
        const isEditable = target?.isContentEditable;
        if (
          tagName === "INPUT" ||
          tagName === "TEXTAREA" ||
          tagName === "SELECT" ||
          isEditable
        ) {
          return;
        }
        e.preventDefault();
        inputRef.current?.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="space-y-6">
      {/* ── Title block ── */}
      <div className="space-y-2">
        {eyebrow && (
          <div className="text-xs font-semibold uppercase tracking-widest text-brand-500">
            {eyebrow}
          </div>
        )}

        <h1
          className="text-3xl font-semibold tracking-tight text-ff-foreground sm:text-4xl"
          style={{ lineHeight: "var(--ff-text-h1-height)" }}
        >
          {title}
        </h1>

        <p
          className="max-w-2xl text-ff-foreground-secondary"
          style={{
            fontSize: "var(--ff-text-body-lg-size)",
            lineHeight: "var(--ff-text-body-lg-height)",
          }}
        >
          {description}
        </p>
      </div>

      {/* ── Search ── */}
      <div className="relative flex max-w-xl items-center">
        <Search
          aria-hidden="true"
          className="pointer-events-none absolute left-3.5 h-4 w-4 shrink-0 text-ff-foreground-muted"
        />

        <input
          ref={inputRef}
          id={searchId}
          type="text"
          role="searchbox"
          aria-label={searchLabel}
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          autoComplete="off"
          spellCheck={false}
          className={[
            "w-full rounded-ff-lg border border-ff-border bg-ff-surface py-2.5 pl-10 pr-10",
            "text-sm text-ff-foreground placeholder:text-ff-foreground-muted",
            "shadow-ff-sm outline-none",
            "transition-[border-color,box-shadow] duration-[var(--ff-duration-fast)]",
            "focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20",
            "focus-visible:outline-none",
          ].join(" ")}
        />

        {/* / Keyboard shortcut hint when search is empty */}
        {!isSearchActive && (
          <kbd
            aria-hidden="true"
            className="pointer-events-none absolute right-3 hidden sm:inline-flex items-center rounded border border-[#E1E5EC] bg-[#F7F8FA] px-1.5 py-0.5 font-mono text-[11px] font-medium text-[#667085]"
          >
            /
          </kbd>
        )}

        {/* Clear button — only visible when there is input */}
        {isSearchActive && (
          <button
            type="button"
            onClick={() => onSearchChange("")}
            aria-label="Clear search"
            className={[
              "absolute right-2.5 flex h-7 w-7 items-center justify-center rounded-full",
              "text-ff-foreground-muted hover:text-ff-foreground",
              "hover:bg-ff-surface-subtle",
              "outline-none focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)] focus-visible:ring-offset-1",
              "transition-colors duration-[var(--ff-duration-fast)]",
            ].join(" ")}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* ── Result count strip ── */}
      {showResultStrip && (
        <div className="flex max-w-xl items-center justify-between">
          <p
            className="text-ff-foreground-secondary"
            style={{ fontSize: "var(--ff-text-small-size)" }}
          >
            <span className="font-semibold text-ff-foreground">{resultCount}</span>{" "}
            {resultNoun}
            {resultCount !== 1 ? "s" : ""} found
          </p>

          <button
            type="button"
            onClick={() => onSearchChange("")}
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
    </div>
  );
}
