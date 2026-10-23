import { Users, Zap, Award, HeartHandshake } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const points = [
  {
    icon: Users,
    title: "Senior Team, Always",
    description: "You work directly with senior strategists and engineers — never junior hand-offs.",
  },
  {
    icon: Zap,
    title: "Fast, Transparent Delivery",
    description: "Clear timelines and weekly updates so you always know exactly where things stand.",
  },
  {
    icon: Award,
    title: "Proven Track Record",
    description: "120+ successful launches across SaaS, e-commerce, and professional services.",
  },
  {
    icon: HeartHandshake,
    title: "Long-Term Partnership",
    description: "We stick around after launch — ongoing support, not a one-and-done handoff.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section">
      <div className="container-page">
        <SectionHeading
          eyebrow="Why Choose Us"
          title="Built for businesses that expect results"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {points.map((point, i) => (
            <Reveal key={point.title} delay={i * 0.05} className="text-center sm:text-left">
              <div className="mx-auto sm:mx-0 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-100/10 dark:text-primary-400">
                <point.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-semibold text-[rgb(var(--fg))]">{point.title}</h3>
              <p className="mt-2 text-sm text-[rgb(var(--muted))] leading-relaxed">{point.description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
