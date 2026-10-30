import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck, Lock, EyeOff, ServerOff, HardDrive, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — Zero Server Uploads & Client-Side Guarantee | FormFoto",
  description:
    "FormFoto privacy policy: 100% browser-based photo processing. Zero server uploads, no facial biometric harvesting, and complete user data sovereignty.",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="w-full min-h-[calc(100vh-160px)] bg-ff-background text-ff-foreground">
      <div className="max-w-3xl mx-auto py-12 px-6">
        {/* Header */}
        <header className="mb-10 pb-8 border-b border-ff-border">
          <div className="inline-flex items-center gap-2 rounded-full bg-ff-success-light px-3 py-1 text-xs font-semibold text-ff-success-dark border border-ff-success/20 mb-4">
            <Lock className="h-3.5 w-3.5 text-ff-success" />
            Zero-Server Upload Guarantee
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-ff-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-ff-foreground-muted">
            Effective Date: October 2026 · Version 2.0
          </p>
        </header>

        {/* Executive Summary Callout */}
        <div className="mb-10 rounded-xl border border-ff-border bg-ff-surface p-6 shadow-sm space-y-3">
          <div className="flex items-center gap-2.5 text-ff-success-dark font-bold text-base">
            <ShieldCheck className="h-5 w-5 text-ff-success" />
            <span>The FormFoto Privacy Promise: Your Photos Never Leave Your Device</span>
          </div>
          <p className="text-sm text-ff-foreground-secondary leading-relaxed">
            FormFoto was specifically engineered around a <strong>Zero-Knowledge, Zero-Server architecture</strong>. When you resize, crop, or compress a photograph, signature, or thumb impression, the binary image file is processed exclusively in your device&apos;s local browser memory. <strong>We do not upload, transmit, view, log, or store your photos on any server or cloud database.</strong>
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-10 text-sm sm:text-base leading-relaxed text-ff-foreground-secondary">
          {/* Section 1: Client-Side Processing Architecture */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-ff-foreground font-bold text-lg sm:text-xl">
              <ServerOff className="h-5 w-5 text-brand-600" />
              <h2>1. Zero-Server Processing Architecture</h2>
            </div>
            <p>
              Traditional online image converters upload your files to remote backends, manipulate them on a server cluster, and return a download link. This creates severe privacy vulnerabilities, including unauthorized data retention, metadata logging, and potential surveillance risks.
            </p>
            <p>
              FormFoto eliminates this risk entirely by using modern client-side Web Standards:
            </p>
            <ul className="space-y-2.5 pt-1 pl-2">
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-ff-success shrink-0 mt-0.5" />
                <span>
                  <strong>HTML5 Canvas &amp; WebGL:</strong> Image scaling, biometric bounding guides, cropping, and contrast normalization execute directly on your local GPU/CPU.
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-ff-success shrink-0 mt-0.5" />
                <span>
                  <strong>WebAssembly (WASM):</strong> Deterministic binary compression algorithms operate within an isolated, sandboxed browser execution environment.
                </span>
              </li>
              <li className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-ff-success shrink-0 mt-0.5" />
                <span>
                  <strong>Volatile Memory Lifecycle:</strong> Your image data resides exclusively in volatile RAM. As soon as you navigate away, clear the workspace, or close the browser tab, the memory is instantly reclaimed by browser garbage collection.
                </span>
              </li>
            </ul>
          </section>

          {/* Section 2: Data We Do NOT Collect */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-ff-foreground font-bold text-lg sm:text-xl">
              <EyeOff className="h-5 w-5 text-brand-600" />
              <h2>2. Information We Never Collect</h2>
            </div>
            <p>Because of our privacy-first design, we have no access to:</p>
            <div className="rounded-lg border border-ff-border bg-ff-surface p-4 space-y-2 text-sm">
              <p>• <strong>Biometric Images:</strong> Facial photos, passport pictures, signatures, or thumbprints.</p>
              <p>• <strong>Biometric Identifiers:</strong> Facial measurements, inter-pupillary distances, or facial geometry.</p>
              <p>• <strong>Metadata (EXIF):</strong> GPS coordinates, capture timestamps, or camera serial numbers embedded in uploaded images.</p>
              <p>• <strong>User Accounts:</strong> No sign-up, email registration, password, or profile information is ever requested.</p>
            </div>
          </section>

          {/* Section 3: Information We Collect */}
          <section className="space-y-4">
            <div className="flex items-center gap-2 text-ff-foreground font-bold text-lg sm:text-xl">
              <HardDrive className="h-5 w-5 text-brand-600" />
              <h2>3. Minimal Technical &amp; Operational Data</h2>
            </div>
            <p>
              To maintain service reliability and understand overall platform traffic, we collect minimal, non-personally identifiable operational telemetry:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm">
              <li>
                <strong>Aggregated Web Analytics:</strong> We use privacy-preserving analytics (such as Vercel Web Analytics) that do not collect IP addresses, do not set tracking cookies, and do not track users across websites.
              </li>
              <li>
                <strong>Client Diagnostics:</strong> Standard technical metrics such as browser family, screen resolution, and aggregated error rates to ensure compatibility across older mobile devices and desktop computers.
              </li>
            </ul>
          </section>

          {/* Section 4: Cookies and Local Storage */}
          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-ff-foreground">
              4. Cookies &amp; Local Storage Usage
            </h2>
            <p>
              FormFoto does not use advertising cookies, third-party marketing beacons, or cross-site tracking scripts.
            </p>
            <p>
              We may utilize your browser&apos;s local storage (<code>localStorage</code> / <code>sessionStorage</code>) strictly for persistent client preferences — such as saving your recently selected exam preset or theme choice. This information remains solely on your personal computer and is never sent back to FormFoto.
            </p>
          </section>

          {/* Section 5: International Compliance & Rights */}
          <section className="space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-ff-foreground">
              5. Global Privacy Compliance (GDPR, CCPA, DPDP)
            </h2>
            <p>
              FormFoto adheres to the principle of <em>Data Minimization by Design</em>. Because we do not ingest, store, or process personal data on our servers:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-sm">
              <li>There is no database containing your personal information that could be leaked, subpoenaed, or breached.</li>
              <li>You do not need to submit &ldquo;Right to be Forgotten&rdquo; or deletion requests, as your files are deleted from client RAM the moment your session ends.</li>
              <li>We never sell, rent, monetize, or trade your data with data brokers or AI model training datasets.</li>
            </ul>
          </section>

          {/* Section 6: Inquiries */}
          <section className="space-y-4 pt-4 border-t border-ff-border">
            <h2 className="text-lg sm:text-xl font-bold text-ff-foreground">
              6. Privacy Inquiries &amp; Contact
            </h2>
            <p className="text-sm">
              If you have any questions regarding FormFoto&apos;s architecture, client-side cryptography, or privacy practices, please contact our team:
            </p>
            <div className="p-4 rounded-lg bg-ff-surface border border-ff-border text-sm">
              <p className="font-semibold text-ff-foreground">FormFoto Data Privacy Officer</p>
              <p className="text-ff-foreground-muted">Email: <a href="mailto:formfotohq@outlook.com" className="text-brand-600 hover:underline">formfotohq@outlook.com</a></p>
              <p className="text-ff-foreground-muted">General Contact: <Link href="/contact" className="text-brand-600 hover:underline">Contact Form</Link></p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
