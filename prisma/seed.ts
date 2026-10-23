import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // ---- Admin account ----
  const email = (process.env.ADMIN_EMAIL || "admin@yourbusiness.com").toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "ChangeThisPassword123!";
  const name = process.env.ADMIN_NAME || "Site Admin";

  const hashed = await bcrypt.hash(password, 12);
  await prisma.admin.upsert({
    where: { email },
    update: {},
    create: { email, password: hashed, name },
  });
  console.log(`✔ Admin account ready: ${email}`);

  // ---- Services ----
  const services = [
    {
      title: "Brand Strategy",
      slug: "brand-strategy",
      description:
        "We define your positioning, messaging, and visual identity so your brand resonates with the right audience.",
      icon: "Sparkles",
      price: "Starting at $2,500",
      features: JSON.stringify(["Brand workshop", "Positioning & messaging", "Visual identity system"]),
      featured: true,
      order: 0,
    },
    {
      title: "Product Design (UI/UX)",
      slug: "product-design",
      description:
        "Human-centered design that turns complex requirements into clear, delightful digital experiences.",
      icon: "Palette",
      price: "Starting at $4,000",
      features: JSON.stringify(["User research", "Wireframes & prototypes", "Design system"]),
      featured: true,
      order: 1,
    },
    {
      title: "Web & App Development",
      slug: "web-app-development",
      description:
        "Fast, scalable, well-tested applications built with modern frameworks and best practices.",
      icon: "Code2",
      price: "Starting at $6,000",
      features: JSON.stringify(["Custom web apps", "API integrations", "Performance optimization"]),
      featured: true,
      order: 2,
    },
    {
      title: "Growth & Analytics",
      slug: "growth-analytics",
      description: "Data-driven marketing and analytics setups that help you understand and grow your audience.",
      icon: "LineChart",
      price: "Starting at $1,800/mo",
      features: JSON.stringify(["SEO strategy", "Analytics setup", "Conversion optimization"]),
      featured: false,
      order: 3,
    },
    {
      title: "Product Launch",
      slug: "product-launch",
      description: "End-to-end launch planning and execution, from go-to-market strategy to day-one support.",
      icon: "Rocket",
      price: null,
      features: JSON.stringify(["Launch roadmap", "PR & outreach", "Post-launch support"]),
      featured: false,
      order: 4,
    },
    {
      title: "Ongoing Support & Maintenance",
      slug: "support-maintenance",
      description: "Retainer-based support to keep your product secure, fast, and up to date long after launch.",
      icon: "ShieldCheck",
      price: "Starting at $900/mo",
      features: JSON.stringify(["Bug fixes & updates", "Security monitoring", "Priority support"]),
      featured: false,
      order: 5,
    },
  ];

  for (const s of services) {
    await prisma.service.upsert({ where: { slug: s.slug }, update: s, create: s });
  }
  console.log(`✔ Seeded ${services.length} services`);

  // ---- Portfolio projects ----
  const projects = [
    {
      title: "Horizon Finance Rebrand",
      slug: "horizon-finance-rebrand",
      category: "Branding",
      summary: "A full brand refresh for a fintech scale-up, from strategy to launch.",
      description:
        "Horizon Finance came to us looking to modernize a brand that no longer matched their ambitions. We led a full discovery process, redefined their positioning, and built a flexible visual identity system that scaled across web, product, and print.",
      coverImage: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800&auto=format&fit=crop",
      ]),
      client: "Horizon Finance",
      completedAt: new Date("2025-03-01"),
      featured: true,
      order: 0,
    },
    {
      title: "Marketplace Platform Redesign",
      slug: "marketplace-platform-redesign",
      category: "Product Design",
      summary: "Redesigning a two-sided marketplace to improve conversion and trust.",
      description:
        "We partnered with a growing marketplace to overhaul their core browsing and checkout experience, resulting in a 34% lift in conversion and significantly improved customer satisfaction scores.",
      coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      ]),
      client: "Marketspace Inc.",
      completedAt: new Date("2025-06-01"),
      featured: true,
      order: 1,
    },
    {
      title: "Logistics SaaS Platform Build",
      slug: "logistics-saas-platform",
      category: "Development",
      summary: "A ground-up build of a route-planning SaaS platform for logistics teams.",
      description:
        "From technical architecture to a production-ready MVP in 10 weeks, we helped a logistics startup validate their product with real customers ahead of their seed round.",
      coverImage: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=1200&auto=format&fit=crop",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop",
      ]),
      client: "RouteWorks",
      completedAt: new Date("2025-09-01"),
      featured: true,
      order: 2,
    },
    {
      title: "Boutique Hotel Booking Site",
      slug: "boutique-hotel-booking-site",
      category: "Web Design",
      summary: "A premium booking experience for an independent hotel group.",
      description:
        "A visually rich, fast-loading booking site that increased direct bookings and reduced dependency on third-party travel platforms.",
      coverImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop",
      gallery: JSON.stringify([
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=800&auto=format&fit=crop",
      ]),
      client: "Larkspur Hotels",
      completedAt: new Date("2024-11-01"),
      featured: false,
      order: 3,
    },
  ];

  for (const p of projects) {
    await prisma.project.upsert({ where: { slug: p.slug }, update: p, create: p });
  }
  console.log(`✔ Seeded ${projects.length} portfolio projects`);

  // ---- Testimonials ----
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "VP of Marketing",
      company: "Horizon Finance",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      message:
        "They completely transformed how our brand shows up in the market. The process was collaborative, fast, and the results speak for themselves.",
      featured: true,
      order: 0,
    },
    {
      name: "Marcus Webb",
      role: "Co-founder",
      company: "RouteWorks",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      message:
        "We shipped our MVP faster than we thought possible, without cutting corners on quality. Genuinely felt like an extension of our own team.",
      featured: true,
      order: 1,
    },
    {
      name: "Elena Rossi",
      role: "Head of Product",
      company: "Marketspace Inc.",
      avatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=200&auto=format&fit=crop",
      rating: 5,
      message:
        "The redesign directly moved our core metrics. More importantly, they took the time to understand our users before proposing solutions.",
      featured: true,
      order: 2,
    },
  ];

  for (const t of testimonials) {
    const exists = await prisma.testimonial.findFirst({ where: { name: t.name, company: t.company } });
    if (!exists) await prisma.testimonial.create({ data: t });
  }
  console.log(`✔ Seeded testimonials`);

  console.log("\nSeed complete. You can log in to /admin/login with:");
  console.log(`  Email:    ${email}`);
  console.log(`  Password: ${password}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
