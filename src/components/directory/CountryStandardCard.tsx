"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight, Layers } from "lucide-react";
import type { VisaPassportConfig, CountryVisaConfig } from "@/config/visas/types";

// ---------------------------------------------------------------------------
// Helpers & Badges
// ---------------------------------------------------------------------------

/** Clean, reliable flag image badge with fallback for missing code or image failure. */
function FlagBadge({
  countryCode,
  countryName,
}: {
  countryCode?: string;
  countryName: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (!countryCode || countryCode.length !== 2 || hasError) {
    return (
      <span
        aria-hidden="true"
        className="inline-flex h-4 w-[22px] shrink-0 items-center justify-center rounded-[3px] border border-ff-border bg-ff-surface-subtle font-mono text-[10px] font-semibold uppercase text-ff-foreground-muted ring-1 ring-black/10"
      >
        {countryCode && countryCode.length === 2 ? countryCode.toUpperCase() : "🌐"}
      </span>
    );
  }

  return (
    <img
      src={`https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`}
      width={22}
      height={16}
      alt={`${countryName} flag`}
      loading="lazy"
      onError={() => setHasError(true)}
      className="h-4 w-[22px] shrink-0 rounded-[3px] object-cover ring-1 ring-black/10"
    />
  );
}

/** Human-readable label for a single channel value. */
function channelLabel(channel: VisaPassportConfig["channel"]): string {
  switch (channel) {
    case "digital_upload":
      return "Digital";
    case "physical_print":
      return "Print";
    case "both":
      return "Print & Digital";
  }
}

/**
 * Derives unique channel mode(s) across all profiles of a visa country.
 * Never misrepresents a single profile's channel as the country's universal requirement.
 * When all profiles share one mode the label is shown once; when mixed, returns "Multiple".
 */
function visaChannelSummary(profiles: VisaPassportConfig[]): string {
  const labels = Array.from(new Set(profiles.map((p) => channelLabel(p.channel))));
  if (labels.length === 1) return labels[0];
  return "Multiple";
}

// ---------------------------------------------------------------------------
// Shared sub-components
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
// Props — discriminated union
// ---------------------------------------------------------------------------

/**
 * Passport variant: accepts a single `VisaPassportConfig`.
 * `variant` defaults to `"passport"` so the existing Passport page call
 * (`<CountryStandardCard config={...} href={...} />`) requires no modification.
 */
export interface PassportCardProps {
  variant?: "passport";
  /** Full passport config object. The card reads only what it displays. */
  config: VisaPassportConfig;
  /** Navigation destination, e.g. "/passport/us-passport". Supplied by parent. */
  href: string;
}

/**
 * Visa variant: accepts a country-level `CountryVisaConfig`.
 * Represents the whole country — never passes a single profile as the country.
 */
export interface VisaCardProps {
  variant: "visa";
  /** Full country-level visa config, containing one or more profiles. */
  config: CountryVisaConfig;
  /** Navigation destination, e.g. "/visa/india-visa". Supplied by parent. */
  href: string;
}

export type CountryStandardCardProps = PassportCardProps | VisaCardProps;

// ---------------------------------------------------------------------------
// Passport card render
// ---------------------------------------------------------------------------

function PassportCard({ config, href }: Required<Omit<PassportCardProps, "variant">>) {
  const countryName = config.country ?? config.title;
  const dimLabel = `${config.physical.widthMm} × ${config.physical.heightMm} mm`;

  return (
    <CardShell href={href}>
      {/* Country identity + standard title */}
      <div className="space-y-1">
        <div className="flex min-w-0 items-center gap-2">
          <FlagBadge countryCode={config.countryCode} countryName={countryName} />
          <h3
            className="truncate font-semibold text-ff-foreground transition-colors group-hover:text-brand-600"
            style={{
              fontSize: "var(--ff-text-body-size)",
              lineHeight: "var(--ff-text-body-height)",
            }}
          >
            {countryName}
          </h3>
        </div>

        {/* Standard title — shown as secondary when different from country name */}
        {config.country && config.country !== config.title && (
          <p
            className="truncate text-ff-foreground-secondary"
            style={{ fontSize: "var(--ff-text-small-size)" }}
          >
            {config.title}
          </p>
        )}
      </div>

      {/* Metadata tags + directional cue */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-wrap gap-1">
          <Tag>{dimLabel}</Tag>
          <Tag variant="brand">{channelLabel(config.channel)}</Tag>
          {config.applicableCategories && config.applicableCategories.length > 0 && (
            <Tag>{config.applicableCategories[0]}</Tag>
          )}
        </div>
        <CardChevron />
      </div>
    </CardShell>
  );
}

// ---------------------------------------------------------------------------
// Visa card render
// ---------------------------------------------------------------------------

function VisaCard({ config, href }: Omit<VisaCardProps, "variant">) {
  const countryName = config.country;
  const profileCount = config.profiles.length;
  // Aggregate channel across all profiles — never shows one profile's value as universal.
  const channelSummary = visaChannelSummary(config.profiles);

  return (
    <CardShell href={href}>
      {/* Country identity */}
      <div className="space-y-1">
        <div className="flex min-w-0 items-center gap-2">
          <FlagBadge countryCode={config.countryCode} countryName={countryName} />
          <h3
            className="truncate font-semibold text-ff-foreground transition-colors group-hover:text-brand-600"
            style={{
              fontSize: "var(--ff-text-body-size)",
              lineHeight: "var(--ff-text-body-height)",
            }}
          >
            {countryName}
          </h3>
        </div>

        {/* Profile count indicator — only when more than one profile exists */}
        {profileCount > 1 && (
          <p
            className="flex items-center gap-1 text-ff-foreground-secondary"
            style={{ fontSize: "var(--ff-text-small-size)" }}
          >
            <Layers
              aria-hidden="true"
              className="h-3 w-3 shrink-0 text-ff-foreground-muted"
            />
            {profileCount} visa profiles
          </p>
        )}
      </div>

      {/* Metadata tags + directional cue */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 flex-wrap gap-1">
          <Tag variant="brand">{channelSummary}</Tag>
        </div>
        <CardChevron />
      </div>
    </CardShell>
  );
}

// ---------------------------------------------------------------------------
// Public component
// ---------------------------------------------------------------------------

/**
 * Navigable directory card for a Passport standard or a Visa country destination.
 *
 * **Passport usage** (existing call pattern — no `variant` required):
 * ```tsx
 * <CountryStandardCard config={passportConfig} href="/passport/us-passport" />
 * ```
 *
 * **Visa usage** (requires explicit `variant="visa"` and a `CountryVisaConfig`):
 * ```tsx
 * <CountryStandardCard variant="visa" config={countryVisaConfig} href="/visa/india-visa" />
 * ```
 *
 * Design:
 * - White surface · 1px neutral border · 8–12px corner radius.
 * - FormFoto Blue for meaningful interaction emphasis only.
 * - No category colour themes, gradients, glows or 3D movement.
 * - Hover/focus states are restrained; decorative motion respects prefers-reduced-motion.
 * - No nested interactive elements inside the link.
 */
export default function CountryStandardCard(props: CountryStandardCardProps) {
  if (props.variant === "visa") {
    return <VisaCard config={props.config} href={props.href} />;
  }
  // variant === "passport" or omitted (default)
  return <PassportCard config={props.config} href={props.href} />;
}
