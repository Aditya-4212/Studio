"use client";

import Link from "next/link";
import { useState } from "react";
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  }

  return (
    <footer className="border-t border-[rgb(var(--border))] bg-[rgb(var(--card))]">
      <div className="container-page py-14 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="font-display text-lg font-semibold">{siteConfig.shortName}</h3>
          <p className="mt-3 text-sm text-[rgb(var(--muted))] leading-relaxed max-w-xs">
            {siteConfig.tagline}
          </p>
          <div className="mt-5 flex gap-3">
            {[
              { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
              { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
              { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
              { icon: Twitter, href: siteConfig.social.twitter, label: "Twitter" },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgb(var(--border))] hover:bg-primary-50 dark:hover:bg-primary-100/10"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-sm text-[rgb(var(--muted))] hover:text-primary-500">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h4 className="text-sm font-semibold mb-4">Contact</h4>
          <ul className="space-y-3 text-sm text-[rgb(var(--muted))]">
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{siteConfig.contact.address}</span>
            </li>
            <li className="flex gap-2 items-center">
              <Phone className="h-4 w-4 shrink-0" />
              <a href={`tel:${siteConfig.contact.phone}`} className="hover:text-primary-500">
                {siteConfig.contact.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-2 items-center">
              <Mail className="h-4 w-4 shrink-0" />
              <a href={`mailto:${siteConfig.contact.email}`} className="hover:text-primary-500">
                {siteConfig.contact.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold mb-4">Stay Updated</h4>
          <p className="text-sm text-[rgb(var(--muted))] mb-3">
            Get occasional updates on our work and insights. No spam.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              className="input"
            />
            <button type="submit" disabled={status === "loading"} className="btn-primary px-4 shrink-0">
              Join
            </button>
          </form>
          {status === "success" && (
            <p className="mt-2 text-xs text-primary-600 dark:text-primary-400">Thanks for subscribing!</p>
          )}
          {status === "error" && <p className="mt-2 text-xs text-red-500">Something went wrong.</p>}
        </div>
      </div>

      <div className="border-t border-[rgb(var(--border))]">
        <div className="container-page py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[rgb(var(--muted))]">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <div className="flex gap-5">
            <Link href="/privacy-policy" className="hover:text-primary-500">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-primary-500">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
