// File: /api/admin/payouts/[id]/route.ts

import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

type PostParams = Promise<{ id: string }>;

export async function POST(
  req: NextRequest,
  { params }: { params: PostParams }
) {
  try {
    const token = req.cookies.get("token")?.value;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as {
      id: number;
      role: string;
    };
    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const payoutId = parseInt(id);

    const existing = await prisma.payoutrequest.findUnique({
      where: { id: payoutId },
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Payout request not found" },
        { status: 404 }
      );
    }

    if (existing.status !== "pending") {
      return NextResponse.json(
        { error: "Payout already processed" },
        { status: 400 }
      );
    }

    // Approve payout
    await prisma.payoutrequest.update({
      where: { id: payoutId },
      data: { status: "approved" },
    });

    return NextResponse.json({ message: "Payout approved successfully" });
  } catch (err) {
    console.error("[APPROVE_PAYOUT_ERROR]", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
