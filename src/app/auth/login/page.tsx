"use client";

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
import { useEffect } from "react";
import FooterSection from "@/components/block/footer";
import Link from "next/link";
import { NavBar } from "@/components/block/navbar";

export default function LoginScreen() {
    const router = useRouter();

    useEffect(() => {
        async function GetSession() {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/session`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                if (res.ok) {
                    router.push("/admin/ticket");
                }
            } catch (err) {
                console.error(err);
                toast.error(
                    "Server is currently unavailable. Please try again later."
                );
            }
        }
        GetSession();
    }, [router]);

    return (
        <>
            <NavBar />
            <main className="h-[85dvh] flex items-center justify-around">
                <div className="min-w-[350px]">
                    <div>
                        <h3>Log in to Auro</h3>
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
                    <div className="mt-3 flex justify-center h-full">
                        <Link href="/auth/signup">
                            <small>
                                Don&apos;t have an account yet?{" "}
                                <span className="underline">Sign up</span>
                            </small>
                        </Link>
                    </div>
                </div>
                <div className="w-[350px] h-[600px] border">
                    API Reference for Sign in
                </div>
            </main>
            <FooterSection />
        </>
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
                router.push("/admin/ticket"); // Redirect to the dashboard or any other page
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
