import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const staticPages = [
  { title: "About Us", href: "/about", type: "Page" },
  { title: "Services", href: "/services", type: "Page" },
  { title: "Portfolio", href: "/portfolio", type: "Page" },
  { title: "Testimonials", href: "/testimonials", type: "Page" },
  { title: "Contact", href: "/contact", type: "Page" },
];

export async function GET(req: Request) {
  const q = new URL(req.url).searchParams.get("q")?.trim().toLowerCase() || "";
  if (q.length < 2) return NextResponse.json([]);

  const [services, projects] = await Promise.all([
    prisma.service.findMany({ where: { title: { contains: q } } }),
    prisma.project.findMany({ where: { title: { contains: q } } }),
  ]);

  const results = [
    ...staticPages
      .filter((p) => p.title.toLowerCase().includes(q))
      .map((p: (typeof staticPages)[number]) => ({ title: p.title, href: p.href, type: p.type })),
    ...services.map((s: (typeof services)[number]) => ({ title: s.title, href: `/services#${s.slug}`, type: "Service" })),
    ...projects.map((p: (typeof projects)[number]) => ({ title: p.title, href: `/portfolio/${p.slug}`, type: "Project" })),
  ];

  return NextResponse.json(results.slice(0, 8));
}
