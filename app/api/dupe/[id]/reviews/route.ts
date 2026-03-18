import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const dupeId = parseInt(id);

  if (isNaN(dupeId)) {
    return NextResponse.json({ error: "ID tidak valid" }, { status: 400 });
  }

  const body = await request.json();
  const { rating, comment, author } = body;

  if (!rating || !comment || !author) {
    return NextResponse.json(
      { error: "Rating, komentar, dan nama wajib diisi" },
      { status: 400 }
    );
  }

  if (rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "Rating harus antara 1-5" },
      { status: 400 }
    );
  }

  const review = await prisma.review.create({
    data: {
      rating: parseInt(rating),
      comment: comment.trim(),
      author: author.trim(),
      dupeId,
    },
  });

  return NextResponse.json(review, { status: 201 });
}
