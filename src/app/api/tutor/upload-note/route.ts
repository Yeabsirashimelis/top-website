import { writeFile } from 'fs/promises';
import path from 'path';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { existsSync, mkdir } from 'fs';

const JWT_SECRET = process.env.JWT_SECRET!;
const uploadDir = path.join(process.cwd(), 'public', 'notes');

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });

    const decoded = jwt.verify(token, JWT_SECRET) as { id: number; role: string };
    if (decoded.role !== 'tutor') return NextResponse.json({ message: 'Forbidden' }, { status: 403 });

    const formData = await req.formData();
    const subjectId = parseInt(formData.get('subjectId') as string);
    const file = formData.get('file') as File;

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName = `${randomUUID()}-${file.name}`;
    const filePath = path.join(uploadDir, fileName);

   

    await writeFile(filePath, buffer);
    const fileUrl = `/notes/${fileName}`;

    await prisma.note.create({
      data: {
        fileUrl,
        subjectId,
      },
    });

    return NextResponse.json({ message: 'Note uploaded successfully' });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ message: 'Failed to upload note' }, { status: 500 });
  }
}
