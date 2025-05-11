"use client";

import {
    Code,
    Github,
    LogOut,
    User as UserIcon,
    HeartHandshake,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { Button } from "../ui/button";

export function NavBar() {
    const [session, setSession] = useState(false);
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
                    setSession(true);
                }
            } catch (err) {
                console.error("[GetSession] Error:", err);
                toast.error("[GetSession] Failed to fetch. Please try again.");
            }
        }

        GetSession();
    }, [router]);

    async function Logout() {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/logout`,
                {
                    method: "POST",
                    credentials: "include",
                }
            );
            const { message } = await res.json();

            if (res.ok) {
                router.push("/auth/login");
                toast.success(message);
            }
        } catch (err) {
            console.error("[Logout] Error:", err);
            toast.error("[Logout] Failed to fetch. Please try again.");
        }
    }

    return (
        <>
            <nav className="z-50 fixed bg-background px-[20px] lg:px-[100px] xl:px-[150px] 2xl:px-[400px] h-[70px] w-full flex items-center justify-between border-b">
                <Link href={"/"}>
                    <div className="flex flex-row items-center gap-3">
                        <div className="bg-zinc-800 rounded-full w-[35px] h-[35px] flex items-center justify-center font-bold">
                            <div className="bg-zinc-700 w-[25px] h-[25px] rounded-full flex items-center justify-center">
                                <div className="bg-zinc-600 w-[15px] h-[15px] rounded-full flex items-center justify-center">
                                    <div className="bg-zinc-500 w-[5px] h-[5px] rounded-full flex items-center justify-center"></div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="font-semibold">Auro</span>
                            <small>ver0.1.15-alpha</small>
                        </div>
                    </div>
                </Link>

                <div className="flex items-center gap-3">
                    <Button
                        className="rounded-[0px]"
                        effect="ringHover"
                        asChild
                    >
                        <Link
                            href={"https://github.com/jkbicierro/express-auro"}
                            target="_blank"
                        >
                            <Github /> express-auro
                        </Link>
                    </Button>
                    <Button
                        className="rounded-[0px]"
                        variant={"outline"}
                        effect="ringHover"
                        asChild
                    >
                        <Link
                            href={"https://github.com/jkbicierro/next-auro"}
                            target="_blank"
                        >
                            <Github />
                            next-auro
                        </Link>
                    </Button>

                    {session ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger>
                                <Avatar>
                                    <AvatarImage
                                        src="https://github.com/jkbicierro.png"
                                        alt="@shadcn"
                                    />
                                    <AvatarFallback>
                                        <UserIcon />
                                    </AvatarFallback>
                                </Avatar>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[200px]">
                                <DropdownMenuLabel>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage
                                                src="https://github.com/jkbicierro.png"
                                                alt="@shadcn"
                                            />
                                            <AvatarFallback>
                                                <UserIcon />
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="flex flex-col">
                                            <span className="text-[14px]">
                                                John Bicierro
                                            </span>
                                            <small className="text-zinc-400 w-[120px] truncate">
                                                jbicierro@gbox.adnu.edu.ph
                                            </small>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />

                                <DropdownMenuItem>
                                    <HeartHandshake />
                                    Support
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Code /> API Docs
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="hover:bg-red-500/50  text-red-400"
                                    onClick={Logout}
                                >
                                    <LogOut className="text-red-400" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <></>
                    )}
                </div>
            </nav>
            <div className="h-[70px]"></div>
        </>
    );
}
