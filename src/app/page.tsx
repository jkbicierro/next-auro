"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Ripple } from "@/components/magicui/ripple";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Github, Link2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

//import Image from "next/image";

export default function Home() {
    return (
        <>
            <nav className="z-50 fixed bg-background px-[20px] lg:px-[100px] xl:px-[150px] 2xl:px-[400px] h-[60px] w-full flex items-center justify-between border-b">
                <div>Auro</div>

                <div>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button size={"icon"} variant={"ghost"}>
                                <Github />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] px-5 py-2">
                            <div>
                                <ul className="flex flex-col gap-2">
                                    <Link
                                        href={
                                            "https://github.com/jkbicierro/express-auro"
                                        }
                                    >
                                        <li className="hover:text-zinc-200 cursor-pointer flex items-center gap-2">
                                            <Link2 size={14} />
                                            express-auro
                                        </li>
                                    </Link>
                                    <Link
                                        href={
                                            "https://github.com/jkbicierro/next-auro"
                                        }
                                    >
                                        <li className="hover:text-zinc-200 cursor-pointer flex items-center gap-2">
                                            <Link2 size={14} /> next-auro
                                        </li>
                                    </Link>
                                </ul>
                            </div>
                        </PopoverContent>
                    </Popover>
                </div>
            </nav>
            <main className="h-screen flex items-center justify-center relative overflow-hidden">
                <div className="w-full h-full relative z-10">
                    <div className="h-full flex flex-col items-center justify-center text-center gap-5">
                        <TextAnimate animation="scaleUp" by="text" as={"h1"}>
                            Power Your Process with Auro
                        </TextAnimate>
                        <TextAnimate
                            animation="scaleUp"
                            by="text"
                            as={"p"}
                            delay={0.5}
                            className="text-zinc-400"
                        >
                            Where Access Meets Accountability
                        </TextAnimate>

                        <BlurFade delay={1}>
                            <TicketInput />
                        </BlurFade>

                        <Link href={"/auth/login"}>
                            <TextAnimate
                                animation="scaleUp"
                                by="text"
                                as={"small"}
                                delay={1.5}
                                className="text-zinc-400"
                            >
                                You don&apos;t have a ticket? Click here to
                                login
                            </TextAnimate>
                        </Link>
                    </div>
                </div>

                <div className="fixed inset-0 overflow-hidden -z-10">
                    <Ripple mainCircleSize={50} numCircles={10} />
                </div>
            </main>
        </>
    );
}

function TicketInput() {
    const router = useRouter();
    const [ticketId, setTicketId] = useState("");

    async function CheckTicket() {
        if (!ticketId) {
            toast.warning("Please enter a ticket ID");
            return;
        }

        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ticket/show`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    body: JSON.stringify({ ticket_id: ticketId }),
                }
            );

            const data = await res.json();
            if (res.ok) {
                toast.success(data.message);
                router.push(`/ticket/${ticketId}`);
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            console.error(err);
        }
    }
    return (
        <div className="flex gap-2 items-center">
            <Input
                placeholder="Got a ticket? Paste it here"
                className="w-[300px] bg-stone-950/70"
                value={ticketId}
                onChange={(e) => setTicketId(e.target.value)}
            />
            <Button onClick={CheckTicket}>View Ticket</Button>
        </div>
    );
}
