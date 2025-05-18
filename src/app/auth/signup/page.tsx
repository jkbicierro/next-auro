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
import { FcGoogle } from "react-icons/fc";
import { GrGithub } from "react-icons/gr";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import FooterSection from "@/components/block/footer";
import Link from "next/link";
import { NavBar } from "@/components/block/navbar";

export default function SignupScreen() {
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
                <div className="w-[350px]">
                    <div>
                        <h3>Sign up to Auro</h3>
                        <p className="mt-2">
                            Don&apos;t have an account? Create one here!
                        </p>
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
                        <SignupForm />
                    </div>
                    <div className="mt-3 flex justify-center h-full">
                        <Link href="/auth/login">
                            <small>
                                If you already have an account{" "}
                                <span className="underline">Log in</span>
                            </small>
                        </Link>
                    </div>
                </div>
                {/* <div className="w-[350px] h-[600px] border">
                    API Reference for Sign up
                </div> */}
            </main>
            <FooterSection />
        </>
    );
}

const formSchema = z
    .object({
        name: z.string().min(1, "Name is required"),
        email: z.string().min(1, "Email is required").email("Invalid email"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Confirm Password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

function SignupForm() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({
                        name: values.name,
                        email: values.email,
                        password: values.password,
                    }),
                }
            );

            const data = await res.json();
            if (res.ok) {
                toast.success(data.message);
                router.push("/admin/ticket");
            } else {
                toast.error(data.message || "Signup failed");
            }
        } catch (error) {
            console.error("Signup error:", error);
            toast.error("Something went wrong. Try again.");
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
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your name"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
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
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <PasswordInput
                                    placeholder="Confirm your password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full rounded-full mt-5">
                    Sign up with Email
                </Button>
            </form>
        </Form>
    );
}
