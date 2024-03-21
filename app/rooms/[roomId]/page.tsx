import { TagsList } from "@/components/tags-list";
import { Badge } from "@/components/ui/badge";
import { getRoom } from "@/data-access/room";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { DevFinderVideo } from "./video-player";
import { splitTags } from "@/lib/utils";

export default async function RoomPage(props: { params: { roomId: string } }) {
    const roomId = props.params.roomId;
    console.log(props.params)

    const room = await getRoom(roomId);

    if (!room) return (<div>No room found!</div>);

    return <div className="grid-cols-4 grid min-h-screen">
        <div className="col-span-3 p-8 pr-2">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4">
                <DevFinderVideo room={room} />
            </div>
        </div>
        <div className="col-span-1 p-8 pl-2">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 flex flex-col gap-4">
                <h1 className="text-base">{room?.name}</h1>
                {room?.githubRepo &&
                    <Link href={room.githubRepo} className="flex items-center text-sm gap-2" target="_blank" rel="noopener noreferrer">
                        <GitHubLogoIcon /> Github Repo
                    </Link>
                }
                <p className="text-base text">{room?.description}</p>
                <TagsList tags={splitTags(room.tags)} />
            </div>
        </div>
    </div>
}