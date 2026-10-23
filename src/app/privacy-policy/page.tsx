import type { Metadata } from "next";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${siteConfig.name}.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <section className="section pt-16">
      <div className="container-page max-w-3xl prose prose-neutral dark:prose-invert">
        <h1 className="text-4xl font-semibold text-[rgb(var(--fg))]">Privacy Policy</h1>
        <p className="text-sm text-[rgb(var(--muted))]">Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>

        <div className="mt-8 space-y-8 text-[rgb(var(--muted))] leading-relaxed">
          <div>
            <h2 className="text-xl font-semibold text-[rgb(var(--fg))] mb-2">1. Information We Collect</h2>
            <p>
              When you submit our contact form or subscribe to our newsletter, we collect your name,
              email address, phone number (optional), and the content of your message. We also
              collect standard analytics data (pages visited, device type, approximate location) via
              Google Analytics.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[rgb(var(--fg))] mb-2">2. How We Use Your Information</h2>
            <p>
              We use the information you provide solely to respond to your inquiry, deliver services
              you&apos;ve requested, and — if you&apos;ve opted in — send occasional newsletter
              updates. We do not sell your personal information to third parties.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[rgb(var(--fg))] mb-2">3. Data Storage &amp; Security</h2>
            <p>
              Your data is stored in our secure database and protected with industry-standard
              safeguards, including encrypted connections and access controls limited to authorized
              personnel.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[rgb(var(--fg))] mb-2">4. Cookies</h2>
            <p>
              We use cookies for essential site functionality and, with your consent, for analytics.
              You can manage your cookie preferences at any time via the banner shown on your first
              visit.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[rgb(var(--fg))] mb-2">5. Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal data at any time
              by contacting us at{" "}
              <a href={`mailto:${siteConfig.contact.email}`} className="text-primary-500 hover:underline">
                {siteConfig.contact.email}
              </a>.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-[rgb(var(--fg))] mb-2">6. Contact</h2>
            <p>Questions about this policy? Reach us at {siteConfig.contact.email} or {siteConfig.contact.phoneDisplay}.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
