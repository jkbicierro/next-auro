"use client";

//import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { PasswordInput } from "@/components/ui/passport-input";
import { Checkbox } from "@/components/ui/checkbox";

import { FcGoogle } from "react-icons/fc";
import { GrGithub } from "react-icons/gr";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginScreen() {
    return (
        <main className="h-dvh flex items-center justify-center">
            <div className="w-[350px]">
                <div>
                    <h1>Sign in to Auro</h1>
                    <p className="mt-2">We are happy to see you again!</p>
                </div>

                <div className="mt-5 flex flex-col gap-4">
                    <Button variant={"outline"} className="rounded-full">
                        <FcGoogle /> Continue with Google
                    </Button>
                    <Button variant={"outline"} className="rounded-full">
                        <GrGithub />
                        Continue with Github
                    </Button>
                </div>

                <hr className="mt-5" />

                <div className="mt-5">
                    <LoginForm />
                </div>
            </div>
        </main>
    );
}

const formSchema = z.object({
    email: z.string().min(1),
    password: z.string(),
});

function LoginForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            // Send the data to the server or perform any action with it
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include", // Cookies will be sent with the request
                    body: JSON.stringify(values),
                }
            );

            const data = await res.json();
            console.log(data);

            if (res.ok) {
                toast.success(data.message);
                router.push("/admin"); // Redirect to the dashboard or any other page
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Form submission error:", error);
        }
    }
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your email"
                                    type="email"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <PasswordInput
                                    placeholder="Enter your password"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <Checkbox /> Remember me
                    </div>
                    <span className="hover:underline cursor-pointer">
                        Forgot password?
                    </span>
                </div>

                <Button type="submit" className="w-full rounded-full mt-5">
                    Continue with Email
                </Button>
            </form>
        </Form>
    );
}
