import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Project } from "@/types";

export default function FeaturedWork({ projects }: { projects: Project[] }) {
  const items = projects.slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section className="section bg-primary-50/40 dark:bg-primary-100/[0.03]">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our Work"
          title="Recent projects we're proud of"
          description="A look at how we've helped businesses like yours ship better products, faster."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.05}>
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
        <div className="mt-10 text-center">
          <Link href="/portfolio" className="btn-primary">
            View Full Portfolio <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
