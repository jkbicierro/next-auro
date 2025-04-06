"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/models/user.model";
//import Image from "next/image";

export default function Admin() {
    const router = useRouter();
    const [users, setUsers] = useState<User[]>([]);

    const fetchAllUsers = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/getalluser`,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (!res.ok) {
                router.push("/auth/login");
                throw new Error("Failed to fetch users");
            }

            const data = await res.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []); // Empty dependency array to run once on mount

    return (
        <main>
            <div className="flex flex-col gap-2">
                {users &&
                    users.map((user) => {
                        return (
                            <div key={user.id}>
                                Username: {user.name} | Email: {user.email} |
                                Password: {user.password} | Role: {user.role}
                            </div>
                        );
                    })}
            </div>
        </main>
    );
}
