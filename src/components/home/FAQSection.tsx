import SectionHeading from "@/components/ui/SectionHeading";
import Accordion from "@/components/ui/Accordion";
import Reveal from "@/components/ui/Reveal";

const faqs = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most engagements run 4–12 weeks depending on scope. We'll give you a clear timeline after our initial discovery call.",
  },
  {
    question: "Do you work with startups as well as established businesses?",
    answer:
      "Yes — we work with early-stage founders through to established companies. Our process adapts to your stage and budget.",
  },
  {
    question: "What's included after launch?",
    answer:
      "Every project includes a 30-day support window, with ongoing maintenance and retainer options available afterward.",
  },
  {
    question: "How do we get started?",
    answer:
      "Fill out the contact form or book a free consultation call. We'll follow up within one business day to discuss your project.",
  },
];

export default function FAQSection() {
  return (
    <section className="section bg-primary-50/40 dark:bg-primary-100/[0.03]">
      <div className="container-page max-w-3xl">
        <SectionHeading eyebrow="FAQ" title="Frequently asked questions" />
        <Reveal>
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
