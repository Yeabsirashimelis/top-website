import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;
type DeleteParams = Promise<{ id: string }>;

export async function DELETE(
  _: NextRequest,
  { params }: { params: DeleteParams }
) {
  const token = _.cookies.get("token")?.value;
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const decoded = jwt.verify(token, JWT_SECRET) as { role: string };
  if (decoded.role !== "tutor")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const { id } = await params;

  const questionId = parseInt(id);
  await prisma.question.delete({ where: { id: questionId } });

  return NextResponse.json({ message: "Question deleted" });
}
