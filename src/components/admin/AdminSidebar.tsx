"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Inbox,
  Briefcase,
  ImageIcon,
  MessageSquareQuote,
  LogOut,
  Globe,
} from "lucide-react";

const links = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/dashboard/inquiries", label: "Inquiries", icon: Inbox },
  { href: "/admin/dashboard/services", label: "Services", icon: Briefcase },
  { href: "/admin/dashboard/portfolio", label: "Portfolio", icon: ImageIcon },
  { href: "/admin/dashboard/testimonials", label: "Testimonials", icon: MessageSquareQuote },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full sm:w-64 shrink-0 border-r border-[rgb(var(--border))] bg-[rgb(var(--card))] sm:min-h-screen">
      <div className="p-6">
        <p className="font-display font-semibold text-lg">Admin Dashboard</p>
      </div>
      <nav className="px-3 space-y-1">
        {links.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
              pathname === href
                ? "bg-primary-500 text-white"
                : "text-[rgb(var(--fg))] hover:bg-primary-50 dark:hover:bg-primary-100/10"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
      </nav>
      <div className="px-3 mt-6 space-y-1 border-t border-[rgb(var(--border))] pt-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-[rgb(var(--fg))] hover:bg-primary-50 dark:hover:bg-primary-100/10"
        >
          <Globe className="h-4 w-4" /> View Site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
        >
          <LogOut className="h-4 w-4" /> Sign Out
        </button>
      </div>
    </aside>
  );
}
