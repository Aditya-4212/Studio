import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles, LineChart, Code2, Palette, Rocket, ShieldCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description: "Explore our full range of strategy, design, and technology services.",
  alternates: { canonical: "/services" },
};

export const revalidate = 60;

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  LineChart,
  Code2,
  Palette,
  Rocket,
  ShieldCheck,
};

export default async function ServicesPage() {
  const rawServices = await prisma.service.findMany({ orderBy: { order: "asc" } });
  const services = rawServices.map((s: (typeof rawServices)[number]) => ({ ...s, features: JSON.parse(s.features || "[]") as string[] }));

  return (
    <>
      <section className="section pt-12 sm:pt-16 pb-10">
        <div className="container-page max-w-2xl text-center">
          <Reveal>
            <p className="eyebrow mb-3">Our Services</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[rgb(var(--fg))]">
              Everything you need, under one roof
            </h1>
            <p className="mt-5 text-lg text-[rgb(var(--muted))] leading-relaxed">
              From early strategy to full-scale delivery — pick a single service or work with us
              end-to-end.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-page space-y-8">
          {services.map((service: (typeof services)[number], i: number) => {
            const Icon = iconMap[service.icon] || Sparkles;
            return (
              <Reveal key={service.id} delay={i * 0.04}>
                <div id={service.slug} className="card p-8 sm:p-10 scroll-mt-24">
                  <div className="grid sm:grid-cols-[auto,1fr] gap-6 sm:gap-10 items-start">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 dark:bg-primary-100/10 dark:text-primary-400">
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-3 justify-between">
                        <h2 className="text-2xl font-semibold text-[rgb(var(--fg))]">{service.title}</h2>
                        {service.price && (
                          <span className="rounded-full bg-primary-50 dark:bg-primary-100/10 px-4 py-1.5 text-sm font-medium text-primary-600 dark:text-primary-400">
                            {service.price}
                          </span>
                        )}
                      </div>
                      <p className="mt-3 text-[rgb(var(--muted))] leading-relaxed">{service.description}</p>
                      {service.features.length > 0 && (
                        <ul className="mt-5 grid sm:grid-cols-2 gap-x-6 gap-y-2">
                          {service.features.map((feature: string) => (
                            <li key={feature} className="flex items-center gap-2 text-sm text-[rgb(var(--fg))]">
                              <CheckCircle2 className="h-4 w-4 text-primary-500 shrink-0" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      )}
                      <Link
                        href={`/contact?service=${encodeURIComponent(service.title)}`}
                        className="btn-outline mt-6 text-sm"
                      >
                        Inquire About This Service <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>
    </>
  );
}
