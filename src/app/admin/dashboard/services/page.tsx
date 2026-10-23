"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import type { Service } from "@/types";

const emptyForm = {
  title: "",
  slug: "",
  description: "",
  icon: "Sparkles",
  price: "",
  features: "",
  featured: false,
  order: 0,
};

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/services");
    if (res.ok) setServices(await res.json());
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

  function openEdit(service: Service) {
    setEditingId(service.id);
    setForm({
      title: service.title,
      slug: service.slug,
      description: service.description,
      icon: service.icon,
      price: service.price || "",
      features: service.features.join(", "),
      featured: service.featured,
      order: service.order,
    });
    setError(null);
    setOpen(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload = {
      ...form,
      features: form.features.split(",").map((f) => f.trim()).filter(Boolean),
      order: Number(form.order),
    };

    const res = await fetch(editingId ? `/api/services/${editingId}` : "/api/services", {
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
    if (!confirm("Delete this service?")) return;
    setServices((prev) => prev.filter((s) => s.id !== id));
    await fetch(`/api/services/${id}`, { method: "DELETE" });
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-[rgb(var(--fg))]">Services</h1>
          <p className="text-sm text-[rgb(var(--muted))] mt-1">Manage the services shown on your website.</p>
        </div>
        <button onClick={openCreate} className="btn-primary text-sm">
          <Plus className="h-4 w-4" /> Add Service
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {loading && <p className="text-sm text-[rgb(var(--muted))]">Loading…</p>}
        {!loading && services.length === 0 && (
          <p className="text-sm text-[rgb(var(--muted))]">No services yet — add your first one.</p>
        )}
        {services.map((service) => (
          <div key={service.id} className="card p-5 flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-[rgb(var(--fg))]">{service.title}</p>
              <p className="text-sm text-[rgb(var(--muted))] mt-1 line-clamp-2">{service.description}</p>
              {service.price && <p className="text-xs text-primary-500 mt-2">{service.price}</p>}
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(service)} className="btn-ghost p-2" aria-label={`Edit ${service.title}`}>
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => remove(service.id)}
                className="btn-ghost p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                aria-label={`Delete ${service.title}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editingId ? "Edit Service" : "Add Service"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Title</label>
            <input
              required
              className="input"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Slug (URL-safe, e.g. brand-strategy)</label>
            <input
              required
              pattern="[a-z0-9-]+"
              className="input"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Description</label>
            <textarea
              required
              rows={3}
              className="input resize-none"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Icon (lucide name)</label>
              <input
                className="input"
                placeholder="Sparkles, Code2, Palette..."
                value={form.icon}
                onChange={(e) => setForm({ ...form, icon: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Price (optional)</label>
              <input
                className="input"
                placeholder="Starting at $499"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Features (comma-separated)</label>
            <input
              className="input"
              placeholder="Strategy workshop, Brand guidelines, Launch support"
              value={form.features}
              onChange={(e) => setForm({ ...form, features: e.target.value })}
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
            {saving ? "Saving…" : editingId ? "Save Changes" : "Add Service"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
