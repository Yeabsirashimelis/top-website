import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

type GetParams = Promise<{ id: string }>;

export async function GET(request: Request, { params }: { params: GetParams }) {
  const { id } = await params;
  const courseId = parseInt(id);
  const course = await prisma.course.findUnique({
    where: { id: courseId },
  });

  if (!course) {
    return NextResponse.json({ error: "Course not found" }, { status: 404 });
  }

  return NextResponse.json(course);
}
