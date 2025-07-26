// File: /api/user/request-payout/route.ts
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };

    const { fullName, bankAccount } = await req.json();
    if (!fullName || !bankAccount) {
      return NextResponse.json({ error: 'Please provide full name and bank account number.' }, { status: 400 });
    }

    // Count eligible referrals
    const referralCount = await prisma.enrollment.count({
      where: { referredBy: (await prisma.user.findUnique({ where: { id: decoded.id } }))?.referralCode || '' },
    });

    const totalEarnings = referralCount * 20;
    if (totalEarnings < 100) {
      return NextResponse.json({ error: 'Minimum 100 birr required to request payout.' }, { status: 400 });
    }

    // Create payout request
    await prisma.payoutrequest.create({
      data: {
        userId: decoded.id,
        amount: totalEarnings,
        status: 'pending',
        fullName,
        bankAccount,
      },
    });

    return NextResponse.json({ message: 'Payout request submitted.' });
  } catch (err) {
    console.error('Payout error:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
