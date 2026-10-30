import type { Metadata } from "next";
import Link from "next/link";
import { Scale, AlertTriangle, ShieldCheck, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service — Independent Formatting Utility | FormFoto",
  description:
    "Terms of service for FormFoto. Permitted use, independent government non-affiliation disclaimer, and user verification responsibilities.",
};

export default function TermsOfServicePage() {
  return (
    <main className="w-full min-h-[calc(100vh-160px)] bg-ff-background text-ff-foreground">
      <div className="max-w-3xl mx-auto py-12 px-6">
        {/* Header */}
        <header className="mb-10 pb-8 border-b border-ff-border">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 border border-brand-200 mb-4">
            <Scale className="h-3.5 w-3.5 text-brand-600" />
            Legal Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ff-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-ff-foreground-muted">
            Last Updated: October 2026 · Version 2.0
          </p>
        </header>

        {/* Essential Notice Callout */}
        <div className="mb-10 rounded-xl border border-ff-warning/30 bg-ff-warning-light/30 p-6 space-y-3">
          <div className="flex items-center gap-2 text-ff-warning-dark font-bold text-base">
            <AlertTriangle className="h-5 w-5 text-ff-warning" />
            <span>Essential Notice: Independent Utility &amp; Verification Duty</span>
          </div>
          <p className="text-sm text-ff-foreground-secondary leading-relaxed">
            FormFoto is an independent client-side formatting tool. We are <strong>not affiliated with or endorsed by any government entity, embassy, or examination commission</strong>. You are solely responsible for reviewing and verifying your final formatted output against the official notification of your target authority prior to submission.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-ff-foreground-secondary">
          {/* Section 1: Acceptance */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-ff-foreground">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing, browsing, or utilizing the FormFoto website, tools, or associated utilities (collectively, the &ldquo;Service&rdquo;), you acknowledge that you have read, understood, and agreed to be legally bound by these Terms of Service. If you do not agree with any part of these terms, you must refrain from using the Service.
            </p>
          </section>

          {/* Section 2: Permitted Use */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-ff-foreground">
              2. Permitted Use &amp; License
            </h2>
            <p>
              FormFoto grants you a non-exclusive, non-transferable, revocable license to use the Service for the following permitted purposes:
            </p>
            <ul className="space-y-2 pl-2">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" />
                <span><strong>Personal Use:</strong> Individuals formatting photos or signatures for examination applications, visa requests, or passport renewals.</span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-brand-600 shrink-0 mt-0.5" />
                <span><strong>Commercial Kiosk &amp; Studio Use:</strong> Internet cafe operators, photo studios, educational counselors, and cyber cafes assisting clients with document preparation.</span>
              </li>
            </ul>
            <p className="pt-2 text-sm">
              You agree not to modify, reverse-engineer, decompile, launch automated scraping bots against, or intentionally overburden the hosting infrastructure of the Service.
            </p>
          </section>

          {/* Section 3: Government Non-Affiliation */}
          <section className="space-y-4 rounded-lg border border-ff-border bg-ff-surface p-5">
            <div className="flex items-center gap-2 text-ff-foreground font-bold text-base sm:text-lg">
              <ShieldCheck className="h-5 w-5 text-brand-600" />
              <h3>3. Independent Utility &amp; Non-Affiliation Disclaimer</h3>
            </div>
            <p className="text-sm text-ff-foreground-secondary">
              FormFoto is an entirely independent software utility developed and operated privately. FormFoto is <strong>not</strong> an official website or accredited agent of:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-ff-foreground-secondary">
              <li>Any national government, state ministry, or public department;</li>
              <li>Any examination authority, including but not limited to UPSC, SSC, NTA (NEET/JEE), IBPS, or State PSCs;</li>
              <li>Any diplomatic mission, embassy, consulate, or visa processing partner (e.g., VFS Global, BLS, US Travel Docs).</li>
            </ul>
            <p className="text-xs text-ff-foreground-muted">
              All references to specific examinations, visas, or passport guidelines are provided under nominative fair use to describe formatting compatibility and presets.
            </p>
          </section>

          {/* Section 4: No Guarantee of Portal Acceptance */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-ff-foreground">
              4. No Guarantee of Official Acceptance
            </h2>
            <p>
              While FormFoto curates dimensions, aspect ratios, file size boundaries, and compression parameters based on publicly released official notices:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm">
              <li>Government authorities frequently modify or update portal guidelines, DPI requirements, background tint allowances, or validation scripts without notice.</li>
              <li>The quality, lighting, posture, eye alignment, and expression of the original photograph uploaded by the user are outside our control.</li>
              <li><strong>Final acceptance or rejection of any photograph, signature, or document rests solely with the reviewing consular officer, admission committee, or government authority.</strong></li>
            </ul>
            <p className="text-sm">
              You explicitly agree that you are solely responsible for verifying the output file (including dimensions, DPI, file size, and visual clarity) against your official notification before final submission.
            </p>
          </section>

          {/* Section 5: Intellectual Property */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-ff-foreground font-bold text-lg">
              <FileText className="h-5 w-5 text-brand-600" />
              <h2>5. Intellectual Property &amp; User Content</h2>
            </div>
            <p>
              <strong>Your Images Belong to You:</strong> You retain complete ownership, copyright, and all intellectual property rights in any photographs, signatures, or digital graphics you upload or export through FormFoto. FormFoto claims zero rights, licenses, or ownership over your personal images.
            </p>
            <p>
              <strong>Platform Property:</strong> The FormFoto name, logo, site architecture, layout, source code, visual components, algorithms, and documentation are the exclusive intellectual property of FormFoto and are protected by applicable intellectual property laws.
            </p>
          </section>

          {/* Section 6: Limitation of Liability */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-ff-foreground">
              6. Limitation of Liability
            </h2>
            <p className="text-sm">
              To the fullest extent permitted by applicable law, FormFoto, its founders, and contributors shall not be liable for any direct, indirect, incidental, consequential, or punitive damages arising from:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-ff-foreground-muted">
              <li>Any rejection, disqualification, or delay of an examination application or visa filing;</li>
              <li>Any discrepancy between FormFoto presets and sudden government rule amendments;</li>
              <li>Data loss or corruption occurring on the user&apos;s personal device or local browser storage;</li>
              <li>Inability to access the Service due to network outages, maintenance, or host interruptions.</li>
            </ul>
            <p className="text-xs uppercase font-medium text-ff-foreground-muted">
              The service is provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, whether express or implied.
            </p>
          </section>

          {/* Section 7: Amendments & Termination */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-ff-foreground">
              7. Amendments &amp; Termination
            </h2>
            <p className="text-sm">
              We reserve the right to revise or replace these Terms at any time. Continued use of FormFoto following the posting of any revisions constitutes full acceptance of the updated terms.
            </p>
          </section>

          {/* Section 8: Contact */}
          <section className="space-y-3 pt-4 border-t border-ff-border">
            <h2 className="text-lg sm:text-xl font-bold text-ff-foreground">
              8. Contact Information
            </h2>
            <p className="text-sm">
              For questions regarding these Terms of Service or to report specification inconsistencies, please contact:
            </p>
            <div className="p-4 rounded-lg bg-ff-surface border border-ff-border text-sm">
              <p className="font-semibold text-ff-foreground">FormFoto Legal &amp; Compliance Team</p>
              <p className="text-ff-foreground-muted">Email: <a href="mailto:formfotohq@outlook.com" className="text-brand-600 hover:underline">formfotohq@outlook.com</a></p>
              <p className="text-ff-foreground-muted">Inquiry Desk: <Link href="/contact" className="text-brand-600 hover:underline">Contact Form</Link></p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
