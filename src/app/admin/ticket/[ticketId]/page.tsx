"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FooterSection from "@/components/block/footer";

export default function ViewTicket() {
    const router = useRouter();
    const { ticketId } = useParams();
    const [searchId, setSearchId] = useState("");

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
                if (!res.ok) {
                    router.push("/auth/login");
                }
            } catch (err) {
                console.error("[GetSession] Error:", err);
                toast.error("[GetSession] Failed to fetch. Please try again.");
            }
        }

        GetSession();
    }, []);

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

    function searchTicket() {
        if (!searchId || isNaN(Number(searchId))) {
            toast.warning("Please enter a valid numeric ticket ID");
            return;
        }

        router.push(`/admin/ticket/${searchId}`);
    }

    function goToHome() {
        router.push("/admin/ticket");
    }

    return (
        <>
            <nav className="px-[20px] lg:px-[100px] xl:px-[150px] 2xl:px-[400px] h-[60px] w-full flex items-center justify-between border-b">
                <div>Auro</div>
                <div>
                    <Button onClick={Logout}>Sign out</Button>
                </div>
            </nav>

            <main className="px-[20px] lg:px-[100px] xl:px-[150px] 2xl:px-[400px] mt-10 text-center">
                <h1>Power Your Process with Auro</h1>

                <div className="flex justify-center gap-2 mb-6 py-10">
                    <Input
                        placeholder="Search another ticket ID"
                        className="w-[300px]"
                        value={searchId}
                        onChange={(e) => setSearchId(e.target.value)}
                    />
                    <Button onClick={searchTicket}>View Ticket</Button>
                </div>

                <div className="max-w-5xl mx-auto pb-15">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Reference ID</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Created at</TableHead>
                            </TableRow>
                        </TableHeader>
                    </Table>
                </div>

                <p>viewing ticket #{ticketId}</p>

                <Button onClick={goToHome} variant="outline" className="mb-4">Go Back</Button>
            </main>

            <FooterSection />
        </>
    );
}