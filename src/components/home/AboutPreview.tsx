import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function AboutPreview() {
  return (
    <section className="section">
      <div className="container-page grid lg:grid-cols-2 gap-12 items-center">
        <Reveal className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-soft order-2 lg:order-1">
          <Image
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop"
            alt="Our team working together in a modern office"
            fill
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </Reveal>
        <Reveal className="order-1 lg:order-2">
          <p className="eyebrow mb-3">About Us</p>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[rgb(var(--fg))]">
            A team obsessed with getting the details right
          </h2>
          <p className="mt-5 text-[rgb(var(--muted))] leading-relaxed">
            For over a decade we&apos;ve helped founders and established businesses turn ambitious
            ideas into products people love. We combine strategic thinking with hands-on craft —
            no hand-offs, no guesswork, just outcomes.
          </p>
          <Link href="/about" className="btn-outline mt-6">
            Learn Our Story <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
