import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms and Conditions for ${siteConfig.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="section pt-16">
      <div className="container-page max-w-3xl prose prose-neutral dark:prose-invert">
        <h1 className="text-4xl font-semibold text-[rgb(var(--fg))]">Terms &amp; Conditions</h1>
        <p className="text-sm text-[rgb(var(--muted))]">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="mt-8 space-y-8 text-[rgb(var(--muted))] leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-[rgb(var(--fg))] mb-2">1. Acceptance of Terms</h2>
            <p>By accessing this website, you agree to be bound by these Terms &amp; Conditions and our Privacy Policy.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[rgb(var(--fg))] mb-2">2. Use of the Website</h2>
            <p>
              You agree to use this website only for lawful purposes and in a way that doesn&apos;t
              infringe the rights of, or restrict or inhibit the use of, this site by anyone else.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[rgb(var(--fg))] mb-2">3. Intellectual Property</h2>
            <p>
              All content on this site — including text, graphics, logos, and images — is the
              property of {siteConfig.name} unless otherwise noted, and may not be reproduced without
              permission.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[rgb(var(--fg))] mb-2">4. Service Engagements</h2>
            <p>
              Any services described on this site are subject to a separate written agreement between
              {" "}{siteConfig.name} and the client, outlining scope, pricing, and deliverables.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[rgb(var(--fg))] mb-2">5. Limitation of Liability</h2>
            <p>
              {siteConfig.name} is not liable for any indirect, incidental, or consequential damages
              arising from your use of this website.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[rgb(var(--fg))] mb-2">6. Changes to These Terms</h2>
            <p>We may update these terms from time to time. Continued use of the site constitutes acceptance of the revised terms.</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[rgb(var(--fg))] mb-2">7. Contact</h2>
            <p>Questions about these terms? Reach us at {siteConfig.contact.email}.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
