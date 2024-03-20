import { db } from "@/src/db"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import type { Adapter } from "next-auth/adapters";
import { AuthConfig } from "@/lib/auth";

const handler = NextAuth(AuthConfig)
    
export { handler as GET, handler as POST }