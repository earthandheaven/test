import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const parfumId = parseInt(id);

  if (isNaN(parfumId)) {
    return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
  }

  const parfum = await prisma.originalPerfume.findUnique({
    where: { id: parfumId },
    include: {
      dupes: {
        include: {
          reviews: {
            orderBy: { createdAt: "desc" },
          },
        },
      },
    },
  });

  if (!parfum) {
    return NextResponse.json(
      { error: "Parfum tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json(parfum);
}
