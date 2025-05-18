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
import {
    CircleCheck,
    CircleX,
    Ellipsis,
    ExternalLink,
    Megaphone,
    View,
    ChevronDown,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
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
import { useRouter } from "next/navigation";
import FooterSection from "@/components/block/footer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { NavBar } from "@/components/block/navbar";
import Link from "next/link";

export default function TicketScreen() {
    const router = useRouter();
    const [tickets, setTickets] = useState<Approval_Ticket[]>([]);

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
    }, [router]);

    const GetTicketAll = useCallback(async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ticket/showall`
            );

            if (!res.ok) {
                throw new Error("Failed to fetch data");
            }

            const { tickets } = await res.json();
            setTickets(tickets);
        } catch (err) {
            console.error("[GetTicketAll] Error:", err);
            toast.error("[GetTicketAll] Failed to fetch. Please try again.");
        }
    }, []);

    useEffect(() => {
        GetTicketAll();
    }, [GetTicketAll]);

    return (
        <>
            <NavBar />

            <main className="px-[20px] lg:px-[100px] xl:px-[150px] 2xl:px-[400px]">
                <div className="mt-10 flex items-start gap-3">
                    <Alert>
                        <Megaphone />
                        <AlertTitle>Animation + Revision 0.1.16a</AlertTitle>
                        <AlertDescription>
                            Added animation, revised navigation bar, API
                            controls for external systems.
                        </AlertDescription>
                    </Alert>
                    <Alert>
                        <Megaphone />
                        <AlertTitle>Register Form 0.1.13a</AlertTitle>
                        <AlertDescription>
                            Added sign up user interface to register new users.
                        </AlertDescription>
                    </Alert>
                    <Alert>
                        <Megaphone />
                        <AlertTitle>Ticket 0.1.5a</AlertTitle>
                        <AlertDescription>
                            Added ticket screen, ticket action, and dynamic
                            ticket route in a specific ID.
                        </AlertDescription>
                    </Alert>
                </div>

                <div className="mt-10">
                    <div className="mb-10">
                        <h2>Welcome back, John!</h2>
                        <p className="mt-3 text-zinc-400">
                            You have access to control the ticket
                        </p>
                    </div>

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

                        {tickets &&
                            tickets.map((i) => (
                                <TableBody key={i.id}>
                                    <TableRow>
                                        <TableCell className="w-[300px]">
                                            <Link
                                                target="_blank"
                                                href={`${process.env.NEXT_PUBLIC_CLIENT_URL}/ticket/${i.id}`}
                                                className="hover:underline cursor-pointer"
                                            >
                                                {i.id}
                                            </Link>
                                        </TableCell>
                                        <TableCell className="w-[250px]">
                                            <Link
                                                target="_blank"
                                                href={`${i.reference_link}/${i.reference_id}`}
                                                className="flex items-center gap-2 hover:underline cursor-pointer"
                                            >
                                                {i.reference_id}
                                                <ExternalLink size={14} />
                                            </Link>
                                        </TableCell>
                                        <TableCell>{i.title}</TableCell>
                                        <TableCell className="w-[200px]">
                                            {i.type}
                                        </TableCell>
                                        <TableCell className="w-[150px]">
                                            <Popover>
                                                <PopoverTrigger>
                                                    {i.status ===
                                                        "Approved" && (
                                                        <Badge
                                                            variant="outline"
                                                            className="bg-green-200 text-green-600"
                                                        >
                                                            {i.status}
                                                            <ChevronDown />
                                                        </Badge>
                                                    )}
                                                    {i.status ===
                                                        "For Approval" && (
                                                        <Badge className="bg-yellow-200 text-yellow-600">
                                                            {i.status}
                                                            <ChevronDown />
                                                        </Badge>
                                                    )}
                                                    {i.status ===
                                                        "Declined" && (
                                                        <Badge className="bg-red-200 text-red-600">
                                                            {i.status}
                                                            <ChevronDown />
                                                        </Badge>
                                                    )}
                                                </PopoverTrigger>
                                                <PopoverContent className="p-0 m-0 rounded-[6px] w-[180px]">
                                                    <TicketAction
                                                        ticket_id={i.id}
                                                        refreshTickets={
                                                            GetTicketAll
                                                        }
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </TableCell>
                                        <TableCell className="w-[150px]">
                                            {i.department}
                                        </TableCell>
                                        <TableCell className="w-[300px]">
                                            <div className="flex gap-1 items-center justify-between">
                                                {format(
                                                    new Date(i.createdAt),
                                                    "MMMM d, yyyy h:mm a"
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            ))}
                    </Table>
                </div>
            </main>

            <FooterSection />
        </>
    );
}

type TicketActionProps = {
    ticket_id: string;
    refreshTickets: () => void;
};

function TicketAction({ ticket_id, refreshTickets }: TicketActionProps) {
    const [remarks, setRemarks] = useState("");

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
            toast.success(message);
            refreshTickets();
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
                    body: JSON.stringify({
                        ticket_id: ticket_id,
                        remarks: remarks,
                    }),
                }
            );

            if (!res.ok) {
                throw new Error("Failed to fetch announcements");
            }

            const { message } = await res.json();
            toast.success(message);
            refreshTickets();
        } catch (err) {
            console.error("[fetch] DeclineTicket:", err);
            toast.error("Failed to fetch DeclineTicket. Please try again.");
        }
    }

    return (
        <ul className="flex flex-col gap-1">
            <li
                onClick={ApproveTicket}
                className="flex items-center justify-between gap-2 px-4 py-2 hover:bg-zinc-800 rounded-[6px] cursor-pointer "
            >
                <span className="text-sm">Approve Ticket</span>
                <CircleCheck size={16} />
            </li>
            <Dialog>
                <DialogTrigger className="w-full">
                    <li className="flex items-center justify-between gap-2 px-4 py-2 hover:bg-zinc-800 rounded-[6px] cursor-pointer">
                        <span className="text-sm">Decline Ticket</span>
                        <CircleX size={16} />
                    </li>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Do you want to decline this ticket?
                        </DialogTitle>
                        <DialogDescription className="mt-2">
                            This action cannot be undone. This will permanently
                            decline the ticket.
                        </DialogDescription>

                        <div className="mt-2 mb-2">
                            <small>Remarks (Optional)</small>
                            <Textarea
                                placeholder="Type your remarks here"
                                className="mt-2"
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                            />
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
