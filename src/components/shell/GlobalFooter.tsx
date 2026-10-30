import Link from "next/link";
import { Focus } from "lucide-react";

interface FooterLink {
  label: string;
  href: string;
}

const TOOL_LINKS: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Exam Photo Tools", href: "/exam" },
  { label: "Passport Standards", href: "/passport" },
  { label: "Visa Standards", href: "/visa" },
  { label: "Pro Manual Editor", href: "/manual" },
];

const POPULAR_STANDARDS: FooterLink[] = [
  { label: "US Visa DS-160", href: "/visa/us-visa" },
  { label: "Schengen Visa", href: "/visa/schengen-visa" },
  { label: "India Visa & OCI", href: "/visa/india-visa" },
  { label: "US Passport", href: "/passport/us-passport" },
  { label: "UPSC CSE Photo", href: "/exam/upsc_cse" },
  { label: "NEET UG Photo", href: "/exam/neet_ug" },
];

const COMPANY_LEGAL_LINKS: FooterLink[] = [
  { label: "About FormFoto", href: "/about" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms of Service", href: "/terms" },
  { label: "Contact & Support", href: "/contact" },
  { label: "XML Sitemap", href: "/sitemap.xml" },
];

export default function GlobalFooter() {
  return (
    <footer
      className="w-full bg-ff-surface border-t border-ff-border"
      role="contentinfo"
    >
      <div className="mx-auto max-w-ff-content-max px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Column 1: Brand & Privacy Guarantee */}
          <div className="flex flex-col gap-3 lg:col-span-4">
            <Link
              className="group flex items-center gap-3 transition-opacity hover:opacity-90 outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-lg w-fit"
              href="/"
              aria-label="FormFoto — go to home"
            >
              {/* The Heavy App Mark - 40px box with 26px inner icon (65% fill ratio) */}
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-gradient-to-b from-brand-500 to-brand-600 text-white shadow-sm ring-1 ring-brand-700/20 transition-transform duration-[180ms] group-hover:scale-105">
                <Focus className="h-[26px] w-[26px]" strokeWidth={2.5} />
              </div>
              {/* The Heavy Wordmark */}
              <span className="text-[24px] font-extrabold tracking-tighter text-ff-foreground">
                Form<span className="text-brand-600">Foto</span>
              </span>
            </Link>
            <p className="text-sm text-ff-foreground-secondary leading-relaxed">
              Precision photo resizing, biometric calibration, and KB compression tailored for government examinations, passport standards, and global visa requirements.
            </p>
            <div>
              <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-ff-success-light px-3 py-1 text-xs font-medium text-ff-success-dark border border-ff-success/20">
                <span className="h-2 w-2 rounded-full bg-ff-success"></span>
                100% Browser Processing · Zero Server Uploads
              </div>
            </div>
          </div>

          {/* Column 2: Tools */}
          <nav aria-label="Tools navigation" className="flex flex-col gap-3 lg:col-span-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-ff-foreground">
              Tools
            </span>
            <ul className="flex flex-col gap-2">
              {TOOL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-0.5 text-sm text-ff-foreground-secondary hover:text-brand-600 active:text-brand-700 rounded-ff-sm outline-none transition-colors duration-[var(--ff-duration-fast)] focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)] focus-visible:ring-offset-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 3: Popular Standards */}
          <nav aria-label="Popular standards navigation" className="flex flex-col gap-3 lg:col-span-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-ff-foreground">
              Popular Standards
            </span>
            <ul className="flex flex-col gap-2">
              {POPULAR_STANDARDS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-0.5 text-sm text-ff-foreground-secondary hover:text-brand-600 active:text-brand-700 rounded-ff-sm outline-none transition-colors duration-[var(--ff-duration-fast)] focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)] focus-visible:ring-offset-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Column 4: Company & Legal */}
          <nav aria-label="Company and legal navigation" className="flex flex-col gap-3 lg:col-span-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-ff-foreground">
              Company & Legal
            </span>
            <ul className="flex flex-col gap-2">
              {COMPANY_LEGAL_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-0.5 text-sm text-ff-foreground-secondary hover:text-brand-600 active:text-brand-700 rounded-ff-sm outline-none transition-colors duration-[var(--ff-duration-fast)] focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)] focus-visible:ring-offset-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="mailto:formfotohq@outlook.com"
                  className="inline-block py-0.5 text-sm text-ff-foreground-secondary hover:text-brand-600 active:text-brand-700 rounded-ff-sm outline-none transition-colors duration-[var(--ff-duration-fast)] focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)] focus-visible:ring-offset-2"
                >
                  formfotohq@outlook.com
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Column 5: Bottom Legal & Disclaimer Bar */}
        <div className="mt-12 pt-8 border-t border-ff-border">
          <p className="text-xs text-ff-foreground-muted leading-relaxed mb-4">
            Disclaimer: FormFoto is an independent biometric formatting utility and is not affiliated with, endorsed by, or connected to any government agency, embassy, consulate, or examination authority. While our specifications are verified against official publications, final acceptance of any photograph or document rests solely with the reviewing authority.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ff-foreground-muted">
            <p>&copy; 2026 FormFoto. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="hover:text-brand-600 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)] rounded-ff-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-brand-600 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)] rounded-ff-sm"
              >
                Terms of Service
              </Link>
              <Link
                href="/contact"
                className="hover:text-brand-600 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)] rounded-ff-sm"
              >
                Contact
              </Link>
              <a
                href="mailto:formfotohq@outlook.com"
                className="hover:text-brand-600 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)] rounded-ff-sm"
              >
                formfotohq@outlook.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
