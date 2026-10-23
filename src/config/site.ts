// Central place to rebrand the entire site: name, tagline, contact info,
// social links, and theme color. Change values here and they propagate
// through metadata, footer, contact page, structured data, etc.

export const siteConfig = {
  name: "Nexora Consulting",
  shortName: "Nexora",
  tagline: "Strategy, Design & Technology for Ambitious Businesses",
  description:
    "Nexora Consulting helps growing businesses design better products, build modern technology, and scale with confidence. Strategy, design, and engineering under one roof.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ogImage: "/images/og-cover.jpg",

  contact: {
    email: "hello@nexora-consulting.com",
    phone: "+1 (555) 012-3456",
    phoneDisplay: "+1 (555) 012-3456",
    address: "148 Market Street, Suite 400, San Francisco, CA 94105",
    hours: [
      { day: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
      { day: "Saturday", time: "10:00 AM – 2:00 PM" },
      { day: "Sunday", time: "Closed" },
    ],
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "15551234567",
    mapEmbedSrc:
      process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_SRC ||
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019!2d-122.4194!3d37.7749!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDQ2JzM1LjIiTiAxMjLCsDI1JzA5LjgiVw!5e0!3m2!1sen!2sus!4v1700000000000",
  },

  social: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    twitter: "https://twitter.com/",
  },

  nav: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Contact", href: "/contact" },
  ],

  // Theme colors expressed as HSL triples so both light/dark variants and
  // Tailwind's `primary-*` scale derive from ONE brand color. To re-theme
  // the whole site, change `brandHue` (0-360) or the individual stops
  // below, in src/app/globals.css :root block.
  themeName: "Soft Indigo",
};

export type SiteConfig = typeof siteConfig;
