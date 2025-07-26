import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const decoded = jwt.verify(token, JWT_SECRET) as { role: string };
  if (decoded.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const [userCounts, enrollments, payouts, topReferrers] = await Promise.all([
    prisma.user.groupBy({
      by: ['role'],
      _count: true,
    }),
    prisma.enrollment.count({ where: { approved: true } }),
    prisma.payoutrequest.aggregate({
      where: { status: 'approved' },
      _sum: { amount: true },
    }),
    prisma.enrollment.groupBy({
      by: ['referredBy'],
      where: { approved: true, referredBy: { not: null } },
      _count: true,
      orderBy: { _count: { id: 'desc' } },
      take: 5,
    }),
  ]);

  const topUsers = await Promise.all(
    topReferrers.map(async (ref) => {
      const user = await prisma.user.findFirst({
        where: { referralCode: ref.referredBy || '' },
        select: { fullName: true, email: true, role: true },
      });
      return {
        ...user,
        referrals: ref._count,
      };
    })
  );

  return NextResponse.json({
    userCounts,
    totalEnrollments: enrollments,
    totalPayouts: payouts._sum.amount || 0,
    topReferrers: topUsers,
  });
}
