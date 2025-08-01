'use server';

import Link from 'next/link';
import { createRoomAction, deleteRoomAction } from './actions';
import { prisma } from '@/lib/prisma';

export default async function OnlineClassPage() {
  const rooms = await prisma.onlineclass.findMany();

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Online Classrooms</h1>

      {/* Create Room Form */}
      <form action={createRoomAction} className="flex gap-2 mb-4">
        <input
          name="name"
          type="text"
          placeholder="Enter room name"
          required
          className="border px-3 py-2 rounded w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </form>

      {/* List of Rooms */}
      <ul className="space-y-3">
        {rooms.map((room) => (
          <li
            key={room.id}
            className="border p-3 flex justify-between items-center rounded"
          >
         <Link href={`/tutor/online-classroom/${room.id}`} className="text-blue-700 underline">
              {room.name}
            </Link>


            {/* Delete Room Form */}
            <form action={deleteRoomAction}>
              <input
                type="hidden"
                name="id"
                value={room.id.toString()}
              />
              <button
                type="submit"
                className="text-red-600 hover:underline"
              >
                Delete
              </button>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
