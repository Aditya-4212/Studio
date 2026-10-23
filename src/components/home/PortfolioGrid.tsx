"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import type { Project } from "@/types";

export default function PortfolioGrid({ projects }: { projects: Project[] }) {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(projects.map((p) => p.category)))],
    [projects]
  );
  const [active, setActive] = useState("All");

  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  if (projects.length === 0) {
    return <p className="text-center text-[rgb(var(--muted))]">No projects published yet — check back soon.</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 justify-center mb-10" role="tablist" aria-label="Filter projects by category">
        {categories.map((category) => (
          <button
            key={category}
            role="tab"
            aria-selected={active === category}
            onClick={() => setActive(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors min-h-[40px] ${
              active === category
                ? "bg-primary-500 text-white"
                : "border border-[rgb(var(--border))] text-[rgb(var(--fg))] hover:bg-primary-50 dark:hover:bg-primary-100/10"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((project, i) => (
          <Reveal key={project.id} delay={(i % 6) * 0.05}>
            <Link href={`/portfolio/${project.slug}`} className="card group block overflow-hidden h-full">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.coverImage}
                  alt={project.title}
                  fill
                  loading="lazy"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute top-4 left-4 rounded-full bg-white/90 dark:bg-black/70 px-3 py-1 text-xs font-medium">
                  {project.category}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-semibold text-[rgb(var(--fg))] flex items-center justify-between">
                  {project.title}
                  <ArrowUpRight className="h-4 w-4 text-primary-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="mt-2 text-sm text-[rgb(var(--muted))] line-clamp-2">{project.summary}</p>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
