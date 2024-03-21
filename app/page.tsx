import { Button } from "@/components/ui/button";
import { db } from "@/src/db";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Room } from "@/src/db/schema";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { getRooms } from "@/data-access/room";
import { splitTags, TagsList } from "@/components/tags-list";

function RoomCard({ room }: { room: Room }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <TagsList tags={splitTags(room.tags)} />

        {room.githubRepo &&
          <Link href={room.githubRepo} className="flex items-center gap-2" target="_blank" rel="noopener noreferrer">
            <GitHubLogoIcon /> Github Repo
          </Link>}
      </CardContent>
      <CardFooter>
        <Button asChild><Link href={`/rooms/${room.id}`}>Join Room</Link></Button>
      </CardFooter>
    </Card>
  )
}

export default async function Home() {
  const rooms = await getRooms();
  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center w-full mb-8">
        <h1 className="text-4xl">Find Dev Rooms</h1>
        <Button asChild><Link href="/create-room">Create Room</Link></Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {rooms.map(room => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
}
