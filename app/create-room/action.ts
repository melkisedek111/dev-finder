"use server";

import { createRoom } from "@/data-access/room";
import { getSession } from "@/lib/auth";
import { db } from "@/src/db";
import { Room, room } from "@/src/db/schema";
import { revalidatePath } from "next/cache";


export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
    const session = await getSession();
    
    if (!session) throw new Error("you must be logged in to create this room");

    await createRoom({...roomData }, session?.user.id);

    revalidatePath("/");
}