import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: Request) {
  const token = req.headers.get('cookie')?.match(/token=([^;]+)/)?.[1];
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const decoded = jwt.verify(token, JWT_SECRET) as { role: string };
  if (decoded.role !== 'tutor') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const subjects = await prisma.subject.findMany({
    select: { id: true, title: true }
  });

  return NextResponse.json(subjects);
}
