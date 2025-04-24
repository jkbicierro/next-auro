"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Approval_Ticket } from "@/models/ticket.model";
import { CircleCheck, CircleX, Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Textarea } from "@/components/ui/textarea";

export default function TicketScreen() {
    const [tickets, setTickets] = useState<Approval_Ticket[]>([]);

    useEffect(() => {
        async function GetTicketAll() {
            try {
                const res = await fetch(
                    `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ticket/showall`
                );

                if (!res.ok) {
                    throw new Error("Failed to fetch announcements");
                }

                const { tickets } = await res.json();
                setTickets(tickets);
            } catch (err) {
                console.error("[fetch] GetTicketAll:", err);
                toast.error("Failed to fetch GetTicketAll. Please try again.");
            }
        }
        GetTicketAll();
    }, []);

    return (
        <>
            <main className="mt-20 ml-20">
                <h1>Tickets</h1>

                <div className="w-[1000px]">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Reference ID</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Department</TableHead>
                                <TableHead>Created At</TableHead>
                            </TableRow>
                        </TableHeader>

                        {tickets &&
                            tickets.map((i) => (
                                <TableBody key={i.id}>
                                    <TableRow>
                                        <TableCell>{i.id}</TableCell>
                                        <TableCell>{i.reference_id}</TableCell>
                                        <TableCell className="flex items-center gap-3">
                                            {i.title}
                                        </TableCell>
                                        <TableCell>{i.type}</TableCell>
                                        <TableCell>
                                            {i.status === "Approved" && (
                                                <Badge className="bg-green-200 text-green-600">
                                                    {i.status}
                                                </Badge>
                                            )}
                                            {i.status === "For Approval" && (
                                                <Badge className="bg-yellow-200 text-yellow-600">
                                                    {i.status}
                                                </Badge>
                                            )}
                                            {i.status === "Declined" && (
                                                <Badge className="bg-red-200 text-red-600">
                                                    {i.status}
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>{i.department}</TableCell>
                                        <TableCell>
                                            <div className="flex gap-3 items-center justify-between w-[200px]">
                                                {format(
                                                    new Date(i.createdAt),
                                                    "MMMM d, yyyy h:mm a"
                                                )}

                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            size="icon"
                                                            variant={"ghost"}
                                                        >
                                                            <Ellipsis
                                                                size={18}
                                                            />
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent className="w-[250px]">
                                                        <TicketAction
                                                            ticket_id={i.id}
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ))}
                    </Table>
                </div>
            </main>
        </>
    );
}

type TicketActionProps = {
    ticket_id: number;
};

function TicketAction({ ticket_id }: TicketActionProps) {
    async function ApproveTicket() {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ticket/approve`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ticket_id: ticket_id }),
                }
            );

            if (!res.ok) {
                throw new Error("Failed to fetch announcements");
            }
            const { message } = await res.json();

            // Success + Add Toast Alert
            toast.success(message);
        } catch (err) {
            console.error("[fetch] ApproveTicket:", err);
            toast.error("Failed to fetch ApproveTicket. Please try again.");
        }
    }

    async function DeclineTicket() {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ticket/decline`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ticket_id: ticket_id }),
                }
            );

            if (!res.ok) {
                throw new Error("Failed to fetch announcements");
            }

            const { message } = await res.json();
            toast.success(message);
        } catch (err) {
            console.error("[fetch] ApproveTicket:", err);
            toast.error("Failed to fetch ApproveTicket. Please try again.");
        }
    }

    return (
        <ul className="flex flex-col gap-1">
            <li
                onClick={ApproveTicket}
                className="flex items-center justify-between gap-2 px-4 py-2 hover:bg-zinc-100 rounded cursor-pointer"
            >
                <span className="text-sm">Approve Ticket</span>
                <CircleCheck size={16} />
            </li>
            <Dialog>
                <DialogTrigger className="w-full">
                    <li className="flex items-center justify-between gap-2 px-4 py-2 hover:bg-zinc-100 rounded cursor-pointer">
                        <span className="text-sm">Decline Ticket</span>
                        <CircleX size={16} />
                    </li>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Do you want to decline this ticket?
                        </DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                        </DialogDescription>

                        <div>
                            Remarks (Optional)
                            <Textarea placeholder="Type your message here." />
                        </div>

                        <DialogFooter>
                            <DialogClose asChild>
                                <Button onClick={DeclineTicket}>
                                    Yes, decline the ticket
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </ul>
    );
}
