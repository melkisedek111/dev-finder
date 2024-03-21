"use client"

import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogInIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import Link from "next/link";


function AccountDropdown() {
    const session = useSession();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant={"link"}>
                    <Avatar className="mr-2">
                        <AvatarImage src={session?.data?.user?.image!} width={50} height={50} alt={"Avatar"} />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    {session?.data?.user.name}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
                    <LogOutIcon /> Sign Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export function Header() {
    const session = useSession();
    const isLoggedIn = !!session.data;

    return <header className="bg-gray-100 py-2 dark:bg-gray-900 ">
        <div className="flex justify-between items-center container mx-auto z-10 relative">
            <Link href="/" className="flex gap-2 items-center text-xl hover:underline">
                <Image src={"/icon.svg"} width={60} height={60} alt="app icon" />
                Dev Finder
            </Link>

            {isLoggedIn && (
                <nav className="flex gap-8">
                    <Link
                        className="hover:underline"
                        href="/browse">
                        Browse
                    </Link>
                    <Link
                        className="hover:underline"
                        href="/your-rooms">
                        Your Rooms
                    </Link>
                </nav>
            )}

            <div className="flex items-center gap-4">
                {isLoggedIn && <AccountDropdown />}
                {!isLoggedIn &&
                    <Button onClick={() => signIn("google")} variant={"link"}>
                        <LogInIcon className="mr-2" /> Sign In
                    </Button>
                }

                <ModeToggle />
            </div>
        </div>
    </header>
}