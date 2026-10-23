import Image from "next/image";
import { Quote } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import StarRating from "@/components/ui/StarRating";
import type { Testimonial } from "@/types";

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  const items = testimonials.slice(0, 3);
  if (items.length === 0) return null;

  return (
    <section className="section">
      <div className="container-page">
        <SectionHeading eyebrow="Testimonials" title="What our clients say" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.05}>
              <div className="card p-7 h-full flex flex-col">
                <Quote className="h-8 w-8 text-primary-300" />
                <p className="mt-4 text-[rgb(var(--fg))] leading-relaxed flex-1">&ldquo;{t.message}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-primary-100">
                    {t.avatar && (
                      <Image src={t.avatar} alt={t.name} fill loading="lazy" className="object-cover" />
                    )}
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
      </div>
    </section>
  );
}
