"use client";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { toast } from "sonner";

/*
export const ticket_table = pgTable("tickets", {
    id: serial("id").primaryKey(),
    referenceId: text("reference_id").notNull(),
    title: text("title").notNull(),
    type: text("type").notNull(),
    status: text("status").notNull(),
    department: text("department").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
});

*/

interface Approval_Ticket {
    id: number;
    referenceId: string;
    title: string;
    type: string;
    status: string;
    department: string;
    createdAt: string;
    updatedAt: string;
}

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

    console.log(tickets);

    return (
        <>
            <main className="mt-20 ml-20">
                <h1>Tickets</h1>

                <div className="w-[800px]">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ticket_id</TableHead>
                                <TableHead>reference_id</TableHead>
                                <TableHead>title</TableHead>
                                <TableHead>type</TableHead>
                                <TableHead>status</TableHead>
                                <TableHead>department</TableHead>
                                <TableHead>createdAt</TableHead>
                            </TableRow>
                        </TableHeader>

                        {tickets &&
                            tickets.map((i) => (
                                <TableBody key={i.id}>
                                    <TableRow>
                                        <TableCell>{i.id}</TableCell>
                                        <TableCell>{i.referenceId}</TableCell>
                                        <TableCell>{i.title}</TableCell>
                                        <TableCell>{i.type}</TableCell>
                                        <TableCell>
                                            <Badge className="bg-yellow-200 text-yellow-600">
                                                {i.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{i.department}</TableCell>
                                        <TableCell>{i.createdAt}</TableCell>
                                    </TableRow>
                                </TableBody>
                            ))}
                    </Table>
                </div>
            </main>
        </>
    );
}
