import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export async function POST(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const decoded = jwt.verify(token, JWT_SECRET) as { role: string };
  if (decoded.role !== 'admin') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  const { fullName, email, password, role } = await req.json();

  if (!fullName || !email || !password || !role) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const referralCode = nanoid(8);

  const user = await prisma.user.create({
    data: {
      fullName,
      email,
      password: hashedPassword,
      referralCode,
      role,
    },
  });

  return NextResponse.json({ message: 'User created', user });
}
