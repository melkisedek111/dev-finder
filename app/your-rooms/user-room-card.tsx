"use client";

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
import { GitHubLogoIcon, Pencil1Icon } from "@radix-ui/react-icons";
import { TagsList } from "@/components/tags-list";
import { splitTags } from "@/lib/utils";
import { TrashIcon } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteRoomAction } from "./actions";

export default function UserRoomCard({ room }: { room: Room }) {
    return (
        <Card>
            <CardHeader className="relative">
                <Button size={"icon"} className="absolute top-2 right-1">
                    <Link href={`/edit-room/${room.id}`}>
                        <Pencil1Icon />
                    </Link>
                </Button>
                <CardTitle>{room.name}</CardTitle>
                <CardDescription>{room.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <TagsList tags={splitTags(room.tags)} />

                {room.githubRepo &&
                    <Link
                        href={room.githubRepo}
                        className="flex items-center gap-2"
                        target="_blank"
                        rel="noopener noreferrer">
                        <GitHubLogoIcon /> Github Repo
                    </Link>}
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button asChild>
                    <Link href={`/rooms/${room.id}`}>Join Room</Link>
                </Button>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant={"destructive"}>
                            <TrashIcon className="mr-2" /> Delete Room
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete and remove your room and any data associated with it.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => deleteRoomAction(room.id)}>Yes, Delete</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    )
}
