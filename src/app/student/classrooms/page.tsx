'use server';

import Link from 'next/link';
import { prisma } from '@/lib/prisma';

export default async function StudentOnlineClassPage() {
  const rooms = await prisma.onlineclass.findMany();

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Available Online Classrooms</h1>

      <ul className="space-y-3">
        {rooms.map((room) => (
          <li
            key={room.id}
            className="border p-3 rounded hover:bg-gray-50 flex justify-between items-center"
          >
         <Link href={`/tutor/online-classroom/${room.id}`} className="text-blue-700 underline">
              {room.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}


