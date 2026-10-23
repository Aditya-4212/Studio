import { prisma } from "@/lib/prisma";
import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import ServicesPreview from "@/components/home/ServicesPreview";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import FeaturedWork from "@/components/home/FeaturedWork";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import FAQSection from "@/components/home/FAQSection";
import ContactCTA from "@/components/home/ContactCTA";

// Revalidate periodically so admin content changes show up without a full
// redeploy, while still benefiting from static generation performance.
export const revalidate = 60;

export default async function HomePage() {
  const [services, projects, testimonials] = await Promise.all([
    prisma.service.findMany({ orderBy: { order: "asc" } }),
    prisma.project.findMany({ orderBy: { order: "asc" } }),
    prisma.testimonial.findMany({ orderBy: { order: "asc" } }),
  ]);

  const mappedServices = services.map((s: (typeof services)[number]) => ({ ...s, features: JSON.parse(s.features || "[]") }));
  const mappedProjects = projects.map((p: (typeof projects)[number]) => ({
    ...p,
    gallery: JSON.parse(p.gallery || "[]"),
    completedAt: p.completedAt?.toISOString() ?? null,
  }));

  return (
    <>
      <Hero />
      <AboutPreview />
      <ServicesPreview services={mappedServices} />
      <WhyChooseUs />
      <FeaturedWork projects={mappedProjects} />
      <TestimonialsSection testimonials={testimonials} />
      <FAQSection />
      <ContactCTA />
    </>
  );
}
