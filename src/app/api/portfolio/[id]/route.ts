import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations";
import { requireAdmin } from "@/lib/require-admin";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await req.json();
  const parsed = projectSchema.partial().safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { gallery, ...rest } = parsed.data;
  const project = await prisma.project.update({
    where: { id: params.id },
    data: { ...rest, ...(gallery ? { gallery: JSON.stringify(gallery) } : {}) },
  });

  return NextResponse.json(project);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await prisma.project.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
