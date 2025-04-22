"use client";

import Link from "next/link";

//import Image from "next/image";

export default function Home() {
    //const router = useRouter();

    return (
        <>
            <main className="h-screen flex items-center justify-center">
                <div>
                    <ul className="flex flex-col items-center gap-5">
                        <li>
                            <Link href={"/auth/login"}>auth/login</Link>
                        </li>
                        <li>
                            <Link href={"/auth/signup"}>auth/signup</Link>
                        </li>
                        <li>
                            <Link href={"/admin/tickets"}>admin/tickets</Link>
                        </li>
                    </ul>
                </div>
            </main>
        </>
    );
}
