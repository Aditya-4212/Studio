"use client";

import { useEffect, useState } from "react";
import { Trash2, CheckCircle, Mail, Phone } from "lucide-react";
import type { Inquiry } from "@/types";

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "new" | "contacted" | "archived">("all");

  async function load() {
    setLoading(true);
    const res = await fetch("/api/inquiries");
    if (res.ok) setInquiries(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  async function updateStatus(id: string, status: string) {
    setInquiries((prev) => prev.map((i) => (i.id === id ? { ...i, status: status as Inquiry["status"] } : i)));
    await fetch(`/api/inquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  async function remove(id: string) {
    if (!confirm("Delete this inquiry? This cannot be undone.")) return;
    setInquiries((prev) => prev.filter((i) => i.id !== id));
    await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
  }

  const filtered = filter === "all" ? inquiries : inquiries.filter((i) => i.status === filter);

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[rgb(var(--fg))]">Inquiries</h1>
      <p className="text-sm text-[rgb(var(--muted))] mt-1">Messages submitted through your contact form.</p>

      <div className="mt-5 flex gap-2">
        {(["all", "new", "contacted", "archived"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium capitalize ${
              filter === f ? "bg-primary-500 text-white" : "border border-[rgb(var(--border))]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {loading && <p className="text-sm text-[rgb(var(--muted))]">Loading…</p>}
        {!loading && filtered.length === 0 && (
          <p className="text-sm text-[rgb(var(--muted))]">No inquiries in this view.</p>
        )}
        {filtered.map((inquiry) => (
          <div key={inquiry.id} className="card p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-[rgb(var(--fg))]">{inquiry.name}</p>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-[rgb(var(--muted))]">
                  <a href={`mailto:${inquiry.email}`} className="flex items-center gap-1.5 hover:text-primary-500">
                    <Mail className="h-3.5 w-3.5" /> {inquiry.email}
                  </a>
                  {inquiry.phone && (
                    <a href={`tel:${inquiry.phone}`} className="flex items-center gap-1.5 hover:text-primary-500">
                      <Phone className="h-3.5 w-3.5" /> {inquiry.phone}
                    </a>
                  )}
                </div>
              </div>
              <span className="text-xs text-[rgb(var(--muted))]">
                {new Date(inquiry.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
              </span>
            </div>
            <p className="mt-3 text-sm font-medium text-[rgb(var(--fg))]">{inquiry.subject}</p>
            <p className="mt-1 text-sm text-[rgb(var(--muted))] leading-relaxed">{inquiry.message}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {inquiry.status !== "contacted" && (
                <button
                  onClick={() => updateStatus(inquiry.id, "contacted")}
                  className="btn-outline text-xs px-3 py-1.5"
                >
                  <CheckCircle className="h-3.5 w-3.5" /> Mark Contacted
                </button>
              )}
              {inquiry.status !== "archived" && (
                <button
                  onClick={() => updateStatus(inquiry.id, "archived")}
                  className="btn-ghost text-xs px-3 py-1.5"
                >
                  Archive
                </button>
              )}
              <button
                onClick={() => remove(inquiry.id)}
                className="btn-ghost text-xs px-3 py-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
