import Reveal from "./Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  center = true,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={`max-w-2xl ${center ? "mx-auto text-center" : ""} mb-12 sm:mb-16`}>
      {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
      <h2 className="text-3xl sm:text-4xl font-semibold text-[rgb(var(--fg))]">{title}</h2>
      {description && (
        <p className="mt-4 text-base sm:text-lg text-[rgb(var(--muted))] leading-relaxed">{description}</p>
      )}
    </Reveal>
  );
}
