import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Cpu, Target, Lock, ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About FormFoto — Independent Biometric Photo Formatting Utility",
  description:
    "Learn about FormFoto's mission: eliminating the KB Death Trap and ensuring strict biometric compliance for exam candidates and global travelers with 100% client-side privacy.",
};

export default function AboutPage() {
  return (
    <main className="w-full min-h-[calc(100vh-160px)] bg-ff-background text-ff-foreground">
      <div className="max-w-3xl mx-auto py-12 px-6">
        {/* Header */}
        <header className="mb-10 pb-8 border-b border-ff-border">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 border border-brand-200 mb-4">
            <ShieldCheck className="h-3.5 w-3.5 text-brand-600" />
            Institutional Architecture
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ff-foreground mb-4">
            About FormFoto
          </h1>
          <p className="text-base sm:text-lg text-ff-foreground-secondary leading-relaxed">
            Eliminating the &ldquo;KB Death Trap&rdquo; and achieving strict biometric compliance for examination aspirants and international travelers — engineered with 100% client-side privacy.
          </p>
        </header>

        {/* Content Sections */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-ff-foreground-secondary">
          {/* Mission */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-ff-foreground">
              Our Mission
            </h2>
            <p>
              Every year, millions of candidates applying for competitive public examinations (such as UPSC, SSC, NEET, IBPS, and state PSCs) and global travel documents (including US Visa DS-160, Schengen visas, and national passports) encounter arbitrary portal rejections.
            </p>
            <p>
              Government application portals enforce strict, non-negotiable upload parameters: exact pixel dimensions, stringent millimeter ratios, 70% to 80% facial coverage, and unforgiving file-size thresholds (often restricted between 10 KB and 50 KB). A candidate with an otherwise complete application can spend stressful hours wrestling with basic image editing tools or paying cyber cafes just to pass an automated upload validator.
            </p>
            <p>
              <strong>FormFoto was built to solve this challenge once and for all.</strong> We provide a free, institutional-grade formatting utility that calibrates photographs and signatures to exact official specifications in seconds.
            </p>
          </section>

          {/* The Zero-Server Guarantee */}
          <section className="space-y-4 rounded-xl border border-ff-border bg-ff-surface p-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ff-success-light text-ff-success-dark">
                <Lock className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-ff-foreground">
                  The Zero-Server Architecture
                </h3>
                <p className="text-xs text-ff-foreground-muted">
                  Client-side execution powered by modern Web APIs
                </p>
              </div>
            </div>
            <p className="text-sm text-ff-foreground-secondary">
              Most online image converters transmit your photograph to unverified remote servers where your personal image, biometric markers, and EXIF metadata may be logged or stored.
            </p>
            <p className="text-sm text-ff-foreground-secondary">
              FormFoto operates on a fundamentally different paradigm: <strong>100% client-side browser execution</strong>. When you upload a photo or signature, the binary data is processed directly inside your browser memory using HTML5 Canvas, modern WebGL, and WebAssembly pipelines. Your files never touch an external server, database, or cloud bucket.
            </p>
          </section>

          {/* Core Technical Capabilities */}
          <section className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-ff-foreground">
              Core Technical Capabilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-lg border border-ff-border bg-ff-surface space-y-2">
                <div className="flex items-center gap-2 text-brand-600 font-semibold text-sm">
                  <Target className="h-4 w-4" />
                  <span>Biometric Head Guides</span>
                </div>
                <p className="text-xs text-ff-foreground-muted leading-relaxed">
                  Interactive calibration overlays aligned with ICAO Annex 9 and consulate requirements for precise chin-to-crown ratios and eye level placement.
                </p>
              </div>

              <div className="p-4 rounded-lg border border-ff-border bg-ff-surface space-y-2">
                <div className="flex items-center gap-2 text-brand-600 font-semibold text-sm">
                  <Cpu className="h-4 w-4" />
                  <span>Deterministic KB Compression</span>
                </div>
                <p className="text-xs text-ff-foreground-muted leading-relaxed">
                  Algorithmic binary search compression guarantees your file fits comfortably under stringent size limits (e.g. &lt; 50 KB) without blocky degradation.
                </p>
              </div>

              <div className="p-4 rounded-lg border border-ff-border bg-ff-surface space-y-2">
                <div className="flex items-center gap-2 text-brand-600 font-semibold text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Exam Signature Processing</span>
                </div>
                <p className="text-xs text-ff-foreground-muted leading-relaxed">
                  Specialized contrast normalization and crop tools for signatures and thumb impressions on plain white paper.
                </p>
              </div>

              <div className="p-4 rounded-lg border border-ff-border bg-ff-surface space-y-2">
                <div className="flex items-center gap-2 text-brand-600 font-semibold text-sm">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Instant Verification Previews</span>
                </div>
                <p className="text-xs text-ff-foreground-muted leading-relaxed">
                  Real-time validation against width, height, aspect ratio, color space (sRGB), and output file size before you export.
                </p>
              </div>
            </div>
          </section>

          {/* Independence & Non-Affiliation */}
          <section className="space-y-4 rounded-lg border border-ff-border bg-ff-surface-subtle p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-ff-foreground">
              Independent Utility Notice
            </h3>
            <p className="text-xs text-ff-foreground-secondary leading-relaxed">
              FormFoto is an independent formatting tool developed to assist individuals, educators, and service kiosks. FormFoto is not affiliated with, endorsed by, or partnered with any government ministry, examination board (such as UPSC, NTA, or SSC), embassy, or consulate. All trademarked examination and visa names are the property of their respective governing bodies and are referenced strictly for nominative identification.
            </p>
          </section>

          {/* Directory Links CTA */}
          <section className="pt-6 border-t border-ff-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-ff-foreground">
                Ready to format your photo?
              </p>
              <p className="text-xs text-ff-foreground-muted">
                Explore our pre-configured specifications or manual editor.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/exam"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-brand-500 hover:bg-brand-600 text-white text-xs font-semibold transition-colors"
              >
                Exam Tools
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                href="/visa"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md border border-ff-border bg-ff-surface hover:bg-ff-surface-subtle text-ff-foreground text-xs font-semibold transition-colors"
              >
                Visa Tools
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
