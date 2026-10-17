import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { FormatDocument } from "@/config/formats";

// ---------------------------------------------------------------------------
// Helpers & Sub-components
// ---------------------------------------------------------------------------

/** Visual card shell — a next/link with hover/focus interaction styles. */
function CardShell({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={[
        "group flex flex-col justify-between gap-4",
        "rounded-ff-lg border border-ff-border bg-ff-surface p-4",
        "shadow-ff-sm",
        "transition-[border-color,box-shadow,transform]",
        "duration-[var(--ff-duration-normal)]",
        "motion-safe:hover:-translate-y-px",
        "hover:border-brand-300 hover:shadow-ff-md",
        "outline-none focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)] focus-visible:ring-offset-2",
      ].join(" ")}
    >
      {children}
    </Link>
  );
}

/** Animated chevron indicating the card is a link. */
function CardChevron() {
  return (
    <ChevronRight
      aria-hidden="true"
      className={[
        "h-4 w-4 shrink-0 text-ff-foreground-muted",
        "transition-[transform,color] duration-[var(--ff-duration-fast)]",
        "motion-safe:group-hover:translate-x-0.5 group-hover:text-brand-500",
      ].join(" ")}
    />
  );
}

/** Metadata pill tag. */
function Tag({
  children,
  variant = "neutral",
}: {
  children: React.ReactNode;
  variant?: "neutral" | "brand";
}) {
  const neutral = "border-ff-border bg-ff-surface-subtle text-ff-foreground-muted";
  const brand = "border-brand-200 bg-brand-50 font-medium text-brand-600";
  return (
    <span
      className={[
        "inline-block rounded-ff-pill border px-2 py-0.5",
        variant === "brand" ? brand : neutral,
      ].join(" ")}
      style={{ fontSize: "var(--ff-text-caption-size)" }}
    >
      {children}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface ExamCardData {
  id: string;
  title: string;
  description?: string;
  documents?: FormatDocument[];
  domain?: string;
  location?: string;
  level?: string;
  isPopular?: boolean;
  subCategory?: string;
  [key: string]: any;
}

export interface ExamStandardCardProps {
  /** Exam record data to display. */
  exam: ExamCardData;
  /** Navigation destination, e.g. "/exam/upsc_cse". Defaults to `/exam/${exam.id}`. */
  href?: string;
  /** Force popular visual indicator regardless of exam.isPopular */
  popular?: boolean;
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

/**
 * Navigable directory card for a Government Exam photo specification standard.
 *
 * Consistent with CountryStandardCard in the FormFoto directory design system:
 * - White surface · 1px neutral border · 12px corner radius (rounded-ff-lg).
 * - FormFoto Blue for meaningful interaction emphasis only.
 * - Subtle hover lift and focus-visible ring adhering to design tokens.
 * - Meaningful document specifications (e.g., "Photograph • Signature").
 * - Relevant tags (Popular, Domain, State/Location, Level).
 */
export default function ExamStandardCard({
  exam,
  href,
  popular,
}: ExamStandardCardProps) {
  const targetHref = href ?? `/exam/${exam.id}`;
  const isPopular = popular ?? exam.isPopular ?? false;

  const docSummary =
    exam.documents && exam.documents.length > 0
      ? exam.documents
          .map((d) => d.name)
          .filter(Boolean)
          .join(" • ")
      : null;

  return (
    <CardShell href={targetHref}>
      {/* Exam Title + Documents summary */}
      <div className="space-y-1">
        <h3
          className="line-clamp-2 font-semibold text-ff-foreground transition-colors group-hover:text-brand-600"
          style={{
            fontSize: "var(--ff-text-body-size)",
            lineHeight: "var(--ff-text-body-height)",
          }}
        >
          {exam.title}
        </h3>

        {docSummary && (
          <p
            className="truncate text-ff-foreground-secondary"
            style={{ fontSize: "var(--ff-text-small-size)" }}
          >
            {docSummary}
          </p>
        )}
      </div>

      {/* Metadata tags + directional cue */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-wrap gap-1">
          {isPopular && <Tag variant="brand">Popular</Tag>}
          {exam.domain && <Tag>{exam.domain}</Tag>}
          {exam.location && exam.location !== "National" && (
            <Tag>{exam.location}</Tag>
          )}
          {exam.level && exam.level !== "Other" && <Tag>{exam.level}</Tag>}
        </div>
        <CardChevron />
      </div>
    </CardShell>
  );
}
