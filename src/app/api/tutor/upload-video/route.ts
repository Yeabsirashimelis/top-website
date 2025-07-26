import { writeFile } from 'fs/promises';
import path from 'path';
import { prisma } from '@/lib/prisma';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';

const JWT_SECRET = process.env.JWT_SECRET!;
const uploadDir = path.join(process.cwd(), 'public', 'videos');

export async function POST(req: NextRequest) {
  try {
    const token = req.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized: No token' }, { status: 401 });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { role: string };
    if (decoded.role !== 'tutor') {
      return NextResponse.json({ error: 'Forbidden: Not a tutor' }, { status: 403 });
    }

    const formData = await req.formData();
    const subjectId = parseInt(formData.get('subjectId') as string);
    const video = formData.get('video') as File;
    const thumbnail = formData.get('thumbnail') as File;

    if (!subjectId || !video || !thumbnail) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const saveFile = async (file: File, folder: string) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const name = `${randomUUID()}-${file.name}`;
      const fullPath = path.join(folder, name);
      await writeFile(fullPath, buffer);
      return `/videos/${name}`;
    };

    const videoUrl = await saveFile(video, uploadDir);
    const thumbnailUrl = await saveFile(thumbnail, uploadDir);

    await prisma.video.create({
      data: {
        subjectId,
        url: videoUrl,
        thumbnail: thumbnailUrl,
      },
    });

    return NextResponse.json({ message: 'Video uploaded successfully' });
  } catch (err: any) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: 'Something went wrong during upload' }, { status: 500 });
  }
}
