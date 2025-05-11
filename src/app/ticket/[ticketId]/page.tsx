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
            <main className="h-dvh flex flex-col items-center justify-center">
                {ticket ? (
                    <div className="border relative py-5 px-8 w-[450px]">
                        {ticket.status === "Approved" && (
                            <ShineBorder shineColor={["#1a9103"]} />
                        )}
                        {ticket.status === "For Approval" && (
                            <ShineBorder shineColor={["#ffea05"]} />
                        )}
                        {ticket.status === "Declined" && (
                            <ShineBorder shineColor={["#ff0800"]} />
                        )}

                        <div>
                            <div className="flex gap-2">
                                <h3 className="uppercase">{ticket.title}</h3>
                                {ticket.status === "Approved" && (
                                    <Badge
                                        variant="outline"
                                        className="bg-green-200 text-green-600"
                                    >
                                        {ticket.status}
                                    </Badge>
                                )}
                                {ticket.status === "For Approval" && (
                                    <Badge className="bg-yellow-200 text-yellow-600">
                                        {ticket.status}
                                    </Badge>
                                )}
                                {ticket.status === "Declined" && (
                                    <Badge className="bg-red-200 text-red-600">
                                        {ticket.status}
                                    </Badge>
                                )}
                            </div>

                            <p>{ticket.type}</p>

                            <p>ID: {ticket.id}</p>
                            <p>Reference: {ticket.reference_id}</p>

                            <p>{ticket.department}</p>
                        </div>
                    </div>
                ) : (
                    <>
                        <Spinner>
                            <p className="mt-2">Wait just a moment...</p>
                        </Spinner>
                    </>
                )}
            </main>
        </>
    );
}
