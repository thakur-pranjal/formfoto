import type { Metadata } from "next";
import Link from "next/link";
import {
  Mail,
  FileCheck,
  Wrench,
  Building2,
  Clock,
  ArrowRight,
  GraduationCap,
  BookCheck,
  IdCard,
  FileCog,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Support — FormFoto",
  description:
    "Contact FormFoto support: report updated exam or visa photo specifications, request technical support, or inquire about cyber cafe and kiosk integrations.",
};

const INQUIRY_CATEGORIES = [
  {
    icon: FileCheck,
    title: "Report an Updated Specification",
    badge: "Community Curation",
    description:
      "Did an examination authority or embassy update their notification? Send us the official PDF notice or link, and our team will verify and calibrate the preset within 24 hours.",
    subject: "Specification Update Report",
  },
  {
    icon: Wrench,
    title: "Technical Support & Diagnostics",
    badge: "Client-Side Help",
    description:
      "Having trouble with browser canvas export, mobile touch-crop gestures, or high-DPI scaling? Share your device and browser details so we can assist.",
    subject: "Technical Support Request",
  },
  {
    icon: Building2,
    title: "Cyber Cafe & Kiosk Inquiries",
    badge: "High-Volume Operators",
    description:
      "Operating a cyber cafe, photography studio, or CSC student center processing hundreds of candidate applications daily? Ask about our workflow recommendations.",
    subject: "Cyber Cafe / Kiosk Inquiry",
  },
];

const DIRECTORY_LINKS = [
  { label: "Exam Photo Tools", href: "/exam", icon: GraduationCap },
  { label: "Passport Standards", href: "/passport", icon: BookCheck },
  { label: "Visa Standards", href: "/visa", icon: IdCard },
  { label: "Pro Manual Editor", href: "/manual", icon: FileCog },
];

export default function ContactPage() {
  return (
    <main className="w-full min-h-[calc(100vh-160px)] bg-ff-background text-ff-foreground">
      <div className="max-w-3xl mx-auto py-12 px-6">
        {/* Header */}
        <header className="mb-10 pb-8 border-b border-ff-border">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 border border-brand-200 mb-4">
            <Mail className="h-3.5 w-3.5 text-brand-600" />
            Support &amp; Community
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ff-foreground mb-4">
            Contact &amp; Support
          </h1>
          <p className="text-base sm:text-lg text-ff-foreground-secondary leading-relaxed">
            We are dedicated to keeping FormFoto accurate, rapid, and 100% private. Reach out to report specification changes, request technical assistance, or discuss kiosk workflows.
          </p>
        </header>

        {/* Primary Support Email Card */}
        <div className="mb-10 rounded-xl border border-brand-200 bg-brand-50/50 p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-700">
                Official Helpdesk
              </span>
              <h2 className="text-2xl font-black text-ff-foreground tracking-tight">
                formfotohq@outlook.com
              </h2>
              <div className="flex items-center gap-2 text-xs text-ff-foreground-muted">
                <Clock className="h-3.5 w-3.5 text-ff-foreground-muted" />
                <span>Response time: Typically within 24 to 48 hours</span>
              </div>
            </div>
            <a
              href="mailto:formfotohq@outlook.com?subject=FormFoto%20General%20Inquiry"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-brand-500 hover:bg-brand-600 text-white font-semibold text-sm transition-colors shadow-sm shrink-0"
            >
              <Mail className="h-4 w-4" />
              <span>Send Email</span>
            </a>
          </div>
        </div>

        {/* Inquiry Categories */}
        <section className="mb-12 space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-ff-foreground">
            How Can We Help You?
          </h2>
          <div className="space-y-4">
            {INQUIRY_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              return (
                <div
                  key={cat.title}
                  className="rounded-xl border border-ff-border bg-ff-surface p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-start justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-50 text-brand-600 border border-brand-100">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-ff-foreground">
                          {cat.title}
                        </h3>
                        <span className="rounded-full bg-ff-surface-subtle px-2.5 py-0.5 text-[10px] font-semibold text-ff-foreground-secondary border border-ff-border">
                          {cat.badge}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-ff-foreground-secondary leading-relaxed">
                        {cat.description}
                      </p>
                    </div>
                  </div>
                  <a
                    href={`mailto:formfotohq@outlook.com?subject=${encodeURIComponent(cat.subject)}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 hover:underline shrink-0 sm:self-center"
                  >
                    Email about this
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick Directory Links */}
        <section className="pt-8 border-t border-ff-border space-y-4">
          <div>
            <h2 className="text-lg font-bold text-ff-foreground">
              Return to FormFoto Tooling
            </h2>
            <p className="text-xs text-ff-foreground-muted">
              Select any category below to immediately format photographs with zero server uploads:
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DIRECTORY_LINKS.map((dir) => {
              const Icon = dir.icon;
              return (
                <Link
                  key={dir.href}
                  href={dir.href}
                  className="group flex items-center justify-between p-3.5 rounded-lg border border-ff-border bg-ff-surface hover:bg-ff-surface-subtle hover:border-brand-300 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-50 text-brand-600">
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-sm font-semibold text-ff-foreground group-hover:text-brand-600 transition-colors">
                      {dir.label}
                    </span>
                  </div>
                  <ArrowRight className="h-4 w-4 text-ff-foreground-muted group-hover:text-brand-600 transition-colors" />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
