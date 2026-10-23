import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { newsletterSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const { success } = rateLimit(`newsletter:${ip}`, 5, 60_000);
  if (!success) {
    return NextResponse.json({ error: "Too many requests." }, { status: 429 });
  }

  const body = await req.json();
  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  try {
    await prisma.subscriber.create({ data: { email: parsed.data.email.toLowerCase() } });
  } catch {
    // Unique constraint — already subscribed. Treat as success (idempotent).
  }

  return NextResponse.json({ success: true });
}
