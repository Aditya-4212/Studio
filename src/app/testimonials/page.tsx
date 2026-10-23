import type { Metadata } from "next";
import Image from "next/image";
import { Quote } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Reveal from "@/components/ui/Reveal";
import StarRating from "@/components/ui/StarRating";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Read what our clients have to say about working with us.",
  alternates: { canonical: "/testimonials" },
};

export const revalidate = 60;

const clientLogos = [
  "Northwind", "Initech", "Globex", "Umbrella Co.", "Hooli", "Stark Industries",
];

export default async function TestimonialsPage() {
  const testimonials = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });
  const avgRating =
    testimonials.length > 0
      ? (testimonials.reduce((sum: number, t: (typeof testimonials)[number]) => sum + t.rating, 0) / testimonials.length).toFixed(1)
      : "5.0";

  return (
    <>
      <section className="section pt-12 sm:pt-16 pb-10">
        <div className="container-page max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow mb-3">Testimonials</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[rgb(var(--fg))]">
              Trusted by teams who value great work
            </h1>
            <div className="mt-5 flex items-center justify-center gap-3">
              <StarRating rating={Math.round(Number(avgRating))} />
              <span className="text-sm text-[rgb(var(--muted))]">
                {avgRating} average from {testimonials.length || "dozens of"} clients
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-page">
          {testimonials.length === 0 ? (
            <p className="text-center text-[rgb(var(--muted))]">Testimonials coming soon.</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t: (typeof testimonials)[number], i: number) => (
                <Reveal key={t.id} delay={(i % 6) * 0.05}>
                  <div className="card p-7 h-full flex flex-col">
                    <Quote className="h-8 w-8 text-primary-300" />
                    <p className="mt-4 text-[rgb(var(--fg))] leading-relaxed flex-1">&ldquo;{t.message}&rdquo;</p>
                    <div className="mt-6 flex items-center gap-3">
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-primary-100">
                        {t.avatar && <Image src={t.avatar} alt={t.name} fill loading="lazy" className="object-cover" />}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[rgb(var(--fg))]">{t.name}</p>
                        <p className="text-xs text-[rgb(var(--muted))]">
                          {[t.role, t.company].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3">
                      <StarRating rating={t.rating} />
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page">
          <SectionHeading eyebrow="Trusted By" title="Businesses we've worked with" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 items-center opacity-70">
            {clientLogos.map((name) => (
              <div key={name} className="text-center font-display font-semibold text-[rgb(var(--muted))]">
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
