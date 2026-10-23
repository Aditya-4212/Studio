import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { projectSchema } from "@/lib/validations";
import { requireAdmin } from "@/lib/require-admin";

export async function GET() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return NextResponse.json(
    projects.map((p: (typeof projects)[number]) => ({ ...p, gallery: JSON.parse(p.gallery || "[]") }))
  );
}

export async function POST(req: Request) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await req.json();
  const parsed = projectSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { gallery, ...rest } = parsed.data;
  const project = await prisma.project.create({
    data: { ...rest, gallery: JSON.stringify(gallery) },
  });

  return NextResponse.json(project, { status: 201 });
}
