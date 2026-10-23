"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import type { Project } from "@/types";

const emptyForm = {
  title: "",
  slug: "",
  category: "",
  summary: "",
  description: "",
  coverImage: "",
  gallery: "",
  client: "",
  featured: false,
  order: 0,
};

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    const res = await fetch("/api/portfolio");
    if (res.ok) setProjects(await res.json());
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

  function openEdit(project: Project) {
    setEditingId(project.id);
    setForm({
      title: project.title,
      slug: project.slug,
      category: project.category,
      summary: project.summary,
      description: project.description,
      coverImage: project.coverImage,
      gallery: project.gallery.join(", "),
      client: project.client || "",
      featured: project.featured,
      order: project.order,
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
      gallery: form.gallery.split(",").map((g) => g.trim()).filter(Boolean),
      order: Number(form.order),
    };

    const res = await fetch(editingId ? `/api/portfolio/${editingId}` : "/api/portfolio", {
      method: editingId ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setError("Please check the form fields (image fields need full URLs) and try again.");
      setSaving(false);
      return;
    }

    setOpen(false);
    setSaving(false);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this project?")) return;
    setProjects((prev) => prev.filter((p) => p.id !== id));
    await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
  }

  return (
    <div>
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-[rgb(var(--fg))]">Portfolio</h1>
          <p className="text-sm text-[rgb(var(--muted))] mt-1">
            Manage projects shown in your portfolio. Use hosted image URLs (e.g. from Unsplash, Cloudinary, or S3).
          </p>
        </div>
        <button onClick={openCreate} className="btn-primary text-sm">
          <Plus className="h-4 w-4" /> Add Project
        </button>
      </div>

      <div className="mt-6 space-y-3">
        {loading && <p className="text-sm text-[rgb(var(--muted))]">Loading…</p>}
        {!loading && projects.length === 0 && (
          <p className="text-sm text-[rgb(var(--muted))]">No projects yet — add your first one.</p>
        )}
        {projects.map((project) => (
          <div key={project.id} className="card p-5 flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-[rgb(var(--fg))]">{project.title}</p>
              <p className="text-xs text-primary-500 mt-0.5">{project.category}</p>
              <p className="text-sm text-[rgb(var(--muted))] mt-1 line-clamp-2">{project.summary}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button onClick={() => openEdit(project)} className="btn-ghost p-2" aria-label={`Edit ${project.title}`}>
                <Pencil className="h-4 w-4" />
              </button>
              <button
                onClick={() => remove(project.id)}
                className="btn-ghost p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10"
                aria-label={`Delete ${project.title}`}
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={open} onClose={() => setOpen(false)} title={editingId ? "Edit Project" : "Add Project"}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Title</label>
              <input required className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Slug</label>
              <input
                required
                pattern="[a-z0-9-]+"
                className="input"
                value={form.slug}
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Category</label>
            <input
              required
              className="input"
              placeholder="Web Design, Branding, Mobile App..."
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Summary (short, for cards)</label>
            <input required className="input" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Full Description</label>
            <textarea
              required
              rows={4}
              className="input resize-none"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Cover Image URL</label>
            <input
              required
              type="url"
              className="input"
              placeholder="https://..."
              value={form.coverImage}
              onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Gallery Image URLs (comma-separated)</label>
            <input className="input" value={form.gallery} onChange={(e) => setForm({ ...form, gallery: e.target.value })} />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Client (optional)</label>
            <input className="input" value={form.client} onChange={(e) => setForm({ ...form, client: e.target.value })} />
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
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
            {saving ? "Saving…" : editingId ? "Save Changes" : "Add Project"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
