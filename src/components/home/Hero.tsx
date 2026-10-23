"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary-50 to-transparent dark:from-primary-100/5" />
      <div className="container-page pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <p className="eyebrow mb-4">Strategy · Design · Technology</p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] text-[rgb(var(--fg))]">
              We build products businesses are proud of
            </h1>
            <p className="mt-6 text-lg text-[rgb(var(--muted))] leading-relaxed max-w-xl">
              We partner with ambitious teams to design, engineer, and launch modern digital
              experiences — from strategy through to scale.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/contact" className="btn-primary">
                Start a Project <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/portfolio" className="btn-outline">
                View Our Work
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[rgb(var(--muted))]">
              {["Free consultation", "Dedicated project lead", "On-time delivery"].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary-500" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-soft">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                alt="Team collaborating around a table on a business strategy project"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden sm:block card p-5 max-w-[220px]">
              <p className="text-3xl font-display font-semibold text-primary-500">120+</p>
              <p className="text-sm text-[rgb(var(--muted))]">Projects delivered for growing businesses</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
