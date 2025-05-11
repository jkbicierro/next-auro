"use client";

import { NavBar } from "@/components/block/navbar";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Ripple } from "@/components/magicui/ripple";
import { TextAnimate } from "@/components/magicui/text-animate";
import { WordRotate } from "@/components/magicui/word-rotate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
    return (
        <>
            <NavBar />
            <main className="h-[85dvh] flex items-center justify-center relative overflow-hidden">
                <div className="w-full h-full relative z-10">
                    <div className="h-full flex flex-col items-center justify-center text-center gap-5">
                        <BlurFade delay={0.2}>
                            <h1 className="flex gap-4 items-center">
                                Power Your Process with
                            </h1>

                            <WordRotate
                                className="text-4xl font-bold text-green"
                                words={["Auro", `Fast`, "Simple", "Secure"]}
                                duration={4500}
                            />
                        </BlurFade>

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
