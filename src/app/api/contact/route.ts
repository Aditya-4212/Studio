import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactFormSchema } from "@/lib/validations";
import { sendInquiryNotification } from "@/lib/email";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  try {
    // Basic origin check as a CSRF guard for this state-changing POST route.
    const origin = req.headers.get("origin");
    const host = req.headers.get("host");
    if (origin && host && !origin.includes(host)) {
      return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
    }

    const ip = getClientIp(req);
    const { success } = rateLimit(`contact:${ip}`, 5, 60_000);
    if (!success) {
      return NextResponse.json(
        { error: "Too many requests. Please try again in a minute." },
        { status: 429 }
      );
    }

    const body = await req.json();
    const parsed = contactFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Please check the form for errors.", issues: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // Honeypot triggered — silently pretend success so bots don't learn.
    if (parsed.data.company_website) {
      return NextResponse.json({ success: true });
    }

    const { name, email, phone, subject, message } = parsed.data;

    const inquiry = await prisma.inquiry.create({
      data: { name, email, phone: phone || null, subject, message },
    });

    // Don't let a flaky SMTP provider fail the user-facing request —
    // the inquiry is already safely stored.
    sendInquiryNotification({ name, email, phone, subject, message }).catch((err) =>
      console.error("[contact] failed to send notification email:", err)
    );

    return NextResponse.json({ success: true, id: inquiry.id });
  } catch (err) {
    console.error("[contact] error:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
