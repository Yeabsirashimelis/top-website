import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
  const user = await prisma.user.findUnique({
    where: { id: decoded.id },
    select: {
      fullName: true,
      email: true,
      role: true,
      referralCode: true,
    },
  });

  return NextResponse.json(user);
}
