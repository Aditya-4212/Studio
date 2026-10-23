import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { serviceSchema } from "@/lib/validations";
import { requireAdmin } from "@/lib/require-admin";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await req.json();
  const parsed = serviceSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { features, ...rest } = parsed.data;
  const service = await prisma.service.update({
    where: { id: params.id },
    data: { ...rest, ...(features ? { features: JSON.stringify(features) } : {}) },
  });

  return NextResponse.json(service);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await prisma.service.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
