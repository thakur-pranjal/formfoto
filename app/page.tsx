import type { Metadata } from "next";
import Link from "next/link";
import { GraduationCap, BookOpen, Compass, Sliders, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "FormFoto — Photo Resizer for Exams, Passports & Visas",
  description:
    "Free, instant, client-side photo resizer for government exams (UPSC, SSC, NEET), passport photos, and visa applications. No uploads. No server. Just results.",
  openGraph: {
    title: "FormFoto — Photo Resizer Suite",
    description:
      "Resize and compress photos for UPSC, SSC, NEET, passport, or visa — entirely in your browser.",
    type: "website",
  },
};

const CATEGORIES = [
  {
    href: "/exam",
    icon: GraduationCap,
    label: "Exams & Govt",
    badge: "85+ Standards",
    description:
      "Tailored for UPSC, SSC, NEET, and IBPS. Includes signature compressor and date stamping tools.",
    cta: "Launch Tool",
  },
  {
    href: "/passport",
    icon: BookOpen,
    label: "Passport Photos",
    badge: "Biometric ICAO",
    description:
      "Country-specific biometric passport standards following ICAO specifications. Background removal included.",
    cta: "Launch Tool",
  },
  {
    href: "/visa",
    icon: Compass,
    label: "Visa Photos",
    badge: "e-Visa & Print",
    description:
      "US Visa (2×2), Schengen, and e-Visa standards. Visa-specific digital and print formats, where supported.",
    cta: "Launch Tool",
  },
  {
    href: "/manual",
    icon: Sliders,
    label: "Pro Manual",
    badge: "Custom Canvas",
    description:
      "Complete control over pixels, aspect ratio, and KB compression. For custom requirements.",
    cta: "Open Workspace",
  },
] as const;

export default function Home() {
  return (
    <main className="w-full bg-ff-background text-ff-foreground">
      <div className="mx-auto max-w-[1200px] px-6 pt-8 pb-12 sm:pt-10 sm:pb-16 lg:pt-12 lg:pb-20">
        {/* Hero Section */}
        <section className="mx-auto max-w-2xl text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 rounded-ff-pill border border-ff-border bg-ff-surface px-3 py-1 text-xs font-medium text-ff-foreground-secondary shadow-ff-sm mb-3 sm:mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
            <span>Photo Compliance Utility</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-semibold tracking-tight text-ff-foreground leading-tight sm:leading-[1.15] mb-3 sm:mb-3.5">
            Your photo. The right specifications.
          </h1>

          <p className="text-base sm:text-lg leading-relaxed text-ff-foreground-secondary">
            Prepare photos for exams, passports, and visas with the dimensions and requirements each application needs.
          </p>
        </section>

        {/* Tools Section */}
        <section aria-labelledby="tools-heading">
          <div className="mb-3.5 sm:mb-4">
            <h2
              id="tools-heading"
              className="text-xs font-semibold uppercase tracking-wider text-ff-foreground-muted"
            >
              Available tools
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {CATEGORIES.map(({ href, icon: Icon, label, badge, description, cta }) => (
              <Link
                key={href}
                href={href}
                className="group flex flex-col justify-between rounded-ff-lg border border-ff-border bg-ff-surface p-5 sm:p-6 shadow-none hover:shadow-ff-md hover:border-ff-border-strong active:bg-ff-surface-subtle motion-safe:hover:-translate-y-0.5 motion-safe:active:translate-y-0 transition-[border-color,box-shadow,transform,background-color] duration-[var(--ff-duration-normal)] ease-[var(--ff-ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)] focus-visible:ring-offset-2"
              >
                <div className="flex flex-col gap-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-ff-md border border-ff-border bg-ff-surface-subtle text-ff-foreground group-hover:border-brand-200 group-hover:bg-brand-50 group-hover:text-brand-500 transition-colors duration-[var(--ff-duration-fast)]">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                    </div>
                    <span className="rounded-ff-pill border border-ff-border bg-ff-surface-subtle px-2.5 py-0.5 text-xs font-medium text-ff-foreground-muted">
                      {badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base sm:text-lg font-semibold tracking-tight text-ff-foreground group-hover:text-brand-600 transition-colors duration-[var(--ff-duration-fast)]">
                      {label}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-ff-foreground-secondary">
                      {description}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex items-center text-sm font-medium text-brand-500 group-hover:text-brand-600">
                  <span>{cta}</span>
                  <ArrowRight
                    className="ml-1.5 h-4 w-4 motion-safe:transition-transform motion-safe:duration-[var(--ff-duration-fast)] motion-safe:group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
