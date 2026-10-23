import Link from "next/link";
import { Inbox, Briefcase, ImageIcon, MessageSquareQuote, ArrowRight } from "lucide-react";
import { prisma } from "@/lib/prisma";
import type { Inquiry } from "@/types";

export default async function DashboardOverviewPage() {
  const [inquiryCount, newInquiryCount, serviceCount, projectCount, testimonialCount, recentInquiries] =
    await Promise.all([
      prisma.inquiry.count(),
      prisma.inquiry.count({ where: { status: "new" } }),
      prisma.service.count(),
      prisma.project.count(),
      prisma.testimonial.count(),
      prisma.inquiry.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
    ]);

  const stats = [
    { label: "Total Inquiries", value: inquiryCount, sub: `${newInquiryCount} new`, icon: Inbox, href: "/admin/dashboard/inquiries" },
    { label: "Services", value: serviceCount, icon: Briefcase, href: "/admin/dashboard/services" },
    { label: "Portfolio Projects", value: projectCount, icon: ImageIcon, href: "/admin/dashboard/portfolio" },
    { label: "Testimonials", value: testimonialCount, icon: MessageSquareQuote, href: "/admin/dashboard/testimonials" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold text-[rgb(var(--fg))]">Overview</h1>
      <p className="text-sm text-[rgb(var(--muted))] mt-1">A snapshot of your website&apos;s activity.</p>

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, sub, icon: Icon, href }) => (
          <Link key={label} href={href} className="card p-5 hover:-translate-y-0.5 transition-transform">
            <Icon className="h-5 w-5 text-primary-500" />
            <p className="mt-3 text-2xl font-semibold text-[rgb(var(--fg))]">{value}</p>
            <p className="text-sm text-[rgb(var(--muted))]">{label}</p>
            {sub && <p className="text-xs text-primary-500 mt-1">{sub}</p>}
          </Link>
        ))}
      </div>

      <div className="mt-8 card p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-[rgb(var(--fg))]">Recent Inquiries</h2>
          <Link href="/admin/dashboard/inquiries" className="text-sm text-primary-500 flex items-center gap-1 hover:underline">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="mt-4 divide-y divide-[rgb(var(--border))]">
          {recentInquiries.length === 0 && (
            <p className="py-6 text-sm text-[rgb(var(--muted))]">No inquiries yet.</p>
          )}
          {recentInquiries.map((inquiry: Pick<Inquiry, "id" | "name" | "subject" | "email" | "status">) => (
            <div key={inquiry.id} className="py-3 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-[rgb(var(--fg))]">{inquiry.name} — {inquiry.subject}</p>
                <p className="text-xs text-[rgb(var(--muted))]">{inquiry.email}</p>
              </div>
              <span
                className={`text-xs rounded-full px-2.5 py-1 shrink-0 ${
                  inquiry.status === "new"
                    ? "bg-primary-100 text-primary-700 dark:bg-primary-100/10 dark:text-primary-400"
                    : "bg-[rgb(var(--border))] text-[rgb(var(--muted))]"
                }`}
              >
                {inquiry.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
