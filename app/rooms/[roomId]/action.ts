"use server";

import { getSession } from "@/lib/auth";
import { StreamChat } from "stream-chat";

export async function generateGetStreamToken() {
    const session = await getSession();
    if (!session) throw new Error("No session found");

    const api_key = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
    const api_secret = process.env.NEXT_PUBLIC_GET_STREAM_API_SECRET!;
    console.log({session})

    const serverClient = StreamChat.getInstance(api_key, api_secret);
    const token = serverClient.createToken(session.user.id);
    return token;
}