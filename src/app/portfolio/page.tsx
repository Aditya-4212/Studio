import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import PortfolioGrid from "@/components/home/PortfolioGrid";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Browse our completed projects across strategy, design, and engineering.",
  alternates: { canonical: "/portfolio" },
};

export const revalidate = 60;

export default async function PortfolioPage() {
  const rawProjects = await prisma.project.findMany({ orderBy: { order: "asc" } });
  const projects = rawProjects.map((p: (typeof rawProjects)[number]) => ({
    ...p,
    gallery: JSON.parse(p.gallery || "[]") as string[],
    completedAt: p.completedAt?.toISOString() ?? null,
  }));

  return (
    <>
      <section className="section pt-12 sm:pt-16 pb-10">
        <div className="container-page max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow mb-3">Our Work</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[rgb(var(--fg))]">
              Projects that speak for themselves
            </h1>
            <p className="mt-5 text-lg text-[rgb(var(--muted))] leading-relaxed">
              A selection of the work we&apos;re proudest of, across industries and disciplines.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-page">
          <PortfolioGrid projects={projects} />
        </div>
      </section>
    </>
  );
}
