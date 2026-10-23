export type Service = {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  price: string | null;
  features: string[];
  featured: boolean;
  order: number;
};

export type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  description: string;
  coverImage: string;
  gallery: string[];
  client: string | null;
  completedAt: string | null;
  featured: boolean;
  order: number;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string | null;
  company: string | null;
  avatar: string | null;
  rating: number;
  message: string;
  featured: boolean;
  order: number;
};

export type Inquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string;
  message: string;
  status: "new" | "contacted" | "archived";
  createdAt: string;
};
