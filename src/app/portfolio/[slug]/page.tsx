import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Calendar, Building2 } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Reveal from "@/components/ui/Reveal";
import Lightbox from "@/components/ui/Lightbox";

export const revalidate = 60;

async function getProject(slug: string) {
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) return null;
  return {
    ...project,
    gallery: JSON.parse(project.gallery || "[]") as string[],
    completedAt: project.completedAt?.toISOString() ?? null,
  };
}

export async function generateStaticParams() {
  const projects = await prisma.project.findMany({ select: { slug: true } });
  return projects.map((p: (typeof projects)[number]) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const project = await getProject(params.slug);
  if (!project) return { title: "Project Not Found" };

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.summary,
      images: [{ url: project.coverImage }],
    },
  };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug);
  if (!project) notFound();

  const related = await prisma.project.findMany({
    where: { category: project.category, NOT: { id: project.id } },
    take: 3,
  });

  return (
    <article className="section pt-10 sm:pt-14">
      <div className="container-page max-w-4xl">
        <Link href="/portfolio" className="inline-flex items-center gap-2 text-sm text-primary-500 hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to Portfolio
        </Link>

        <Reveal>
          <span className="eyebrow mt-6 inline-block">{project.category}</span>
          <h1 className="mt-3 text-3xl sm:text-4xl font-semibold text-[rgb(var(--fg))]">{project.title}</h1>
          <div className="mt-4 flex flex-wrap gap-6 text-sm text-[rgb(var(--muted))]">
            {project.client && (
              <span className="flex items-center gap-2">
                <Building2 className="h-4 w-4" /> {project.client}
              </span>
            )}
            {project.completedAt && (
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {new Date(project.completedAt).toLocaleDateString("en-US", { year: "numeric", month: "long" })}
              </span>
            )}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl shadow-soft">
          <Image src={project.coverImage} alt={project.title} fill priority sizes="100vw" className="object-cover" />
        </Reveal>

        <Reveal delay={0.15} className="mt-10 prose-container">
          <p className="text-lg text-[rgb(var(--muted))] leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        </Reveal>

        {project.gallery.length > 0 && (
          <Reveal delay={0.2} className="mt-10">
            <h2 className="text-xl font-semibold text-[rgb(var(--fg))] mb-4">Gallery</h2>
            <Lightbox images={project.gallery} alt={project.title} />
          </Reveal>
        )}

        <Reveal delay={0.25} className="mt-14 card bg-primary-500 text-white p-8 sm:p-10 text-center rounded-3xl">
          <h2 className="text-2xl font-semibold">Have a similar project in mind?</h2>
          <p className="mt-3 text-primary-50/90">Let&apos;s talk about how we can help.</p>
          <Link href="/contact" className="btn mt-6 bg-white text-primary-600 hover:bg-primary-50 inline-flex">
            Start a Conversation <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="text-xl font-semibold text-[rgb(var(--fg))] mb-6">More {project.category} Projects</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {related.map((r: (typeof related)[number]) => (
                <Link key={r.id} href={`/portfolio/${r.slug}`} className="card overflow-hidden group">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={r.coverImage}
                      alt={r.title}
                      fill
                      loading="lazy"
                      sizes="33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <p className="p-4 font-medium text-sm">{r.title}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
