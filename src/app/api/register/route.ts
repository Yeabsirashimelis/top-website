import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

export async function POST(req: Request) {
  const data = await req.json();
  const { fullName, email, password } = data;

  if (!fullName || !email || !password) {
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
      referralCode
    },
  });

  return NextResponse.json({ message: 'Registered successfully', userId: user.id });
}
