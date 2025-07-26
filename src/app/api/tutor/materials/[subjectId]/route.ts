import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type GetParams = Promise<{ subjectId: string }>;

export async function GET(_: Request, { params }: { params: GetParams }) {
  const { subjectId } = await params;

  const parsedSubjectId = parseInt(subjectId);

  const videos = await prisma.video.findMany({
    where: { subjectId: parsedSubjectId },
  });
  const notes = await prisma.note.findMany({
    where: { subjectId: parsedSubjectId },
  });
  const questions = await prisma.question.findMany({
    where: { subjectId: parsedSubjectId },
  });

  return NextResponse.json({ videos, notes, questions });
}
