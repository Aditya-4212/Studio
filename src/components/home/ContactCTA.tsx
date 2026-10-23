import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function ContactCTA() {
  return (
    <section className="section">
      <div className="container-page">
        <Reveal className="card bg-primary-500 text-white p-10 sm:p-16 text-center rounded-3xl">
          <h2 className="text-3xl sm:text-4xl font-semibold">Ready to start your project?</h2>
          <p className="mt-4 text-primary-50/90 max-w-xl mx-auto leading-relaxed">
            Tell us about your goals and we&apos;ll follow up within one business day with next steps.
          </p>
          <Link
            href="/contact"
            className="btn mt-8 bg-white text-primary-600 hover:bg-primary-50 inline-flex"
          >
            Get in Touch <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
