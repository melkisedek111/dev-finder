"use server";

import { editRoom, getRoom } from "@/data-access/room";
import { getSession } from "@/lib/auth";
import { db } from "@/src/db";
import { Room, room } from "@/src/db/schema";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";


export async function editRoomAction(roomData: Omit<Room, "userId">) {
    const session = await getSession();
    
    if (!session) throw new Error("you must be logged in to edit this room");

    const room = await getRoom(roomData.id);
    if (room?.userId !== session.user.id) throw new Error("User not authorized");

    await editRoom({...roomData, userId: room.userId});

    revalidatePath(`/your-rooms`);
    revalidatePath(`/edit-room/${roomData.id}`);
    redirect(`/your-rooms`);
}