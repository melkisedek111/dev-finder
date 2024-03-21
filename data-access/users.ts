import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import { eq } from "drizzle-orm";

export async function deleteUser(userId: string) {
    await db?.delete(users).where(eq(users.id, userId));

}