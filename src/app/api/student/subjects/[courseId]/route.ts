import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

type GetParams = Promise<{ courseId: string }>;

export async function GET(req: NextRequest, { params }: { params: GetParams }) {
  const token = req.cookies.get("token")?.value;
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const decoded = jwt.verify(token, JWT_SECRET) as { id: number; role: string };

  const { courseId } = await params;

  // Check if user is enrolled in this course
  const enrollment = await prisma.enrollment.findFirst({
    where: {
      studentId: decoded.id,
      courseId: parseInt(courseId),
      approved: true,
    },
  });

  if (!enrollment) {
    return NextResponse.json(
      { error: "Not enrolled in this course" },
      { status: 403 }
    );
  }

  const subjects = await prisma.subject.findMany({
    where: { courseId: parseInt(courseId) },
    select: { id: true, title: true },
  });

  return NextResponse.json(subjects);
}
