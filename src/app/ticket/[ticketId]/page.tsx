"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import FooterSection from "@/components/block/footer";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type Ticket = {
  id: string;
  reference_id: string;
  title: string;
  type: string;
  status: string;
  department: string;
};

export default function TicketScreen() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ticketId = searchParams.get("id");

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(false);

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

    useEffect(() => {
    if (!ticketId) return;

    async function fetchTicket() {
      setLoading(true);

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

        const data = await res.json();

        if (res.ok) {
          setTicket(data.ticket);
        } else {
          toast.error(data.message || "Failed to load ticket.");
        }
      } catch (error) {
        console.error("Fetch Ticket Error:", error);
        toast.error("Something went wrong while fetching the ticket.");
      }

      setLoading(false);
    }

    fetchTicket();
    }, [ticketId]);

    return (
        <>
            <nav className="px-[20px] lg:px-[100px] xl:px-[150px] 2xl:px-[400px] h-[60px] w-full flex items-center justify-between border-b">
                <div>Auro</div>

                <div>
                        <Button onClick={Logout}>Sign out</Button>
                </div>
            </nav>

        <main className="h-[500px] flex flex-col items-center justify-center">
            <div className="border p-10 rounded-2xl w-full max-w-md">
            <h1 className="text-xl font-semibold mb-4">Ticket Info</h1>

            {loading && <p>Loading ticket...</p>}

            {!loading && ticket && (
                <div>
                    <p>ID: {ticket.id}</p>
                    <p>Reference: {ticket.reference_id}</p>
                    <p>Title: {ticket.title}</p>
                    <p>Type: {ticket.type}</p>
                    <p>Status: {ticket.status}</p>
                    <p>Department: {ticket.department}</p>
                </div>
            )}

            {!loading && !ticket && (
                <p className="text-gray-500">No ticket found for this ID.</p>
            )}
            </div>
        </main>

        <FooterSection />
        </>
    );
}