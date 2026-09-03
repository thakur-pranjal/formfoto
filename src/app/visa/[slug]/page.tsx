import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { visaStandards, getVisaConfigById } from "@/config/visas";
import PhotoEditor from "@/components/PhotoEditor";
import { Shield, CalendarDays, Ruler } from "lucide-react";

// ── Static generation ─────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return visaStandards.map((config) => ({ slug: config.id }));
}

// ── SEO ───────────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const config = getVisaConfigById(slug);
  if (!config) return {};

  return {
    title: config.seo.metaTitle,
    description: config.seo.metaDescription,
    keywords: config.seo.keywords,
    openGraph: {
      title: config.seo.metaTitle,
      description: config.seo.metaDescription,
      type: "website",
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function VisaSpokePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const config = getVisaConfigById(slug);

  if (!config) notFound();

  const dimLabel = `${config.physical.widthMm} × ${config.physical.heightMm} mm`;
  const dpiLabel = `${config.physical.targetDpi} DPI`;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-16 text-white sm:px-6 sm:py-24">
      <div className="mx-auto max-w-6xl space-y-10">

        {/* ── Breadcrumb ── */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-slate-500">
          <a href="/" className="hover:text-slate-300 transition-colors">Home</a>
          <span>/</span>
          <a href="/visa" className="hover:text-slate-300 transition-colors">Visa</a>
          <span>/</span>
          <span className="text-slate-300">{config.title}</span>
        </nav>

        {/* ── Page Header ── */}
        <header className="space-y-5">
          {/* Edition pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-emerald-300">
            <span aria-hidden>✈️</span> Visa Edition
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              {config.title}
            </span>
          </h1>

          {/* Meta badges row */}
          <div className="flex flex-wrap gap-3">
            {/* Official Authority badge */}
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-emerald-700/40 bg-emerald-900/20 px-3 py-1.5 text-xs font-semibold text-emerald-300">
              <Shield className="h-3.5 w-3.5" aria-hidden />
              {config.sourceVerification.authority}
            </div>

            {/* Dimensions */}
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700/60 bg-slate-800/50 px-3 py-1.5 text-xs text-slate-300">
              <Ruler className="h-3.5 w-3.5" aria-hidden />
              {dimLabel} · {dpiLabel}
            </div>

            {/* Verification date */}
            <div className="inline-flex items-center gap-1.5 rounded-xl border border-slate-700/60 bg-slate-800/50 px-3 py-1.5 text-xs text-slate-400">
              <CalendarDays className="h-3.5 w-3.5" aria-hidden />
              Verified {config.sourceVerification.lastVerifiedDate}
            </div>

            {/* Channel */}
            <div className="inline-flex items-center rounded-xl border border-slate-700/50 bg-slate-800/40 px-3 py-1.5 text-xs text-slate-400 capitalize">
              {config.channel.replace("_", " ")}
            </div>

            {/* Applicable categories */}
            {config.applicableCategories?.map((cat) => (
              <span
                key={cat}
                className="rounded-xl border border-slate-700/40 bg-slate-800/30 px-3 py-1.5 text-xs text-slate-500"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="max-w-3xl text-sm leading-relaxed text-slate-400">
            {config.sourceVerification.disclaimer}{" "}
            <a
              href={config.sourceVerification.officialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 underline underline-offset-2 hover:text-emerald-300 transition-colors"
            >
              Official source ↗
            </a>
          </p>
        </header>

        {/* ── Photo Editor ── */}
        <section className="relative z-10" aria-label="Photo editor">
          <PhotoEditor mode="passport" />
        </section>

        {/* ── Specs Summary ── */}
        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-label="Specification details">
          {/* Physical specs */}
          <div className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-5 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Physical Print</h2>
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Dimensions</dt>
                <dd className="font-medium text-slate-200">{dimLabel}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Resolution</dt>
                <dd className="font-medium text-slate-200">{dpiLabel}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Paper</dt>
                <dd className="font-medium text-slate-200 capitalize">{config.physical.paperFinish}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Print sheet</dt>
                <dd className="font-medium text-slate-200">{config.physical.printSheetSize}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Copies required</dt>
                <dd className="font-medium text-slate-200">{config.physical.copiesRequired}</dd>
              </div>
            </dl>
          </div>

          {/* Digital specs */}
          {config.digital && (
            <div className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-5 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Digital Upload</h2>
              <dl className="space-y-1.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-slate-500">Min size</dt>
                  <dd className="font-medium text-slate-200">
                    {config.digital.minWidthPx} × {config.digital.minHeightPx} px
                  </dd>
                </div>
                {(config.digital.minKb || config.digital.maxKb) && (
                  <div className="flex justify-between">
                    <dt className="text-slate-500">File size</dt>
                    <dd className="font-medium text-slate-200">
                      {config.digital.minKb ?? "—"} – {config.digital.maxKb ?? "—"} KB
                    </dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-slate-500">Formats</dt>
                  <dd className="font-medium text-slate-200">{config.digital.allowedFormats.join(", ")}</dd>
                </div>
                {config.digital.colorSpace && (
                  <div className="flex justify-between">
                    <dt className="text-slate-500">Color space</dt>
                    <dd className="font-medium text-slate-200">{config.digital.colorSpace}</dd>
                  </div>
                )}
              </dl>
            </div>
          )}

          {/* Biometrics */}
          <div className="rounded-2xl border border-slate-700/60 bg-slate-800/40 p-5 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Biometrics</h2>
            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-slate-500">Head ratio</dt>
                <dd className="font-medium text-slate-200">
                  {Math.round(config.biometrics.headRatioMin * 100)}–{Math.round(config.biometrics.headRatioMax * 100)}%
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Background</dt>
                <dd className="font-medium text-slate-200">{config.background.label}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Glasses</dt>
                <dd className={`font-medium ${config.biometrics.glassesAllowed ? "text-emerald-400" : "text-red-400"}`}>
                  {config.biometrics.glassesAllowed ? "Allowed" : "Not allowed"}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-500">Smile</dt>
                <dd className={`font-medium ${config.biometrics.smileAllowed ? "text-emerald-400" : "text-red-400"}`}>
                  {config.biometrics.smileAllowed ? "Allowed" : "Not allowed"}
                </dd>
              </div>
            </dl>
          </div>
        </section>

      </div>
    </main>
  );
}
