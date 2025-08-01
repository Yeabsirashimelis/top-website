"use client";

import { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import "@livekit/components-styles";
import { Loader2 } from "lucide-react";

interface LiveClassroomRoomProps {
  roomName: string;
}

function generateRandomUsername() {
  const adjectives = ["Swift", "Bright", "Clever", "Brave", "Mighty", "Silent"];
  const nouns = ["Falcon", "Tiger", "Wolf", "Eagle", "Panther", "Lion"];
  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const noun = nouns[Math.floor(Math.random() * nouns.length)];
  const randomNum = Math.floor(Math.random() * 1000);
  return `${adjective}${noun}${randomNum}`;
}

export default function LiveClassroomRoom({ roomName }: LiveClassroomRoomProps) {
  const [token, setToken] = useState("");
  const [username] = useState(() => generateRandomUsername());

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          `/api/livekit?room=${roomName}&username=${encodeURIComponent(username)}`
        );
        const data = await response.json();
        setToken(data.token);
      } catch (error) {
        console.error("Error fetching LiveKit token:", error);
      }
    })();
  }, [roomName, username]);

  if (!token) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center">
        <Loader2 className="my-4 h-7 w-7 animate-spin text-zinc-500" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading LiveKit room...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      dark-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={true}
      audio={true}
    >
      <VideoConference />
    </LiveKitRoom>
  );
}
