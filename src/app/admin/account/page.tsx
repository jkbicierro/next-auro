"use client";

//import Image from "next/image";

import type { User } from "@/models/user.model";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function User() {
    const router = useRouter();
    const [user, setUser] = useState<User | null>(null);

    const fetchUser = async () => {
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/getuser`,
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
            setUser(data.user);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchUser();
    }); // Empty dependency array to run once on mount

    console.log(user);

    return (
        <main>
            <section>
                <div>
                    <h1>User Account</h1>
                    {user && (
                        <div>
                            ID: {user.id} | Name: {user.name} | Email:{" "}
                            {user.email} | Password: {user.password} | Role:{" "}
                            {user.role}
                        </div>
                    )}
                </div>
            </section>
        </main>
    );
}
