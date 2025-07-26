import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; role: string };
    if (decoded.role !== 'student') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

    const { subjectId, type, answers } = await req.json();

    if (!['mid', 'final'].includes(type)) {
      return NextResponse.json({ error: 'Invalid exam type' }, { status: 400 });
    }

    if (!Array.isArray(answers) || answers.length === 0) {
      return NextResponse.json({ error: 'No answers provided' }, { status: 400 });
    }

    let correctCount = 0;

    for (const ans of answers) {
      const q = await prisma.question.findUnique({ where: { id: ans.questionId } });
      if (!q || q.type !== type || q.subjectId !== parseInt(subjectId)) continue;

      const isCorrect = q.correct === ans.selected;
      if (isCorrect) correctCount++;

      await prisma.studentAnswer.create({
        data: {
          studentId: decoded.id,
          subjectId: parseInt(subjectId),
          questionId: ans.questionId,
          selected: ans.selected,
          isCorrect,
          type,
        },
      });
    }

    const total = answers.length;
    const score = Math.round((correctCount / total) * 100);

    return NextResponse.json({ message: 'Exam submitted', score });
  } catch (err) {
    console.error('Submit exam error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
