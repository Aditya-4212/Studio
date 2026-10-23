import { z } from "zod";

// Basic HTML-tag stripper for defense-in-depth XSS mitigation on free-text
// fields. Real protection also comes from React's auto-escaping on render
// and from never using dangerouslySetInnerHTML with user input.
export function sanitizeText(value: string): string {
  return value.replace(/<[^>]*>?/g, "").trim();
}

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your full name")
    .max(100)
    .transform(sanitizeText),
  email: z.string().email("Please enter a valid email address").max(150),
  phone: z
    .string()
    .max(30)
    .optional()
    .or(z.literal(""))
    .transform((v) => (v ? sanitizeText(v) : v)),
  subject: z.string().min(3, "Please add a subject").max(150).transform(sanitizeText),
  message: z
    .string()
    .min(10, "Message should be at least 10 characters")
    .max(3000)
    .transform(sanitizeText),
  // Honeypot field: real users never fill this in; bots often do.
  company_website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export const newsletterSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const serviceSchema = z.object({
  title: z.string().min(2).max(120),
  slug: z
    .string()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers, hyphens"),
  description: z.string().min(10).max(2000),
  icon: z.string().min(1).max(60),
  price: z.string().max(60).optional().or(z.literal("")),
  features: z.array(z.string().min(1)).default([]),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
});

export const projectSchema = z.object({
  title: z.string().min(2).max(150),
  slug: z.string().min(2).max(150).regex(/^[a-z0-9-]+$/),
  category: z.string().min(2).max(60),
  summary: z.string().min(5).max(300),
  description: z.string().min(10).max(5000),
  coverImage: z.string().url(),
  gallery: z.array(z.string().url()).default([]),
  client: z.string().max(120).optional().or(z.literal("")),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
});

export const testimonialSchema = z.object({
  name: z.string().min(2).max(120),
  role: z.string().max(120).optional().or(z.literal("")),
  company: z.string().max(120).optional().or(z.literal("")),
  avatar: z.string().url().optional().or(z.literal("")),
  rating: z.number().int().min(1).max(5).default(5),
  message: z.string().min(5).max(1500),
  featured: z.boolean().default(false),
  order: z.number().int().default(0),
});
