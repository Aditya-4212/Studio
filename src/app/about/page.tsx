import type { Metadata } from "next";
import Image from "next/image";
import { Target, Eye, Handshake, Lightbulb, ShieldCheck, Sparkles } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about our company's story, mission, vision, values, and the team behind our work.",
  alternates: { canonical: "/about" },
};

const values = [
  { icon: ShieldCheck, title: "Integrity", description: "We do what we say, and say what we mean." },
  { icon: Sparkles, title: "Craft", description: "We sweat the details others skip." },
  { icon: Handshake, title: "Partnership", description: "Your goals become our goals." },
  { icon: Lightbulb, title: "Curiosity", description: "We stay ahead so you don't have to." },
];

const timeline = [
  { year: "2014", title: "Founded", description: "Started as a two-person design studio." },
  { year: "2017", title: "First 50 clients", description: "Expanded into full-stack product development." },
  { year: "2020", title: "Remote-first", description: "Grew into a distributed team of specialists." },
  { year: "2024", title: "120+ projects delivered", description: "Recognized as a trusted partner for growth-stage businesses." },
];

const team = [
  { name: "Alex Morgan", role: "Founder & CEO", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=400&auto=format&fit=crop" },
  { name: "Jordan Lee", role: "Head of Design", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=400&auto=format&fit=crop" },
  { name: "Priya Nair", role: "Head of Engineering", image: "https://images.unsplash.com/photo-1607746882042-944635dfe10e?q=80&w=400&auto=format&fit=crop" },
  { name: "Sam Carter", role: "Client Success Lead", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&auto=format&fit=crop" },
];

export default function AboutPage() {
  return (
    <>
      <section className="section pt-12 sm:pt-16">
        <div className="container-page max-w-3xl text-center">
          <Reveal>
            <p className="eyebrow mb-3">Our Story</p>
            <h1 className="text-4xl sm:text-5xl font-semibold text-[rgb(var(--fg))]">
              Built by people who care about the outcome
            </h1>
            <p className="mt-5 text-lg text-[rgb(var(--muted))] leading-relaxed">
              We started this company because we were tired of seeing great ideas get lost in
              bloated processes and disconnected teams. A decade later, that same principle — clear
              thinking, honest communication, quality craft — still guides everything we do.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-page grid sm:grid-cols-2 gap-6">
          <Reveal className="card p-8">
            <Target className="h-8 w-8 text-primary-500" />
            <h2 className="mt-4 text-xl font-semibold text-[rgb(var(--fg))]">Our Mission</h2>
            <p className="mt-3 text-[rgb(var(--muted))] leading-relaxed">
              To help ambitious businesses turn ideas into products that create measurable, lasting
              value — without the friction of traditional agencies.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="card p-8">
            <Eye className="h-8 w-8 text-primary-500" />
            <h2 className="mt-4 text-xl font-semibold text-[rgb(var(--fg))]">Our Vision</h2>
            <p className="mt-3 text-[rgb(var(--muted))] leading-relaxed">
              A world where every growing business has access to the same caliber of strategy and
              craft as the biggest brands.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section bg-primary-50/40 dark:bg-primary-100/[0.03]">
        <div className="container-page">
          <SectionHeading eyebrow="Our Values" title="What guides our work" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05} className="text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-100/10 dark:text-primary-400">
                  <v.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-semibold text-[rgb(var(--fg))]">{v.title}</h3>
                <p className="mt-2 text-sm text-[rgb(var(--muted))]">{v.description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page max-w-3xl">
          <SectionHeading eyebrow="Our Journey" title="Milestones along the way" />
          <ol className="relative border-l border-[rgb(var(--border))] ml-3">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.05}>
                <li className="mb-10 ml-6">
                  <span className="absolute -left-[9px] flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 ring-4 ring-[rgb(var(--bg))]" />
                  <p className="text-sm font-semibold text-primary-500">{item.year}</p>
                  <h3 className="text-lg font-semibold text-[rgb(var(--fg))]">{item.title}</h3>
                  <p className="text-sm text-[rgb(var(--muted))] mt-1">{item.description}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section bg-primary-50/40 dark:bg-primary-100/[0.03]">
        <div className="container-page">
          <SectionHeading eyebrow="Our Team" title="Meet the people behind the work" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <Reveal key={member.name} delay={i * 0.05} className="text-center">
                <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full shadow-soft">
                  <Image src={member.image} alt={member.name} fill loading="lazy" sizes="128px" className="object-cover" />
                </div>
                <h3 className="mt-4 font-semibold text-[rgb(var(--fg))]">{member.name}</h3>
                <p className="text-sm text-[rgb(var(--muted))]">{member.role}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
