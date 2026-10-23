import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serviceSchema } from "@/lib/validations";
import { requireAdmin } from "@/lib/require-admin";

export async function GET() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(
    services.map((s: (typeof services)[number]) => ({ ...s, features: JSON.parse(s.features || "[]") }))
  );
}

export async function POST(req: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await req.json();
  const parsed = serviceSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { features, ...rest } = parsed.data;
  const service = await prisma.service.create({
    data: { ...rest, features: JSON.stringify(features) },
  });

  return NextResponse.json(service, { status: 201 });
}
