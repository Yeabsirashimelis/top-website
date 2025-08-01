'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma'; // update path if different
import { z } from 'zod';

const RoomSchema = z.object({ name: z.string().min(1) });

export async function createRoomAction(formData: FormData) {
  const parsed = RoomSchema.safeParse({ name: formData.get('name') });
  if (!parsed.success) return;

  await prisma.onlineclass.create({
    data: { name: parsed.data.name },
  });

  revalidatePath('/online-class');
}


// type DeleteParams = Promise<{ id: string }>;


export async function deleteRoomAction(formData: FormData) {
  const id =parseInt(formData.get('id') as string)
  if (!id) return;

  await prisma.onlineclass.delete({
    where: { id },
  });

  revalidatePath('/online-classroom'); // Make sure this matches the actual route
}

