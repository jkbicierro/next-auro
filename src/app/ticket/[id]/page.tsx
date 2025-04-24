// app/ticket/[id]/page.tsx
import { notFound } from "next/navigation";

export default async function ShowTicketScreen({
    params,
}: {
    params: { id: string };
}) {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/ticket/show`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ticket_id: params.id }),
            // NOTE: credentials won't work here unless SSR proxy is used
        }
    );

    if (!res.ok) return notFound();

    const data = await res.json();

    const ticket = data.ticket?.[0];

    if (!ticket) return notFound();

    return (
        <main className="h-screen flex flex-col items-center justify-center">
            <h1>Ticket</h1>
            <p>{ticket.id}</p>
            <p>{ticket.department}</p>
            <p>{ticket.title}</p>
            <p>{ticket.status}</p>
            <p>{ticket.title}</p>
        </main>
    );
}
