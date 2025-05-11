"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { ShineBorder } from "@/components/magicui/shine-border";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Approval_Ticket } from "@/models/ticket.model";

export default function TicketScreen() {
    const [ticket, setTicket] = useState<Approval_Ticket | null>(null);

    const params = useParams();
    const ticketId = params.ticketId as string;

    useEffect(() => {
        if (!ticketId) return;

        async function fetchTicket() {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ticket/show`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ ticket_id: ticketId }),
                    }
                );
                if (res.ok) {
                    const data = await res.json();
                    const ticket = data.ticket[0];
                    setTicket(ticket);
                }
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong. Please try agian later.");
            }
        }

        fetchTicket();
    }, [ticketId]);

    return (
        <>
            <main className="min-h-dvh bg-black text-white flex flex-col items-center justify-center px-4">
                <h2 className="text-xl font-semibold text-white mb-2">
                    Ticket retrieved. Let Auro take it from here.
                </h2>
                <p className="text-sm text-zinc-400 mb-8">PUTA</p>

                {ticket ? (
                    <div className="relative h-[280 px] w-[550px] rounded-2xl border p-7 shadow-xl">
                        <div
                            className={`absolute top-4 right-4 h-3 w-3 rounded-full ${
                                ticket.status === "Approved"
                                    ? "bg-green-500"
                                    : ticket.status === "For Approval"
                                    ? "bg-yellow-400"
                                    : "bg-red-500"
                            }`}
                        />

                        <span className="text-xs text-zinc-400 mb-3">
                            This ticket is approved by the Admin
                        </span>

                        <h3 className="text-2xl mt-10 font-semibold mb-1">
                            {ticket.title}
                        </h3>
                        <p className="text-sm pb-8 text-zinc-300 mb-4">
                            {ticket.type}
                        </p>
                        <span className="text-sm  text-white font-medium mb-1">
                            {ticket.department}
                        </span>
                        <div className="mt-10 text-[11px] text-zinc-500 flex justify-between">
                            <span>{ticket.id}</span>
                            <span>{ticket.reference_id}</span>
                        </div>
                    </div>
                ) : (
                    <Spinner>
                        <p className="mt-2">Wait just a moment...</p>
                    </Spinner>
                )}
            </main>
        </>
    );
}
