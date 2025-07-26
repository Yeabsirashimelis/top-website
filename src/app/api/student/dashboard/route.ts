import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { calculateCourseGPA, calculateSubjectGPA } from '@/lib/gpa';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Not logged in' }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    const enrollments = await prisma.enrollment.findMany({
      where: {
        studentId: decoded.id,
        approved: true,
      },
      include: {
        course: true,
      },
    });

    const courses = await Promise.all(
  enrollments.map(async (enrollment) => {
    const subjects = await prisma.subject.findMany({ where: { courseId: enrollment.courseId } });

    const subjectScores = await Promise.all(
      subjects.map((s) =>
        calculateSubjectGPA(user!.id, s.id).then((res) => ({
          title: s.title,
          ...res,
        }))
      )
    );

    const subjectGPAs = subjectScores
      .map((s) => s.gpa)
      .filter((gpa): gpa is number => typeof gpa === 'number' && !isNaN(gpa));
    const courseGpa = subjectGPAs.length
      ? Math.round(subjectGPAs.reduce((a: number, b: number) => a + b, 0) / subjectGPAs.length)
      : null;

    return {
      id: enrollment.course.id,
      title: enrollment.course.title,
      gpa: courseGpa,
      subjects: subjectScores,
    };
  })
);


    return NextResponse.json({
      fullName: user?.fullName,
      referralCode: user?.referralCode,
      earnings: 0, // update if needed
      courses,
    });
  } catch (err) {
    console.error('Dashboard error:', err);
    return NextResponse.json({ error: 'Invalid token' }, { status: 403 });
  }
}
