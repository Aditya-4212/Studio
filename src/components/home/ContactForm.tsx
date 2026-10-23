"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  subject: z.string().min(3, "Please add a subject"),
  message: z.string().min(10, "Message should be at least 10 characters"),
  company_website: z.string().optional(), // honeypot
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactForm() {
  const searchParams = useSearchParams();
  const prefilledSubject = searchParams.get("service") ? `Inquiry: ${searchParams.get("service")}` : "";
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { subject: prefilledSubject },
  });

  async function onSubmit(values: FormValues) {
    setServerError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) {
        setServerError(data.error || "Something went wrong. Please try again.");
        return;
      }
      setSubmitted(true);
      reset();
    } catch {
      setServerError("Network error. Please check your connection and try again.");
    }
  }

  if (submitted) {
    return (
      <div className="card p-10 text-center" role="status">
        <CheckCircle2 className="h-12 w-12 text-primary-500 mx-auto" />
        <h3 className="mt-4 text-xl font-semibold text-[rgb(var(--fg))]">Message sent!</h3>
        <p className="mt-2 text-[rgb(var(--muted))]">
          Thanks for reaching out — we&apos;ll get back to you within one business day.
        </p>
        <button onClick={() => setSubmitted(false)} className="btn-outline mt-6">
          Send Another Message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="card p-6 sm:p-8 space-y-5">
      {/* Honeypot field — hidden from real users via CSS, catches simple bots */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company_website">Company Website</label>
        <input id="company_website" type="text" tabIndex={-1} autoComplete="off" {...register("company_website")} />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1.5">
            Full Name <span className="text-primary-500">*</span>
          </label>
          <input id="name" className="input" {...register("name")} aria-invalid={!!errors.name} />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1.5">
            Email <span className="text-primary-500">*</span>
          </label>
          <input id="email" type="email" className="input" {...register("email")} aria-invalid={!!errors.email} />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium mb-1.5">
            Phone (optional)
          </label>
          <input id="phone" type="tel" className="input" {...register("phone")} />
        </div>
        <div>
          <label htmlFor="subject" className="block text-sm font-medium mb-1.5">
            Subject <span className="text-primary-500">*</span>
          </label>
          <input id="subject" className="input" {...register("subject")} aria-invalid={!!errors.subject} />
          {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1.5">
          Message <span className="text-primary-500">*</span>
        </label>
        <textarea
          id="message"
          rows={5}
          className="input resize-none"
          {...register("message")}
          aria-invalid={!!errors.message}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
      </div>

      {serverError && (
        <p role="alert" className="text-sm text-red-500 bg-red-50 dark:bg-red-500/10 rounded-lg px-4 py-3">
          {serverError}
        </p>
      )}

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>
    </form>
  );
}
