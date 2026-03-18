import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const brand = searchParams.get("brand") || "";

  const parfums = await prisma.originalPerfume.findMany({
    where: {
      AND: [
        q
          ? {
              OR: [
                { name: { contains: q } },
                { brand: { contains: q } },
                { notes: { contains: q } },
              ],
            }
          : {},
        brand ? { brand: { contains: brand } } : {},
      ],
    },
    include: {
      dupes: {
        select: {
          id: true,
          name: true,
          brand: true,
          priceMin: true,
          priceMax: true,
          similarity: true,
        },
      },
    },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(parfums);
}
