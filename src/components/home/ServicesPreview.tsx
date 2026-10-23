import Link from "next/link";
import { ArrowRight, Sparkles, LineChart, Code2, Palette, Rocket, ShieldCheck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import type { Service } from "@/types";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  LineChart,
  Code2,
  Palette,
  Rocket,
  ShieldCheck,
};

export default function ServicesPreview({ services }: { services: Service[] }) {
  const items = services.slice(0, 6);

  return (
    <section className="section bg-primary-50/40 dark:bg-primary-100/[0.03]">
      <div className="container-page">
        <SectionHeading
          eyebrow="What We Do"
          title="Services built around your goals"
          description="From early-stage strategy to full-scale product delivery, we cover every stage of the journey."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((service, i) => {
            const Icon = iconMap[service.icon] || Sparkles;
            return (
              <Reveal key={service.id} delay={i * 0.05}>
                <Link
                  href={`/services#${service.slug}`}
                  className="card group block p-7 h-full hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-100/10 dark:text-primary-400">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-[rgb(var(--fg))]">{service.title}</h3>
                  <p className="mt-2 text-sm text-[rgb(var(--muted))] leading-relaxed line-clamp-3">
                    {service.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary-500 group-hover:gap-2 transition-all">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-10 text-center">
          <Link href="/services" className="btn-primary">
            View All Services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
