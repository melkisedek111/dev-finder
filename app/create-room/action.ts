"use server";

import { getSession } from "@/lib/auth";
import { db } from "@/src/db";
import { Room, room } from "@/src/db/schema";


export async function createRoomAction(roomData: Omit<Room, "id" | "userId">) {
    const session = await getSession();
    
    if (!session) throw new Error("you must be logged in to create this room");

    await db.insert(room).values({...roomData, userId: session?.user.id });
}