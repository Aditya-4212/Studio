"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import StarRating from "@/components/ui/StarRating";
import type { Testimonial } from "@/types";

const emptyForm = {
  name: "",
  role: "",
  company: "",
  avatar: "",
  rating: 5,
  message: "",
  featured: false,
  order: 0,
};

export default function AdminTestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/testimonials");
    if (res.ok) setTestimonials(await res.json());
    setLoading(false);
  }

  useEffect(() => {
    load();
  }, []);

  function openCreate() {
    setEditingId(null);
    setForm(emptyForm);
    setError(null);
    setOpen(true);
  }

  function openEdit(t: Testimonial) {
    setEditingId(t.id);
    setForm({
      name: t.name,
      role: t.role || "",
      company: t.company || "",
      avatar: t.avatar || "",
      rating: t.rating,
      message: t.message,
      featured: t.featured,
      order: t.order,
    });
    setError(null);
    setOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = { ...form, rating: Number(form.rating), order: Number(form.order) };

    const res = await fetch(editingId ? `/api/testimonials/${editingId}` : "/api/testimonials", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setError("Please check the form fields and try again.");
      setSaving(false);
      return;
    }

    setOpen(false);
    setSaving(false);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this testimonial?")) return;
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-[rgb(var(--fg))]">Testimonials</h1>
          <p className="text-sm text-[rgb(var(--muted))] mt-1">Manage customer reviews shown on your website.</p>
        </div>
        <button onClick={openCreate} className="btn-primary text-sm">
          <Plus className="h-4 w-4" /> Add Testimonial
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {loading && <p className="text-sm text-[rgb(var(--muted))]">Loading…</p>}
        {!loading && testimonials.length === 0 && (
          <p className="text-sm text-[rgb(var(--muted))]">No testimonials yet — add your first one.</p>
        )}
        {testimonials.map((t) => (
          <div key={t.id} className="card p-5 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-[rgb(var(--fg))]">{t.name}</p>
                <StarRating rating={t.rating} />
              </div>
              <p className="text-xs text-[rgb(var(--muted))] mt-0.5">
                {[t.role, t.company].filter(Boolean).join(" · ")}
              </p>
              <p className="text-sm text-[rgb(var(--muted))] mt-2 line-clamp-2">&ldquo;{t.message}&rdquo;</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(t)} className="btn-ghost p-2" aria-label={`Edit ${t.name}`}>
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => remove(t.id)}
                className="btn-ghost p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                aria-label={`Delete ${t.name}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editingId ? "Edit Testimonial" : "Add Testimonial"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Name</label>
              <input
                required
                className="input"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Rating (1–5)</label>
              <input
                type="number"
                min={1}
                max={5}
                className="input"
                value={form.rating}
                onChange={(e) => setForm({ ...form, rating: Number(e.target.value) })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Role (optional)</label>
              <input
                className="input"
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Company (optional)</label>
              <input
                className="input"
                value={form.company}
                onChange={(e) => setForm({ ...form, company: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Avatar URL (optional)</label>
            <input
              className="input"
              placeholder="https://..."
              value={form.avatar}
              onChange={(e) => setForm({ ...form, avatar: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Message</label>
            <textarea
              required
              rows={3}
              className="input resize-none"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm">
              Order
              <input
                type="number"
                className="input w-20"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: Number(e.target.value) })}
              />
            </label>
          </div>
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="submit" disabled={saving} className="btn-primary w-full">
            {saving ? "Saving…" : editingId ? "Save Changes" : "Add Testimonial"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
