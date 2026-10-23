import type { Metadata } from "next";
import { Suspense } from "react";
import { Mail, Phone, MapPin, Clock, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import ContactForm from "@/components/home/ContactForm";
import Reveal from "@/components/ui/Reveal";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch — send us a message, call, or visit us.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="section pt-12 sm:pt-16">
      <div className="container-page">
        <Reveal className="max-w-2xl mx-auto text-center mb-14">
          <p className="eyebrow mb-3">Contact Us</p>
          <h1 className="text-4xl sm:text-5xl font-semibold text-[rgb(var(--fg))]">Let&apos;s start a conversation</h1>
          <p className="mt-5 text-lg text-[rgb(var(--muted))] leading-relaxed">
            Have a project in mind or just a question? We&apos;d love to hear from you.
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-10">
          <Reveal className="lg:col-span-3">
            <Suspense fallback={<div className="card p-8 h-96 animate-pulse" />}>
              <ContactForm />
            </Suspense>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-2 space-y-6">
            <div className="card p-6 space-y-5">
              <div className="flex gap-3">
                <MapPin className="h-5 w-5 text-primary-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[rgb(var(--fg))]">Address</p>
                  <p className="text-sm text-[rgb(var(--muted))]">{siteConfig.contact.address}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Phone className="h-5 w-5 text-primary-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[rgb(var(--fg))]">Phone</p>
                  <a href={`tel:${siteConfig.contact.phone}`} className="text-sm text-[rgb(var(--muted))] hover:text-primary-500">
                    {siteConfig.contact.phoneDisplay}
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <Mail className="h-5 w-5 text-primary-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[rgb(var(--fg))]">Email</p>
                  <a href={`mailto:${siteConfig.contact.email}`} className="text-sm text-[rgb(var(--muted))] hover:text-primary-500">
                    {siteConfig.contact.email}
                  </a>
                </div>
              </div>
              <div className="flex gap-3">
                <Clock className="h-5 w-5 text-primary-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[rgb(var(--fg))]">Working Hours</p>
                  <ul className="text-sm text-[rgb(var(--muted))] space-y-0.5">
                    {siteConfig.contact.hours.map((h) => (
                      <li key={h.day} className="flex justify-between gap-4">
                        <span>{h.day}</span>
                        <span>{h.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="flex gap-3 pt-2 border-t border-[rgb(var(--border))]">
                {[
                  { icon: Facebook, href: siteConfig.social.facebook, label: "Facebook" },
                  { icon: Instagram, href: siteConfig.social.instagram, label: "Instagram" },
                  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
                  { icon: Twitter, href: siteConfig.social.twitter, label: "Twitter" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgb(var(--border))] hover:bg-primary-50 dark:hover:bg-primary-100/10"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="card overflow-hidden aspect-video">
              <iframe
                src={siteConfig.contact.mapEmbedSrc}
                title="Business location map"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
