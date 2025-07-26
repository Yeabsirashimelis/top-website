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

  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id: parseInt(id) },
  });

  if (user?.role === "admin") {
    const adminCount = await prisma.user.count({ where: { role: "admin" } });
    if (adminCount <= 1) {
      return NextResponse.json(
        { error: "Cannot delete the last admin" },
        { status: 403 }
      );
    }
  }

  const decoded = jwt.verify(token, JWT_SECRET) as { role: string };
  if (decoded.role !== "admin")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  await prisma.user.delete({ where: { id: parseInt(id) } });

  return NextResponse.json({ message: "User deleted" });
}
