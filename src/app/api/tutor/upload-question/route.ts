import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const decoded = jwt.verify(token, JWT_SECRET) as { role: string };
  if (decoded.role !== 'tutor') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { subjectId, type, content, optionA, optionB, optionC, optionD, correct } = await req.json();

  if (!['conceptual', 'mid', 'final'].includes(type)) {
    return NextResponse.json({ error: 'Invalid question type' }, { status: 400 });
  }

  if (!['A', 'B', 'C', 'D'].includes(correct)) {
    return NextResponse.json({ error: 'Correct answer must be A–D' }, { status: 400 });
  }

  await prisma.question.create({
    data: {
      subjectId: parseInt(subjectId),
      type,
      content,
      optionA,
      optionB,
      optionC,
      optionD,
      correct,
    },
  });

  return NextResponse.json({ message: 'Question uploaded successfully' });
}
