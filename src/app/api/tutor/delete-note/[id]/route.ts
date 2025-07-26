import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

type DeleteParams = Promise<{ id: string }>;

export async function DELETE(
  _: NextRequest,
  { params }: { params: DeleteParams }
) {
  const { id } = await params;
  const noteId = parseInt(id);
  await prisma.note.delete({ where: { id: noteId } });
  return NextResponse.json({ message: "Note deleted" });
}
