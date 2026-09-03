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
    accent: "blue",
    cta: "Launch Tool",
  },
  {
    href: "/passport",
    icon: BookOpen,
    label: "Passport Photos",
    badge: "Biometric ICAO",
    description:
      "ICAO-compliant biometric passport photos for 50+ countries. Background removal included.",
    accent: "emerald",
    cta: "Launch Tool",
  },
  {
    href: "/visa",
    icon: Compass,
    label: "Visa Photos",
    badge: "e-Visa & Print",
    description:
      "US Visa (2×2), Schengen, and e-Visa standards. Print-ready and embassy-approved formats.",
    accent: "amber",
    cta: "Launch Tool",
  },
  {
    href: "/manual",
    icon: Sliders,
    label: "Pro Manual",
    badge: "Custom Canvas",
    description:
      "Complete control over pixels, aspect ratio, and KB compression. For custom requirements.",
    accent: "purple",
    cta: "Open Workspace",
  },
] as const;

type Accent = (typeof CATEGORIES)[number]["accent"];

const accentClasses: Record<
  Accent,
  { border: string; bg: string; shadow: string; icon: string; text: string; label: string }
> = {
  blue: {
    border: "hover:border-blue-500/50",
    bg: "hover:bg-blue-900/10",
    shadow: "hover:shadow-blue-900/20",
    icon: "bg-blue-500/20 text-blue-300",
    text: "text-blue-400",
    label: "group-hover:text-blue-300",
  },
  emerald: {
    border: "hover:border-emerald-500/50",
    bg: "hover:bg-emerald-900/10",
    shadow: "hover:shadow-emerald-900/20",
    icon: "bg-emerald-500/20 text-emerald-300",
    text: "text-emerald-400",
    label: "group-hover:text-emerald-300",
  },
  amber: {
    border: "hover:border-amber-500/50",
    bg: "hover:bg-amber-900/10",
    shadow: "hover:shadow-amber-900/20",
    icon: "bg-amber-500/20 text-amber-300",
    text: "text-amber-400",
    label: "group-hover:text-amber-300",
  },
  purple: {
    border: "hover:border-purple-500/50",
    bg: "hover:bg-purple-900/10",
    shadow: "hover:shadow-purple-900/20",
    icon: "bg-purple-500/20 text-purple-300",
    text: "text-purple-400",
    label: "group-hover:text-purple-300",
  },
};

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(59,130,246,0.15),_rgba(15,23,42,0)_60%)]" />

      <div className="relative mx-auto flex max-w-6xl min-h-screen flex-col items-center justify-center px-6 py-20">

        {/* Hero Section */}
        <div className="mb-16 space-y-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/60 backdrop-blur-md">
            <span>FormFoto • Suite v2.0</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl">
            What do you need <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
              to resize today?
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-white/50">
            Secure client-side processing for every official requirement. No uploads, no storage, just results.
          </p>
        </div>

        {/* Card Grid */}
        <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map(({ href, icon: Icon, label, badge, description, accent, cta }) => {
            const cls = accentClasses[accent];
            return (
              <Link
                key={href}
                href={href}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 transition-all ${cls.border} ${cls.bg} hover:shadow-2xl ${cls.shadow}`}
              >
                <div className="mb-8 space-y-4">
                  <div className={`flex h-14 w-14 items-center justify-center rounded-2xl ${cls.icon} shadow-inner transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  <div>
                    <h2 className={`text-2xl font-bold text-white transition-colors ${cls.label}`}>
                      {label}
                    </h2>
                    <span className={`mt-1 inline-block rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-xs font-medium ${cls.text}`}>
                      {badge}
                    </span>
                  </div>
                  <p className="text-sm leading-relaxed text-white/60">{description}</p>
                </div>
                <div className={`flex items-center text-sm font-semibold ${cls.text} transition-all group-hover:gap-2`}>
                  {cta} <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </Link>
            );
          })}
        </div>

        <footer className="absolute bottom-6 text-center text-xs uppercase tracking-widest text-white/20">
          FormFoto SaaS • Privacy First
        </footer>
      </div>
    </main>
  );
}
