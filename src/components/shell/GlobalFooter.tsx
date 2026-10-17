import Link from "next/link";

interface FooterLink {
  label: string;
  href: string;
}

const FOOTER_NAV_LINKS: FooterLink[] = [
  { label: "Home", href: "/" },
  { label: "Exams", href: "/exam" },
  { label: "Passports", href: "/passport" },
  { label: "Visas", href: "/visa" },
  { label: "Manual Editor", href: "/manual" },
];

export default function GlobalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="w-full bg-ff-surface border-t border-ff-border"
      role="contentinfo"
    >
      <div className="mx-auto max-w-[1200px] px-6 py-10 md:py-12">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 md:gap-12">
          {/* Brand & Privacy */}
          <div className="flex flex-col gap-3 max-w-md">
            <Link
              href="/"
              aria-label="FormFoto — go to home"
              className="inline-flex items-center gap-2 outline-none focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)] focus-visible:ring-offset-2 rounded-ff-sm w-fit"
            >
              <svg
                aria-hidden="true"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <circle cx="12" cy="12" r="10" fill="#315CEA" opacity="0.12" />
                <circle cx="12" cy="12" r="10" stroke="#315CEA" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="4.5" fill="#315CEA" />
                <line x1="12" y1="2" x2="12" y2="6" stroke="#315CEA" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="12" y1="18" x2="12" y2="22" stroke="#315CEA" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="2" y1="12" x2="6" y2="12" stroke="#315CEA" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="18" y1="12" x2="22" y2="12" stroke="#315CEA" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <span
                className="text-[15px] font-semibold tracking-tight text-ff-foreground"
                style={{ fontFamily: "var(--ff-font-sans)" }}
              >
                FormFoto
              </span>
            </Link>
            <p className="text-sm text-ff-foreground-secondary leading-relaxed">
              Photo resizing and formatting tool tailored for government examinations, passport standards, and visa requirements.
            </p>
            <p className="text-xs text-ff-foreground-muted leading-relaxed">
              Supported image processing runs directly in your browser without requiring a server upload.
            </p>
          </div>

          {/* Tool Navigation */}
          <nav aria-label="Tool navigation" className="flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-ff-foreground">
              Tools
            </span>
            <ul className="flex flex-col gap-2">
              {FOOTER_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block py-0.5 text-sm text-ff-foreground-secondary hover:text-brand-500 active:text-brand-600 rounded-ff-sm outline-none transition-colors duration-[var(--ff-duration-fast)] focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)] focus-visible:ring-offset-2"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-ff-border">
          <p className="text-xs text-ff-foreground-muted">
            &copy; {currentYear} FormFoto. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
