// File: /api/user/earnings/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const REWARD_PER_REFERRAL = 20;

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    if (!user) return NextResponse.json({ error: 'User not found' }, { status: 404 });

    const referrals = await prisma.enrollment.findMany({
      where: {
        referredBy: user.referralCode,
        approved: true,
      },
      include: {
        user: true,
        course: true,
      },
    });

    const totalEarnings = referrals.length * REWARD_PER_REFERRAL;

    return NextResponse.json({
      earnings: totalEarnings,
      canRequest: totalEarnings >= 100,
      referrals,
    });
  } catch (err) {
    console.error('Referral earnings error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
