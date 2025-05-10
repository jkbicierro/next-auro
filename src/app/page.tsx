"use client";

import { BlurFade } from "@/components/magicui/blur-fade";
import { Ripple } from "@/components/magicui/ripple";
import { TextAnimate } from "@/components/magicui/text-animate";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Github } from "lucide-react";
import Link from "next/link";

//import Image from "next/image";

export default function Home() {
    //const router = useRouter();

    return (
        <>
            <nav className="z-50 fixed bg-background px-[20px] lg:px-[100px] xl:px-[150px] 2xl:px-[400px] h-[60px] w-full flex items-center justify-between border-b">
                <div>Auro</div>

                <div>
                    <Button size={"icon"} variant={"ghost"} asChild>
                        <Link href="https://github.com/jkbicierro/next-auro">
                            <Github />
                        </Link>
                    </Button>
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
                        >
                            Where Access Meets Accountability
                        </TextAnimate>
                        <BlurFade delay={1}>
                            <div className="flex gap-2 items-center">
                                <Input
                                    placeholder="Got a ticket? Paste it here"
                                    className="w-[300px]"
                                />
                                <Button>View Ticket</Button>
                            </div>
                        </BlurFade>
                        <Link href={"/auth/login"}>
                            <TextAnimate
                                animation="scaleUp"
                                by="text"
                                as={"small"}
                                delay={1.5}
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
