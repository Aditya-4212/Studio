"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { siteConfig } from "@/config/site";
import ThemeToggle from "@/components/ui/ThemeToggle";
import SearchModal from "@/components/ui/SearchModal";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[rgb(var(--bg))]/90 backdrop-blur-md border-b border-[rgb(var(--border))]"
          : "bg-transparent"
      }`}
    >
      <nav className="container-page flex h-16 sm:h-20 items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="font-display text-lg sm:text-xl font-semibold tracking-tight">
          {siteConfig.shortName}
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {siteConfig.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary-500 ${
                  pathname === item.href ? "text-primary-500" : "text-[rgb(var(--fg))]"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Search site"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[rgb(var(--border))] hover:bg-primary-50 dark:hover:bg-primary-100/10"
          >
            <Search className="h-4 w-4" />
          </button>
          <ThemeToggle />
          <Link href="/contact" className="btn-primary">
            Get in Touch
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[rgb(var(--border))]"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="md:hidden border-t border-[rgb(var(--border))] bg-[rgb(var(--bg))] animate-fade-in">
          <ul className="container-page flex flex-col py-4">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block py-3 text-base font-medium min-h-[44px] flex items-center ${
                    pathname === item.href ? "text-primary-500" : "text-[rgb(var(--fg))]"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link href="/contact" className="btn-primary w-full">
                Get in Touch
              </Link>
            </li>
          </ul>
        </div>
      )}

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </header>
  );
}
