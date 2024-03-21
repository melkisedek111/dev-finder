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
import { DeleteIcon, LogInIcon, LogOutIcon } from "lucide-react";
import Image from "next/image";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import Link from "next/link";
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
import { useState } from "react";
import { deleteAccountAction } from "./actions";

function AccountDropdown() {
    const session = useSession();
    const [open, setOpen] = useState<boolean>(false);

    return (
        <>
            <AlertDialog open={open} onOpenChange={setOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete and remove your account and any data associated with it.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={async () => { 
                            await deleteAccountAction();
                            signOut({callbackUrl: "/"});
                            }}>Yes, Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
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
                        <LogOutIcon className="mr-2" /> Sign Out
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => { setOpen(true) }}>
                        <DeleteIcon className="mr-2" /> Delete Account
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>

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