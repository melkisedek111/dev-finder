"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { createRoomAction } from "./action";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
    name: z.string().min(1).max(50),
    description: z.string().min(1).max(250),
    githubRepo: z.string().min(1).max(50),
    tags: z.string().min(1).max(50),
})

export function CreateRoomForm() {
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            githubRepo: "",
            tags: ""
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const room = await createRoomAction(values);
        toast({
            title: "Room Create",
            description: "Your room was successfully created.",
        })
        router.push(`/rooms/${room.id}`);
    }

    return (
        <div >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Dev finder is awesome" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input placeholder="I'm working on a side project, come and join me" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Please describe what you are coding on.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="githubRepo"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Github Repo</FormLabel>
                                <FormControl>
                                    <Input placeholder="Your github repo" {...field} />
                                </FormControl>
                                <FormDescription>
                                    Please put a link to the project that you are working on.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="tags"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Tags</FormLabel>
                                <FormControl>
                                    <Input placeholder="typescript, javascript, nextjs" {...field} />
                                </FormControl>
                                <FormDescription>
                                    List your programming languages, framework, libraries so people can find your content
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
}