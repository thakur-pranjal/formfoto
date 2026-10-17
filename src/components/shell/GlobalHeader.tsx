"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

// ---------------------------------------------------------------------------
// Navigation definition
// ---------------------------------------------------------------------------

interface NavItem {
  label: string;
  href: string;
  /** Path prefix that activates this item (matches href and all sub-routes). */
  segment: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "Exams",     href: "/exam",     segment: "/exam"     },
  { label: "Passports", href: "/passport", segment: "/passport" },
  { label: "Visas",     href: "/visa",     segment: "/visa"     },
  { label: "Manual",    href: "/manual",   segment: "/manual"   },
];

// ---------------------------------------------------------------------------
// Active-route matching
// Matches the segment exactly (e.g. "/exam") OR any path that starts with
// the segment followed by "/" (e.g. "/exam/upsc_cse").
// This prevents "/exam" from matching "/examination" (naive substring match).
// ---------------------------------------------------------------------------

function isActive(pathname: string, segment: string): boolean {
  return pathname === segment || pathname.startsWith(segment + "/");
}

// ---------------------------------------------------------------------------
// NavLink — individual navigation link with active state
// ---------------------------------------------------------------------------

interface NavLinkProps {
  item: NavItem;
  pathname: string;
  onClick?: () => void;
  /** "desktop" renders a compact inline link; "mobile" renders a full-width block */
  variant: "desktop" | "mobile";
}

function NavLink({ item, pathname, onClick, variant }: NavLinkProps) {
  const active = isActive(pathname, item.segment);

  if (variant === "desktop") {
    return (
      <Link
        href={item.href}
        onClick={onClick}
        aria-current={active ? "page" : undefined}
        className={[
          // Base
          "relative inline-flex items-center px-1 py-0.5 text-sm font-medium",
          "rounded-ff-sm outline-none",
          "transition-colors duration-[var(--ff-duration-fast)]",
          // Focus-visible ring using our token values
          "focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)] focus-visible:ring-offset-2",
          // Active vs. default colours
          active
            ? "text-brand-500 font-semibold"
            : "text-ff-foreground-secondary hover:text-ff-foreground",
        ].join(" ")}
      >
        {item.label}
        {/* Active underline bar — visually distinguishes active state beyond color alone */}
        {active && (
          <span
            aria-hidden="true"
            className="absolute -bottom-[13px] left-0 right-0 h-[2px] rounded-full bg-brand-500"
          />
        )}
      </Link>
    );
  }

  // Mobile variant
  return (
    <Link
      href={item.href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={[
        "flex w-full items-center px-4 py-3 text-base font-medium rounded-ff-md",
        "outline-none transition-colors duration-[var(--ff-duration-fast)]",
        "focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)] focus-visible:ring-offset-2",
        active
          ? "bg-ff-background text-brand-500 font-semibold"
          : "text-ff-foreground hover:bg-ff-background",
      ].join(" ")}
    >
      {/* Active indicator stripe on left edge */}
      {active && (
        <span
          aria-hidden="true"
          className="mr-3 h-5 w-0.5 shrink-0 rounded-full bg-brand-500"
        />
      )}
      {item.label}
    </Link>
  );
}

// ---------------------------------------------------------------------------
// GlobalHeader
// ---------------------------------------------------------------------------

export default function GlobalHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  // Close menu on route change (covers link clicks and browser navigation)
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Close on Escape key; trap nothing — we just dismiss
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeMenu();
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [menuOpen, closeMenu]);

  // Close when clicking outside the menu
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target as Node) &&
        !toggleRef.current?.contains(e.target as Node)
      ) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen, closeMenu]);

  const menuId = "global-nav-menu";

  return (
    <header
      className="w-full bg-ff-surface border-b border-ff-border"
      role="banner"
    >
      <div
        className="mx-auto flex h-14 max-w-[1200px] items-center justify-between px-6"
      >
        {/* ----------------------------------------------------------------
            Wordmark
        ---------------------------------------------------------------- */}
        <Link
          href="/"
          aria-label="FormFoto — go to home"
          className={[
            "flex items-center gap-2 outline-none",
            "focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)] focus-visible:ring-offset-2 rounded-ff-sm",
          ].join(" ")}
        >
          {/* Camera-aperture SVG mark — inline, no external asset needed */}
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
            <line x1="12" y1="2" x2="12" y2="6"  stroke="#315CEA" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="12" y1="18" x2="12" y2="22" stroke="#315CEA" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="2"  y1="12" x2="6"  y2="12" stroke="#315CEA" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="18" y1="12" x2="22" y2="12" stroke="#315CEA" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span
            className="text-[15px] font-semibold tracking-tight text-ff-foreground"
            style={{ fontFamily: "var(--ff-font-sans)" }}
          >
            FormFoto
          </span>
        </Link>

        {/* ----------------------------------------------------------------
            Desktop navigation — hidden below md breakpoint
        ---------------------------------------------------------------- */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-6"
        >
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              pathname={pathname}
              variant="desktop"
            />
          ))}
        </nav>

        {/* ----------------------------------------------------------------
            Mobile menu toggle — hidden above md breakpoint
        ---------------------------------------------------------------- */}
        <button
          ref={toggleRef}
          type="button"
          aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={menuOpen}
          aria-controls={menuId}
          onClick={() => setMenuOpen((prev) => !prev)}
          className={[
            "md:hidden flex items-center justify-center w-9 h-9 rounded-ff-md",
            "text-ff-foreground-secondary hover:text-ff-foreground",
            "hover:bg-ff-background",
            "outline-none focus-visible:ring-2 focus-visible:ring-[var(--ff-focus-color)] focus-visible:ring-offset-2",
            "transition-colors duration-[var(--ff-duration-fast)]",
          ].join(" ")}
        >
          {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {/* ------------------------------------------------------------------
          Mobile dropdown menu
          Uses CSS max-height transition for open/close.
          Respects prefers-reduced-motion via the motion-safe Tailwind variant.
      ------------------------------------------------------------------ */}
      <div
        id={menuId}
        ref={menuRef}
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
        className={[
          "md:hidden overflow-hidden",
          "border-t border-ff-border",
          "bg-ff-surface",
          // Height transition — collapses when closed
          menuOpen ? "max-h-80" : "max-h-0",
          "motion-safe:transition-[max-height] motion-safe:duration-200 motion-safe:ease-out",
        ].join(" ")}
      >
        <div className="flex flex-col gap-1 px-3 py-3">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              item={item}
              pathname={pathname}
              variant="mobile"
              onClick={closeMenu}
            />
          ))}
        </div>
      </div>
    </header>
  );
}
