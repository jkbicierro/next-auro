"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import { ShineBorder } from "@/components/magicui/shine-border";
import { Spinner } from "@/components/ui/spinner";
import { Approval_Ticket } from "@/models/ticket.model";
import { Ticket } from "lucide-react";

export default function TicketScreen() {
    const [ticket, setTicket] = useState<Approval_Ticket | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const params = useParams();
    const ticketId = params.ticketId as string;

    useEffect(() => {
        if (!ticketId) return;

        async function fetchTicket() {
            setIsLoading(true);
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
                    setTicket(ticket || null);
                } else {
                    setTicket(null);
                }
            } catch (error) {
                console.error(error);
                toast.error("Something went wrong. Please try again later.");
                setTicket(null);
            } finally {
                setIsLoading(false);
            }
        }

        fetchTicket();
    }, [ticketId]);

    return (
        <main className="min-h-dvh bg-black text-white flex flex-col items-center justify-center px-4">
            {ticket === null && isLoading && (
                <div className="flex flex-col items-center">
                    <Spinner />
                    <p className="mt-2">Wait just a moment...</p>
                </div>
            )}

            {ticket === null && !isLoading && (
                <div className="flex flex-col items-center">
                    <h1 className="mb-2">Ticket Not Found</h1>
                    <p className="text-zinc-500">The ticket you are looking for could not be retrieved.</p>
                </div>
            )}

            {ticket !== null && (
                <>
                    <h1 className="mb-2">Ticket has been retrieved!</h1>
                    <p className="text-zinc-500 mb-6">Let Auro take it from here.</p>

                    <div className="relative h-[280px] w-[550px] rounded-2xl border p-7 shadow-xl">
                        {ticket.status === "Approved" && (
                            <ShineBorder shineColor={["#45e670", "#00ff99", "#62ff00"]} />
                        )}
                        {ticket.status === "For Approval" && (
                            <ShineBorder shineColor={["#fff70d", "#ffb405", "#e5ff00"]} />
                        )}
                        {ticket.status === "Declined" && (
                            <ShineBorder shineColor={["#ff0000", "#ff2a00", "#ff004c"]} />
                        )}

                        <div className="flex justify-between items-center">
                            <span className="text-xs text-zinc-400 flex gap-2 items-center uppercase">
                                <Ticket size={14} />
                                Ticket {ticket.status}
                            </span>
                            <div className="flex items-center justify-center">
                                <div
                                    className={`absolute animate-ping flex items-center justify-center h-3 w-3 rounded-full ${ticket.status === "Approved"
                                        ? "bg-green-500"
                                        : ticket.status === "For Approval"
                                            ? "bg-yellow-400"
                                            : "bg-red-500"}`}
                                ></div>
                                <div
                                    className={`absolute h-3 w-3 rounded-full ${ticket.status === "Approved"
                                        ? "bg-green-500"
                                        : ticket.status === "For Approval"
                                            ? "bg-yellow-400"
                                            : "bg-red-500"}`}
                                ></div>
                            </div>
                        </div>

                        <h3 className="mt-10 mb-1">{ticket.title}</h3>
                        <p className="text-sm pb-8 text-zinc-200 mb-4">
                            {ticket.type}
                        </p>
                        <span className="text-sm text-zinc-400 font-medium mb-1">
                            {ticket.department}
                        </span>
                        <hr className="mt-2" />
                        <div className="mt-2 text-[11px] text-zinc-700 flex justify-between">
                            <span>ticket_{ticket.id}</span>
                            <span>reference_{ticket.reference_id}</span>
                        </div>
                    </div>
                </>
            )}
        </main>
    );
}
