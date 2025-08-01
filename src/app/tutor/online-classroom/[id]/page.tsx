import LiveClassroomRoom from '@/lib/liveKitRoom';
import { prisma } from '@/lib/prisma';

interface OnlineClassroomPageProps {
  params: { id: string };
}

export default async function OnlineClassroomPage({ params }: OnlineClassroomPageProps) {
  const id = parseInt(params.id);

  const classroom = await prisma.onlineclass.findUnique({
    where: { id },
  });

  if (!classroom) {
    return <div className="p-4 text-red-600">Classroom not found.</div>;
  }

  return (
    <div className="h-screen flex flex-col">
      <header className="p-4 border-b">
        <h1 className="text-3xl font-bold">{classroom.name}</h1>
      </header>

      <main className="flex-1">
        {/* LiveKit Room for this classroom */}
        <LiveClassroomRoom roomName={classroom.id.toString()} />
      </main>
    </div>
  );
}
