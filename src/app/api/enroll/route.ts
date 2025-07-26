import { prisma } from '@/lib/prisma';
import { writeFile } from 'fs/promises';
import path from 'path';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET!;
const uploadDir = path.join(process.cwd(), 'public', 'receipts');

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const courseId = parseInt(formData.get('courseId') as string);
    const referralCode = formData.get('referralCode')?.toString().trim() || '';
    const fullName = formData.get('fullName')?.toString().trim() || '';
    const phone = formData.get('phone')?.toString().trim() || '';
    const receipt = formData.get('receipt') as File;

    const token = req.headers.get('cookie')?.match(/token=([^;]+)/)?.[1];
    if (!token) {
      return NextResponse.json({ error: 'Login to purchase the course' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number };

    // ✅ Validate referral code
    if (referralCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode },
      });

      if (!referrer) {
        return NextResponse.json({ error: 'Referral code does not exist' }, { status: 400 });
      }

      if (referrer.id === decoded.id) {
        return NextResponse.json({ error: 'You cannot use your own referral code' }, { status: 400 });
      }

      
    }

    
    


    // ✅ Save receipt file
    const buffer = Buffer.from(await receipt.arrayBuffer());
    const fileName = `${randomUUID()}-${receipt.name}`;
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);
    const imageUrl = `/receipts/${fileName}`;

    // ✅ Only store referralCode or null in DB
    await prisma.enrollment.create({
      data: {
        studentId: decoded.id,
        courseId,
        referredBy: referralCode || null,
        receiptUrl: imageUrl,
      },
    });

    // ✅ Send fullName and phone only in response (not stored)
    return NextResponse.json({
      message: 'Enrollment submitted. Awaiting admin approval.',
      studentInfo: { fullName, phone },
    });
  } catch (err) {
    console.error('Enrollment error:', err);
    return NextResponse.json({ error: 'Something went wrong.' }, { status: 500 });
  }
}
