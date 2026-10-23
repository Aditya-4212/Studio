import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { z } from "zod";

const statusSchema = z.object({
  status: z.enum(["new", "contacted", "archived"]),
});

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  const body = await req.json();
  const parsed = statusSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  const inquiry = await prisma.inquiry.update({
    where: { id: params.id },
    data: { status: parsed.data.status },
  });

  return NextResponse.json(inquiry);
}

export async function DELETE(_req: Request, { params }: { params: { id: string } }) {
  const unauthorized = await requireAdmin();
  if (unauthorized) return unauthorized;

  await prisma.inquiry.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
