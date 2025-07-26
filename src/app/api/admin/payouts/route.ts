import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const decoded = jwt.verify(token, JWT_SECRET) as { id: number; role: string };
  if (decoded.role !== "admin")
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const payouts = await prisma.payoutrequest.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: { fullName: true, email: true, role: true },
      },
    },
  });

  return NextResponse.json(payouts);
}
