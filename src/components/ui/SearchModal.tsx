"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Search, X } from "lucide-react";

type Result = { title: string; href: string; type: string };

export default function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setResults([]);
    }
  }, [open]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }
    setLoading(true);
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [query]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site search"
      className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 p-4 pt-24"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl bg-[rgb(var(--card))] shadow-soft overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-[rgb(var(--border))] px-4">
          <Search className="h-5 w-5 text-[rgb(var(--muted))]" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search services, projects, pages..."
            className="flex-1 bg-transparent py-4 text-sm outline-none"
          />
          <button onClick={onClose} aria-label="Close search">
            <X className="h-5 w-5 text-[rgb(var(--muted))]" />
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {loading && <p className="px-3 py-3 text-sm text-[rgb(var(--muted))]">Searching…</p>}
          {!loading && query.length >= 2 && results.length === 0 && (
            <p className="px-3 py-3 text-sm text-[rgb(var(--muted))]">No results found.</p>
          )}
          {results.map((r) => (
            <Link
              key={r.href + r.title}
              href={r.href}
              onClick={onClose}
              className="flex items-center justify-between rounded-xl px-3 py-3 hover:bg-primary-50 dark:hover:bg-primary-100/10"
            >
              <span className="text-sm font-medium">{r.title}</span>
              <span className="text-xs text-[rgb(var(--muted))]">{r.type}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
